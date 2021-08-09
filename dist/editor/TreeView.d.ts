import { NodeTreeMatch } from "../lib/tree/tree-utils";
import { ElementEditorState } from "./Application";
declare type TreeViewProps = {
    componentTree?: NodeTreeMatch[];
    setElementEditorOpen(b: boolean): any;
    setTreeViewOpen(b: boolean): any;
    setElementEditorState(n: NodeTreeMatch): any;
    elementEditorState: ElementEditorState;
};
export declare function TreeView(props: TreeViewProps): JSX.Element;
export declare type TreeItemProps = {
    match: NodeTreeMatch;
    setElementEditorOpen(b: boolean): any;
    setElementEditorState(n: NodeTreeMatch): any;
    elementEditorState: any;
};
export {};
