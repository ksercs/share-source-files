/**
* DevExtreme (core/component_registrator.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DOMComponent from './dom_component';
import { UserDefinedElement } from './element';

type ComponentFactory<TComponent> = {
    new(element: UserDefinedElement, options?: Record<string, unknown>): TComponent;
    getInstance(element: UserDefinedElement): TComponent;
};

/**
 * @docid
 * @publicName registerComponent(name, componentClass)
 * @param2 componentClass:object
 * @namespace DevExpress
 * @hidden
 */
declare function registerComponent<TComponent>(name: string, componentClass: ComponentFactory<TComponent>): void;

/**
 * @docid
 * @publicName registerComponent(name, namespace, componentClass)
 * @param3 componentClass:object
 * @namespace DevExpress
 * @hidden
 */
declare function registerComponent<TComponent>(name: string, namespace: { [key: string]: ComponentFactory<DOMComponent> }, componentClass: ComponentFactory<TComponent>): void;

export default registerComponent;
