/**
* DevExtreme (viz/sankey.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSource, { DataSourceLike } from '../data/data_source';

import {
    UserDefinedElement,
    DxElement,
} from '../core/element';

import {
    template,
    VerticalAlignment,
} from '../common';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip,
    FileSavingEventInfo,
    ExportInfo,
    IncidentInfo,
} from './core/base_widget';

import {
    HatchDirection,
    Palette,
    PaletteExtensionMode,
    TextOverflow,
    Font,
} from '../common/charts';

export {
    HatchDirection,
    Palette,
    PaletteExtensionMode,
    TextOverflow,
};

/** @public */
export type SankeyColorMode = 'none' | 'source' | 'target' | 'gradient';

/**
 * @docid _viz_sankey_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxSankey>;

/**
 * @docid _viz_sankey_DrawnEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DrawnEvent = EventInfo<dxSankey>;

/**
 * @docid _viz_sankey_ExportedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ExportedEvent = EventInfo<dxSankey>;

/**
 * @docid _viz_sankey_ExportingEvent
 * @public
 * @type object
 * @inherits EventInfo,ExportInfo
 */
export type ExportingEvent = EventInfo<dxSankey> & ExportInfo;

/**
 * @docid _viz_sankey_FileSavingEvent
 * @public
 * @type object
 * @inherits FileSavingEventInfo
 */
export type FileSavingEvent = FileSavingEventInfo<dxSankey>;

/**
 * @docid _viz_sankey_IncidentOccurredEvent
 * @public
 * @type object
 * @inherits EventInfo,IncidentInfo
 */
export type IncidentOccurredEvent = EventInfo<dxSankey> & IncidentInfo;

/**
 * @docid _viz_sankey_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxSankey>;

/**
 * @docid _viz_sankey_LinkClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type LinkClickEvent = NativeEventInfo<dxSankey, MouseEvent | PointerEvent> & {
    /** @docid _viz_sankey_LinkClickEvent.target */
    readonly target: dxSankeyLink;
};
/**
 * @docid _viz_sankey_LinkHoverEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type LinkHoverEvent = EventInfo<dxSankey> & {
    /** @docid _viz_sankey_LinkHoverEvent.target */
    readonly target: dxSankeyLink;
};
/**
 * @docid _viz_sankey_NodeClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type NodeClickEvent = NativeEventInfo<dxSankey, MouseEvent | PointerEvent> & {
    /** @docid _viz_sankey_NodeClickEvent.target */
    readonly target: dxSankeyNode;
};
/**
 * @docid _viz_sankey_NodeHoverEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type NodeHoverEvent = EventInfo<dxSankey> & {
    /** @docid _viz_sankey_NodeHoverEvent.target */
    readonly target: dxSankeyNode;
};

/**
 * @docid _viz_sankey_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxSankey> & ChangedOptionInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.viz
 * @docid
 */
export interface dxSankeyOptions extends BaseWidgetOptions<dxSankey> {
    /**
     * @docid
     * @public
     */
    adaptiveLayout?: {
      /**
       * @docid
       * @default 80
       */
      height?: number;
      /**
       * @docid
       * @default true
       */
      keepLabels?: boolean;
      /**
       * @docid
       * @default 80
       */
      width?: number;
    };
    /**
     * @docid
     * @default 'center'
     * @public
     */
    alignment?: VerticalAlignment | Array<VerticalAlignment>;
    /**
     * @docid
     * @notUsedInTheme
     * @public
     * @type Store|DataSource|DataSourceOptions|string|Array<any>|null
     */
    dataSource?: DataSourceLike<any> | null;
    /**
     * @docid
     * @default true
     * @public
     */
    hoverEnabled?: boolean;
    /**
     * @docid
     * @public
     */
    label?: {
      /**
       * @docid
       */
      border?: {
        /**
         * @docid
         * @default '#000000'
         */
        color?: string | undefined;
        /**
         * @docid
         * @default false
         */
        visible?: boolean | undefined;
        /**
         * @docid
         * @default 2
         */
        width?: number | undefined;
      };
      /**
       * @docid
       * @notUsedInTheme
       */
      customizeText?: ((itemInfo: dxSankeyNode) => string);
      /**
       * @docid
       * @default '#FFFFFF' &prop(color)
       */
      font?: Font;
      /**
       * @docid
       * @default 5
       */
      horizontalOffset?: number;
      /**
       * @docid
       * @default 'ellipsis'
       */
      overlappingBehavior?: TextOverflow;
      /**
       * @docid
       */
      shadow?: {
        /**
         * @docid
         * @default 1
         */
        blur?: number;
        /**
         * @docid
         * @default '#000000'
         */
        color?: string;
        /**
         * @docid
         * @default 0
         */
        offsetX?: number;
        /**
         * @docid
         * @default 1
         */
        offsetY?: number;
        /**
         * @docid
         * @default 0
         */
        opacity?: number;
      };
      /**
       * @docid
       * @default false
       */
      useNodeColors?: boolean;
      /**
       * @docid
       * @default 0
       */
      verticalOffset?: number;
      /**
       * @docid
       * @default true
       */
      visible?: boolean;
    };
    /**
     * @docid
     * @public
     */
    link?: {
      /**
       * @docid
       */
      border?: {
        /**
         * @docid
         * @default '#000000'
         */
        color?: string | undefined;
        /**
         * @docid
         * @default false
         */
        visible?: boolean | undefined;
        /**
         * @docid
         * @default 2
         */
        width?: number | undefined;
      };
      /**
       * @docid
       * @default '#000000'
       */
      color?: string;
      /**
       * @docid
       * @default 'none'
       */
      colorMode?: SankeyColorMode;
      /**
       * @docid
       */
      hoverStyle?: {
        /**
         * @docid
         */
        border?: {
          /**
           * @docid
           * @default undefined
           */
          color?: string | undefined;
          /**
           * @docid
           * @default undefined
           */
          visible?: boolean | undefined;
          /**
           * @docid
           * @default undefined
           */
          width?: number | undefined;
        };
        /**
         * @docid
         * @default undefined
         */
        color?: string | undefined;
        /**
         * @docid
         */
        hatching?: {
          /**
           * @docid
           * @default 'right'
           */
          direction?: HatchDirection;
          /**
           * @docid
           * @default 0.75
           */
          opacity?: number;
          /**
           * @docid
           * @default 6
           */
          step?: number;
          /**
           * @docid
           * @default 2
           */
          width?: number;
        };
        /**
         * @docid
         * @default 0.5
         */
        opacity?: number | undefined;
      };
      /**
       * @docid
       * @default 0.3
       */
      opacity?: number;
    };
    /**
     * @docid
     * @public
     */
    node?: {
      /**
       * @docid
       */
      border?: {
        /**
         * @docid
         * @default '#000000'
         */
        color?: string | undefined;
        /**
         * @docid
         * @default false
         */
        visible?: boolean | undefined;
        /**
         * @docid
         * @default 1
         */
        width?: number | undefined;
      };
      /**
       * @docid
       * @default undefined
       */
      color?: string | undefined;
      /**
       * @docid
       */
      hoverStyle?: {
        /**
         * @docid
         */
        border?: {
          /**
           * @docid
           * @default undefined
           */
          color?: string | undefined;
          /**
           * @docid
           * @default undefined
           */
          visible?: boolean | undefined;
          /**
           * @docid
           * @default undefined
           */
          width?: number | undefined;
        };
        /**
         * @docid
         * @default undefined
         */
        color?: string | undefined;
        /**
         * @docid
         */
        hatching?: {
          /**
           * @docid
           * @default 'right'
           */
          direction?: HatchDirection;
          /**
           * @docid
           * @default 0.75
           */
          opacity?: number;
          /**
           * @docid
           * @default 6
           */
          step?: number;
          /**
           * @docid
           * @default 2
           */
          width?: number;
        };
        /**
         * @docid
         * @default undefined
         */
        opacity?: number | undefined;
      };
      /**
       * @docid
       * @default 1
       */
      opacity?: number;
      /**
       * @docid
       * @default 30
       */
      padding?: number;
      /**
       * @docid
       * @default 15
       */
      width?: number;
    };
    /**
     * @docid
     * @default null
     * @type function
     * @type_function_param1 e:{viz/sankey:LinkClickEvent}
     * @notUsedInTheme
     * @action
     * @public
     */
    onLinkClick?: ((e: LinkClickEvent) => void) | string;
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{viz/sankey:LinkHoverEvent}
     * @notUsedInTheme
     * @action
     * @public
     */
    onLinkHoverChanged?: ((e: LinkHoverEvent) => void);
    /**
     * @docid
     * @default null
     * @type function
     * @type_function_param1 e:{viz/sankey:NodeClickEvent}
     * @notUsedInTheme
     * @action
     * @public
     */
    onNodeClick?: ((e: NodeClickEvent) => void) | string;
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{viz/sankey:NodeHoverEvent}
     * @notUsedInTheme
     * @action
     * @public
     */
    onNodeHoverChanged?: ((e: NodeHoverEvent) => void);
    /**
     * @docid
     * @default "Material"
     * @public
     */
    palette?: Array<string> | Palette;
    /**
     * @docid
     * @default 'blend'
     * @public
     */
    paletteExtensionMode?: PaletteExtensionMode;
    /**
     * @docid
     * @default undefined
     * @public
     */
    sortData?: any | undefined;
    /**
     * @docid
     * @default 'source'
     * @public
     */
    sourceField?: string;
    /**
     * @docid
     * @default 'target'
     * @public
     */
    targetField?: string;
    /**
     * @docid
     * @type object
     * @public
     */
    tooltip?: Tooltip;
    /**
     * @docid
     * @default 'weight'
     * @public
     */
    weightField?: string;
}
/**
 * @public
 * @docid dxSankeyTooltip
 */
export type Tooltip = BaseWidgetTooltip & {
    /**
     * @docid  dxSankeyOptions.tooltip.customizeLinkTooltip
     * @default undefined
     * @type_function_return object
     * @public
     */
    customizeLinkTooltip?: ((info: { source?: string; target?: string; weight?: number }) => any) | undefined;
    /**
     * @docid  dxSankeyOptions.tooltip.customizeNodeTooltip
     * @default undefined
     * @type_function_param1_field title:string:deprecated(label)
     * @type_function_return object
     * @public
     */
    customizeNodeTooltip?: ((info: { title?: string; label?: string; weightIn?: number; weightOut?: number }) => any) | undefined;
    /**
     * @docid dxSankeyOptions.tooltip.enabled
     * @default true
     * @public
     */
    enabled?: boolean;
    /**
     * @docid dxSankeyOptions.tooltip.linkTooltipTemplate
     * @type_function_return string|Element|jQuery
     * @default undefined
     * @public
     */
    linkTooltipTemplate?: template | ((info: { source?: string; target?: string; weight?: number }, element: DxElement) => string | UserDefinedElement) | undefined;
    /**
     * @docid dxSankeyOptions.tooltip.nodeTooltipTemplate
     * @type_function_return string|Element|jQuery
     * @default undefined
     * @public
     */
    nodeTooltipTemplate?: template | ((info: { label?: string; weightIn?: number; weightOut?: number }, element: DxElement) => string | UserDefinedElement) | undefined;
};
/**
 * @docid
 * @inherits BaseWidget, DataHelperMixin
 * @namespace DevExpress.viz
 * @public
 */
export default class dxSankey extends BaseWidget<dxSankeyOptions> {
    /**
     * @docid
     * @publicName getAllLinks()
     * @public
     */
    getAllLinks(): Array<dxSankeyLink>;
    /**
     * @docid
     * @publicName getAllNodes()
     * @public
     */
    getAllNodes(): Array<dxSankeyNode>;
    getDataSource(): DataSource;
    /**
     * @docid
     * @publicName hideTooltip()
     * @public
     */
    hideTooltip(): void;
}

/**
 * @docid
 * @publicName connection
 * @type object
 * @namespace DevExpress.viz
 */
export interface dxSankeyConnectionInfoObject {
    /**
     * @docid
     * @public
     */
    source?: string;
    /**
     * @docid
     * @public
     */
    target?: string;
    /**
     * @docid
     * @public
     */
    weight?: number;
}

/**
 * @docid
 * @publicName Link
 * @namespace DevExpress.viz
 */
export interface dxSankeyLink {
    /**
     * @docid
     * @public
     */
    connection?: dxSankeyConnectionInfoObject;
    /**
     * @docid
     * @publicName hideTooltip()
     * @public
     */
    hideTooltip(): void;
    /**
     * @docid
     * @publicName hover(state)
     * @public
     */
    hover(state: boolean): void;
    /**
     * @docid
     * @publicName isHovered()
     * @public
     */
    isHovered(): boolean;
    /**
     * @docid
     * @publicName showTooltip()
     * @public
     */
    showTooltip(): void;
}

/**
 * @docid
 * @publicName Node
 * @namespace DevExpress.viz
 */
export interface dxSankeyNode {
    /**
     * @docid
     * @publicName hideTooltip()
     * @public
     */
    hideTooltip(): void;
    /**
     * @docid
     * @publicName hover(state)
     * @public
     */
    hover(state: boolean): void;
    /**
     * @docid
     * @publicName isHovered()
     * @public
     */
    isHovered(): boolean;
    /**
     * @docid
     * @public
     */
    label?: string;
    /**
     * @docid
     * @public
     */
    linksIn?: Array<any>;
    /**
     * @docid
     * @public
     */
    linksOut?: Array<any>;
    /**
     * @docid
     * @publicName showTooltip()
     * @public
     */
    showTooltip(): void;
    /**
     * @docid
     * @deprecated dxSankeyNode.label
     * @public
     */
    title?: string;
}

/** @public */
export type Properties = dxSankeyOptions;

/** @deprecated use Properties instead */
export type Options = dxSankeyOptions;

// #region deprecated in v23.1

/** @deprecated Use Tooltip instead */
export type dxSankeyTooltip = Tooltip;

// #endregion


