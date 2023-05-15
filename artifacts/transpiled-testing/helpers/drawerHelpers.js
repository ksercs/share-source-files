!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/drawerHelpers.js"], ["jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/helpers/drawerHelpers.js", ["jquery"], function($__export) {
  "use strict";
  var $,
      leftTemplateSize,
      LeftDrawerTester,
      rightTemplateSize,
      RightDrawerTester,
      topTemplateSize,
      TopDrawerTester,
      bottomTemplateSize,
      BottomDrawerTester,
      drawerElementId,
      drawerTesters;
  function checkBoundingClientRect(assert, element, expectedRect, elementName) {
    assert.ok(!!element, elementName + ' is defined');
    if (element) {
      var rect = element.getBoundingClientRect();
      var isCorrect = true;
      var message = (elementName + " rect is incorrect");
      for (var memberName in expectedRect) {
        message += (", " + memberName + ":[" + rect[memberName] + "/" + expectedRect[memberName] + "]");
        if (rect[memberName] !== expectedRect[memberName]) {
          isCorrect = false;
        }
      }
      assert.strictEqual(isCorrect, true, message + ', [actual/expected]');
    }
  }
  function checkMargin(assert, element, top, right, bottom, left, message) {
    assert.strictEqual(window.getComputedStyle(element).marginLeft, left + 'px', 'marginLeft, ' + message);
    assert.strictEqual(window.getComputedStyle(element).marginTop, top + 'px', 'marginTop, ' + message);
    assert.strictEqual(window.getComputedStyle(element).marginRight, right + 'px', 'marginRight, ' + message);
    assert.strictEqual(window.getComputedStyle(element).marginBottom, bottom + 'px', 'marginBottom, ' + message);
  }
  function checkWhenPanelContentRendered(assert, drawer, drawerElement, panelTemplateElement, expectedPanelRect, expectedViewRect) {
    var drawerRect = drawerElement.getBoundingClientRect();
    if (!drawer.option('minSize') && drawer.option('openedStateMode') !== 'overlap') {
      var panelRect = panelTemplateElement.parentElement.getBoundingClientRect();
      assert.strictEqual(panelRect.right < drawerRect.left || panelRect.left > drawerRect.right || panelRect.bottom < drawerRect.top || panelRect.top > drawerRect.bottom, true, 'panel should be out of drawerRect, ' + ("left:[" + panelRect.left + "/" + drawerRect.left + "], top:[" + panelRect.top + "/" + drawerRect.top + "], ") + ("right:[" + panelRect.right + "/" + drawerRect.right + "], bottom:[" + panelRect.bottom + "/" + drawerRect.bottom + "], [panel/drawer]"));
    } else {
      if (drawer.option('minSize') && (drawer.option('openedStateMode') === 'overlap')) {
        checkBoundingClientRect(assert, panelTemplateElement.parentElement, expectedPanelRect, 'panel');
      }
    }
    if (!drawer.option('minSize') || (drawer.option('openedStateMode') === 'overlap')) {
      checkBoundingClientRect(assert, $('#view').get(0), expectedViewRect, 'view');
    }
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      leftTemplateSize = 150;
      LeftDrawerTester = {
        templateSize: leftTemplateSize,
        template: function() {
          return ("<div id=\"template\" style=\"width: " + leftTemplateSize + "px; height: 100%; background-color: green\">template</div>");
        },
        checkOpened: function(assert, drawer, drawerElement) {
          function checkPush(assert, env) {
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left + leftTemplateSize,
              top: env.drawerRect.top,
              width: env.drawerRect.width - env.minSize,
              height: env.drawerRect.height
            }, 'view');
            assert.ok(env.drawer._$viewContentWrapper[0].classList.contains('dx-theme-background-color'), 'view element should override panel element');
          }
          function checkShrink(assert, env) {
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left + leftTemplateSize,
              top: env.drawerRect.top,
              width: env.drawerRect.width - leftTemplateSize,
              height: env.drawerRect.height
            }, 'view');
            checkMargin(assert, env.templateElement.parentElement, 0, 0, 0, 0, 'template should be visible by position');
            assert.strictEqual(env.drawer._$viewContentWrapper[0].classList.contains('dx-theme-background-color'), false, 'theme-background-color is not used in shrink mode');
          }
          function checkOverlap(assert, env) {
            assert.strictEqual(env.drawer._$viewContentWrapper[0].classList.contains('dx-theme-background-color'), false, 'theme-background-color is not used in shrink mode');
            checkBoundingClientRect(assert, env.templateElement.parentElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: leftTemplateSize,
              height: env.drawerRect.height
            }, 'template.parentElement size should not cut template');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left + env.minSize,
              top: env.drawerRect.top,
              width: env.drawerRect.width - env.minSize,
              height: env.drawerRect.height
            }, 'view');
            assert.equal(window.getComputedStyle(env.templateElement.parentElement).zIndex, '1501', 'template should be shown over view');
          }
          checkBoundingClientRect(assert, drawerElement, {
            width: 200,
            height: 100
          }, 'drawerElement');
          assert.strictEqual(drawer.option('visible'), true, 'option(visible)');
          assert.strictEqual(drawer.option('opened'), true, 'option(opened)');
          assert.strictEqual(window.getComputedStyle(drawerElement).display, 'block', 'drawerElement.display');
          var env = {
            drawer: drawer,
            drawerElement: drawerElement,
            drawerRect: drawerElement.getBoundingClientRect(),
            templateElement: drawerElement.querySelector('#template'),
            viewElement: drawerElement.querySelector('#view'),
            shading: drawer.option('shading'),
            minSize: drawer.option('minSize') || 0
          };
          checkBoundingClientRect(assert, env.templateElement, {
            left: env.drawerRect.left,
            top: env.drawerRect.top,
            width: leftTemplateSize,
            height: env.drawerRect.height
          }, 'template');
          if (drawer.option('openedStateMode') === 'overlap') {
            checkOverlap(assert, env);
          } else if (drawer.option('openedStateMode') === 'push') {
            checkPush(assert, env);
          } else if (drawer.option('openedStateMode') === 'shrink') {
            checkShrink(assert, env);
          } else {
            assert.notOk('configuration is not tested');
          }
        },
        checkHidden: function(assert, drawer, drawerElement) {
          function checkPush(assert, env) {
            checkBoundingClientRect(assert, env.templateElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: leftTemplateSize,
              height: env.drawerRect.height
            }, 'template');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left + env.minSize,
              top: env.drawerRect.top,
              width: env.drawerRect.width - env.minSize,
              height: env.drawerRect.height
            }, 'view');
            assert.ok(window.getComputedStyle(env.templateElement.parentElement).position === 'absolute' && window.getComputedStyle(env.viewElement.parentElement).transform.indexOf('matrix') >= 0, 'template element should be hidden, view element should be visible');
            assert.ok(env.drawer._$viewContentWrapper[0].classList.contains('dx-theme-background-color'), 'view element should override panel element');
          }
          function checkShrink(assert, env) {
            if (env.revealMode === 'expand') {
              checkBoundingClientRect(assert, env.templateElement, {
                left: env.drawerRect.left,
                top: env.drawerRect.top,
                width: leftTemplateSize,
                height: env.drawerRect.height
              }, 'template');
              checkBoundingClientRect(assert, env.templateElement.parentElement, {
                left: env.drawerRect.left,
                top: env.drawerRect.top,
                width: env.minSize,
                height: env.drawerRect.height
              }, 'template.parentElement');
            } else {
              checkBoundingClientRect(assert, env.templateElement, {
                left: env.drawerRect.left - leftTemplateSize + env.minSize,
                top: env.drawerRect.top,
                width: leftTemplateSize,
                height: env.drawerRect.height
              }, 'template');
              checkMargin(assert, env.templateElement.parentElement, 0, 0, 0, -leftTemplateSize + env.minSize, 'template should not be visible by position');
            }
            assert.strictEqual(window.getComputedStyle(env.templateElement.parentElement).overflow, 'hidden', 'template should not be visible by parent.overflow');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left + env.minSize,
              top: env.drawerRect.top,
              width: env.drawerRect.width - env.minSize,
              height: env.drawerRect.height
            }, 'view');
            assert.strictEqual(env.drawer._$viewContentWrapper[0].classList.contains('dx-theme-background-color'), false, 'theme-background-color is not used in shrink mode');
          }
          function checkOverlap(assert, env) {
            assert.strictEqual(env.drawer._$viewContentWrapper[0].classList.contains('dx-theme-background-color'), false, 'theme-background-color is not used in shrink mode');
            if (env.revealMode === 'expand') {
              if (env.minSize) {
                checkBoundingClientRect(assert, env.templateElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.top,
                  width: leftTemplateSize,
                  height: env.drawerRect.height
                }, 'template');
                checkBoundingClientRect(assert, env.templateElement.parentElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.top,
                  width: env.minSize,
                  height: env.drawerRect.height
                }, 'template.parentElement');
              } else {
                if (env.templateElement === null) {
                  assert.ok(true);
                } else {
                  checkBoundingClientRect(assert, env.templateElement, {
                    left: env.drawerRect.left,
                    top: env.drawerRect.top,
                    width: leftTemplateSize,
                    height: env.drawerRect.height
                  }, 'template');
                  checkBoundingClientRect(assert, env.templateElement.parentElement, {width: 0}, 'template.parentElement');
                  assert.strictEqual(window.getComputedStyle(env.templateElement.parentElement).overflow, 'hidden', 'template element should be hidden');
                }
              }
            } else {
              if (env.minSize) {
                checkBoundingClientRect(assert, env.templateElement, {
                  left: env.drawerRect.left - leftTemplateSize + env.minSize,
                  top: env.drawerRect.top,
                  width: leftTemplateSize,
                  height: env.drawerRect.height
                }, 'template');
                var overflowHiddenElement = env.templateElement.parentElement.parentElement.parentElement.parentElement;
                assert.strictEqual(window.getComputedStyle(overflowHiddenElement).overflowX, 'hidden', 'only minSize of template should be visible');
                checkBoundingClientRect(assert, overflowHiddenElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.top,
                  width: env.drawerRect.width,
                  height: env.drawerRect.height
                }, 'template.parentElement should cut template to minSize');
              } else {
                if (env.templateElement === null) {
                  assert.ok(true);
                } else {
                  checkBoundingClientRect(assert, env.templateElement, {
                    left: env.drawerRect.left - leftTemplateSize,
                    top: env.drawerRect.top,
                    width: leftTemplateSize,
                    height: env.drawerRect.height
                  }, 'template');
                  checkBoundingClientRect(assert, env.templateElement, {right: env.drawerRect.left}, 'template');
                }
              }
            }
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left + env.minSize,
              top: env.drawerRect.top,
              width: env.drawerRect.width - env.minSize,
              height: env.drawerRect.height
            }, 'view');
          }
          checkBoundingClientRect(assert, drawerElement, {
            width: 200,
            height: 100
          }, 'drawerElement');
          assert.strictEqual(drawer.option('visible'), true, 'option(visible)');
          assert.strictEqual(drawer.option('opened'), false, 'option(opened)');
          assert.strictEqual(window.getComputedStyle(drawerElement).display, 'block', 'drawerElement.display');
          var env = {
            drawer: drawer,
            drawerElement: drawerElement,
            drawerRect: drawerElement.getBoundingClientRect(),
            templateElement: drawerElement.querySelector('#template'),
            viewElement: drawerElement.querySelector('#view'),
            revealMode: drawer.option('revealMode'),
            minSize: drawer.option('minSize') || 0
          };
          if (drawer.option('openedStateMode') === 'overlap') {
            checkOverlap(assert, env);
          } else if (drawer.option('openedStateMode') === 'push') {
            checkPush(assert, env);
          } else if (drawer.option('openedStateMode') === 'shrink') {
            checkShrink(assert, env);
          } else {
            assert.notOk('configuration is not tested');
          }
        },
        checkWhenPanelContentRendered: function(assert, drawer, drawerElement, panelTemplateElement) {
          var $__3 = drawerElement.getBoundingClientRect(),
              top = $__3.top,
              left = $__3.left,
              width = $__3.width,
              height = $__3.height;
          var expectedPanelRect = {
            top: top,
            left: left,
            width: width,
            height: height
          };
          var expectedViewRect = {
            top: top,
            left: left,
            width: width,
            height: height
          };
          if (drawer.option('minSize')) {
            expectedPanelRect.width = drawer.option('minSize');
            expectedViewRect.left += drawer.option('minSize');
            expectedViewRect.width -= drawer.option('minSize');
          }
          checkWhenPanelContentRendered(assert, drawer, drawerElement, panelTemplateElement, expectedPanelRect, expectedViewRect);
        }
      };
      rightTemplateSize = 150;
      RightDrawerTester = {
        templateSize: rightTemplateSize,
        template: function() {
          return ("<div id=\"template\" style=\"width: " + rightTemplateSize + "px; height: 100%; background-color: green\">template</div>");
        },
        checkOpened: function(assert, drawer, drawerElement) {
          function checkPush(assert, env) {
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left - rightTemplateSize + env.minSize,
              top: env.drawerRect.top,
              width: env.drawerRect.width - env.minSize,
              height: env.drawerRect.height
            }, 'view');
          }
          function checkShrink(assert, env) {
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width - rightTemplateSize,
              height: env.drawerRect.height
            }, 'view');
            checkMargin(assert, env.templateElement.parentElement, 0, 0, 0, 0, 'template should be visible by position');
          }
          function checkOverlap(assert, env) {
            checkBoundingClientRect(assert, env.templateElement.parentElement, {
              left: env.drawerRect.right - rightTemplateSize,
              top: env.drawerRect.top,
              width: rightTemplateSize,
              height: env.drawerRect.height
            }, 'template.parentElement size should not cut template');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width - env.minSize,
              height: env.drawerRect.height
            }, 'view');
            assert.equal(window.getComputedStyle(env.templateElement.parentElement).zIndex, '1501', 'template should be shown over view');
          }
          checkBoundingClientRect(assert, drawerElement, {
            width: 200,
            height: 100
          }, 'drawerElement');
          assert.strictEqual(drawer.option('visible'), true, 'option(visible)');
          assert.strictEqual(drawer.option('opened'), true, 'option(opened)');
          assert.strictEqual(window.getComputedStyle(drawerElement).display, 'block', 'drawerElement.display');
          var env = {
            drawer: drawer,
            drawerElement: drawerElement,
            drawerRect: drawerElement.getBoundingClientRect(),
            templateElement: drawerElement.querySelector('#template'),
            viewElement: drawerElement.querySelector('#view'),
            shading: drawer.option('shading'),
            minSize: drawer.option('minSize') || 0
          };
          checkBoundingClientRect(assert, env.templateElement, {
            left: env.drawerRect.right - rightTemplateSize,
            top: env.drawerRect.top,
            width: rightTemplateSize,
            height: env.drawerRect.height
          }, 'template');
          if (drawer.option('openedStateMode') === 'overlap') {
            checkOverlap(assert, env);
          } else if (drawer.option('openedStateMode') === 'push') {
            checkPush(assert, env);
          } else if (drawer.option('openedStateMode') === 'shrink') {
            checkShrink(assert, env);
          } else {
            assert.notOk('configuration is not tested');
          }
        },
        checkHidden: function(assert, drawer, drawerElement) {
          function checkPush(assert, env) {
            if (env.revealMode === 'expand') {
              if (env.minSize) {
                checkBoundingClientRect(assert, env.templateElement, {
                  left: env.drawerRect.right - rightTemplateSize,
                  top: env.drawerRect.top,
                  width: rightTemplateSize,
                  height: env.drawerRect.height
                }, 'template');
              }
              assert.ok(window.getComputedStyle(env.templateElement.parentElement).position === 'absolute' && window.getComputedStyle(env.viewElement.parentElement).transform.indexOf('matrix') >= 0, 'template element should be hidden, view element should be visible');
            } else {
              checkBoundingClientRect(assert, env.templateElement, {
                left: env.drawerRect.right - rightTemplateSize,
                top: env.drawerRect.top,
                width: rightTemplateSize,
                height: env.drawerRect.height
              }, 'template');
              assert.ok(window.getComputedStyle(env.templateElement.parentElement).position === 'absolute' && window.getComputedStyle(env.viewElement.parentElement).transform.indexOf('matrix') >= 0, 'template element should be hidden, view element should be visible');
            }
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width - env.minSize,
              height: env.drawerRect.height
            }, 'view');
          }
          function checkShrink(assert, env) {
            if (env.revealMode === 'expand') {
              checkBoundingClientRect(assert, env.templateElement, {
                left: env.drawerRect.right - env.minSize,
                top: env.drawerRect.top,
                width: rightTemplateSize,
                height: env.drawerRect.height
              }, 'template');
              checkBoundingClientRect(assert, env.templateElement.parentElement, {
                left: env.drawerRect.right - env.minSize,
                top: env.drawerRect.top,
                width: env.minSize,
                height: env.drawerRect.height
              }, 'template.parentElement');
            } else {
              checkBoundingClientRect(assert, env.templateElement, {
                left: env.drawerRect.right - env.minSize,
                top: env.drawerRect.top,
                width: rightTemplateSize,
                height: env.drawerRect.height
              }, 'template');
              checkBoundingClientRect(assert, env.templateElement.parentElement, {
                left: env.drawerRect.right - env.minSize,
                top: env.drawerRect.top,
                width: rightTemplateSize,
                height: env.drawerRect.height
              }, 'template.parentElement');
              checkMargin(assert, env.templateElement.parentElement, 0, -rightTemplateSize + env.minSize, 0, 0, 'template should not be visible by position');
            }
            assert.strictEqual(window.getComputedStyle(env.templateElement.parentElement).overflow, 'hidden', 'template should not be visible by parent.overflow');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width - env.minSize,
              height: env.drawerRect.height
            }, 'view');
          }
          function checkOverlap(assert, env) {
            if (env.revealMode === 'expand') {
              if (env.minSize) {
                checkBoundingClientRect(assert, env.templateElement, {
                  left: env.drawerRect.left + env.drawerRect.width - env.minSize,
                  top: env.drawerRect.top,
                  width: rightTemplateSize,
                  height: env.drawerRect.height
                }, 'template');
                checkBoundingClientRect(assert, env.templateElement.parentElement, {
                  left: env.drawerRect.left + env.drawerRect.width - env.minSize,
                  top: env.drawerRect.top,
                  width: env.minSize,
                  height: 100
                }, 'template.parentElement');
              } else {
                if (env.templateElement === null) {
                  assert.ok(true);
                } else {
                  checkBoundingClientRect(assert, env.templateElement, {
                    left: env.drawerRect.right,
                    top: env.drawerRect.top,
                    width: rightTemplateSize,
                    height: env.drawerRect.height
                  }, 'template');
                  checkBoundingClientRect(assert, env.templateElement.parentElement, {width: 0}, 'template.parentElement');
                  assert.strictEqual(window.getComputedStyle(env.templateElement.parentElement).overflow, 'hidden', 'template element should be hidden');
                }
              }
            } else {
              if (env.minSize) {
                checkBoundingClientRect(assert, env.templateElement, {
                  left: env.drawerRect.right - env.minSize,
                  top: env.drawerRect.top,
                  width: rightTemplateSize,
                  height: env.drawerRect.height
                }, 'template');
                var overflowHiddenElement = env.templateElement.parentElement.parentElement.parentElement.parentElement;
                assert.strictEqual(window.getComputedStyle(overflowHiddenElement).overflowX, 'hidden', 'only minSize of template should be visible');
                checkBoundingClientRect(assert, overflowHiddenElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.top,
                  width: env.drawerRect.width,
                  height: env.drawerRect.height
                }, 'template.parentElement should cut template to minSize');
              } else {
                if (env.templateElement === null) {
                  assert.ok(true);
                } else {
                  checkBoundingClientRect(assert, env.templateElement, {
                    left: env.drawerRect.right,
                    top: env.drawerRect.top,
                    width: rightTemplateSize,
                    height: env.drawerRect.height
                  }, 'template');
                }
              }
            }
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: 200 - env.minSize,
              height: 100
            }, 'view');
          }
          checkBoundingClientRect(assert, drawerElement, {
            width: 200,
            height: 100
          }, 'drawerElement');
          assert.strictEqual(drawer.option('visible'), true, 'option(visible)');
          assert.strictEqual(drawer.option('opened'), false, 'option(opened)');
          assert.strictEqual(window.getComputedStyle(drawerElement).display, 'block', 'drawerElement.display');
          var env = {
            drawer: drawer,
            drawerElement: drawerElement,
            drawerRect: drawerElement.getBoundingClientRect(),
            templateElement: drawerElement.querySelector('#template'),
            viewElement: drawerElement.querySelector('#view'),
            revealMode: drawer.option('revealMode'),
            minSize: drawer.option('minSize') || 0
          };
          if (drawer.option('openedStateMode') === 'overlap') {
            checkOverlap(assert, env);
          } else if (drawer.option('openedStateMode') === 'push') {
            checkPush(assert, env);
          } else if (drawer.option('openedStateMode') === 'shrink') {
            checkShrink(assert, env);
          } else {
            assert.notOk('configuration is not tested');
          }
        },
        checkWhenPanelContentRendered: function(assert, drawer, drawerElement, panelTemplateElement) {
          var $__3 = drawerElement.getBoundingClientRect(),
              top = $__3.top,
              left = $__3.left,
              width = $__3.width,
              height = $__3.height;
          var expectedPanelRect = {
            top: top,
            left: left,
            width: width,
            height: height
          };
          var expectedViewRect = {
            top: top,
            left: left,
            width: width,
            height: height
          };
          if (drawer.option('minSize')) {
            expectedPanelRect.left += expectedPanelRect.wight - drawer.option('minSize');
            expectedPanelRect.width = drawer.option('minSize');
            expectedViewRect.width -= drawer.option('minSize');
          }
          checkWhenPanelContentRendered(assert, drawer, drawerElement, panelTemplateElement, expectedPanelRect, expectedViewRect);
        }
      };
      topTemplateSize = 75;
      TopDrawerTester = {
        templateSize: topTemplateSize,
        template: function() {
          return ("<div id=\"template\" style=\"width: 100%; height: " + topTemplateSize + "px; background-color: green\">template</div>");
        },
        checkOpened: function(assert, drawer, drawerElement) {
          function checkPush(assert, env) {
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top + topTemplateSize,
              width: env.drawerRect.width,
              height: env.drawerRect.height - env.minSize
            }, 'view');
          }
          function checkShrink(assert, env) {
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top + topTemplateSize,
              width: env.drawerRect.width,
              height: env.drawerRect.height - topTemplateSize
            }, 'view');
            checkMargin(assert, env.templateElement.parentElement, 0, 0, 0, 0, 'template should be visible by position');
          }
          function checkOverlap(assert, env) {
            checkBoundingClientRect(assert, env.templateElement.parentElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: 200,
              height: topTemplateSize
            }, 'template.parentElement size should not cut template');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top + env.minSize,
              width: env.drawerRect.width,
              height: env.drawerRect.height - env.minSize
            }, 'view');
            assert.equal(window.getComputedStyle(env.templateElement.parentElement).zIndex, '1501', 'template should be shown over view');
          }
          checkBoundingClientRect(assert, drawerElement, {
            width: 200,
            height: 100
          }, 'drawerElement');
          assert.strictEqual(drawer.option('visible'), true, 'option(visible)');
          assert.strictEqual(drawer.option('opened'), true, 'option(opened)');
          assert.strictEqual(window.getComputedStyle(drawerElement).display, 'block', 'drawerElement.display');
          var env = {
            drawer: drawer,
            drawerElement: drawerElement,
            drawerRect: drawerElement.getBoundingClientRect(),
            templateElement: drawerElement.querySelector('#template'),
            viewElement: drawerElement.querySelector('#view'),
            shading: drawer.option('shading'),
            minSize: drawer.option('minSize') || 0
          };
          checkBoundingClientRect(assert, env.templateElement, {
            left: env.drawerRect.left,
            top: env.drawerRect.top,
            width: env.drawerRect.width,
            height: topTemplateSize
          }, 'template');
          if (drawer.option('openedStateMode') === 'overlap') {
            checkOverlap(assert, env);
          } else if (drawer.option('openedStateMode') === 'push') {
            checkPush(assert, env);
          } else if (drawer.option('openedStateMode') === 'shrink') {
            checkShrink(assert, env);
          } else {
            assert.notOk('configuration is not tested');
          }
        },
        checkHidden: function(assert, drawer, drawerElement) {
          function checkPush(assert, env) {
            checkBoundingClientRect(assert, env.templateElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width,
              height: topTemplateSize
            }, 'template');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top + env.minSize,
              width: env.drawerRect.width,
              height: env.drawerRect.height - env.minSize
            }, 'view');
            assert.ok(window.getComputedStyle(env.templateElement.parentElement).position === 'absolute' && window.getComputedStyle(env.viewElement.parentElement).transform.indexOf('matrix') >= 0, 'template element should be hidden, view element should be visible');
          }
          function checkShrink(assert, env) {
            if (env.revealMode === 'expand') {
              checkBoundingClientRect(assert, env.templateElement, {
                left: env.drawerRect.left,
                top: env.drawerRect.top,
                width: env.drawerRect.width,
                height: topTemplateSize
              }, 'template');
              checkBoundingClientRect(assert, env.templateElement.parentElement, {
                left: env.drawerRect.left,
                top: env.drawerRect.top,
                width: env.drawerRect.width,
                height: env.minSize
              }, 'template.parentElement');
            } else {
              checkBoundingClientRect(assert, env.templateElement, {
                left: env.drawerRect.left,
                top: env.drawerRect.top - topTemplateSize + env.minSize,
                width: env.drawerRect.width,
                height: topTemplateSize
              }, 'template');
              checkMargin(assert, env.templateElement.parentElement, -topTemplateSize + env.minSize, 0, 0, 0, 'template should not be visible by position');
            }
            assert.strictEqual(window.getComputedStyle(env.templateElement.parentElement).overflow, 'hidden', 'template should not be visible by parent.overflow');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top + env.minSize,
              width: env.drawerRect.width,
              height: env.drawerRect.height - env.minSize
            }, 'view');
          }
          function checkOverlap(assert, env) {
            if (env.revealMode === 'expand') {
              if (env.minSize) {
                checkBoundingClientRect(assert, env.templateElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.top,
                  width: 200,
                  height: topTemplateSize
                }, 'template');
                checkBoundingClientRect(assert, env.templateElement.parentElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.top,
                  width: 200,
                  height: env.minSize
                }, 'template.parentElement should cut template to minSize');
              } else {
                if (env.templateElement === null) {
                  assert.ok(true);
                } else {
                  checkBoundingClientRect(assert, env.templateElement.parentElement, {height: 0}, 'template.parentElement');
                  assert.strictEqual(window.getComputedStyle(env.templateElement.parentElement).overflow, 'hidden', 'template element should be hidden');
                }
              }
            } else {
              if (env.minSize) {
                checkBoundingClientRect(assert, env.templateElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.top - topTemplateSize + env.minSize,
                  width: env.drawerRect.width,
                  height: topTemplateSize
                }, 'template');
                var overflowHiddenElement = env.templateElement.parentElement.parentElement.parentElement.parentElement;
                assert.strictEqual(window.getComputedStyle(overflowHiddenElement).overflowY, 'hidden', 'only minSize of template should be visible');
                checkBoundingClientRect(assert, overflowHiddenElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.top,
                  width: env.drawerRect.width,
                  height: env.drawerRect.height
                }, 'template.parentElement should cut template to minSize');
              } else {
                if (env.templateElement === null) {
                  assert.ok(true);
                } else {
                  checkBoundingClientRect(assert, env.templateElement, {bottom: env.drawerRect.top}, 'template');
                }
              }
            }
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top + env.minSize,
              width: 200,
              height: 100 - env.minSize
            }, 'view');
          }
          checkBoundingClientRect(assert, drawerElement, {
            width: 200,
            height: 100
          }, 'drawerElement');
          assert.strictEqual(drawer.option('visible'), true, 'option(visible)');
          assert.strictEqual(drawer.option('opened'), false, 'option(opened)');
          assert.strictEqual(window.getComputedStyle(drawerElement).display, 'block', 'drawerElement.display');
          var env = {
            drawer: drawer,
            drawerElement: drawerElement,
            drawerRect: drawerElement.getBoundingClientRect(),
            templateElement: drawerElement.querySelector('#template'),
            viewElement: drawerElement.querySelector('#view'),
            revealMode: drawer.option('revealMode'),
            minSize: drawer.option('minSize') || 0
          };
          if (drawer.option('openedStateMode') === 'overlap') {
            checkOverlap(assert, env);
          } else if (drawer.option('openedStateMode') === 'push') {
            checkPush(assert, env);
          } else if (drawer.option('openedStateMode') === 'shrink') {
            checkShrink(assert, env);
          } else {
            assert.notOk('configuration is not tested');
          }
        },
        checkWhenPanelContentRendered: function(assert, drawer, drawerElement, panelTemplateElement) {
          var $__3 = drawerElement.getBoundingClientRect(),
              top = $__3.top,
              left = $__3.left,
              width = $__3.width,
              height = $__3.height;
          var expectedPanelRect = {
            top: top,
            left: left,
            width: width,
            height: height
          };
          var expectedViewRect = {
            top: top,
            left: left,
            width: width,
            height: height
          };
          if (drawer.option('minSize')) {
            expectedPanelRect.height = drawer.option('minSize');
            expectedViewRect.top += drawer.option('minSize');
            expectedViewRect.height -= drawer.option('minSize');
          }
          checkWhenPanelContentRendered(assert, drawer, drawerElement, panelTemplateElement, expectedPanelRect, expectedViewRect);
        }
      };
      bottomTemplateSize = 75;
      BottomDrawerTester = {
        templateSize: bottomTemplateSize,
        template: function() {
          return ("<div id=\"template\" style=\"width: 100%; height: " + bottomTemplateSize + "px; background-color: green\">template</div>");
        },
        checkOpened: function(assert, drawer, drawerElement) {
          function checkPush(assert, env) {
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top - bottomTemplateSize + env.minSize,
              width: env.drawerRect.width,
              height: env.drawerRect.height - env.minSize
            }, 'view');
          }
          function checkShrink(assert, env) {
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width,
              height: env.drawerRect.height - bottomTemplateSize
            }, 'view');
            checkMargin(assert, env.templateElement.parentElement, 0, 0, 0, 0, 'template should be visible by position');
          }
          function checkOverlap(assert, env) {
            checkBoundingClientRect(assert, env.templateElement.parentElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.bottom - bottomTemplateSize,
              width: env.drawerRect.width,
              height: bottomTemplateSize
            }, 'template.parentElement size should not cut template');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width,
              height: env.drawerRect.height - env.minSize
            }, 'view');
            assert.equal(window.getComputedStyle(env.templateElement.parentElement).zIndex, '1501', 'template should be shown over view');
          }
          checkBoundingClientRect(assert, drawerElement, {
            width: 200,
            height: 100
          }, 'drawerElement');
          assert.strictEqual(drawer.option('visible'), true, 'option(visible)');
          assert.strictEqual(drawer.option('opened'), true, 'option(opened)');
          assert.strictEqual(window.getComputedStyle(drawerElement).display, 'block', 'drawerElement.display');
          var env = {
            drawer: drawer,
            drawerElement: drawerElement,
            drawerRect: drawerElement.getBoundingClientRect(),
            templateElement: drawerElement.querySelector('#template'),
            viewElement: drawerElement.querySelector('#view'),
            shading: drawer.option('shading'),
            minSize: drawer.option('minSize') || 0
          };
          checkBoundingClientRect(assert, env.templateElement, {
            left: env.drawerRect.left,
            top: env.drawerRect.bottom - bottomTemplateSize,
            width: env.drawerRect.width,
            height: bottomTemplateSize
          }, 'template');
          if (drawer.option('openedStateMode') === 'overlap') {
            checkOverlap(assert, env);
          } else if (drawer.option('openedStateMode') === 'push') {
            checkPush(assert, env);
          } else if (drawer.option('openedStateMode') === 'shrink') {
            checkShrink(assert, env);
          } else {
            assert.notOk('configuration is not tested');
          }
        },
        checkHidden: function(assert, drawer, drawerElement) {
          function checkPush(assert, env) {
            checkBoundingClientRect(assert, env.templateElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.bottom - bottomTemplateSize,
              width: env.drawerRect.width,
              height: bottomTemplateSize
            }, 'template');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width,
              height: env.drawerRect.height - env.minSize
            }, 'view');
            assert.ok(window.getComputedStyle(env.templateElement.parentElement).position === 'absolute' && window.getComputedStyle(env.viewElement.parentElement).transform.indexOf('matrix') >= 0, 'template element should be hidden, view element should be visible');
          }
          function checkShrink(assert, env) {
            if (env.revealMode === 'expand') {
              checkBoundingClientRect(assert, env.templateElement, {
                left: env.drawerRect.left,
                top: env.drawerRect.bottom - env.minSize,
                width: env.drawerRect.width,
                height: bottomTemplateSize
              }, 'template');
              checkBoundingClientRect(assert, env.templateElement.parentElement, {
                left: env.drawerRect.left,
                top: env.drawerRect.bottom - env.minSize,
                width: env.drawerRect.width,
                height: env.minSize
              }, 'template.parentElement');
            } else {
              checkBoundingClientRect(assert, env.templateElement, {
                left: env.drawerRect.left,
                top: env.drawerRect.bottom - env.minSize,
                width: env.drawerRect.width,
                height: bottomTemplateSize
              }, 'template');
              checkBoundingClientRect(assert, env.templateElement.parentElement, {
                left: env.drawerRect.left,
                top: env.drawerRect.bottom - env.minSize,
                width: env.drawerRect.width,
                height: bottomTemplateSize
              }, 'template.parentElement');
              checkMargin(assert, env.templateElement.parentElement, 0, 0, -bottomTemplateSize + env.minSize, 0, 'template should not be visible by position');
            }
            assert.strictEqual(window.getComputedStyle(env.templateElement.parentElement).overflow, 'hidden', 'template should not be visible by parent.overflow');
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width,
              height: env.drawerRect.height - env.minSize
            }, 'view');
          }
          function checkOverlap(assert, env) {
            if (env.revealMode === 'expand') {
              if (env.minSize) {
                checkBoundingClientRect(assert, env.templateElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.bottom - env.minSize,
                  width: env.drawerRect.width,
                  height: bottomTemplateSize
                }, 'template');
                checkBoundingClientRect(assert, env.templateElement.parentElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.bottom - env.minSize,
                  width: env.drawerRect.width,
                  height: env.minSize
                }, 'template.parentElement should cut template to minSize');
              } else {
                if (env.templateElement === null) {
                  assert.ok(true);
                } else {
                  checkBoundingClientRect(assert, env.templateElement, {
                    left: env.drawerRect.left,
                    top: env.drawerRect.bottom,
                    width: env.drawerRect.width,
                    height: bottomTemplateSize
                  }, 'template');
                  checkBoundingClientRect(assert, env.templateElement.parentElement, {height: 0}, 'template.parentElement');
                  assert.strictEqual(window.getComputedStyle(env.templateElement.parentElement).overflow, 'hidden', 'template element should be hidden');
                }
              }
            } else {
              if (env.minSize) {
                checkBoundingClientRect(assert, env.templateElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.bottom - env.minSize,
                  width: env.drawerRect.width,
                  height: topTemplateSize
                }, 'template');
                var overflowHiddenElement = env.templateElement.parentElement.parentElement.parentElement.parentElement;
                assert.strictEqual(window.getComputedStyle(overflowHiddenElement).overflowY, 'hidden', 'only minSize of template should be visible');
                checkBoundingClientRect(assert, overflowHiddenElement, {
                  left: env.drawerRect.left,
                  top: env.drawerRect.top,
                  width: env.drawerRect.width,
                  height: env.drawerRect.height
                }, 'template.parentElement should cut template to minSize');
              } else {
                if (env.templateElement === null) {
                  assert.ok(true);
                } else {
                  checkBoundingClientRect(assert, env.templateElement, {
                    left: env.drawerRect.left,
                    top: env.drawerRect.bottom,
                    width: env.drawerRect.width,
                    height: bottomTemplateSize
                  }, 'template');
                }
              }
            }
            checkBoundingClientRect(assert, env.viewElement, {
              left: env.drawerRect.left,
              top: env.drawerRect.top,
              width: env.drawerRect.width,
              height: env.drawerRect.height - env.minSize
            }, 'view');
          }
          checkBoundingClientRect(assert, drawerElement, {
            width: 200,
            height: 100
          }, 'drawerElement');
          assert.strictEqual(drawer.option('visible'), true, 'option(visible)');
          assert.strictEqual(drawer.option('opened'), false, 'option(opened)');
          assert.strictEqual(window.getComputedStyle(drawerElement).display, 'block', 'drawerElement.display');
          var env = {
            drawer: drawer,
            drawerElement: drawerElement,
            drawerRect: drawerElement.getBoundingClientRect(),
            templateElement: drawerElement.querySelector('#template'),
            viewElement: drawerElement.querySelector('#view'),
            revealMode: drawer.option('revealMode'),
            minSize: drawer.option('minSize') || 0
          };
          if (drawer.option('openedStateMode') === 'overlap') {
            checkOverlap(assert, env);
          } else if (drawer.option('openedStateMode') === 'push') {
            checkPush(assert, env);
          } else if (drawer.option('openedStateMode') === 'shrink') {
            checkShrink(assert, env);
          } else {
            assert.notOk('configuration is not tested');
          }
        },
        checkWhenPanelContentRendered: function(assert, drawer, drawerElement, panelTemplateElement) {
          var $__3 = drawerElement.getBoundingClientRect(),
              top = $__3.top,
              left = $__3.left,
              width = $__3.width,
              height = $__3.height;
          var expectedPanelRect = {
            top: top,
            left: left,
            width: width,
            height: height
          };
          var expectedViewRect = {
            top: top,
            left: left,
            width: width,
            height: height
          };
          if (drawer.option('minSize')) {
            expectedPanelRect.top = expectedPanelRect.height + drawer.option('minSize');
            expectedPanelRect.height = drawer.option('minSize');
            expectedViewRect.height -= drawer.option('minSize');
          }
          checkWhenPanelContentRendered(assert, drawer, drawerElement, panelTemplateElement, expectedPanelRect, expectedViewRect);
        }
      };
      drawerElementId = 'drawer1';
      drawerTesters = {
        drawerElementId: drawerElementId,
        markup: ("\n        <div id=\"" + drawerElementId + "\" style=\"background-color: blue; width: 200px; height: 100px\">\n            <div id=\"view\" style=\"width: 100%; height: 100%; background-color: yellow\">view</div>\n        </div>"),
        left: LeftDrawerTester,
        top: TopDrawerTester,
        right: RightDrawerTester,
        bottom: BottomDrawerTester
      };
      $__export("drawerTesters", drawerTesters);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=drawerHelpers.js.map