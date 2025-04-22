/**
* DevExtreme (ui/text_box.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import {
    ValueChangedInfo,
} from './editor/editor';

import dxTextEditor, {
    dxTextEditorOptions,
} from './text_box/ui.text_editor.base';

/** @public */
export type TextBoxType = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

/**
 * @docid _ui_text_box_ChangeEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type ChangeEvent = NativeEventInfo<dxTextBox, Event>;

/**
 * @docid _ui_text_box_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxTextBox>;

/**
 * @docid _ui_text_box_CopyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CopyEvent = NativeEventInfo<dxTextBox, ClipboardEvent>;

/**
 * @docid _ui_text_box_CutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CutEvent = NativeEventInfo<dxTextBox, ClipboardEvent>;

/**
 * @docid _ui_text_box_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxTextBox>;

/**
 * @docid _ui_text_box_EnterKeyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type EnterKeyEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/**
 * @docid _ui_text_box_FocusInEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusInEvent = NativeEventInfo<dxTextBox, FocusEvent>;

/**
 * @docid _ui_text_box_FocusOutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusOutEvent = NativeEventInfo<dxTextBox, FocusEvent>;

/**
 * @docid _ui_text_box_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxTextBox>;

/**
 * @docid _ui_text_box_InputEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type InputEvent = NativeEventInfo<dxTextBox, UIEvent & { target: HTMLInputElement }>;

/**
 * @docid _ui_text_box_KeyDownEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyDownEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/** @public */
export type KeyPressEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/**
 * @docid _ui_text_box_KeyUpEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyUpEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/**
 * @docid _ui_text_box_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxTextBox> & ChangedOptionInfo;

/**
 * @docid _ui_text_box_PasteEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type PasteEvent = NativeEventInfo<dxTextBox, ClipboardEvent>;

/**
 * @docid _ui_text_box_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxTextBox, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | Event> & ValueChangedInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxTextBoxOptions<TComponent> extends dxTextEditorOptions<TComponent> {
    /**
     * @docid
     * @default null
     * @public
     */
    maxLength?: string | number;
    /**
     * @docid
     * @default "text"
     * @public
     */
    mode?: TextBoxType;
    /**
     * @docid
     * @default ""
     * @public
     */
    value?: string;
}
/**
 * @docid
 * @isEditor
 * @inherits dxTextEditor
 * @namespace DevExpress.ui
 * @public
 */
export default class dxTextBox<TProperties = Properties> extends dxTextEditor<TProperties> {
    /**
     * @docid
     * @publicName reset(value)
     * @public
     */
    reset(value?: string): void;
}

interface TextBoxInstance extends dxTextBox<Properties> { }

/** @public */
export type Properties = dxTextBoxOptions<TextBoxInstance>;

/** @deprecated use Properties instead */
export type Options = Properties;


