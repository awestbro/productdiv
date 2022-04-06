import { html_beautify } from "js-beautify";

export const html_beautify_opts = {
  max_preserve_newlines: 1,
};

export function copyElementHtml(
  element: Element,
  formatter: (s: string) => string = (s) => s
) {
  const html = sanitizeHtmlToString(element);
  return formatter(html);
}

export function elementToString(element: Element) {
  const copy = element.cloneNode(true) as Element;
  return html_beautify(copy.outerHTML, html_beautify_opts);
}

export function sanitizeHtmlToString(element: Element) {
  const copy = element.cloneNode(true) as Element;
  copy.querySelectorAll('[data-productdiv="true"]').forEach((e) => e.remove());
  return html_beautify(copy.outerHTML, html_beautify_opts);
}

export function copyElementToClipboard(
  element: Element,
  formatter: (s: string) => string = (s) => s
) {
  const html = formatter(sanitizeHtmlToString(element));
  copyToClipboard(html);
  return html;
}

export function copyElementTemplateToClipboard(element: Element) {
  const templateString = sanitizeHtmlToString(element);
  const toExport = `
{
  name: "",
  htmlTemplate: \`${templateString}
  \`
}
  `;
  copyToClipboard(toExport.trim());
}

export function copyToClipboard(val: string) {
  const dummy = document.createElement("textarea");
  // to avoid breaking page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = val;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}
