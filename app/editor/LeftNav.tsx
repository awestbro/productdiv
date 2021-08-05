import * as React from 'react';
import * as classnames from 'classnames';

import { drawHoverElement, ElementEditorState } from '../editor/Application';
import { ElementEditor } from './ElementEditor';
import { ParsedLibraryConfigurationDefinition, TemplateCategoryDefinition } from '../lib/configuration/configuration-importer';
import { NodeTreeMatch } from '../lib/tree/tree-utils';
import { TemplateSelector } from './TemplateSelector';
import { copyElementToClipboard } from './ElementEditor';

export type LeftNavProps = {
    configuration: ParsedLibraryConfigurationDefinition,
    templateCategories: TemplateCategoryDefinition[],
    elementEditorState: ElementEditorState,
    setElementEditorState(s: ElementEditorState): any,
    treeViewOpen: boolean,
    setTreeViewOpen(b: boolean): any,
    elementEditorOpen: boolean,
    setElementEditorOpen(b: boolean): any,
    redrawComponentTree(): NodeTreeMatch[],
    redrawHighlightedNode(node?: Node | false): any,
    drawHoverElement: typeof drawHoverElement,
    componentTree: NodeTreeMatch[],
    dropZoneSelector: string,
    templateEditorOpen: boolean,
    setTemplateEditorOpen: (b: boolean) => any,
    showTemplatePreview: (s: string, w?: string) => any,
    hideTemplatePreview: () => any,
    setLeftNavOpen: (b: boolean) => any,
    leftNavOpen: boolean,
    lastHoverPosition: {
        x: number,
        y: number,
    }
    iframeDocument: Document,
}

export function LeftNav(props: LeftNavProps) {
    const {
        elementEditorOpen,
        drawHoverElement,
        elementEditorState,
        setElementEditorOpen,
        setElementEditorState,
        dropZoneSelector,
        templateCategories,
        redrawComponentTree,
        lastHoverPosition,
        templateEditorOpen,
        setTemplateEditorOpen,
        showTemplatePreview,
        hideTemplatePreview,
        iframeDocument,
        setTreeViewOpen,
        treeViewOpen,
        redrawHighlightedNode,
        leftNavOpen,
        setLeftNavOpen,
    } = props;

    let selectedComponent;

    if (!leftNavOpen) {
        return (
            <button 
                type="button"
                id="productdiv-leftnav-toggle"
                className="btn btn-primary"
                data-productdiv="true"
                style={{ position: 'absolute', bottom: 15, left: 15, zIndex: 999, fontWeight: 'bold' }}
                onClick={() => {
                    setLeftNavOpen(true);
                }}
            >
                PD
            </button>
        )
    }

    if (templateEditorOpen) {
        selectedComponent = (
            <TemplateSelector
                iframeDocuemnt={iframeDocument}
                showTemplatePreview={showTemplatePreview}
                hideTemplatePreview={hideTemplatePreview}
                dropZoneSelector={dropZoneSelector}
                modifyingElement={elementEditorState.match?.node}
                setTemplateEditorOpen={setTemplateEditorOpen}
                drawHoverElement={drawHoverElement}
                setElementEditorState={setElementEditorState}
                setElementEditorOpen={setElementEditorOpen}
                templateCategories={templateCategories}
                redrawComponentTree={redrawComponentTree}
                lastHoverPosition={lastHoverPosition}
            /> 
        )
    } else if (elementEditorOpen) {
        selectedComponent = (
            <ElementEditor {...props} setTemplateEditorOpen={setTemplateEditorOpen} />
        )
    } else {
        selectedComponent = (
            <LeftNavMenu {...props} />
        )
    }

    return (
        <div style={{ width: '23%', resize: 'horizontal', overflow: 'auto', flexShrink: 0 }} className="d-flex flex-column justify-content-between h-100 bg-dark text-light border-end border-dark">
            <div className="h-100 bg-dark text-light overflow-auto" data-productdiv-ignore="true">
                {selectedComponent}
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center p-2" style={{ position: 'sticky', bottom: 0, boxShadow: '0px -2px 7px 0px rgb(23 23 23)', borderTop: '1px solid rgb(23 23 23)' }}>
                <button 
                    type="button" 
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => {
                        setElementEditorState({ match: null });
                        setElementEditorOpen(false);
                        redrawHighlightedNode(null);
                        setLeftNavOpen(false);
                    }}
                >
                    PD
                </button>
                <button 
                    title="Toggle Tree"
                    className={classnames('btn btn-sm', { 'btn-secondary': !treeViewOpen, 'btn-primary': treeViewOpen })}
                    onClick={() => {
                        setTreeViewOpen(!treeViewOpen);
                        redrawHighlightedNode();
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-filter-right" viewBox="0 0 20 20">
                        <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export function LeftNavMenu(props: LeftNavProps) {
    const {
        setTreeViewOpen,
        treeViewOpen,
        templateCategories,
        redrawComponentTree,
        lastHoverPosition,
        redrawHighlightedNode,
        dropZoneSelector,
        setElementEditorState,
        setElementEditorOpen,
        drawHoverElement,
        showTemplatePreview,
        hideTemplatePreview,
        iframeDocument,
    } = props;

    return (
        <React.Fragment>
            <div
                className="h-100 d-flex flex-column container"
            >
                <div className="d-flex justify-content-between align-items-center my-3">
                    <h4 className="mb-0">ProductDiv</h4>
                </div>
                <div className="my-3">
                    <h4 className="text-light fw-bold h4">Actions</h4>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => {
                            copyElementToClipboard(iframeDocument.documentElement);
                        }}
                    >
                        Copy All HTML
                    </button>
                </div>
                <TemplateSelector
                    iframeDocuemnt={iframeDocument}
                    showTemplatePreview={showTemplatePreview}
                    hideTemplatePreview={hideTemplatePreview}
                    dropZoneSelector={dropZoneSelector}
                    drawHoverElement={drawHoverElement}
                    setElementEditorState={setElementEditorState}
                    setElementEditorOpen={setElementEditorOpen}
                    templateCategories={templateCategories}
                    redrawComponentTree={redrawComponentTree}
                    lastHoverPosition={lastHoverPosition}
                />
            </div>
        </React.Fragment>
    )
}