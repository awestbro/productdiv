import * as React from 'react';
import * as classnames from 'classnames';

import { drawHoverElement, ElementEditorState } from '../editor/Application';
import { ElementEditor } from './ElementEditor';
import { ParsedLibraryConfigurationDefinition, TemplateCategoryDefinition } from '../lib/configuration/configuration-importer';
import { NodeTreeMatch } from '../lib/tree/tree-utils';
import { TemplateSelector } from './TemplateSelector';
import { copyElementToClipboard } from './ElementEditor';

const ProductDivLogo = () => (
<svg width="250" height="50" version="1.0" viewBox="0 0 375 75" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" zoomAndPan="magnify">
<defs>
<g id="i">
<path d="m13.156 0v-16.105h8.1406c16.344 0 16.402-26.016 0-26.016h-16.578v42.121zm0-24.305v-9.4414h7.4336c5.6641 0 5.6641 9.4414 0 9.4414z"/>
</g>
<g id="h">
<path d="m25.723 0h9.5547l-9.793-17.402c12.391-3.6016 10.914-24.777-4.1289-24.777h-16.637v42.18h8.4375v-16.105h4.0703zm-12.566-24.305v-9.4414h7.4336c5.7227 0 5.7227 9.4414 0 9.4414z"/>
</g>
<g id="g">
<path d="m25.016 0.58984c29.023 0 29.023-43.48 0-43.48-29.027 0-29.027 43.48 0 43.48zm0-8.7305c-16.875 0-16.875-26.078 0-26.078 16.871 0 16.871 26.078 0 26.078z"/>
</g>
<g id="a">
<path d="m17.285-42.18h-12.566v42.18h12.566c28.082 0 28.082-42.18 0-42.18zm0 8.4336c16.402 0 16.402 25.309 0 25.309h-4.1289v-25.309z"/>
</g>
<g id="f">
<path d="m34.984-14.691v-27.488h-8.3789v27.43c0 8.8516-13.688 8.8516-13.688 0v-27.43h-8.4336v27.488c0 20.059 30.5 20.059 30.5 0z"/>
</g>
<g id="e">
<path d="m31.562-32.387l1.0039-8.6719c-2.5391-1.1211-5.3711-1.6523-8.3203-1.6523-28.551 0-28.613 42.828 0 42.828 2.9492 0 6.668-0.70703 9.2617-1.7695l-1.1211-8.7305c-1.5898 0.82422-4.4805 1.8867-8.1406 1.8867-16.695 0-16.695-25.723 0-25.723 3.6602 0 5.7227 1.0039 7.3164 1.832z"/>
</g>
<g id="d">
<path d="m20.117 0v-33.746h10.5v-8.375h-29.438v8.375h10.5v33.746z"/>
</g>
<g id="c">
<path d="m13.156 0v-42.18h-8.4375v42.18z"/>
</g>
<g id="b">
<path d="m17.816 0.88672h1.8867l17.465-43.066h-9.7344l-5.6641 14.336-3.0078 8.4336-3.0703-8.7305-5.6016-14.039h-9.7344z"/>
</g>
</defs>
<g fill="#f7f0f0">
<use x="0.445965" y="57.099932" xlinkHref="#i" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#f7f0f0">
<use x="36.018228" y="57.099932" xlinkHref="#h" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#f7f0f0">
<use x="72.180411" y="57.099932" xlinkHref="#g" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#f7f0f0">
<use x="122.146754" y="57.099932" xlinkHref="#a" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#f7f0f0">
<use x="163.677222" y="57.099932" xlinkHref="#f" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#f7f0f0">
<use x="203.260937" y="57.099932" xlinkHref="#e" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#f7f0f0">
<use x="238.774194" y="57.099932" xlinkHref="#d" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#758fec" fill-opacity=".302">
<use x="274.780972" y="57.099984" xlinkHref="#a" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#758fec" fill-opacity=".302">
<use x="316.311441" y="57.099984" xlinkHref="#c" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#758fec" fill-opacity=".302">
<use x="334.245052" y="57.099984" xlinkHref="#b" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#758fec" fill-opacity=".502">
<use x="271.093462" y="57.099984" xlinkHref="#a" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#758fec" fill-opacity=".502">
<use x="312.62393" y="57.099984" xlinkHref="#c" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#758fec" fill-opacity=".502">
<use x="330.557541" y="57.099984" xlinkHref="#b" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#89aaf4">
<use x="267.405953" y="57.099984" xlinkHref="#a" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#89aaf4">
<use x="308.936421" y="57.099984" xlinkHref="#c" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
<g fill="#89aaf4">
<use x="326.870033" y="57.099984" xlinkHref="#b" xlinkActuate="onLoad" xlinkShow="embed" xlinkType="simple" xmlnsXlink="http://www.w3.org/1999/xlink"/>
</g>
</svg>

)

export type LeftNavProps = {
    getComponentTree(doc: Document, treeViewIgnoreQuerySelectors: string[]): NodeTreeMatch[],
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
    lastHoverPosition: {
        x: number,
        y: number,
    }
    iframeDocument: Document,
    onLeftNavClose: () => any;
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
        onLeftNavClose,
    } = props;

    let selectedComponent;

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
                        onLeftNavClose();
                    }}
                >
                    PD
                </button>
                <a 
                    href="https://github.com/awestbro/productdiv"
                    className="btn btn-sm btn-secondary me-2"
                    target="__blank"
                >
                    ?
                </a>
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
                    <ProductDivLogo />
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