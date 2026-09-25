const basePath = process.env.PAGES_BASE_PATH || "";

export function sitePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}
