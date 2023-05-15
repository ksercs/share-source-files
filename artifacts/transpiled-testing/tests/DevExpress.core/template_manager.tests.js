!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/template_manager.tests.js"], ["jquery","core/template_manager","core/templates/template","core/templates/empty_template","core/templates/function_template"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/template_manager.tests.js", ["jquery", "core/template_manager", "core/templates/template", "core/templates/empty_template", "core/templates/function_template"], function($__export) {
  "use strict";
  var $,
      TemplateManager,
      Template,
      EmptyTemplate,
      FunctionTemplate;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      TemplateManager = $__m.TemplateManager;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      EmptyTemplate = $__m.EmptyTemplate;
    }, function($__m) {
      FunctionTemplate = $__m.FunctionTemplate;
    }],
    execute: function() {
      QUnit.module('TemplateManager');
      QUnit.test('should define default anonymous template name', function(assert) {
        var templateManager = new TemplateManager();
        assert.strictEqual(templateManager.anonymousTemplateName, 'template', '`template` is default anonymous template name');
      });
      QUnit.test('should define custom anonymous template name', function(assert) {
        var templateManager = new TemplateManager(undefined, 'customAnonymousTemplateName');
        assert.strictEqual(templateManager.anonymousTemplateName, 'customAnonymousTemplateName', '`customAnonymousTemplateName` is custom anonymous template name');
      });
      QUnit.test('should define default createElement function', function(assert) {
        var templateManager = new TemplateManager();
        assert.ok(templateManager._createTemplate(function() {
          return undefined;
        }) instanceof Template, 'default createElement function should returns a Template instance');
      });
      QUnit.test('should define custom createElement function', function(assert) {
        var templateManager = new TemplateManager(function() {
          return 'customCreateElement';
        });
        assert.strictEqual(templateManager._createTemplate(function() {
          return undefined;
        }), 'customCreateElement', 'default createElement function should returns a Template instance');
      });
      QUnit.test('#defaultOptions', function(assert) {
        var defaultOptions = TemplateManager.createDefaultOptions();
        assert.ok(defaultOptions.integrationOptions, 'integrationOptions are defined');
        assert.ok(defaultOptions.integrationOptions.watchMethod, 'watchMethod is defined');
        assert.ok(defaultOptions.integrationOptions.templates, 'templates are defined');
        assert.ok(defaultOptions.integrationOptions.templates['dx-polymorph-widget'], 'default polymorph widget template is defined');
        assert.strictEqual(defaultOptions.integrationOptions.useDeferUpdateForTemplates, true, 'do not use deferUpdate for template rendering');
      });
      QUnit.module('TemplateManager methods');
      QUnit.test('#addDefaultTemplates', function(assert) {
        var templateManager = new TemplateManager();
        templateManager.addDefaultTemplates({item1: 'item1'});
        assert.strictEqual(templateManager._defaultTemplates.item1, 'item1', 'should add a default template');
        templateManager.addDefaultTemplates({item1: 'new-template1'});
        assert.strictEqual(templateManager._defaultTemplates.item1, 'new-template1', 'should edit existed default template');
        templateManager.addDefaultTemplates({
          item2: 'item2',
          item3: 'item3'
        });
        assert.strictEqual(templateManager._defaultTemplates.item1, 'new-template1', 'should keep predefined default templates');
        assert.strictEqual(templateManager._defaultTemplates.item2, 'item2', 'should add multiple default templates');
        assert.strictEqual(templateManager._defaultTemplates.item3, 'item3', 'should add multiple default templates');
      });
      QUnit.test('#dispose', function(assert) {
        var templateManager = new TemplateManager();
        var dispose = sinon.spy();
        templateManager._tempTemplates = [{template: {dispose: dispose}}, {template: {dispose: dispose}}, {template: {}}];
        templateManager.dispose();
        assert.strictEqual(dispose.callCount, 2, 'should call template\'s `dispose` if it exists');
        assert.strictEqual(templateManager._tempTemplates.length, 0, 'should clear `_tempTemplates` array');
      });
      QUnit.module('TemplateManager method #extractTemplates');
      QUnit.test('should work without templates', function(assert) {
        var element = $('<div>');
        var templateManager = new TemplateManager();
        var $__2 = templateManager.extractTemplates(element),
            templates = $__2.templates,
            anonymousTemplateMeta = $__2.anonymousTemplateMeta;
        assert.equal(templates.length, 0, 'should return array without templates');
        assert.equal(Object.keys(anonymousTemplateMeta).length, 0, 'should return empty meta object');
      });
      QUnit.test('should extract defined templates', function(assert) {
        var element = $('<div><div data-options=dxTemplate:{name:"templateName"}></div>');
        var templateManager = new TemplateManager();
        var $__2 = templateManager.extractTemplates(element),
            templates = $__2.templates,
            anonymousTemplateMeta = $__2.anonymousTemplateMeta;
        assert.equal(templates.length, 1, 'should return array with template');
        assert.equal(Object.keys(anonymousTemplateMeta).length, 0, 'should return empty meta object');
      });
      QUnit.test('should extract anonymous template', function(assert) {
        var createElement = sinon.stub().returns('element');
        var element = $('<div><div>123</div></div>');
        var templateManager = new TemplateManager(createElement);
        var $__2 = templateManager.extractTemplates(element),
            templates = $__2.templates,
            anonymousTemplateMeta = $__2.anonymousTemplateMeta;
        assert.equal(templates.length, 0, 'should return array without predefined templates');
        assert.equal(anonymousTemplateMeta.name, 'template', 'should return anonymous template name');
        assert.equal(anonymousTemplateMeta.template, 'element', 'should return anonymous template');
        assert.equal(element.children().length, 0, 'initial element should not has children');
      });
      QUnit.module('TemplateManager method #getTemplate');
      QUnit.test('should work if template source is not a function', function(assert) {
        var templateManager = new TemplateManager();
        var templateSource = null;
        var template = templateManager.getTemplate(templateSource, [], {});
        assert.ok(template instanceof EmptyTemplate, 'should return acquireTemplate result');
      });
      QUnit.test('should work if template source is a function', function(assert) {
        var templates = {item: function() {
            return 'item';
          }};
        var templateSource = function() {
          return 'item';
        };
        var templateManager = new TemplateManager();
        var template = templateManager.getTemplate(templateSource, templates, {
          isAsyncTemplate: false,
          skipTemplates: []
        }, {});
        assert.ok(template instanceof FunctionTemplate, 'should return FunctionTemplate instance');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/template_manager","core/templates/template","core/templates/empty_template","core/templates/function_template"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/template_manager"), require("core/templates/template"), require("core/templates/empty_template"), require("core/templates/function_template"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=template_manager.tests.js.map