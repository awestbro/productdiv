/// <reference types="react" />
import { UtilityClassDefinition } from "../../utilities/configuration/configuration-importer";
export declare function addClassDefinition(element: Element, classString: string): void;
export declare function removeClassDefinition(element: Element, classString: string): void;
export declare function UtilityClassFormControl(props: {
    element: Element;
    control: UtilityClassDefinition;
    redrawComponentTree: () => void;
    redrawHighlightedNode: () => void;
}): JSX.Element;
