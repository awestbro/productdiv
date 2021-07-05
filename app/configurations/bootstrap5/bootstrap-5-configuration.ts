import { LibraryConfigurationDefinition } from '../../lib/configuration/configuration-importer';
import { utilityClasses } from './bootstrap-5-utilityclasses';
import { components } from './bootstrap-5-componentsdefinitions';
import { templateCategories } from './bootstrap-5-templates';

const BootstrapComponents: LibraryConfigurationDefinition = {
    treeViewIgnoreQuerySelectors: [
        'script',
        'style',
        'link',
        '[data-productdiv="true"]',
        'svg',
    ],
    utilityClasses,
    components,
    templateCategories,
}

export default BootstrapComponents;