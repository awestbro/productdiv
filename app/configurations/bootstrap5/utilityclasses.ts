import { UtilityClassDefinition } from "../../utilities/configuration/configuration-importer";

import * as UtilityClasses from "./utilityclasses/classes";

export const utilityClasses: UtilityClassDefinition[] = [
  ...Object.values(UtilityClasses),
];
