import { TemplateDefinition } from "../../utilities/configuration/configuration-importer";

import * as Components from "./templates/component";
import * as Content from "./templates/content";
import * as Form from "./templates/content";
import * as Layout from "./templates/content";
import * as Navigation from "./templates/content";

export const templates: TemplateDefinition[] = [
  ...Object.values(Components),
  ...Object.values(Content),
  ...Object.values(Form),
  ...Object.values(Layout),
  ...Object.values(Navigation),
];
