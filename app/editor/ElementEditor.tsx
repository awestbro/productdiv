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
// @ts-ignore
import * as throttle from 'lodash/throttle';

import { highlightElements } from "../lib/dom/canvas";
import { LeftNavProps } from "./LeftNav";
import { UtilityClassControl, UtilityClassDefinition } from '../lib/configuration/configuration-importer';
import { domTokenListToArray } from '../selector';
import { getParentMatch } from '../lib/tree/tree-utils';
import { AttributeEditor } from './AttributeEditor';

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

export function copyElementToClipboard(element: Element) {
    const copy = (element.cloneNode(true) as Element);
    copy.querySelectorAll('[data-productdiv="true"]').forEach(e => e.remove());
    copyToClipboard(html_beautify(copy.outerHTML));
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
    const [matchingControls, setMatchingControls] = React.useState<UtilityClassDefinition[]>([]);
    const [nonDefaultControls, setNonDefaultControls] = React.useState<UtilityClassDefinition[]>([]);
    const [nonDefaultOpen, setNonDefaultOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        const selectedElement = elementEditorState.match.node as Element;
        const matching: UtilityClassDefinition[] = [];
        components.forEach((c) => {
            const selectors = c.selectors || [];
            if (selectors.find((s) => selectedElement.matches(s))) {
                c.utilityClassMatches.forEach((utilityClassName) => {
                    const matchingUc = allUtilityClasses.find((uc) => uc.section === utilityClassName);
                    if (matchingUc) {
                        matching.push(matchingUc);
                    }
                });
            }
        });
        const filtered: UtilityClassDefinition[] = differenceBy(allUtilityClasses, matching, 'section');
        const filteredDefault = filtered.filter((uc) => uc.showDefault);
        const nonDefault = filtered.filter((uc) => !uc.showDefault);
        setFilteredControls(filteredDefault);
        setMatchingControls(matching);
        setNonDefaultControls(nonDefault);
    }, [elementEditorState.match])

    return (
        <React.Fragment>
            <hr />
            {matchingControls.length > 0 && (
                <React.Fragment>
                    <UtilityClassFormControlGrid controls={matchingControls} {...props} />
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

function UtilityClassFormControlGrid(props: { controls: UtilityClassDefinition[] } & LeftNavProps) {
    const { controls, elementEditorState } = props;
    return (
        <React.Fragment>
            {controls.map((u) => {
                return (
                    <div className="mb-3" key={u.section}>
                        <UtilityClassHeader utilityClassDefinition={u} />
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                            {u.controls.map((control) => (
                                <UtilityClassFormControl
                                    key={control.name}
                                    element={elementEditorState.match.node as Element}
                                    control={control}
                                    redrawComponentTree={props.redrawComponentTree}
                                    redrawHighlightedNode={props.redrawHighlightedNode}
                                />
                            ))}
                        </div>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

function UtilityClassHeader(props: { utilityClassDefinition: UtilityClassDefinition }) {
    const u = props.utilityClassDefinition;
    return (
        <div className="d-flex justify-content-between align-items-center mb-1 mt-2">
            <h4 className="text-decoration-underline mb-0">{u.section}</h4>
            {u.documentationLink ? (
                <a href={u.documentationLink} target="__blank" className="btn btn-secondary btn-sm">
                    ?
                </a>
            ) : 
                <div />
            }
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
                        clone.id = clone.id + '-1';
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

function InnerHTMLEditor(props: LeftNavProps) {
    const { elementEditorState, redrawComponentTree, redrawHighlightedNode } = props;
    const element = elementEditorState.match.node as Element;
    const [text, setHTML] = React.useState(html_beautify(element.innerHTML));
    const [wrap, _setWrap] = React.useState<boolean>(localStorage.getItem('productdiv-editorwrap') === 'true' || false);

    function setWrap(b: boolean) {
        localStorage.setItem('productdiv-editorwrap', `${b}`);
        _setWrap(b);
    }

    React.useEffect(() => {
        setHTML(html_beautify(element.innerHTML));
    }, [elementEditorState])

    const triggerTreeChange = throttle(() => {
        redrawComponentTree();
        redrawHighlightedNode();
    }, 200);

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="mb-0">Inner HTML Editor</p>
                <button 
                    type="button" 
                    className={classnames("btn btn-sm", { 'btn-secondary': !wrap, 'btn-primary': wrap })}
                    onClick={() => {
                        setWrap(!wrap)
                    }}
                >
                    Wrap
                </button>
            </div>
            <CodeMirror
                value={text}
                options={{
                    mode: 'htmlmixed',
                    theme: 'oceanic-next',
                    lineWrapping: wrap,
                }}
                onBeforeChange={(editor, data, value) => {
                    setHTML(value);
                    element.innerHTML = value;
                    triggerTreeChange();
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