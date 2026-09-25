"use client";

import { useEffect, useState } from "react";
import { locations, testimonials } from "./site-data";
import { sitePath } from "./site-path";

type CurrentWeather = {
  temperature: number;
  apparentTemperature: number;
  isDay: boolean;
  weatherCode: number;
  windSpeed: number;
};

type WeatherState = Record<string, CurrentWeather | "error">;

const weatherLabels: Record<number, string> = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  56: "Freezing Drizzle",
  57: "Freezing Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  66: "Freezing Rain",
  67: "Freezing Rain",
  71: "Snow",
  73: "Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Rain Showers",
  81: "Rain Showers",
  82: "Heavy Showers",
  85: "Snow Showers",
  86: "Snow Showers",
  95: "Thunderstorm",
  96: "Storm + Hail",
  99: "Severe Storm",
};

function weatherTheme(code: number, isDay: boolean) {
  const time = isDay ? "day" : "night";
  if (code === 0) return `clear-${time}`;
  if ([1, 2].includes(code)) return isDay ? "partly-cloudy-day" : "cloudy-night";
  if ([3, 45, 48].includes(code)) return isDay ? "cloudy-day" : "fog-night";
  if ([51, 53, 55, 56, 57].includes(code)) return `drizzle-${time}`;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return `rain-${time}`;
  if ([95, 96, 99].includes(code)) return `storm-${time}`;
  return `cloudy-${time}`;
}

function weatherIcon(code: number, isDay: boolean) {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if ([1, 2].includes(code)) return isDay ? "🌤️" : "🌙";
  if ([3, 45, 48].includes(code)) return "☁️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return isDay ? "☀️" : "🌙";
}

function weatherUrl(latitude: number, longitude: number) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    timezone: "auto",
    forecast_days: "1",
  });
  return `https://api.open-meteo.com/v1/forecast?${params}`;
}

export function WeatherStrip() {
  const [weather, setWeather] = useState<WeatherState>({});

  useEffect(() => {
    let active = true;
    let controller = new AbortController();

    async function refreshWeather() {
      controller.abort();
      controller = new AbortController();

      const updates = await Promise.all(
        locations.map(async (location) => {
          try {
            const response = await fetch(weatherUrl(location.latitude, location.longitude), {
              signal: controller.signal,
            });
            if (!response.ok) throw new Error("Weather request failed");
            const data = await response.json();
            const current = data?.current;
            if (!current) throw new Error("Current weather is missing");
            return [
              location.slug,
              {
                temperature: Number(current.temperature_2m),
                apparentTemperature: Number(current.apparent_temperature),
                isDay: Number(current.is_day) === 1,
                weatherCode: Number(current.weather_code),
                windSpeed: Number(current.wind_speed_10m),
              } satisfies CurrentWeather,
            ] as const;
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") return null;
            return [location.slug, "error" as const] as const;
          }
        }),
      );

      if (active) {
        setWeather(Object.fromEntries(updates.filter((item) => item !== null)));
      }
    }

    void refreshWeather();
    const refreshTimer = window.setInterval(refreshWeather, 15 * 60 * 1000);

    return () => {
      active = false;
      controller.abort();
      window.clearInterval(refreshTimer);
    };
  }, []);

  return (
    <section className="weather-strip" aria-label="Southwest Florida weather" aria-live="polite">
      {locations.map((location) => {
        const current = weather[location.slug];
        const hasWeather = current && current !== "error";
        const className = hasWeather
          ? `weather-card weather-card--${weatherTheme(current.weatherCode, current.isDay)}`
          : current === "error"
            ? "weather-card is-error"
            : "weather-card is-loading";

        return (
          <article className={className} key={location.slug}>
            <div className="weather-top">
              <span aria-hidden="true">{hasWeather ? weatherIcon(current.weatherCode, current.isDay) : "☁️"}</span>
              <strong>{hasWeather ? `${Math.round(current.temperature)}°` : "—"}</strong>
            </div>
            <div className="weather-bottom">
              <b>{location.name}</b>
              <small>{hasWeather ? weatherLabels[current.weatherCode] || "Weather" : current === "error" ? "Unavailable" : "Updating"}</small>
            </div>
            <div className="weather-details">
              {hasWeather ? (
                <>Feels like {Math.round(current.apparentTemperature)}°<br />Wind {Math.round(current.windSpeed)} mph</>
              ) : current === "error" ? "Try again later" : "Loading current conditions"}
            </div>
          </article>
        );
      })}
    </section>
  );
}

export function TestimonialsCarousel() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [animation, setAnimation] = useState(() =>
    Array.from({ length: 3 }, () => ({ visible: false, wordCount: 0, authorVisible: false })),
  );

  useEffect(() => {
    const timers: number[] = [];
    const group = Array.from(
      { length: 3 },
      (_, index) => testimonials[(groupIndex * 3 + index) % testimonials.length],
    );
    const schedule = (delay: number, update: () => void) => {
      timers.push(window.setTimeout(update, delay));
    };
    const updateItem = (itemIndex: number, values: Partial<(typeof animation)[number]>) => {
      setAnimation((current) => current.map((item, index) => index === itemIndex ? { ...item, ...values } : item));
    };

    let elapsed = 80;

    group.forEach((testimonial, itemIndex) => {
      const words = testimonial.quote.split(/\s+/);
      schedule(elapsed, () => updateItem(itemIndex, { visible: true }));
      elapsed += 900;

      words.forEach((_, wordIndex) => {
        schedule(elapsed + wordIndex * 62, () => updateItem(itemIndex, { wordCount: wordIndex + 1 }));
      });

      elapsed += words.length * 62 + 180;
      schedule(elapsed, () => updateItem(itemIndex, { authorVisible: true }));
      elapsed += 240;
    });

    elapsed += 6_000;

    group.forEach((_, itemIndex) => {
      schedule(elapsed, () => updateItem(itemIndex, { visible: false, authorVisible: false }));
      elapsed += 900;
      schedule(elapsed, () => updateItem(itemIndex, { wordCount: 0 }));
      elapsed += 220;
    });

    schedule(elapsed + 250, () => setGroupIndex((index) => (index + 1) % Math.ceil(testimonials.length / 3)));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [groupIndex]);

  const activeTestimonials = Array.from(
    { length: 3 },
    (_, index) => testimonials[(groupIndex * 3 + index) % testimonials.length],
  );

  return (
    <article className="testimonial-stack" aria-label="Client testimonials">
      <div className="eyebrow">Client Stories</div>
      <h2>What Clients <em>Say</em></h2>
      <div className="testimonial-rotation" aria-live="polite">
        {activeTestimonials.map((testimonial, itemIndex) => {
          const itemAnimation = animation[itemIndex];
          const words = testimonial.quote.split(/\s+/);

          return (
            <blockquote
              className={`testimonial-bubble ${itemIndex % 2 ? "from-right" : "from-left"}${itemAnimation.visible ? " is-visible" : ""}`}
              key={`${groupIndex}-${testimonial.name}-${itemIndex}`}
            >
              <p>
                {words.slice(0, itemAnimation.wordCount).map((word, wordIndex) => (
                  <span key={`${word}-${wordIndex}`}>{word}{" "}</span>
                ))}
              </p>
              <cite className={itemAnimation.authorVisible ? "is-visible" : ""}>{testimonial.name}</cite>
            </blockquote>
          );
        })}
      </div>
      <a className="text-link" href={sitePath("/testimonials-page")}>View More Testimonials →</a>
    </article>
  );
}
