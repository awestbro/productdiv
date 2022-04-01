export declare const html_beautify_opts: {
    max_preserve_newlines: number;
};
export declare function copyElementHtml(element: Element, formatter?: (s: string) => string): string;
export declare function sanitizeHtmlToString(element: Element): string;
export declare function copyElementToClipboard(element: Element, formatter?: (s: string) => string): string;
export declare function copyElementTemplateToClipboard(element: Element): void;
export declare function copyToClipboard(val: string): void;
