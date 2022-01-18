/// <reference types="react" />
import { UtilityClassControl } from "../../utilities/configuration/configuration-importer";
export declare function addClassDefinition(element: Element, classString: string): void;
export declare function removeClassDefinition(element: Element, classString: string): void;
export declare function UtilityClassFormControl(props: {
    element: Element;
    control: UtilityClassControl;
    redrawComponentTree: () => void;
    redrawHighlightedNode: () => void;
}): JSX.Element;
