export declare function createComponentTree(doc: Document, rootElement: Element, treeViewIgnoreQuerySelectors: string[]): NodeTreeMatch[];
export interface NodeTreeMatch {
    name: string;
    type: string;
    node: Node;
    children: NodeTreeMatch[];
}
export declare function nodePrettyName(node: Node): string;
export declare function getParentMatch(tree: NodeTreeMatch[], match: NodeTreeMatch): NodeTreeMatch;
export declare function getTreeMatchFromElement(tree: NodeTreeMatch[], element: Node): NodeTreeMatch;
