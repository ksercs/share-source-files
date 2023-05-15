!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/treeview.size.tests.js"], ["jquery","../../../helpers/scrollableTestsHelper.js","ui/tree_view","ui/box","ui/responsive_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/treeview.size.tests.js", ["jquery", "../../../helpers/scrollableTestsHelper.js", "ui/tree_view", "ui/box", "ui/responsive_box"], function($__export) {
  "use strict";
  var $,
      QUnitTestIfSupported,
      checkScrollableSizes,
      TREEVIEW_ID,
      PLACEMENT_STANDALONE,
      PLACEMENT_INSIDE_BOX,
      PLACEMENT_INSIDE_RESPONSIVE_BOX,
      fewItems,
      itemsOverflowX,
      itemsOverflowY,
      itemsOverflowXY;
  function appendTreeViewTo(appendToElement, id, items, width, height) {
    var $treeView = $(("<div id=\"" + id + "\" style=\"background-color: orange\"></div>"));
    $(appendToElement).append($treeView);
    var options = {items: items};
    if (width && height) {
      options.width = width;
      options.height = height;
    }
    $treeView.dxTreeView(options);
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      QUnitTestIfSupported = $__m.QUnitTestIfSupported;
      checkScrollableSizes = $__m.checkScrollableSizes;
    }, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      TREEVIEW_ID = 'treeView_id';
      PLACEMENT_STANDALONE = 'standalone';
      PLACEMENT_INSIDE_BOX = 'insideBox';
      PLACEMENT_INSIDE_RESPONSIVE_BOX = 'insideResponsiveBox';
      fewItems = [{text: 'item 1'}, {text: 'item 2'}];
      itemsOverflowX = [{
        text: '1111',
        expanded: true,
        items: [{text: '1111_1111'}]
      }];
      itemsOverflowY = [{
        text: 'a',
        expanded: true,
        items: [{
          text: 'b',
          expanded: true,
          items: [{
            text: 'c',
            expanded: true,
            items: [{text: 'd'}]
          }]
        }]
      }];
      itemsOverflowXY = [{
        text: '1111',
        expanded: true,
        items: [{
          text: '1111_1111',
          expanded: true,
          items: [{
            text: '1111_1111_1111',
            expanded: true,
            items: [{text: '1111_1111_1111_'}]
          }]
        }]
      }];
      QUnit.module('Size of one TreeView standalone/inside Box/inside ResponsiveBox', {
        beforeEach: function() {
          this.$container = $('<div style="background-color: blue"></div>');
          $('#qunit-fixture').append(this.$container);
        },
        afterEach: function() {
          this.$container.remove();
        }
      }, function() {
        [PLACEMENT_STANDALONE, PLACEMENT_INSIDE_RESPONSIVE_BOX, PLACEMENT_INSIDE_BOX].forEach(function(placement) {
          var testContext = ("placement: " + placement);
          function appendOneTreeViewTo($appendTo, $__5) {
            var $__6 = $__5,
                id = $__6.id,
                width = $__6.width,
                height = $__6.height,
                items = $__6.items;
            if (placement === PLACEMENT_INSIDE_RESPONSIVE_BOX) {
              $appendTo.dxResponsiveBox({
                width: width,
                height: height,
                dataSource: [{
                  location: {
                    row: 0,
                    col: 0
                  },
                  template: function(data, index, element) {
                    appendTreeViewTo(element, id, items);
                  }
                }]
              });
            } else if (placement === PLACEMENT_INSIDE_BOX) {
              $appendTo.dxBox({
                width: width,
                height: height,
                direction: 'row',
                items: [{
                  ratio: 1,
                  baseSize: 0
                }],
                itemTemplate: function(data, index, element) {
                  appendTreeViewTo(element, id, items);
                }
              });
            } else if (placement === PLACEMENT_STANDALONE) {
              appendTreeViewTo($appendTo, id, items, width, height);
            }
          }
          QUnit.test('no content overflow, ' + testContext, function(assert) {
            appendOneTreeViewTo(this.$container, {
              id: TREEVIEW_ID,
              width: 150,
              height: 100,
              items: [{text: 'item 1'}, {text: 'item 2'}]
            });
            checkScrollableSizes(assert, this.$container, {
              id: TREEVIEW_ID,
              width: 150,
              height: 100,
              containerWidth: 150,
              containerScrollWidth: 150,
              containerHeight: 100,
              containerScrollHeight: 100,
              nestedElementWidth: 150,
              nestedElementHeight: [50, 100],
              useNativeScrolling: true
            });
          });
          QUnit.test('content overflow_x, ' + testContext, function(assert) {
            appendOneTreeViewTo(this.$container, {
              id: TREEVIEW_ID,
              width: 75,
              height: 100,
              items: itemsOverflowX
            });
            checkScrollableSizes(assert, this.$container, {
              id: TREEVIEW_ID,
              width: 75,
              height: 100,
              containerWidth: 75,
              containerScrollWidth: 75,
              containerHeight: 100,
              containerScrollHeight: 100,
              nestedElementWidth: 75,
              nestedElementHeight: [50, 90],
              useNativeScrolling: true
            });
          });
          QUnit.test('content overflow_x_y, ' + testContext, function(assert) {
            appendOneTreeViewTo(this.$container, {
              id: TREEVIEW_ID,
              width: 75,
              height: 100,
              items: itemsOverflowXY
            });
            checkScrollableSizes(assert, this.$container, {
              id: TREEVIEW_ID,
              width: 75,
              height: 100,
              containerWidth: 75,
              containerScrollWidth: 75,
              containerHeight: 100,
              containerScrollHeight: [100, 150],
              nestedElementWidth: 75,
              nestedElementHeight: [100, 150]
            });
          });
          QUnit.test('content overflow_y, ' + testContext, function(assert) {
            appendOneTreeViewTo(this.$container, {
              id: TREEVIEW_ID,
              width: 200,
              height: 100,
              items: itemsOverflowY
            });
            checkScrollableSizes(assert, this.$container, {
              id: TREEVIEW_ID,
              width: 200,
              height: 100,
              containerWidth: 200,
              containerScrollWidth: 200,
              containerHeight: 100,
              containerScrollHeight: [100, 150],
              nestedElementWidth: 200,
              nestedElementHeight: [100, 150]
            });
          });
        });
      });
      QUnit.module('Size of two TreeViews inside Box/ResponsiveBox', {
        beforeEach: function() {
          this.$container = $('<div></div>');
          $('#qunit-fixture').append(this.$container);
        },
        afterEach: function() {
          this.$container.remove();
        }
      }, function() {
        [PLACEMENT_INSIDE_BOX, PLACEMENT_INSIDE_RESPONSIVE_BOX].forEach(function(placement) {
          var TODO_SKIP_BECAUSE_INCORRECT_SIZE = (placement === PLACEMENT_INSIDE_RESPONSIVE_BOX);
          var testContext = ("[placement: " + placement + "]");
          function appendTreeViewsToResponsiveBox($responsiveBox, treeViewItems, responsiveBoxConfig) {
            responsiveBoxConfig.itemTemplate = function(data, index, element) {
              appendTreeViewTo(element, TREEVIEW_ID + index, treeViewItems);
            };
            $responsiveBox.dxResponsiveBox(responsiveBoxConfig);
          }
          function appendTreeViewsToBox($box, treeViewItems, boxConfig) {
            boxConfig.items = [{ratio: 1}, {ratio: 1}];
            boxConfig.itemTemplate = function(data, index, element) {
              appendTreeViewTo(element, TREEVIEW_ID + index, treeViewItems);
            };
            $box.dxBox(boxConfig);
          }
          QUnit.test('no content overflow - 2 treeView in row, ' + testContext, function(assert) {
            var $__4 = this;
            if (placement === PLACEMENT_INSIDE_BOX) {
              appendTreeViewsToBox(this.$container, fewItems, {
                width: 300,
                height: 100,
                direction: 'row'
              });
            } else {
              appendTreeViewsToResponsiveBox(this.$container, fewItems, {
                width: 300,
                height: 100,
                rows: [{ratio: 1}],
                cols: [{ratio: 1}, {ratio: 1}],
                dataSource: [{location: {
                    row: 0,
                    col: 0
                  }}, {location: {
                    row: 0,
                    col: 1
                  }}]
              });
            }
            [0, 1].forEach(function(index) {
              return checkScrollableSizes(assert, $__4.$container, {
                id: TREEVIEW_ID + index,
                width: 150,
                height: 100,
                containerWidth: 150,
                containerScrollWidth: 150,
                containerHeight: 100,
                containerScrollHeight: 100,
                nestedElementWidth: 150,
                nestedElementHeight: [50, 100],
                useNativeScrolling: true
              });
            });
          });
          QUnit.test('no content overflow - 2 treeView in col, ' + testContext, function(assert) {
            var $__4 = this;
            if (placement === PLACEMENT_INSIDE_BOX) {
              appendTreeViewsToBox(this.$container, fewItems, {
                width: 75,
                height: 200,
                direction: 'col'
              });
            } else {
              appendTreeViewsToResponsiveBox(this.$container, fewItems, {
                width: 75,
                height: 200,
                rows: [{ratio: 1}, {ratio: 1}],
                cols: [{ratio: 1}],
                dataSource: [{location: {
                    row: 0,
                    col: 0
                  }}, {location: {
                    row: 1,
                    col: 0
                  }}]
              });
            }
            [0, 1].forEach(function(index) {
              return checkScrollableSizes(assert, $__4.$container, {
                id: TREEVIEW_ID + index,
                width: 75,
                height: 100,
                containerWidth: 75,
                containerScrollWidth: 75,
                containerHeight: 100,
                containerScrollHeight: 100,
                nestedElementWidth: 75,
                nestedElementHeight: [50, 100],
                useNativeScrolling: true
              });
            });
          });
          QUnitTestIfSupported('content overflow_x - 2 treeView in row, ' + testContext, !TODO_SKIP_BECAUSE_INCORRECT_SIZE, function(assert) {
            var $__4 = this;
            if (placement === PLACEMENT_INSIDE_BOX) {
              appendTreeViewsToBox(this.$container, itemsOverflowX, {
                width: 150,
                height: 100,
                direction: 'row'
              });
            } else {
              appendTreeViewsToResponsiveBox(this.$container, itemsOverflowX, {
                width: 150,
                height: 100,
                rows: [{ratio: 1}],
                cols: [{ratio: 1}, {ratio: 1}],
                dataSource: [{location: {
                    row: 0,
                    col: 0
                  }}, {location: {
                    row: 0,
                    col: 1
                  }}]
              });
            }
            [0, 1].forEach(function(index) {
              return checkScrollableSizes(assert, $__4.$container, {
                id: TREEVIEW_ID + index,
                width: 75,
                height: 100,
                containerWidth: 75,
                containerScrollWidth: 75,
                containerHeight: 100,
                containerScrollHeight: 100,
                nestedElementWidth: 75,
                nestedElementHeight: [50, 100],
                useNativeScrolling: true
              });
            });
          });
          QUnit.test('content overflow_x - 2 treeView in col, ' + testContext, function(assert) {
            var $__4 = this;
            if (placement === PLACEMENT_INSIDE_BOX) {
              appendTreeViewsToBox(this.$container, itemsOverflowX, {
                width: 75,
                height: 200,
                direction: 'col'
              });
            } else {
              appendTreeViewsToResponsiveBox(this.$container, itemsOverflowX, {
                width: 75,
                height: 200,
                rows: [{ratio: 1}, {ratio: 1}],
                cols: [{ratio: 1}],
                dataSource: [{location: {
                    row: 0,
                    col: 0
                  }}, {location: {
                    row: 1,
                    col: 0
                  }}]
              });
            }
            [0, 1].forEach(function(index) {
              return checkScrollableSizes(assert, $__4.$container, {
                id: TREEVIEW_ID + index,
                width: 75,
                height: 100,
                containerWidth: 75,
                containerScrollWidth: 75,
                containerHeight: 100,
                containerScrollHeight: 100,
                nestedElementWidth: 75,
                nestedElementHeight: [50, 100],
                useNativeScrolling: true
              });
            });
          });
          QUnitTestIfSupported('content overflow_y - 2 treeView in row, ' + testContext, !TODO_SKIP_BECAUSE_INCORRECT_SIZE, function(assert) {
            var $__4 = this;
            if (placement === PLACEMENT_INSIDE_BOX) {
              appendTreeViewsToBox(this.$container, itemsOverflowY, {
                width: 400,
                height: 75,
                direction: 'row'
              });
            } else {
              appendTreeViewsToResponsiveBox(this.$container, itemsOverflowY, {
                width: 400,
                height: 75,
                rows: [{ratio: 1}],
                cols: [{ratio: 1}, {ratio: 1}],
                dataSource: [{location: {
                    row: 0,
                    col: 0
                  }}, {location: {
                    row: 0,
                    col: 1
                  }}]
              });
            }
            [0, 1].forEach(function(index) {
              return checkScrollableSizes(assert, $__4.$container, {
                id: TREEVIEW_ID + index,
                width: 200,
                height: 75,
                containerWidth: 200,
                containerScrollWidth: 200,
                containerHeight: 75,
                containerScrollHeight: [100, 150],
                nestedElementWidth: 200,
                nestedElementHeight: [100, 150]
              });
            });
          });
          QUnitTestIfSupported('content overflow_y - 2 treeView in col, ' + testContext, !TODO_SKIP_BECAUSE_INCORRECT_SIZE, function(assert) {
            var $__4 = this;
            if (placement === PLACEMENT_INSIDE_BOX) {
              appendTreeViewsToBox(this.$container, itemsOverflowY, {
                width: 200,
                height: 150,
                direction: 'col'
              });
            } else {
              appendTreeViewsToResponsiveBox(this.$container, itemsOverflowY, {
                width: 200,
                height: 150,
                rows: [{ratio: 1}, {ratio: 1}],
                cols: [{ratio: 1}],
                dataSource: [{location: {
                    row: 0,
                    col: 0
                  }}, {location: {
                    row: 1,
                    col: 0
                  }}]
              });
            }
            [0, 1].forEach(function(index) {
              return checkScrollableSizes(assert, $__4.$container, {
                id: TREEVIEW_ID + index,
                width: 200,
                height: 75,
                containerWidth: 200,
                containerScrollWidth: 200,
                containerHeight: 75,
                containerScrollHeight: [100, 150],
                nestedElementWidth: 200,
                nestedElementHeight: [100, 150]
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
    define(["jquery","../../../helpers/scrollableTestsHelper.js","ui/tree_view","ui/box","ui/responsive_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../../helpers/scrollableTestsHelper.js"), require("ui/tree_view"), require("ui/box"), require("ui/responsive_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=treeview.size.tests.js.map