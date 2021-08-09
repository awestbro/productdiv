import { TemplateDefinition } from "../configuration/configuration-importer";
import { PlacementType } from "./canvas";
export declare function onlyHasEditableTextChildren(node: Node): boolean;
export declare function isElementHidden(node: Node): boolean;
export declare function scrollIntoView(node: Node): void;
export declare function addTemplateToElement(template: TemplateDefinition, element: Element, _placement: PlacementType): Node;
