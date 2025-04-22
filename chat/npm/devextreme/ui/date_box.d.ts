/**
* DevExtreme (ui/date_box.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import {
    DateLike,
} from '../common';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import {
    ComponentDisabledDate,
    dxCalendarOptions,
} from './calendar';

import dxDropDownEditor, {
    dxDropDownEditorOptions,
    DropDownButtonTemplateDataModel,
} from './drop_down_editor/ui.drop_down_editor';

import {
    ValueChangedInfo,
} from './editor/editor';

import {
    Format,
} from '../localization';

import {
    Properties as PopupProperties,
} from './popup';

export {
    DateLike,
};

/** @public */
export type DateType = 'date' | 'datetime' | 'time';
/** @public */
export type DatePickerType = 'calendar' | 'list' | 'native' | 'rollers';

/**
 * @docid _ui_date_box_ChangeEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type ChangeEvent = NativeEventInfo<dxDateBox, Event>;

/**
 * @docid _ui_date_box_ClosedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ClosedEvent = EventInfo<dxDateBox>;

/**
 * @docid _ui_date_box_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxDateBox>;

/**
 * @docid _ui_date_box_CopyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CopyEvent = NativeEventInfo<dxDateBox, ClipboardEvent>;

/**
 * @docid _ui_date_box_CutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CutEvent = NativeEventInfo<dxDateBox, ClipboardEvent>;

/**
 * @docid _ui_date_box_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxDateBox>;

/**
 * @docid _ui_date_box_EnterKeyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type EnterKeyEvent = NativeEventInfo<dxDateBox, KeyboardEvent>;

/**
 * @docid _ui_date_box_FocusInEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusInEvent = NativeEventInfo<dxDateBox, FocusEvent>;

/**
 * @docid _ui_date_box_FocusOutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusOutEvent = NativeEventInfo<dxDateBox, FocusEvent>;

/**
 * @docid _ui_date_box_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxDateBox>;

/**
 * @docid _ui_date_box_InputEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type InputEvent = NativeEventInfo<dxDateBox, UIEvent & { target: HTMLInputElement }>;

/**
 * @docid _ui_date_box_KeyDownEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyDownEvent = NativeEventInfo<dxDateBox, KeyboardEvent>;

/** @public */
export type KeyPressEvent = NativeEventInfo<dxDateBox, KeyboardEvent>;

/**
 * @docid _ui_date_box_KeyUpEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyUpEvent = NativeEventInfo<dxDateBox, KeyboardEvent>;

/**
 * @docid _ui_date_box_OpenedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type OpenedEvent = EventInfo<dxDateBox>;

/**
 * @docid _ui_date_box_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxDateBox> & ChangedOptionInfo;

/**
 * @docid _ui_date_box_PasteEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type PasteEvent = NativeEventInfo<dxDateBox, ClipboardEvent>;

/**
 * @docid _ui_date_box_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxDateBox, KeyboardEvent | MouseEvent | PointerEvent | Event> & ValueChangedInfo;

/** @public */
export type DisabledDate = ComponentDisabledDate<dxDateBox>;

/** @public */
export type DropDownButtonTemplateData = DropDownButtonTemplateDataModel;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxDateBoxOptions extends DateBoxBaseOptions<dxDateBox> {
    /**
     * @docid
     * @default false
     * @public
     */
    adaptivityEnabled?: boolean;
    /**
     * @docid
     * @default "Value is out of range"
     * @public
     */
    dateOutOfRangeMessage?: string;
    /**
     * @docid
     * @default null
     * @type_function_param1 data:object
     * @type_function_param1_field component:dxDateBox
     * @public
     */
    disabledDates?: Array<Date> | ((data: DisabledDate) => boolean);
    /**
     * @docid
     * @default {}
     * @public
     */
    inputAttr?: any;
    /**
     * @docid
     * @default 30
     * @public
     */
    interval?: number;
    /**
     * @docid
     * @default "Value must be a date or time"
     * @public
     */
    invalidDateMessage?: string;
    /**
     * @docid
     * @default ''
     * @public
     */
    label?: string;
    /**
     * @docid
     * @default null
     * @public
     */
    maxLength?: string | number;
    /**
     * @docid
     * @default ""
     * @public
     */
    name?: string;
    /**
     * @docid
     * @default 'calendar'
     * @default 'native' &for(iOS)
     * @default 'native' &for(Android)
     * @public
     */
    pickerType?: DatePickerType;
    /**
     * @docid
     * @default ""
     * @public
     */
    placeholder?: string;
    /**
     * @docid
     * @default true
     * @public
     */
    showAnalogClock?: boolean;
    /**
     * @docid
     * @readonly
     * @public
     */
    text?: string;
    /**
     * @docid
     * @default "date"
     * @public
     */
    type?: DateType;
    /**
     * @docid
     * @default null
     * @type Date|number|string|null
     * @public
     */
    value?: DateLike;
}

/**
 * @hidden
 * @docid
 * @namespace DevExpress.ui
 */
export interface DateBoxBaseOptions<TComponent> extends dxDropDownEditorOptions<TComponent> {
    /**
     * @docid
     * @default "OK"
     * @public
     */
    applyButtonText?: string;
    /**
     * @docid
     * @default {}
     * @public
     */
    calendarOptions?: dxCalendarOptions;
    /**
     * @docid
     * @default "Cancel"
     * @public
     */
    cancelButtonText?: string;
    /**
     * @docid
     * @default undefined
     * @public
     */
    dateSerializationFormat?: string | undefined;
    /**
     * @docid
     * @default null
     * @public
     */
    displayFormat?: Format;
    /**
     * @docid
     * @type Date|number|string|null|undefined
     * @default undefined
     * @public
     */
    max?: DateLike | undefined;
    /**
     * @docid
     * @type Date|number|string|null|undefined
     * @default undefined
     * @public
     */
    min?: DateLike | undefined;
    /**
     * @docid
     * @default "Today"
     * @public
     */
    todayButtonText?: string;
    /**
     * @docid
     * @default false
     * @public
     */
    useMaskBehavior?: boolean;
    /**
     * @docid
     * @type dxPopupOptions
     */
    dropDownOptions?: PopupProperties;
}

/**
 * @docid
 * @isEditor
 * @inherits dxDropDownEditor
 * @namespace DevExpress.ui
 * @hidden
 * @options DateBoxBaseOptions
 */
export class DateBoxBase<TProperties = Properties> extends dxDropDownEditor<TProperties> {
    /**
     * @docid
     * @publicName close()
     * @public
     */
    close(): void;
    /**
     * @docid
     * @publicName open()
     * @public
     */
    open(): void;
}

/**
 * @docid
 * @isEditor
 * @inherits DateBoxBase
 * @namespace DevExpress.ui
 * @public
 */
export default class dxDateBox extends DateBoxBase<Properties> {
    /**
     * @docid
     * @publicName reset(value)
     * @public
     * @param1 value:Date|number|string|null
     */
    reset(value?: DateLike): void;
}

/**
 * @public
 */
export type Properties = dxDateBoxOptions;

/** @deprecated use Properties instead */
export type Options = Properties;


