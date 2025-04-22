/**
* DevExtreme (ui/tag_box.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
    DxElement,
} from '../core/element';

import {
    template,
    ApplyValueMode,
    SelectAllMode,
} from '../common';

import {
    Cancelable,
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    ItemInfo,
} from '../common/core/events';

import {
    SelectionChangeInfo,
} from './collection/ui.collection_widget.base';

import {
    DropDownButtonTemplateDataModel,
} from './drop_down_editor/ui.drop_down_editor';

import {
    ValueChangedInfo,
} from './editor/editor';

import dxSelectBox, {
    dxSelectBoxOptions,
    CustomItemCreatingInfo,
} from './select_box';

/**
 * @docid _ui_tag_box_ChangeEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type ChangeEvent = NativeEventInfo<dxTagBox, Event>;

/**
 * @docid _ui_tag_box_ClosedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ClosedEvent = EventInfo<dxTagBox>;

/**
 * @docid _ui_tag_box_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxTagBox>;

/**
 * @docid _ui_tag_box_CustomItemCreatingEvent
 * @public
 * @type object
 * @inherits EventInfo,CustomItemCreatingInfo
 */
export type CustomItemCreatingEvent = EventInfo<dxTagBox> & CustomItemCreatingInfo;

/**
 * @docid _ui_tag_box_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxTagBox>;

/**
 * @docid _ui_tag_box_EnterKeyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type EnterKeyEvent = NativeEventInfo<dxTagBox, KeyboardEvent>;

/**
 * @docid _ui_tag_box_FocusInEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusInEvent = NativeEventInfo<dxTagBox, FocusEvent>;

/**
 * @docid _ui_tag_box_FocusOutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusOutEvent = NativeEventInfo<dxTagBox, FocusEvent>;

/**
 * @docid _ui_tag_box_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxTagBox>;

/**
 * @docid _ui_tag_box_InputEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type InputEvent = NativeEventInfo<dxTagBox, UIEvent & { target: HTMLInputElement }>;

/**
 * @docid _ui_tag_box_ItemClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemClickEvent = NativeEventInfo<dxTagBox> & ItemInfo;

/**
 * @docid _ui_tag_box_KeyDownEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyDownEvent = NativeEventInfo<dxTagBox, KeyboardEvent>;

/** @public */
export type KeyPressEvent = NativeEventInfo<dxTagBox, KeyboardEvent>;

/**
 * @docid _ui_tag_box_KeyUpEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyUpEvent = NativeEventInfo<dxTagBox, KeyboardEvent>;

/**
 * @docid _ui_tag_box_MultiTagPreparingEvent
 * @public
 * @type object
 * @inherits Cancelable,EventInfo
 */
export type MultiTagPreparingEvent = Cancelable & EventInfo<dxTagBox> & {
    /** @docid _ui_tag_box_MultiTagPreparingEvent.multiTagElement */
    readonly multiTagElement: DxElement;
    /**
     * @docid _ui_tag_box_MultiTagPreparingEvent.selectedItems
     * @type Array<string,number,Object>
     */
    readonly selectedItems?: Array<string | number | any>;
    /** @docid _ui_tag_box_MultiTagPreparingEvent.text */
    text?: string;
};

/**
 * @docid _ui_tag_box_OpenedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type OpenedEvent = EventInfo<dxTagBox>;

/**
 * @docid _ui_tag_box_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxTagBox> & ChangedOptionInfo;

/**
 * @docid _ui_tag_box_SelectAllValueChangedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type SelectAllValueChangedEvent = EventInfo<dxTagBox> & {
    /** @docid _ui_tag_box_SelectAllValueChangedEvent.value */
    readonly value: boolean;
};

/**
 * @docid _ui_tag_box_SelectionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,SelectionChangeInfo
 */
export type SelectionChangedEvent = EventInfo<dxTagBox> & SelectionChangeInfo<string | number | any>;

/**
 * @docid _ui_tag_box_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxTagBox, KeyboardEvent | MouseEvent | PointerEvent | Event> & ValueChangedInfo;

/** @public */
export type DropDownButtonTemplateData = DropDownButtonTemplateDataModel;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxTagBoxOptions extends Pick<dxSelectBoxOptions<dxTagBox>, Exclude<keyof dxSelectBoxOptions<dxTagBox>, 'onSelectionChanged'>> {
    /**
     * @docid
     * @default "instantly"
     * @public
     */
    applyValueMode?: ApplyValueMode;
    /**
     * @docid
     * @default false
     * @public
     */
    hideSelectedItems?: boolean;
    /**
     * @docid
     * @default undefined
     * @public
     */
    maxDisplayedTags?: number | undefined;
    /**
     * @docid
     * @default true
     * @public
     */
    multiline?: boolean;
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/tag_box:MultiTagPreparingEvent}
     * @action
     * @public
     */
    onMultiTagPreparing?: ((e: MultiTagPreparingEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/tag_box:SelectAllValueChangedEvent}
     * @action
     * @public
     */
    onSelectAllValueChanged?: ((e: SelectAllValueChangedEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/tag_box:SelectionChangedEvent}
     * @action
     * @public
     */
    onSelectionChanged?: ((e: SelectionChangedEvent) => void);
    /**
     * @docid
     * @default 'page'
     * @public
     */
    selectAllMode?: SelectAllMode;
    /**
     * @docid
     * @readonly
     * @public
     */
    selectedItems?: Array<string | number | any>;
    /**
     * @docid
     * @default "Select All"
     * @public
     */
    selectAllText?: string;
    /**
     * @docid
     * @default false
     * @public
     */
    showDropDownButton?: boolean;
    /**
     * @docid
     * @default 1500
     * @public
     */
    maxFilterQueryLength?: number;
    /**
     * @docid
     * @default true
     * @public
     */
    showMultiTagOnly?: boolean;
    /**
     * @docid
     * @default "tag"
     * @type_function_param1 itemData:object
     * @type_function_return string|Element|jQuery
     * @public
     */
    tagTemplate?: template | ((itemData: any, itemElement: DxElement) => string | UserDefinedElement);
    /**
     * @docid
     * @default []
     * @public
     */
    value?: Array<string | number | any>;
}
/**
 * @docid
 * @isEditor
 * @inherits dxSelectBox
 * @namespace DevExpress.ui
 * @public
 */
export default class dxTagBox extends dxSelectBox<dxTagBoxOptions> { }

/** @public */
export type Properties = dxTagBoxOptions;

/** @deprecated use Properties instead */
export type Options = dxTagBoxOptions;


