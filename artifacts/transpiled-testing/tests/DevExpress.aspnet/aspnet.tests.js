!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.aspnet/aspnet.tests.js"], ["integration/jquery","ui/button","ui/check_box","ui/drop_down_button","ui/form","ui/popup","ui/select_box","ui/text_box","ui/toolbar","ui/validator","ui/validation_summary","aspnet","jquery","core/templates/template_engine_registry","ui/widget/ui.errors","../../helpers/ajaxMock.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define("testing/tests/DevExpress.aspnet/aspnet.tests.js", ["require", "exports", "module", "integration/jquery", "ui/button", "ui/check_box", "ui/drop_down_button", "ui/form", "ui/popup", "ui/select_box", "ui/text_box", "ui/toolbar", "ui/validator", "ui/validation_summary", "aspnet", "jquery", "core/templates/template_engine_registry", "ui/widget/ui.errors", "../../helpers/ajaxMock.js"], function(require, exports, module) {
      require('integration/jquery'), require('ui/button');
      require('ui/check_box');
      require('ui/drop_down_button');
      require('ui/form');
      require('ui/popup');
      require('ui/select_box');
      require('ui/text_box');
      require('ui/toolbar');
      require('ui/validator');
      require('ui/validation_summary');
      const aspnet = require('aspnet');
      window.DevExpress = {aspnet: aspnet};
      module.exports = factory(require('jquery'), require('core/templates/template_engine_registry').setTemplateEngine, aspnet, function() {
        return require('ui/widget/ui.errors');
      }, function() {
        return require('../../helpers/ajaxMock.js');
      });
    });
  } else {
    factory(window.jQuery, DevExpress.setTemplateEngine, DevExpress.aspnet, function() {
      return window.DevExpress_ui_widget_errors;
    }, function() {
      return window.ajaxMock;
    });
  }
}(function($, setTemplateEngine, aspnet, errorsAccessor, ajaxMockAccessor) {
  if (QUnit.urlParams['nojquery']) {
    return;
  }
  QUnit.module('Client Validation', {beforeEach: function() {
      $('#qunit-fixture').html('<div id=\'editor\'></div><div id=\'editor2\'></div><div id=\'summary\'></div>');
    }}, function() {
    QUnit.test('Get comparison target value', function(assert) {
      $('#editor').dxTextBox({
        value: 'testMVC',
        name: 'FullName'
      });
      assert.equal(aspnet.getEditorValue('FullName'), 'testMVC', 'value of editor');
    });
    QUnit.test('Create validationSummary items', function(assert) {
      const validationGroup = 'test-group';
      $('#editor').dxTextBox({
        name: 'FullName',
        validationError: {message: 'Server exception'}
      }).dxValidator({validationGroup: validationGroup});
      $('#summary').dxValidationSummary({validationGroup: validationGroup});
      aspnet.createValidationSummaryItems(validationGroup, ['FullName']);
      const summary = $('#summary').dxValidationSummary('instance');
      const item = summary.option('items')[0];
      const editor = item.validator.$element().dxTextBox('instance');
      assert.equal(summary.option('items').length, 1, 'item count is OK');
      assert.equal(item.text, 'Server exception', 'text of first item is OK');
      assert.equal(editor.option('name'), 'FullName', 'validator is OK');
    });
    QUnit.test('Create validationSummary items for different validationGroup', function(assert) {
      const validationGroup = 'custom-group';
      $('#editor').dxTextBox({
        name: 'FullName',
        validationError: {message: 'Server exception'}
      }).dxValidator({validationGroup: validationGroup});
      $('#summary').dxValidationSummary({validationGroup: validationGroup});
      aspnet.createValidationSummaryItems('custom-group-2', ['FullName']);
      const summary = $('#summary').dxValidationSummary('instance');
      assert.notOk(summary.option('items').length, 'items not found');
    });
    QUnit.test('Create validationSummary items only for editor with related option name', function(assert) {
      const validationGroup = 'test-group';
      $('#editor').dxTextBox({
        name: 'FullName',
        validationError: {message: 'Server exception'}
      }).dxValidator({validationGroup: validationGroup});
      $('#editor2').dxTextBox({name: 'City'}).dxValidator({validationGroup: validationGroup});
      $('#summary').dxValidationSummary({validationGroup: validationGroup});
      aspnet.createValidationSummaryItems(validationGroup, ['FullName']);
      const summary = $('#summary').dxValidationSummary('instance');
      const item = summary.option('items')[0];
      assert.equal(summary.option('items').length, 1, 'item length is OK');
      assert.equal(item.text, 'Server exception', 'text of first item is OK');
    });
  });
  QUnit.module('Render component', {
    beforeEach: function() {
      $('#qunit-fixture').html('<div id="button"></div>\
                    \
                    <script id="templateWithCreateComponent" type="text/html" nonce="wIkO6u">\
                    <div id="templateContent">\
                        <div id="inner-button"></div>\
                        <% DevExpress.aspnet.createComponent("dxButton", { text: "text" }, "inner-button"); %>\
                    </div>\
                    </script>\
                    <script id="simpleTemplate" type="text/html" nonce="wIkO6u">\
                    <div id="templateContent">\
                        <%= DevExpress.aspnet.renderComponent("dxButton") %>\
                    </div>\
                    </script>\
                    \
                    <script id="templateWithOptions" type="text/html" nonce="wIkO6u">\
                    <div id="templateContent">\
                        <%= DevExpress.aspnet.renderComponent("dxButton", { text: "text" }) %>\
                    </div>\
                    </script>\
                    \
                    <script id="templateWithID" type="text/html" nonce="wIkO6u">\
                    <div id="templateContent">\
                        <%= DevExpress.aspnet.renderComponent("dxButton", { }, "test-id") %>\
                    </div>\
                    </script>\
                    \
                    <script id="templateWithExoticId" type="text/html" nonce="wIkO6u">\
                    <div id="templateContent">\
                        <%= DevExpress.aspnet.renderComponent("dxButton", { }, "id-_1α♠!#$%&()*+,./:;<=>?@[\\\\]^`{|}~") %>\
                    </div>\
                    </script>\
                    \
                    <script id="templateWithValidator" type="text/html" nonce="wIkO6u">\
                    <div id="templateContent">\
                        <%= DevExpress.aspnet.renderComponent("dxTextBox", { }, "test-id", { validationGroup: "my-group" }) %>\
                    </div>\
                    </script>\
                    \
                    <div id="buttonWithInnerTemplate"><script nonce="wIkO6u">// DevExpress.aspnet.setTemplateEngine();</script>BUTTON_CONTENT</div>');
      aspnet.setTemplateEngine();
    },
    afterEach: function() {
      setTemplateEngine('default');
    }
  }, function() {
    function renderTemplate(templateId) {
      $('#button').dxButton({template: $(templateId)});
      return $('#templateContent').children();
    }
    QUnit.test('Create component', function(assert) {
      const $result = renderTemplate('#templateWithCreateComponent');
      assert.ok($result.is('.dx-button'));
    });
    QUnit.test('Component element rendering', function(assert) {
      const $result = renderTemplate('#simpleTemplate');
      assert.ok($result.is('div[id|=dx]'));
    });
    QUnit.test('Component rendering', function(assert) {
      const $result = renderTemplate('#simpleTemplate');
      assert.ok($result.is('.dx-button'));
    });
    QUnit.test('Component rendering with options', function(assert) {
      const $result = renderTemplate('#templateWithOptions');
      assert.equal($result.dxButton('option', 'text'), 'text');
    });
    QUnit.test('Component element rendering with custom ID', function(assert) {
      const $result = renderTemplate('#templateWithID');
      assert.ok($result.is('#test-id'));
    });
    QUnit.test('Component element rendering with validator', function(assert) {
      const $result = renderTemplate('#templateWithValidator');
      assert.equal($result.dxValidator('option', 'validationGroup'), 'my-group');
    });
    QUnit.test('Exotic characters in component ID should be escaped (T531137)', function(assert) {
      const $result = renderTemplate('#templateWithExoticId');
      assert.ok($result.dxButton('instance'));
    });
    QUnit.test('Inner template is rendered correctly when another script tags exist', function(assert) {
      const $buttonElement = $('#buttonWithInnerTemplate').dxButton();
      $buttonElement.find('script').remove();
      assert.equal($buttonElement.text(), 'BUTTON_CONTENT');
    });
  });
  QUnit.module('Template engine', {
    beforeEach: function() {
      $('#qunit-fixture').html('<div id="button"></div>\
                <script id="simpleTemplate" type="text/html" nonce="wIkO6u"></script>');
      aspnet.setTemplateEngine();
    },
    afterEach: function() {
      setTemplateEngine('default');
    }
  }, function() {
    const testTemplate = function(name, templateSource, expected) {
      QUnit.test(name, function(assert) {
        const $template = $('#simpleTemplate');
        $template.text(templateSource);
        $('#button').dxButton({
          text: 'Test button',
          template: $template
        });
        assert.equal($('.dx-button-content').text(), expected);
      });
    };
    testTemplate('Echo constant', 'a <%= \'b\' %> c', 'a b c');
    testTemplate('Echo variable', '[<%= text %>]', '[Test button]');
    testTemplate('Multiple blocks', '[<%= 1 %>][<%= 2 %>][<%= 3 %>]', '[1][2][3]');
    testTemplate('Evaluate', '<% text %>', '');
    testTemplate('Evalute expr w/ semicolon', '<% text %>abc', 'abc');
    testTemplate('For loop', '<% for(var i = 0; i < 5; i++) { %><%= i %><% } %>', '01234');
    testTemplate('Text escaping', '\'"\\\n', '\'"\\\n');
    testTemplate('Html encode: inline', '<%- \'<img />\' %>', '<img />');
    testTemplate('Html encode: stored in variable', '<% var a = \'<script nonce="wIkO6u">alert(1)</script>\'; %><%- a %>', '<script nonce="wIkO6u">alert(1)</script>');
    testTemplate('obj', '<%- obj.text %>', 'Test button');
    testTemplate('null', '<% var a = null; %><%- a %>', '');
    testTemplate('undefined', '<% var a = undefined; %><%- a %>', '');
    testTemplate('empty', '<%-%>', 'undefined');
    testTemplate('space', '<%- %>', 'undefined');
    testTemplate('tab', '<%-\t%>', 'undefined');
    testTemplate('new line', '<%-\n%>', 'undefined');
    testTemplate('return', '<%-\r%>', 'undefined');
    testTemplate('two spaces', '<%-  %>', 'undefined');
    testTemplate('empty string', '<%- \'\' %>', '');
    testTemplate('nonempty string', '<%- \'a\' %>', 'a');
    testTemplate('WA from T954324, null', '<% var value = null; %><%- (value != null ? value : \'\') %>', '');
    testTemplate('WA from T954324, undefined', '<% var value = undefined; %><%- (value != null ? value : \'\') %>', '');
    testTemplate('WA from T954324, nempty string', '<% var value = \'\'; %><%- (value != null ? value : \'\') %>', '');
    testTemplate('WA from T954324, nonempty string', '<% var value = \'a\'; %><%- (value != null ? value : \'\') %>', 'a');
    testTemplate('Alternative syntax (T831170)', 'a [%= \'b\' %] c', 'a b c');
  });
  QUnit.test('Transcluded content (T691770, T693379)', function(assert) {
    aspnet.setTemplateEngine();
    try {
      window.testCounters = {
        innerEval: 0,
        innerClick: 0
      };
      $('#qunit-fixture').html('\
                <div id=test-button>\
                    <div id=test-button-inner></div>\
                    <script nonce="wIkO6u">\
                        testCounters.innerEval++;\
                        $(\'#test-button-inner\')\
                            .append(\'test-button-inner-text\')\
                            .click(function() {\
                                testCounters.innerClick++;\
                            });\
                    </script>\
                </div>\
            ');
      $('#test-button').dxButton();
      $('#test-button-inner').trigger('click');
      assert.equal(window.testCounters.innerEval, 1);
      assert.equal(window.testCounters.innerClick, 1);
      assert.equal($('#test-button-inner').html(), 'test-button-inner-text');
    } finally {
      setTemplateEngine('default');
      delete window.testCounters;
    }
  });
  const testNoCSP = QUnit.urlParams['nocsp'] ? QUnit.test : QUnit.skip;
  testNoCSP('T744904 - MVCx extension in template', function(assert) {
    aspnet.setTemplateEngine();
    window['MVCx'] = {};
    try {
      $('#qunit-fixture').html('<div id="test-widget"></div>' + '<script id="test-template" type="text/html" nonce="wIkO6u">' + '  <script id="dxss_123456789" type="text/javascript"></<% %>script>' + '</script>');
      const widgetElement = $('#test-widget');
      widgetElement.dxButton({template: $('#test-template')});
      assert.ok(widgetElement.html().indexOf('dxss_') < 0);
      window['MVCx'].isDXScriptInitializedOnLoad = true;
      widgetElement.dxButton('instance').repaint();
      assert.ok(widgetElement.html().indexOf('dxss_') > -1);
    } finally {
      setTemplateEngine('default');
      delete window['MVCx'];
    }
  });
  QUnit.test('T1146301 - NamedTemplate with expression inside Content RazorBlock', function(assert) {
    aspnet.setTemplateEngine();
    try {
      $('#qunit-fixture').html('<div id="template-holder-widget"></div>' + '<script nonce="wIkO6u">var rawJsStringWithHtmlTags = "<b>Encoded</b>";</script>' + '<script id="template-nested-func" type="text/html" nonce="wIkO6u">' + '<%!function(){%>\
                   <div id="<%=arguments[0]%>">\
                     <div id="nested-function-expr"><%- rawJsStringWithHtmlTags %></div>\
                   </div>\
                   <%DevExpress.aspnet.createComponent("dxScrollView",{},arguments[0])%>\
                 <%}("dx-data-guid")%>' + '</script>');
      const widgetElement = $('#template-holder-widget');
      widgetElement.dxButton({template: $('#template-nested-func')});
      assert.equal($('#nested-function-expr').html(), '&lt;b&gt;Encoded&lt;/b&gt;');
    } finally {
      setTemplateEngine('default');
    }
  });
  QUnit.test('T758209', function(assert) {
    aspnet.setTemplateEngine();
    const errors = errorsAccessor();
    const spy = sinon.spy(errors, 'log');
    try {
      const formID = 'bd859c15-674f-49bf-a6d0-9368508e8d11';
      const textBoxID = '682b4545-09d9-4f63-82ed-91570d869eb6';
      window.__createForm = function() {
        const config = {
          formData: {testField: 'testValue'},
          items: [{
            dataField: 'testField',
            editorType: 'dxSelectBox',
            editorOptions: {
              items: ['testValue'],
              fieldTemplate: $('#popup1_form_fieldTempalte')
            }
          }]
        };
        DevExpress.aspnet.createComponent('dxForm', config, formID);
      };
      window.__createTextBox = function(obj) {
        DevExpress.aspnet.createComponent('dxTextBox', {value: obj + ' in template'}, textBoxID);
      };
      $('#qunit-fixture').html('<div id="popup1">' + '</div>' + '<script id="popup1_contentTemplate" type="text/html" nonce="wIkO6u">' + '  <div id=' + formID + '></div>' + '  <% __createForm() %>' + '</script>' + '<script id="popup1_form_fieldTempalte" type="text/html" nonce="wIkO6u">' + '  <div id=' + textBoxID + '></div>' + '  <% __createTextBox(obj) %>' + '</script>');
      $('#popup1').dxPopup({
        contentTemplate: $('#popup1_contentTemplate'),
        visible: true
      });
      errors.log.args.forEach(function(a) {
        if (a[0] === 'E1035') {
          throw 'E1035 is found in the log';
        }
      });
      assert.equal($('#' + textBoxID).dxTextBox('instance').option('value'), 'testValue in template');
    } finally {
      setTemplateEngine('default');
      spy.restore();
      delete window.__createForm;
      delete window.__createTextBox;
    }
  });
  QUnit.test('T810336', function(assert) {
    aspnet.setTemplateEngine();
    window.__createButton = function(buttonID) {
      DevExpress.aspnet.createComponent('dxButton', {text: buttonID}, buttonID);
    };
    try {
      $('#qunit-fixture').html('<div id="popup1"></div>' + '<script id="popup1_contentTemplate" type="text/html" nonce="wIkO6u">' + '  <div id="b1"></div><% __createButton("b1") %>' + '  <div id="b2"></div><% __createButton("b2") %>' + '</script>');
      $('#popup1').dxPopup({
        contentTemplate: $('#popup1_contentTemplate'),
        visible: true
      });
      assert.ok($('#b1').dxButton('instance'));
      assert.ok($('#b2').dxButton('instance'));
    } finally {
      setTemplateEngine('default');
      delete window.__createButton;
    }
  });
  QUnit.test('T836885', function(assert) {
    aspnet.setTemplateEngine();
    try {
      $('#qunit-fixture').html('<div id=list1></div>' + '<script id="list1_itemTemplate" type="text/html" nonce="wIkO6u">' + '  <div id="<%= key %>"></div><% DevExpress.aspnet.createComponent("dxTextBox", { }, key) %>' + '</script>');
      const NUMERIC_ID = 20191205;
      $('#list1').dxList({
        items: [{key: NUMERIC_ID}],
        itemTemplate: $('#list1_itemTemplate')
      });
      assert.ok($('#' + NUMERIC_ID).dxTextBox('instance'));
    } finally {
      setTemplateEngine('default');
    }
  });
  QUnit.test('T886572', function(assert) {
    aspnet.setTemplateEngine();
    window.__createCheckBox = function(id) {
      DevExpress.aspnet.createComponent('dxCheckBox', {text: id}, id);
    };
    try {
      $('#qunit-fixture').html('<div id=toolbar1></div>' + '<script id=template1 type=text/html nonce="wIkO6u">' + '  <div id=checkBox1></div><% __createCheckBox("checkBox1") %>' + '</script>');
      $('#toolbar1').dxToolbar({items: [{
          widget: 'dxDropDownButton',
          options: {
            deferRendering: false,
            items: [{template: $('#template1')}]
          }
        }]});
      assert.ok($('#checkBox1').dxCheckBox('instance'));
    } finally {
      setTemplateEngine('default');
      delete window.__createCheckBox;
    }
  });
  QUnit.module('Remote validation', {
    beforeEach: function() {
      this.ajaxMock = ajaxMockAccessor();
    },
    afterEach: function() {
      this.ajaxMock.clear();
    }
  }, function() {
    QUnit.test('sendValidationRequest - ajax options', function(assert) {
      assert.expect(4);
      this.ajaxMock.setup({
        url: 'ctrl/action',
        callback: function(options) {
          assert.equal(options.url, 'ctrl/action');
          assert.deepEqual(options.data, {prop: 'val'});
          assert.equal(options.dataType, 'json');
          assert.equal(options.method, 'POST');
        }
      });
      aspnet.sendValidationRequest('prop', 'val', 'ctrl/action', 'POST');
    });
    [true, false].forEach(function(responseValue) {
      QUnit.test('sendValidationRequest - \'' + responseValue + '\' response', function(assert) {
        const done = assert.async();
        this.ajaxMock.setup({
          url: 'url',
          responseText: responseValue
        });
        aspnet.sendValidationRequest('prop', 'val', 'url').done(function(response) {
          assert.strictEqual(response, responseValue);
          done();
        });
      });
    });
    QUnit.test('sendValidationRequest - string response', function(assert) {
      const done = assert.async();
      this.ajaxMock.setup({
        url: 'url',
        responseText: 'custom error'
      });
      aspnet.sendValidationRequest('prop', 'val', 'url').done(function(response) {
        assert.deepEqual(response, {
          isValid: false,
          message: 'custom error'
        });
        done();
      });
    });
    QUnit.test('sendValidationRequest - server error response', function(assert) {
      const done = assert.async();
      this.ajaxMock.setup({
        url: 'url',
        status: 0,
        responseText: 'server error'
      });
      aspnet.sendValidationRequest('prop', 'val', 'url').fail(function(response) {
        assert.deepEqual(response, {
          isValid: false,
          message: 'server error'
        });
        done();
      });
    });
  });
}));

})();
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["integration/jquery","ui/button","ui/check_box","ui/drop_down_button","ui/form","ui/popup","ui/select_box","ui/text_box","ui/toolbar","ui/validator","ui/validation_summary","aspnet","jquery","core/templates/template_engine_registry","ui/widget/ui.errors","../../helpers/ajaxMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("integration/jquery"), require("ui/button"), require("ui/check_box"), require("ui/drop_down_button"), require("ui/form"), require("ui/popup"), require("ui/select_box"), require("ui/text_box"), require("ui/toolbar"), require("ui/validator"), require("ui/validation_summary"), require("aspnet"), require("jquery"), require("core/templates/template_engine_registry"), require("ui/widget/ui.errors"), require("../../helpers/ajaxMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=aspnet.tests.js.map