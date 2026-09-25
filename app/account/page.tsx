import { PageShell } from "../components";
import { sitePath } from "../site-path";

export default function AccountPage() {
  return <PageShell title="Property Search Account"><p className="lead">Save favorite properties, organize searches and receive updates when new matching homes reach the market.</p><form className="lead-form account-form"><div className="form-grid"><label className="wide">Email Address<input type="email" required /></label><label className="wide">Password<input type="password" required /></label></div><button className="button dark" type="submit">Log In</button><p>New here? <a href={sitePath("/contact-us")}>Contact the team</a> for help setting up your saved-search account.</p></form></PageShell>;
}
