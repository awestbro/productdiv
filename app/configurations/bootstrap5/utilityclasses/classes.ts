import { UtilityClassDefinition } from "../../../utilities/configuration/configuration-importer";

const themeColors = "primary|secondary|success|danger|warning|info|light|dark";
const themeBreakpoints = "sm|md|lg|xl|xxl";

export const MarginStart: UtilityClassDefinition = {
  name: "Margin Start",
  type: "selectMany",
  classes: [
    "ms-(0|1|2|3|4|5|auto)",
    `ms-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing", "Margin"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const MarginEnd: UtilityClassDefinition = {
  name: "Margin End",
  type: "selectMany",
  classes: [
    "me-(0|1|2|3|4|5|auto)",
    `me-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing", "Margin"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const MarginTop: UtilityClassDefinition = {
  name: "Margin Top",
  type: "selectMany",
  classes: [
    "mt-(0|1|2|3|4|5|auto)",
    `mt-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing", "Margin"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const MarginBottom: UtilityClassDefinition = {
  name: "Margin Bottom",
  type: "selectMany",
  classes: [
    "mb-(0|1|2|3|4|5|auto)",
    `mb-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing", "Margin"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const MarginVertical: UtilityClassDefinition = {
  name: "Margin Vertical",
  type: "selectMany",
  classes: [
    "my-(0|1|2|3|4|5|auto)",
    `my-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing", "Margin"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const MarginHorizontal: UtilityClassDefinition = {
  name: "Margin Horizontal",
  type: "selectMany",
  classes: [
    "mx-(0|1|2|3|4|5|auto)",
    `mx-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing", "Margin"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const MarginAll: UtilityClassDefinition = {
  name: "Margin All",
  type: "selectMany",
  classes: [
    "m-(0|1|2|3|4|5|auto)",
    `m-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing", "Margin"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const PaddingStart: UtilityClassDefinition = {
  name: "Padding Start",
  type: "selectMany",
  classes: [
    "ps-(0|1|2|3|4|5|auto)",
    `ps-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const PaddingEnd: UtilityClassDefinition = {
  name: "Padding End",
  type: "selectMany",
  classes: [
    "pe-(0|1|2|3|4|5|auto)",
    `pe-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const PaddingTop: UtilityClassDefinition = {
  name: "Padding Top",
  type: "selectMany",
  classes: [
    "pt-(0|1|2|3|4|5|auto)",
    `pt-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const PaddingBottom: UtilityClassDefinition = {
  name: "Padding Bottom",
  type: "selectMany",
  classes: [
    "pb-(0|1|2|3|4|5|auto)",
    `pb-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const PaddingVertical: UtilityClassDefinition = {
  name: "Padding Vertical",
  type: "selectMany",
  classes: [
    "py-(0|1|2|3|4|5|auto)",
    `py-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const PaddingHorizontal: UtilityClassDefinition = {
  name: "Padding Horizontal",
  type: "selectMany",
  classes: [
    "px-(0|1|2|3|4|5|auto)",
    `px-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const PaddingAll: UtilityClassDefinition = {
  name: "Padding All",
  type: "selectMany",
  classes: [
    "p-(0|1|2|3|4|5|auto)",
    `p-(${themeBreakpoints})-(0|1|2|3|4|5|auto)`,
  ],
  tags: ["Spacing"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
};
export const Alignment: UtilityClassDefinition = {
  name: "Text Alignment",
  type: "selectMany",
  classes: [
    "text-justify",
    "text-(start|center|end)",
    `text-(${themeBreakpoints})-(start|center|end)`,
  ],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const Wrap: UtilityClassDefinition = {
  name: "Text Wrap",
  type: "selectOne",
  classes: ["text-(wrap|nowrap|truncate)"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const Break: UtilityClassDefinition = {
  name: "Text Break",
  type: "selectOne",
  classes: ["text-break"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const TextColor: UtilityClassDefinition = {
  name: "Text Color",
  type: "selectOne",
  classes: [`text-(${themeColors}|muted|white|body|white-50|black-50)`],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const Transform: UtilityClassDefinition = {
  name: "Text Transform",
  type: "selectOne",
  classes: ["text-(lowercase|uppercase|capitalize)"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const Weight: UtilityClassDefinition = {
  name: "Text Weight",
  type: "selectOne",
  classes: ["fw-(lighter|light|normal|bold|bolder)"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const Style: UtilityClassDefinition = {
  name: "Text Style",
  type: "selectOne",
  classes: ["fst-italic", "fst-normal"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const Heading: UtilityClassDefinition = {
  name: "Text Heading",
  type: "selectOne",
  classes: ["h(1|2|3|4|5|6)"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const TextDisplay: UtilityClassDefinition = {
  name: "Text Display",
  type: "selectOne",
  classes: ["display-(1|2|3|4|5|6)"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const Size: UtilityClassDefinition = {
  name: "Text Size",
  type: "selectOne",
  classes: ["fs-(1|2|3|4|5|6)"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const LineHeight: UtilityClassDefinition = {
  name: "Text Line Height",
  type: "selectOne",
  classes: ["lh-(1|sm|base|lg)"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const Helpers: UtilityClassDefinition = {
  name: "Text Helpers",
  type: "selectMany",
  classes: [
    "lead",
    "mark",
    "small",
    "text-decoration-underline",
    "text-decoration-line-through",
    "text-decoration-none",
    "initialism",
    "blockquote",
    "blockquote-footer",
    "font-monospace",
  ],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const TextSelection: UtilityClassDefinition = {
  name: "Text Selection",
  type: "selectOne",
  classes: ["user-select-(all|auto|none)"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const PointerEvents: UtilityClassDefinition = {
  name: "Text Pointer Events",
  type: "selectOne",
  classes: ["pe-(none|auto)"],
  tags: ["Text"],
  selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/text/",
};
export const BGColor: UtilityClassDefinition = {
  name: "Background Color",
  type: "selectOne",
  classes: [`bg-(${themeColors}|white|body|transparent)`],
  tags: ["Background"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/background/",
};
export const Gradient: UtilityClassDefinition = {
  name: "Background Gradient",
  type: "selectOne",
  classes: ["bg-gradient"],
  tags: ["Background"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/background/",
};
export const Opacity: UtilityClassDefinition = {
  name: "Background Opacity",
  type: "selectMany",
  classes: ["opacity-(0|25|50|75|100)"],
  tags: ["Background"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/background/",
};
export const BoxShadow: UtilityClassDefinition = {
  name: "Background Box Shadow",
  type: "selectOne",
  classes: ["shadow", "shadow-(none|sm|lg)"],
  tags: ["Background"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/background/",
};
export const Width: UtilityClassDefinition = {
  name: "Width",
  type: "selectOne",
  classes: ["w-(25|50|75|100|auto)"],
  tags: ["Sizing"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/sizing/",
};
export const MaxWidth: UtilityClassDefinition = {
  name: "Max Width",
  type: "selectOne",
  classes: ["mw-100"],
  tags: ["Sizing"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/sizing/",
};
export const Height: UtilityClassDefinition = {
  name: "Height",
  type: "selectOne",
  classes: ["h-(25|50|75|100|auto)"],
  tags: ["Sizing"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/sizing/",
};
export const MaxHeight: UtilityClassDefinition = {
  name: "Max Height",
  type: "selectOne",
  classes: ["mh-100"],
  tags: ["Sizing"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/sizing/",
};
export const ViewportSize: UtilityClassDefinition = {
  name: "Viewport Size",
  type: "selectMany",
  classes: ["min-(vw|vh)-100", "(vw|vh)-100"],
  tags: ["Sizing"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/sizing/",
};
export const Display: UtilityClassDefinition = {
  name: "Display",
  type: "selectMany",
  classes: [
    "d-(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)",
    `d-(${themeBreakpoints})-(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)`,
  ],
  tags: ["Display"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/display/",
};
export const DisplayResponsive: UtilityClassDefinition = {
  name: "Display Responsive",
  type: "selectMany",
  classes: [
    `d-(${themeBreakpoints})-(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)`,
  ],
  tags: ["Display"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/display/",
};
export const DisplayPrint: UtilityClassDefinition = {
  name: "Display Print",
  type: "selectOne",
  classes: [
    "d-print-(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)",
  ],
  tags: ["Display"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/display/",
};
export const Hidden: UtilityClassDefinition = {
  name: "Hidden",
  type: "selectOne",
  classes: [
    "visually-hidden",
    "visually-hidden-focusable",
    "visible",
    "invisible",
  ],
  tags: ["Display"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/display/",
};
export const VerticalAlign: UtilityClassDefinition = {
  name: "Vertical Align",
  type: "selectOne",
  classes: ["align-(baseline|top|middle|bottom|text-top|text-bottom)"],
  tags: ["Display"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/display/",
};
export const Overflow: UtilityClassDefinition = {
  name: "Overflow",
  type: "selectOne",
  classes: ["overflow-(all|hidden|visible|scroll)"],
  tags: ["Display"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/display/",
};
export const Clearfix: UtilityClassDefinition = {
  name: "Clearfix",
  type: "selectOne",
  classes: ["clearfix"],
  tags: ["Display"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/display/",
};
export const Float: UtilityClassDefinition = {
  name: "Float",
  type: "selectOne",
  classes: ["float-(start|end|none)"],
  tags: ["Display"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/display/",
};
export const FloatResponsive: UtilityClassDefinition = {
  name: "Float Responsive",
  type: "selectMany",
  classes: [`float-(${themeBreakpoints})-(start|end|none)`],
  tags: ["Display"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/display/",
};
export const Border: UtilityClassDefinition = {
  name: "Border",
  type: "selectMany",
  classes: ["border", "border-(top|end|bottom|start)"],
  tags: ["Border"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/borders/",
};
export const BorderSubtractive: UtilityClassDefinition = {
  name: "Border Subtractive",
  type: "selectMany",
  classes: ["border-0", "border-(top|end|bottom|start)-0"],
  tags: ["Border"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/borders/",
};
export const BorderColor: UtilityClassDefinition = {
  name: "Border Color",
  type: "selectOne",
  classes: [`border-(${themeColors}|white)`],
  tags: ["Border"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/borders/",
};
export const BorderWidth: UtilityClassDefinition = {
  name: "Border Width",
  type: "selectOne",
  classes: ["border-(1|2|3|4|5)"],
  tags: ["Border"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/borders/",
};
export const BorderRounded: UtilityClassDefinition = {
  name: "Border Rounded",
  type: "selectMany",
  classes: [
    "rounded",
    "rounded-(0|1|2|3)",
    "rounded-(top|end|bottom|start|circle|pill)",
  ],
  tags: ["Border"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/borders/",
};
export const Position: UtilityClassDefinition = {
  name: "Position",
  type: "selectOne",
  classes: ["position-(static|relative|absolute|fixed|sticky)"],
  tags: ["Position"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/position/",
};
export const Arrange: UtilityClassDefinition = {
  name: "Arrange",
  type: "selectMany",
  classes: ["(top|start|bottom|end)-(0|50|100)"],
  tags: ["Position"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/position/",
};
export const Translate: UtilityClassDefinition = {
  name: "Translate",
  type: "selectOne",
  classes: ["translate-middle", "translate-middle-(x|y)"],
  tags: ["Position"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/position/",
};
export const FlexType: UtilityClassDefinition = {
  name: "Flex Type",
  type: "selectMany",
  classes: [
    "d-flex",
    "d-inline-flex",
    `d-(${themeBreakpoints})-flex`,
    `d-(${themeBreakpoints})-inline-flex`,
  ],
  tags: ["Flex Container"],
  selectors: [".d-flex", ".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/flex/",
};
export const Direction: UtilityClassDefinition = {
  name: "Flex Direction",
  type: "selectMany",
  classes: [
    "flex-(row|row-reverse|column|column-reverse)",
    `flex-(${themeBreakpoints})-(row|row-reverse|column|column-reverse)`,
  ],
  tags: ["Flex Container"],
  selectors: [".d-flex", ".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/flex/",
};
export const Justify: UtilityClassDefinition = {
  name: "Flex Justify",
  type: "selectMany",
  classes: [
    "justify-content-(start|end|center|between|around)",
    `justify-content-(${themeBreakpoints})-(start|end|center|between|around)`,
  ],
  tags: ["Flex Container"],
  selectors: [".d-flex", ".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/flex/",
};
export const AlignItems: UtilityClassDefinition = {
  name: "Flex Align Items",
  type: "selectMany",
  classes: [
    "align-items-(start|end|center|baseline|stretch)",
    `align-items-(${themeBreakpoints})-(start|end|center|baseline|stretch)`,
  ],
  tags: ["Flex Container"],
  selectors: [".d-flex", ".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/flex/",
};
export const AlignContent: UtilityClassDefinition = {
  name: "Flex Align Content",
  type: "selectMany",
  classes: [
    "align-content-(start|end|center|around|stretch)",
    `align-content-(${themeBreakpoints})-(start|end|center|around|stretch)`,
  ],
  tags: ["Flex Container"],
  selectors: [".d-flex", ".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/flex/",
};
export const FlexWrap: UtilityClassDefinition = {
  name: "Flex Wrap",
  type: "selectMany",
  classes: [
    "flex-(nowrap|wrap|wrap-reverse)",
    `flex-(${themeBreakpoints})-(nowrap|wrap|wrap-reverse)`,
  ],
  tags: ["Flex Container"],
  selectors: [".d-flex", ".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/utilities/flex/",
};
export const Align: UtilityClassDefinition = {
  name: "Flex Self Align",
  type: "selectMany",
  classes: [
    "align-self-(start|end|center|baseline|stretch)",
    `align-self-(${themeBreakpoints})-(start|end|center|baseline|stretch)`,
  ],
  tags: ["Flex Self"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/flex/#align-self",
};
export const Order: UtilityClassDefinition = {
  name: "Flex Self Order",
  type: "selectMany",
  classes: [
    "order-(0|1|2|3|4|5|6|7|8|9|10|11)",
    `order-(${themeBreakpoints})-(0|1|2|3|4|5|6|7|8|9|10|11)`,
  ],
  tags: ["Flex Self"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/flex/#align-self",
};
export const Fill: UtilityClassDefinition = {
  name: "Flex Self Fill",
  type: "selectMany",
  classes: ["flex-fill", `flex-fill-(${themeBreakpoints})`],
  tags: ["Flex Self"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/flex/#align-self",
};
export const Grow: UtilityClassDefinition = {
  name: "Flex Self Grow",
  type: "selectMany",
  classes: [
    "flex-(grow|shrink)-(0|1)",
    `flex-(${themeBreakpoints})-(grow|shrink)-(0|1)`,
  ],
  tags: ["Flex Self"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/utilities/flex/#align-self",
};
export const ButtonEnabled: UtilityClassDefinition = {
  name: "Button Enabled",
  type: "selectOne",
  classes: ["btn"],
  tags: ["Button"],
  selectors: ["button", "a", ".btn"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/buttons/",
};
export const ButtonType: UtilityClassDefinition = {
  name: "Button Type",
  type: "selectOne",
  classes: [`btn-(${themeColors}|link)`, `btn-outline-(${themeColors})`],
  tags: ["Button"],
  selectors: ["button", "a", ".btn"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/buttons/",
};
export const ButtonSize: UtilityClassDefinition = {
  name: "Button Size",
  type: "selectOne",
  classes: ["btn-(sm|lg)"],
  tags: ["Button"],
  selectors: ["button", "a", ".btn"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/buttons/",
};
export const ButtonState: UtilityClassDefinition = {
  name: "Button State",
  type: "selectOne",
  classes: ["active", "disabled"],
  tags: ["Button"],
  selectors: ["button", "a", ".btn"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/buttons/",
};
export const LinkColor: UtilityClassDefinition = {
  name: "Link Color",
  type: "selectOne",
  classes: [`link-(${themeColors})`],
  tags: ["Link"],
  selectors: ["a"],
};
export const LinkState: UtilityClassDefinition = {
  name: "Link State",
  type: "selectOne",
  classes: ["active", "disabled"],
  tags: ["Link"],
  selectors: ["a"],
};
export const NavbarType: UtilityClassDefinition = {
  name: "Navbar Type",
  type: "selectOne",
  classes: ["(fixed-top|fixed-bottom|sticky-top)"],
  tags: ["Navbar"],
  selectors: [".navbar"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/navbar/",
};
export const NavbarTheme: UtilityClassDefinition = {
  name: "Navbar Theme",
  type: "selectOne",
  classes: ["navbar-(light|dark)"],
  tags: ["Navbar"],
  selectors: [".navbar"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/navbar/",
};
export const NavbarExpand: UtilityClassDefinition = {
  name: "Navbar Expand",
  type: "selectOne",
  classes: [`navbar-expand-(${themeBreakpoints})`],
  tags: ["Navbar"],
  selectors: [".navbar"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/navbar/",
};
export const Container: UtilityClassDefinition = {
  name: "Type",
  type: "selectOne",
  classes: ["container", "container-fluid", `container-(${themeBreakpoints})`],
  tags: ["Container"],
  selectors: [".container", ".container-fluid"],
  documentationLink: "https://getbootstrap.com/docs/5.0/layout/containers/",
};
export const RowEnabled: UtilityClassDefinition = {
  name: "Row Enabled",
  type: "selectOne",
  classes: ["row"],
  tags: ["Row"],
  selectors: [".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/layout/grid/",
};
export const Columns: UtilityClassDefinition = {
  name: "Columns",
  type: "selectMany",
  classes: [
    "row-cols-(auto|2|3|4|5|6)",
    `row-cols-(${themeBreakpoints})-(auto|2|3|4|5|6)`,
  ],
  tags: ["Row"],
  selectors: [".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/layout/grid/",
};
export const Gutters: UtilityClassDefinition = {
  name: "Gutters",
  type: "selectMany",
  classes: ["g-(0|1|2|3|4|5)", "gx-(0|1|2|3|4|5)", "gy-(0|1|2|3|4|5)"],
  tags: ["Row"],
  selectors: [".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/layout/grid/",
};
export const GuttersResponsive: UtilityClassDefinition = {
  name: "Gutters Responsive",
  type: "selectMany",
  classes: [
    `g-(${themeBreakpoints})-(0|1|2|3|4|5)`,
    `gx-(${themeBreakpoints})-(0|1|2|3|4|5)`,
    `gy-(${themeBreakpoints})-(0|1|2|3|4|5)`,
  ],
  tags: ["Row"],
  selectors: [".row"],
  documentationLink: "https://getbootstrap.com/docs/5.0/layout/grid/",
};
export const ColumnType: UtilityClassDefinition = {
  name: "Column Type",
  type: "selectMany",
  classes: [
    "col",
    "col-(auto|1|2|3|4|5|6|7|8|9|10|11)",
    `col-(${themeBreakpoints})-(auto|1|2|3|4|5|6|7|8|9|10|11)`,
  ],
  tags: ["Column"],
  selectors: [".col", '*[class^="col-"]'],
  documentationLink: "https://getbootstrap.com/docs/5.0/layout/columns/",
};
export const ColumnOrder: UtilityClassDefinition = {
  name: "Column Order",
  type: "selectOne",
  classes: ["order-(first|last|1|2|3|4|5|6|7|8|9|10|11)"],
  tags: ["Column"],
  selectors: [".col", '*[class^="col-"]'],
  documentationLink: "https://getbootstrap.com/docs/5.0/layout/columns/",
};
export const ColumnOffset: UtilityClassDefinition = {
  name: "Column Offset",
  type: "selectMany",
  classes: [
    "offset-(1|2|3|4|5|6|7|8|9|10|11)",
    `offset-(${themeBreakpoints})-(1|2|3|4|5|6|7|8|9|10|11)`,
  ],
  tags: ["Column"],
  selectors: [".col", '*[class^="col-"]'],
  documentationLink: "https://getbootstrap.com/docs/5.0/layout/columns/",
};
export const ListType: UtilityClassDefinition = {
  name: "List Type",
  type: "selectMany",
  classes: ["list-unstyled", "list-inline"],
  tags: ["List"],
  selectors: ["ul", "ol", "li"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/reboot/#lists",
};
export const ListItem: UtilityClassDefinition = {
  name: "List Item",
  type: "selectOne",
  classes: ["list-inline-item"],
  tags: ["List"],
  selectors: ["ul", "ol", "li"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/reboot/#lists",
};
export const ImageType: UtilityClassDefinition = {
  name: "Image Type",
  type: "selectOne",
  classes: ["img-fluid", "img-thumbnail"],
  tags: ["Image"],
  selectors: ["img"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/images/",
};
export const ImageUtilities: UtilityClassDefinition = {
  name: "Image Utilities",
  type: "selectOne",
  classes: ["rounded", "float-start", "float-end"],
  tags: ["Image"],
  selectors: ["img"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/images/",
};
export const TableEnabled: UtilityClassDefinition = {
  name: "Table Enabled",
  type: "selectOne",
  classes: ["table"],
  tags: ["Table"],
  selectors: ["table", ".table"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/tables/",
};
export const TableColor: UtilityClassDefinition = {
  name: "Table Color",
  type: "selectOne",
  classes: [`table-(active|${themeColors})`],
  tags: ["Table"],
  selectors: ["table", ".table"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/tables/",
};
export const TableStyle: UtilityClassDefinition = {
  name: "Table Style",
  type: "selectMany",
  classes: [
    "table-striped",
    "table-bordered",
    "table-borderless",
    "table-hover",
    "table-sm",
  ],
  tags: ["Table"],
  selectors: ["table", ".table"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/tables/",
};
export const TableResponsive: UtilityClassDefinition = {
  name: "Table Responsive",
  type: "selectOne",
  classes: ["table-responsive-(sm|md|lg|xl)"],
  tags: ["Table"],
  selectors: ["table", ".table"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/tables/",
};
export const TableHead: UtilityClassDefinition = {
  name: "Table Head Style",
  type: "selectOne",
  classes: ["thead-light", "thead-dark"],
  tags: ["Table", "Table Header"],
  selectors: ["thead"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/tables/",
};
export const TableBodyStyle: UtilityClassDefinition = {
  name: "Table Body Style",
  type: "selectOne",
  classes: [`table-(active|${themeColors})`],
  tags: ["Table", "Table Body"],
  selectors: ["tr", "td"],
  documentationLink: "https://getbootstrap.com/docs/5.0/content/tables/",
};
export const AlertEnabled: UtilityClassDefinition = {
  name: "Alert Enabled",
  type: "selectOne",
  classes: ["alert"],
  tags: ["Alert"],
  selectors: [".alert", ".alert a"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/alerts/",
};
export const AlertType: UtilityClassDefinition = {
  name: "Alert Type",
  type: "selectOne",
  classes: [`alert-(${themeColors})`],
  tags: ["Alert"],
  selectors: [".alert", ".alert a"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/alerts/",
};
export const AlertDismissable: UtilityClassDefinition = {
  name: "Alert Dismissable",
  type: "selectOne",
  classes: ["alert-dismissable"],
  tags: ["Alert"],
  selectors: [".alert", ".alert a"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/alerts/",
};
export const AlertLink: UtilityClassDefinition = {
  name: "Alert Link Enabled",
  type: "selectOne",
  classes: ["alert-link"],
  selectors: [".alert a"],
  tags: ["Alert", "Alert Link"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/alerts/",
};
export const BadgeEnabled: UtilityClassDefinition = {
  name: "Badge Enabled",
  type: "selectOne",
  classes: ["badge"],
  tags: ["Badge"],
  selectors: [".badge"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/badge/",
};
export const BadgeType: UtilityClassDefinition = {
  name: "Badge Type",
  type: "selectOne",
  classes: ["rounded-pill"],
  tags: ["Badge"],
  selectors: [".badge"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/badge/",
};
export const BreadcrumbEnabled: UtilityClassDefinition = {
  name: "Breadcrumb Enabled",
  type: "selectOne",
  classes: ["breadcrumb"],
  tags: ["Breadcrumb"],
  selectors: [
    'nav[aria-label="breadcrumb"]',
    ".breadcrumb",
    ".breadcrumb-item",
  ],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/breadcrumb/",
};
export const BreadcrumbItem: UtilityClassDefinition = {
  name: "Breadcrumb Item",
  type: "selectMany",
  classes: ["breadcrumb-item", "active"],
  tags: ["Breadcrumb"],
  selectors: [
    'nav[aria-label="breadcrumb"]',
    ".breadcrumb",
    ".breadcrumb-item",
  ],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/breadcrumb/",
};
export const ButtonGroupEnabled: UtilityClassDefinition = {
  name: "Button Group Enabled",
  type: "selectOne",
  classes: ["btn-group"],
  tags: ["Button Group"],
  selectors: [".btn-group"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/components/button-group/",
};
export const ButtonGroupSize: UtilityClassDefinition = {
  name: "Button Group Size",
  type: "selectOne",
  classes: ["btn-group-(sm|md|lg)"],
  tags: ["Button Group"],
  selectors: [".btn-group"],
  documentationLink:
    "https://getbootstrap.com/docs/5.0/components/button-group/",
};
export const ListGroupItemColor: UtilityClassDefinition = {
  name: "List Group Item Color",
  type: "selectOne",
  classes: [`list-group-item-(${themeColors})`],
  tags: ["List Group Item"],
  selectors: [".list-group-item"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/list-group/",
};
export const NavType: UtilityClassDefinition = {
  name: "Nav Type",
  type: "selectOne",
  classes: ["nav-tabs", "nav-pills"],
  tags: ["Nav"],
  selectors: [".nav"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/navs-tabs/",
};
export const NavSizing: UtilityClassDefinition = {
  name: "Nav Sizing",
  type: "selectOne",
  classes: ["nav-fill", "nav-justified"],
  tags: ["Nav"],
  selectors: [".nav"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/navs-tabs/",
};
export const OffCanvasType: UtilityClassDefinition = {
  name: "OffCanvas Type",
  type: "selectOne",
  classes: ["offcanvas-(start|end|top|bottom)"],
  tags: ["Offcanvas"],
  selectors: [".offcanvas"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/offcanvas/",
};
export const Pagination: UtilityClassDefinition = {
  name: "Pagination Size",
  type: "selectOne",
  classes: ["pagination-(sm|lg)"],
  tags: ["Pagination"],
  selectors: [".pagination"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/pagination/",
};
export const ProgressType: UtilityClassDefinition = {
  name: "Progress Type",
  type: "selectMany",
  classes: ["progress-bar-(striped|animated)"],
  tags: ["Progress"],
  selectors: [".progress-bar"],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/progress/",
};
export const SpinnerType: UtilityClassDefinition = {
  name: "Spinner Type",
  type: "selectOne",
  classes: ["spinner-(border|grow)"],
  tags: ["Spinner"],
  selectors: ['*[class^="spinner"]'],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/spinners/",
};
export const SpinnerSize: UtilityClassDefinition = {
  name: "Spinner Size",
  type: "selectOne",
  classes: ["spinner-(border|grow)-sm"],
  tags: ["Spinner"],
  selectors: ['*[class^="spinner"]'],
  documentationLink: "https://getbootstrap.com/docs/5.0/components/spinners/",
};
export const FormControlType: UtilityClassDefinition = {
  name: "Form Control Type",
  type: "selectOne",
  classes: ["form-control", "form-control-plaintext"],
  tags: ["Form Control"],
  selectors: [".form-control"],
  documentationLink: "https://getbootstrap.com/docs/5.0/forms/form-control/",
};
export const FormControlSize: UtilityClassDefinition = {
  name: "Form Control Size",
  type: "selectOne",
  classes: ["form-control-(sm|lg)"],
  tags: ["Form Control"],
  selectors: [".form-control"],
  documentationLink: "https://getbootstrap.com/docs/5.0/forms/form-control/",
};
