/**
* DevExtreme (core/utils/common.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DeferredObj } from './deferred';

export interface EqualByValueOptions {
  strict?: boolean;
  maxDepth?: number;
}

export function noop(): void;

export function deferRender<T>(func: () => T, deferred?: DeferredObj<T>): T | Promise<T> | DeferredObj<T>;

export function ensureDefined<T>(value: T, defaultValue: T): NonNullable<T>;

export function equalByValue(value1: unknown, value2: unknown, options?: EqualByValueOptions): boolean;

export function deferUpdate<T>(func: () => T, deferred?: DeferredObj<T>): T | Promise<T> | DeferredObj<T>;

export function escapeRegExp(string: string): string;
