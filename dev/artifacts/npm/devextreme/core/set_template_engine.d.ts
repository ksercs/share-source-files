/**
* DevExtreme (core/set_template_engine.d.ts)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @publicName setTemplateEngine(name)
 * @namespace DevExpress
 * @public
 */
declare function setTemplateEngine(templateEngineName: string): void;

/**
 * @docid
 * @publicName setTemplateEngine(options)
 * @namespace DevExpress
 * @public
 */
declare function setTemplateEngine(templateEngineOptions: { compile?: Function; render?: Function }): void;

export default setTemplateEngine;
