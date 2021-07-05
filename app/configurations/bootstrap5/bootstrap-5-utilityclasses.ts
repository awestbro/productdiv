import { UtilityClassDefinition } from '../../lib/configuration/configuration-importer';

export const utilityClasses: UtilityClassDefinition[] = [
    {
        section: 'Margin',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding',
        showDefault: true,
        controls: [
            {
                name: 'Start',
                type: 'selectMany',
                classes: [
                    'ms-(0|1|2|3|4|5|auto)',
                    'ms-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'End',
                type: 'selectMany',
                classes: [
                    'me-(0|1|2|3|4|5|auto)',
                    'me-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'Top',
                type: 'selectMany',
                classes: [
                    'mt-(0|1|2|3|4|5|auto)',
                    'mt-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'Bottom',
                type: 'selectMany',
                classes: [
                    'mb-(0|1|2|3|4|5|auto)',
                    'mb-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'All',
                type: 'selectMany',
                classes: [
                    'm-(0|1|2|3|4|5|auto)',
                    'm-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'Vertical',
                type: 'selectMany',
                classes: [
                    'my-(0|1|2|3|4|5|auto)',
                    'my-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'Horizontal',
                type: 'selectMany',
                classes: [
                    'mx-(0|1|2|3|4|5|auto)',
                    'mx-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }
        ]
    },
    {
        section: 'Padding',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding',
        showDefault: true,
        controls: [
            {
                name: 'Start',
                type: 'selectMany',
                classes: [
                    'ps-(0|1|2|3|4|5|auto)',
                    'ps-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'End',
                type: 'selectMany',
                classes: [
                    'pe-(0|1|2|3|4|5|auto)',
                    'pe-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'Top',
                type: 'selectMany',
                classes: [
                    'pt-(0|1|2|3|4|5|auto)',
                    'pt-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'Bottom',
                type: 'selectMany',
                classes: [
                    'pb-(0|1|2|3|4|5|auto)',
                    'pb-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'All',
                type: 'selectMany',
                classes: [
                    'p-(0|1|2|3|4|5|auto)',
                    'p-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'Vertical',
                type: 'selectMany',
                classes: [
                    'py-(0|1|2|3|4|5|auto)',
                    'py-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }, {
                name: 'Horizontal',
                type: 'selectMany',
                classes: [
                    'px-(0|1|2|3|4|5|auto)',
                    'px-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)',
                ]
            }
        ]
    }, {
        section: 'Text',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/text/',
        showDefault: true,
        controls: [
            {
                name: 'Alignment',
                type: 'selectMany',
                classes: [
                    'text-justify',
                    'text-(start|center|end)',
                    'text-(sm|md|lg|xl|xxl)-(start|center|end)',
                ]
            },
            {
                name: 'Wrap',
                type: 'selectOne',
                classes: [
                    'text-(wrap|nowrap|truncate)',
                ]
            },
            {
                name: 'Break',
                type: 'selectOne',
                classes: [
                    'text-break',
                ]
            },
            {
                name: 'Color',
                type: 'selectOne',
                classes: [
                    'text-(primary|secondary|success|danger|warning|info|light|dark|muted|white|body|white-50|black-50)',
                ]
            },
            {
                name: 'Transform',
                type: 'selectOne',
                classes: [
                    'text-(lowercase|uppercase|capitalize)',
                ]
            },
            {
                name: 'Size',
                type: 'selectOne',
                classes: [
                    'fs-(1|2|3|4|5|6)',
                ]
            },
            {
                name: 'Weight',
                type: 'selectOne',
                classes: [
                    'fw-(lighter|light|normal|bold|bolder)',
                ]
            },
            {
                name: 'Style',
                type: 'selectOne',
                classes: [
                    'fst-italic',
                    'fst-normal',
                ]
            },
            {
                name: 'Heading',
                type: 'selectOne',
                classes: [
                    'h(1|2|3|4|5|6)',
                ]
            },
            {
                name: 'Display',
                type: 'selectOne',
                classes: [
                    'display-(1|2|3|4|5|6)',
                ]
            },
            {
                name: 'Line Height',
                type: 'selectOne',
                classes: [
                    'lh-(1|sm|base|lg)',
                ]
            },
            {
                name: 'Helpers',
                type: 'selectMany',
                classes: [
                    'lead',
                    'mark',
                    'small',
                    'text-decoration-underline',
                    'text-decoration-line-through',
                    'text-decoration-none',
                    'initialism',
                    'blockquote',
                    'blockquote-footer',
                    'font-monospace',
                ]
            },
        ]
    },
    {
        section: 'Color',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/background/',
        showDefault: true,
        controls: [
            {
                name: 'Background',
                type: 'selectOne',
                classes: [
                    'bg-(primary|secondary|success|danger|warning|info|light|dark|white|body|transparent)',
                ]
            },
            {
                name: 'Gradient',
                type: 'selectOne',
                classes: [
                    'bg-gradient',
                ]
            },
            {
                name: 'Font',
                type: 'selectOne',
                classes: [
                    'text-(primary|secondary|success|danger|warning|info|light|dark|muted|white|black-50|white-50)',
                ]
            },
            {
                name: 'Box Shadow',
                type: 'selectOne',
                classes: [
                    'shadow',
                    'shadow-(none|sm|lg)',
                ]
            },
        ]
    },
    {
        section: 'Display',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/display/',
        showDefault: true,
        controls: [
            {
                name: 'Display',
                type: 'selectOne',
                classes: [
                    'd-(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)',
                    'd-(sm|md|lg|xl|xxl)-(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)',
                ]
            },
            {
                name: 'Display Responsive',
                type: 'selectMany',
                classes: [
                    'd-(sm|md|lg|xl|xxl)-(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)',
                ]
            },
            {
                name: 'Display Print',
                type: 'selectOne',
                classes: [
                    'd-print-(none|inline|inline-block|block|grid|table|table-cell|table-row|flex|inline-flex)',
                ]
            },
            {
                name: 'Hidden',
                type: 'selectOne',
                classes: [
                    'visually-hidden',
                    'visually-hidden-focusable',
                    'visible',
                    'invisible',
                ]
            },
            {
                name: 'Vertical Align',
                type: 'selectOne',
                classes: [
                    'align-(baseline|top|middle|bottom|text-top|text-bottom)',
                ]
            }
        ]
    },
    {
        section: 'Border',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/borders/',
        showDefault: true,
        controls: [
            {
                name: 'Border',
                type: 'selectMany',
                classes: [
                    'border',
                    'border-(top|end|bottom|start)',
                ]
            },
            {
                name: 'Border Subtractive',
                type: 'selectMany',
                classes: [
                    'border-0',
                    'border-(top|end|bottom|start)-0',
                ]
            },
            {
                name: 'Color',
                type: 'selectOne',
                classes: [
                    'border-(primary|secondary|success|danger|warning|info|light|dark|white)',
                ]
            },
            {
                name: 'Width',
                type: 'selectOne',
                classes: [
                    'border-(1|2|3|4|5)',
                ]
            },
            {
                name: 'Rounded',
                type: 'selectMany',
                classes: [
                    'rounded',
                    'rounded-(1|2|3|4|5)',
                    'rounded-(top|end|bottom|start|circle|pill)',
                ]
            },
        ]
    },
    {
        section: 'Float',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/float/',
        showDefault: true,
        controls: [
            {
                name: 'Clearfix',
                type: 'selectOne',
                classes: [
                    'clearfix',
                ]
            },
            {
                name: 'Float',
                type: 'selectOne',
                classes: [
                    'float-(start|end|none)',
                ]
            },
            {
                name: 'Float Responsive',
                type: 'selectMany',
                classes: [
                    'float-(sm|md|lg|xl|xxl)-(start|end|none)',
                ]
            },
        ]
    },
    {
        section: 'Overflow',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/overflow/',
        showDefault: true,
        controls: [
            {
                name: 'Style',
                type: 'selectOne',
                classes: [
                    'overflow-(all|hidden|visible|scroll)',
                ]
            },
        ]
    },
    {
        section: 'Position',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/position/',
        showDefault: true,
        controls: [
            {
                name: 'Position',
                type: 'selectOne',
                classes: [
                    'position-(static|relative|absolute|fixed|sticky)',
                ]
            },
            {
                name: 'Arrange',
                type: 'selectMany',
                classes: [
                    '(top|start|bottom|end)-(0|50|100)',
                ]
            },
            {
                name: 'Translate',
                type: 'selectOne',
                classes: [
                    'translate-middle',
                    'translate-middle-(x|y)',
                ]
            },
        ]
    },
    {
        section: 'Sizing',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/sizing/',
        showDefault: true,
        controls: [
            {
                name: 'Width',
                type: 'selectOne',
                classes: [
                    'w-(25|50|75|100|auto)',
                ]
            },
            {
                name: 'Max Width',
                type: 'selectOne',
                classes: [
                    'mw-100',
                ]
            },
            {
                name: 'Height',
                type: 'selectOne',
                classes: [
                    'h-(25|50|75|100|auto)',
                ]
            },
            {
                name: 'Max Height',
                type: 'selectOne',
                classes: [
                    'mh-100',
                ]
            },
            {
                name: 'Viewport Size',
                type: 'selectMany',
                classes: [
                    'min-(vw|vh)-100',
                    '(vw|vh)-100',
                ]
            },
        ]
    },
    {
        section: 'Interaction',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/interactions/',
        showDefault: true,
        controls: [
            {
                name: 'Text Selection',
                type: 'selectOne',
                classes: [
                    'user-select-(all|auto|none)',
                ]
            },
            {
                name: 'Pointer Events',
                type: 'selectOne',
                classes: [
                    'pe-(none|auto)',
                ]
            },
        ]
    },
    {
        section: 'Flex Container',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/flex/',
        showDefault: true,
        controls: [
            {
                name: 'Display',
                type: 'selectMany',
                classes: [
                    'd-flex',
                    'd-inline-flex',
                    'd-(sm|md|lg|xl|xxl)-flex',
                    'd-(sm|md|lg|xl|xxl)-inline-flex',
                ],
            },
            {
                name: 'Direction',
                type: 'selectMany',
                classes: [
                    'flex-(row|row-reverse|column|column-reverse)',
                    'flex-(sm|md|lg|xl|xxl)-(row|row-reverse|column|column-reverse)',
                ],
            },
            {
                name: 'Justify',
                type: 'selectMany',
                classes: [
                    'justify-content-(start|end|center|between|around)',
                    'justify-content-(sm|md|lg|xl|xxl)-(start|end|center|between|around)',
                ],
            },
            {
                name: 'Align Items',
                type: 'selectMany',
                classes: [
                    'align-items-(start|end|center|baseline|stretch)',
                    'align-items-(sm|md|lg|xl|xxl)-(start|end|center|baseline|stretch)',
                ],
            },
            {
                name: 'Align Content',
                type: 'selectMany',
                classes: [
                    'align-content-(start|end|center|around|stretch)',
                    'align-content-(sm|md|lg|xl|xxl)-(start|end|center|around|stretch)',
                ],
            },
            {
                name: 'Wrap',
                type: 'selectMany',
                classes: [
                    'flex-(nowrap|wrap|wrap-reverse)',
                    'flex-(sm|md|lg|xl|xxl)-(nowrap|wrap|wrap-reverse)',
                ],
            },
        ]
    }, {
        section: 'Flex Self',
        documentationLink: 'https://getbootstrap.com/docs/5.0/utilities/flex/#align-self',
        showDefault: true,
        controls: [
            {
                name: 'Align',
                type: 'selectMany',
                classes: [
                    'align-self-(start|end|center|baseline|stretch)',
                    'align-self-(sm|md|lg|xl|xxl)-(start|end|center|baseline|stretch)',
                ]
            },
            {
                name: 'Order',
                type: 'selectMany',
                classes: [
                    'order-(0|1|2|3|4|5|6|7|8|9|10|11)',
                    'order-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|6|7|8|9|10|11)',
                ]
            },
            {
                name: 'Fill',
                type: 'selectMany',
                classes: [
                    'flex-fill',
                    'flex-fill-(sm|md|lg|xl|xxl)',
                ]
            },
            {
                name: 'Grow',
                type: 'selectMany',
                classes: [
                    'flex-(grow|shrink)-(0|1)',
                    'flex-(sm|md|lg|xl|xxl)-(grow|shrink)-(0|1)',
                ]
            },
        ]
    },
    {
        section: 'Button',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/buttons/',
        controls: [
            {
                name: 'Enabled',
                type: 'selectOne',
                classes: [
                    'btn',
                ]
            },
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    'btn-(primary|secondary|success|danger|warning|info|light|dark|link)',
                    'btn-outline-(primary|secondary|success|danger|warning|info|light|dark)',
                ]
            },
            {
                name: 'Size',
                type: 'selectOne',
                classes: [
                    'btn-(sm|lg)',
                ]
            },
            {
                name: 'State',
                type: 'selectOne',
                classes: [
                    'active',
                    'disabled',
                ]
            },
        ]
    },
    {
        section: 'Link',
        controls: [
            {
                name: 'Color',
                type: 'selectOne',
                classes: [
                    'link-(primary|secondary|success|danger|warning|info|light|dark)',
                ]
            },
            {
                name: 'State',
                type: 'selectOne',
                classes: [
                    'active',
                    'disabled',
                ]
            },
        ]
    },
    {
        section: 'Navbar',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/navbar/',
        controls: [
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    '(fixed-top|fixed-bottom|sticky-top)',
                ]
            },
            {
                name: 'Theme',
                type: 'selectOne',
                classes: [
                    'navbar-(light|dark)',
                ]
            },
            {
                name: 'Expand',
                type: 'selectOne',
                classes: [
                    'navbar-expand-(sm|md|lg|xl|xxl)',
                ]
            },
        ]
    },
    {
        section: 'Container',
        documentationLink: 'https://getbootstrap.com/docs/5.0/layout/containers/',
        controls: [
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    'container',
                    'container-fluid',
                    'container-(sm|md|lg|xl|xxl)'
                ]
            }
        ],
    },
    {
        section: 'Row',
        documentationLink: 'https://getbootstrap.com/docs/5.0/layout/grid/',
        controls: [
            {
                name: 'Enabled',
                type: 'selectOne',
                classes: [
                    'row',
                ]
            },
            {
                name: 'Columns',
                type: 'selectMany',
                classes: [
                    'row-cols-(auto|2|3|4|5|6)',
                    'row-cols-(sm|md|lg|xl|xxl)-(auto|2|3|4|5|6)',
                ]
            },
            {
                name: 'Gutters',
                type: 'selectMany',
                classes: [
                    'g-(0|1|2|3|4|5)',
                    'gx-(0|1|2|3|4|5)',
                    'gy-(0|1|2|3|4|5)',
                ]
            },
            {
                name: 'Gutters Responsive',
                type: 'selectMany',
                classes: [
                    'g-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5)',
                    'gx-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5)',
                    'gy-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5)',
                ]
            },
        ],
    },
    {
        section: 'Column',
        documentationLink: 'https://getbootstrap.com/docs/5.0/layout/columns/',
        controls: [
            {
                name: 'Type',
                type: 'selectMany',
                classes: [
                    'col',
                    'col-(auto|1|2|3|4|5|6|7|8|9|10|11)',
                    'col-(sm|md|lg|xl|xxl)-(auto|1|2|3|4|5|6|7|8|9|10|11)',
                ]
            },
            {
                name: 'Order',
                type: 'selectOne',
                classes: [
                    'order-(first|last|1|2|3|4|5|6|7|8|9|10|11)',
                ]
            },
            {
                name: 'Offset',
                type: 'selectMany',
                classes: [
                    'offset-(1|2|3|4|5|6|7|8|9|10|11)',
                    'offset-(sm|md|lg|xl|xxl)-(1|2|3|4|5|6|7|8|9|10|11)',
                ]
            },
        ],
    },
    {
        section: 'List',
        documentationLink: 'https://getbootstrap.com/docs/5.0/content/reboot/#lists',
        controls: [
            {
                name: 'Type',
                type: 'selectMany',
                classes: [
                    'list-unstyled',
                    'list-inline',
                ]
            },
            {
                name: 'List Item',
                type: 'selectOne',
                classes: [
                    'list-inline-item',
                ]
            },
        ],
    },
    {
        section: 'Image',
        documentationLink: 'https://getbootstrap.com/docs/5.0/content/images/',
        controls: [
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    'img-fluid',
                    'img-thumbnail',
                ]
            },
            {
                name: 'Utilities',
                type: 'selectOne',
                classes: [
                    'rounded',
                    'float-start',
                    'float-end',
                ]
            },
        ],
    },
    {
        section: 'Table',
        documentationLink: 'https://getbootstrap.com/docs/5.0/content/tables/',
        controls: [
            {
                name: 'Enabled',
                type: 'selectOne',
                classes: [
                    'table',
                ]
            },
            {
                name: 'Color',
                type: 'selectOne',
                classes: [
                    'table-(active|primary|secondary|success|danger|warning|info|light|dark)',
                ]
            },
            {
                name: 'Style',
                type: 'selectMany',
                classes: [
                    'table-striped',
                    'table-bordered',
                    'table-borderless',
                    'table-hover',
                    'table-sm',
                ]
            },
        ],
    },
    {
        section: 'Table Head',
        documentationLink: 'https://getbootstrap.com/docs/5.0/content/tables/',
        controls: [
            {
                name: 'Style',
                type: 'selectOne',
                classes: [
                    'thead-light',
                    'thead-dark',
                ]
            },
        ],
    },
    {
        section: 'Table Body',
        documentationLink: 'https://getbootstrap.com/docs/5.0/content/tables/',
        controls: [
            {
                name: 'Style',
                type: 'selectOne',
                classes: [
                    'table-(active|primary|secondary|success|danger|warning|info|light|dark)',
                ]
            },
        ],
    },
    {
        section: 'Table Responsive',
        documentationLink: 'https://getbootstrap.com/docs/5.0/content/tables/',
        controls: [
            {
                name: 'Responsive',
                type: 'selectOne',
                classes: [
                    'table-responsive-(sm|md|lg|xl)',
                ]
            },
        ],
    },
    {
        section: 'Alert',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/alerts/',
        controls: [
            {
                name: 'Enabled',
                type: 'selectOne',
                classes: [
                    'alert',
                ]
            },
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    'alert-(primary|secondary|success|danger|warning|info|light|dark)',
                ]
            },
            {
                name: 'Dismissable',
                type: 'selectOne',
                classes: [
                    'alert-dismissable',
                ]
            },
        ],
    },
    {
        section: 'Alert Link',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/alerts/',
        controls: [
            {
                name: 'Enabled',
                type: 'selectOne',
                classes: [
                    'alert-link',
                ]
            },
        ],
    },
    {
        section: 'Badge',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/badge/',
        controls: [
            {
                name: 'Enabled',
                type: 'selectOne',
                classes: [
                    'badge',
                ]
            },
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    'rounded-pill',
                ]
            },
        ],
    },
    {
        section: 'Breadcrumb',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/breadcrumb/',
        controls: [
            {
                name: 'Enabled',
                type: 'selectOne',
                classes: [
                    'breadcrumb',
                ]
            },
            {
                name: 'Breadcrumb Item',
                type: 'selectMany',
                classes: [
                    'breadcrumb-item',
                    'active',
                ]
            },
        ],
    },
    {
        section: 'Button Group',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/button-group/',
        controls: [
            {
                name: 'Enabled',
                type: 'selectOne',
                classes: [
                    'btn-group',
                ]
            },
            {
                name: 'Size',
                type: 'selectOne',
                classes: [
                    'btn-group-(sm|md|lg)',
                ]
            },
        ],
    },
    {
        section: 'List Group Item',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/list-group/',
        controls: [
            {
                name: 'Color',
                type: 'selectOne',
                classes: [
                    'list-group-item-(primary|secondary|success|danger|warning|info|light|dark)',
                ]
            },
        ],
    },
    {
        section: 'Nav',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/navs-tabs/',
        controls: [
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    'nav-tabs',
                    'nav-pills',
                ]
            },
            {
                name: 'Sizing',
                type: 'selectOne',
                classes: [
                    'nav-fill',
                    'nav-justified',
                ]
            },
        ],
    },
    {
        section: 'Offcanvas',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/offcanvas/',
        controls: [
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    'offcanvas-(start|end|top|bottom)',
                ]
            },
        ],
    },
    {
        section: 'Pagination',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/pagination/',
        controls: [
            {
                name: 'Size',
                type: 'selectOne',
                classes: [
                    'pagination-(sm|lg)',
                ]
            },
        ],
    },
    {
        section: 'Progress',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/progress/',
        controls: [
            {
                name: 'Type',
                type: 'selectMany',
                classes: [
                    'progress-bar-(striped|animated)',
                ]
            },
        ],
    },
    {
        section: 'Spinner',
        documentationLink: 'https://getbootstrap.com/docs/5.0/components/spinners/',
        controls: [
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    'spinner-(border|grow)',
                ]
            },
            {
                name: 'Size',
                type: 'selectOne',
                classes: [
                    'spinner-(border|grow)-sm',
                ]
            },
        ],
    },
    {
        section: 'Form Control',
        documentationLink: 'https://getbootstrap.com/docs/5.0/forms/form-control/',
        controls: [
            {
                name: 'Type',
                type: 'selectOne',
                classes: [
                    'form-control',
                    'form-control-plaintext',
                ]
            },
            {
                name: 'Size',
                type: 'selectOne',
                classes: [
                    'form-control-(sm|lg)',
                ]
            },
        ],
    }
]