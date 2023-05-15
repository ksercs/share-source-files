!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeView.tests.js"], ["jquery","data/custom_store","data/array_store","ui/tree_view","generic_light.css!","./treeViewParts/accessibility.js","./treeViewParts/animation.js","./treeViewParts/checkboxes.js","./treeViewParts/events.js","./treeViewParts/expresions.js","./treeViewParts/expandedItems.js","./treeViewParts/focusing.js","./treeViewParts/initialization.js","./treeViewParts/keyboardNavigation.js","./treeViewParts/lazyRendering.js","./treeViewParts/optionChanged.js","./treeViewParts/regression.js","./treeViewParts/rendering.js","./treeViewParts/scrolling.tests.js","./treeViewParts/selection.js","./treeViewParts/searching.js","./treeViewParts/selectAllMode.js","./treeViewParts/selectAllWithSelectNodesRecursiveFalse.js","./treeViewParts/selectNodesRecursiveTrue.js","./treeViewParts/treeview.size.tests.js","./treeViewParts/usageWithoutKeys.js","./treeViewParts/virtualMode.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeView.tests.js", ["jquery", "data/custom_store", "data/array_store", "ui/tree_view", "generic_light.css!", "./treeViewParts/accessibility.js", "./treeViewParts/animation.js", "./treeViewParts/checkboxes.js", "./treeViewParts/events.js", "./treeViewParts/expresions.js", "./treeViewParts/expandedItems.js", "./treeViewParts/focusing.js", "./treeViewParts/initialization.js", "./treeViewParts/keyboardNavigation.js", "./treeViewParts/lazyRendering.js", "./treeViewParts/optionChanged.js", "./treeViewParts/regression.js", "./treeViewParts/rendering.js", "./treeViewParts/scrolling.tests.js", "./treeViewParts/selection.js", "./treeViewParts/searching.js", "./treeViewParts/selectAllMode.js", "./treeViewParts/selectAllWithSelectNodesRecursiveFalse.js", "./treeViewParts/selectNodesRecursiveTrue.js", "./treeViewParts/treeview.size.tests.js", "./treeViewParts/usageWithoutKeys.js", "./treeViewParts/virtualMode.js"], function($__export) {
  "use strict";
  var $,
      CustomStore,
      ArrayStore,
      testStart;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__4;
      (($__4 = QUnit, testStart = $__4.testStart, $__4));
      testStart(function() {
        var markup = '<div id="treeView"></div>';
        $('#qunit-fixture').html(markup);
      });
      window.internals = {
        NODE_CONTAINER_CLASS: 'dx-treeview-node-container',
        OPENED_NODE_CONTAINER_CLASS: 'dx-treeview-node-container-opened',
        NODE_CLASS: 'dx-treeview-node',
        ITEM_CLASS: 'dx-treeview-item',
        ITEM_WITH_CHECKBOX_CLASS: 'dx-treeview-item-with-checkbox',
        IS_LEAF: 'dx-treeview-node-is-leaf',
        TOGGLE_ITEM_VISIBILITY_CLASS: 'dx-treeview-toggle-item-visibility',
        TOGGLE_ITEM_VISIBILITY_OPENED_CLASS: 'dx-treeview-toggle-item-visibility-opened',
        CUSTOM_COLLAPSE_ICON_CLASS: 'dx-treeview-custom-collapse-icon',
        CUSTOM_EXPAND_ICON_CLASS: 'dx-treeview-custom-expand-icon'
      };
      window.DATA = (function() {
        return [[{
          key: 1,
          text: 'Item 1'
        }, {
          key: 2,
          text: 'Item 2'
        }, {
          key: 3,
          text: 'Item 3'
        }], [{
          key: 1,
          text: 'Item 1',
          items: [{
            key: 12,
            text: 'Nested item 1'
          }, {
            key: 13,
            text: 'Nested item 2',
            items: [{
              key: 131,
              text: 'Last item'
            }]
          }]
        }, {
          key: 2,
          text: 'Item 2'
        }], [{
          key: 1,
          text: 'Item 1',
          items: [{
            key: 12,
            text: 'Nested item 1'
          }, {
            key: 13,
            text: 'Nested item 2'
          }]
        }, {
          key: 2,
          text: 'Item 2'
        }], [{
          itemId: 1,
          itemName: 'Item 1',
          children: [{
            itemId: 11,
            itemName: 'Nested Item 1'
          }]
        }, {
          itemId: 2,
          itemName: 'Item 2'
        }], [{
          'Id': 1,
          'ParentId': 0,
          'Name': 'Animals'
        }, {
          'Id': 2,
          'ParentId': 1,
          'Name': 'Cat'
        }, {
          'Id': 3,
          'ParentId': 1,
          'Name': 'Dog'
        }, {
          'Id': 5,
          'ParentId': 2,
          'Name': 'Abyssinian'
        }, {
          'Id': 8,
          'ParentId': 3,
          'Name': 'Affenpinscher'
        }, {
          'Id': 9,
          'ParentId': 3,
          'Name': 'Afghan Hound'
        }, {
          'Id': 12,
          'ParentId': 0,
          'Name': 'Birds'
        }, {
          'Id': 13,
          'ParentId': 12,
          'Name': 'Akekee'
        }], [{
          id: 1,
          text: 'Item 1',
          items: [{
            id: 11,
            text: 'Nested Item 1'
          }, {
            id: 12,
            text: 'Nested Item 2',
            items: [{
              id: 121,
              text: 'Third level item 1'
            }, {
              id: 122,
              text: 'Third level item 2'
            }]
          }]
        }, {
          id: 2,
          text: 'Item 2'
        }], [{
          id: 1,
          text: 'Item 1',
          items: [{
            id: 12,
            text: 'Nested Item 2',
            items: [{
              id: 121,
              text: 'Third level item 1'
            }, {
              id: 122,
              text: 'Third level item 2'
            }]
          }]
        }, {
          id: 2,
          text: 'Item 2',
          items: [{
            id: 22,
            text: 'Nested Item 2',
            items: [{
              id: 221,
              text: 'Third level item 1'
            }, {
              id: 222,
              text: 'Third level item 2'
            }]
          }]
        }]];
      })();
      window.data2 = [{
        id: 1,
        parentId: 0,
        text: 'Animals'
      }, {
        id: 2,
        parentId: 1,
        text: 'Cat'
      }, {
        id: 3,
        parentId: 1,
        text: 'Dog'
      }, {
        id: 4,
        parentId: 1,
        text: 'Cow'
      }, {
        id: 5,
        parentId: 2,
        text: 'Abyssinian'
      }, {
        id: 6,
        parentId: 2,
        text: 'Aegean cat'
      }, {
        id: 7,
        parentId: 2,
        text: 'Australian Mist'
      }, {
        id: 8,
        parentId: 3,
        text: 'Affenpinscher'
      }, {
        id: 9,
        parentId: 3,
        text: 'Afghan Hound'
      }, {
        id: 10,
        parentId: 3,
        text: 'Airedale Terrier'
      }, {
        id: 11,
        parentId: 3,
        text: 'Akita Inu'
      }, {
        id: 12,
        parentId: 0,
        text: 'Birds'
      }, {
        id: 13,
        parentId: 12,
        text: 'Akekee'
      }, {
        id: 14,
        parentId: 12,
        text: 'Arizona Woodpecker'
      }, {
        id: 15,
        parentId: 12,
        text: 'Black-chinned Sparrow'
      }, {
        id: 16,
        parentId: 0,
        text: 'Others'
      }];
      window.dataID = [{
        id: 1,
        'elternId': 0,
        text: 'Animals'
      }, {
        id: 2,
        'elternId': 1,
        text: 'Cat'
      }, {
        id: 3,
        'elternId': 2,
        text: 'Abyssinian'
      }, {
        id: 4,
        'elternId': 0,
        text: 'Birds'
      }, {
        id: 5,
        'elternId': 4,
        text: 'Akekee'
      }];
      window.initTree = function(options) {
        return $('#treeView').dxTreeView(options);
      };
      window.stripFunctions = function(obj) {
        var result = $.extend(true, {}, obj);
        $.each(result, function(field, value) {
          if ($.isFunction(value)) {
            delete result[field];
          }
          if (field === 'parent' && result.parent) {
            result.parent = stripFunctions(result.parent);
          }
        });
        return result;
      };
      window.makeSlowDataSource = function(data) {
        return {store: new CustomStore({load: function(loadOptions) {
              return $.Deferred(function(d) {
                setTimeout(function() {
                  new ArrayStore(data).load(loadOptions).done(function() {
                    d.resolve.apply(d, arguments);
                  });
                }, 300);
              }).promise();
            }})};
      };
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","data/custom_store","data/array_store","ui/tree_view","generic_light.css!","./treeViewParts/accessibility.js","./treeViewParts/animation.js","./treeViewParts/checkboxes.js","./treeViewParts/events.js","./treeViewParts/expresions.js","./treeViewParts/expandedItems.js","./treeViewParts/focusing.js","./treeViewParts/initialization.js","./treeViewParts/keyboardNavigation.js","./treeViewParts/lazyRendering.js","./treeViewParts/optionChanged.js","./treeViewParts/regression.js","./treeViewParts/rendering.js","./treeViewParts/scrolling.tests.js","./treeViewParts/selection.js","./treeViewParts/searching.js","./treeViewParts/selectAllMode.js","./treeViewParts/selectAllWithSelectNodesRecursiveFalse.js","./treeViewParts/selectNodesRecursiveTrue.js","./treeViewParts/treeview.size.tests.js","./treeViewParts/usageWithoutKeys.js","./treeViewParts/virtualMode.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("data/custom_store"), require("data/array_store"), require("ui/tree_view"), require("generic_light.css!"), require("./treeViewParts/accessibility.js"), require("./treeViewParts/animation.js"), require("./treeViewParts/checkboxes.js"), require("./treeViewParts/events.js"), require("./treeViewParts/expresions.js"), require("./treeViewParts/expandedItems.js"), require("./treeViewParts/focusing.js"), require("./treeViewParts/initialization.js"), require("./treeViewParts/keyboardNavigation.js"), require("./treeViewParts/lazyRendering.js"), require("./treeViewParts/optionChanged.js"), require("./treeViewParts/regression.js"), require("./treeViewParts/rendering.js"), require("./treeViewParts/scrolling.tests.js"), require("./treeViewParts/selection.js"), require("./treeViewParts/searching.js"), require("./treeViewParts/selectAllMode.js"), require("./treeViewParts/selectAllWithSelectNodesRecursiveFalse.js"), require("./treeViewParts/selectNodesRecursiveTrue.js"), require("./treeViewParts/treeview.size.tests.js"), require("./treeViewParts/usageWithoutKeys.js"), require("./treeViewParts/virtualMode.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=treeView.tests.js.map