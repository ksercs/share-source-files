/**
* DevExtreme (ui/autocomplete.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    ItemInfo,
} from '../events/index';

import dxDropDownList, {
    dxDropDownListOptions,
    SelectionChangedInfo,
} from './drop_down_editor/ui.drop_down_list';

import {
    DropDownButtonTemplateDataModel,
} from './drop_down_editor/ui.drop_down_editor';

import {
    ValueChangedInfo,
} from './editor/editor';

import {
    Properties as PopupProperties,
} from './popup';

/**
 * @docid _ui_autocomplete_ChangeEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type ChangeEvent = NativeEventInfo<dxAutocomplete, Event>;

/**
 * @docid _ui_autocomplete_ClosedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ClosedEvent = EventInfo<dxAutocomplete>;

/**
 * @docid _ui_autocomplete_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxAutocomplete>;

/**
 * @docid _ui_autocomplete_CopyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CopyEvent = NativeEventInfo<dxAutocomplete, ClipboardEvent>;

/**
 * @docid _ui_autocomplete_CutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CutEvent = NativeEventInfo<dxAutocomplete, ClipboardEvent>;

/**
 * @docid _ui_autocomplete_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxAutocomplete>;

/**
 * @docid _ui_autocomplete_EnterKeyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type EnterKeyEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent>;

/**
 * @docid _ui_autocomplete_FocusInEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusInEvent = NativeEventInfo<dxAutocomplete, FocusEvent>;

/**
 * @docid _ui_autocomplete_FocusOutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusOutEvent = NativeEventInfo<dxAutocomplete, FocusEvent>;

/**
 * @docid _ui_autocomplete_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxAutocomplete>;

/**
 * @docid _ui_autocomplete_InputEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type InputEvent = NativeEventInfo<dxAutocomplete, UIEvent & { target: HTMLInputElement }>;

/**
 * @docid _ui_autocomplete_ItemClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemClickEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent | MouseEvent | PointerEvent> & ItemInfo;

/**
 * @docid _ui_autocomplete_KeyDownEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyDownEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent>;

/** @public */
export type KeyPressEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent>;

/**
 * @docid _ui_autocomplete_KeyUpEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyUpEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent>;

/**
 * @docid _ui_autocomplete_OpenedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type OpenedEvent = EventInfo<dxAutocomplete>;

/**
 * @docid _ui_autocomplete_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxAutocomplete> & ChangedOptionInfo;

/**
 * @docid _ui_autocomplete_PasteEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type PasteEvent = NativeEventInfo<dxAutocomplete, ClipboardEvent>;

/**
 * @docid _ui_autocomplete_SelectionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,_ui_drop_down_editor_ui_drop_down_list_SelectionChangedInfo
 */
export type SelectionChangedEvent = EventInfo<dxAutocomplete> & SelectionChangedInfo;

/**
 * @docid _ui_autocomplete_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent | MouseEvent | PointerEvent | Event> & ValueChangedInfo;

/** @public */
export type DropDownButtonTemplateData = DropDownButtonTemplateDataModel;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxAutocompleteOptions extends dxDropDownListOptions<dxAutocomplete> {
    /**
     * @docid
     * @default 10
     * @public
     */
    maxItemCount?: number;
    /**
     * @docid
     * @default 1
     * @public
     */
    minSearchLength?: number;
    /**
     * @docid
     * @default false
     * @public
     */
    showDropDownButton?: boolean;
    /**
     * @docid
     * @default null
     * @public
     */
    value?: string;

    /**
     * @docid
     * @type dxPopupOptions
     */
    dropDownOptions?: PopupProperties;
}
/**
 * @docid
 * @isEditor
 * @inherits dxDropDownList
 * @namespace DevExpress.ui
 * @public
 */
export default class dxAutocomplete extends dxDropDownList<dxAutocompleteOptions> { }

/** @public */
export type Properties = dxAutocompleteOptions;

/** @deprecated use Properties instead */
export type Options = dxAutocompleteOptions;


