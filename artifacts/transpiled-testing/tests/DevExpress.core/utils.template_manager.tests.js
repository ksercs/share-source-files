!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.template_manager.tests.js"], ["core/utils/dom","core/utils/type","core/renderer","core/utils/template_manager","core/templates/template","core/templates/template_base","core/templates/empty_template","core/templates/child_default_template","core/devices"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/utils.template_manager.tests.js", ["core/utils/dom", "core/utils/type", "core/renderer", "core/utils/template_manager", "core/templates/template", "core/templates/template_base", "core/templates/empty_template", "core/templates/child_default_template", "core/devices"], function($__export) {
  "use strict";
  var domUtils,
      type,
      renderer,
      findTemplates,
      suitableTemplatesByName,
      addOneRenderedCall,
      templateKey,
      getNormalizedTemplateArgs,
      validateTemplateSource,
      defaultCreateElement,
      acquireIntegrationTemplate,
      acquireTemplate,
      Template,
      TemplateBase,
      EmptyTemplate,
      ChildDefaultTemplate,
      devices;
  return {
    setters: [function($__m) {
      domUtils = $__m.default;
    }, function($__m) {
      type = $__m.default;
    }, function($__m) {
      renderer = $__m.default;
    }, function($__m) {
      findTemplates = $__m.findTemplates;
      suitableTemplatesByName = $__m.suitableTemplatesByName;
      addOneRenderedCall = $__m.addOneRenderedCall;
      templateKey = $__m.templateKey;
      getNormalizedTemplateArgs = $__m.getNormalizedTemplateArgs;
      validateTemplateSource = $__m.validateTemplateSource;
      defaultCreateElement = $__m.defaultCreateElement;
      acquireIntegrationTemplate = $__m.acquireIntegrationTemplate;
      acquireTemplate = $__m.acquireTemplate;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      TemplateBase = $__m.TemplateBase;
    }, function($__m) {
      EmptyTemplate = $__m.EmptyTemplate;
    }, function($__m) {
      ChildDefaultTemplate = $__m.ChildDefaultTemplate;
    }, function($__m) {
      devices = $__m.default;
    }],
    execute: function() {
      QUnit.module('TemplateManager utils', {
        beforeEach: function() {
          var $ = renderer;
          this.$remove = sinon.stub($.fn, 'remove');
        },
        afterEach: function() {
          this.$remove.restore();
        }
      });
      QUnit.test('#validateTemplateSource', function(assert) {
        var normalize = sinon.stub(domUtils, 'normalizeTemplateElement');
        assert.strictEqual(validateTemplateSource(1), 1, 'should return value if it is not a string');
        assert.notOk(normalize.called, 'should not normalize template element if value is a string');
        validateTemplateSource('template');
        assert.ok(normalize.called, 'should normalize template element if value is a string');
        normalize.restore();
      });
      QUnit.test('#templateKey', function(assert) {
        var templateSource = ['template'];
        var isRenderer = sinon.stub(type, 'isRenderer');
        isRenderer.returns(true);
        assert.strictEqual(templateKey(templateSource), 'template', 'should return value if it is not a renderer function');
        isRenderer.returns(false);
        assert.strictEqual(templateKey(templateSource), templateSource, 'should return a first array item if if is a renderer function');
        isRenderer.restore();
      });
      QUnit.test('#findTemplates', function(assert) {
        var container = document.createElement('div');
        var template1 = document.createElement('div');
        template1.setAttribute('data-options', 'optionsName: { name: \'t1\' }');
        var template2 = document.createElement('div');
        template2.setAttribute('data-options', 'optionsName: { name: \'t2\' }');
        var templateWithoutOptions = document.createElement('div');
        templateWithoutOptions.setAttribute('data-options', '');
        var notATemplate = document.createElement('div');
        [template1, template2, templateWithoutOptions, notATemplate].forEach(function(element) {
          container.appendChild(element);
        });
        var templates = findTemplates(container, 'optionsName');
        assert.deepEqual(templates, [{
          element: template1,
          options: {name: 't1'}
        }, {
          element: template2,
          options: {name: 't2'}
        }]);
      });
      QUnit.test('#suitableTemplatesByName', function(assert) {
        var currentDeviceMethod = sinon.stub(devices, 'current').returns({testDevice: true});
        var templates = [{
          element: 'el1',
          options: {name: 'a'}
        }, {
          element: 'el2',
          options: {
            name: 'a',
            testDevice: true
          }
        }, {
          element: 'el3',
          options: {
            name: 'b',
            testDevice: true
          }
        }, {
          element: 'el4',
          options: {
            name: 'c',
            testDevice: false
          }
        }];
        var result = suitableTemplatesByName(templates);
        assert.deepEqual(result, {
          a: 'el2',
          b: 'el3'
        }, 'should return suitable templates');
        currentDeviceMethod.restore();
      });
      QUnit.test('#addOneRenderedCall', function(assert) {
        var render = sinon.spy();
        var template = {
          render: render,
          customField: 'customField'
        };
        var nextTemplate = addOneRenderedCall(template);
        assert.strictEqual(nextTemplate.customField, 'customField', 'should keep previous fields');
        nextTemplate.render('options');
        assert.ok(render.calledWith('options'), 'should call old `render` method');
      });
      QUnit.test('#getNormalizedTemplateArgs', function(assert) {
        var options = {
          model: 'model',
          index: 'index',
          container: 'container'
        };
        var normalizeArgs = getNormalizedTemplateArgs(options);
        assert.strictEqual(normalizeArgs[0], 'model', 'should contains model');
        assert.strictEqual(normalizeArgs[1], 'index', 'should contains index');
        assert.strictEqual(normalizeArgs[2], 'container', 'should contains container');
        assert.strictEqual(normalizeArgs[3], undefined, 'should not append something else');
      });
      QUnit.test('#defaultCreateElement', function(assert) {
        var template = defaultCreateElement();
        assert.ok(template instanceof Template, 'should return instance of Template');
      });
      QUnit.test('#acquireIntegrationTemplate', function(assert) {
        var onRendered = sinon.spy();
        var templateSource = 'templateSource';
        var templates = {templateSource: new TemplateBase()};
        var isAsyncTemplate = false;
        assert.equal(acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, ['templateSource']), null, 'should return null if skip template exists');
        assert.ok(acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, []) instanceof TemplateBase, 'should return template if it is TemplateBase');
        var templates2 = {templateSource: {render: function() {
              return 'template render';
            }}};
        var result = acquireIntegrationTemplate(templateSource, templates2, isAsyncTemplate, []);
        result.render({onRendered: onRendered});
        assert.strictEqual(onRendered.callCount, 1, 'should return template if it is async template');
      });
      QUnit.test('#acquireTemplate', function(assert) {
        assert.ok(acquireTemplate(null) instanceof EmptyTemplate, 'should return empty template if source is null');
        assert.equal(acquireTemplate(new ChildDefaultTemplate('templateName'), undefined, undefined, undefined, undefined, {templateName: 'defaultTemplate'}), 'defaultTemplate', 'should return default template if source is ChildDefaultTemplate');
        var templateSource = new TemplateBase();
        assert.strictEqual(acquireTemplate(templateSource), templateSource, 'should return source template if it is TemplateBase instance');
        var render = sinon.spy();
        var nextTemplate = acquireTemplate({render: render});
        nextTemplate.render('options');
        assert.ok(render.calledWith('options'), 'should add render call if template render is a function and template is not renderer');
        var createTemplate = sinon.stub().returns('value');
        var isRenderer = sinon.stub(type, 'isRenderer').returns(true);
        var result = acquireTemplate({render: render}, createTemplate);
        assert.strictEqual(createTemplate.callCount, 1, 'should call `createTemplate` if template is renderer');
        assert.strictEqual(result, 'value', 'should return result if template is renderer');
        isRenderer.restore();
        var result2 = acquireTemplate({nodeType: true}, createTemplate);
        assert.strictEqual(createTemplate.callCount, 2, 'should call `createTemplate` if template has nodeType');
        assert.strictEqual(result2, 'value', 'should return result if template has nodeTType');
        isRenderer.returns(false);
        var result3 = acquireTemplate('templateSource', createTemplate, {templateSource: 'result3'}, true);
        assert.strictEqual(result3, 'result3', 'should call `acquireIntegrationTemplate` and return right result');
        var result4 = acquireTemplate('templateSource', createTemplate, {templateSource: false}, true, [], {templateSource: 'result4'});
        assert.strictEqual(result4, 'result4', 'should use default templates if `acquireIntegrationTemplate` doesn`t return result');
        createTemplate.returns('result5');
        var result5 = acquireTemplate('templateSource', createTemplate, {templateSource: false}, true, [], {templateSource: false});
        assert.strictEqual(result5, 'result5', 'should call `createTemplate` if all conditions above are false');
        assert.strictEqual(createTemplate.callCount, 3, 'should call `createTemplate` if template has nodeType');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/dom","core/utils/type","core/renderer","core/utils/template_manager","core/templates/template","core/templates/template_base","core/templates/empty_template","core/templates/child_default_template","core/devices"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/dom"), require("core/utils/type"), require("core/renderer"), require("core/utils/template_manager"), require("core/templates/template"), require("core/templates/template_base"), require("core/templates/empty_template"), require("core/templates/child_default_template"), require("core/devices"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.template_manager.tests.js.map