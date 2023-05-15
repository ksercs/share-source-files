!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/drawer.tests.js"], ["core/utils/size","animation/fx","animation/translator","generic_light.css!","core/config","core/utils/resize_callbacks","core/utils/type","core/utils/shadow_dom","events/core/events_engine","events/visibility_change","jquery","ui/button","ui/drawer","ui/drawer/ui.drawer.animation","ui/overlay/ui.overlay"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/drawer.tests.js", ["core/utils/size", "animation/fx", "animation/translator", "generic_light.css!", "core/config", "core/utils/resize_callbacks", "core/utils/type", "core/utils/shadow_dom", "events/core/events_engine", "events/visibility_change", "jquery", "ui/button", "ui/drawer", "ui/drawer/ui.drawer.animation", "ui/overlay/ui.overlay"], function($__export) {
  "use strict";
  var getHeight,
      getWidth,
      getOuterWidth,
      fx,
      translator,
      config,
      resizeCallbacks,
      typeUtils,
      addShadowDomStyles,
      eventsEngine,
      visibilityChange,
      $,
      Button,
      Drawer,
      animation,
      Overlay,
      DRAWER_WRAPPER_CLASS,
      DRAWER_PANEL_CONTENT_CLASS,
      DRAWER_VIEW_CONTENT_CLASS,
      DRAWER_SHADER_CLASS,
      position,
      mockFxAnimate,
      animationCapturing;
  return {
    setters: [function($__m) {
      getHeight = $__m.getHeight;
      getWidth = $__m.getWidth;
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      translator = $__m.default;
    }, function($__m) {}, function($__m) {
      config = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      visibilityChange = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Button = $__m.default;
    }, function($__m) {
      Drawer = $__m.default;
    }, function($__m) {
      animation = $__m.animation;
    }, function($__m) {
      Overlay = $__m.default;
    }],
    execute: function() {
      DRAWER_WRAPPER_CLASS = 'dx-drawer-wrapper';
      DRAWER_PANEL_CONTENT_CLASS = 'dx-drawer-panel-content';
      DRAWER_VIEW_CONTENT_CLASS = 'dx-drawer-content';
      DRAWER_SHADER_CLASS = 'dx-drawer-shader';
      position = function($element) {
        return $element.position().left;
      };
      mockFxAnimate = function(animations, type, output) {
        animations[type] = function(config) {
          var position = config.position || 0;
          var $element = config.$element;
          output.push({
            $element: $element,
            type: type,
            start: translator.locate($element).left,
            duration: config.duration,
            end: position
          });
          translator.move($element, {left: position});
          if (config.endAction) {
            config.endAction();
          }
        };
      };
      animationCapturing = {
        start: function() {
          this._capturedAnimations = [];
          this._animation = $.extend({}, animation);
          mockFxAnimate(animation, 'moveTo', this._capturedAnimations);
          return this._capturedAnimations;
        },
        teardown: function() {
          $.extend(animation, this._animation);
          delete this._capturedAnimations;
          delete this._animations;
        }
      };
      QUnit.testStart(function() {
        var markup = "\n    <style nonce=\"qunit-test\">\n        body {\n            margin: 0;\n        }\n        #drawerContainer {\n            width: 100px;\n        }\n    </style>\n\n    <div id=\"drawer\">\n        <div id=\"content\">Test Content</div>\n    </div>\n    <div id=\"drawerWithContent\">\n        <div id=\"content\"><div id=\"button\"></div></div>\n        <div id=\"additionalContent\"></div>\n    </div>\n    <div id=\"outerDrawer\">\n        <div id=\"innerDrawer\"></div>\n    </div>\n    <div id=\"drawerContainer\">\n        <div id=\"drawer2\"></div>\n    </div>\n        <div id=\"contentTemplate\">\n        <div data-options=\"dxTemplate: { name: 'customMenu' }\">\n            Test Menu Template\n        </div>\n            <div data-options=\"dxTemplate: { name: 'customContent' }\">\n            Test Content Template\n        </div>\n    </div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Drawer behavior', function() {
        QUnit.test('defaults', function(assert) {
          var $element = $('#drawer').dxDrawer({});
          var instance = $element.dxDrawer('instance');
          assert.equal(instance.option('revealMode'), 'slide', 'revealMode is OK');
          assert.equal(instance.option('openedStateMode'), 'shrink', 'mode is OK');
          assert.equal(instance.option('position'), 'left', 'position is OK');
          assert.equal(instance.option('shading'), false, 'shading is OK');
          assert.strictEqual(instance.option('minSize'), null, 'minSize is OK');
          assert.strictEqual(instance.option('maxSize'), null, 'maxSize is OK');
          assert.equal(instance.option('animationEnabled'), true, 'animationEnabled is OK');
          assert.equal(instance.option('animationDuration'), 400, 'animationDuration is OK');
        });
        QUnit.test('drawer should preserve content', function(assert) {
          var $content = $('#drawer #content');
          var $element = $('#drawer').dxDrawer();
          assert.equal($content[0], $element.find('#content')[0]);
        });
        QUnit.test('drawer shouldn\'t lose its content after repaint (T731771)', function(assert) {
          var $button = $('#button').dxButton();
          var $element = $('#drawerWithContent').dxDrawer();
          var instance = $element.dxDrawer('instance');
          instance.repaint();
          $button = $element.find('.dx-button');
          var buttonInstance = $button.dxButton('instance');
          assert.ok(buttonInstance instanceof Button, 'button into drawer content wasn\'t clean after repaint');
        });
        QUnit.test('drawer tabIndex should be removed after _clean', function(assert) {
          var $element = $('#drawer').dxDrawer();
          var instance = $element.dxDrawer('instance');
          instance._clean();
          assert.equal($element.attr('tabIndex'), undefined, 'tabIndex was removed');
        });
        QUnit.test('subscribe on toggle function should fired at the end of animation', function(assert) {
          var $element = $('#drawer').dxDrawer({opened: false});
          var instance = $element.dxDrawer('instance');
          var count = 0;
          var done = assert.async();
          instance.toggle().then(function() {
            count++;
            assert.equal(count, 1, 'callback not fired at animation start');
            done();
          });
          assert.equal(count, 0, 'callback not fired at animation start');
        });
        QUnit.test('Check dxresize event: opened:false,animationEnabled:true -> drawer.toggle()', function(assert) {
          var done = assert.async();
          var drawer = $('#drawer').dxDrawer({
            opened: false,
            animationEnabled: true,
            animationDuration: 1,
            width: 100,
            height: 50,
            template: function() {
              return $('<div>').css({
                width: '10px',
                height: '10px',
                backgroundColor: 'red'
              });
            }
          }).dxDrawer('instance');
          var triggerResizeEventInitial = visibilityChange.triggerResizeEvent;
          visibilityChange.triggerResizeEvent = function($element) {
            assert.ok(true, 'resize event call is expected');
            assert.equal($element, drawer.viewContent(), 'ViewContent element is expected');
            var rect = $(drawer.viewContent())[0].getBoundingClientRect();
            assert.strictEqual(rect.width, 90, 'ViewContent element width');
            assert.strictEqual(rect.height, 50, 'ViewContent element height');
            visibilityChange.triggerResizeEvent = triggerResizeEventInitial;
            done();
          };
          drawer.toggle();
        });
        QUnit.test('Check dxresize event: opened:false,animationEnabled:false -> drawer.toggle()', function(assert) {
          var drawer = $('#drawer').dxDrawer({
            opened: false,
            animationEnabled: false,
            width: 100,
            height: 50,
            template: function() {
              return $('<div>').css({
                width: '10px',
                height: '10px',
                backgroundColor: 'red'
              });
            }
          }).dxDrawer('instance');
          var triggerFunction = visibilityChange.triggerResizeEvent;
          try {
            visibilityChange.triggerResizeEvent = function($element) {
              assert.ok(true, 'resize event call is expected');
              assert.equal($element, drawer.viewContent(), 'ViewContent element is expected');
              var rect = $(drawer.viewContent())[0].getBoundingClientRect();
              assert.strictEqual(rect.width, 90, 'ViewContent element width');
              assert.strictEqual(rect.height, 50, 'ViewContent element height');
            };
            drawer.toggle();
          } finally {
            visibilityChange.triggerResizeEvent = triggerFunction;
          }
        });
        QUnit.test('dxresize event should be fired if there is no any animation', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: false,
            position: 'right'
          });
          var instance = $element.dxDrawer('instance');
          var triggerFunction = visibilityChange.triggerResizeEvent;
          assert.expect(2);
          try {
            visibilityChange.triggerResizeEvent = function($element) {
              assert.ok(true, 'event was triggered');
              assert.equal($element, instance.viewContent(), 'Event was triggered for right element');
            };
            instance.option('position', 'left');
          } finally {
            visibilityChange.triggerResizeEvent = triggerFunction;
          }
        });
        QUnit.test('incomplete animation should be stopped after toggling visibility', function(assert) {
          var origFxStop = fx.stop;
          var panelStopCalls = 0;
          var contentStopCalls = 0;
          var overlayContentStopCalls = 0;
          var shaderStopCalls = 0;
          var isJumpedToEnd = false;
          var $element = $('#drawer').dxDrawer({
            opened: false,
            openedStateMode: 'overlap',
            revealMode: 'expand',
            shading: true
          });
          var instance = $element.dxDrawer('instance');
          fx.stop = function($element, jumpToEnd) {
            if (jumpToEnd) {
              isJumpedToEnd = true;
            }
            if ($element.hasClass(DRAWER_PANEL_CONTENT_CLASS)) {
              panelStopCalls++;
            }
            if ($element.hasClass(DRAWER_VIEW_CONTENT_CLASS)) {
              contentStopCalls++;
            }
            if ($element.hasClass('dx-overlay-content')) {
              overlayContentStopCalls++;
            }
            if ($element.hasClass(DRAWER_SHADER_CLASS)) {
              shaderStopCalls++;
            }
          };
          try {
            fx.off = false;
            instance.toggle();
            instance.toggle();
            assert.equal(panelStopCalls, 2, 'animation should stops before toggling visibility');
            assert.equal(contentStopCalls, 2, 'animation should stops before toggling visibility');
            assert.equal(overlayContentStopCalls, 2, 'animation should stops before toggling visibility');
            assert.equal(shaderStopCalls, 2, 'animation should stops before toggling visibility');
            assert.notOk(isJumpedToEnd, 'elements aren\'t returned to the end position after animation stopping');
          } finally {
            fx.off = true;
            fx.stop = origFxStop;
          }
        });
        QUnit.test('incomplete animation should be stopped after closing on outside click', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            openedStateMode: 'overlap',
            closeOnOutsideClick: true,
            revealMode: 'expand',
            shading: true
          });
          var origFxStop = fx.stop;
          var panelStopCalls = 0;
          var contentStopCalls = 0;
          var overlayContentStopCalls = 0;
          var shaderStopCalls = 0;
          var isJumpedToEnd = false;
          var instance = $element.dxDrawer('instance');
          fx.stop = function($element, jumpToEnd) {
            if (jumpToEnd) {
              isJumpedToEnd = true;
            }
            if ($element.hasClass(DRAWER_PANEL_CONTENT_CLASS)) {
              panelStopCalls++;
            }
            if ($element.hasClass(DRAWER_VIEW_CONTENT_CLASS)) {
              contentStopCalls++;
            }
            if ($element.hasClass('dx-overlay-content')) {
              overlayContentStopCalls++;
            }
            if ($element.hasClass(DRAWER_SHADER_CLASS)) {
              shaderStopCalls++;
            }
          };
          try {
            fx.off = false;
            $(instance.viewContent()).trigger('dxclick');
            assert.equal(panelStopCalls, 2, 'animation should stops before closing');
            assert.equal(contentStopCalls, 2, 'animation should stops before closing');
            assert.equal(overlayContentStopCalls, 2, 'animation should stops before closing');
            assert.equal(shaderStopCalls, 2, 'animation should stops before closing');
            assert.notOk(isJumpedToEnd, 'elements aren\'t returned to the end position after animation stopping');
          } finally {
            fx.off = true;
            fx.stop = origFxStop;
          }
        });
        QUnit.test('incomplete animation should be stopped after changing modes', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            openedStateMode: 'push',
            animationDuration: 500,
            closeOnOutsideClick: true,
            revealMode: 'slide',
            shading: true
          });
          var origFxStop = fx.stop;
          var panelStopCalls = 0;
          var contentStopCalls = 0;
          var shaderStopCalls = 0;
          var isJumpedToEnd = false;
          var instance = $element.dxDrawer('instance');
          fx.stop = function($element, jumpToEnd) {
            isJumpedToEnd = jumpToEnd;
            if ($element.hasClass(DRAWER_PANEL_CONTENT_CLASS)) {
              panelStopCalls++;
            }
            if ($element.hasClass(DRAWER_VIEW_CONTENT_CLASS)) {
              contentStopCalls++;
            }
            if ($element.hasClass(DRAWER_SHADER_CLASS)) {
              shaderStopCalls++;
            }
          };
          try {
            fx.off = false;
            instance.option('openedStateMode', 'shrink');
            instance.option('revealMode', 'expand');
            assert.equal(panelStopCalls, 2, 'animation should stops before closing');
            assert.equal(contentStopCalls, 2, 'animation should stops before closing');
            assert.equal(shaderStopCalls, 2, 'animation should stops before closing');
            assert.ok(isJumpedToEnd, 'elements are returned to the end position after animation stopping');
          } finally {
            fx.off = true;
            fx.stop = origFxStop;
          }
        });
        QUnit.test('drawer shouldn\'t fail after changing openedStateMode', function(assert) {
          var $element = $('#drawer').dxDrawer({openedStateMode: 'push'});
          var instance = $element.dxDrawer('instance');
          instance.option('openedStateMode', 'shrink');
          instance.option('openedStateMode', 'overlap');
          assert.ok(true, 'Drawer works correctly');
        });
        QUnit.test('content() function', function(assert) {
          var $element = $('#drawer').dxDrawer({});
          var instance = $element.dxDrawer('instance');
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal(typeUtils.isRenderer(instance.content()), !!config().useJQuery, 'panel element');
          assert.equal($panel.get(0), $(instance.content()).get(0), 'content function return correct DOMNode');
        });
        QUnit.test('viewContent() function', function(assert) {
          var $element = $('#drawer').dxDrawer({});
          var instance = $element.dxDrawer('instance');
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          assert.equal($content.get(0), $(instance.viewContent()).get(0), 'content function return correct DOMNode');
        });
        QUnit.test('show() and hide() methods', function(assert) {
          var $element = $('#drawer').dxDrawer({});
          var instance = $element.dxDrawer('instance');
          instance.show();
          assert.equal(instance.option('opened'), true, 'panel was shown');
          instance.hide();
          assert.equal(instance.option('opened'), false, 'panel was hidden');
        });
        QUnit.test('toggle() method', function(assert) {
          var $element = $('#drawer').dxDrawer({});
          var instance = $element.dxDrawer('instance');
          var opened = instance.option('opened');
          instance.toggle();
          assert.equal(instance.option('opened'), !opened, 'panel was shown');
          instance.toggle();
          assert.equal(instance.option('opened'), opened, 'panel was hidden');
        });
        QUnit.test('wrapper content should be reversed if position = \'bottom\' or \'right\'', function(assert) {
          var $element = $('#drawer').dxDrawer({openedStateMode: 'shrink'});
          var instance = $element.dxDrawer('instance');
          instance.option('position', 'right');
          var $wrapper = $element.find('.dx-drawer-wrapper').eq(0);
          var $content = $wrapper.children();
          assert.ok($content.eq(1).hasClass('dx-drawer-panel-content'));
          assert.ok($content.eq(0).hasClass('dx-drawer-content'));
          instance.option('position', 'left');
          $content = $wrapper.children();
          assert.ok($content.eq(0).hasClass('dx-drawer-panel-content'));
          assert.ok($content.eq(1).hasClass('dx-drawer-content'));
        });
        QUnit.test('wrapper content should be reversed if position = \'right\' and openedStateMode is changed', function(assert) {
          var $element = $('#drawer').dxDrawer({
            openedStateMode: 'push',
            position: 'right'
          });
          var instance = $element.dxDrawer('instance');
          instance.option('openedStateMode', 'shrink');
          var $wrapper = $element.find('.dx-drawer-wrapper').eq(0);
          var $content = $wrapper.children();
          assert.ok($content.eq(1).hasClass('dx-drawer-panel-content'));
          assert.ok($content.eq(0).hasClass('dx-drawer-content'));
          instance.option('position', 'left');
          $content = $wrapper.children();
          assert.ok($content.eq(0).hasClass('dx-drawer-panel-content'));
          assert.ok($content.eq(1).hasClass('dx-drawer-content'));
        });
        QUnit.skip('drawer panel should be repositioned correctly after dimension changed,left position', function(assert) {
          fx.off = true;
          var $element = $('#drawer').dxDrawer({
            opened: false,
            revealMode: 'slide',
            openedStateMode: 'overlap',
            template: function($content) {
              var $div = $('<div/>');
              $div.css('height', 600);
              $div.css('width', 200);
              return $div;
            }
          });
          var $panelOverlayContent = $element.find('.dx-overlay-content');
          resizeCallbacks.fire();
          assert.equal($panelOverlayContent.position().left, 0, 'panel overlay content position is OK');
          fx.off = false;
        });
        QUnit.skip('drawer panel should be repositioned correctly after dimension changed,top position', function(assert) {
          fx.off = true;
          var $element = $('#drawer').dxDrawer({
            opened: false,
            position: 'top',
            revealMode: 'slide',
            openedStateMode: 'overlap',
            template: function($content) {
              var $div = $('<div/>');
              $div.css('height', 600);
              $div.css('width', 200);
              return $div;
            }
          });
          var $panelOverlayContent = $element.find('.dx-overlay-content');
          resizeCallbacks.fire();
          assert.equal($panelOverlayContent.position().top, 0, 'panel overlay content position is OK');
          fx.off = false;
        });
        QUnit.test('drawer panel should have correct size after dimension changed,top position', function(assert) {
          fx.off = true;
          var $element = $('#drawer').dxDrawer({
            opened: false,
            position: 'top',
            revealMode: 'expand',
            openedStateMode: 'overlap',
            template: function($content) {
              var $div = $('<div/>');
              $div.css('height', 600);
              $div.css('width', 200);
              return $div;
            }
          });
          var drawer = $element.dxDrawer('instance');
          var $panelOverlayContent = $element.find('.dx-overlay-content');
          resizeCallbacks.fire();
          drawer.toggle();
          assert.equal(getHeight($panelOverlayContent), 600, 'panel overlay height is OK');
          fx.off = false;
        });
        QUnit.test('drawer panel should be repositioned correctly after dimension changed, right position', function(assert) {
          fx.off = true;
          var $element = $('#drawer').dxDrawer({
            opened: false,
            position: 'right',
            revealMode: 'slide',
            openedStateMode: 'overlap',
            template: function($content) {
              var $div = $('<div/>');
              $div.css('height', 600);
              $div.css('width', 200);
              return $div;
            }
          });
          var instance = $element.dxDrawer('instance');
          var $panelOverlayContent = $element.find('.dx-overlay-content');
          resizeCallbacks.fire();
          instance.option('revealMode', 'expand');
          assert.equal($panelOverlayContent.css('left'), 'auto', 'panel overlay content position is OK');
          fx.off = false;
        });
        QUnit.skip('drawer panel should be repositioned after dimension changed, right position', function(assert) {
          fx.off = true;
          var $element = $('#drawer').dxDrawer({
            opened: false,
            revealMode: 'slide',
            position: 'right',
            openedStateMode: 'overlap',
            template: function($content) {
              var $div = $('<div/>');
              $div.css('height', 600);
              $div.css('width', 200);
              return $div;
            }
          });
          var $panelOverlayContent = $element.find('.dx-overlay-content');
          resizeCallbacks.fire();
          assert.equal($panelOverlayContent.position().left, -200, 'panel overlay content position is OK');
          fx.off = false;
        });
        QUnit.test('content container should have correct position if panel isn\'t visible', function(assert) {
          var $element = $('#drawer').dxDrawer({opened: false});
          var instance = $element.dxDrawer('instance');
          var $content = $(instance.viewContent());
          assert.equal(position($content), 0, 'container rendered at correct position');
        });
        QUnit.test('content container should have correct position if panel is visible', function(assert) {
          var $element = $('#drawer').dxDrawer({opened: true});
          var instance = $element.dxDrawer('instance');
          var $content = $(instance.viewContent());
          var $panel = $(instance.content());
          assert.equal(position($content), getWidth($panel), 'container rendered at correct position');
        });
        QUnit.test('content container should have correct position after resize', function(assert) {
          var $element = $('#drawer2').dxDrawer({
            width: '100%',
            opened: true
          });
          var instance = $element.dxDrawer('instance');
          var $content = $(instance.viewContent());
          var elementWidth = getWidth($element);
          $('#drawerContainer').width(elementWidth * 2);
          resizeCallbacks.fire();
          assert.equal(position($content), getWidth($(instance.content())), 'container rendered at correct position');
        });
        QUnit.test('content container should have correct position if it is rendered in invisible container', function(assert) {
          var $container = $('#drawerContainer');
          var $element = $('#drawer2');
          $container.detach();
          var instance = $element.dxDrawer({
            width: '100%',
            opened: true,
            maxSize: 50
          }).dxDrawer('instance');
          var $content = $(instance.viewContent());
          $container.appendTo('#qunit-fixture');
          $element.trigger('dxshown');
          assert.equal(position($content), 50, 'container rendered at correct position');
        });
        QUnit.test('drawer panel should have correct width when panel content is wrapped by div with borders (T702576)', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            template: function($content) {
              var $outerDiv = $('<div/>');
              $('<div/>').css('height', 600).css('width', 200).appendTo($outerDiv);
              return $outerDiv;
            }
          });
          var $panelContent = $element.find('.dx-drawer-panel-content').css('border', '10px solid black');
          resizeCallbacks.fire();
          assert.equal(getWidth($panelContent), 180, 'panel content has correct width');
          assert.equal(getOuterWidth($panelContent), 200, 'panel content has correct outerWidth');
        });
        QUnit.test('drawer panel should have correct width when async template is used', function(assert) {
          var clock = sinon.useFakeTimers();
          $('#drawer').dxDrawer({
            openedStateMode: 'push',
            templatesRenderAsynchronously: true,
            integrationOptions: {templates: {'panel': {render: function(args) {
                    var $div = $('<div/>').appendTo(args.container);
                    setTimeout(function() {
                      $div.css('height', 600);
                      $div.css('width', 200);
                      args.onRendered();
                    }, 100);
                  }}}}
          });
          clock.tick(100);
          var $panel = $('#drawer').find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal(getWidth($panel), 200, 'panel has correct size');
          clock.restore();
        });
        QUnit.test('drawer panel should have correct width when async template is used, overlap mode', function(assert) {
          var clock = sinon.useFakeTimers();
          $('#drawer').dxDrawer({
            openedStateMode: 'overlap',
            templatesRenderAsynchronously: true,
            integrationOptions: {templates: {'panel': {render: function(args) {
                    var $div = $('<div/>').appendTo(args.container);
                    setTimeout(function() {
                      $div.css('height', 600);
                      $div.css('width', 200);
                      args.onRendered();
                    }, 100);
                  }}}}
          });
          clock.tick(100);
          var $panelOverlayContent = $('#drawer').find('.dx-overlay-content');
          assert.equal(getWidth($panelOverlayContent), 200, 'panel has correct size');
          clock.restore();
        });
        QUnit.test('drawer panel should have correct z-index when async template is used, overlap mode', function(assert) {
          var clock = sinon.useFakeTimers();
          $('#drawer').dxDrawer({
            openedStateMode: 'overlap',
            templatesRenderAsynchronously: true,
            opened: true,
            shading: true,
            integrationOptions: {templates: {'panel': {render: function(args) {
                    var $div = $('<div/>').appendTo(args.container);
                    setTimeout(function() {
                      $div.css('height', 600);
                      $div.css('width', 200);
                      args.onRendered();
                    }, 100);
                  }}}}
          });
          clock.tick(100);
          var $panel = $('#drawer').find(("." + DRAWER_PANEL_CONTENT_CLASS));
          assert.equal($panel.css('zIndex'), 1501, 'panel has correct zIndex');
          clock.restore();
        });
        QUnit.test('shader should have correct zIndex in overlap mode', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            openedStateMode: 'overlap',
            shading: true
          });
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          assert.equal($shader.css('zIndex'), 1500, 'shader has correct zIndex');
        });
        QUnit.test('drawer panel should have correct margin when async template is used', function(assert) {
          var clock = sinon.useFakeTimers();
          $('#drawer').dxDrawer({
            openedStateMode: 'shrink',
            templatesRenderAsynchronously: true,
            opened: true,
            integrationOptions: {templates: {'panel': {render: function(args) {
                    var $div = $('<div/>').appendTo(args.container);
                    setTimeout(function() {
                      $div.css('height', 600);
                      $div.css('width', 200);
                      args.onRendered();
                    }, 100);
                  }}}}
          });
          clock.tick(100);
          var $panel = $('#drawer').find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($panel.css('marginLeft'), '0px', 'panel has correct margin');
          clock.restore();
        });
        QUnit.test('getting real panel position in accordance with rtlEnabled and position options', function(assert) {
          var $element = $('#drawer').dxDrawer({position: 'after'});
          var instance = $element.dxDrawer('instance');
          assert.equal(instance.calcTargetPosition(), 'right');
          instance.option('position', 'before');
          assert.equal(instance.calcTargetPosition(), 'left');
          instance.option('rtlEnabled', true);
          assert.equal(instance.calcTargetPosition(), 'right');
          instance.option('position', 'after');
          assert.equal(instance.calcTargetPosition(), 'left');
        });
      });
      QUnit.module('Drawer view template', function() {
        function getNestedElements() {
          var wrapperElement = $(("." + DRAWER_WRAPPER_CLASS));
          var panelElement = $(("." + DRAWER_PANEL_CONTENT_CLASS));
          var viewContentElement = $(("." + DRAWER_VIEW_CONTENT_CLASS));
          var shaderElement = $(("." + DRAWER_SHADER_CLASS));
          var firstViewContentNestedElement = $('#button');
          var secondViewContentNestedElement = $('#additionalContent');
          return {
            wrapperElement: wrapperElement,
            panelElement: panelElement,
            viewContentElement: viewContentElement,
            shaderElement: shaderElement,
            firstViewContentNestedElement: firstViewContentNestedElement,
            secondViewContentNestedElement: secondViewContentNestedElement
          };
        }
        function checkNestedElements(assert, nestedElements) {
          assert.strictEqual(nestedElements.wrapperElement.length, 1, 'wrapperElement.length');
          assert.strictEqual(nestedElements.panelElement.length, 1, 'panelElement.length');
          assert.strictEqual(nestedElements.viewContentElement.length, 1, 'viewContentElement.length');
          assert.strictEqual(nestedElements.shaderElement.length, 1, 'wrappershaderElementElement.length');
          assert.strictEqual(nestedElements.firstViewContentNestedElement.length, 1, 'firstViewContentNestedElement.length');
          assert.strictEqual(nestedElements.secondViewContentNestedElement.length, 1, 'secondViewContentNestedElement.length');
        }
        function checkNodeEquals(assert, nestedElementsAfterRepaint, nestedElements) {
          assert.strictEqual(nestedElementsAfterRepaint.wrapperElement[0].isSameNode(nestedElements.wrapperElement[0]), true, 'the same wrapperElement');
          assert.strictEqual(nestedElementsAfterRepaint.viewContentElement[0].isSameNode(nestedElements.viewContentElement[0]), true, 'the same viewContentElement');
          assert.strictEqual(nestedElementsAfterRepaint.shaderElement[0].isSameNode(nestedElements.shaderElement[0]), true, 'the same shaderElement');
          assert.strictEqual(nestedElementsAfterRepaint.secondViewContentNestedElement[0].isEqualNode(nestedElements.secondViewContentNestedElement[0]), true, 'the same secondViewContentNestedElement');
        }
        QUnit.test('Drawer + template in markup with button -> repaint() method does not duplicate the content(T864419)', function(assert) {
          var nestedButtonClickHandler = sinon.stub();
          var drawerElement = $('#drawerWithContent').get(0);
          var buttonElement = $('#button').get(0);
          new Button(buttonElement, {
            text: 'innerButton',
            onClick: nestedButtonClickHandler
          });
          var drawer = new Drawer(drawerElement, {});
          var nestedElements = getNestedElements();
          checkNestedElements(assert, nestedElements);
          eventsEngine.trigger(buttonElement, 'dxclick');
          assert.strictEqual(nestedButtonClickHandler.callCount, 1, 'buttonClickHandler.callCount');
          assert.strictEqual($(buttonElement).dxButton('instance') instanceof Button, true, 'button.instance');
          drawer.repaint();
          nestedButtonClickHandler.reset();
          var nestedElementsAfterRepaint = getNestedElements();
          buttonElement = nestedElementsAfterRepaint.firstViewContentNestedElement;
          eventsEngine.trigger(buttonElement, 'dxclick');
          checkNestedElements(assert, nestedElementsAfterRepaint);
          assert.strictEqual(nestedButtonClickHandler.callCount, 1, 'buttonClickHandler.callCount');
          assert.strictEqual($(buttonElement).dxButton('instance') instanceof Button, true, 'button.instance');
          checkNodeEquals(assert, nestedElementsAfterRepaint, nestedElements);
        });
      });
      QUnit.module('Animation', {
        beforeEach: function() {
          this.capturedAnimations = animationCapturing.start();
        },
        afterEach: function() {
          animationCapturing.teardown();
        }
      }, function() {
        QUnit.test('animationEnabled option test', function(assert) {
          fx.off = false;
          var origFX = fx.animate;
          var animated = false;
          fx.animate = function() {
            animated = true;
            return Promise.resolve();
          };
          try {
            var $drawer = $('#drawer').dxDrawer({
              opened: true,
              animationEnabled: false
            });
            var drawer = $drawer.dxDrawer('instance');
            drawer.option('opened', false);
            assert.equal(animated, false, 'animation was not present');
            drawer.option('animationEnabled', true);
            drawer.option('opened', true);
            assert.equal(animated, true, 'animation present');
          } finally {
            fx.animate = origFX;
          }
        });
        QUnit.test('animationDuration option test', function(assert) {
          var $drawer = $('#drawer').dxDrawer({
            opened: false,
            animationEnabled: true,
            openedStateMode: 'push'
          });
          var drawer = $drawer.dxDrawer('instance');
          drawer.option('animationDuration', 300);
          drawer.toggle();
          assert.equal(this.capturedAnimations[0].duration, 300, 'duration is correct');
          drawer.option('animationDuration', 10000);
          drawer.toggle();
          assert.equal(this.capturedAnimations[1].duration, 10000, 'duration is correct');
        });
      });
      QUnit.module('Shader', function() {
        QUnit.test('shader should be visible if drawer is opened and shading = true', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            shading: true
          });
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          assert.ok($shader.is(':visible'), 'shader is visible');
        });
        QUnit.test('shader should not be visible if drawer is closed', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: false,
            shading: true
          });
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          assert.ok($shader.is(':hidden'), 'shader is hidden');
          assert.equal($shader.css('visibility'), 'hidden', 'shader is hidden');
        });
        QUnit.test('shader should have correct visibility after toggling state', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            shading: true,
            animationEnabled: false
          });
          var instance = $element.dxDrawer('instance');
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          instance.toggle();
          assert.ok($shader.is(':hidden'), 'shader is hidden');
          assert.equal($shader.css('visibility'), 'hidden', 'shader is hidden');
        });
        QUnit.test('shader should have correct opacity after toggling state', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            shading: true,
            animationEnabled: false
          });
          var instance = $element.dxDrawer('instance');
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          assert.equal($shader.css('opacity'), 1, 'shader has right opacity');
          instance.toggle();
          assert.equal($shader.css('opacity'), 0, 'shader has right opacity');
        });
        QUnit.test('shading option', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            shading: true
          });
          var instance = $element.dxDrawer('instance');
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          assert.ok($shader.is(':visible'), 'shader is visible');
          instance.option('shading', false);
          assert.ok($shader.is(':hidden'), 'shader is hidden');
        });
        QUnit.test('click on shader should not close drawer', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            shading: true
          });
          var instance = $element.dxDrawer('instance');
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          $shader.trigger('dxclick');
          assert.ok(instance.option('opened'), 'drawer is opened');
        });
        QUnit.test('shader should be visible during animation', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: false,
            shading: true
          });
          var instance = $element.dxDrawer('instance');
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          instance.show();
          assert.ok($shader.is(':visible'), 'shader is visible during animation');
        });
        QUnit.test('shader should have correct position', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            shading: true
          });
          var instance = $element.dxDrawer('instance');
          var $content = $(instance.viewContent());
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          assert.equal($shader.offset().left, $content.offset().left, 'shader has correct position');
        });
        QUnit.test('shader should have correct position after widget resize', function(assert) {
          var $element = $('#drawer2').dxDrawer({
            width: '100%',
            opened: true,
            shading: true
          });
          var instance = $element.dxDrawer('instance');
          var $content = $(instance.viewContent());
          var $shader = $element.find('.' + DRAWER_SHADER_CLASS);
          var panelWidth = getWidth($(instance.content()));
          $('#drawerContainer').width(panelWidth * 2);
          resizeCallbacks.fire();
          assert.equal($shader.offset().left, $content.offset().left, 'shader has correct position');
        });
      });
      QUnit.module('Rtl', function() {
        QUnit.test('content should have correct position if panel is visible in rtl mode', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            openedStateMode: 'push',
            rtlEnabled: true
          });
          var instance = $element.dxDrawer('instance');
          var $content = $(instance.viewContent());
          var $panel = $(instance.content());
          assert.equal(position($content), getWidth($panel), 'container rendered at correct position');
        });
        QUnit.test('drawer panel overlay should have right position config', function(assert) {
          var drawer = $('#drawer').dxDrawer({
            openedStateMode: 'overlap',
            rtlEnabled: true
          }).dxDrawer('instance');
          var overlay = drawer.getOverlay();
          assert.equal(overlay.option('position').my, 'top left');
          assert.equal(overlay.option('position').at, 'top left');
          drawer.option('position', 'right');
          overlay = drawer.getOverlay();
          assert.equal(overlay.option('position').my, 'top left');
          assert.equal(overlay.option('position').at, 'top right');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in overlap mode rtl, slide', function(assert) {
          fx.off = true;
          var drawer = $('#drawer').dxDrawer({
            openedStateMode: 'overlap',
            minSize: 50,
            maxSize: 300,
            opened: false,
            width: 500,
            revealMode: 'slide',
            rtlEnabled: true,
            template: function($content) {
              var $div = $('<div/>');
              $div.css('height', 600);
              $div.css('width', 200);
              return $div;
            }
          }).dxDrawer('instance');
          var $panel = $('.dx-drawer-panel-content.dx-overlay').eq(0);
          assert.equal($panel.position().left, -150, 'panel has correct left when minSize and max size are set');
          drawer.toggle();
          assert.equal($panel.position().left, 100, 'panel has correct left when minSize and max size are set');
          fx.off = false;
        });
        QUnit.test('wrapper content should be reversed if position = \'right\' and openedStateMode is changed, rtl', function(assert) {
          var $element = $('#drawer').dxDrawer({
            openedStateMode: 'push',
            rtlEnabled: true,
            position: 'left'
          });
          var instance = $element.dxDrawer('instance');
          instance.option('openedStateMode', 'shrink');
          var $wrapper = $element.find('.dx-drawer-wrapper').eq(0);
          var $content = $wrapper.children();
          assert.ok($content.eq(1).hasClass('dx-drawer-panel-content'));
          assert.ok($content.eq(0).hasClass('dx-drawer-content'));
          instance.option('position', 'right');
          $content = $wrapper.children();
          assert.ok($content.eq(0).hasClass('dx-drawer-panel-content'));
          assert.ok($content.eq(1).hasClass('dx-drawer-content'));
        });
      });
      QUnit.module('CloseOnOutsideClick', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          this.clock = undefined;
        }
      }, function() {
        QUnit.test('drawer should be hidden after click on content', function(assert) {
          var clock = sinon.useFakeTimers();
          var drawer = $('#drawer').dxDrawer({
            closeOnOutsideClick: false,
            opened: true,
            shading: true,
            animationDuration: 0
          }).dxDrawer('instance');
          var $content = drawer.viewContent();
          $($content).trigger('dxclick');
          assert.equal(drawer.option('opened'), true, 'drawer is not hidden');
          drawer.option('closeOnOutsideClick', true);
          var $shader = drawer.$element().find('.' + DRAWER_SHADER_CLASS);
          $($content).trigger('dxclick');
          clock.tick(10);
          assert.equal(drawer.option('opened'), false, 'drawer is hidden');
          assert.ok($shader.is(':hidden'), 'shader is hidden');
        });
        QUnit.test('closeOnOutsideClick as function should be processed correctly', function(assert) {
          var drawer = $('#drawer').dxDrawer({
            closeOnOutsideClick: function() {
              return false;
            },
            opened: true
          }).dxDrawer('instance');
          var $content = drawer.viewContent();
          $($content).trigger('dxclick');
          assert.equal(drawer.option('opened'), true, 'drawer is not hidden');
          drawer.option('closeOnOutsideClick', function() {
            return true;
          });
          $($content).trigger('dxclick');
          assert.equal(drawer.option('opened'), false, 'drawer is hidden');
        });
      });
      QUnit.module('Push mode', {
        beforeEach: function() {
          this.createInstance = function(options) {
            this.instance = $('#drawer').dxDrawer($.extend(options, {
              openedStateMode: 'push',
              template: function($content) {
                var $div = $('<div/>');
                $div.css('height', 200);
                $div.css('width', 300);
                return $div;
              }
            })).dxDrawer('instance');
          };
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('minSize and maxSize should be rendered correctly in push mode', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 400,
            opened: true
          });
          var $content = this.instance.$element().find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          assert.equal($content.position().left, 400, 'content has correct left when minSize and maxSize are set');
          this.instance.toggle();
          assert.equal($content.position().left, 50, 'content has correct left when minSize and maxSize are set');
        });
        QUnit.test('drawer should be rendered correctly in push mode, right panel position', function(assert) {
          this.createInstance({
            position: 'right',
            opened: true
          });
          var $content = this.instance.$element().find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          assert.equal($content.position().left, -300, 'content has correct left');
          this.instance.toggle();
          assert.equal($content.position().left, 0, 'content has correct left');
          fx.off = false;
        });
        QUnit.test('minSize and maxSize should be rendered correctly in push mode, right panel position', function(assert) {
          this.createInstance({
            position: 'right',
            minSize: 50,
            maxSize: 400,
            opened: true
          });
          var $content = this.instance.$element().find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          assert.equal($content.position().left, -400, 'content has correct left when minSize and maxSize are set');
          this.instance.toggle();
          assert.equal($content.position().left, -50, 'content has correct left when minSize and maxSize are set');
          fx.off = false;
        });
        QUnit.test('minSize and maxSize should be rendered correctly in push mode, top panel position', function(assert) {
          this.createInstance({
            position: 'top',
            minSize: 50,
            maxSize: 400,
            opened: true
          });
          var $content = this.instance.$element().find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          assert.equal($content.position().top, 400, 'content has correct top when minSize and maxSize are set');
          this.instance.toggle();
          assert.equal($content.position().top, 50, 'content has correct top when minSize and maxSize are set');
          fx.off = false;
        });
        QUnit.test('minSize and maxSize should be rendered correctly in push mode, bottom panel position', function(assert) {
          this.createInstance({
            position: 'bottom',
            minSize: 50,
            maxSize: 400,
            opened: true
          });
          var $content = this.instance.$element().find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          assert.equal($content.position().top, -400, 'content has correct top when minSize and maxSize are set');
          this.instance.toggle();
          assert.equal($content.position().top, -50, 'content has correct top when minSize and maxSize are set');
          fx.off = false;
        });
      });
      QUnit.module('Shrink mode', {
        beforeEach: function() {
          this.createInstance = function(options) {
            this.instance = $('#drawer').dxDrawer($.extend(options, {
              openedStateMode: 'shrink',
              contentTemplate: 'contentTemplate',
              width: 800,
              template: function($content) {
                var $div = $('<div/>');
                $div.css('height', 200);
                $div.css('width', 300);
                return $div;
              }
            })).dxDrawer('instance');
          };
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('minSize and maxSize should be rendered correctly in shrink mode, expand', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 100,
            opened: false,
            revealMode: 'expand'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($content.position().left, 50, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 0, 'panel has correct left when minSize is set');
          assert.equal(getWidth($panel), 50, 'panel has correct width when minSize is set');
          this.instance.toggle();
          assert.equal($content.position().left, 100, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 0, 'panel has correct left when minSize is set');
          assert.equal(getWidth($panel), 100, 'panel has correct width when minSize is set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in shrink mode, slide', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 200,
            opened: false,
            revealMode: 'slide'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($panel.css('marginLeft'), '-250px', 'panel has correct margin when minSize is set');
          assert.equal($content.position().left, 50, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 0, 'panel has correct left when minSize is set');
          assert.equal(getWidth($panel), 300, 'panel has correct width when minSize is set');
          this.instance.toggle();
          assert.equal($panel.css('marginLeft'), '-100px', 'panel has correct margin when minSize is set');
          assert.equal($content.position().left, 200, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 0, 'panel has correct left when minSize is set');
          assert.equal(getWidth($panel), 300, 'panel has correct width when minSize is set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in shrink mode, right panel position expand', function(assert) {
          this.createInstance({
            position: 'right',
            minSize: 50,
            maxSize: 100,
            opened: false,
            revealMode: 'expand'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($content.position().left, 0, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 750, 'panel has correct left when minSize is set');
          assert.equal(getWidth($panel), 50, 'panel has correct width when minSize is set');
          this.instance.toggle();
          assert.equal($content.position().left, 0, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 700, 'panel has correct left when minSize is set');
          assert.equal(getWidth($panel), 100, 'panel has correct width when minSize is set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in shrink mode, right panel position slide', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 200,
            opened: false,
            revealMode: 'slide',
            position: 'right'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($panel.css('marginRight'), '-250px', 'panel has correct margin when minSize is set');
          assert.equal($content.position().left, 0, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 750, 'panel has correct left when minSize is set');
          assert.equal(getWidth($panel), 300, 'panel has correct width when minSize is set');
          this.instance.toggle();
          assert.equal($panel.css('marginRight'), '-100px', 'panel has correct margin when minSize is set');
          assert.equal($content.position().left, 0, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 600, 'panel has correct left when minSize is set');
          assert.equal(getWidth($panel), 300, 'panel has correct width when minSize is set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in shrink mode, top panel position expand', function(assert) {
          this.createInstance({
            position: 'top',
            minSize: 50,
            maxSize: 100,
            opened: false,
            revealMode: 'expand'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($content.position().top, 50, 'content has correct top');
          assert.equal($panel.position().top, 0, 'panel has correct top');
          assert.equal(getHeight($panel), 50, 'panel has correct height');
          this.instance.toggle();
          assert.equal($content.position().top, 100, 'content has correct top');
          assert.equal($panel.position().top, 0, 'panel has correct top');
          assert.equal(getHeight($panel), 100, 'panel has correct height');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in shrink mode, top panel position slide', function(assert) {
          this.createInstance({
            position: 'top',
            minSize: 50,
            maxSize: 100,
            opened: false,
            revealMode: 'slide'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($content.position().top, 50, 'content has correct top');
          assert.equal($panel.position().top, 0, 'panel has correct top');
          assert.equal(getHeight($panel), 200, 'panel has correct height');
          assert.equal($panel.css('marginTop'), '-150px', 'panel content has correct marginTop');
          this.instance.toggle();
          assert.equal($content.position().top, 100, 'content has correct top');
          assert.equal($panel.position().top, 0, 'panel has correct top when');
          assert.equal(getHeight($panel), 200, 'panel has correct height when');
          assert.equal($panel.css('marginTop'), '-100px', 'panel content has correct marginTop');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in shrink mode, bottom panel position expand', function(assert) {
          this.createInstance({
            position: 'bottom',
            minSize: 50,
            maxSize: 100,
            opened: false,
            revealMode: 'expand'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($content.position().top, 0, 'content has correct top');
          assert.equal($panel.position().top, 950, 'panel has correct top');
          assert.equal(getHeight($panel), 50, 'panel has correct height');
          this.instance.toggle();
          assert.equal($content.position().top, 0, 'content has correct top');
          assert.equal($panel.position().top, 900, 'panel has correct top');
          assert.equal(getHeight($panel), 100, 'panel has correct height');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in shrink mode, bottom panel position slide', function(assert) {
          this.createInstance({
            position: 'bottom',
            minSize: 50,
            maxSize: 100,
            opened: false,
            revealMode: 'slide'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($content.position().top, 0, 'content has correct top');
          assert.equal($panel.position().top, 950, 'panel has correct top');
          assert.equal(getHeight($panel), 200, 'panel has correct height');
          assert.equal($panel.css('marginBottom'), '-150px', 'panel content has correct marginBottom');
          this.instance.toggle();
          assert.equal($content.position().top, 0, 'content has correct top');
          assert.equal($panel.position().top, 900, 'panel has correct top when');
          assert.equal(getHeight($panel), 200, 'panel has correct height when');
          assert.equal($panel.css('marginBottom'), '-100px', 'panel content has correct marginBottom');
        });
        QUnit.test('panel should have correct width in shrink mode after drawer resizing, expand', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 100,
            opened: false,
            revealMode: 'expand'
          });
          var $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal(getWidth($panel), 50, 'panel has correct width when minSize is set');
          resizeCallbacks.fire();
          assert.equal(getWidth($panel), 50, 'panel has correct width when minSize is set');
        });
        QUnit.test('panel should have correct height in shrink mode after drawer resizing, expand', function(assert) {
          this.createInstance({
            position: 'top',
            minSize: 50,
            maxSize: 100,
            opened: false,
            revealMode: 'expand',
            width: 800
          });
          var $element = this.instance.$element();
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal(getHeight($panel), 50, 'panel has correct height when minSize is set');
          resizeCallbacks.fire();
          assert.equal(getHeight($panel), 50, 'panel has correct height when minSize is set');
        });
      });
      QUnit.module('Overlap mode', {
        beforeEach: function() {
          this.createInstance = function(options) {
            this.instance = $('#drawer').dxDrawer($.extend({
              openedStateMode: 'overlap',
              contentTemplate: 'contentTemplate',
              width: 800,
              template: function($content) {
                return $('<div id="myElement1"/>').css({
                  height: 200,
                  width: 300
                });
              }
            }, options)).dxDrawer('instance');
          };
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('drawer panel should be overlay in overlap mode', function(assert) {
          this.createInstance({});
          assert.ok(this.instance.getOverlay() instanceof Overlay, 'Drawer has overlay');
          assert.ok($(this.instance.content()).hasClass('dx-overlay'), 'Panel content is an overlay');
        });
        [true, false].forEach(function(shading) {
          [true, false].forEach(function(isOpened) {
            [0, 100, null, undefined].forEach(function(minSize) {
              QUnit.test(("overlay configuration: opened- " + isOpened + ", shading- " + shading + ", minSize-" + minSize), function(assert) {
                this.createInstance({
                  shading: shading,
                  opened: isOpened,
                  minSize: minSize,
                  template: function($content) {
                    var $div = $('<div/>').css({
                      height: 200,
                      width: 300
                    });
                    return $('<div/>').append($div);
                  }
                });
                var overlay = this.instance.getOverlay();
                assert.equal(overlay.option('shading'), false, 'overlay.shading');
                assert.equal(overlay.option('container'), this.instance.content());
                assert.equal(overlay.option('width'), isOpened ? 300 : minSize || 0);
                assert.equal(overlay.option('position').my, 'top left');
                assert.equal(overlay.option('position').at, 'top left');
                this.instance.option('position', 'right');
                overlay = this.instance.getOverlay();
                assert.equal(overlay.option('position').my, 'top right');
                assert.equal(overlay.option('position').at, 'top right');
                this.instance.option('position', 'top');
                overlay = this.instance.getOverlay();
                assert.equal(overlay.option('position').my, 'top');
                assert.equal(overlay.option('position').at, 'top');
                this.instance.option('position', 'bottom');
                overlay = this.instance.getOverlay();
                assert.equal(overlay.option('position').my, 'bottom');
                assert.equal(overlay.option('position').at, 'bottom');
              });
            });
          });
        });
        QUnit.test('minSize and maxSize should be rendered correctly in overlap mode, expand', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 300,
            opened: false,
            revealMode: 'expand'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          var $overlayContent = $('#myElement1').parent().eq(0);
          assert.equal($content.position().left, 0, 'content has correct left when minSize and max size are set');
          assert.equal($content.css('paddingLeft'), '50px', 'content has correct padding when minSize and max size are set');
          assert.equal($panel.position().left, 0, 'panel has correct left when minSize and max size are set');
          assert.equal(getWidth($overlayContent), 50, 'panel content has correct width when minSize and max size are set');
          this.instance.toggle();
          assert.equal($content.position().left, 0, 'content has correct left when minSize and max size are set');
          assert.equal($content.css('paddingLeft'), '50px', 'content has correct padding when minSize and max size are set');
          assert.equal($panel.position().left, 0, 'panel has correct left when minSize and max size are set');
          assert.equal(getWidth($overlayContent), 300, 'panel content has correct width when minSize and max size are set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in overlap mode, slide', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 300,
            opened: false,
            revealMode: 'slide'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $('.dx-drawer-panel-content.dx-overlay').eq(0);
          var $overlayContent = $('#myElement1').parent().eq(0);
          assert.equal($content.position().left, 0, 'content has correct left when minSize and max size are set');
          assert.equal($panel.position().left, -250, 'panel has correct left when minSize and max size are set');
          assert.equal(getWidth($overlayContent), 300, 'panel has correct width when minSize and max size are set');
          this.instance.toggle();
          assert.equal($content.position().left, 0, 'content has correct left when minSize and max size are set');
          assert.equal($panel.position().left, 0, 'panel has correct left when minSize and max size are set');
          assert.equal(getWidth($overlayContent), 300, 'panel has correct width when minSize and max size are set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in overlap mode, right panel position expand', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 300,
            opened: false,
            revealMode: 'expand',
            position: 'right'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $element.find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          var $overlayContent = $('#myElement1').parent().eq(0);
          assert.equal($content.position().left, 0, 'content has correct left when minSize and max size are set');
          assert.equal($content.css('paddingRight'), '50px', 'content has correct padding when minSize and max size are set');
          assert.equal($panel.position().left, 800, 'panel has correct left when minSize and max size are set');
          assert.equal(getWidth($overlayContent), 50, 'panel content has correct width when minSize and max size are set');
          this.instance.toggle();
          assert.equal($content.position().left, 0, 'content has correct left when minSize and max size are set');
          assert.equal($content.css('paddingRight'), '50px', 'content has correct padding when minSize and max size are set');
          assert.equal($panel.position().left, 800, 'panel has correct left when minSize and max size are set');
          assert.equal(getWidth($overlayContent), 300, 'panel content has correct width when minSize and max size are set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in overlap mode, right panel position slide', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 300,
            opened: false,
            revealMode: 'slide',
            position: 'right'
          });
          var $element = this.instance.$element();
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $('.dx-drawer-panel-content.dx-overlay').eq(0);
          var $overlayContent = $('#myElement1').parent().eq(0);
          assert.equal($content.position().left, 0, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 1050, 'panel has correct left when minSize is set');
          assert.equal(getWidth($overlayContent), 300, 'panel has correct width when minSize is set');
          this.instance.toggle();
          assert.equal($content.position().left, 0, 'content has correct left when minSize is set');
          assert.equal($panel.position().left, 800, 'panel has correct left when minSize is set');
          assert.equal(getWidth($overlayContent), 300, 'panel has correct width when minSize is set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in overlap mode, top panel position expand', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 300,
            opened: false,
            revealMode: 'expand',
            position: 'top'
          });
          var $element = this.instance.$element();
          var $panel = $('.dx-drawer-panel-content.dx-overlay').eq(0);
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panelContent = $panel.find('.dx-overlay-content');
          assert.equal(getHeight($panelContent), 50, 'panel content has correct height when minSize is set');
          assert.equal($content.css('paddingTop'), '50px', 'content has correct padding when minSize and max size are set');
          this.instance.toggle();
          assert.equal(getHeight($panelContent), 300, 'panel content has correct height when minSize is set');
          assert.equal($content.css('paddingTop'), '50px', 'content has correct padding when minSize and max size are set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in overlap mode, top panel position slide', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 300,
            opened: false,
            revealMode: 'slide',
            position: 'top'
          });
          var $content = this.instance.$element().find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $('.dx-drawer-panel-content.dx-overlay').eq(0);
          assert.equal($content.position().top, 0, 'content has correct top when minSize is set');
          assert.equal($panel.position().top, -150, 'panel has correct top when minSize is set');
          this.instance.toggle();
          assert.equal($content.position().top, 0, 'content has correct top when minSize is set');
          assert.equal($panel.position().top, 100, 'panel has correct top when minSize is set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in overlap mode, bottom panel position expand', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 300,
            opened: false,
            revealMode: 'expand',
            position: 'bottom'
          });
          var $element = this.instance.$element();
          var $panel = $('.dx-drawer-panel-content.dx-overlay').eq(0);
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panelContent = $panel.find('.dx-overlay-content');
          assert.equal(getHeight($panelContent), 50, 'panel content has correct height when minSize is set');
          assert.equal($panelContent.css('marginTop'), '150px', 'panel content has correct margin when minSize is set');
          assert.equal($content.css('paddingBottom'), '50px', 'content has correct padding when minSize and max size are set');
          this.instance.toggle();
          assert.equal(getHeight($panelContent), 300, 'panel content has correct height when minSize is set');
          assert.equal($panelContent.css('marginTop'), '-100px', 'panel content has correct margin when minSize is set');
          assert.equal($content.css('paddingBottom'), '50px', 'content has correct padding when minSize and max size are set');
        });
        QUnit.test('minSize and maxSize should be rendered correctly in overlap mode, bottom panel position slide', function(assert) {
          this.createInstance({
            minSize: 50,
            maxSize: 300,
            opened: false,
            revealMode: 'slide',
            position: 'bottom'
          });
          var $content = this.instance.$element().find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          var $panel = $('.dx-drawer-panel-content.dx-overlay').eq(0);
          assert.equal($content.position().top, 0, 'content has correct top when minSize is set');
          assert.equal($panel.position().top, 150, 'panel has correct top when minSize is set');
          this.instance.toggle();
          assert.equal($content.position().top, 0, 'content has correct top when minSize is set');
          assert.equal($panel.position().top, -100, 'panel has correct top when minSize is set');
        });
        QUnit.test('nested drawers. Inner drawer should have right overflow', function(assert) {
          $('#outerDrawer').dxDrawer({
            opened: true,
            height: 400
          });
          $('#innerDrawer').dxDrawer({
            openedStateMode: 'overlap',
            opened: true,
            height: 400
          });
          assert.equal($('#innerDrawer').find('.dx-overlay').eq(0).css('overflow'), 'visible', 'Panel overlay is visible');
          assert.equal($('#innerDrawer').find('.dx-overlay-wrapper').eq(0).css('overflow'), 'visible', 'Panel overlay wrapper is visible');
        });
      });
      QUnit.module('Modes changing', {
        beforeEach: function() {
          this.createInstance = function(options) {
            this.instance = $('#drawer').dxDrawer($.extend(options, {template: function($content) {
                var $div = $('<div/>');
                $div.css('height', 200);
                $div.css('width', 300);
                return $div;
              }})).dxDrawer('instance');
          };
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('panel should be rendered correctly after openedStateMode changing', function(assert) {
          this.createInstance({
            maxSize: 300,
            opened: false,
            revealMode: 'expand',
            openedStateMode: 'shrink'
          });
          this.instance.option('openedStateMode', 'push');
          var $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal(getWidth($panel), 300, 'panel has correct size');
          this.instance.toggle();
          assert.equal(getWidth($panel), 300, 'panel has correct size');
        });
        QUnit.test('panel should be rendered correctly after openedStateMode changing, right panel position, slide', function(assert) {
          this.createInstance({
            maxSize: 300,
            opened: true,
            revealMode: 'slide',
            position: 'right',
            openedStateMode: 'shrink'
          });
          this.instance.option('openedStateMode', 'push');
          var $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($panel.css('right'), '0px', 'panel has correct right');
          assert.equal($panel.position().left, 700, 'panel has correct left');
        });
        QUnit.test('panel should be rendered correctly after openedStateMode changing, right panel position, expand', function(assert) {
          this.createInstance({
            maxSize: 300,
            opened: true,
            revealMode: 'expand',
            position: 'right',
            openedStateMode: 'shrink'
          });
          this.instance.option('openedStateMode', 'push');
          var $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal($panel.css('marginRight'), '0px', 'panel has correct right');
        });
        QUnit.test('panel should be rendered correctly after openedStateMode changing, vertical direction', function(assert) {
          this.createInstance({
            maxSize: 300,
            opened: false,
            position: 'bottom',
            revealMode: 'slide',
            openedStateMode: 'shrink'
          });
          this.instance.option('openedStateMode', 'push');
          var $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          assert.equal(getHeight($panel), 300, 'panel has correct size');
          this.instance.toggle();
          assert.equal(getHeight($panel), 300, 'panel has correct size');
        });
        QUnit.test('panel and content should be rendered correctly after revealMode changing, horizontal direction', function(assert) {
          this.createInstance({
            minSize: 50,
            opened: true,
            revealMode: 'slide',
            openedStateMode: 'overlap'
          });
          this.instance.option('opened', false);
          this.instance.option('revealMode', 'expand');
          var $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          var $panelContent = $panel.find('.dx-overlay-content').eq(0);
          assert.equal(getWidth($panelContent), 50, 'panel content has correct size');
          assert.equal($panel.position().left, 0, 'panel has correct position');
          assert.equal($panelContent.position().left, 0, 'panel content has correct position');
          this.instance.option('opened', true);
          this.instance.option('revealMode', 'slide');
          $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          $panelContent = $panel.find('.dx-overlay-content').eq(0);
          assert.equal(getWidth($panelContent), 300, 'panel content has correct size');
          assert.equal($panel.position().left, 0, 'panel has correct position');
          assert.equal($panelContent.position().left, 0, 'panel content has correct position');
        });
        QUnit.test('panel and content should be rendered correctly after revealMode changing, vertical direction', function(assert) {
          this.createInstance({
            minSize: 50,
            opened: true,
            position: 'top',
            revealMode: 'slide',
            openedStateMode: 'overlap'
          });
          this.instance.option('opened', false);
          this.instance.option('revealMode', 'expand');
          var $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          var $panelContent = $panel.find('.dx-overlay-content').eq(0);
          assert.equal(getHeight($panelContent), 50, 'panel content has correct size');
          assert.equal($panel.position().top, 0, 'panel has correct position');
          assert.equal($panelContent.position().top, 0, 'panel content has correct position');
          this.instance.option('opened', true);
          this.instance.option('revealMode', 'slide');
          $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          $panelContent = $panel.find('.dx-overlay-content').eq(0);
          assert.equal(getHeight($panelContent), 200, 'panel content has correct size');
          assert.equal($panel.position().top, 0, 'panel has correct position');
          assert.equal($panelContent.position().top, 0, 'panel content has correct position');
        });
        QUnit.test('drawer panel should be rendered correctly in overlap mode after mode changing, expand', function(assert) {
          this.createInstance({
            opened: false,
            revealMode: 'expand',
            openedStateMode: 'shrink'
          });
          this.instance.option('openedStateMode', 'overlap');
          this.instance.toggle();
          var $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS).eq(0);
          var $overlayContent = this.instance.$element().find('.dx-overlay-content').eq(0);
          assert.equal(getWidth($panel), 0, 'panel should have correct width after option changing');
          assert.equal(getWidth($overlayContent), 300, 'overlay content should have correct width after option changing');
        });
        QUnit.test('drawer panel and content should be rendered correctly in overlap mode after mode changing, slide', function(assert) {
          this.createInstance({
            opened: true,
            revealMode: 'slide',
            minSize: 50,
            openedStateMode: 'shrink'
          });
          this.instance.option('openedStateMode', 'overlap');
          var $panelContent = this.instance.$element().find('.dx-overlay-content').eq(0);
          var $content = this.instance.$element().find('.' + DRAWER_VIEW_CONTENT_CLASS).eq(0);
          assert.equal(getWidth($panelContent), 300, 'panel should have correct width after option changing');
          assert.equal($content.css('transform'), 'none', 'content has right css transform');
        });
        QUnit.test('drawer should have only one panel after mode changing', function(assert) {
          this.createInstance({
            opened: true,
            revealMode: 'expand',
            openedStateMode: 'overlap'
          });
          this.instance.option('openedStateMode', 'shrink');
          var $panel = this.instance.$element().find('.' + DRAWER_PANEL_CONTENT_CLASS);
          assert.equal($panel.length, 1, 'one panel is rendered');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","animation/fx","animation/translator","generic_light.css!","core/config","core/utils/resize_callbacks","core/utils/type","core/utils/shadow_dom","events/core/events_engine","events/visibility_change","jquery","ui/button","ui/drawer","ui/drawer/ui.drawer.animation","ui/overlay/ui.overlay"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("animation/fx"), require("animation/translator"), require("generic_light.css!"), require("core/config"), require("core/utils/resize_callbacks"), require("core/utils/type"), require("core/utils/shadow_dom"), require("events/core/events_engine"), require("events/visibility_change"), require("jquery"), require("ui/button"), require("ui/drawer"), require("ui/drawer/ui.drawer.animation"), require("ui/overlay/ui.overlay"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=drawer.tests.js.map