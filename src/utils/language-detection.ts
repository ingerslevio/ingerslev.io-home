/**
 * Detects user's preferred language from request headers
 * @param request - The incoming request object
 * @returns 'da' for Danish, 'en' for English (fallback)
 */
export function detectUserLanguage(request: Request): "da" | "en" {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const userAgent = request.headers.get("user-agent") || "";

  // Check for Danish language preferences
  const prefersDanish =
    acceptLanguage.includes("da") ||
    acceptLanguage.includes("dk") ||
    userAgent.includes("da") ||
    userAgent.includes("dk");

  return prefersDanish ? "da" : "en";
}

/**
 * Gets the appropriate redirect URL for a given path
 * @param request - The incoming request object
 * @param path - The path to redirect to (without language prefix)
 * @returns The full URL with language prefix
 */
export function getLocalizedRedirectUrl(
  request: Request,
  path: string
): string {
  const language = detectUserLanguage(request);
  return `/${language}${path}`;
}
