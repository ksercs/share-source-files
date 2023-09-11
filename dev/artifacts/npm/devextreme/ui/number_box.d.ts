/**
* DevExtreme (ui/number_box.d.ts)
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
} from '../events/index';

import {
    TextEditorButton,
} from '../common';

import dxTextEditor, {
    dxTextEditorOptions,
} from './text_box/ui.text_editor.base';

import {
    ValueChangedInfo,
} from './editor/editor';

import {
    Format,
  } from '../localization';

/** @public */
export type NumberBoxPredefinedButton = 'clear' | 'spins';
/** @public */
export type NumberBoxType = 'number' | 'text' | 'tel';

/**
 * @docid _ui_number_box_ChangeEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type ChangeEvent = NativeEventInfo<dxNumberBox, Event>;

/**
 * @docid _ui_number_box_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxNumberBox>;

/**
 * @docid _ui_number_box_CopyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CopyEvent = NativeEventInfo<dxNumberBox, ClipboardEvent>;

/**
 * @docid _ui_number_box_CutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CutEvent = NativeEventInfo<dxNumberBox, ClipboardEvent>;

/**
 * @docid _ui_number_box_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxNumberBox>;

/**
 * @docid _ui_number_box_EnterKeyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type EnterKeyEvent = NativeEventInfo<dxNumberBox, KeyboardEvent>;

/**
 * @docid _ui_number_box_FocusInEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusInEvent = NativeEventInfo<dxNumberBox, FocusEvent>;

/**
 * @docid _ui_number_box_FocusOutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusOutEvent = NativeEventInfo<dxNumberBox, FocusEvent>;

/**
 * @docid _ui_number_box_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxNumberBox>;

/**
 * @docid _ui_number_box_InputEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type InputEvent = NativeEventInfo<dxNumberBox, UIEvent & { target: HTMLInputElement }>;

/**
 * @docid _ui_number_box_KeyDownEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyDownEvent = NativeEventInfo<dxNumberBox, KeyboardEvent>;

/** @public */
export type KeyPressEvent = NativeEventInfo<dxNumberBox, KeyboardEvent>;

/**
 * @docid _ui_number_box_KeyUpEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyUpEvent = NativeEventInfo<dxNumberBox, KeyboardEvent>;

/**
 * @docid _ui_number_box_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxNumberBox> & ChangedOptionInfo;

/**
 * @docid _ui_number_box_PasteEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type PasteEvent = NativeEventInfo<dxNumberBox, ClipboardEvent>;

/**
 * @docid _ui_number_box_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxNumberBox, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | Event> & ValueChangedInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxNumberBoxOptions extends dxTextEditorOptions<dxNumberBox> {
    /**
     * @docid
     * @default undefined
     * @public
     */
    buttons?: Array<NumberBoxPredefinedButton | TextEditorButton>;
    /**
     * @docid
     * @default ""
     * @public
     */
    format?: Format;
    /**
     * @docid
     * @default "Value must be a number"
     * @public
     */
    invalidValueMessage?: string;
    /**
     * @docid
     * @default undefined
     * @public
     */
    max?: number;
    /**
     * @docid
     * @default undefined
     * @public
     */
    min?: number;
    /**
     * @docid
     * @default "text"
     * @default 'number' &for(mobile_devices)
     * @public
     */
    mode?: NumberBoxType;
    /**
     * @docid
     * @default false
     * @public
     */
    showSpinButtons?: boolean;
    /**
     * @docid
     * @default 1
     * @public
     */
    step?: number;
    /**
     * @docid
     * @default true
     * @default false &for(desktop)
     * @public
     */
    useLargeSpinButtons?: boolean;
    /**
     * @docid
     * @default 0
     * @public
     */
    value?: number;
}
/**
 * @docid
 * @isEditor
 * @inherits dxTextEditor
 * @namespace DevExpress.ui
 * @public
 */
export default class dxNumberBox extends dxTextEditor<dxNumberBoxOptions> { }

/** @public */
export type Properties = dxNumberBoxOptions;

/** @deprecated use Properties instead */
export type Options = dxNumberBoxOptions;


