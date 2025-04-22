/**
* DevExtreme (core/utils/callbacks.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type CallbackType<TArgs extends any[], TContext>
  = ((this: TContext, ...args: TArgs) => boolean)
  | ((this: TContext, ...args: TArgs) => void);

export interface Callback<TArgs extends any[] = any[], TContext = any> {
  add(fn: CallbackType<TArgs, TContext>): this;

  remove(fn: CallbackType<TArgs, TContext>): this;

  has(fn: CallbackType<TArgs, TContext>): this;

  empty(): this;

  fireWith(context: TContext, args: TArgs): this;

  fire(...args: TArgs): this;

  fired(): boolean;
}

export default function createCallback<TArgs extends any[]>(options?): Callback<TArgs>;
