import { ChildNodeType } from "../child-node-type";
import { TemplateDefinition } from "../configuration/configuration-importer";
import { PlacementType } from "./canvas";

export function onlyHasEditableTextChildren(node: Node): boolean {
  if (node.childNodes.length === 1) {
    return node.childNodes[0].nodeType === ChildNodeType.Text;
  }
  return false;
}

export function isElementHidden(node: Node) {
  if (node.nodeType === ChildNodeType.Element) {
    if (window.getComputedStyle(node as Element).display === "none") {
      return true;
    }
    if (window.getComputedStyle(node as Element).visibility === "hidden") {
      return true;
    }
  }
  return false;
}

export function scrollIntoView(node: Node) {
  let nodeToScollTo = node;
  if (node.nodeType === ChildNodeType.Text) {
    nodeToScollTo = node.parentElement;
  }
  if (
    (nodeToScollTo as Element).scrollTo &&
    (nodeToScollTo as Element).getBoundingClientRect
  ) {
    let scrollpoint =
      window.pageYOffset +
      (nodeToScollTo as Element).getBoundingClientRect().top;
    scrollpoint = scrollpoint - window.screen.height / 4;
    window.scrollTo({ left: 0, top: scrollpoint, behavior: "smooth" });
  }
}

export function addTemplateToElement(
  template: TemplateDefinition,
  _element: Element,
  _placement: PlacementType
): Node {
  let placement = _placement;
  let element = _element;
  if (element.classList.contains("productdiv-drop-container")) {
    element = element.parentElement;
    _element.remove();
  }
  if (element.nodeName === "BODY") {
    placement = PlacementType.INNER_APPEND;
  }
  if (placement === PlacementType.REPLACE) {
    const html = template.htmlTemplate.trim(); // Never return a text node of whitespace as the result
    const t = document.createElement("template");
    t.innerHTML = html;
    const newElem = t.content.firstChild;
    element.parentElement.replaceChild(newElem, element);
    return newElem;
  }
  element.insertAdjacentHTML(placement, template.htmlTemplate);
  if (placement === PlacementType.INNER_APPEND) {
    return element.lastElementChild;
  } else if (placement === PlacementType.INNER_PREPEND) {
    return element.firstElementChild;
  } else if (placement === PlacementType.OUTER_APPEND) {
    return element.nextElementSibling;
  } else {
    return element.previousElementSibling;
  }
}

/**
 *
 * @param element
 * @returns 0-based index of current element in relation to its parent element
 */
export function findPositionRelativeToParent(element: Element): number {
  const parent = element.parentNode;
  let position = 0;
  for (let i = 0; i < parent.childNodes.length; i++) {
    if (parent.childNodes[i] === element) {
      position = i;
    }
  }
  return position;
}

/**
 *
 * @param html string
 * @returns list of child nodes from input string
 */
export function htmlStringToNodeList(html: string): NodeListOf<ChildNode> {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.childNodes;
}
