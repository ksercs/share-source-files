!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.form/form.scenarios.tests.js"], ["jquery","../../helpers/FormLayoutTestWrapper.js","core/utils/browser","ui/form/ui.form","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.form/form.scenarios.tests.js", ["jquery", "../../helpers/FormLayoutTestWrapper.js", "core/utils/browser", "ui/form/ui.form", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      FormLayoutTestWrapper,
      browser;
  function test_1Column_1Item__Item1(wrapper) {
    wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 0, 40, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 41, 958, 34);
  }
  function test_1Column_1Item(wrapper) {
    wrapper.checkFormSize(1000, 36);
    test_1Column_1Item__Item1(wrapper);
  }
  function test_1Column_2Items_AlignedLabels(wrapper) {
    wrapper.checkFormSize(1000, 82);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 0, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 75, 923, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 923, 34);
  }
  function test_1Column_2Items_NotAlignedLabels(wrapper) {
    wrapper.checkFormSize(1000, 82);
    test_1Column_1Item__Item1(wrapper);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 923, 34);
  }
  function test_1Column_2Items_NotAlignedLabels_LocationTop(wrapper) {
    wrapper.checkFormSize(1000, 101);
    test_1Column_1Item__Item1(wrapper);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 46, 0, 1000, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 66, 1, 998, 34);
  }
  function test_2Columns_2Items_AlignedLabels(wrapper) {
    wrapper.checkFormSize(1000, 36);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 0, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 75, 411, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 8, 515, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 1, 588, 411, 34);
  }
  function test_2Columns_2Items_NotAlignedLabels(wrapper) {
    wrapper.checkFormSize(1000, 36);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 0, 40, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 41, 444, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 8, 515, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 1, 588, 411, 34);
  }
  function test_2Columns_4Items_AlignedLabels(wrapper) {
    wrapper.checkFormSize(1000, 82);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 443, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 518, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 588, 409, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 443, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 518, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 588, 409, 34);
  }
  function test_2Columns_4Items_NotAlignedLabels(wrapper) {
    wrapper.checkFormSize(1000, 82);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 457, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 518, 40, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 554, 442, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 443, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 518, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 588, 409, 34);
  }
  function test_3Columns_4Items_AlignedLabels(wrapper) {
    wrapper.checkFormSize(1000, 82);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 229, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 755, 244, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
  }
  function test_3Columns_4Items_NotAlignedLabels(wrapper) {
    wrapper.checkFormSize(1000, 82);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 293, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
    wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
    wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      FormLayoutTestWrapper = $__m.default;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="form"></div>';
        $('#qunit-fixture').html(markup);
      });
      [true, false].forEach(function(alignItemLabels) {
        [true, false].forEach(function(alignItemLabelsInAllGroups) {
          QUnit.module(("Items layout and labels alignment. alignItemLabels: " + alignItemLabels + ", alignItemLabelsInAllGroups: " + alignItemLabelsInAllGroups), function() {
            if (!browser.chrome) {
              return;
            }
            QUnit.test('1 column-> [text]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, ['text']);
              test_1Column_1Item(wrapper);
            });
            QUnit.test('1 column-> [text.labelLocation: top]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'text',
                label: {location: 'top'}
              }]);
              wrapper.checkFormSize(1000, 55);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 0, 0, 1000, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 20, 1, 998, 34);
            });
            QUnit.test('1 column-> [text, longText]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, ['text', 'longText']);
              if (alignItemLabels) {
                test_1Column_2Items_AlignedLabels(wrapper);
              } else {
                test_1Column_2Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('1 column-> [text, longText.labelLocation:top]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, ['text', {
                dataField: 'longText',
                label: {location: 'top'}
              }]);
              test_1Column_2Items_NotAlignedLabels_LocationTop(wrapper);
            });
            QUnit.test('1 column-> [text, group[longText]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, ['text', {
                itemType: 'group',
                items: ['longText']
              }]);
              test_1Column_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('1 column-> [group[text], longText]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                items: ['text']
              }, 'longText']);
              test_1Column_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('1 column-> [group[text], group[longText]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                items: ['text']
              }, {
                itemType: 'group',
                items: ['longText']
              }]);
              if (alignItemLabelsInAllGroups) {
                test_1Column_2Items_AlignedLabels(wrapper);
              } else {
                test_1Column_2Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('1 column-> [group[text], group[longText.labelLocation:top]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                items: ['text']
              }, {
                itemType: 'group',
                items: [{
                  dataField: 'longText',
                  label: {location: 'top'}
                }]
              }]);
              test_1Column_2Items_NotAlignedLabels_LocationTop(wrapper);
            });
            QUnit.test('1 column-> [group[text], group[longText.label.visible: false]]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                items: ['text']
              }, {
                itemType: 'group',
                items: [{
                  dataField: 'longText',
                  label: {visible: false}
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 41, 958, 34);
              assert.strictEqual(wrapper.$form.find('[for$="longText"]').length, 0, 'find([for$="longText"]).length');
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 1, 998, 34);
            });
            QUnit.test('1 column-> [group.alignItemLabels: false [text, longText]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                alignItemLabels: false,
                items: ['text', 'longText']
              }]);
              test_1Column_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('1 column-> [group.alignItemLabels: true [text, longText]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                alignItemLabels: true,
                items: ['text', 'longText']
              }]);
              test_1Column_2Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [text.colSpan: 1, longText.colSpan: 1]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [text.colSpan: 1, longText.colSpan: 2]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [text.colSpan: 1, group.colSpan: 2[longText]]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'text',
                colSpan: 1
              }, {
                itemType: 'group',
                colSpan: 1,
                items: ['longText']
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [text, group.colSpan:1 [longText]]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'text',
                colSpan: 1
              }, {
                itemType: 'group',
                colSpan: 1,
                items: ['longText']
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [text.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'text',
                colSpan: 2
              }]);
              test_1Column_1Item(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [text.colSpan: 2, longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              test_1Column_2Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 2.colCount: 1 [text.colSpan: 1]]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 2,
                colCount: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }]
              }]);
              test_1Column_1Item(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 2.colCount: 1 [text.colSpan: 2]]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 2,
                colCount: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 2
                }]
              }]);
              test_1Column_1Item(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 2.colCount: 2 [text.colSpan: 2]]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 2,
                colCount: 2,
                items: [{
                  dataField: 'text',
                  colSpan: 2
                }]
              }]);
              test_1Column_1Item(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 1 [text.colSpan: 1], longText.colSpan: 1]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }]
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 1 [text.colSpan: 1], group.colSpan: 1 [longText.colSpan: 1]]]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }]
              }, {
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 1 [text.colSpan: 1], longText.colSpan: 1]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }]
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 1 [text.colSpan: 2], longText.colSpan: 1]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 2
                }]
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 1 [text.colSpan: 1], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }]
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 1 [text.colSpan: 1], group.colSpan: 1 [longText.colSpan: 1]]]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }]
              }, {
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 1 [text.colSpan: 1], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }]
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 1 [text.colSpan: 2], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 2
                }]
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 2.colCount: 1 [text.colSpan: 1], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 2,
                colCount: 1,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }]
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              test_1Column_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [group.colSpan: 2.colCount: 2 [text.colSpan: 2], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colSpan: 2,
                colCount: 2,
                items: [{
                  dataField: 'text',
                  colSpan: 2
                }]
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              test_1Column_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [text.colSpan: 1, longText.colSpan: 1]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [text.colSpan: 1, longText.colSpan: 2]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [text.colSpan: 1, group.colSpan: 2[longText]]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'text',
                  colSpan: 1
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: ['longText']
                }]
              }]);
              test_2Columns_2Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [text.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'text',
                  colSpan: 2
                }]
              }]);
              test_1Column_1Item(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [text.colSpan: 2, longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              test_1Column_2Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 2.colCount: 1 [text.colSpan: 1]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 2,
                  colCount: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 1
                  }]
                }]
              }]);
              test_1Column_1Item(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 2.colCount: 1 [text.colSpan: 2]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 2,
                  colCount: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 2
                  }]
                }]
              }]);
              test_1Column_1Item(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 2.colCount: 2 [text.colSpan: 2]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 2,
                  colCount: 2,
                  items: [{
                    dataField: 'text',
                    colSpan: 2
                  }]
                }]
              }]);
              test_1Column_1Item(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 1 [text.colSpan: 1], longText.colSpan: 1]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 1
                  }]
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 1 [text.colSpan: 1], group.colSpan: 1 [longText.colSpan: 1]]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 1
                  }]
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'longText',
                    colSpan: 1
                  }]
                }]
              }]);
              if (alignItemLabelsInAllGroups) {
                test_2Columns_2Items_AlignedLabels(wrapper);
              } else {
                test_2Columns_2Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 1 [text.colSpan: 1], longText.colSpan: 1]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 1
                  }]
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 1 [text.colSpan: 2], longText.colSpan: 1]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 2
                  }]
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 1 [text.colSpan: 1], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 1
                  }]
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 1 [text.colSpan: 1], group.colSpan: 1 [longText.colSpan: 2]]]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 1
                  }]
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'longText',
                    colSpan: 2
                  }]
                }]
              }]);
              if (alignItemLabelsInAllGroups) {
                test_2Columns_2Items_AlignedLabels(wrapper);
              } else {
                test_2Columns_2Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 1 [text.colSpan: 1], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 1
                  }]
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 1 [text.colSpan: 2], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 2
                  }]
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              test_2Columns_2Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 2.colCount: 1 [text.colSpan: 1], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 2,
                  colCount: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 1
                  }]
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              if (alignItemLabelsInAllGroups) {
                test_1Column_2Items_AlignedLabels(wrapper);
              } else {
                test_1Column_2Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 2.colCount: 1 [text.colSpan: 2], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 2,
                  colCount: 1,
                  items: [{
                    dataField: 'text',
                    colSpan: 2
                  }]
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              if (alignItemLabelsInAllGroups) {
                test_1Column_2Items_AlignedLabels(wrapper);
              } else {
                test_1Column_2Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 2.colCount: 2 [text.colSpan: 2], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 2,
                  colCount: 2,
                  items: [{
                    dataField: 'text',
                    colSpan: 2
                  }]
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              if (alignItemLabelsInAllGroups) {
                test_1Column_2Items_AlignedLabels(wrapper);
              } else {
                test_1Column_2Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('2 column-> group.colCount:2 [group.colSpan: 2.colCount: 2 [group.text], longText.colSpan: 2]', function() {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  itemType: 'group',
                  colSpan: 2,
                  colCount: 2,
                  items: [{
                    itemType: 'group',
                    colSpan: 2,
                    colCount: 2,
                    items: [{
                      dataField: 'text',
                      colSpan: 2
                    }]
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    colCount: 2,
                    items: [{
                      dataField: 'longText',
                      colSpan: 2
                    }]
                  }]
                }]
              }]);
              if (alignItemLabelsInAllGroups) {
                test_1Column_2Items_AlignedLabels(wrapper);
              } else {
                test_1Column_2Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('2 column-> form.colCount:2 [a, abc, text, longText ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{dataField: 'a'}, {dataField: 'abc'}, {dataField: 'text'}, {dataField: 'longText'}]);
              if (alignItemLabels) {
                test_2Columns_4Items_AlignedLabels(wrapper);
              } else {
                test_2Columns_4Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:1, abc.colSpan:1, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              test_2Columns_4Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:1, abc.colSpan:1, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              test_2Columns_4Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:1, abc.colSpan:1, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 555, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 923, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 409, 34);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:1, abc.colSpan:2, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              test_2Columns_4Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:1, abc.colSpan:2, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              test_2Columns_4Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:1, abc.colSpan:2, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 75, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 409, 34);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:1, abc.colSpan:2, text,colSpan:2, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 75, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 924, 34);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:2, abc.colSpan:1, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 923, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 409, 34);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:2, abc.colSpan:1, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 923, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 924, 34);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:2, abc.colSpan:1, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 923, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 409, 34);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:2, abc.colSpan:2, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 958, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 41, 958, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 100, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 93, 41, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 515, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 588, 409, 34);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:2, abc.colSpan:2, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 958, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 41, 958, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 100, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 93, 41, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 515, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 588, 409, 34);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:2, abc.colSpan:2, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 174);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 93, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 146, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 139, 75, 409, 34);
            });
            QUnit.test('2 column-> form.colCount:2 [a.colSpan:2, abc.colSpan:2, text,colSpan:2, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(2, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              wrapper.checkFormSize(1000, 174);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 93, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 146, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 139, 75, 924, 34);
            });
            QUnit.test('2 column-> group.colCount:2.alignItemLabels:false  [a, abc, text, longText ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                alignItemLabels: false,
                items: [{dataField: 'a'}, {dataField: 'abc'}, {dataField: 'text'}, {dataField: 'longText'}]
              }]);
              test_2Columns_4Items_NotAlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2.alignItemLabels:true  [a, abc, text, longText ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                alignItemLabels: true,
                items: [{dataField: 'a'}, {dataField: 'abc'}, {dataField: 'text'}, {dataField: 'longText'}]
              }]);
              test_2Columns_4Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:1, abc.colSpan:1, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              test_2Columns_4Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:1, abc.colSpan:1, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              test_2Columns_4Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:1, abc.colSpan:1, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 555, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 923, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 409, 34);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:1, abc.colSpan:2, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              test_2Columns_4Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:1, abc.colSpan:2, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              test_2Columns_4Items_AlignedLabels(wrapper);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:1, abc.colSpan:2, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 75, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 409, 34);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:1, abc.colSpan:2, text,colSpan:2, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 75, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 924, 34);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:2, abc.colSpan:1, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 923, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 409, 34);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:2, abc.colSpan:1, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 923, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 924, 34);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:2, abc.colSpan:1, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 923, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 409, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 518, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 554, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 75, 409, 34);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:2, abc.colSpan:2, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 958, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 41, 958, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 100, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 93, 41, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 515, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 588, 409, 34);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:2, abc.colSpan:2, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              wrapper.checkFormSize(1000, 128);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 958, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 41, 958, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 100, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 93, 41, 443, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 100, 515, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 93, 588, 409, 34);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:2, abc.colSpan:2, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 174);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 93, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 146, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 139, 75, 409, 34);
            });
            QUnit.test('2 column-> group.colCount:2  [a.colSpan:2, abc.colSpan:2, text,colSpan:2, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 2,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              wrapper.checkFormSize(1000, 174);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 47, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 100, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 93, 75, 924, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 146, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 139, 75, 924, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a, abc, text, longText ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{dataField: 'a'}, {dataField: 'abc'}, {dataField: 'text'}, {dataField: 'longText'}]);
              if (alignItemLabels) {
                wrapper.checkFormSize(1000, 82);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
              } else {
                wrapper.checkFormSize(1000, 82);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 293, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
              }
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:1, abc.colSpan:1, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:1, abc.colSpan:1, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 577, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:1, abc.colSpan:1, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:1, abc.colSpan:2, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 72, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 577, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:1, abc.colSpan:2, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 72, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 577, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 577, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:1, abc.colSpan:2, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 612, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:1, abc.colSpan:2, text,colSpan:2, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 1
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 612, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:2, abc.colSpan:1, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:2, abc.colSpan:1, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 577, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:2, abc.colSpan:1, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:2, abc.colSpan:2, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 1
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:2, abc.colSpan:2, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 1
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:2, abc.colSpan:2, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 1
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> form.colCount:3 [a.colSpan:2, abc.colSpan:2, text,colSpan:2, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(3, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                dataField: 'a',
                colSpan: 2
              }, {
                dataField: 'abc',
                colSpan: 2
              }, {
                dataField: 'text',
                colSpan: 2
              }, {
                dataField: 'longText',
                colSpan: 2
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3.alignItemLabels:false [a, abc, text, longText ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                alignItemLabels: false,
                items: [{dataField: 'a'}, {dataField: 'abc'}, {dataField: 'text'}, {dataField: 'longText'}]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 293, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3.alignItemLabels:true [a, abc, text, longText ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                alignItemLabels: true,
                items: [{dataField: 'a'}, {dataField: 'abc'}, {dataField: 'text'}, {dataField: 'longText'}]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:1, abc.colSpan:1, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:1, abc.colSpan:1, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 577, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:1, abc.colSpan:1, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:1, abc.colSpan:2, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 72, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 577, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:1, abc.colSpan:2, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 72, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 577, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 577, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:1, abc.colSpan:2, text,colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 612, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:1, abc.colSpan:2, text,colSpan:2, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 1
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 278, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 612, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:2, abc.colSpan:1, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:2, abc.colSpan:1, text.colSpan:1, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 577, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:2, abc.colSpan:1, text.colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 1
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:2, abc.colSpan:2, text.colSpan:1, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 1
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 279, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:2, abc.colSpan:2, text.colSpan:2, longText.colSpan:1 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 1
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [a.colSpan:2, abc.colSpan:2, text,colSpan:2, longText.colSpan:2 ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  dataField: 'a',
                  colSpan: 2
                }, {
                  dataField: 'abc',
                  colSpan: 2
                }, {
                  dataField: 'text',
                  colSpan: 2
                }, {
                  dataField: 'longText',
                  colSpan: 2
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 244, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
              wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
              wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
            });
            QUnit.test('3 column-> group.colCount:3 [group[a], group[abc], group[text], group[longText] ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  itemType: 'group',
                  items: ['a']
                }, {
                  itemType: 'group',
                  items: ['abc']
                }, {
                  itemType: 'group',
                  items: ['text']
                }, {
                  itemType: 'group',
                  items: ['longText']
                }]
              }]);
              if (alignItemLabelsInAllGroups) {
                test_3Columns_4Items_AlignedLabels(wrapper);
              } else {
                test_3Columns_4Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('3 column-> group.colCount:3 [group.colSpan:1[a], group.colSpan:1[abc], group.colSpan:1[text], group.colSpan:1[longText] ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: ['a']
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: ['abc']
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: ['text']
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: ['longText']
                }]
              }]);
              if (alignItemLabelsInAllGroups) {
                test_3Columns_4Items_AlignedLabels(wrapper);
              } else {
                test_3Columns_4Items_NotAlignedLabels(wrapper);
              }
            });
            QUnit.test('3 column-> group.colCount:3 [group.colSpan:1[a], group.colSpan:1[abc], group.colSpan:1[text], group.colSpan:2[longText] ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: ['a']
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: ['abc']
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: ['text']
                }, {
                  itemType: 'group',
                  colSpan: 2,
                  items: ['longText']
                }]
              }]);
              wrapper.checkFormSize(1000, 82);
              if (alignItemLabelsInAllGroups) {
                wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 74, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 229, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 74, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 755, 244, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 577, 34);
              } else {
                wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 293, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 577, 34);
              }
            });
            QUnit.test('3 column-> group.colCount:3 [group.colSpan[a.colSpan:1, group.colSpan:1[abc], group.colSpan:2[text], group.colSpan:1[longText] ]', function(assert) {
              var wrapper = new FormLayoutTestWrapper(1, {
                alignItemLabels: alignItemLabels,
                alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
              }, [{
                itemType: 'group',
                colCount: 3,
                items: [{
                  itemType: 'group',
                  colSpan: 1,
                  items: ['a']
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: ['abc']
                }, {
                  itemType: 'group',
                  colSpan: 2,
                  items: ['text']
                }, {
                  itemType: 'group',
                  colSpan: 1,
                  items: ['longText']
                }]
              }]);
              if (alignItemLabelsInAllGroups) {
                test_3Columns_4Items_AlignedLabels(wrapper);
              } else {
                wrapper.checkFormSize(1000, 82);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 293, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 262, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 8, 681, 40, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 1, 720, 278, 34);
                wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 0, 74, 19);
                wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 75, 244, 34);
              }
              QUnit.test('3 column-> group.colCount:3 [group.colSpan:1[a], group.colSpan:2[abc], group.colSpan:1[text], group.colSpan:1[longText] ]', function(assert) {
                var wrapper = new FormLayoutTestWrapper(1, {
                  alignItemLabels: alignItemLabels,
                  alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
                }, [{
                  itemType: 'group',
                  colCount: 3,
                  items: [{
                    itemType: 'group',
                    colSpan: 1,
                    items: ['a']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['abc']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['text']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['longText']
                  }]
                }]);
                wrapper.checkFormSize(1000, 82);
                if (alignItemLabelsInAllGroups) {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 244, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
                } else {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 293, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 612, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 278, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
                }
              });
              QUnit.test('3 column-> group.colCount:3 [group.colSpan:1[a], group.colSpan:2[abc], group.colSpan:1[text], group.colSpan:2[longText] ]', function(assert) {
                var wrapper = new FormLayoutTestWrapper(1, {
                  alignItemLabels: alignItemLabels,
                  alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
                }, [{
                  itemType: 'group',
                  colCount: 3,
                  items: [{
                    itemType: 'group',
                    colSpan: 1,
                    items: ['a']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['abc']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['text']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['longText']
                  }]
                }]);
                wrapper.checkFormSize(1000, 82);
                if (alignItemLabelsInAllGroups) {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 244, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 577, 34);
                } else {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 293, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 612, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 278, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 577, 34);
                }
              });
              QUnit.test('3 column-> group.colCount:3 [group.colSpan:1[a], group.colSpan:2[abc], group.colSpan:2[text], group.colSpan:1[longText] ]', function(assert) {
                var wrapper = new FormLayoutTestWrapper(1, {
                  alignItemLabels: alignItemLabels,
                  alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
                }, [{
                  itemType: 'group',
                  colCount: 3,
                  items: [{
                    itemType: 'group',
                    colSpan: 1,
                    items: ['a']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['abc']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['text']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['longText']
                  }]
                }]);
                wrapper.checkFormSize(1000, 82);
                if (alignItemLabelsInAllGroups) {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
                } else {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 293, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 612, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
                }
              });
              QUnit.test('3 column-> group.colCount:3 [group.colSpan:1[a], group.colSpan:2[abc], group.colSpan:2[text], group.colSpan:2[longText] ]', function(assert) {
                var wrapper = new FormLayoutTestWrapper(1, {
                  alignItemLabels: alignItemLabels,
                  alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
                }, [{
                  itemType: 'group',
                  colCount: 3,
                  items: [{
                    itemType: 'group',
                    colSpan: 1,
                    items: ['a']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['abc']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['text']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['longText']
                  }]
                }]);
                wrapper.checkFormSize(1000, 82);
                if (alignItemLabelsInAllGroups) {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 244, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 421, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
                } else {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 293, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 348, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 386, 612, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 611, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 244, 34);
                }
              });
              QUnit.test('3 column-> group.colCount:3 [group.colSpan:2[a], group.colSpan:1[abc], group.colSpan:1[text], group.colSpan:1[longText] ]', function(assert) {
                var wrapper = new FormLayoutTestWrapper(1, {
                  alignItemLabels: alignItemLabels,
                  alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
                }, [{
                  itemType: 'group',
                  colCount: 3,
                  items: [{
                    itemType: 'group',
                    colSpan: 2,
                    items: ['a']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['abc']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['text']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['longText']
                  }]
                }]);
                wrapper.checkFormSize(1000, 82);
                if (alignItemLabelsInAllGroups) {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 242, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 242, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
                } else {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 627, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 279, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 229, 34);
                }
              });
              QUnit.test('3 column-> group.colCount:3 [group.colSpan:2[a], group.colSpan:1[abc], group.colSpan:1[text], group.colSpan:2[longText] ]', function(assert) {
                var wrapper = new FormLayoutTestWrapper(1, {
                  alignItemLabels: alignItemLabels,
                  alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
                }, [{
                  itemType: 'group',
                  colCount: 3,
                  items: [{
                    itemType: 'group',
                    colSpan: 2,
                    items: ['a']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['abc']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['text']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['longText']
                  }]
                }]);
                wrapper.checkFormSize(1000, 82);
                if (alignItemLabelsInAllGroups) {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 242, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 242, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 577, 34);
                } else {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 627, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 279, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 348, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 421, 577, 34);
                }
              });
              QUnit.test('3 column-> group.colCount:3 [group.colSpan:2[a], group.colSpan:1[abc], group.colSpan:2[text], group.colSpan:1[longText] ]', function(assert) {
                var wrapper = new FormLayoutTestWrapper(1, {
                  alignItemLabels: alignItemLabels,
                  alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
                }, [{
                  itemType: 'group',
                  colCount: 3,
                  items: [{
                    itemType: 'group',
                    colSpan: 2,
                    items: ['a']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['abc']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['text']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['longText']
                  }]
                }]);
                wrapper.checkFormSize(1000, 82);
                if (alignItemLabelsInAllGroups) {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 242, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 242, 34);
                } else {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 627, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 610, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 242, 34);
                }
              });
              QUnit.test('3 column-> group.colCount:3 [group.colSpan:2[a], group.colSpan:1[abc], group.colSpan:2[text], group.colSpan:2[longText] ]', function(assert) {
                var wrapper = new FormLayoutTestWrapper(1, {
                  alignItemLabels: alignItemLabels,
                  alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
                }, [{
                  itemType: 'group',
                  colCount: 3,
                  items: [{
                    itemType: 'group',
                    colSpan: 2,
                    items: ['a']
                  }, {
                    itemType: 'group',
                    colSpan: 1,
                    items: ['abc']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['text']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['longText']
                  }]
                }]);
                wrapper.checkFormSize(1000, 82);
                if (alignItemLabelsInAllGroups) {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 242, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 242, 34);
                } else {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 627, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 610, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 242, 34);
                }
              });
              QUnit.test('3 column-> group.colCount:3 [group.colSpan:2[a], group.colSpan:2[abc], group.colSpan:2[text], group.colSpan:2[longText] ]', function(assert) {
                var wrapper = new FormLayoutTestWrapper(1, {
                  alignItemLabels: alignItemLabels,
                  alignItemLabelsInAllGroups: alignItemLabelsInAllGroups
                }, [{
                  itemType: 'group',
                  colCount: 3,
                  items: [{
                    itemType: 'group',
                    colSpan: 2,
                    items: ['a']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['abc']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['text']
                  }, {
                    itemType: 'group',
                    colSpan: 2,
                    items: ['longText']
                  }]
                }]);
                wrapper.checkFormSize(1000, 82);
                if (alignItemLabelsInAllGroups) {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 755, 242, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 75, 577, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 242, 34);
                } else {
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="a"]'), 8, 0, 25, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="a"]'), 1, 26, 627, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="abc"]'), 8, 681, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="abc"]'), 1, 720, 279, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="text"]'), 54, 0, 40, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="text"]'), 47, 41, 610, 34);
                  wrapper.checkElementPosition(wrapper.$form.find('[for$="longText"]'), 54, 681, 74, 19);
                  wrapper.checkElementPosition(wrapper.$form.find('[id$="longText"]'), 47, 755, 242, 34);
                }
              });
            });
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/FormLayoutTestWrapper.js","core/utils/browser","ui/form/ui.form","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/FormLayoutTestWrapper.js"), require("core/utils/browser"), require("ui/form/ui.form"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=form.scenarios.tests.js.map