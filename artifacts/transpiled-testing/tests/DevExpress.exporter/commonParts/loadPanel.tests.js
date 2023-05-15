!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/commonParts/loadPanel.tests.js"], ["core/utils/size","core/renderer","localization","localization/messages/ja.json!","localization/message","core/utils/window"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/commonParts/loadPanel.tests.js", ["core/utils/size", "core/renderer", "localization", "localization/messages/ja.json!", "localization/message", "core/utils/window"], function($__export) {
  "use strict";
  var setHeight,
      $,
      localization,
      ja,
      messageLocalization,
      getWindow,
      setWindow,
      LOAD_PANEL_CLASS,
      EXPORT_LOAD_PANEL_CLASS,
      LoadPanelTests;
  return {
    setters: [function($__m) {
      setHeight = $__m.setHeight;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      localization = $__m.default;
    }, function($__m) {
      ja = $__m.default;
    }, function($__m) {
      messageLocalization = $__m.default;
    }, function($__m) {
      getWindow = $__m.getWindow;
      setWindow = $__m.setWindow;
    }],
    execute: function() {
      LOAD_PANEL_CLASS = 'dx-loadpanel';
      EXPORT_LOAD_PANEL_CLASS = 'dx-export-loadpanel';
      LoadPanelTests = {runTests: function(moduleConfig, exportFunc, getComponent, componentOptions, documentPropertyName) {
          var hasBuildInLoadPanel = function(componentName) {
            if (componentName === 'dxDataGrid') {
              return componentOptions.loadPanel && componentOptions.loadPanel.enabled === true ? 1 : 0;
            }
            return (componentOptions.loadPanel === undefined && !('loadPanel' in componentOptions)) || (componentOptions.loadPanel && componentOptions.loadPanel.enabled !== false) && componentOptions.loadPanel !== true ? 1 : 0;
          };
          var componentLoadPanel = ("component.loadPanel: " + (('loadPanel' in componentOptions) ? JSON.stringify(componentOptions.loadPanel) : 'not declared'));
          QUnit.module(("LoadPanel: " + componentLoadPanel), moduleConfig, function() {
            [undefined, {enabled: true}, {
              enabled: true,
              text: 'Export to .Extention...'
            }, {
              animation: {
                easing: 'linear',
                duration: 500
              },
              height: 50,
              width: 100,
              showIndicator: false,
              showPane: false
            }].forEach(function(loadPanelOptions) {
              QUnit.test(("loadPanel: " + JSON.stringify(loadPanelOptions)), function(assert) {
                var $__7,
                    $__8,
                    $__9,
                    $__10,
                    $__11,
                    $__12,
                    $__13,
                    $__14;
                var $__4;
                assert.expect(14);
                var done = assert.async();
                var component = getComponent(componentOptions);
                var initialComponentLoadPanelValue = component.option('loadPanel');
                var initialOptions = loadPanelOptions;
                if (!initialOptions) {
                  initialOptions = {};
                }
                var $__6 = initialOptions,
                    animation = ($__7 = $__6.animation) === void 0 ? null : $__7,
                    enabled = ($__8 = $__6.enabled) === void 0 ? true : $__8,
                    height = ($__9 = $__6.height) === void 0 ? 90 : $__9,
                    indicatorSrc = ($__10 = $__6.indicatorSrc) === void 0 ? '' : $__10,
                    showIndicator = ($__11 = $__6.showIndicator) === void 0 ? true : $__11,
                    showPane = ($__12 = $__6.showPane) === void 0 ? true : $__12,
                    text = ($__13 = $__6.text) === void 0 ? 'Exporting...' : $__13,
                    width = ($__14 = $__6.width) === void 0 ? 200 : $__14;
                var expectedOptions = {
                  message: text,
                  animation: animation,
                  enabled: enabled,
                  height: height,
                  indicatorSrc: indicatorSrc,
                  showIndicator: showIndicator,
                  showPane: showPane,
                  width: width
                };
                var isFirstCall = true;
                var exportLoadPanel;
                exportFunc(($__4 = {}, Object.defineProperty($__4, "component", {
                  value: component,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__4, documentPropertyName, {
                  value: this[documentPropertyName],
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__4, "loadPanel", {
                  value: loadPanelOptions,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__4, "customizeCell", {
                  value: function() {
                    if (isFirstCall) {
                      var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS)).not(("." + EXPORT_LOAD_PANEL_CLASS));
                      assert.strictEqual($builtInLoadPanel.length, 0, 'builtin loadpanel is turn off');
                      var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                      assert.strictEqual($exportLoadPanel.length, 1, 'export loadpanel exist');
                      exportLoadPanel = $exportLoadPanel.dxLoadPanel('instance');
                      assert.strictEqual(exportLoadPanel.option('visible'), true, 'export loadpanel is visible');
                      for (var optionName in expectedOptions) {
                        assert.strictEqual(exportLoadPanel.option(optionName), expectedOptions[optionName], ("loadPanel." + optionName));
                      }
                      isFirstCall = false;
                    }
                  },
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), $__4)).then(function() {
                  var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                  assert.strictEqual($exportLoadPanel.length, 0, 'export loadpanel not exist');
                  var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS));
                  assert.strictEqual($builtInLoadPanel.length, hasBuildInLoadPanel(component.NAME) ? 1 : 0, 'builtin loadpanel exist');
                  assert.deepEqual(component.option('loadPanel'), initialComponentLoadPanelValue, 'component.loadPanel');
                  done();
                });
              });
            });
            QUnit.test('loadPanel: { enabled: true }, $targetElement.height() > $window.height()', function(assert) {
              var $__4;
              assert.expect(10);
              var done = assert.async();
              var component = getComponent(componentOptions);
              var initialComponentLoadPanelValue = component.option('loadPanel');
              var isFirstCall = true;
              var exportLoadPanel;
              var $targetElement;
              var $loadPanelContainer;
              if (component.NAME === 'dxDataGrid') {
                $targetElement = component.$element().find('.dx-datagrid-rowsview');
                $loadPanelContainer = component.$element().find('.dx-gridbase-container');
              } else {
                $targetElement = component.$element().find('.dx-pivotgrid-area-data');
                $loadPanelContainer = component.$element();
              }
              setHeight($targetElement, 5000);
              exportFunc(($__4 = {}, Object.defineProperty($__4, "component", {
                value: component,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, documentPropertyName, {
                value: this[documentPropertyName],
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "loadPanel", {
                value: {enabled: true},
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "customizeCell", {
                value: function() {
                  if (isFirstCall) {
                    var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS)).not(("." + EXPORT_LOAD_PANEL_CLASS));
                    assert.strictEqual($builtInLoadPanel.length, 0, 'builtin loadpanel is turn off');
                    var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                    assert.strictEqual($exportLoadPanel.length, 1, 'export loadpanel exist');
                    exportLoadPanel = $exportLoadPanel.dxLoadPanel('instance');
                    assert.strictEqual(exportLoadPanel.option('visible'), true, 'export loadpanel is visible');
                    var actualPosition = exportLoadPanel.option('position');
                    assert.deepEqual(actualPosition.of, $(getWindow()), 'loadPanel.position.of');
                    assert.strictEqual(actualPosition.collision, 'fit', 'loadPanel.position.collision');
                    assert.deepEqual(actualPosition.boundary.get(0), $targetElement.get(0), 'loadPanel.position.boundary');
                    assert.strictEqual(exportLoadPanel.option('container').get(0), $loadPanelContainer.get(0), 'loadPanel.container');
                    isFirstCall = false;
                  }
                },
                configurable: true,
                enumerable: true,
                writable: true
              }), $__4)).then(function() {
                var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                assert.strictEqual($exportLoadPanel.length, 0, 'export loadpanel not exist');
                var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS));
                assert.strictEqual($builtInLoadPanel.length, hasBuildInLoadPanel(component.NAME) ? 1 : 0, 'builtin loadpanel exist');
                assert.deepEqual(component.option('loadPanel'), initialComponentLoadPanelValue, 'component.loadPanel');
                done();
              });
            });
            QUnit.test('loadPanel: { enabled: true }, $targetElement.height() < $window.height()', function(assert) {
              var $__4;
              assert.expect(8);
              var done = assert.async();
              var component = getComponent(componentOptions);
              var initialComponentLoadPanelValue = component.option('loadPanel');
              var isFirstCall = true;
              var exportLoadPanel;
              var $loadPanelContainer;
              var $targetElement;
              if (component.NAME === 'dxDataGrid') {
                $targetElement = component.$element().find('.dx-datagrid-rowsview');
                $loadPanelContainer = component.$element().find('.dx-gridbase-container');
              } else {
                $targetElement = component.$element().find('.dx-pivotgrid-area-data');
                $loadPanelContainer = component.$element();
              }
              setHeight($targetElement, 100);
              exportFunc(($__4 = {}, Object.defineProperty($__4, "component", {
                value: component,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, documentPropertyName, {
                value: this[documentPropertyName],
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "loadPanel", {
                value: {enabled: true},
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "customizeCell", {
                value: function() {
                  if (isFirstCall) {
                    var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS)).not(("." + EXPORT_LOAD_PANEL_CLASS));
                    assert.strictEqual($builtInLoadPanel.length, 0, 'builtin loadpanel is turn off');
                    var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                    assert.strictEqual($exportLoadPanel.length, 1, 'export loadpanel exist');
                    exportLoadPanel = $exportLoadPanel.dxLoadPanel('instance');
                    assert.strictEqual(exportLoadPanel.option('visible'), true, 'export loadpanel is visible');
                    assert.deepEqual($(exportLoadPanel.option('position').of).get(0), $targetElement.get(0), 'loadPanel.position');
                    assert.deepEqual(exportLoadPanel.option('container').get(0), $loadPanelContainer.get(0), 'loadPanel.container');
                    isFirstCall = false;
                  }
                },
                configurable: true,
                enumerable: true,
                writable: true
              }), $__4)).then(function() {
                var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                assert.strictEqual($exportLoadPanel.length, 0, 'export loadpanel not exist');
                var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS));
                assert.strictEqual($builtInLoadPanel.length, hasBuildInLoadPanel(component.NAME) ? 1 : 0, 'builtin loadpanel exist');
                assert.deepEqual(component.option('loadPanel'), initialComponentLoadPanelValue, 'component.loadPanel');
                done();
              });
            });
            QUnit.test('loadPanel: { enabled: false }', function(assert) {
              var $__4;
              assert.expect(5);
              var done = assert.async();
              var component = getComponent(componentOptions);
              var initialComponentLoadPanelValue = component.option('loadPanel');
              var isFirstCall = true;
              exportFunc(($__4 = {}, Object.defineProperty($__4, "component", {
                value: component,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, documentPropertyName, {
                value: this[documentPropertyName],
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "loadPanel", {
                value: {enabled: false},
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "customizeCell", {
                value: function() {
                  if (isFirstCall) {
                    var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS)).not(("." + EXPORT_LOAD_PANEL_CLASS));
                    assert.strictEqual($builtInLoadPanel.length, 0, 'builtin loadpanel is turn off');
                    var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                    assert.strictEqual($exportLoadPanel.length, 0, 'export loadpanel not exist');
                    isFirstCall = false;
                  }
                },
                configurable: true,
                enumerable: true,
                writable: true
              }), $__4)).then(function() {
                var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                assert.strictEqual($exportLoadPanel.length, 0, 'export loadpanel not exist');
                var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS));
                assert.strictEqual($builtInLoadPanel.length, hasBuildInLoadPanel(component.NAME) ? 1 : 0, 'builtin loadpanel exist');
                assert.deepEqual(component.option('loadPanel'), initialComponentLoadPanelValue, 'component.loadPanel');
                done();
              });
            });
            QUnit.test('loadPanel: { enabled: true }, hasWindow(): false', function(assert) {
              var $__4;
              assert.expect(5);
              var done = assert.async();
              setWindow(undefined, false);
              var component = getComponent(componentOptions);
              var initialComponentLoadPanelValue = component.option('loadPanel');
              var isFirstCall = true;
              exportFunc(($__4 = {}, Object.defineProperty($__4, "component", {
                value: component,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, documentPropertyName, {
                value: this[documentPropertyName],
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "loadPanel", {
                value: {enabled: true},
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "customizeCell", {
                value: function() {
                  if (isFirstCall) {
                    var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS)).not(("." + EXPORT_LOAD_PANEL_CLASS));
                    assert.strictEqual($builtInLoadPanel.length, 0, 'builtin loadpanel is turn off');
                    var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                    assert.strictEqual($exportLoadPanel.length, 0, 'export loadpanel not exist');
                    isFirstCall = false;
                  }
                },
                configurable: true,
                enumerable: true,
                writable: true
              }), $__4)).then(function() {
                var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                assert.strictEqual($exportLoadPanel.length, 0, 'export loadpanel not exist');
                var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS));
                assert.strictEqual($builtInLoadPanel.length, 0, 'builtin loadpanel exist');
                assert.deepEqual(component.option('loadPanel'), initialComponentLoadPanelValue, 'component.loadPanel');
                setWindow(window);
                done();
              });
            });
            [{
              type: 'default',
              expected: 'エクスポート...'
            }, {
              type: 'custom',
              expected: '!CUSTOM TEXT!'
            }].forEach(function(localizationText) {
              QUnit.test((localizationText.type + " localization text, locale('ja')"), function(assert) {
                var $__4;
                assert.expect(7);
                var done = assert.async();
                var locale = localization.locale();
                try {
                  if (localizationText.type === 'default') {
                    localization.loadMessages(ja);
                  } else {
                    messageLocalization.load({'ja': {'dxDataGrid-exporting': '!CUSTOM TEXT!'}});
                  }
                  localization.locale('ja');
                  var component = getComponent(componentOptions);
                  var initialComponentLoadPanelValue = component.option('loadPanel');
                  var isFirstCall = true;
                  var exportLoadPanel;
                  exportFunc(($__4 = {}, Object.defineProperty($__4, "component", {
                    value: component,
                    configurable: true,
                    enumerable: true,
                    writable: true
                  }), Object.defineProperty($__4, documentPropertyName, {
                    value: this[documentPropertyName],
                    configurable: true,
                    enumerable: true,
                    writable: true
                  }), Object.defineProperty($__4, "customizeCell", {
                    value: function() {
                      if (isFirstCall) {
                        var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS)).not(("." + EXPORT_LOAD_PANEL_CLASS));
                        assert.strictEqual($builtInLoadPanel.length, 0, 'builtin loadpanel is turn off');
                        var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                        assert.strictEqual($exportLoadPanel.length, 1, 'export loadpanel exist');
                        exportLoadPanel = $exportLoadPanel.dxLoadPanel('instance');
                        assert.strictEqual(exportLoadPanel.option('visible'), true, 'export loadpanel is visible');
                        assert.strictEqual(exportLoadPanel.option('message'), localizationText.expected, 'loadPanel.text');
                        isFirstCall = false;
                      }
                    },
                    configurable: true,
                    enumerable: true,
                    writable: true
                  }), $__4)).then(function() {
                    var $exportLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS));
                    assert.strictEqual($exportLoadPanel.length, 0, 'export loadpanel not exist');
                    var $builtInLoadPanel = component.$element().find(("." + LOAD_PANEL_CLASS));
                    assert.strictEqual($builtInLoadPanel.length, hasBuildInLoadPanel(component.NAME) ? 1 : 0, 'builtin loadpanel exist');
                    assert.deepEqual(component.option('loadPanel'), initialComponentLoadPanelValue, 'component.loadPanel');
                    done();
                  });
                } finally {
                  localization.locale(locale);
                }
              });
            });
            QUnit.test('loadPanel: { enabled: true }, use unical instance of exportLoadPanel for each exportDataGrid\'s function call', function(assert) {
              var $__4,
                  $__5;
              var clock = sinon.useFakeTimers();
              var $secondGrid = $('<div>');
              $('#qunit-fixture').css({position: 'static'});
              $('#qunit-fixture').append($secondGrid);
              var loadingTimeout = 30;
              componentOptions.loadingTimeout = loadingTimeout;
              var component = getComponent(componentOptions);
              var secondComponent = $secondGrid[component.NAME](componentOptions)[component.NAME]('instance');
              var initialComponentLoadPanelValue = component.option('loadPanel');
              clock.tick(300);
              exportFunc(($__4 = {}, Object.defineProperty($__4, "component", {
                value: component,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, documentPropertyName, {
                value: this[documentPropertyName],
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "loadPanel", {
                value: {enabled: true},
                configurable: true,
                enumerable: true,
                writable: true
              }), $__4));
              exportFunc(($__5 = {}, Object.defineProperty($__5, "component", {
                value: secondComponent,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__5, documentPropertyName, {
                value: this[documentPropertyName],
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__5, "loadPanel", {
                value: {enabled: true},
                configurable: true,
                enumerable: true,
                writable: true
              }), $__5));
              assert.strictEqual($(("." + LOAD_PANEL_CLASS)).not(("." + EXPORT_LOAD_PANEL_CLASS)).length, 0, 'builtin loadpanel is turn off');
              assert.strictEqual($(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS)).length, 2, 'export loadpanel exist');
              clock.tick(300);
              assert.strictEqual($(("." + LOAD_PANEL_CLASS)).not(("." + EXPORT_LOAD_PANEL_CLASS)).length, hasBuildInLoadPanel(component.NAME) ? 2 : 0, 'builtin loadpanel is turn off');
              assert.deepEqual(component.option('loadPanel'), initialComponentLoadPanelValue, 'component.loadPanel');
              assert.deepEqual(secondComponent.option('loadPanel'), initialComponentLoadPanelValue, 'component.loadPanel');
              assert.strictEqual($(("." + LOAD_PANEL_CLASS + "." + EXPORT_LOAD_PANEL_CLASS)).length, 0, 'export loadpanel exist');
              $secondGrid.remove();
              clock.restore();
            });
          });
        }};
      $__export("LoadPanelTests", LoadPanelTests);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","core/renderer","localization","localization/messages/ja.json!","localization/message","core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("core/renderer"), require("localization"), require("localization/messages/ja.json!"), require("localization/message"), require("core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=loadPanel.tests.js.map