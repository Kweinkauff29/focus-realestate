import { PageShell } from "../components";

export default function AccountPage() {
  return <PageShell title="Property Search Account"><p className="lead">Save favorite properties, organize searches and receive updates when new matching homes reach the market.</p><form className="lead-form account-form"><div className="form-grid"><label className="wide">Email Address<input type="email" required /></label><label className="wide">Password<input type="password" required /></label></div><button className="button dark" type="submit">Log In</button><p>New here? <a href="/contact-us">Contact the team</a> to set up your saved-search account when the new IDX feed is activated.</p></form></PageShell>;
}

