/**
* DevExtreme (ui/validation_group.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DOMComponent, {
    DOMComponentOptions,
} from '../core/dom_component';

import {
    DxPromise,
} from '../core/utils/deferred';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import {
    AsyncRule,
    CompareRule,
    CustomRule,
    EmailRule,
    NumericRule,
    PatternRule,
    RangeRule,
    RequiredRule,
    StringLengthRule,
    ValidationStatus,
} from '../common';

export {
    ValidationStatus,
};

/**
 * @docid _ui_validation_group_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxValidationGroup>;

/**
 * @docid _ui_validation_group_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxValidationGroup>;

/**
 * @docid _ui_validation_group_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxValidationGroup> & ChangedOptionInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxValidationGroupOptions extends DOMComponentOptions<dxValidationGroup> {
}
/**
 * @docid
 * @inherits DOMComponent
 * @hasTranscludedContent
 * @namespace DevExpress.ui
 * @public
 */
export default class dxValidationGroup extends DOMComponent<dxValidationGroupOptions> {
    /**
     * @docid
     * @publicName reset()
     * @public
     */
    reset(): void;
    /**
     * @docid
     * @publicName validate()
     * @public
     * @return dxValidationGroupResult
     */
    validate(): ValidationResult;
}

/** @public */
export type ValidationResult = dxValidationGroupResult;

/**
 * @docid
 * @type object
 * @namespace DevExpress.ui
 * @deprecated {ui/validation_group.ValidationResult}
 */
export interface dxValidationGroupResult {
    /**
     * @docid
     * @public
     */
    brokenRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>;
    /**
     * @docid
     * @type Promise<dxValidationGroupResult>
     * @public
     */
    complete?: DxPromise<dxValidationGroupResult>;
    /**
     * @docid
     * @public
     */
    isValid?: boolean;
    /**
     * @docid
     * @public
     */
    status?: ValidationStatus;
    /**
     * @docid
     * @public
     */
    validators?: Array<any>;
}

/** @public */
export type Properties = dxValidationGroupOptions;

/** @deprecated use Properties instead */
export type Options = dxValidationGroupOptions;


