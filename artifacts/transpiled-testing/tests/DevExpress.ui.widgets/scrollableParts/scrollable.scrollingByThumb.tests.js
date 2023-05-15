!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.scrollingByThumb.tests.js"], ["jquery","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","ui/scroll_view/ui.scrollbar","../../../helpers/pointerMock.js","ui/scroll_view/ui.scrollable","generic_light.css!","./scrollable.constants.js","inferno"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.scrollingByThumb.tests.js", ["jquery", "renovation/ui/scroll_view/utils/get_translate_values", "animation/frame", "ui/scroll_view/ui.scrollbar", "../../../helpers/pointerMock.js", "ui/scroll_view/ui.scrollable", "generic_light.css!", "./scrollable.constants.js", "inferno"], function($__export) {
  "use strict";
  var $,
      getTranslateValues,
      animationFrame,
      Scrollbar,
      pointerMock,
      Scrollable,
      SCROLLABLE_CONTAINER_CLASS,
      SCROLLABLE_CONTENT_CLASS,
      SCROLLABLE_SCROLLBAR_CLASS,
      SCROLLABLE_SCROLL_CLASS,
      SCROLLBAR_VERTICAL_CLASS,
      SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE,
      SCROLLABLE_SCROLLBAR_ACTIVE_CLASS,
      reRender,
      isRenovatedScrollable,
      moduleConfig,
      getScrollOffset;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      getTranslateValues = $__m.getTranslateValues;
    }, function($__m) {
      animationFrame = $__m.default;
    }, function($__m) {
      Scrollbar = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      Scrollable = $__m.default;
    }, function($__m) {}, function($__m) {
      SCROLLABLE_CONTAINER_CLASS = $__m.SCROLLABLE_CONTAINER_CLASS;
      SCROLLABLE_CONTENT_CLASS = $__m.SCROLLABLE_CONTENT_CLASS;
      SCROLLABLE_SCROLLBAR_CLASS = $__m.SCROLLABLE_SCROLLBAR_CLASS;
      SCROLLABLE_SCROLL_CLASS = $__m.SCROLLABLE_SCROLL_CLASS;
      SCROLLBAR_VERTICAL_CLASS = $__m.SCROLLBAR_VERTICAL_CLASS;
      SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = $__m.SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE;
      SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = $__m.SCROLLABLE_SCROLLBAR_ACTIVE_CLASS;
    }, function($__m) {
      reRender = $__m.rerender;
    }],
    execute: function() {
      isRenovatedScrollable = !!Scrollable.IS_RENOVATED_WIDGET;
      moduleConfig = {
        beforeEach: function() {
          var markup = "\n            <style nonce=\"qunit-test\">\n                #scrollable {\n                    height: 50px;\n                    width: 50px;\n                }\n                #scrollable .content1 {\n                    height: 100px;\n                    width: 100px;\n                }\n            </style>\n            <div id=\"scrollable\">\n                <div class=\"content1\"></div>\n                <div class=\"content2\"></div>\n            </div>";
          $('#qunit-fixture').html(markup);
          this.clock = sinon.useFakeTimers();
          this._originalRequestAnimationFrame = animationFrame.requestAnimationFrame;
          animationFrame.requestAnimationFrame = function(callback) {
            callback();
          };
        },
        afterEach: function() {
          this.clock.restore();
          animationFrame.requestAnimationFrame = this._originalRequestAnimationFrame;
        }
      };
      getScrollOffset = function($scrollable) {
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var location = getTranslateValues($content.get(0));
        return {
          top: location.top - $container.scrollTop(),
          left: location.left - $container.scrollLeft()
        };
      };
      QUnit.module('scrolling by thumb', moduleConfig);
      QUnit.test('normalize visibilityMode for scrollbar', function(assert) {
        if (isRenovatedScrollable) {
          assert.ok(true);
          return;
        }
        var $scrollable = $('#scrollable').dxScrollable({
          showScrollbar: true,
          useNative: false
        });
        var scrollbar = Scrollbar.getInstance($('.' + SCROLLABLE_SCROLLBAR_CLASS, $scrollable));
        assert.equal(scrollbar.option('visibilityMode'), 'onScroll', 'true normalize to onScroll');
        $scrollable.dxScrollable('option', 'showScrollbar', false);
        scrollbar = Scrollbar.getInstance($('.' + SCROLLABLE_SCROLLBAR_CLASS, $scrollable));
        assert.equal(scrollbar.option('visibilityMode'), 'never', 'true normalize to onScroll');
      });
      QUnit.test('scroll by thumb', function(assert) {
        var containerHeight = 50;
        var contentHeight = 100;
        var $scrollable = $('#scrollable').dxScrollable({
          scrollByThumb: true,
          inertiaEnabled: false,
          useNative: false
        });
        var $thumb = $scrollable.find('.' + SCROLLABLE_SCROLL_CLASS);
        var mouse = pointerMock($thumb).start();
        var location;
        var distance = 10;
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var containerToContentRatio = (containerHeight / contentHeight);
        $container.height(containerHeight);
        $content.height(contentHeight);
        $scrollable.dxScrollable('update');
        mouse.down();
        var downEvent = mouse.lastEvent();
        mouse.move(0, distance);
        location = getScrollOffset($scrollable);
        assert.notOk(downEvent.isDefaultPrevented(), 'default is not prevented');
        assert.equal(location.top, -distance / containerToContentRatio, 'scroll follows pointer');
        mouse.move(0, distance);
        location = getScrollOffset($scrollable);
        assert.equal(location.top, -2 * distance / containerToContentRatio, 'scroll follows pointer everytime');
      });
      QUnit.test('scrollTo should scroll to correct position during scroll by thumb', function(assert) {
        var containerHeight = 50;
        var contentHeight = 100;
        var $scrollable = $('#scrollable').dxScrollable({
          scrollByThumb: true,
          inertiaEnabled: false,
          useNative: false
        });
        var $thumb = $scrollable.find('.' + SCROLLABLE_SCROLL_CLASS);
        var mouse = pointerMock($thumb).start();
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var instance = $scrollable.dxScrollable('instance');
        $container.height(containerHeight);
        $content.height(contentHeight);
        instance.update();
        mouse.down().move(0, 10);
        instance.scrollTo(30);
        assert.equal(instance.scrollTop(), 30, 'scroll has correct position');
      });
      QUnit.test('scroll by thumb without scrolling by content', function(assert) {
        var containerHeight = 50;
        var contentHeight = 100;
        var $scrollable = $('#scrollable').dxScrollable({
          scrollByThumb: true,
          scrollByContent: false,
          bounceEnabled: false,
          inertiaEnabled: false,
          useNative: false
        });
        var $thumb = $scrollable.find('.' + SCROLLABLE_SCROLL_CLASS);
        var mouse = pointerMock($thumb).start();
        var distance = 10;
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        $container.height(containerHeight);
        $content.height(contentHeight);
        $scrollable.dxScrollable('update');
        mouse.down().move(0, distance);
        assert.notEqual(getScrollOffset($scrollable).top, 0, 'scroll follows pointer');
      });
      QUnit.test('scroll by thumb should prevent scrolling cross direction', function(assert) {
        var containerSize = 50;
        var contentSize = 100;
        var $scrollable = $('#scrollable').dxScrollable({
          direction: 'both',
          scrollByThumb: true,
          scrollByContent: true,
          bounceEnabled: false,
          inertiaEnabled: false,
          useNative: false
        });
        var $thumb = $scrollable.find('.' + SCROLLBAR_VERTICAL_CLASS + ' .' + SCROLLABLE_SCROLL_CLASS);
        var mouse = pointerMock($thumb).start();
        var distance = 10;
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        $container.height(containerSize).width(containerSize);
        $content.height(contentSize).width(contentSize);
        $scrollable.dxScrollable('update');
        mouse.down().move(-distance, distance);
        assert.equal(getScrollOffset($scrollable).left, 0, 'horizontal scrolling prevented');
      });
      QUnit.test('thumb is visible on mouseenter when thumbMode=\'onHover\'', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          showScrollbar: 'onHover',
          inertiaEnabled: false,
          useNative: false
        });
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        assert.equal($scroll.hasClass('dx-state-invisible'), true, 'thumb is hidden after scrollable creation');
        $container.trigger('mouseenter');
        assert.equal($scroll.hasClass('dx-state-invisible'), false, 'thumb is visible after mouse enter');
        $container.trigger('mouseleave');
        reRender();
        assert.equal($scroll.hasClass('dx-state-invisible'), true, 'thumb is hidden after mouse leave');
      });
      QUnit.test('thumb is visible after update when content became more then container', function(assert) {
        var $scrollable = $('#scrollable').height(100);
        var $innerWrapper = $scrollable.wrapInner('<div>').children().height(50);
        $scrollable.dxScrollable({
          showScrollbar: 'onHover',
          useNative: false
        });
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        $container.trigger('mouseenter');
        assert.equal($scroll.hasClass('dx-state-invisible'), true, 'thumb is hidden when content less then container');
        $innerWrapper.height(200);
        $scrollable.dxScrollable('update');
        assert.equal($scroll.hasClass('dx-state-invisible'), false, 'thumb is visible after update');
      });
      QUnit.test('showScrollbar: onHover, useNative: false, direction: vertical -> scaleRatio should be recalculated on mouseenter before scrollbar has been shown', function(assert) {
        var $scrollable = $('#scrollable').height(100);
        $scrollable.wrapInner('<div>').children().height(200);
        $scrollable.dxScrollable({
          showScrollbar: 'onHover',
          useNative: false,
          direction: 'vertical'
        });
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        var $container = $scrollable.find(("." + SCROLLABLE_CONTAINER_CLASS));
        assert.equal($scroll.get(0).getBoundingClientRect().height, 50, 'real thumb size');
        assert.equal($scroll.height(), 46, 'thumb size');
        assert.equal($scroll.hasClass('dx-state-invisible'), true, 'thumb is hidden');
        $scrollable.css('transform', 'scale(0.50)');
        $container.trigger('mouseenter');
        assert.equal($scroll.get(0).getBoundingClientRect().height, 25, 'real thumb size');
        assert.equal($scroll.height(), 46, 'thumb size');
        assert.equal($scroll.hasClass('dx-state-invisible'), false, 'thumb is visible after mouseenter');
      });
      QUnit.test('thumb hide after scroll when showScrollbar = onScroll', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          showScrollbar: 'onScroll',
          inertiaEnabled: false,
          useNative: false
        });
        var $content = $('.' + SCROLLABLE_CONTENT_CLASS, $scrollable);
        var $scrollbar = $('.' + SCROLLABLE_SCROLLBAR_CLASS, $scrollable);
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        $scrollbar.trigger('mouseenter');
        pointerMock($content).start().wheel(1);
        this.clock.tick(500);
        assert.equal($scroll.hasClass('dx-state-invisible'), true, 'thumb is hidden');
      });
      QUnit.test('thumb stays visible after scroll when mouseEnter on scrollbar and scroll stopped', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          showScrollbar: 'onHover',
          inertiaEnabled: false,
          useNative: false
        });
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        $container.trigger('mouseenter');
        pointerMock($container).start().wheel(1);
        assert.equal($scroll.hasClass('dx-state-invisible'), false, 'thumb is visible after mouse enter');
      });
      QUnit.test('thumb always visible when showScroll = always', function(assert) {
        var $scrollable = $('#scrollable').height(100);
        $scrollable.children().height(200);
        $scrollable.dxScrollable({
          showScrollbar: 'always',
          inertiaEnabled: false,
          useNative: false
        });
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        assert.equal($scroll.hasClass('dx-state-invisible'), false, 'thumb is visible always');
        pointerMock($('.' + SCROLLABLE_CONTENT_CLASS, $scrollable)).start().wheel(1);
        assert.equal($scroll.hasClass('dx-state-invisible'), false, 'thumb is visible always');
      });
      QUnit.test('always visible class should be added when showScrollbar = always', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          showScrollbar: 'always',
          useNative: false
        });
        assert.equal($scrollable.hasClass(SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE), true, 'class added');
        $scrollable.dxScrollable('option', 'showScrollbar', 'never');
        assert.equal($scrollable.hasClass(SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE), false, 'class added');
      });
      QUnit.test('showScrollbar option change', function(assert) {
        var $scrollable = $('#scrollable').height(100);
        $scrollable.children().height(200);
        $scrollable.dxScrollable({
          showScrollbar: 'always',
          useNative: false
        });
        $scrollable.dxScrollable('option', 'showScrollbar', 'never');
        var $scrollbar = $('.' + SCROLLABLE_SCROLLBAR_CLASS, $scrollable);
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        assert.equal($scrollbar.is(':hidden'), true);
        assert.equal($scrollbar.css('display'), 'none');
        assert.equal($scroll.hasClass('dx-state-invisible'), true);
      });
      QUnit.test('scrolling by thumb does not cause inertia', function(assert) {
        assert.expect(1);
        var containerHeight = 50;
        var contentHeight = 100;
        var $scrollable = $('#scrollable').dxScrollable({
          scrollByThumb: true,
          useNative: false,
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            assert.equal(location.top, -2 * distance / containerToContentRatio, 'no inertia');
          }
        });
        $scrollable.find('.' + SCROLLABLE_CONTENT_CLASS).height(contentHeight);
        var $thumb = $scrollable.find('.' + SCROLLABLE_SCROLL_CLASS);
        var mouse = pointerMock($thumb).start();
        var distance = 10;
        var containerToContentRatio = (containerHeight / contentHeight);
        $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS).height(containerHeight);
        $scrollable.dxScrollable('update');
        mouse.down().move(0, distance).wait(20).move(0, distance).up();
      });
      QUnit.test('thumb is visible on mouseenter when thumbMode=\'onHover\' only for single scrollable nested in another scrollable', function(assert) {
        var $scrollable = $('#scrollable');
        var $wrapScrollable = $scrollable.wrap('<div>').parent();
        $wrapScrollable.height(100);
        $scrollable.height(200);
        $scrollable.children().height(300);
        var scrollableOption = {
          useNative: false,
          showScrollbar: 'onHover'
        };
        $scrollable.dxScrollable(scrollableOption);
        $wrapScrollable.dxScrollable(scrollableOption);
        var $scrollableContainer = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        var $wrapScrollableContainer = $('.' + SCROLLABLE_CONTAINER_CLASS, $wrapScrollable).not($scrollableContainer);
        var $scrollableScroll = $scrollableContainer.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        var $wrapScrollableScroll = $wrapScrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll")).not($scrollableScroll);
        $wrapScrollableContainer.trigger('mouseenter');
        $scrollableContainer.trigger('mouseenter');
        reRender();
        assert.equal($scrollableScroll.hasClass('dx-state-invisible'), false, 'scrollbar is visible for inner scrollable');
        assert.equal($wrapScrollableScroll.hasClass('dx-state-invisible'), isRenovatedScrollable ? false : true, 'scrollbar visibility for outer scrollable');
      });
      QUnit.test('scroll by thumb does not hide scrollbar when mouse goes outside of scrollable', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          showScrollbar: 'onHover',
          scrollByContent: true
        });
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        $container.trigger('mouseenter');
        pointerMock($container).start().down().move(0, -1);
        assert.equal($scroll.hasClass('dx-state-invisible'), false, 'scrollbar is visible');
        $container.trigger('mouseleave');
        assert.equal($scroll.hasClass('dx-state-invisible'), false, 'scrollbar is visible after mouseleave');
      });
      QUnit.test('leaving inner scroller and releasing in outer scroller should hide inner scrollbar and show outer scrollbar', function(assert) {
        var $scrollable = $('#scrollable');
        var $wrapScrollable = $scrollable.wrap('<div>').parent();
        $wrapScrollable.height(100);
        $scrollable.height(200);
        $scrollable.children().height(300);
        var scrollableOption = {
          useNative: false,
          inertiaEnabled: false,
          showScrollbar: 'onHover'
        };
        $scrollable.dxScrollable(scrollableOption);
        $wrapScrollable.dxScrollable(scrollableOption);
        var $scrollableContainer = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        var $wrapScrollableContainer = $('.' + SCROLLABLE_CONTAINER_CLASS, $wrapScrollable).not($scrollableContainer);
        var $scrollableScroll = $scrollableContainer.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        var $wrapScrollableScroll = $wrapScrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll")).not($scrollableScroll);
        $wrapScrollableContainer.trigger('mouseenter');
        $scrollableContainer.trigger('mouseenter');
        pointerMock($scrollableContainer).start().down().move(0, 10);
        $scrollableContainer.trigger($.Event('mouseleave', {relatedTarget: $wrapScrollableContainer.get(0)}));
        pointerMock($wrapScrollableContainer).up();
        assert.equal($scrollableScroll.hasClass('dx-state-invisible'), true, 'scrollbar is hidden for inner scrollable');
        assert.equal($wrapScrollableScroll.hasClass('dx-state-invisible'), false, 'scrollbar is visible for outer scrollable');
      });
      QUnit.test('scrollbar is visible for parent scrollable after mouse leave for children scrollable', function(assert) {
        var $scrollable = $('#scrollable').height(250);
        var $childScrollable = $('<div>').height(500);
        $childScrollable.append('<div>').children().height(750);
        $childScrollable.appendTo($scrollable).dxScrollable({
          useNative: false,
          showScrollbar: 'onHover',
          direction: 'vertical'
        });
        $scrollable.dxScrollable({
          useNative: false,
          showScrollbar: 'onHover',
          direction: 'vertical'
        });
        var $parentContainer = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS).eq(0);
        var $childrenContainer = $childScrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        $parentContainer.trigger($.Event('mouseenter', {originalEvent: {target: $parentContainer.get(0)}}));
        $childrenContainer.trigger($.Event('mouseenter', {originalEvent: {target: $childrenContainer.get(0)}}));
        reRender();
        var $childrenScroll = $childScrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        var $parentScroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll")).not($childrenScroll);
        assert.equal($parentScroll.hasClass('dx-state-invisible'), isRenovatedScrollable ? false : true, 'parent scrollbar visibility');
        assert.equal($childrenScroll.hasClass('dx-state-invisible'), false, 'children scrollbar is visible');
        $childScrollable.triggerHandler($.Event('mouseleave', {relatedTarget: $parentContainer.get(0)}));
        reRender();
        assert.equal($parentScroll.hasClass('dx-state-invisible'), false, 'parent scrollbar is visible');
        assert.equal($childrenScroll.hasClass('dx-state-invisible'), true, 'children scrollbar is hidden');
      });
      QUnit.test('scrollbar is visible for parent scrollable after start', function(assert) {
        var $scrollable = $('#scrollable').height(25);
        var $childScrollable = $('<div>').height(50);
        $childScrollable.append('<div>').children().height(75);
        $childScrollable.appendTo($scrollable).dxScrollable({
          useNative: false,
          showScrollbar: 'onHover',
          direction: 'vertical'
        });
        $scrollable.dxScrollable({
          useNative: false,
          showScrollbar: 'onHover',
          direction: 'vertical'
        });
        var $parentContainer = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS).eq(0);
        var $childrenContainer = $childScrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        $parentContainer.trigger($.Event('mouseenter', {originalEvent: {target: $parentContainer.get(0)}}));
        $childrenContainer.trigger($.Event('mouseenter', {originalEvent: {target: $childrenContainer.get(0)}}));
        pointerMock($childrenContainer).start().down().move(0, 10);
        $childrenContainer.trigger($.Event('mouseleave', {originalEvent: {target: $childrenContainer.get(0)}}));
        var $childrenScroll = $childScrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        var $parentScroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll")).not($childrenScroll);
        assert.equal($parentScroll.hasClass('dx-state-invisible'), isRenovatedScrollable ? false : true, 'parent scrollbar is hidden');
        assert.equal($childrenScroll.hasClass('dx-state-invisible'), false, 'children scrollbar is visible');
      });
      QUnit.test('scrollbar set active state only for one scrollable when direction of parentScrollable is horizontal and direction of innerScrollable is vertical', function(assert) {
        var $scrollable = $('#scrollable').height(25);
        var $childScrollable = $('<div>').height(50).appendTo($scrollable);
        $childScrollable.append('<div>').children().height(75);
        $childScrollable.dxScrollable({
          useNative: false,
          showScrollbar: 'onHover',
          direction: 'vertical'
        });
        $scrollable.dxScrollable({
          useNative: false,
          showScrollbar: 'onHover',
          direction: 'horizontal'
        });
        var $childScrollbar = $childScrollable.find('.' + SCROLLABLE_SCROLLBAR_CLASS);
        var $scrollbar = $scrollable.find('.' + SCROLLABLE_SCROLLBAR_CLASS).not($childScrollbar);
        pointerMock($childScrollable).start().down().up();
        assert.equal($childScrollbar.hasClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS), false, 'child scrollbar has not active state');
        assert.equal($scrollbar.hasClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS), false, 'scrollbar has not active state');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","ui/scroll_view/ui.scrollbar","../../../helpers/pointerMock.js","ui/scroll_view/ui.scrollable","generic_light.css!","./scrollable.constants.js","inferno"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("renovation/ui/scroll_view/utils/get_translate_values"), require("animation/frame"), require("ui/scroll_view/ui.scrollbar"), require("../../../helpers/pointerMock.js"), require("ui/scroll_view/ui.scrollable"), require("generic_light.css!"), require("./scrollable.constants.js"), require("inferno"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.scrollingByThumb.tests.js.map