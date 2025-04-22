/**
* DevExtreme (core/options/utils.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Device,
} from '../../common/core/environment';

import {
    DefaultOptionsRule,
} from '../options';

export {
    DefaultOptionsRule,
} from '../options';

export function convertRulesToOptions<T>(rules: DefaultOptionsRule<T>[]): T;

export function normalizeOptions(options: string | object, value: any): { [name: string]: string };

export function deviceMatch(device: Device, filter: any): boolean;

export function getFieldName(fullName: string): string;

export function getParentName(fullName: string): string;

export function getNestedOptionValue(optionsObject: object, name: string): unknown;

export function createDefaultOptionRules<T>(options?: DefaultOptionsRule<T>[]): DefaultOptionsRule<T>[];
