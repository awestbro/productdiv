export function isChildContainer(element: Element) {
    return element.hasAttribute('data-ui-container');
}

export function nodeListofElementsToElementArray(list: NodeListOf<Element>): Element[] {
    return Array.from(list);
}

export function nodeListToArray(list: NodeList): Node[] {
    return Array.from(list);
}

export function domTokenListToArray(list: DOMTokenList): string[] {
    if (!list) {
        return [];
    }
    return Array.from(list);
}

export function getEditorMountPoint() {
    return document.getElementById('productdiv');
}
