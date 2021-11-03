import * as React from "react";
import * as ReactDOM from "react-dom";

import { getEditorMountPoint } from './selector';
import { Application, getLeftNavOpenState, setLeftNavOpenState } from "./editor/Application";
import { LibraryConfigurationDefinition, ParsedLibraryConfigurationDefinition, parseLibraryConfiguration } from './lib/configuration/configuration-importer';

import "./theme.scss";

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function createElementFromHTML(htmlString: string) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
}

const ProductDivToggleMount = `
    <div id="productdiv-toggle" style="position: sticky; bottom: 10px; left: 10px; height: min-content;"></div>
`;

let mounted: boolean = false;

function mountApplication(configuration: ParsedLibraryConfigurationDefinition, cssPath: string) {
    const leftNavOpen = getLeftNavOpenState();
    console.log('mountApplication occured', leftNavOpen);

    if (leftNavOpen && !mounted) {
        if (getEditorMountPoint()) {
            ReactDOM.unmountComponentAtNode(getEditorMountPoint());
        }
        const href = window.location.href;
        // console.log('innerHTML', document.documentElement.innerHTML);
        document.open();
        document.appendChild(document.createElement('html'));
        document.documentElement.innerHTML = `
            <body>
                <link rel="stylesheet" href="${cssPath}">
                <div id="productdiv" class="d-flex flex-row w-100 h-100"></div>
            </body>
            `;
        document.close();
        console.log('doc body; ', document.body);
    
        ReactDOM.render(
            <Application 
                pageSource={href} 
                configuration={configuration}
                onLeftNavClose={(doc) => {
                    console.log('onclose', doc);
                    ReactDOM.unmountComponentAtNode(getEditorMountPoint());
                    console.log('unmount');
                    // setTimeout(() => {
                        document.open();
                        document.write(new XMLSerializer().serializeToString(doc));
                        document.close();
                        // This causes code to be rerun
                        console.log('wrote doc: ', {...document});
                        document.addEventListener('DOMContentLoaded', () => {
                            mounted = false;
                            // ProductDiv(BootstrapComponents);
                            // console.log('wrote doc: ', {...document});
                            console.log('DOC LOAD', {...document});
                            // mountApplication(configuration, cssPath);
                        });
                        // console.log('unmount ')
                        // mountApplication(configuration, cssPath);
                    // }, 10)
                }}
            />,
            getEditorMountPoint(),
            () => {
                mounted = true;
            }
        );
    } else {
        if (!mounted) {
            console.log('Render P Button', document.body);
            document.body.appendChild(createElementFromHTML(ProductDivToggleMount));
            ReactDOM.render(
                <button
                    type="button"
                    onClick={() => {
                        console.log('P button click');
                        setLeftNavOpenState(true);
                        ReactDOM.unmountComponentAtNode(document.getElementById('productdiv-toggle'));
                        mountApplication(configuration, cssPath);
                    }}
                >
                    P
                </button>,
                document.getElementById('productdiv-toggle')
            )
        }
    }
}

// const ProductDivAppWrapper = (props: {configuration: LibraryConfigurationDefinition, cssPath: string}) => {
//     // If not open, render button.
//     // If open, render iframe etc.
//     const [leftNavOpen, setLeftNavStateOpen] = React.useState(getLeftNavOpenState());
    
//     React.useEffect(() => {
//         if (leftNavOpen) {
//             // render iframe
//             mountApplication(
//                 props.configuration, 
//                 props.cssPath, 
//                 (doc) => {
//                     console.log('unmount: ', doc);
//                 }
//             );
//         } else {
//             // render button
//             ReactDOM.unmountComponentAtNode(getEditorMountPoint());
//         }
//     }, [leftNavOpen])

//     return (
//         <React.Fragment></React.Fragment>
//     )
// }

// if (!inIframe()) {
//     document.addEventListener('DOMContentLoaded', () => {
//         ProductDiv(BootstrapComponents);
//     });
// }

export default function ProductDiv(configuration: LibraryConfigurationDefinition, cssPath: string = '/app.css') {
    if (!inIframe()) {
        mountApplication(parseLibraryConfiguration(configuration), cssPath);
    }
}