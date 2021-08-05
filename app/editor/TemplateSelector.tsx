import * as React from 'react';
import Fuse from 'fuse.js';
// @ts-ignore
import * as flatten from 'lodash/flatten';

import { addTemplateToElement } from '../lib/dom/dom-utilities';
import { TemplateCategoryDefinition, TemplateDefinition } from "../lib/configuration/configuration-importer";
import { getTreeMatchFromElement, NodeTreeMatch } from "../lib/tree/tree-utils";
import { drawHoverElement, ElementEditorState } from "./Application";
import { PlacementType } from '../lib/dom/canvas';

type TemplateSelectorProps = {
    iframeDocuemnt: Document,
    modifyingElement?: Node,
    setTemplateEditorOpen?: (b: boolean) => any;
    redrawComponentTree(): NodeTreeMatch[],
    templateCategories: TemplateCategoryDefinition[],
    setElementEditorState(s: ElementEditorState): any,
    setElementEditorOpen(b: boolean): any,
    drawHoverElement: typeof drawHoverElement,
    dropZoneSelector: string,
    showTemplatePreview: (s: string) => any,
    hideTemplatePreview: () => any,
    lastHoverPosition: {
        x: number,
        y: number,
    }
};

export function TemplateSelector(props: TemplateSelectorProps) {
    const {
        templateCategories,
        setTemplateEditorOpen,
        modifyingElement,
        redrawComponentTree,
        setElementEditorState,
        setElementEditorOpen,
        dropZoneSelector,
    } = props;
    const [selectedCategory, setSelectedCategory] = React.useState<TemplateCategoryDefinition>(null);

    const dragMode = (setTemplateEditorOpen && modifyingElement) ? false : true;
    const [placementSelectorOpen, setPlacementSelectorOpen] = React.useState<boolean>(false);
    const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateDefinition>(null);
    const [filterText, setFilterText] = React.useState<string>('');
    const [filteredTemplates, setFilteredTemplates] = React.useState<TemplateDefinition[]>(null);
    
    React.useEffect(() => {
        const templates = flatten(templateCategories.map((t) => t.templates));
        const s = new Fuse(templates, {keys: ['name']});
        if (filterText) {
            const res = s.search(filterText);
            setFilteredTemplates(res.map((r) => r.item));
        } else {
            setFilteredTemplates([]);
        }
    }, [filterText]);

    const wrapperclasses = dragMode ? '' : 'h-100 d-flex flex-column container my-3';

    if (placementSelectorOpen) {
        return (
            <PlacementTypeSelector
                element={modifyingElement as Element}
                dropZoneSelector={dropZoneSelector}
                onPlacementSelect={(placement: PlacementType) => {
                    const placedElement = addTemplateToElement(selectedTemplate, (modifyingElement as Element), placement);
                    const tree = redrawComponentTree();
                    setPlacementSelectorOpen(false);
                    setSelectedTemplate(null);
                    setElementEditorState({ match: getTreeMatchFromElement(tree, placedElement) })
                    setElementEditorOpen(true);
                    setTemplateEditorOpen(false);
                }}
            />
        )
    }

    if (!selectedCategory) {
        return (
            <div className={wrapperclasses}>
                <h4 className="text-light fw-bold h4">Templates</h4>
                <div className="container">
                    <div className="row">
                        <div className="col px-2 pb-3">
                            <input className="form-control" value={filterText} onChange={(e) => setFilterText(e.target.value)} type="text" placeholder="Filter templates" />
                        </div>
                    </div>
                    {filterText ? (
                        <div className="row overflow-auto">
                            {filteredTemplates.map((template, i) => (
                                <TemplateButton
                                    {...props}
                                    template={template}
                                    onTemplateSelect={(t: TemplateDefinition) => {
                                        setPlacementSelectorOpen(true);
                                        setSelectedTemplate(t);
                                    }}
                                    key={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="row overflow-auto">
                            {templateCategories.map((t, i) => (
                                <div key={i} className="col-sm-6 p-2">
                                    <button onClick={() => setSelectedCategory(t)} type="button" className="btn btn-secondary w-100">
                                        {t.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
    return (
        <div className={wrapperclasses}>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-light fw-light">{selectedCategory.name}</h2>
                <button onClick={() => setSelectedCategory(null)} className="btn btn-sm btn-secondary">x</button>
            </div>
            <div className="container">
                <div className="row overflow-auto">
                    {selectedCategory.templates.map((template, i) => (
                        <TemplateButton
                            {...props}
                            template={template}
                            onTemplateSelect={(t: TemplateDefinition) => {
                                setPlacementSelectorOpen(true);
                                setSelectedTemplate(t);
                            }}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

type TemplateButtonProps = TemplateSelectorProps & {
    template: TemplateDefinition;
    onTemplateSelect: (t: TemplateDefinition) => any;
    showTemplatePreview: (s: string, w?: string) => any,
    hideTemplatePreview: () => any,
}

export function TemplateButton(props: TemplateButtonProps) {
    const {
        redrawComponentTree,
        lastHoverPosition,
        setElementEditorState,
        setElementEditorOpen,
        drawHoverElement,
        template,
        setTemplateEditorOpen,
        modifyingElement,
        onTemplateSelect,
        showTemplatePreview,
        hideTemplatePreview,
        iframeDocuemnt,
    } = props;
    const dragMode = (setTemplateEditorOpen && modifyingElement) ? false : true;

    if (!dragMode) {
        return (
            <div className="col-sm-12">
                <div
                    className="btn btn-secondary w-100 mb-2 py-2"
                    onMouseEnter={() => {
                        showTemplatePreview(template.htmlTemplate, template.previewWidth);
                    }}
                    onMouseLeave={() => {
                        hideTemplatePreview();
                    }}
                    onClick={() => {
                        hideTemplatePreview();
                        onTemplateSelect(template);
                    }}
                >
                    {template.name}
                </div>
            </div>
        );
    }
    return (
        <div className="col-sm-12">
            <div
                draggable
                className="btn btn-secondary w-100 mb-2 py-2"
                onMouseEnter={() => {
                    showTemplatePreview(template.htmlTemplate, template.previewWidth);
                }}
                onMouseLeave={() => {
                    hideTemplatePreview();
                }}
                onDragStart={() => {
                    hideTemplatePreview();
                    iframeDocuemnt.body.classList.add('productdiv-dragging');
                }}
                onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
                    if (lastHoverPosition.x === 0 && lastHoverPosition.y === 0) {
                        iframeDocuemnt.body.classList.remove('productdiv-dragging');
                        return;
                    }

                    const { placement, element } = drawHoverElement(lastHoverPosition.x, lastHoverPosition.y);
                    const placedElement = addTemplateToElement(template, element, placement);
                    iframeDocuemnt.body.classList.remove('productdiv-dragging');
                    const tree = redrawComponentTree();
                    setElementEditorState({ match: getTreeMatchFromElement(tree, placedElement) })
                    setElementEditorOpen(true);
                }}
            >
                {template.name}
            </div>
        </div>
    )
}

type PlacementTypeSelectorProps = {
    element: Element;
    onPlacementSelect: (p: PlacementType) => any;
    dropZoneSelector?: string;
}

export function PlacementTypeSelector(props: PlacementTypeSelectorProps) {
    const { element, onPlacementSelect, dropZoneSelector } = props;

    React.useEffect(() => {
        if (dropZoneSelector && element.matches(dropZoneSelector)) {
            onPlacementSelect(PlacementType.REPLACE);
        }
    }, []);


    let options = [{
        name: 'Before',
        type: PlacementType.OUTER_PREPEND
    }, {
        name: 'After',
        type: PlacementType.OUTER_APPEND
    }, {
        name: 'First Child',
        type: PlacementType.INNER_PREPEND
    }, {
        name: 'Last Child',
        type: PlacementType.INNER_APPEND
    }, {
        name: 'Replace',
        type: PlacementType.REPLACE
    }];

    if (element.children.length === 0) {
        options = [{
            name: 'Before',
            type: PlacementType.OUTER_PREPEND
        }, {
            name: 'After',
            type: PlacementType.OUTER_APPEND
        }, {
            name: 'Child',
            type: PlacementType.INNER_PREPEND
        }, {
            name: 'Replace',
            type: PlacementType.REPLACE
        }];
    }

    return (
        <React.Fragment>
            <div className="h-100 d-flex flex-column container my-3">
                <h2 className="text-light">Choose Placement Type</h2>
                <div className="container">
                    <div className="row overflow-auto">
                        {options.map((o, i) => (
                            <div className="mb-1" key={i}>
                                <button
                                    type="button"
                                    className="btn btn-secondary w-100"
                                    onClick={() => {
                                        onPlacementSelect(o.type);
                                    }}
                                >
                                    {o.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}