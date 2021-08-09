import 'codemirror/mode/htmlmixed/htmlmixed';
import { LeftNavProps } from "./LeftNav";
export declare function addClassDefinition(element: Element, classString: string): void;
export declare function removeClassDefinition(element: Element, classString: string): void;
export declare function copyElementToClipboard(element: Element): void;
declare type ElementEditorProps = LeftNavProps & {
    setTemplateEditorOpen: (b: boolean) => any;
};
export declare function ElementEditor(props: ElementEditorProps): JSX.Element;
export {};
