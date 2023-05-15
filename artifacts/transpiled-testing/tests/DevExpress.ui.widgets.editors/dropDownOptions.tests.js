!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/dropDownOptions.tests.js"], ["jquery","animation/fx","../../helpers/widgetsList.js","../../helpers/dropDownOptions.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/dropDownOptions.tests.js", ["jquery", "animation/fx", "../../helpers/widgetsList.js", "../../helpers/dropDownOptions.js", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      fx,
      dropDownEditorsList,
      defaultDropDownOptions,
      dropDownEditorsNames,
      dropDownOptionsKeys,
      optionTestValues,
      getPopupInstance,
      skipTesting,
      optionComparer;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      dropDownEditorsList = $__m.dropDownEditorsList;
    }, function($__m) {
      defaultDropDownOptions = $__m.defaultDropDownOptions;
    }, function($__m) {}],
    execute: function() {
      dropDownEditorsNames = Object.keys(dropDownEditorsList);
      dropDownOptionsKeys = Object.keys(defaultDropDownOptions);
      optionTestValues = {
        accessKey: 'custom-accesskey',
        animation: {
          hide: {
            duration: 200,
            from: 0.2,
            to: 0.8,
            type: 'fade'
          },
          show: {
            duration: 100,
            from: 0.2,
            to: 0.8,
            type: 'fade'
          }
        },
        hideOnOutsideClick: false,
        container: '#container',
        contentTemplate: 'content template',
        deferRendering: false,
        disabled: true,
        dragEnabled: true,
        elementAttr: {'custom-attr': 'value'},
        focusStateEnabled: true,
        fullScreen: true,
        height: 500,
        hint: 'hint',
        hoverStateEnabled: true,
        maxHeight: 600,
        maxWidth: 400,
        minHeight: 300,
        minWidth: 200,
        onContentReady: function() {
          return undefined;
        },
        onDisposing: function() {
          return undefined;
        },
        onHidden: function() {
          return undefined;
        },
        onHiding: function() {
          return undefined;
        },
        onInitialized: function() {
          return undefined;
        },
        onOptionChanged: function() {
          return undefined;
        },
        onResize: function() {
          return undefined;
        },
        onResizeEnd: function() {
          return undefined;
        },
        onResizeStart: function() {
          return undefined;
        },
        onShowing: function() {
          return undefined;
        },
        onShown: function() {
          return undefined;
        },
        onTitleRendered: function() {
          return undefined;
        },
        position: null,
        resizeEnabled: true,
        rtlEnabled: true,
        shading: true,
        shadingColor: 'rgb(0,0,0)',
        showCloseButton: true,
        showTitle: true,
        tabIndex: 150,
        title: 'custom title',
        titleTemplate: 'custom title',
        toolbarItems: [{widget: 'dxButton'}],
        visible: true,
        width: 500,
        wrapperAttr: {'custom-attr': 'value'},
        _wrapperClassExternal: 'dx-dropdowneditor-overlay'
      };
      getPopupInstance = function(editor) {
        return editor._popup;
      };
      skipTesting = function(assert) {
        assert.ok(true, 'tests for this option are implemented separately');
      };
      QUnit.testStart(function() {
        var markup = '<div id="editor"></div>\
    <div id="container"></div>';
        $('#qunit-fixture').html(markup);
      });
      optionComparer = {
        position: function(assert, editor) {
          var expectedPosition = {
            my: 'left top',
            at: 'left bottom',
            of: $('#editor')
          };
          ['my', 'at'].forEach(function(positionProp) {
            assert.strictEqual(editor.option('dropDownOptions.position')[positionProp], expectedPosition[positionProp], ("dropDownOptions.position." + positionProp + " is correct"));
            assert.strictEqual(getPopupInstance(editor).option('position')[positionProp], expectedPosition[positionProp], ("popup position." + positionProp + " is correct"));
          });
          assert.strictEqual(editor.option('dropDownOptions.position.of').get(0), expectedPosition.of.get(0), 'dropDownOptions.position.of is correct');
          assert.strictEqual(getPopupInstance(editor).option('position.of').get(0), expectedPosition.of.get(0), 'popup position.of is correct');
        },
        contentTemplate: function(assert, editor) {
          if (editor.NAME === 'dxDropDownBox' || editor.NAME === 'dxDropDownButton') {
            assert.strictEqual(editor.option('dropDownOptions.contentTemplate'), 'content', 'dropDownOptions.contentTemplate is correct');
            assert.strictEqual(getPopupInstance(editor).option('contentTemplate'), 'content', 'popup contentTemplate is correct');
            return;
          }
          assert.strictEqual(editor.option('dropDownOptions.contentTemplate'), null, 'dropDownOptions.contentTemplate is correct');
          assert.strictEqual(getPopupInstance(editor).option('contentTemplate'), null, 'popup contentTemplate is correct');
        },
        title: function(assert, editor) {
          if (editor.NAME === 'dxDateBox' || editor.NAME === 'dxDateRangeBox') {
            skipTesting(assert);
            return;
          }
          assert.strictEqual(editor.option('dropDownOptions.title'), '', 'dropDownOptions.title is correct');
          assert.strictEqual(getPopupInstance(editor).option('title'), '', 'popup title is correct');
        },
        showTitle: function(assert, editor) {
          if (editor.NAME === 'dxDateBox' || editor.NAME === 'dxDateRangeBox') {
            skipTesting(assert);
            return;
          }
          assert.strictEqual(editor.option('dropDownOptions.showTitle'), false, 'dropDownOptions.showTitle is correct');
          assert.strictEqual(getPopupInstance(editor).option('showTitle'), false, 'popup showTitle is correct');
        },
        hideOnOutsideClick: function(assert, editor) {
          assert.ok(editor.option('dropDownOptions.hideOnOutsideClick'), 'dropDownOptions.hideOnOutsideClick is correct');
          assert.ok(getPopupInstance(editor).option('hideOnOutsideClick'), 'popup hideOnOutsideClick is correct');
        },
        deferRendering: skipTesting,
        width: skipTesting,
        maxHeight: skipTesting,
        visible: skipTesting
      };
      dropDownEditorsNames.forEach(function(widgetName) {
        QUnit.module(widgetName, {
          beforeEach: function() {
            fx.off = true;
            this.clock = sinon.useFakeTimers();
          },
          afterEach: function() {
            fx.off = false;
            this.clock.restore();
          }
        }, function() {
          QUnit.module('dropDownOptions on pure init', function() {
            dropDownOptionsKeys.forEach(function(option) {
              if (widgetName === 'dxDropDownBox' && (option === 'focusStateEnabled' || option === 'tabIndex') || widgetName === 'dxDropDownButton' && option === 'showCloseButton') {
                return;
              }
              QUnit.test((option + " is correct"), function(assert) {
                var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                  deferRendering: false,
                  applyValueMode: 'instantly'
                });
                if (optionComparer[option]) {
                  optionComparer[option](assert, editor);
                  return;
                }
                assert.deepEqual(editor.option(("dropDownOptions." + option)), defaultDropDownOptions[option], ("dropDownOptions." + option + " is equal to " + defaultDropDownOptions[option]));
                assert.deepEqual(getPopupInstance(editor).option(option), defaultDropDownOptions[option], ("popup " + option + " is equal to " + defaultDropDownOptions[option]));
              });
            });
          });
          QUnit.module('dropDownOptions on init with custom value', function() {
            dropDownOptionsKeys.forEach(function(option) {
              QUnit.test((option + " is correct"), function(assert) {
                var $__4;
                if (option === 'visible') {
                  assert.ok('it is tested in separate module below or in widget specific test package');
                  return;
                }
                var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                  deferRendering: false,
                  applyValueMode: 'instantly',
                  dropDownOptions: ($__4 = {}, Object.defineProperty($__4, option, {
                    value: optionTestValues[option],
                    configurable: true,
                    enumerable: true,
                    writable: true
                  }), $__4)
                });
                assert.deepEqual(editor.option(("dropDownOptions." + option)), optionTestValues[option], ("dropDownOptions." + option + " is equal to " + optionTestValues[option]));
                assert.deepEqual(getPopupInstance(editor).option(option), optionTestValues[option], ("popup " + option + " is equal to " + optionTestValues[option]));
              });
            });
          });
          QUnit.module('dropDownOptions runtime change', function() {
            dropDownOptionsKeys.forEach(function(option) {
              if (widgetName === 'dxDropDownButton' && (option === 'visible' || option === 'position')) {
                return;
              }
              QUnit.test((option + " is correct"), function(assert) {
                var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                  deferRendering: false,
                  applyValueMode: 'instantly'
                });
                editor.option(("dropDownOptions." + option), optionTestValues[option]);
                assert.deepEqual(editor.option(("dropDownOptions." + option)), optionTestValues[option], ("dropDownOptions." + option + " is equal to " + optionTestValues[option]));
                assert.deepEqual(getPopupInstance(editor).option(option), optionTestValues[option], ("popup " + option + " is equal to " + optionTestValues[option]));
              });
            });
          });
          QUnit.module('dropDownOptions 2-way binding', function() {
            dropDownOptionsKeys.forEach(function(option) {
              QUnit.test(("dropDownOptions." + option + " was updated correctly"), function(assert) {
                var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                  deferRendering: false,
                  applyValueMode: 'instantly'
                });
                var popup = getPopupInstance(editor);
                popup.option(option, optionTestValues[option]);
                assert.deepEqual(editor.option(("dropDownOptions." + option)), optionTestValues[option]);
              });
            });
          });
          QUnit.module('deferRendering', function() {
            QUnit.skip('default dropDownOptions.deferRendering value is true', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'));
              assert.strictEqual(editor.option('dropDownOptions.deferRendering'), true);
            });
            QUnit.test('dropDownOptions.deferRendering=false should not override deferRendering', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                deferRendering: true,
                'dropDownOptions.deferRendering': false
              });
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup, undefined, 'popup was not rendered');
            });
            QUnit.test('dropDownOptions.deferRendering=true should not override deferRendering', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                deferRendering: false,
                'dropDownOptions.deferRendering': true
              });
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup.NAME, 'dxPopup', 'popup was rendered');
            });
            QUnit.test('popup is not rendered if deferRendering is true', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'));
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup, undefined, 'popup is not rendered');
            });
            QUnit.test('popup is rendered if deferRendering is false', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {deferRendering: false});
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup.NAME, 'dxPopup', 'popup is rendered');
            });
            QUnit.test('popup is rendered immediately when deferRendering is changed to false at runtime', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'));
              editor.option('deferRendering', false);
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup.NAME, 'dxPopup', 'popup is rendered');
            });
            QUnit.test('popup should not render when dropDownOptions.deferRendering is changed to false at runtime', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'));
              editor.option('dropDownOptions.deferRendering', false);
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup, undefined, 'popup is not rendered');
            });
            QUnit.test('popup should not render if dropDownOptions.deferRendering is false', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {'dropDownOptions.deferRendering': false});
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup, undefined, 'popup is not rendered');
            });
            QUnit.test('deferRendering should not do anything if popup has already been rendered', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {deferRendering: false});
              var popup = getPopupInstance(editor);
              editor.option('deferRendering', true);
              assert.strictEqual(getPopupInstance(editor), popup, 'popup does not render repeatedly');
              editor.option('deferRendering', false);
              assert.strictEqual(getPopupInstance(editor), popup, 'popup does not render repeatedly');
            });
          });
          QUnit.module('dropDownOptions.visible', function() {
            QUnit.test('popup should not render if dropDownOptions.visible=true and deferRendering=true', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {'dropDownOptions.visible': true});
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup, undefined, 'popup is not rendered');
            });
            QUnit.skip('popup should not open if dropDownOptions.visible=true and deferRendering=false', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                'dropDownOptions.visible': true,
                deferRendering: false
              });
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup.option('visible'), false, 'popup is closed');
            });
            QUnit.test('popup should not render after dropDownOptions.visible value changes to true if deferRendering=true', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'));
              editor.option('dropDownOptions.visible', true);
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup, undefined, 'popup is not rendered');
            });
            QUnit.test('popup should open after dropDownOptions.visible value changes to true if deferRendering=false', function(assert) {
              if (widgetName === 'dxDropDownButton') {
                assert.ok(true, 'TODO: fix this case');
                return;
              }
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {deferRendering: false});
              editor.option('dropDownOptions.visible', true);
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup.option('visible'), true, 'popup is opened');
            });
            QUnit.test('popup should close after dropDownOptions.visible value changes to false if deferRendering=false', function(assert) {
              if (widgetName === 'dxDropDownButton') {
                assert.ok(true, 'TODO: fix this case');
                return;
              }
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                deferRendering: false,
                opened: true
              });
              editor.option('dropDownOptions.visible', false);
              var popup = getPopupInstance(editor);
              assert.strictEqual(popup.option('visible'), false, 'popup is closed');
            });
          });
          QUnit.module('dropDownOptions using after repaint', function() {
            QUnit.skip('dropDownOptions should not be cleared', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                dropDownOptions: optionTestValues,
                deferRendering: false,
                pickerType: 'calendar'
              });
              editor.repaint();
              var popup = getPopupInstance(editor);
              dropDownOptionsKeys.forEach(function(option) {
                assert.deepEqual(editor.option(("dropDownOptions." + option)), optionTestValues[option], ("dropDownOptions." + option));
                assert.deepEqual(popup.option(option), optionTestValues[option], option);
              });
            });
            QUnit.test('dropDownOptions should not be cleared even if it was changed at runtime', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                deferRendering: false,
                pickerType: 'calendar'
              });
              editor.option('dropDownOptions', {customOption: 'custom value'});
              editor.repaint();
              var popup = getPopupInstance(editor);
              assert.deepEqual(editor.option('dropDownOptions.customOption'), 'custom value');
              assert.deepEqual(popup.option('customOption'), 'custom value');
            });
          });
          QUnit.module('dropDownOptions.hideOnOutsideClick', function() {
            QUnit.test('popup should be hidden after click outside', function(assert) {
              new dropDownEditorsList[widgetName]($('#editor'), {
                opened: true,
                pickerType: 'calendar'
              });
              var $overlay = $('.dx-overlay-content').eq(0);
              $(document).trigger('dxpointerdown');
              assert.notOk($overlay.is(':visible'), 'overlay is hidden');
            });
            QUnit.test('popup should not be hidden after click on overlay', function(assert) {
              new dropDownEditorsList[widgetName]($('#editor'), {
                opened: true,
                pickerType: 'calendar'
              });
              var $overlay = $('.dx-overlay-content').eq(0);
              $overlay.trigger('dxpointerdown');
              assert.ok($overlay.is(':visible'), 'overlay is not hidden');
            });
          });
          QUnit.module('specific tests', function() {
            QUnit.test('dropDownOptions should have dragEnabled=false after popup opened (T946143)', function(assert) {
              var editor = new dropDownEditorsList[widgetName]($('#editor'), {
                opened: true,
                pickerType: 'calendar'
              });
              assert.strictEqual(editor.option('dropDownOptions.dragEnabled'), false);
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
    define(["jquery","animation/fx","../../helpers/widgetsList.js","../../helpers/dropDownOptions.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("../../helpers/widgetsList.js"), require("../../helpers/dropDownOptions.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dropDownOptions.tests.js.map