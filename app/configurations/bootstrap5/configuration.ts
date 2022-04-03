import { LibraryConfigurationDefinition } from "../../utilities/configuration/configuration-importer";
import { utilityClasses } from "./utilityclasses";
import { templates } from "./templates";

const BootstrapComponents: LibraryConfigurationDefinition = {
  treeViewIgnoreQuerySelectors: [
    "script",
    "style",
    "link",
    '[data-productdiv="true"]',
    "svg",
  ],
  utilityClasses,
  templates,
};

export default BootstrapComponents;
