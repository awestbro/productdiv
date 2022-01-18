import { TemplateDefinition } from "../configuration/configuration-importer";
import { PlacementType } from "./canvas";
export declare function onlyHasEditableTextChildren(node: Node): boolean;
export declare function isElementHidden(node: Node): boolean;
export declare function scrollIntoView(node: Node): void;
export declare function addTemplateToElement(template: TemplateDefinition, _element: Element, _placement: PlacementType): Node;
/**
 *
 * @param element
 * @returns 0-based index of current element in relation to its parent element
 */
export declare function findPositionRelativeToParent(element: Element): number;
/**
 *
 * @param html string
 * @returns list of child nodes from input string
 */
export declare function htmlStringToNodeList(html: string): NodeListOf<ChildNode>;
