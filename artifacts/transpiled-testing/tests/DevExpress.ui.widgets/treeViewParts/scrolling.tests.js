!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/scrolling.tests.js"], ["../../../helpers/TreeViewTestHelper.js","../scrollableParts/scrollable.constants.js","jquery","ui/scroll_view/ui.scrollable","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/scrolling.tests.js", ["../../../helpers/TreeViewTestHelper.js", "../scrollableParts/scrollable.constants.js", "jquery", "ui/scroll_view/ui.scrollable", "generic_light.css!"], function($__export) {
  "use strict";
  var TreeViewTestWrapper,
      SCROLLABLE_SIMULATED_CLASS,
      SCROLLABLE_NATIVE_CLASS,
      $,
      Scrollable;
  return {
    setters: [function($__m) {
      TreeViewTestWrapper = $__m.default;
    }, function($__m) {
      SCROLLABLE_SIMULATED_CLASS = $__m.SCROLLABLE_SIMULATED_CLASS;
      SCROLLABLE_NATIVE_CLASS = $__m.SCROLLABLE_NATIVE_CLASS;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Scrollable = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.module('scrollToItem', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        function createWrapper($__7, items) {
          var $__8 = $__7,
              scrollDirection = $__8.scrollDirection,
              initialPosition = $__8.initialPosition,
              rtlEnabled = $__8.rtlEnabled,
              onContentReady = $__8.onContentReady;
          var wrapper = new TreeViewTestWrapper({
            displayExpr: 'id',
            scrollDirection: scrollDirection,
            height: 150,
            width: 150,
            animationEnabled: false,
            items: items,
            rtlEnabled: rtlEnabled,
            onContentReady: onContentReady
          });
          if (initialPosition) {
            wrapper.instance.getScrollable().scrollTo(initialPosition);
          }
          return wrapper;
        }
        function createDataSource(expanded, disabled) {
          return [{
            id: 'item1',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item1_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item1_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item1_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item1_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item1_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }, {
            id: 'item2',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item2_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item2_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item2_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item2_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item2_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }, {
            id: 'item3',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item3_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item3_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item3_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item3_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item3_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }, {
            id: 'item4',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item4_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item4_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item4_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item4_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item4_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }, {
            id: 'item5',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item5_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item5_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item5_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item5_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item5_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }, {
            id: 'item6',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item6_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item6_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item6_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item6_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item6_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }, {
            id: 'item7',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item7_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item7_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item7_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item7_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item7_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }, {
            id: 'item8',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item8_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item8_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item8_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item8_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item8_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }, {
            id: 'item9',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item9_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item9_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item9_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item9_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item9_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }, {
            id: 'item10',
            expanded: expanded,
            disabled: disabled,
            items: [{
              id: 'item10_1',
              expanded: expanded,
              disabled: disabled,
              items: [{
                id: 'item10_1_1',
                expanded: expanded,
                disabled: disabled,
                items: [{
                  id: 'item10_1_1_1',
                  expanded: expanded,
                  disabled: disabled,
                  items: [{
                    id: 'item10_1_1_1_1',
                    expanded: expanded,
                    disabled: disabled,
                    items: [{
                      id: 'item10_1_1_1_1_1',
                      expanded: expanded,
                      disabled: disabled,
                      items: []
                    }]
                  }]
                }]
              }]
            }]
          }];
        }
        function isNotSupported(key, config) {
          var isFirstLevelNodeKey = key.indexOf('_') === -1;
          return config.disabled && !config.expanded && !isFirstLevelNodeKey;
        }
        var configs = [];
        ['vertical', 'horizontal', 'both'].forEach(function(scrollDirection) {
          [false, true].forEach(function(expanded) {
            [false, true].forEach(function(disabled) {
              [false, true].forEach(function(rtlEnabled) {
                configs.push({
                  expanded: expanded,
                  scrollDirection: scrollDirection,
                  disabled: disabled,
                  rtlEnabled: rtlEnabled,
                  keysToScroll: ['item1', 'item1_1_1', 'item9', 'item9_1_1_1_1', 'item10', 'item10_1_1_1_1_1'],
                  description: ("expanded: " + expanded + ", rtlEnabled: " + rtlEnabled + ", disabled: " + disabled + ", scrollDirection: " + scrollDirection)
                });
              });
            });
          });
        });
        configs.forEach(function(config) {
          config.keysToScroll.forEach(function(key) {
            QUnit.test(("config:" + config.description + " -> onContentReady.scrollToItem(" + key + ") -> focusOut() -> focusIn()"), function(assert) {
              var $__6 = this;
              var completionCallback = null;
              var isFirstContentReadyEvent = true;
              var options = $.extend({}, config, {onContentReady: function(e) {
                  if (isFirstContentReadyEvent) {
                    isFirstContentReadyEvent = false;
                    completionCallback = e.component.scrollToItem(key);
                  }
                }});
              var wrapper = createWrapper(options, createDataSource(config.expanded, config.disabled));
              var done = assert.async();
              if (isNotSupported(key, config)) {
                completionCallback.fail(function() {
                  assert.ok('scroll must fail');
                  done();
                });
              } else {
                completionCallback.done(function() {
                  wrapper.getElement().focusout();
                  wrapper.getElement().focusin();
                  wrapper.checkNodeIsInVisibleArea(key);
                  $__6.clock.tick(400);
                  done();
                });
              }
              this.clock.tick(10);
            });
          });
          [{
            top: 0,
            left: 0
          }, {
            top: 1000,
            left: 0
          }, {
            top: 0,
            left: 1000
          }, {
            top: 1000,
            left: 1000
          }].forEach(function(initialPosition) {
            QUnit.test(("config:" + config.description + ", initialPosition: " + JSON.stringify(initialPosition) + " -> scrollToItem() -> focusOut() -> focusIn()"), function(assert) {
              var $__6 = this;
              var options = $.extend({}, config, {initialPosition: initialPosition});
              var wrapper = createWrapper(options, createDataSource(config.expanded, config.disabled));
              config.keysToScroll.forEach(function(key) {
                var completionCallback = wrapper.instance.scrollToItem(key);
                var done = assert.async();
                if (isNotSupported(key, config)) {
                  completionCallback.fail(function() {
                    assert.ok('scroll must fail');
                    done();
                  });
                } else {
                  completionCallback.done(function() {
                    wrapper.getElement().focusout();
                    wrapper.getElement().focusin();
                    wrapper.checkNodeIsInVisibleArea(key);
                    done();
                  });
                }
                $__6.clock.tick(10);
              });
            });
          });
        });
        QUnit.test('scrollToItem(key} -> scrollToItem(itemElement) -> scrollToItem(itemData))', function(assert) {
          var wrapper = createWrapper({
            scrollDirection: 'both',
            rtlEnabled: false
          }, [{
            id: 'item1',
            expanded: true,
            items: [{
              id: 'item1_1',
              expanded: true,
              items: [{id: 'item1_1_1'}]
            }]
          }, {
            id: 'item2',
            expanded: true,
            items: [{
              id: 'item2_1',
              expanded: true,
              items: [{id: 'item2_1_1'}]
            }]
          }, {
            id: 'item3',
            expanded: true,
            items: [{
              id: 'item3_1',
              expanded: true,
              items: [{id: 'item3_1_1'}]
            }]
          }, {
            id: 'item4',
            expanded: true,
            items: [{
              id: 'item4_1',
              expanded: true,
              items: [{id: 'item4_1_1'}]
            }]
          }, {
            id: 'item5',
            expanded: true,
            items: [{
              id: 'item5_1',
              expanded: true,
              items: [{id: 'item5_1_1'}]
            }]
          }]);
          var done = assert.async(3);
          var key = 'item1_1_1';
          wrapper.instance.getScrollable().scrollTo({
            left: 0,
            top: 0
          });
          wrapper.instance.scrollToItem('item1_1_1').done(function() {
            wrapper.checkNodeIsInVisibleArea(key);
            done();
          });
          this.clock.tick(10);
          wrapper.instance.getScrollable().scrollTo({
            left: 0,
            top: 0
          });
          var node = wrapper.getElement().find('[data-item-id="item1_1_1"]').get(0);
          wrapper.instance.scrollToItem(node).done(function() {
            wrapper.checkNodeIsInVisibleArea(node.getAttribute('data-item-id'));
            done();
          });
          this.clock.tick(10);
          wrapper.instance.getScrollable().scrollTo({
            left: 0,
            top: 0
          });
          var itemData = wrapper.instance.option('items')[0].items[0].items[0];
          wrapper.instance.scrollToItem(itemData).done(function() {
            wrapper.checkNodeIsInVisibleArea(itemData.id);
            done();
          });
          this.clock.tick(10);
        });
        QUnit.test('scrollToItem(not exists key)', function(assert) {
          var config = {scrollDirection: 'both'};
          var wrapper = createWrapper(config, [{
            id: 'item1',
            items: [{
              id: 'item1_1',
              items: [{id: 'item1_1_1'}]
            }]
          }]);
          var done = assert.async(3);
          wrapper.instance.scrollToItem('12345').fail(function() {
            assert.ok('scroll must fail, node not found for this key');
            done();
          });
          this.clock.tick(10);
          wrapper.instance.scrollToItem($('<div/>').get(0)).fail(function() {
            assert.ok('scroll must fail, node not found for this itemElement');
            done();
          });
          this.clock.tick(10);
          wrapper.instance.scrollToItem({}).fail(function() {
            assert.ok('scroll must fail, node not found for this itemData');
            done();
          });
          this.clock.tick(10);
        });
      });
      QUnit.module('useNativeScrolling', function() {
        QUnit.test('switching useNative to false turns off native scrolling', function(assert) {
          var wrapper = new TreeViewTestWrapper({useNativeScrolling: true});
          var $treeView = wrapper.getElement();
          assert.equal($treeView.find(("." + SCROLLABLE_NATIVE_CLASS)).length, 1, 'native scrollable');
          assert.equal($treeView.find(("." + SCROLLABLE_SIMULATED_CLASS)).length, 0, 'simulated scrollable');
          wrapper.getInstance().option('useNativeScrolling', false);
          assert.equal($treeView.find(("." + SCROLLABLE_NATIVE_CLASS)).length, 0, 'native scrollable');
          assert.equal($treeView.find(("." + SCROLLABLE_SIMULATED_CLASS)).length, 1, 'simulated scrollable');
        });
        QUnit.test('switching useNative to true turns off simulated scrolling', function(assert) {
          var wrapper = new TreeViewTestWrapper({useNativeScrolling: false});
          var $treeView = wrapper.getElement();
          assert.equal($treeView.find(("." + SCROLLABLE_NATIVE_CLASS)).length, 0, 'native scrollable');
          assert.equal($treeView.find(("." + SCROLLABLE_SIMULATED_CLASS)).length, 1, 'simulated scrollable');
          wrapper.getInstance().option('useNativeScrolling', true);
          assert.equal($treeView.find(("." + SCROLLABLE_NATIVE_CLASS)).length, 1, 'native scrollable');
          assert.equal($treeView.find(("." + SCROLLABLE_SIMULATED_CLASS)).length, 0, 'simulated scrollable');
        });
      });
      QUnit.module('getScrollable()', function() {
        QUnit.test('getScrollable() method should return instance of private Scrollable widget', function(assert) {
          var wrapper = new TreeViewTestWrapper({useNativeScrolling: true});
          var scrollableInstance = wrapper.getInstance().getScrollable();
          assert.ok(scrollableInstance instanceof Scrollable, 'scrollable instance');
          assert.strictEqual(scrollableInstance, wrapper.getElement().find('.dx-scrollable').dxScrollable('instance'), 'getScrollable() return internal scrollable instance');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../helpers/TreeViewTestHelper.js","../scrollableParts/scrollable.constants.js","jquery","ui/scroll_view/ui.scrollable","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../helpers/TreeViewTestHelper.js"), require("../scrollableParts/scrollable.constants.js"), require("jquery"), require("ui/scroll_view/ui.scrollable"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrolling.tests.js.map