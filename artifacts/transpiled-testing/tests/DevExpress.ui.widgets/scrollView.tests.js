!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollView.tests.js"], ["jquery","core/renderer","core/utils/common","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","core/devices","localization/message","ui/themes","../../helpers/pointerMock.js","generic_light.css!","ui/scroll_view","./scrollableParts/scrollable.constants.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollView.tests.js", ["jquery", "core/renderer", "core/utils/common", "renovation/ui/scroll_view/utils/get_translate_values", "animation/frame", "core/devices", "localization/message", "ui/themes", "../../helpers/pointerMock.js", "generic_light.css!", "ui/scroll_view", "./scrollableParts/scrollable.constants.js"], function($__export) {
  "use strict";
  var $,
      renderer,
      noop,
      getTranslateValues,
      animationFrame,
      devices,
      messageLocalization,
      themes,
      pointerMock,
      ScrollView,
      RESIZE_WAIT_TIMEOUT,
      SCROLLVIEW_CLASS,
      SCROLLABLE_CONTENT_CLASS,
      SCROLLABLE_CONTAINER_CLASS,
      SCROLLABLE_SCROLL_CLASS,
      SCROLLABLE_SCROLLBAR_CLASS,
      SCROLLVIEW_CONTENT_CLASS,
      SCROLLVIEW_TOP_POCKET_CLASS,
      SCROLLVIEW_BOTTOM_POCKET_CLASS,
      SCROLLVIEW_LOADPANEL,
      SCROLLABLE_WRAPPER_CLASS,
      SCROLLVIEW_PULLDOWN_CLASS,
      SCROLLVIEW_PULLDOWN_IMAGE_CLASS,
      SCROLLVIEW_PULLDOWN_TEXT_CLASS,
      SCROLLVIEW_PULLDOWN_LOADING_CLASS,
      SCROLLVIEW_PULLDOWN_READY_CLASS,
      SCROLLVIEW_PULLDOWN_INDICATOR_CLASS,
      SCROLLVIEW_REACHBOTTOM_CLASS,
      SCROLLVIEW_REACHBOTTOM_TEXT_CLASS,
      SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS,
      PULLDOWN_HEIGHT,
      getScrollOffset,
      isRenovatedScrollView,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      renderer = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      getTranslateValues = $__m.getTranslateValues;
    }, function($__m) {
      animationFrame = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      messageLocalization = $__m.default;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {}, function($__m) {
      ScrollView = $__m.default;
    }, function($__m) {
      RESIZE_WAIT_TIMEOUT = $__m.RESIZE_WAIT_TIMEOUT;
    }],
    execute: function() {
      SCROLLVIEW_CLASS = 'dx-scrollview';
      SCROLLABLE_CONTENT_CLASS = 'dx-scrollable-content';
      SCROLLABLE_CONTAINER_CLASS = 'dx-scrollable-container';
      SCROLLABLE_SCROLL_CLASS = 'dx-scrollable-scroll';
      SCROLLABLE_SCROLLBAR_CLASS = 'dx-scrollable-scrollbar';
      SCROLLVIEW_CONTENT_CLASS = 'dx-scrollview-content';
      SCROLLVIEW_TOP_POCKET_CLASS = 'dx-scrollview-top-pocket';
      SCROLLVIEW_BOTTOM_POCKET_CLASS = 'dx-scrollview-bottom-pocket';
      SCROLLVIEW_LOADPANEL = 'dx-scrollview-loadpanel';
      SCROLLABLE_WRAPPER_CLASS = 'dx-scrollable-wrapper';
      SCROLLVIEW_PULLDOWN_CLASS = SCROLLVIEW_CLASS + '-pull-down';
      SCROLLVIEW_PULLDOWN_IMAGE_CLASS = SCROLLVIEW_PULLDOWN_CLASS + '-image';
      SCROLLVIEW_PULLDOWN_TEXT_CLASS = SCROLLVIEW_PULLDOWN_CLASS + '-text';
      SCROLLVIEW_PULLDOWN_LOADING_CLASS = SCROLLVIEW_PULLDOWN_CLASS + '-loading';
      SCROLLVIEW_PULLDOWN_READY_CLASS = SCROLLVIEW_PULLDOWN_CLASS + '-ready';
      SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = SCROLLVIEW_PULLDOWN_CLASS + '-indicator';
      SCROLLVIEW_REACHBOTTOM_CLASS = SCROLLVIEW_CLASS + '-scrollbottom';
      SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = SCROLLVIEW_REACHBOTTOM_CLASS + '-text';
      SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = SCROLLVIEW_REACHBOTTOM_CLASS + '-indicator';
      PULLDOWN_HEIGHT = 160;
      getScrollOffset = function($scrollView) {
        var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
        var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var location = getTranslateValues($content.get(0));
        return {
          top: (location.top - $container.scrollTop() || 0),
          left: (location.left || -$container.scrollLeft() || 0)
        };
      };
      isRenovatedScrollView = !!ScrollView.IS_RENOVATED_WIDGET;
      themes.setDefaultTimeout(0);
      devices.current('iPhone');
      moduleConfig = {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this._originalRequestAnimationFrame = animationFrame.requestAnimationFrame;
          animationFrame.requestAnimationFrame = function(callback) {
            callback();
          };
          return new Promise(function(resolve) {
            return themes.initialized(resolve);
          });
        },
        afterEach: function() {
          this.clock.restore();
          animationFrame.requestAnimationFrame = this._originalRequestAnimationFrame;
        }
      };
      QUnit.testStart(function() {
        var markup = '\
        <div id="scrollView" style="height: 50px; width: 50px;">\
            <div class="content1" style="height: 100px; width: 100px;"></div>\
            <div class="content2" style="height: 100px; width: 100px;"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('render', moduleConfig, function() {
        QUnit.test('scrollView render', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var $scrollableContent = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollableContent.children().eq(0);
          var $content = $scrollableContent.children().eq(1);
          var $bottomPocket = $scrollableContent.children().eq(2);
          assert.ok($scrollView.hasClass(SCROLLVIEW_CLASS), 'dx-scrollview class attached');
          assert.ok($topPocket.hasClass(SCROLLVIEW_TOP_POCKET_CLASS), 'dx-scrollview-top-pocket class attached');
          assert.ok($content.hasClass(SCROLLVIEW_CONTENT_CLASS), 'dx-scrollview-content class attached');
          assert.ok($bottomPocket.hasClass(SCROLLVIEW_BOTTOM_POCKET_CLASS), 'dx-scrollview-bottom-pocket');
          assert.equal($content.children().length, 2, 'content was moved');
          assert.ok($content.children().eq(0).hasClass('content1'));
          assert.ok($content.children().eq(1).hasClass('content2'));
        });
        QUnit.test('scrollView pullDown markup', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var $pullDown = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_CLASS);
          assert.equal($pullDown.length, 1, 'pull down container');
          assert.equal($pullDown.find('.' + SCROLLVIEW_PULLDOWN_IMAGE_CLASS).length, 1, 'pull down image');
          assert.equal($pullDown.find('.' + SCROLLVIEW_PULLDOWN_INDICATOR_CLASS).length, 1, 'pull down load indicator container');
          assert.equal($pullDown.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS).length, 1, 'pull down text');
        });
        QUnit.test('dxLoadIndicator was created', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
          var $loadIndicatorTop = $topPocket.find('.dx-loadindicator');
          var $loadIndicatorBottom = $bottomPocket.find('.dx-loadindicator');
          var top = $loadIndicatorTop.dxLoadIndicator('instance');
          var bottom = $loadIndicatorBottom.dxLoadIndicator('instance');
          assert.notEqual(top, null, 'dxLoadIndicator was created');
          assert.notEqual(bottom, null, 'dxLoadIndicator was created');
        });
        QUnit.test('pulldown text', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            onPullDown: noop,
            useNative: false
          });
          var pullDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS);
          var scrollBottomText = $scrollView.find('.' + SCROLLVIEW_REACHBOTTOM_TEXT_CLASS);
          assert.equal(pullDownText.children().eq(0).text(), messageLocalization.format('dxScrollView-pullingDownText'));
          assert.equal(pullDownText.children().eq(1).text(), messageLocalization.format('dxScrollView-pulledDownText'));
          assert.equal(pullDownText.children().eq(2).text(), messageLocalization.format('dxScrollView-refreshingText'));
          assert.equal(scrollBottomText.text(), 'Loading...');
        });
        QUnit.test('scrollView scrollbottom markup', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
          var $scrollBottom = $bottomPocket.find('.' + SCROLLVIEW_REACHBOTTOM_CLASS);
          assert.equal($scrollBottom.length, 1, 'scroll bottom container');
          assert.equal($scrollBottom.find('.' + SCROLLVIEW_REACHBOTTOM_TEXT_CLASS).length, 1, 'scrollbottom text');
          assert.equal($scrollBottom.find('.' + SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS).length, 1, 'scrollbottom load indicator container');
        });
        QUnit.test('scrollView has correct height when container height is auto', function(assert) {
          var $scrollView = $('#scrollView');
          $scrollView.height('auto');
          $scrollView.dxScrollView({useNative: false});
          var $content = $scrollView.find('.' + SCROLLVIEW_CONTENT_CLASS);
          assert.equal($scrollView.height(), $content.height(), 'scrollView has correctly height');
        });
        QUnit.test('pulling down text change', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          $scrollView.dxScrollView('option', 'pullingDownText', 'test');
          var $pullingDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS).children().eq(0);
          assert.equal($pullingDownText.text(), 'test');
        });
        QUnit.test('pulled down text change', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          $scrollView.dxScrollView('option', 'pulledDownText', 'test');
          var $pullingDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS).children().eq(1);
          assert.equal($pullingDownText.text(), 'test');
        });
        QUnit.test('refreshing text change', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          $scrollView.dxScrollView('option', 'refreshingText', 'test');
          var $pullingDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS).children().eq(2);
          assert.equal($pullingDownText.text(), 'test');
        });
        QUnit.test('reachbottom text change', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          $scrollView.dxScrollView('option', 'reachBottomText', 'test');
          var $scrollBottomText = $('.' + SCROLLVIEW_REACHBOTTOM_TEXT_CLASS);
          assert.equal($scrollBottomText.text(), 'test');
        });
      });
      QUnit.module('dimension', moduleConfig, function() {
        QUnit.test('top position calculation', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            onPullDown: noop
          });
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var location = getScrollOffset($scrollView);
          assert.equal(location.top, -$topPocket.height(), 'top position calculated considering top pocket height');
        });
        QUnit.test('bottom position calculation', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onEnd: function() {
              var location = getScrollOffset($scrollView);
              var height = $container.height() - $content.height() + $bottomPocket.height();
              assert.equal(location.top, height, 'bottom position calculated considering top pocket height');
            }
          });
          var $container = $scrollView.find('.dx-scrollable-container');
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          pointerMock($content).start().down().move(0, $container.height() - $content.height() + $topPocket.height() + $bottomPocket.height() - 10).up();
        });
      });
      QUnit.module('onReachBottom', function() {
        [0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.2, 1.25, 1.34, 1.5, 1.875, 2.25, 2.65].forEach(function(browserZoom) {
          [{
            useNative: false,
            refreshStrategy: 'simulated'
          }, {
            useNative: true,
            refreshStrategy: 'pullDown'
          }, {
            useNative: true,
            refreshStrategy: 'swipeDown'
          }].forEach(function($__3) {
            var $__4 = $__3,
                useNative = $__4.useNative,
                refreshStrategy = $__4.refreshStrategy;
            var cssStyles = {
              transform: ("scale(" + browserZoom + ")"),
              transformOrigin: '0 0'
            };
            QUnit.test(("Start loading when reaching bottom boundary with wrapperStyles: " + JSON.stringify(cssStyles) + ", useNative: " + useNative + ", refreshStrategy: " + refreshStrategy), function(assert) {
              assert.expect(1);
              var done = assert.async();
              var $scrollView = $('<div>');
              var $scrollViewWrapper = $scrollView.wrap('<div>').parent();
              var $contentWrapper = $('<div>').appendTo($scrollView);
              for (var i = 0; i < 30; i++) {
                $contentWrapper.append($('<div>').addClass('item').text(("item" + i)).css({
                  height: 33,
                  width: '100%'
                }));
              }
              $scrollViewWrapper.appendTo('#qunit-fixture');
              $scrollViewWrapper.css(cssStyles);
              var scrollView = $scrollView.dxScrollView({
                useNative: useNative,
                direction: 'vertical',
                height: 430,
                width: '100%',
                showScrollbar: 'always',
                refreshStrategy: refreshStrategy,
                onReachBottom: function() {
                  assert.ok(true, 'loading started');
                  done();
                },
                reachBottomText: 'Updating...'
              }).dxScrollView('instance');
              var $lastItem = $scrollView.find('.item').last();
              var $prevItem = $lastItem.prev();
              scrollView.scrollToElement($prevItem);
              scrollView.scrollToElement($lastItem);
            });
          });
        });
      });
      QUnit.module('actions', moduleConfig, function() {
        QUnit.test('onPullDown action', function(assert) {
          var firstScroll = true;
          var offset = 10;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: function(e) {
              assert.ok(true, 'pulldown action was fired');
            },
            onScroll: function() {
              if (firstScroll) {
                var location = getScrollOffset($scrollView);
                assert.equal(location.top, offset);
              }
              firstScroll = false;
            },
            onEnd: function() {
              assert.ok(false, 'end action should not be fired');
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + offset).up();
        });
        QUnit.test('no onPullDown hides pullDown', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({});
          assert.ok($scrollView.find('.' + SCROLLVIEW_PULLDOWN_CLASS).is(':hidden'), 'pull down element is hidden');
        });
        QUnit.test('changing of onPullDown option changes pullDown visibility', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({});
          $scrollView.dxScrollView('option', 'onPullDown', noop);
          assert.ok($scrollView.find('.' + SCROLLVIEW_PULLDOWN_CLASS).is(':visible'), 'pull down element is visible');
        });
        QUnit.test('pullDown behavior turns off when pullDown is undefined', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onEnd: function() {
              assert.ok(true, 'end action should be fired');
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + 10).up();
        });
        QUnit.test('top position calculation on pull down', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            onPullDown: noop
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var offset = 2;
          pointerMock($content).start().down().move(0, offset);
          var location = getTranslateValues($content.get(0));
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          assert.equal(location.top, isRenovatedScrollView ? -($topPocket.height() - offset) : 0, 'translate top position is right');
          assert.equal($container.scrollTop(), isRenovatedScrollView ? 0 : $topPocket.height() - offset, 'scroll top position is right');
        });
        QUnit.test('onReachBottom action', function(assert) {
          var $scrollView = $($('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onReachBottom: function(e) {
              assert.ok(true, 'onReachBottom action was fired');
            },
            onEnd: function() {
              assert.ok(false, 'end action should not be fired');
            }
          }));
          var $container = $scrollView.find('.dx-scrollable-container');
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
          pointerMock($content).start().down().move(0, $container.height() - $content.height() + $bottomPocket.height()).up();
        });
        QUnit.test('onReachBottom action should not be fired in rtl mode', function(assert) {
          assert.expect(0);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            direction: 'vertical',
            rtlEnabled: false,
            onReachBottom: function(e) {
              assert.ok(false, 'onReachBottom action won\'t fired');
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          $content.width(200);
          $content.height(0);
          $scrollView.dxScrollView('instance').option('rtlEnabled', true);
        });
        QUnit.test('changing of onReachBottom option changes reach bottom element visibility', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          $scrollView.dxScrollView('option', 'onReachBottom', noop);
          assert.ok($scrollView.find('.' + SCROLLVIEW_REACHBOTTOM_CLASS).is(':visible'), 'reach bottom element is visible');
        });
        QUnit.test('onReachBottom action fired once', function(assert) {
          assert.expect(1);
          var reachBottomFired = 0;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onReachBottom: function(e) {
              reachBottomFired++;
              assert.equal(reachBottomFired, 1, 'onReachBottom fired once');
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          pointerMock($content).start().down().move(0, -$content.height()).move(0, -1).up();
        });
        QUnit.test('changing action option does not cause render', function(assert) {
          var $__2 = this;
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var mouse = pointerMock($content).start();
          mouse.down().move(0, -10);
          var done = assert.async();
          var testAction = function(actionName) {
            $scrollView.dxScrollView('option', actionName, noop);
            $__2.clock.restore();
            setTimeout(function() {
              var location = getScrollOffset($scrollView);
              assert.equal(location.top, -$topPocket.height() - 10, actionName + ' case scrollable rerendered');
              actionName === 'onReachBottom' && done();
            }, RESIZE_WAIT_TIMEOUT);
          };
          testAction('onPullDown');
          testAction('onReachBottom');
        });
        [true, false].forEach(function(useNative) {
          [true, false].forEach(function(pullDownEnabled) {
            QUnit.test(("onReachBottom action is not fired when scrollable content bottom is not reached, pullDownEnabled: " + pullDownEnabled + ", useNative: " + useNative), function(assert) {
              var onReachBottomHandler = sinon.spy();
              var scrollView = $('#scrollView').dxScrollView({
                useNative: useNative,
                scrollByContent: true,
                onReachBottom: onReachBottomHandler
              }).dxScrollView('instance');
              if (pullDownEnabled) {
                scrollView.option('onPullDown', noop);
              }
              var $container = $(scrollView.container());
              var $content = $(scrollView.content());
              scrollView.scrollTo($content.height() - $container.height() - 2);
              assert.strictEqual(onReachBottomHandler.callCount, 0, 'reachBottom event is not fired');
            });
          });
        });
        QUnit.test('disabled scrollview should not be updated on pointerdown after finish loading', function(assert) {
          var onUpdatedHandler = sinon.spy();
          var $scrollView = $('#scrollView').dxScrollView({
            onUpdated: onUpdatedHandler,
            useNative: true,
            disabled: true
          });
          onUpdatedHandler.reset();
          $scrollView.dxScrollView('instance').finishLoading();
          pointerMock($scrollView.find('.content1')).start().down();
          assert.equal(onUpdatedHandler.callCount, 0, 'update action won\'t fired');
        });
      });
      QUnit.module('dynamic', moduleConfig, function() {
        QUnit.test('pulling down', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: function() {
              var location = getScrollOffset($scrollView);
              assert.equal(location.top, 0, 'pulled down');
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + 10).up();
        });
        QUnit.test('pulling down without release', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            onPullDown: noop,
            inertiaEnabled: false,
            showScrollbar: 'always',
            onEnd: function() {
              var location = getScrollOffset($scrollView);
              assert.equal(location.top, -$topPocket.height(), 'content bounced to the top');
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + 1).move(0, -10).up();
        });
        QUnit.test('onPullDown enabled doesn\'t change the position of content', function(assert) {
          this.clock.restore();
          var done = assert.async();
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          pointerMock($content).start().down().move(0, -10).up();
          $scrollView.dxScrollView('option', 'onPullDown', noop);
          setTimeout(function() {
            var location = getScrollOffset($scrollView);
            assert.equal(location.top, -10 - $topPocket.height(), 'content position was not changed');
            done();
          }, RESIZE_WAIT_TIMEOUT);
        });
        QUnit.test('onPullDown disabled does not change the position of content', function(assert) {
          this.clock.restore();
          var done = assert.async();
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: noop
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          pointerMock($content).start().down().move(0, -10).up();
          setTimeout(function() {
            $scrollView.dxScrollView('option', 'onPullDown', undefined);
            setTimeout(function() {
              var location = getScrollOffset($scrollView);
              assert.equal(location.top, -10, 'content position was not changed');
              done();
            }, RESIZE_WAIT_TIMEOUT);
          }, RESIZE_WAIT_TIMEOUT);
        });
        QUnit.test('scroll content stays in bounds when onPullDown turned off', function(assert) {
          this.clock.restore();
          var done = assert.async();
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: noop,
            onReachBottom: noop
          });
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $content = $scrollView.find('.' + SCROLLVIEW_CONTENT_CLASS);
          pointerMock($content).start().down().move(0, $container.height() - $content.height()).up();
          setTimeout(function() {
            $scrollView.dxScrollView('option', 'onPullDown', null);
            setTimeout(function() {
              var location = getScrollOffset($scrollView);
              var maxScrollTopOffset = $content.height() - $container.height();
              assert.equal(location.top, -maxScrollTopOffset, 'content position was not changed');
              done();
            }, RESIZE_WAIT_TIMEOUT);
          }, RESIZE_WAIT_TIMEOUT);
        });
        QUnit.test('pulled down adds ready state', function(assert) {
          assert.expect(4);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: noop
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $pullDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS);
          var mouse = pointerMock($content).start();
          mouse.down().move(0, $topPocket.height() + 1);
          assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_READY_CLASS), true, 'scrollview-pull-down-ready class added');
          assert.equal($pullDownText.children().eq(1).css('opacity'), 1);
          mouse.move(0, -10);
          assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_READY_CLASS), false, 'scrollview-pull-down-ready class removed');
          assert.equal($pullDownText.children().eq(0).css('opacity'), 1);
        });
        QUnit.test('pulled down adds loading state', function(assert) {
          assert.expect(3);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: function() {
              assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_LOADING_CLASS), true, 'scrollview-pull-down-loading class added');
              assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_READY_CLASS), false, 'scrollview-pull-down-ready class removed');
              assert.equal($pullDownText.children().eq(2).css('opacity'), 1);
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $pullDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + 1).up();
        });
        QUnit.test('release cause release state', function(assert) {
          assert.expect(3);
          var clock = this.clock;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: function() {
              $scrollView.dxScrollView('release');
              clock.tick(10);
            },
            onEnd: function() {
              assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_LOADING_CLASS), false, 'scrollview-pull-down-loading class removed');
              assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_READY_CLASS), false, 'scrollview-pull-down-ready class removed');
              assert.equal($pullDownText.children().eq(0).css('opacity'), 1);
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $pullDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + 1).up();
        });
        var SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = 'dx-scrollview-pull-down-text-visible';
        QUnit.test('pulled down adds ready state for Material theme', function(assert) {
          assert.expect(6);
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: noop
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $pullDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS);
          var mouse = pointerMock($content).start();
          mouse.down().move(0, $topPocket.height() + 1);
          assert.ok(!$pullDownText.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS));
          assert.ok($pullDownText.children().eq(1).hasClass(SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS));
          assert.ok(!$pullDownText.children().eq(2).hasClass(SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS));
          mouse.move(0, -10);
          assert.ok($pullDownText.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS));
          assert.ok(!$pullDownText.children().eq(1).hasClass(SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS));
          assert.ok(!$pullDownText.children().eq(2).hasClass(SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS));
          themes.isMaterial = origIsMaterial;
        });
        QUnit.test('pulled down adds loading state for Material theme', function(assert) {
          assert.expect(3);
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: function() {
              assert.ok(!$pullDownText.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS));
              assert.ok(!$pullDownText.children().eq(1).hasClass(SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS));
              assert.ok($pullDownText.children().eq(2).hasClass(SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS));
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $pullDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + 1).up();
          themes.isMaterial = origIsMaterial;
        });
        QUnit.test('scrollview locked while pulldown loading', function(assert) {
          assert.expect(0);
          var loading = false;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onScroll: function() {
              if (loading) {
                assert.ok(false, 'scrolling disabled');
              }
            },
            onPullDown: function() {
              setTimeout(function() {
                loading = true;
                mouse.down().move(0, -$topPocket.height() - 1).up();
              });
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var mouse = pointerMock($content).start();
          mouse.down().move(0, $topPocket.height() + 1).up();
        });
        QUnit.test('scrollview onReachBottom action fired when bottom position is reached', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onReachBottom: function() {
              var location = getScrollOffset($scrollView);
              assert.roughEqual(location.top, $container.height() - $content.height(), 1);
            }
          });
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var mouse = pointerMock($content).start();
          mouse.down().move(0, -$content.height() - 10).up();
        });
        QUnit.test('scrollview should go to released state if release method was called during the loading', function(assert) {
          assert.expect(1);
          var done = assert.async();
          var count = 0;
          var $scrollView = $('#scrollView').dxScrollView({
            height: 50,
            useNative: true,
            inertiaEnabled: false,
            refreshStrategy: 'pullDown',
            onReachBottom: function() {
              count++;
              scrollView.release(false);
              scrollView.scrollTo({
                x: 0,
                y: 250
              });
              if (count > 1) {
                assert.ok(true);
                done();
              }
            }
          });
          var scrollView = $scrollView.dxScrollView('instance');
          scrollView.toggleLoading(true);
          scrollView.scrollTo({
            x: 0,
            y: 220
          });
        });
        QUnit.test('onReachBottom should not be called when scroll delta is 0', function(assert) {
          assert.expect(1);
          var done = assert.async();
          var $scrollView = $('#scrollView').dxScrollView({
            height: 50,
            useNative: true,
            inertiaEnabled: false,
            refreshStrategy: 'pullDown',
            onReachBottom: function() {
              scrollView.release(false);
              assert.ok(true, 'reachBottom was not called on the second scroll');
              done();
            }
          });
          var scrollView = $scrollView.dxScrollView('instance');
          scrollView.scrollTo({
            x: 0,
            y: 150
          });
          $(scrollView.content()).trigger('scroll');
        });
        QUnit.test('scrollview locked while loading', function(assert) {
          assert.expect(0);
          var loading = false;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onScroll: function() {
              if (loading) {
                assert.ok(false, 'scrolling disabled');
              }
            },
            onReachBottom: function() {
              setTimeout(function() {
                loading = true;
                mouse.down().move(0, $bottomPocket.height() + 1).up();
              });
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
          var mouse = pointerMock($content).start();
          mouse.down().move(0, -$content.height() - 10).up();
        });
        QUnit.test('release after loading cause bounce to the bottom bound', function(assert) {
          assert.expect(1);
          var clock = this.clock;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onReachBottom: function() {
              this.release();
              clock.tick(10);
            },
            onEnd: function() {
              var location = getScrollOffset($scrollView);
              if (isRenovatedScrollView) {
                var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
                assert.roughEqual(location.top, $container.height() - $content.height() + $bottomPocket.height(), 1, 'scrollview bounced');
              } else {
                assert.roughEqual(location.top, $container.height() - $content.height(), 1, 'scrollview bounced');
              }
            }
          });
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          pointerMock($content).start().down().move(0, -$content.height() - 10).up();
        });
        QUnit.test('pull down element is not hidden when container larger than content', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          $container.height(400);
          $content.find('.' + SCROLLVIEW_CONTENT_CLASS).children().height(50);
          $scrollView.dxScrollView('update');
          var location = getScrollOffset($scrollView);
          assert.equal(location.top, -$topPocket.height());
        });
        QUnit.test('pull down doesn\'t show loading panel', function(assert) {
          assert.expect(1);
          var isLoadPanelVisible;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: function() {
              isLoadPanelVisible = $scrollView.find('.' + SCROLLVIEW_LOADPANEL).eq(0).dxLoadPanel('option', 'visible');
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + 1).up();
          assert.equal(isLoadPanelVisible, false, 'load panel is invisible during pull down');
        });
      });
      QUnit.module('scrollbars', moduleConfig, function() {
        QUnit.test('scrollView locates scrollbar in correctly position after creation', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var location = getScrollOffset($scrollView);
          assert.equal(location.top, 0, 'scrollbar at the top position');
        });
        QUnit.test('scrollbar height calculated correctly', function(assert) {
          var containerHeight = 50;
          var contentHeight = 100;
          var scrollHeight = (containerHeight / contentHeight) * containerHeight;
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $content = $scrollView.find('.' + SCROLLVIEW_CONTENT_CLASS);
          var $scroll = $scrollView.find('.' + SCROLLABLE_SCROLL_CLASS);
          $container.height(containerHeight);
          $content.empty().height(contentHeight);
          $scrollView.dxScrollView('instance').update();
          assert.equal($scroll.outerHeight(), scrollHeight, 'scrollbar height calculated correctly');
        });
        QUnit.test('moving scrollView moves scrollbar in correct position', function(assert) {
          var containerHeight = 50;
          var contentHeight = 100;
          var distance = -10;
          var scrollbarDistance = -distance * (containerHeight / contentHeight);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onEnd: function() {
              var location = getTranslateValues($scroll.get(0));
              assert.equal(location.top, 2 * scrollbarDistance, 'scrollbar follows pointer everytime');
            }
          });
          var $content = $scrollView.find('.' + SCROLLVIEW_CONTENT_CLASS);
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $scroll = $scrollView.find('.' + SCROLLABLE_SCROLL_CLASS);
          $container.height(containerHeight);
          $content.empty().height(contentHeight);
          $scrollView.dxScrollView('instance').update();
          pointerMock($scrollView.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(0, distance).move(0, distance).up();
        });
        QUnit.test('scroll over scrollbar does not hide thumb', function(assert) {
          var $scrollView = $('#scrollView').height(50);
          $scrollView.append('<div>').children().height(100);
          $scrollView.dxScrollView({
            useNative: false,
            showScrollbar: 'onHover',
            bounceEnabled: false
          });
          var $scrollbar = $scrollView.find('.' + SCROLLABLE_SCROLLBAR_CLASS);
          $scrollbar.trigger('mouseenter');
          pointerMock($scrollbar).start().wheel(-10);
          var $scroll = $scrollbar.find('.dx-scrollable-scroll');
          assert.equal($scroll.hasClass('dx-state-invisible'), false, 'thumb stays visible when showScrollbar is \'onHover\'');
        });
        QUnit.test('scrolling by thumb should trigger bottom loading even without moving', function(assert) {
          var containerSize = 50;
          var contentHeight = 100;
          var $scrollView = $('#scrollView').dxScrollView({
            scrollByThumb: true,
            inertiaEnabled: false,
            useNative: false,
            onReachBottom: function() {
              assert.ok(true, 'action fired');
            }
          });
          var $scrollbar = $scrollView.find('.' + SCROLLABLE_SCROLLBAR_CLASS);
          var mouse = pointerMock($scrollbar).start();
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $content = $scrollView.find('.' + SCROLLVIEW_CONTENT_CLASS);
          $container.height(containerSize).width(containerSize);
          $content.empty().height(contentHeight);
          $scrollView.dxScrollView('update');
          var containerPosition = $container.offset();
          mouse.down(containerPosition.top + containerSize, containerPosition.left + containerSize).up();
        });
      });
      QUnit.module('api', moduleConfig, function() {
        QUnit.test('content', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({});
          assert.ok($($scrollView.dxScrollView('instance').content()).hasClass(SCROLLVIEW_CONTENT_CLASS), 'returns scrollView content');
        });
        QUnit.test('release', function(assert) {
          assert.expect(1);
          var clock = this.clock;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: function() {
              this.release();
              clock.tick(10);
            },
            onEnd: function() {
              var location = getScrollOffset($scrollView);
              assert.equal(location.top, -$topPocket.height(), 'scrollview bounced');
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + 1).up();
        });
        QUnit.test('release does not enable reach bottom functionality', function(assert) {
          assert.expect(2);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false
          });
          var $reachBottom = $scrollView.find('.' + SCROLLVIEW_REACHBOTTOM_CLASS);
          assert.ok($reachBottom.is(':hidden'), 'reach bottom is hidden');
          $scrollView.dxScrollView('release').done(function() {
            assert.ok($reachBottom.is(':hidden'), 'reach bottom is hidden');
          });
          this.clock.tick(10);
        });
        QUnit.test('release with preventReachBottom', function(assert) {
          assert.expect(1);
          var clock = this.clock;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: function() {
              this.release(true);
              clock.tick(10);
            },
            onEnd: function() {
              var $bottomPocketLoading = $scrollView.find('.' + SCROLLVIEW_REACHBOTTOM_CLASS);
              assert.ok($bottomPocketLoading.is(':hidden'), 'bottom pocket loading is hidden');
            }
          });
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          pointerMock($content).start().down().move(0, $topPocket.height() + 1).up();
        });
        QUnit.test('release without pulldown', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          $scrollView.dxScrollView('release').done(function() {
            assert.ok(true, 'release without loading fails');
          });
          this.clock.tick(10);
        });
        QUnit.test('release fires update', function(assert) {
          var onUpdatedHandler = sinon.spy();
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            onUpdated: onUpdatedHandler
          });
          onUpdatedHandler.reset();
          $scrollView.dxScrollView('release');
          this.clock.tick(10);
          assert.equal(onUpdatedHandler.callCount, isRenovatedScrollView ? 0 : 1, 'update fired');
        });
        QUnit.test('release calls update', function(assert) {
          assert.expect(1);
          this.clock.restore();
          var done = assert.async();
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onPullDown: function() {
              var $__2 = this;
              $('.content2').height(400);
              setTimeout(function() {
                $__2.release();
              });
            },
            onEnd: function() {
              mouse.start().down().move(0, -1000).up();
            },
            onReachBottom: function() {
              var location = getScrollOffset($scrollView);
              assert.roughEqual(location.top, $container.height() - $content.height(), 1);
              done();
            }
          });
          var $container = $scrollView.find('.dx-scrollable-container');
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var mouse = pointerMock($content).start();
          mouse.down().move(0, $topPocket.height() + 1).up();
        });
        QUnit.test('release calls update for scrollbar', function(assert) {
          assert.expect(1);
          this.clock.restore();
          var done = assert.async();
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            onPullDown: noop,
            inertiaEnabled: false,
            onEnd: function() {
              assert.equal($scroll.outerHeight(), Math.pow($container.height(), 2) / $content.height());
              done();
            },
            onReachBottom: function() {
              $container.height(100);
              $('.content2').height(400);
              setTimeout($.proxy(this.release, this), RESIZE_WAIT_TIMEOUT);
            }
          });
          var $container = $scrollView.find('.dx-scrollable-container');
          var $content = $scrollView.find('.' + SCROLLVIEW_CONTENT_CLASS);
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $scroll = $scrollView.find('.' + SCROLLABLE_SCROLL_CLASS);
          pointerMock($content).start().down().move(0, $container.height() - $content.height() - $topPocket.height() - 10).up();
        });
        QUnit.test('release calls moveToBound location immediately when state is released', function(assert) {
          this.clock.restore();
          var done = assert.async();
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            onPullDown: noop
          });
          var $children = $('.' + SCROLLVIEW_CONTENT_CLASS, $scrollView).children();
          var $scrollableContent = $('.' + SCROLLABLE_CONTENT_CLASS, $scrollView);
          var scrollView = $scrollView.dxScrollView('instance');
          scrollView.scrollTo(scrollView.scrollHeight());
          $children.remove();
          setTimeout(function() {
            pointerMock($scrollableContent).start().down();
            scrollView.release();
            setTimeout(function() {
              assert.equal(scrollView.scrollOffset().top, 0, 'moveToBound was called immediately after release');
              done();
            }, RESIZE_WAIT_TIMEOUT);
          }, RESIZE_WAIT_TIMEOUT);
        });
        QUnit.test('toggleLoading', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            onReachBottom: noop
          });
          var $bottomPocketLoading = $scrollView.find('.' + SCROLLVIEW_REACHBOTTOM_CLASS);
          var scrollView = $scrollView.dxScrollView('instance');
          assert.ok($bottomPocketLoading.is(':visible'), 'loading is visible at the beginning');
          scrollView.toggleLoading(false);
          assert.ok($bottomPocketLoading.is(':hidden'), 'loading is hidden');
          scrollView.toggleLoading(true);
          assert.ok($bottomPocketLoading.is(':visible'), 'loading is visible');
        });
        QUnit.test('toggleLoading turns off reachBottom behavior', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            inertiaEnabled: false,
            onReachBottom: function(e) {
              assert.ok(false, 'onReachBottom action should not be fired');
            },
            onEnd: function() {
              assert.ok(true, 'end action should be fired');
              var location = getScrollOffset($scrollView);
              assert.equal(location.top, $container.height() - $content.height() + $bottomPocket.height());
            }
          });
          var $container = $scrollView.find('.dx-scrollable-container');
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
          var mouse = pointerMock($content).start().down().move(0, $container.height() - $content.height() - $bottomPocket.height() - 1);
          $scrollView.dxScrollView('toggleLoading', false);
          mouse.up();
        });
        QUnit.test('refresh', function(assert) {
          assert.expect(2);
          var pullDownFired = 0;
          var deferred = $.Deferred();
          var scrollView = $('#scrollView').dxScrollView({onPullDown: function(e) {
              pullDownFired++;
              e.component.release().done(function() {
                deferred.resolve();
              });
            }}).dxScrollView('instance');
          scrollView.refresh();
          deferred.done(function() {
            assert.ok(true, 'scroll view released');
          });
          assert.equal(pullDownFired, 1, 'pull down action fired once');
          this.clock.tick(1000);
        });
        QUnit.test('refresh show load panel', function(assert) {
          var $__2 = this;
          assert.expect(2);
          var deferred = $.Deferred();
          var $scrollView = $('#scrollView');
          var scrollView = $scrollView.dxScrollView({onPullDown: function(e) {
              assert.equal(loadPanel.option('visible'), true, 'load panel shown on start');
              e.component.release().done(function() {
                $__2.clock.tick(1000);
                deferred.resolve();
              });
            }}).dxScrollView('instance');
          var loadPanel = $scrollView.find('.' + SCROLLVIEW_LOADPANEL).dxLoadPanel('instance');
          scrollView.refresh();
          deferred.done(function() {
            assert.equal(loadPanel.option('visible'), false, 'load panel hidden on done');
          });
          this.clock.tick(1000);
        });
        QUnit.test('refreshingText pass to dxLoadPanel', function(assert) {
          var testRefreshingText = 'test';
          var $scrollView = $('#scrollView').dxScrollView({refreshingText: testRefreshingText});
          var loadPanel = $scrollView.find('.' + SCROLLVIEW_LOADPANEL).dxLoadPanel('instance');
          assert.equal(loadPanel.option('message'), testRefreshingText, 'refreshingText pass to loadPanel');
        });
        QUnit.test('startLoading shows load panel and locks scrolling', function(assert) {
          var $scrollView = $('#scrollView');
          var wasScrollEvent;
          $scrollView.dxScrollView({onScroll: function() {
              wasScrollEvent = true;
            }});
          wasScrollEvent = false;
          var loadPanel = $scrollView.find('.' + SCROLLVIEW_LOADPANEL).dxLoadPanel('instance');
          $scrollView.dxScrollView('startLoading');
          assert.equal(loadPanel.option('visible'), true, 'load panel shown');
          pointerMock($scrollView).start().down().move(0, 10);
          assert.ok(!wasScrollEvent, 'scrollEvent was not fired');
        });
        QUnit.test('startLoading shows load panel doesn\'t show load panel when control is hidden', function(assert) {
          var $scrollView = $('#scrollView');
          $scrollView.dxScrollView({});
          var loadPanel = $scrollView.find('.' + SCROLLVIEW_LOADPANEL).dxLoadPanel('instance');
          $scrollView.hide();
          $scrollView.dxScrollView('startLoading');
          assert.equal(loadPanel.option('visible'), false, 'load panel shown');
        });
        QUnit.test('finishLoading hides load panel and unlocks scrolling', function(assert) {
          var $scrollView = $('#scrollView');
          $scrollView.dxScrollView({onScroll: function() {
              assert.ok(true, 'scroll is disabled');
            }});
          var loadPanel = $scrollView.find('.' + SCROLLVIEW_LOADPANEL).dxLoadPanel('instance');
          $scrollView.dxScrollView('startLoading');
          $scrollView.dxScrollView('finishLoading');
          assert.equal(loadPanel.option('visible'), false, 'load panel hidden');
          pointerMock($scrollView).start().down().move(0, 10);
        });
        QUnit.test('load panel is not shown when onPullDown is not specified', function(assert) {
          var $scrollView = $('#scrollView');
          var scrollView = $scrollView.dxScrollView().dxScrollView('instance');
          var loadPanel = $scrollView.find('.' + SCROLLVIEW_LOADPANEL).dxLoadPanel('instance');
          scrollView.refresh();
          assert.equal(loadPanel.option('visible'), false, 'load panel hidden');
        });
        QUnit.test('disabled: scroll was not moved when disabled is changed dynamically', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var scrollView = $scrollView.dxScrollView('instance');
          scrollView.scrollTo({top: 20});
          scrollView.option('disabled', true);
          assert.equal(scrollView.scrollTop(), 20, 'scroll was not moved when disabled is changed dynamically');
        });
        QUnit.test('reach bottom action fired when scrolled to bottom', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            bounceEnabled: false,
            onReachBottom: function(e) {
              assert.ok(true, 'reachBottom fired');
            },
            useNative: false
          });
          var scrollView = $scrollView.dxScrollView('instance');
          var bottomPocketHeight = $scrollView.find('.' + SCROLLVIEW_REACHBOTTOM_CLASS).height();
          scrollView.scrollTo($(scrollView.content()).height() + bottomPocketHeight);
        });
        QUnit.test('loadPanel hiding after release', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            onPullDown: noop,
            useNative: false,
            inertiaEnabled: false
          });
          var scrollView = $scrollView.dxScrollView('instance');
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          scrollView.startLoading();
          scrollView.scrollTo(-$topPocket.height() - 1);
          scrollView.finishLoading();
          var loadPanel = $scrollView.find('.dx-loadpanel').dxLoadPanel('instance');
          assert.equal(loadPanel.option('visible'), false, 'load panel hiding');
        });
        QUnit.test('scrollTo considers pullDown', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: false,
            onPullDown: noop,
            bounceEnabled: true
          });
          var scrollView = $scrollView.dxScrollView('instance');
          var initialScrollTop = scrollView.scrollTop();
          assert.equal(initialScrollTop, 0, 'scrollTop has 0 position on start');
          scrollView.scrollTo(0);
          assert.equal(scrollView.scrollTop(), initialScrollTop, 'scrollTop not changed');
        });
      });
      QUnit.module('native pullDown strategy', {
        beforeEach: function() {
          moduleConfig.beforeEach.call(this);
          this._originalPlatform = devices.real().platform;
          devices.real({platform: 'ios'});
          $('#qunit-fixture').addClass('dx-theme-ios');
          this.originalJQueryScrollTop = $.fn.scrollTop;
          this.originalRendererScrollTop = renderer.fn.scrollTop;
          var currentValue = 0;
          renderer.fn.scrollTop = function(value) {
            if (arguments.length) {
              currentValue = value;
            } else {
              return currentValue;
            }
          };
          $.fn.scrollTop = function(value) {
            if (arguments.length) {
              currentValue = value;
            } else {
              return currentValue;
            }
          };
        },
        afterEach: function() {
          moduleConfig.afterEach.call(this);
          devices.real({platform: this._originalPlatform});
          $('#qunit-fixture').removeClass('dx-theme-ios');
          $.fn.scrollTop = this.originalJQueryScrollTop;
          renderer.fn.scrollTop = this.originalRendererScrollTop;
        }
      }, function() {
        QUnit.test('markup', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'pullDown'
          });
          var $pullDown = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_CLASS);
          assert.equal($pullDown.length, 1, 'pull down container');
          assert.equal($pullDown.find('.' + SCROLLVIEW_PULLDOWN_IMAGE_CLASS).length, 1, 'pull down image');
          assert.equal($pullDown.find('.' + SCROLLVIEW_PULLDOWN_INDICATOR_CLASS).length, 1, 'pull down load indicator container');
          assert.equal($pullDown.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS).length, 1, 'pull down text');
        });
        QUnit.test('pull down element position', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'pullDown',
            onPullDown: noop
          });
          var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollView);
          var $topPocket = $('.' + SCROLLVIEW_TOP_POCKET_CLASS, $scrollView);
          var containerOffset = $container.offset().top;
          var topPocketOffset = $topPocket.offset().top;
          var topPocketSize = $topPocket.height();
          assert.equal(containerOffset, topPocketOffset + topPocketSize, 'pull down element located above content');
        });
        QUnit.test('pull down element position after dynamic action specification', function(assert) {
          this.clock.restore();
          var done = assert.async();
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'pullDown'
          });
          $scrollView.dxScrollView('option', 'onPullDown', noop);
          setTimeout(function() {
            var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollView);
            var $topPocket = $('.' + SCROLLVIEW_TOP_POCKET_CLASS, $scrollView);
            var containerOffset = $container.offset().top;
            var topPocketOffset = $topPocket.offset().top;
            var topPocketSize = $topPocket.height();
            assert.equal(containerOffset, topPocketOffset + topPocketSize, 'pull down element located above content');
            done();
          }, 50);
        });
        QUnit.test('scrollTop method should have correct position on init', function(assert) {
          var scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'pullDown'
          }).dxScrollView('instance');
          assert.equal(scrollView.scrollTop(), 0, 'scrollTop is 0');
        });
        QUnit.test('scrollTop method should have correct position after scroll event', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'pullDown'
          });
          var scrollView = $('#scrollView').dxScrollView('instance');
          var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollView);
          scrollView.scrollTo({y: 10});
          $($container).trigger('scroll');
          assert.equal(scrollView.scrollTop(), 10, 'correct scroll position');
          scrollView.scrollTo({y: 0});
          $($container).trigger('scroll');
          assert.equal(scrollView.scrollTop(), 0, 'correct scroll position');
        });
        QUnit.test('pulled down adds ready state', function(assert) {
          if (isRenovatedScrollView) {
            assert.ok(true);
            return;
          }
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'pullDown',
            onPullDown: noop
          });
          var scrollView = $('#scrollView').dxScrollView('instance');
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $pullDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS);
          var topPocketHeight = $topPocket.height();
          scrollView.scrollTo({y: -topPocketHeight});
          $($container).trigger('scroll');
          assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_READY_CLASS), true, 'scrollview-pull-down-ready class added');
          assert.equal($pullDownText.children().eq(1).css('opacity'), 1, 'pullDown ready text');
          scrollView.scrollTo({y: -topPocketHeight + 1});
          $($container).trigger('scroll');
          assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_READY_CLASS), false, 'scrollview-pull-down-ready class removed');
          assert.equal($pullDownText.children().eq(0).css('opacity'), 1, 'pullDown to refresh text');
        });
        QUnit.test('onPullDown action', function(assert) {
          if (isRenovatedScrollView) {
            assert.ok(true);
            return;
          }
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'pullDown',
            onPullDown: function() {
              assert.ok(true, 'onPullDown action was fired');
              var location = getScrollOffset($scrollView).top;
              assert.equal(location, topPocketHeight, 'topPocket located at the top of container');
              location = getScrollOffset($scrollView).top;
              assert.equal(location, topPocketHeight, 'content located below the top pocket');
              assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_LOADING_CLASS), true, 'scrollview-pull-down-refreshing class added');
              assert.equal($pullDownText.children().eq(2).css('opacity'), 1, 'pullDown refreshing text');
            }
          });
          $('*', $scrollView).css({'transition': 'none'});
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $pullDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS);
          var topPocketHeight = $topPocket.height();
          var pointer = pointerMock($container).start().down();
          $container.scrollTop(-topPocketHeight);
          $($container).trigger('scroll');
          pointer.up();
          this.clock.tick(400);
        });
        QUnit.test('release', function(assert) {
          devices.real({platform: this._originalPlatform});
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'pullDown',
            onPullDown: function() {
              setTimeout(function() {
                scrollView.release();
              });
            }
          });
          var scrollView = $scrollView.dxScrollView('instance');
          var $wrapper = $scrollView.find('.' + SCROLLABLE_WRAPPER_CLASS);
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          var $pullDownText = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_TEXT_CLASS);
          var topPocketHeight = $topPocket.height();
          var pointer = pointerMock($container).start().down();
          $container.scrollTop(-topPocketHeight);
          $($wrapper).trigger('scroll');
          pointer.up();
          this.clock.tick(800);
          assert.ok(true, 'scrollView was enabled');
          var location = getTranslateValues($topPocket.get(0)).top;
          assert.equal(location, 0, 'topPocket located above content');
          location = getTranslateValues($scrollView.get(0)).top;
          assert.equal(location, 0, 'content located at the top of container');
          this.clock.restore();
          var done = assert.async();
          setTimeout(function() {
            assert.equal($topPocket.children().eq(0).hasClass(SCROLLVIEW_PULLDOWN_LOADING_CLASS), false, 'scrollview-pull-down-refreshing class added');
            assert.equal($pullDownText.children().eq(2).css('opacity'), 0, 'pullDown refreshing text');
            done();
          }, RESIZE_WAIT_TIMEOUT);
        });
        QUnit.test('onReachBottom', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'pullDown',
            onReachBottom: function() {
              assert.ok(true, 'onReachBottom action was fired');
            }
          });
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
          $scrollView.dxScrollView('instance').scrollTo($content.height() - $container.height() - $bottomPocket.height() + 0.51);
          $($container).trigger('scroll');
        });
        QUnit.test('release fires update', function(assert) {
          var onUpdatedHandler = sinon.spy();
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            onUpdated: onUpdatedHandler
          });
          onUpdatedHandler.reset();
          var clock = sinon.useFakeTimers();
          try {
            $scrollView.dxScrollView('release');
            clock.tick(400);
            assert.equal(onUpdatedHandler.callCount, isRenovatedScrollView ? 0 : 1, 'update fired');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('scroll fires with correct arguments', function(assert) {
          var top = true;
          var left = true;
          var right = false;
          var bottom = false;
          var lastScrollEventArgs;
          var $scrollView = $('#scrollView').width(50).height(50);
          $scrollView.children().width(100).height(100);
          var checkLastScrollEvent = function() {
            assert.equal(lastScrollEventArgs.reachedTop, top, 'reached top is correct');
            assert.equal(lastScrollEventArgs.reachedRight, right, 'reached right is correct');
            assert.equal(lastScrollEventArgs.reachedBottom, bottom, 'reached bottom is correct');
            assert.equal(lastScrollEventArgs.reachedLeft, left, 'reachde left is correct');
          };
          $scrollView.dxScrollView({
            useNative: true,
            direction: 'both',
            onScroll: function(e) {
              lastScrollEventArgs = e;
            }
          });
          var scrollView = $scrollView.dxScrollView('instance');
          var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollView);
          assert.ok(!lastScrollEventArgs, 'scroll was not triggered on start');
          $($container).trigger('scroll');
          checkLastScrollEvent();
          scrollView.scrollTo({
            x: 1,
            y: 1
          });
          top = false;
          left = false;
          $($container).trigger('scroll');
          checkLastScrollEvent();
          scrollView.scrollTo({
            x: $container.prop('scrollWidth') - $container.prop('clientWidth'),
            y: $container.prop('scrollHeight') - $container.prop('clientHeight')
          });
          right = true;
          bottom = true;
          $($container).trigger('scroll');
          checkLastScrollEvent();
        });
      });
      QUnit.module('native swipeDown strategy', {
        beforeEach: function() {
          moduleConfig.beforeEach.call(this);
          this._originalPlatform = devices.real().platform;
          devices.real({platform: 'android'});
          $('#qunit-fixture').addClass('dx-theme-android');
        },
        afterEach: function() {
          moduleConfig.afterEach.call(this);
          devices.real({platform: this._originalPlatform});
          $('#qunit-fixture').removeClass('dx-theme-android');
        }
      }, function() {
        QUnit.test('markup', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'swipeDown'
          });
          var $pullDown = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_CLASS);
          assert.equal($pullDown.length, 1, 'pull down container');
        });
        QUnit.test('topPocket visibility depends on onPullDown', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: true});
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_TOP_POCKET_CLASS);
          assert.ok($topPocket.is(':hidden'), 'topPocket hidden');
          $scrollView.dxScrollView('option', 'onPullDown', noop);
          assert.ok($topPocket.is(':visible'), 'topPocket visible');
        });
        QUnit.test('pull down element start state', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'swipeDown'
          });
          var $pullDown = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_CLASS);
          assert.equal($pullDown.css('opacity'), 0, 'pullDown hide with opacity');
        });
        QUnit.test('pulled down action should be fired when content less than container (T105659)', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'swipeDown',
            onPullDown: function() {
              assert.ok(true, 'pullDown fired');
            }
          });
          $($scrollView.dxScrollView('content')).height(10);
          $scrollView.dxScrollView('update');
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          pointerMock($container).start().down().move(0, PULLDOWN_HEIGHT / 2).move(0, PULLDOWN_HEIGHT / 2).up();
          this.clock.tick(400);
        });
        QUnit.test('pulled down action should be fired after pointer is up if the \'swipeDown\' strategy is used', function(assert) {
          var isPullDownActionFired = false;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'swipeDown',
            onPullDown: function() {
              isPullDownActionFired = true;
            }
          });
          $($scrollView.dxScrollView('content')).height(10);
          $scrollView.dxScrollView('update');
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var pointer = pointerMock($container).start().down().move(0, PULLDOWN_HEIGHT / 2).move(0, PULLDOWN_HEIGHT / 2);
          assert.ok(!isPullDownActionFired, 'pull down action is not fired');
          pointer.up();
          assert.ok(isPullDownActionFired, 'pull down action is fired after pointer is up');
        });
        QUnit.test('pulled down action should not be fired at the end of scrollview', function(assert) {
          var isPullDownActionFired = false;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'swipeDown',
            onPullDown: function() {
              isPullDownActionFired = true;
            },
            height: 100
          });
          $($scrollView.dxScrollView('content')).height(1000);
          $scrollView.dxScrollView('update');
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          pointerMock($container).start().down().move(0, -500).up();
          $scrollView.dxScrollView('scrollTo', {y: 500});
          $($container).trigger('scroll');
          this.clock.tick(400);
          pointerMock($container).start().down(0, 0).move(0, PULLDOWN_HEIGHT).up();
          assert.ok(!isPullDownActionFired, 'pull down action is not fired');
        });
        QUnit.test('release', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'swipeDown',
            onPullDown: function() {
              scrollView.release();
            }
          });
          var scrollView = $scrollView.dxScrollView('instance');
          var $pullDown = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_CLASS);
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          pointerMock($container).start().down().move(0, PULLDOWN_HEIGHT);
          assert.ok(true, 'scrollView was enabled');
          assert.equal($pullDown.hasClass(SCROLLVIEW_PULLDOWN_LOADING_CLASS), false, 'scrollview-pull-down-loading class removed');
        });
        QUnit.test('onReachBottom', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'swipeDown',
            onReachBottom: function() {
              assert.ok(true, 'onReachBottom action was fired');
            }
          });
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
          $scrollView.dxScrollView('instance').scrollTo($content.height() - $container.height() + $bottomPocket.height() + 1);
          $($container).trigger('scroll');
        });
        QUnit.test('onReachBottom action when content size changed', function(assert) {
          var count = 0;
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'swipeDown',
            onReachBottom: function() {
              count++;
            }
          });
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
          var $bottomPocket = $scrollView.find('.' + SCROLLVIEW_BOTTOM_POCKET_CLASS);
          $container.scrollTop($content.height() - $container.height() + $bottomPocket.height() + 1);
          $($container).trigger('scroll');
          assert.equal(count, 1, 'fire onReachBottom after first scroll');
          $($container).trigger('scroll');
          assert.equal(count, 1, 'onReachBottom doesn\'t fire if scroll position doesn\'t change');
          $content.height($content.height() * 2);
          $scrollView.dxScrollView('instance').release();
          $container.scrollTop($content.height() - $container.height() + $bottomPocket.height() + 1);
          $($container).trigger('scroll');
          assert.equal(count, 2, 'fire onReachBottom after second scroll');
        });
        QUnit.test('allow pullDown in Android Chrome for element with native scrolling', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            onPullDown: noop,
            refreshStrategy: 'swipeDown'
          });
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          $(document).on('dxpointermove.dxtestns', function(e) {
            if (e.isDefaultPrevented()) {
              assert.ok(true, 'move prevented');
            }
          });
          var pointer = pointerMock($container).start().down().move(0, 10).up();
          pointer.start().move(0, -10).up();
          $(document).off('.dxtestns');
        });
        QUnit.test('dxpointermove shouldn\'t be prevented if pullDown is displayed in Android Chrome', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            refreshStrategy: 'swipeDown'
          });
          var $container = $scrollView.find('.' + SCROLLABLE_CONTAINER_CLASS);
          $(document).on('dxpointermove.dxtestns', function(e) {
            assert.ok(!e.isDefaultPrevented(), 'move is not prevented');
          });
          pointerMock($container).start().down().move(0, 10).up();
          $(document).off('.dxtestns');
        });
        QUnit.test('release fires update', function(assert) {
          if (!('ontouchstart' in window)) {
            assert.ok(true, 'Ziborov: temporary we do not test this case if browser does not supported touch');
            return;
          }
          var onUpdatedHandler = sinon.spy();
          var $scrollView = $('#scrollView').dxScrollView({
            useNative: true,
            onUpdated: onUpdatedHandler
          });
          onUpdatedHandler.reset();
          var clock = sinon.useFakeTimers();
          try {
            $scrollView.dxScrollView('instance').release();
            clock.tick(800);
            assert.equal(onUpdatedHandler.callCount, isRenovatedScrollView ? 0 : 1, 'update fired');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('scroll fires with correct arguments', function(assert) {
          var top = true;
          var left = true;
          var right = false;
          var bottom = false;
          var lastScrollEventArgs;
          var $scrollView = $('#scrollView').width(50).height(50);
          $scrollView.children().width(100).height(100);
          var checkLastScrollEvent = function() {
            assert.equal(lastScrollEventArgs.reachedTop, top, 'reached top is correct');
            assert.equal(lastScrollEventArgs.reachedRight, right, 'reached right is correct');
            assert.equal(lastScrollEventArgs.reachedBottom, bottom, 'reached bottom is correct');
            assert.equal(lastScrollEventArgs.reachedLeft, left, 'reachde left is correct');
          };
          $scrollView.dxScrollView({
            useNative: true,
            direction: 'both',
            onScroll: function(e) {
              lastScrollEventArgs = e;
            }
          });
          var scrollView = $scrollView.dxScrollView('instance');
          var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollView);
          assert.ok(!lastScrollEventArgs, 'scroll was not triggered on start');
          $($container).trigger('scroll');
          checkLastScrollEvent();
          scrollView.scrollTo({
            x: 1,
            y: 1
          });
          top = false;
          left = false;
          $($container).trigger('scroll');
          checkLastScrollEvent();
          scrollView.scrollTo({
            x: $container.prop('scrollWidth') - $container.prop('clientWidth'),
            y: $container.prop('scrollHeight') - $container.prop('clientHeight')
          });
          right = true;
          bottom = true;
          $($container).trigger('scroll');
          checkLastScrollEvent();
        });
      });
      QUnit.module('regressions', moduleConfig, function() {
        QUnit.test('B251572 - dxScrollView - Scroll position flies away when setting the direction option to horizontal or both', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({});
          $scrollView.dxScrollView('option', 'direction', 'horizontal');
          var location = getScrollOffset($scrollView);
          assert.equal(location.left, 0);
        });
        QUnit.test('B252260 - dxScrollView raise the \'Unknown dxScrollView refresh strategy\' error in a simulator', function(assert) {
          assert.expect(0);
          $('#scrollView').dxScrollView({useNativeScrolling: true}).dxScrollView('instance');
        });
      });
      QUnit.module('default value', {
        beforeEach: function() {
          moduleConfig.beforeEach.call(this);
          this.originalRealDevice = devices.real();
          this.originalCurrentDevice = devices.current();
        },
        afterEach: function() {
          moduleConfig.afterEach.call(this);
          devices.real(this.originalRealDevice);
          devices.current(this.originalCurrentDevice);
        }
      }, function() {
        if (!isRenovatedScrollView) {
          QUnit.test('refreshStrategy for ios set by real device', function(assert) {
            devices.real({platform: 'ios'});
            devices.current({platform: 'android'});
            var scrollView = $('#scrollView').dxScrollView().dxScrollView('instance');
            assert.equal(scrollView.option('refreshStrategy'), 'pullDown');
          });
          QUnit.test('refreshStrategy for android set by real device', function(assert) {
            devices.real({
              platform: 'android',
              version: '4'
            });
            devices.current({platform: 'ios'});
            var scrollView = $('#scrollView').dxScrollView().dxScrollView('instance');
            assert.equal(scrollView.option('refreshStrategy'), 'swipeDown');
          });
        }
      });
      QUnit.module('pullDown, reachBottom events', moduleConfig, function() {
        if (isRenovatedScrollView) {
          [true, false].forEach(function(useNative) {
            QUnit.test(("useNative: " + useNative + ", pullDownEnabled, reachBottomEnabled prop value after initialization"), function(assert) {
              var scrollView = $('#scrollView').dxScrollView({useNative: useNative}).dxScrollView('instance');
              assert.equal(scrollView.option('pullDownEnabled'), false, 'scrollview.pullDownEnabled');
              assert.equal(scrollView.option('reachBottomEnabled'), false, 'scrollview.reachBottomEnabled');
            });
            QUnit.test(("useNative: " + useNative + ", pullDownEnabled, reachBottomEnabled prop value after initialization"), function(assert) {
              var scrollView = $('#scrollView').dxScrollView({
                useNative: useNative,
                onReachBottom: function() {},
                onPullDown: function() {}
              }).dxScrollView('instance');
              assert.equal(scrollView.option('pullDownEnabled'), true, 'scrollview.pullDownEnabled');
              assert.equal(scrollView.option('reachBottomEnabled'), true, 'scrollview.reachBottomEnabled');
            });
            QUnit.test(("useNative: " + useNative + ", pullDownEnabled prop value after change via option() method"), function(assert) {
              var scrollView = $('#scrollView').dxScrollView({useNative: useNative}).dxScrollView('instance');
              assert.equal(scrollView.option('pullDownEnabled'), false, 'scrollview.pullDownEnabled');
              scrollView.option('onPullDown', function() {});
              assert.equal(scrollView.option('pullDownEnabled'), true, 'scrollview.pullDownEnabled');
              scrollView.option('onPullDown', null);
              assert.equal(scrollView.option('pullDownEnabled'), false, 'scrollview.pullDownEnabled');
            });
            QUnit.test(("useNative: " + useNative + ", reachBottomEnabled prop value after change via option() method"), function(assert) {
              var scrollView = $('#scrollView').dxScrollView({useNative: useNative}).dxScrollView('instance');
              assert.equal(scrollView.option('reachBottomEnabled'), false, 'scrollview.reachBottomEnabled');
              scrollView.option('onReachBottom', function() {});
              assert.equal(scrollView.option('reachBottomEnabled'), true, 'scrollview.reachBottomEnabled');
              scrollView.option('onReachBottom', null);
              assert.equal(scrollView.option('reachBottomEnabled'), false, 'scrollview.reachBottomEnabled');
            });
            QUnit.test(("useNative: " + useNative + ", pullDownEnabled prop value after change via on() method"), function(assert) {
              var scrollView = $('#scrollView').dxScrollView({useNative: useNative}).dxScrollView('instance');
              assert.equal(scrollView.option('pullDownEnabled'), false, 'scrollview.pullDownEnabled');
              var handler = function() {};
              scrollView.on('pullDown', handler);
              assert.equal(scrollView.option('pullDownEnabled'), true, 'scrollview.pullDownEnabled');
            });
            QUnit.test(("useNative: " + useNative + ", reachBottomEnabled prop value after change via on() method"), function(assert) {
              var scrollView = $('#scrollView').dxScrollView({useNative: useNative}).dxScrollView('instance');
              assert.equal(scrollView.option('reachBottomEnabled'), false, 'scrollview.reachBottomEnabled');
              var handler = function() {};
              scrollView.on('reachBottom', handler);
              assert.equal(scrollView.option('reachBottomEnabled'), true, 'scrollview.reachBottomEnabled');
            });
          });
        }
        QUnit.test('topPocket visibility depends on pullDown event', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var $topPocket = $scrollView.find('.' + SCROLLVIEW_PULLDOWN_CLASS);
          $scrollView.dxScrollView('option', 'pullDownEnabled', true);
          $scrollView.dxScrollView('instance').on('pullDown', noop);
          assert.ok($topPocket.is(':visible'), 'topPocket is visible');
        });
        QUnit.test('pullDown event should be fired after refresh method call', function(assert) {
          assert.expect(1);
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          var instance = $scrollView.dxScrollView('instance');
          instance.on('pullDown', function() {
            assert.ok(true, 'pullDown is fired on refresh');
          });
          instance.refresh();
        });
        QUnit.test('bottomPocket element depends on reachBottom event', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          $scrollView.dxScrollView('option', 'reachBottomEnabled', true);
          $scrollView.dxScrollView('instance').on('reachBottom', noop);
          var $reachBottom = $scrollView.find('.' + SCROLLVIEW_REACHBOTTOM_CLASS);
          assert.ok($reachBottom.is(':visible'), 'reach bottom is visible');
        });
        QUnit.test('scrollview events support chains', function(assert) {
          var $scrollView = $('#scrollView').dxScrollView({useNative: false});
          $scrollView.dxScrollView('option', 'reachBottomEnabled', true);
          $scrollView.dxScrollView('option', 'pullDownEnabled', true);
          $scrollView.dxScrollView('instance').on('reachBottom', noop).on('pullDown', noop);
          assert.ok(true, 'chains is supported');
        });
        ['config', 'onInitialized'].forEach(function(assignMethod) {
          if (isRenovatedScrollView && assignMethod === 'onInitialized') {
            return;
          }
          QUnit.test('Check pullDown event handler - ' + assignMethod, function(assert) {
            var config = {};
            var pullDownHandler = sinon.stub();
            if (assignMethod === 'config') {
              config.onPullDown = pullDownHandler;
            } else if (assignMethod === 'onInitialized') {
              config.onInitialized = function(e) {
                e.component.on('pullDown', pullDownHandler);
              };
            } else {
              assert.ok(false);
            }
            var $scrollView = $('#scrollView').dxScrollView($.extend(config, {useNative: false}));
            assert.ok(true, 'no exceptions');
            var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
            var $topPocket = $scrollView.find(("." + SCROLLVIEW_TOP_POCKET_CLASS));
            pointerMock($content).start().down().move(0, $topPocket.height() + 10).up();
            assert.strictEqual(pullDownHandler.callCount, 1, 'pullDownHandler.callCount');
          });
          QUnit.test('Check reachBottom event handler - ' + assignMethod, function(assert) {
            var config = {};
            var reachBottomHandler = sinon.stub();
            if (assignMethod === 'config') {
              config.onReachBottom = reachBottomHandler;
            } else if (assignMethod === 'onInitialized') {
              config.onInitialized = function(e) {
                e.component.on('reachBottom', reachBottomHandler);
              };
            } else {
              assert.ok(false);
            }
            var $scrollView = $('#scrollView').dxScrollView($.extend(config, {useNative: false}));
            assert.ok(true, 'no exceptions');
            var $content = $scrollView.find(("." + SCROLLABLE_CONTENT_CLASS));
            pointerMock($content).start().down().move(0, -$content.height() - 10).up();
            assert.strictEqual(reachBottomHandler.callCount, 1, 'reachBottomHandler.callCount');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/renderer","core/utils/common","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","core/devices","localization/message","ui/themes","../../helpers/pointerMock.js","generic_light.css!","ui/scroll_view","./scrollableParts/scrollable.constants.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/renderer"), require("core/utils/common"), require("renovation/ui/scroll_view/utils/get_translate_values"), require("animation/frame"), require("core/devices"), require("localization/message"), require("ui/themes"), require("../../helpers/pointerMock.js"), require("generic_light.css!"), require("ui/scroll_view"), require("./scrollableParts/scrollable.constants.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollView.tests.js.map