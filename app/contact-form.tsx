"use client";
import { useState } from "react";

export function ContactForm({ kind = "contact" }: { kind?: "contact" | "dream" | "valuation" }) {
  const [state,setState]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [notice,setNotice]=useState("");
  const isDream = kind === "dream";
  const isValuation = kind === "valuation";
  return (
    <form className="lead-form" onSubmit={async event => {
      event.preventDefault();const form=event.currentTarget;const fields=new FormData(form);
      setState("sending");setNotice("Sending your request…");
      try {
        const base="https://sneak-idx-worker.bonitaspringsrealtors.workers.dev";
        const bootstrap=await fetch(base+"/idx/v1/bootstrap?site=ursula-weinkauff");
        if(!bootstrap.ok)throw new Error("Unable to connect. Please call 239-297-2777 or try again.");
        const session=await bootstrap.json();
        const details=[String(fields.get("message")||""),...['location','price','type','beds','baths'].filter(key=>fields.get(key)).map(key=>key+": "+fields.get(key))].join("\n");
        const response=await fetch(base+"/idx/v1/lead?site=ursula-weinkauff",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+session.session},body:JSON.stringify({name:[fields.get("firstName"),fields.get("lastName")].join(" "),email:fields.get("email"),phone:fields.get("phone"),message:details,leadType:kind,companyWebsite:fields.get("companyWebsite"),sourceUrl:window.location.origin+window.location.pathname})});
        const result=await response.json();if(!response.ok)throw new Error(result.message||"Unable to send. Please try again.");
        form.reset();setState("sent");setNotice("Thank you. Ursula’s team has received your request and will follow up.");
      }catch(error){setState("error");setNotice(error instanceof Error?error.message:"Unable to send. Please try again.");}
    }}>
      <input type="hidden" name="kind" value={kind} />
      <div className="form-grid">
        <label>First Name<input name="firstName" required /></label>
        <label>Last Name<input name="lastName" required /></label>
        <label>Email Address<input name="email" type="email" required /></label>
        <label>Phone Number<input name="phone" type="tel" /></label>
        {(isDream || isValuation) && <label className="wide">Property or preferred location<input name="location" placeholder={isValuation ? "Property address" : "City, community, ZIP or address"} required /></label>}
        {isDream && <>
          <label>Price range<select name="price"><option>Any</option><option>Under $500,000</option><option>$500,000 – $1,000,000</option><option>$1,000,000+</option></select></label>
          <label>Property type<select name="type"><option>Single Family Home</option><option>Condominium</option><option>Townhouse</option><option>Lots & Land</option><option>Other</option></select></label>
          <label>Bedrooms<select name="beds"><option>Any</option><option>2+</option><option>3+</option><option>4+</option></select></label>
          <label>Bathrooms<select name="baths"><option>Any</option><option>2+</option><option>3+</option><option>4+</option></select></label>
        </>}
        <label className="wide">{isValuation ? "Tell us about your property" : isDream ? "Additional preferences" : "How can we help?"}<textarea name="message" rows={6} required={!isDream} /></label>
      </div>
      <label className="consent"><input type="checkbox" name="consent" required /> I agree to be contacted about this request.</label>
      <div aria-hidden="true" style={{position:"absolute",left:"-10000px"}}><label>Website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label></div>
      <p>Your contact details and request will be shared with Ursula’s real estate team.</p>
      <button className="button dark" type="submit" disabled={state==="sending"}>{state==="sending"?"Sending…":"Send"}</button>
      <p role="status">{notice}</p>
    </form>
  );
}

