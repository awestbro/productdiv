import * as React from 'react';
import { ChildNodeType } from '../enum/child-node-type';
import * as classnames from 'classnames';
import { html_beautify } from 'js-beautify';
import { DropdownList, Multiselect } from 'react-widgets';
// @ts-ignore
import * as ListOption from 'react-widgets/lib/ListOption';
// @ts-ignore
import * as differenceBy from 'lodash/differenceBy';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/htmlmixed/htmlmixed';

import { highlightElements } from "../lib/dom/canvas";
import { LeftNavProps } from "./LeftNav";
import { UtilityClassControl, UtilityClassDefinition } from '../lib/configuration/configuration-importer';
import { domTokenListToArray, nodeListToArray } from '../selector';
import { getParentMatch, getTreeMatchFromElement } from '../lib/tree/tree-utils';
import { AttributeEditor } from './AttributeEditor';

const beautify_opts = {
    "max_preserve_newlines": 1,
}

export function addClassDefinition(element: Element, classString: string) {
    if (!classString) {
        return;
    }
    const classesToAdd = classString.split(/\s+/g) || [];
    element.classList.add(...classesToAdd);
}

export function removeClassDefinition(element: Element, classString: string) {
    const classesToAdd = classString.split(/\s+/g) || [];
    element.classList.remove(...classesToAdd);
}

export function sanitizeHtmlToString(element: Element) {
    const copy = (element.cloneNode(true) as Element);
    copy.querySelectorAll('[data-productdiv="true"]').forEach(e => e.remove());
    return html_beautify(copy.outerHTML, beautify_opts);
}

export function copyElementToClipboard(element: Element) {
    copyToClipboard(sanitizeHtmlToString(element));
}

function copyToClipboard(val: string) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = val;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

type ElementEditorProps = LeftNavProps & {
    setTemplateEditorOpen: (b: boolean) => any;
}

export function ElementEditor(props: ElementEditorProps) {
    const { elementEditorState } = props;
    if (!elementEditorState.match || !elementEditorState.match.node) {
        return <ElementEditorHeader {...props} />
    }

    const { match } = elementEditorState;
    const isElement = match.node.nodeType === ChildNodeType.Element;
    const isText = match.node.nodeType === ChildNodeType.Text;

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
                    {isText && <TextEditor {...props} />}
                    {isElement && (
                        <React.Fragment>
                            <div className="productdiv-selected-body">
                                {dropdownOpen[0] && <ElementModifier {...props} />}
                                {dropdownOpen[2] && <AttributeEditor {...props} />}
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    )

}

function UtilityClassEditor(props: LeftNavProps) {
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

function UtilityClassFormControl(props: { element: Element, control: UtilityClassControl, redrawComponentTree: any, redrawHighlightedNode: any }) {
    const { control } = props;
    if (control.type === 'selectOne') {
        return <SelectControl {...props} />
    } else if (control.type === 'selectMany') {
        return <MultiSelectControl {...props} />
    }
    return null;
}

function SelectControl(props: { control: UtilityClassControl, element: Element, redrawComponentTree: any, redrawHighlightedNode: any }) {
    const { control, element, redrawComponentTree, redrawHighlightedNode } = props;
    const classOptions = ["", ...control.classes] || [""];
    const classList = domTokenListToArray(element.classList)
    const [restoreClass, _setRestoreClass] = React.useState("");
    const [redraw, setRedraw] = React.useState(0);

    const foundClass = classList.find((c: string) => classOptions.includes(c)) || '';
    const [value, _setValue] = React.useState(foundClass);

    const valueRef = React.useRef(value);
    const setValue = (v: string) => {
        valueRef.current = v;
        _setValue(v);
    }

    const restoreClassRef = React.useRef(restoreClass);
    const setRestoreClass = (c: string) => {
        restoreClassRef.current = c;
        _setRestoreClass(c);
    }

    const onMouseEnter = (v: string) => {
        setRestoreClass(element.classList.value);
        classOptions.forEach((c) => {
            if (c !== "") {
                removeClassDefinition(element, c);
            }
        });
        addClassDefinition(element, v);
        props.redrawHighlightedNode();
    }
    const onMouseLeave = (v: string) => {
        if (valueRef.current !== v) {
            element.classList.value = restoreClassRef.current;
            setRestoreClass("");
            redrawHighlightedNode();
        }
    }

    React.useEffect(() => {
        const classList = domTokenListToArray(element.classList)
        setValue(classList.find((c: string) => classOptions.includes(c)) || '');
    }, [element, value]);

    return (
        <div className="element-editor-select-control">
            <div>{control.name}</div>
            <DropdownList
                onSelect={(v: any) => {
                    classOptions.forEach((c) => {
                        if (c !== "") {
                            removeClassDefinition(element, c);
                        }
                    });
                    addClassDefinition(element, v);
                    setValue(v);
                    setRestoreClass(element.classList.value);
                    setRedraw(redraw + 1);
                    redrawComponentTree();
                    props.redrawHighlightedNode();
                }}
                data={classOptions}
                filter="contains"
                defaultValue={value}
                value={value}
                onChange={(v) => setValue(v)}
                // @ts-ignore
                optionComponent={(props: any) => (
                    <ListOption
                        {...props}
                        onMouseEnter={() => onMouseEnter(props.dataItem)}
                        onMouseLeave={() => onMouseLeave(props.dataItem)}
                    />
                )}
            />
        </div>
    );
}

function MultiSelectControl(props: { control: UtilityClassControl, element: Element, redrawComponentTree: any, redrawHighlightedNode: any }) {
    const { control, element, redrawComponentTree, redrawHighlightedNode } = props;
    const classOptions = ["", ...control.classes] || [""];
    const classList = domTokenListToArray(element.classList)
    const [restoreClass, _setRestoreClass] = React.useState("");
    const [redraw, setRedraw] = React.useState(0);

    const foundClasses = classList.filter((c: string) => classOptions.includes(c));
    const [value, _setValue] = React.useState(foundClasses);

    const valueRef = React.useRef(value);
    const setValue = (v: string[]) => {
        valueRef.current = v;
        _setValue(v);
    }

    const restoreClassRef = React.useRef(restoreClass);
    const setRestoreClass = (c: string) => {
        restoreClassRef.current = c;
        _setRestoreClass(c);
    }

    const onMouseEnter = (v: string) => {
        setRestoreClass(element.classList.value);
        addClassDefinition(element, v);
        props.redrawHighlightedNode();
    }
    const onMouseLeave = (v: string[]) => {
        if (valueRef.current !== v) {
            element.classList.value = restoreClassRef.current;
            setRestoreClass("");
            redrawHighlightedNode();
        }
    }

    React.useEffect(() => {
        const classList = domTokenListToArray(element.classList)
        setValue(classList.filter((c: string) => classOptions.includes(c)));
    }, [element]);

    return (
        <div className="element-editor-select-control">
            <div>{control.name}</div>
            <Multiselect
                data={classOptions}
                defaultValue={value}
                value={value}
                filter="contains"
                onChange={(v) => {
                    classOptions.forEach((c) => {
                        if (c !== "") {
                            removeClassDefinition(element, c);
                        }
                    });
                    v.forEach((c) => {
                        addClassDefinition(element, c);
                    });
                    setRestoreClass(element.classList.value);
                    setRedraw(redraw + 1);
                    redrawComponentTree();
                    redrawHighlightedNode();
                    setValue(v);
                }}
                // @ts-ignore
                optionComponent={(props: any) => (
                    <ListOption
                        {...props}
                        onMouseEnter={() => onMouseEnter(props.dataItem)}
                        onMouseLeave={() => onMouseLeave(props.dataItem)}
                    />
                )}
            />
        </div>
    );
}

function ElementModifier(props: ElementEditorProps) {
    const {
        elementEditorState,
        redrawComponentTree,
        setElementEditorOpen,
        setElementEditorState,
        componentTree,
        redrawHighlightedNode,
        setTemplateEditorOpen
    } = props;

    const element: Element = (elementEditorState.match.node as Element);

    return (
        <div className="mt-2">
            <InnerHTMLEditor {...props} />
            <div className="my-2 d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                        const parent = getParentMatch(componentTree, elementEditorState.match);
                        if (parent) {
                            setElementEditorState({ match: parent });
                            redrawHighlightedNode(parent.node);
                        }
                    }}
                >
                    Select Parent
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                        const clone = element.cloneNode(true) as Element;
                        if (clone.id) {
                            clone.id = clone.id + '-1';
                        }
                        element.after(clone);
                        redrawComponentTree();
                    }}
                >
                    Duplicate
                </button>
                <button
                    type="button"
                    className={classnames("btn btn-sm btn-outline-danger", { disabled: element.nodeName === 'BODY' })}
                    onClick={() => {
                        if (element.nodeName !== 'BODY') {
                            element.remove();
                        }
                        redrawComponentTree();
                        setElementEditorOpen(false);
                        setElementEditorState({ match: null });
                    }}
                >
                    Delete
                </button>
            </div>
            <div className="my-2 d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                        setTemplateEditorOpen(true);
                    }}
                >
                    Add Element
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                        copyElementToClipboard(element);
                    }}
                >
                    Copy HTML
                </button>
            </div>
            <div className="my-2 d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                        copyToClipboard(element.classList.toString());
                    }}
                >
                    Copy Classes
                </button>
            </div>
            <UtilityClassEditor {...props} />
        </div>
    );
}

function TextEditor(props: LeftNavProps) {
    const { elementEditorState } = props;
    const node = elementEditorState.match.node;
    const [text, setText] = React.useState(node.textContent);

    React.useEffect(() => {
        setText(node.textContent);
    }, [elementEditorState])
    return (
        <React.Fragment>
            Text Editor
            <textarea
                autoFocus
                className="form-control"
                name="textContent"
                id="textContent"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    node.textContent = e.target.value;
                }}
            >
            </textarea>
        </React.Fragment>
    );
}

function findPositionRelativeToParent(element: Element): number {
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

function replaceParentElementChildren(parentElement: Element, oldChildNode: Element | null, newChildNodes: NodeListOf<ChildNode>, trackedNodes: ChildNode[]) {
    let returnNode: ChildNode = null;
    let trackedChildrenNodes: ChildNode[] = [];
    
    [...nodeListToArray(newChildNodes)].forEach((node: ChildNode, i: number) => {
        let insertedNode;
        if (oldChildNode) {
            insertedNode = parentElement.insertBefore(node, oldChildNode);
        } else {
            insertedNode = parentElement.appendChild(node);
        }
        if (returnNode === null && insertedNode.nodeType === ChildNodeType.Element) {
            returnNode = insertedNode;
        }
        trackedChildrenNodes.push(insertedNode);
    });

    trackedNodes.forEach((node) => node.remove());
    if (oldChildNode) {
        oldChildNode.remove();
    }

    return {
        returnNode,
        trackedChildrenNodes,
    };
}

const TextWrapIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H3Z" fill="#212121"/>
        <path d="M3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H19.25C20.3546 13 21.25 13.8954 21.25 15C21.25 16.1046 20.3546 17 19.25 17H15.4142L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L12.2929 17.2929C11.9024 17.6834 11.9024 18.3166 12.2929 18.7071L14.2929 20.7071C14.6834 21.0976 15.3166 21.0976 15.7071 20.7071C16.0976 20.3166 16.0976 19.6834 15.7071 19.2929L15.4142 19H19.25C21.4591 19 23.25 17.2091 23.25 15C23.25 12.7909 21.4591 11 19.25 11H3Z" fill="#212121"/>
        <path d="M2 18C2 17.4477 2.44772 17 3 17H9C9.55228 17 10 17.4477 10 18C10 18.5523 9.55228 19 9 19H3C2.44772 19 2 18.5523 2 18Z" fill="#212121"/>
    </svg>
)

const TextOverflowIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
        <path d="M8 10V38" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <path d="M24 4V16" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <path d="M16 24H42" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <path d="M37.0561 19.0113L42.0929 24.0255L37.0561 29.123" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 32V44" stroke="black" stroke-width="4" stroke-linecap="round"/>
    </svg>

)

/**
 * Changing body doesn't work
 * Wrapping an element with another doesn't work
 */
function InnerHTMLEditor(props: LeftNavProps) {
    const { elementEditorState, redrawHighlightedNode, iframeDocument, setElementEditorState, componentTree, configuration, getComponentTree, redrawComponentTree } = props;
    
    const [text, setHTML] = React.useState('');
    const [textWrap, _setTextWrap] = React.useState<boolean>(localStorage.getItem('productdiv-editorwrap') === 'true' || false);

    const element = React.useRef<Element>();
    const parentElementRef = React.useRef<Element>();
    const parentPositionRef = React.useRef(0);
    const editingElementsRef = React.useRef<ChildNode[]>([]);

    function setTextWrap(b: boolean) {
        localStorage.setItem('productdiv-editorwrap', `${b}`);
        _setTextWrap(b);
    }

    React.useEffect(() => {
        element.current = (elementEditorState.match.node as Element);
        parentElementRef.current = element.current.parentElement;
        parentPositionRef.current = findPositionRelativeToParent(element.current);
        setHTML(html_beautify(element.current.outerHTML, beautify_opts));
        return () => {
            parentPositionRef.current = 0;
        }
    }, [elementEditorState, componentTree]);

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="mb-0">HTML Editor</p>
                <button 
                    type="button"
                    title="Toggle Text Wrap"
                    className={classnames("btn btn-sm btn-primary")}
                    onClick={() => {
                        setTextWrap(!textWrap)
                    }}
                >
                    {textWrap 
                    ?  <TextWrapIcon />
                    : <TextOverflowIcon />
                    }
                </button>
            </div>
            <CodeMirror
                value={text}
                options={{
                    mode: 'htmlmixed',
                    theme: 'oceanic-next',
                    lineWrapping: textWrap,
                }}
                onBeforeChange={(editor, data, value) => {
                    setHTML(value);
                    const editingBody = element.current.nodeName === 'BODY';
                    if (editingBody) {
                        const doc = new DOMParser().parseFromString(value, "text/html");
                        const iframeBody = iframeDocument.body;
                        // sometimes setAttribute complains if blank attributes exist
                        try {
                            for (let attr of Array.from(iframeBody.attributes)) {
                                iframeBody.attributes.removeNamedItem(attr.nodeName);
                            }
                            for (let attr of Array.from(doc.body.attributes)) {
                                iframeBody.setAttribute(attr.nodeName, attr.nodeValue);
                            }
                        } catch (e) { }
                        // If productdiv elements still available, set body changes, else don't allow commits
                        if (doc.querySelectorAll('[data-productdiv]').length >= 4) {
                            iframeBody.innerHTML = doc.body.innerHTML;
                        }
                        redrawHighlightedNode(iframeBody);
                    } else {
                        const newNodes = htmlStringToNodeList(value);
                        const { trackedChildrenNodes, returnNode } = replaceParentElementChildren((element.current.parentNode as Element), element.current, newNodes, editingElementsRef.current);
                        editingElementsRef.current = trackedChildrenNodes;
                        element.current = (returnNode as Element);
                        redrawHighlightedNode(returnNode);
                    }
                }}
                onBlur={(e) => {
                    const editedNode = element.current;
                    editingElementsRef.current = [];
                    const tree = getComponentTree(iframeDocument, configuration.treeViewIgnoreQuerySelectors);
                    setElementEditorState({ match: getTreeMatchFromElement(tree, editedNode) });
                    redrawComponentTree();
                    redrawHighlightedNode(editedNode);
                }}
            />
        </React.Fragment>
    )
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