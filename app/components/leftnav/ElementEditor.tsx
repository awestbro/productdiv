import * as React from 'react';
import { ChildNodeType } from '../../utilities/child-node-type';
import * as classnames from 'classnames';
// @ts-ignore
import * as differenceBy from 'lodash/differenceBy';

import { highlightElements } from "../../utilities/dom/canvas";
import { LeftNavProps } from "./LeftNav";
import { UtilityClassControl, UtilityClassDefinition } from '../../utilities/configuration/configuration-importer';
import { domTokenListToArray } from '../../utilities/selector';
import { AttributeEditor } from './AttributeEditor';
import { UtilityClassFormControl } from './UtilityClassFormControls';
import { ElementHtmlEditor } from './ElementHtmlEditor';

export type ElementEditorProps = LeftNavProps & {
    setTemplateEditorOpen: (b: boolean) => any;
}

export function ElementEditor(props: ElementEditorProps) {
    const { elementEditorState } = props;
    if (!elementEditorState.match || !elementEditorState.match.node) {
        return <ElementEditorHeader {...props} />
    }

    const { match } = elementEditorState;
    const isElement = match.node.nodeType === ChildNodeType.Element;

    const selectedDropdownIndex = parseInt(localStorage.getItem('productdiv-activedropdownindex')) || 0;
    const defaultDropdownState = [false, false, false];
    if (selectedDropdownIndex > defaultDropdownState.length) {
        defaultDropdownState[0] = true;
    } else {
        defaultDropdownState[selectedDropdownIndex] = true;
    }

    const [dropdownOpen, setDropdownOpen] = React.useState<boolean[]>(defaultDropdownState);

    function toggleShownMenu(dropdownNum: number) {
        const newState = [false, false, false];
        newState[dropdownNum] = true;
        localStorage.setItem('productdiv-activedropdownindex', `${dropdownNum}`);
        setDropdownOpen(newState);
    }

    return (
        <React.Fragment>
            <div className="h-100 d-flex flex-column container">
                <ElementEditorHeader {...props} />
                {isElement && (
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a
                                className={classnames("nav-link", { active: dropdownOpen[0] })}
                                onClick={() => toggleShownMenu(0)}
                                href="#"
                            >
                                Modify
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={classnames("nav-link", { active: dropdownOpen[2] })}
                                onClick={() => toggleShownMenu(2)}
                                href="#"
                            >
                                Attributes
                            </a>
                        </li>
                    </ul>
                )}
                <div className="productdiv-scrollable-section">
                    {isElement && (
                        <React.Fragment>
                            <div className="productdiv-selected-body">
                                {dropdownOpen[0] && <ElementHtmlEditor {...props} />}
                                {dropdownOpen[2] && <AttributeEditor {...props} />}
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export function UtilityClassEditor(props: LeftNavProps) {
    const { configuration, elementEditorState } = props;
    const allUtilityClasses = configuration.utilityClasses;
    const components = configuration.components;
    const [filteredControls, setFilteredControls] = React.useState<UtilityClassDefinition[]>([]);
    const [queryMatchControls, setQueryMatchControls] = React.useState<UtilityClassDefinition[]>([]);
    const [activeControl, setActiveControl] = React.useState<UtilityClassDefinition>(null);
    const [nonDefaultControls, setNonDefaultControls] = React.useState<UtilityClassDefinition[]>([]);
    const [nonDefaultOpen, setNonDefaultOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        const selectedElement = elementEditorState.match.node as Element;
        const queryMatch: UtilityClassDefinition[] = [];
        components.forEach((c) => {
            const selectors = c.selectors || [];
            if (selectors.find((s) => selectedElement.matches(s))) {
                c.utilityClassMatches.forEach((utilityClassName) => {
                    const queryMatchUc = allUtilityClasses.find((uc) => uc.section === utilityClassName);
                    if (queryMatchUc) {
                        queryMatch.push(queryMatchUc);
                    }
                });
            }
        });
        const filtered: UtilityClassDefinition[] = differenceBy(allUtilityClasses, queryMatch, 'section');
        const filteredDefault = filtered.filter((uc) => uc.showDefault);
        const nonDefault = filtered.filter((uc) => !uc.showDefault);
        // Active controls
        const activeControl: UtilityClassControl[] = [];
        const activeClasses = domTokenListToArray(selectedElement.classList);
        allUtilityClasses.forEach((utilityClassDefinition) => {
            const controls = utilityClassDefinition.controls;
            controls.forEach((control) => {
                const classes = control.classes || [];
                if (classes.some((r) => activeClasses.includes(r))) {
                    activeControl.push(control);
                }
            })
        });
        if (activeControl.length > 0) {
            setActiveControl({
                section: 'Active',
                controls: activeControl,
            });
        } else {
            setActiveControl(null);
        }

        setFilteredControls(filteredDefault);
        setQueryMatchControls(queryMatch);
        setNonDefaultControls(nonDefault);
    }, [elementEditorState.match])

    return (
        <React.Fragment>
            <hr />
            {activeControl !== null && (
                <React.Fragment>
                    <UtilityClassFormControlGrid controls={[activeControl]} openDefault={true} {...props} />
                    <hr />
                </React.Fragment>
            )}
            {queryMatchControls.length > 0 && (
                <React.Fragment>
                    <UtilityClassFormControlGrid controls={queryMatchControls} openDefault={true} {...props} />
                    <hr />
                </React.Fragment>
            )}
            <UtilityClassFormControlGrid controls={filteredControls} {...props} />
            {nonDefaultControls.length > 0 && (
                <React.Fragment>
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <p className="mb-0 fs-4 fw-bold">More...</p>
                        <button 
                            className="btn btn-sm btn-secondary" 
                            type="button"
                            onClick={() => {
                                setNonDefaultOpen(!nonDefaultOpen);
                            }}
                        >
                            {nonDefaultOpen ? 'v' : '>'}
                        </button>
                    </div>
                    {nonDefaultOpen && (
                        <React.Fragment>
                            <hr />
                            <UtilityClassFormControlGrid controls={nonDefaultControls} {...props} />
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

function UtilityClassFormControlGrid(props: { controls: UtilityClassDefinition[], openDefault?: boolean } & LeftNavProps) {
    const { controls, openDefault } = props;
    return (
        <React.Fragment>
            {controls.map((u) => <UtilityClassListItem key={u.section} utilityClassDefinition={u} {...props} />)}
        </React.Fragment>
    )
}

function UtilityClassListItem(props: { utilityClassDefinition: UtilityClassDefinition, openDefault?: boolean } & LeftNavProps) {
    const { utilityClassDefinition, elementEditorState, openDefault } = props;
    const [open, setOpenState] = React.useState(openDefault || false);
    return (
        <div className="mb-3" key={utilityClassDefinition.section}>
            <UtilityClassHeader open={open} toggleOpen={() => setOpenState(!open)} utilityClassDefinition={utilityClassDefinition} />
            {open ? (
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                    {utilityClassDefinition.controls.map((control) => (
                        <UtilityClassFormControl
                            key={control.name}
                            element={elementEditorState.match.node as Element}
                            control={control}
                            redrawComponentTree={props.redrawComponentTree}
                            redrawHighlightedNode={props.redrawHighlightedNode}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

function UtilityClassHeader(props: { utilityClassDefinition: UtilityClassDefinition, open: boolean, toggleOpen: () => void }) {
    const u = props.utilityClassDefinition;
    const { open, toggleOpen } = props;
    return (
        <div className="d-flex justify-content-between align-items-center mb-1 mt-2">
            <h4 className="text-decoration-underline mb-0">{u.section}</h4>
            <div>
                {u.documentationLink ? (
                    <a href={u.documentationLink} target="__blank" className="btn btn-secondary btn-sm me-2">
                        ?
                    </a>
                ) : 
                    <div />
                }
                <button type="button" onClick={toggleOpen} className="btn btn-secondary btn-sm">{open ? 'v' : '>'}</button>
            </div>
        </div>
    );
}

export function findPositionRelativeToParent(element: Element): number {
    const parent = element.parentNode;
    let position = 0;
    for (let i = 0; i < parent.childNodes.length; i++) {
        if (parent.childNodes[i] === element) {
            position = i;
        }
    }
    return position;
}

export function htmlStringToNodeList(html: string): NodeListOf<ChildNode> {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.childNodes;
}

function ElementEditorHeader(props: LeftNavProps) {
    const { setElementEditorOpen, elementEditorState, setElementEditorState, redrawHighlightedNode } = props;
    if (elementEditorState.match === null) {
        return (
            <div className="d-flex justify-content-between align-items-center my-3">
                <h4
                    className="mb-0 text-nowrap"
                    style={{ textOverflow: 'ellipsis' }}
                >
                    No Component
                </h4>
                <button
                    className="btn btn-sm btn-secondary"
                    type="button"
                    onClick={() => {
                        setElementEditorOpen(false);
                        setElementEditorState({ match: null });
                        redrawHighlightedNode(false);
                    }}
                >
                    x
                </button>
            </div>
        );
    }

    const { match } = elementEditorState;

    return (
        <div className="d-flex justify-content-between align-items-center my-3">
            <h4
                className="mb-0 text-nowrap overflow-hidden"
                style={{ textOverflow: 'ellipsis' }}
                onMouseEnter={() => {
                    highlightElements([match.node])
                }}
                onMouseLeave={() => highlightElements([])}
            >
                {elementEditorState.match?.name}
            </h4>
            <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => {
                    setElementEditorOpen(false)
                    setElementEditorState({ match: null });
                    redrawHighlightedNode(false);
                }}
            >
                x
            </button>
        </div>
    )
}