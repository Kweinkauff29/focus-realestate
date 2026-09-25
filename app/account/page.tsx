import { PageShell } from "../components";
import { IdxContactCapture } from "../idx-search";
const portal = "https://sneak-idx-worker.bonitaspringsrealtors.workers.dev/portal?site=ursula-weinkauff&signin=1";
export default function AccountPage() {
  return <PageShell title="Property Search Account"><p className="lead">Sign in or create your account using a secure email link. No password needed.</p><p>Save favorite homes and return to your searches. When signed in, your property activity is shared with Ursula’s team so they can help you find the right home.</p><a className="button dark" href={portal}>Create account / Sign in securely</a><IdxContactCapture /></PageShell>;
}
