import * as React from "react";
import * as classnames from 'classnames';
import { NodeTreeMatch } from "../../utilities/tree/tree-utils";
import { highlightElements } from "../../utilities/dom/canvas";
import { isElementHidden, scrollIntoView } from "../../utilities/dom/dom-utilities";
import { ChildNodeType } from "../../utilities/child-node-type";
import { ElementEditorState } from "../Application";

type TreeViewProps = {
    componentTree?: NodeTreeMatch[],
    setElementEditorOpen(b: boolean): any
    setTreeViewOpen(b: boolean): any
    setElementEditorState(n: NodeTreeMatch): any;
    elementEditorState: ElementEditorState,
};

export function TreeView(props: TreeViewProps) {
    const { componentTree, setTreeViewOpen } = props;
    return (
        <div style={{ width: '280px' }} className="fixed-sidebar h-100 bg-dark text-light border-start border-dark" data-productdiv-ignore="true">
            <div className="h-100 d-flex flex-column container">
                <div className="d-flex justify-content-between align-items-center my-3">
                    <h4 className="mb-0">Tree View</h4>
                    {/* <button className="btn btn-sm btn-outline-light" type="button" onClick={() => console.log(componentTree)}>Log Tree</button> */}
                    <button className="btn btn-sm btn-secondary" type="button" onClick={() => setTreeViewOpen(false)}>x</button>
                </div>
                <div className="overflow-auto">
                    {componentTree ? (<TreeItemView {...props} />) : null}
                </div>
            </div>
        </div>
    )
}

type TreeItemViewProps = {
    componentTree?: NodeTreeMatch[],
    setElementEditorOpen(b: boolean): any
    setElementEditorState(n: NodeTreeMatch): any;
    elementEditorState: any,
};

function TreeItemView(props: TreeItemViewProps) {
    const {
        componentTree,
        setElementEditorOpen,
        setElementEditorState,
    } = props;

    return (
        <ul className="list-unstyled cursor-pointer ps-3">
            {componentTree.map((match, i) => (
                <TreeItem
                    elementEditorState={props.elementEditorState}
                    key={`${i}-${match.node.nodeName}-${match.node.textContent}`}
                    match={match}
                    setElementEditorOpen={setElementEditorOpen}
                    setElementEditorState={setElementEditorState}
                />
            ))
            }
        </ul>
    );
}

function getTreeItemArrow(match: NodeTreeMatch, collapsed: boolean) {
    const hasChildren = match.children.length > 0;
    if (!hasChildren) {
        return '';
    }
    return collapsed ? '►' : '▼';
}

export type TreeItemProps = {
    match: NodeTreeMatch,
    setElementEditorOpen(b: boolean): any,
    setElementEditorState(n: NodeTreeMatch): any,
    elementEditorState: any,
};

function TreeItem(props: TreeItemProps) {
    const {
        match,
        setElementEditorOpen,
        setElementEditorState,
        elementEditorState,
    } = props;
    const hidden = isElementHidden(match.node);
    const [collapsed, setCollapsed] = React.useState(hidden);
    if (match.node.nodeType === ChildNodeType.Comment) {
        return null;
    }

    const treeItemRef = React.useRef(null);
    const [treeItemActive, setTreeItemActive] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (elementEditorState.match === match) {
            treeItemRef.current.scrollIntoView();
            setTreeItemActive(true);
        } else {
            setTreeItemActive(false);
        }
    }, [elementEditorState.match])

    return (
        <React.Fragment>
            <li
                ref={treeItemRef}
                onMouseEnter={() => {
                    highlightElements([match.node])
                }}
                onMouseLeave={() => {
                    if (elementEditorState.match) {
                        highlightElements([elementEditorState.match.node]);
                    } else {
                        highlightElements([]);
                    }
                }}
                className={classnames(`text-nowrap productdiv-treeitem productdiv-treeitem-${match.type}`, { active: treeItemActive })}
                onClick={() => {
                    scrollIntoView(match.node);
                    setElementEditorState(match);
                    setElementEditorOpen(true);
                }}
            >
                <span
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {getTreeItemArrow(match, collapsed)}
                </span>
                {` `}
                {hidden && <span style={{ color: 'grey' }}>(Hidden) </span>}
                {match.name}
            </li>
            {
                !collapsed && match.children.length > 0 ? (
                    <TreeItemView
                        elementEditorState={props.elementEditorState}
                        componentTree={match.children}
                        setElementEditorOpen={setElementEditorOpen}
                        setElementEditorState={setElementEditorState}
                    />
                ) : null
            }
        </React.Fragment>
    );
}