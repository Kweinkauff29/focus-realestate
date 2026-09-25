"use client";

import { useEffect, useState, type CSSProperties } from "react";
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
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const showTimer = window.setTimeout(() => setVisible(true), 80);
    const hideTimer = window.setTimeout(() => setVisible(false), 9_000);
    const nextTimer = window.setTimeout(
      () => setTestimonialIndex((index) => (index + 1) % testimonials.length),
      10_000,
    );

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(nextTimer);
    };
  }, [testimonialIndex, paused]);

  const testimonial = testimonials[testimonialIndex];
  const words = testimonial.quote.split(/\s+/);
  const animationStyle = {
    "--cite-delay": `${0.7 + words.length * 0.035}s`,
  } as CSSProperties;

  return (
    <article
      className="testimonial-stack"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="eyebrow">Client Stories</div>
      <h2>What Clients <em>Say</em></h2>
      <div className="testimonial-rotation" aria-live="polite">
        <blockquote
          className={`testimonial-bubble ${testimonialIndex % 2 ? "from-right" : "from-left"}${visible ? " is-visible" : ""}`}
          key={`${testimonialIndex}-${testimonial.name}`}
          style={animationStyle}
        >
          <p>
            {words.map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                style={{ "--word-delay": `${0.55 + wordIndex * 0.035}s` } as CSSProperties}
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <cite>{testimonial.name}</cite>
        </blockquote>
      </div>
      <a className="text-link" href={sitePath("/testimonials-page")}>View More Testimonials →</a>
    </article>
  );
}
