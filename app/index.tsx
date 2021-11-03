import * as React from "react";
import * as ReactDOM from "react-dom";

import { getEditorMountPoint } from './selector';
import { Application } from "./editor/Application";
import { LibraryConfigurationDefinition, ParsedLibraryConfigurationDefinition, parseLibraryConfiguration } from './lib/configuration/configuration-importer';

import "./theme.scss";

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function mountApplication(configuration: ParsedLibraryConfigurationDefinition, cssPath: string) {
    const href = window.location.href;
    document.open();
    document.appendChild(document.createElement('html'));
    document.documentElement.innerHTML = `
        <body>
            <link rel="stylesheet" href="${cssPath}">
            <div id="productdiv" class="d-flex flex-row w-100 h-100"></div>
        </body>
        `;
    document.close();

    ReactDOM.render(
        <Application pageSource={href} configuration={configuration} />,
        getEditorMountPoint()
    );
}

export default function ProductDiv(configuration: LibraryConfigurationDefinition, cssPath: string = '/app.css') {
    if (!inIframe()) {
        mountApplication(parseLibraryConfiguration(configuration), cssPath);
    }
}