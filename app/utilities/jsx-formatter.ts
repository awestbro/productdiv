export function jsxFormatter(s: string) {
  return s.replace(/class=/g, "className=");
}
