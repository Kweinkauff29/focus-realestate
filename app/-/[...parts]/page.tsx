import { sitePath } from "../../site-path";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ parts: ["account", "newaccount.php"] }];
}

export default function LegacyAccountRoute() {
  const target = sitePath("/account?mode=signup");
  return <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(target)});` }} />;
}
