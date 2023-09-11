/**
* DevExtreme (ui/recurrence_editor.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor, {
    EditorOptions, ValueChangedInfo,
} from './editor/editor';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    NativeEventInfo,
} from '../events/index';

/**
 * @docid _ui_recurrence_editor_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxRecurrenceEditor>;

/**
 * @docid _ui_recurrence_editor_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxRecurrenceEditor>;

/**
 * @docid _ui_recurrence_editor_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxRecurrenceEditor>;

/**
 * @docid _ui_recurrence_editor_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxRecurrenceEditor> & ChangedOptionInfo;

/**
 * @docid _ui_recurrence_editor_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxRecurrenceEditor, Event> & ValueChangedInfo;

/**
 * @namespace DevExpress.ui
 * @docid
 * @type object
 */
export interface dxRecurrenceEditorOptions extends EditorOptions<dxRecurrenceEditor> {
    /**
     * @docid
     * @default null
     * @fires dxRecurrenceEditorOptions.onValueChanged
     * @public
     */
    value?: string;
}
/**
 * @docid
 * @isEditor
 * @inherits Editor
 * @namespace DevExpress.ui
 * @public
 */
export default class dxRecurrenceEditor extends Editor<dxRecurrenceEditorOptions> { }

export type Properties = dxRecurrenceEditorOptions;

/** @deprecated use Properties instead */
export type Options = dxRecurrenceEditorOptions;


