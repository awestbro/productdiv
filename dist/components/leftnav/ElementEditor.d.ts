/// <reference types="react" />
import { LeftNavProps } from "./LeftNav";
export declare type ElementEditorProps = LeftNavProps & {
    setTemplateEditorOpen: (b: boolean) => void;
};
export declare function ElementEditor(props: ElementEditorProps): JSX.Element;
