/**
* DevExtreme (ui/date_range_box.d.ts)
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
  DxElement,
  UserDefinedElement,
} from '../core/element';

import {
  DropDownButtonTemplateDataModel,
} from './drop_down_editor/ui.drop_down_editor';

import { DateBoxBase, DateBoxBaseOptions } from './date_box';

import {
  ValueChangedInfo,
} from './editor/editor';

/**
 * @docid _ui_date_range_box_ChangeEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type ChangeEvent = NativeEventInfo<dxDateRangeBox>;

/**
 * @docid _ui_date_range_box_ClosedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ClosedEvent = EventInfo<dxDateRangeBox>;

/**
 * @docid _ui_date_range_box_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxDateRangeBox>;

/**
 * @docid _ui_date_range_box_CopyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CopyEvent = NativeEventInfo<dxDateRangeBox, ClipboardEvent>;

/**
 * @docid _ui_date_range_box_CutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CutEvent = NativeEventInfo<dxDateRangeBox, ClipboardEvent>;

/**
 * @docid _ui_date_range_box_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxDateRangeBox>;

/**
 * @docid _ui_date_range_box_EnterKeyEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type EnterKeyEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent>;

/**
 * @docid _ui_date_range_box_FocusInEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusInEvent = NativeEventInfo<dxDateRangeBox, FocusEvent>;

/**
 * @docid _ui_date_range_box_FocusOutEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type FocusOutEvent = NativeEventInfo<dxDateRangeBox, FocusEvent>;

/**
 * @docid _ui_date_range_box_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxDateRangeBox>;

/**
 * @docid _ui_date_range_box_InputEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type InputEvent = NativeEventInfo<dxDateRangeBox, UIEvent & { target: HTMLInputElement }>;

/**
 * @docid _ui_date_range_box_KeyDownEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyDownEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent>;

/** @public */
export type KeyPressEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent>;

/**
 * @docid _ui_date_range_box_KeyUpEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type KeyUpEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent>;

/**
 * @docid _ui_date_range_box_OpenedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type OpenedEvent = EventInfo<dxDateRangeBox>;

/**
 * @docid _ui_date_range_box_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxDateRangeBox> & ChangedOptionInfo;

/**
 * @docid _ui_date_range_box_PasteEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type PasteEvent = NativeEventInfo<dxDateRangeBox, ClipboardEvent>;

/**
 * @docid _ui_date_range_box_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent | MouseEvent | PointerEvent | Event> & ValueChangedInfo;

/** @public */
export type DropDownButtonTemplateData = DropDownButtonTemplateDataModel;

/**
 * @public
 * @docid dxDateRangeBoxOptions
 * @type object
 */
export type Properties = Omit<DateBoxBaseOptions<dxDateRangeBox>, 'inputAttr' | 'label' | 'maxLength' | 'name' | 'placeholder' | 'text'> & {
    /**
     * @docid dxDateRangeBoxOptions.disableOutOfRangeSelection
     * @default false
     * @public
     */
    disableOutOfRangeSelection?: boolean;
    /**
     * @docid dxDateRangeBoxOptions.endDate
     * @default null
     * @public
     * @fires dxDateRangeBoxOptions.onOptionChanged
     */
    endDate?: Date | number | string;
    /**
     * @docid dxDateRangeBoxOptions.endDateInputAttr
     * @default {}
     * @public
     */
    endDateInputAttr?: any;
    /**
     * @docid dxDateRangeBoxOptions.endDateLabel
     * @default "End Date"
     * @public
     */
    endDateLabel?: string;
    /**
     * @docid dxDateRangeBoxOptions.endDateName
     * @default ""
     * @public
     */
    endDateName?: string;
    /**
     * @docid dxDateRangeBoxOptions.endDateOutOfRangeMessage
     * @default "End date is out of range"
     * @public
     */
    endDateOutOfRangeMessage?: string;
    /**
     * @docid dxDateRangeBoxOptions.endDatePlaceholder
     * @default ""
     * @public
     */
    endDatePlaceholder?: string;
    /**
     * @docid dxDateRangeBoxOptions.endDateText
     * @readonly
     * @public
     */
    endDateText?: string;
    /**
     * @docid dxDateRangeBoxOptions.invalidEndDateMessage
     * @default "End value must be a date"
     * @public
     */
    invalidEndDateMessage?: string;
    /**
     * @docid dxDateRangeBoxOptions.invalidStartDateMessage
     * @default "Start value must be a date"
     * @public
     */
    invalidStartDateMessage?: string;
    /**
     * @docid dxDateRangeBoxOptions.multiView
     * @default true
     * @default false &for(iOS)
     * @default false &for(Android)
     * @public
     */
    multiView?: boolean;
    /**
     * @docid dxDateRangeBoxOptions.openOnFieldClick
     * @default true
     * @public
     */
    openOnFieldClick?: boolean;
    /**
     * @docid dxDateRangeBoxOptions.startDate
     * @default null
     * @public
     * @fires dxDateRangeBoxOptions.onOptionChanged
     */
    startDate?: Date | number | string;
    /**
     * @docid dxDateRangeBoxOptions.startDateInputAttr
     * @default {}
     * @public
     */
    startDateInputAttr?: any;
    /**
     * @docid dxDateRangeBoxOptions.startDateLabel
     * @default "Start Date"
     * @public
     */
    startDateLabel?: string;
    /**
     * @docid dxDateRangeBoxOptions.startDateName
     * @default ""
     * @public
     */
    startDateName?: string;
    /**
     * @docid dxDateRangeBoxOptions.startDateOutOfRangeMessage
     * @default "Start date is out of range"
     * @public
     */
    startDateOutOfRangeMessage?: string;
    /**
     * @docid dxDateRangeBoxOptions.startDatePlaceholder
     * @default ""
     * @public
     */
    startDatePlaceholder?: string;
    /**
     * @docid dxDateRangeBoxOptions.startDateText
     * @readonly
     * @public
     */
    startDateText?: string;
    /**
     * @docid dxDateRangeBoxOptions.value
     * @default [null,null]
     * @public
     */
    value?: Array<Date | number | string>;
};

/**
 * @namespace DevExpress.ui
 */
declare const DateRangeBoxBase: new(element: UserDefinedElement, options?: Properties) => Omit<DateBoxBase<Properties>, 'field'>;

/**
 * @docid
 * @isEditor
 * @inherits DateBoxBase
 * @namespace DevExpress.ui
 * @options Properties
 * @public
 */
export default class dxDateRangeBox extends DateRangeBoxBase {
  /**
   * @docid
   * @publicName endDateField()
   * @public
   */
  endDateField(): DxElement;
  /**
   * @docid
   * @publicName startDateField()
   * @public
   */
  startDateField(): DxElement;
}


