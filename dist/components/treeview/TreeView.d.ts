/// <reference types="react" />
import { NodeTreeMatch } from "../../utilities/tree/tree-utils";
import { ElementEditorState } from "../Application";
declare type TreeViewProps = {
    componentTree?: NodeTreeMatch[];
    setElementEditorOpen(b: boolean): void;
    setTreeViewOpen(b: boolean): void;
    setElementEditorState(n: NodeTreeMatch): void;
    elementEditorState: ElementEditorState;
};
export declare function TreeView(props: TreeViewProps): JSX.Element;
export declare type TreeItemProps = {
    match: NodeTreeMatch;
    setElementEditorOpen(b: boolean): void;
    setElementEditorState(n: NodeTreeMatch): void;
    elementEditorState: ElementEditorState;
};
export {};
