!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/pager.tests.js"], ["core/utils/size","jquery","core/utils/common","core/utils/type","core/utils/shadow_dom","generic_light.css!","ui/pager","localization"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/pager.tests.js", ["core/utils/size", "jquery", "core/utils/common", "core/utils/type", "core/utils/shadow_dom", "generic_light.css!", "ui/pager", "localization"], function($__export) {
  "use strict";
  var setWidth,
      getWidth,
      getOuterWidth,
      $,
      commonUtils,
      typeUtils,
      addShadowDomStyles,
      Pager,
      localization,
      PAGER_LIGHT_MODE_WIDTH;
  function getText(element) {
    return $(element).text();
  }
  function isLightMode(pager) {
    return pager.$element().hasClass('dx-light-mode');
  }
  return {
    setters: [function($__m) {
      setWidth = $__m.setWidth;
      getWidth = $__m.getWidth;
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {}, function($__m) {
      Pager = $__m.default;
    }, function($__m) {
      localization = $__m.default;
    }],
    execute: function() {
      PAGER_LIGHT_MODE_WIDTH = 200;
      QUnit.testStart(function() {
        var markup = '<div id="container"></div>';
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Pager', {beforeEach: function() {
          this.checkPages = function(pages, values, selectedValue) {
            var i;
            var value;
            var element;
            if (pages.length !== values.length) {
              return false;
            }
            for (i = 0; i < pages.length; i++) {
              element = pages[i]._$page[0];
              value = getText(element);
              if (value !== String(values[i])) {
                return false;
              }
              if (element.className.indexOf('dx-selection') > -1 && value !== selectedValue) {
                return false;
              }
            }
            return true;
          };
        }}, function() {
        var isRenovation = !!Pager.IS_RENOVATED_WIDGET;
        var getPagesElement = function(rootElement) {
          return rootElement.find(isRenovation ? '.dx-page-indexes' : '.dx-pages')[0].childNodes;
        };
        QUnit.test('Default options init', function(assert) {
          var $pager = $('#container').dxPager();
          var instance = $pager.dxPager('instance');
          assert.ok(instance.option('visible'), 'visible');
          assert.equal(instance.option('pageIndex'), 1, 'pageIndex');
          assert.equal(instance.option('maxPagesCount'), 10, 'maxPagesCount');
          assert.equal(instance.option('pageCount'), 10, 'pageCount');
          assert.deepEqual(instance.option('pageSizes'), [5, 10], 'pageSizes');
          assert.ok(instance.option('hasKnownLastPage'), 'hasKnownLastPage');
          if (isRenovation) {
            assert.equal(instance.option('defaultPageSize'), 5, 'pageSize');
          } else {
            assert.equal(instance.option('pageSize'), 5, 'pageSize');
            assert.deepEqual(instance.option('pageIndexChanged'), commonUtils.noop, 'pageIndexChanged');
            assert.deepEqual(instance.option('pageSizeChanged'), commonUtils.noop, 'pageSizeChanged');
          }
        });
        QUnit.test('Markup init', function(assert) {
          var $pager = $('#container').dxPager();
          var $pageSizeButton = $pager.find('.dx-page-size').first();
          var $pageNumberButton = $pager.find('.dx-page').eq(2);
          assert.ok($pager.hasClass('dx-pager'), 'pager class');
          assert.notStrictEqual($pager.css('display'), 'none', 'element is visible');
          assert.strictEqual($pager.find('.dx-pages').length, 1, 'pages chooser element');
          assert.equal($pager.find('.dx-page').length, 10, 'page elements count');
          assert.equal($pager.find('.dx-page-sizes').length, 1, 'page sizes element');
          assert.equal($pager.find('.dx-page-size').length, 2, 'page size elements');
          assert.equal($pager.find('.dx-pages' + ' .' + 'dx-selection').length, 1, 'page selection');
          assert.equal($pager.find('.dx-pages' + ' .' + 'dx-selection').attr('tabindex'), 0, 'page selection tabindex');
          assert.equal($pager.find('.dx-page-sizes' + ' .' + 'dx-selection').length, 1, 'page size selection');
          assert.notOk($pager.find('.dx-page[role=button]:not([tabindex])').hasClass('dx-selection'), 'Not selected buttons has no tabindex');
          assert.equal($pageSizeButton.attr('role'), 'button', 'Page size element has correct role');
          assert.equal($pageNumberButton.attr('role'), 'button', 'Page number element has correct role');
          assert.equal($pageSizeButton.attr('aria-label'), 'Items per page: 5', 'Page size element has correct aria-label');
          assert.equal($pageNumberButton.attr('aria-label'), 'Page 3', 'Page number element has correct aria-label');
        });
        QUnit.test('Events are called', function(assert) {
          var $pager = $('#container').dxPager({
            pageIndexChanged: function(pageIndex) {
              testPageIndex = pageIndex;
            },
            pageSizeChanged: function(pageSize) {
              testPageSize = pageSize;
            }
          });
          var testPageIndex = null;
          var testPageSize = null;
          $($pager.find('.dx-page')[1]).trigger('dxclick');
          assert.equal(testPageIndex, 2, 'pageIndex is changed');
          $($pager.find('.dx-page-size')[1]).trigger('dxclick');
          assert.equal(testPageSize, 10, 'pageSize is changed');
        });
        QUnit.test('Markup when a pages count less max pages count', function(assert) {
          var $pager = $('#container').dxPager({pageCount: 15});
          assert.equal($pager.find('.dx-page').length, 6, 'page elements count');
          assert.strictEqual($pager.find('.dx-separator').length, 1, 'page separator element');
          assert.equal($pager.find('.dx-page-sizes').length, 1, 'page sizes element');
          assert.equal($pager.find('.dx-page-size').length, 2, 'page size elements');
          assert.equal($pager.find('.dx-pages' + ' .' + 'dx-selection').length, 1, 'page selection');
          assert.equal($pager.find('.dx-page-sizes' + ' .' + 'dx-selection').length, 1, 'page size selection');
        });
        QUnit.test('Pager is not rendered if pages count equal zero', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 7,
            pageCount: 0
          });
          assert.strictEqual($pager.find('.dx-pages').length, 0, 'pager is not rendered');
        });
        QUnit.test('Pager is rendered if pages count equals one and more page exists', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 7,
            pageCount: 1,
            hasKnownLastPage: false
          });
          var instance = $pager.dxPager('instance');
          if (isRenovation) {
            assert.strictEqual($pager.find('.dx-next-button').length, 1, 'pager has next page button');
            assert.strictEqual($pager.find('.dx-prev-button').length, 0, 'pager doesnt have prev page button');
          } else {
            assert.strictEqual($pager.find('.dx-pages').length, 1, 'pager is rendered');
            assert.ok(this.checkPages(instance._pages, [1, '>'], '1'), 'pages');
          }
        });
        QUnit.test('Pager second render', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 7,
            pageCount: 5
          });
          var instance = $pager.dxPager('instance');
          instance._render();
          assert.equal($('.' + 'dx-pager').length, 1, 'drawn one pager only');
        });
        QUnit.test('Get pages when pages count more maxPagesCount', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 10,
            pageCount: 13
          });
          var instance = $pager.dxPager('instance');
          instance._render();
          assert.ok(this.checkPages(instance._pages, [1, 2, 3, 4, 5, 13], '1'), 'pages');
        });
        QUnit.test('Get pages when pages count more maxPagesCount and more page exists', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 10,
            pageCount: 13,
            hasKnownLastPage: false
          });
          var instance = $pager.dxPager('instance');
          if (isRenovation) {
            assert.strictEqual($pager.find('.dx-next-button').length, 1, 'pager has next page button');
            assert.strictEqual($pager.find('.dx-prev-button').length, 0, 'pager doesnt have prev page button');
            assert.ok(this.checkPages(instance._pages, [1, 2, 3, 4, 5, 13], '1'), 'pages');
          } else {
            assert.ok(this.checkPages(instance._pages, [1, 2, 3, 4, 5, 13, '>'], '1'), 'pages');
          }
        });
        QUnit.test('Get pages when pages count more maxPagesCount after pages count is changed', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 10,
            pageCount: 1
          });
          var instance = $pager.dxPager('instance');
          instance.option('pageCount', 13);
          assert.ok(this.checkPages(instance._pages, [1, 2, 3, 4, 5, 13], '1'), 'pages');
        });
        QUnit.test('Get pages when more page does not exist after changed', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 10,
            pageCount: 13,
            hasKnownLastPage: false
          });
          var instance = $pager.dxPager('instance');
          instance.option({
            pageCount: 14,
            hasKnownLastPage: true
          });
          assert.ok(this.checkPages(instance._pages, [1, 2, 3, 4, 5, 14], '1'), 'pages');
        });
        QUnit.test('Get pages when pages count less maxPagesCount', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 10,
            pageCount: 7
          });
          var instance = $pager.dxPager('instance');
          assert.ok(this.checkPages(instance._pages, [1, 2, 3, 4, 5, 6, 7], '1'), 'pages');
        });
        QUnit.test('SelectPageByValue', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 10,
            pageCount: 13
          });
          var instance = $pager.dxPager('instance');
          var pages = function() {
            return instance._pages;
          };
          assert.ok(this.checkPages(pages(), [1, 2, 3, 4, 5, 13], '1'), 'page value = 1');
          instance._selectPageByValue(2);
          assert.ok(this.checkPages(pages(), [1, 2, 3, 4, 5, 13], '2'), 'page value = 2');
          instance._selectPageByValue(3);
          assert.ok(this.checkPages(pages(), [1, 2, 3, 4, 5, 13], '3'), 'page value = 3');
          instance._selectPageByValue(4);
          assert.ok(this.checkPages(pages(), [1, 2, 3, 4, 5, 13], '4'), 'page value = 4');
          instance._selectPageByValue(5);
          assert.ok(this.checkPages(pages(), [1, 3, 4, 5, 6, 13], '5'), 'page value = 5');
          instance._selectPageByValue(6);
          assert.ok(this.checkPages(pages(), [1, 4, 5, 6, 7, 13], '6'), 'page value = 6');
          instance._selectPageByValue(7);
          assert.ok(this.checkPages(pages(), [1, 5, 6, 7, 8, 13], '7'), 'page value = 7');
          instance._selectPageByValue(8);
          assert.ok(this.checkPages(pages(), [1, 6, 7, 8, 9, 13], '8'), 'page value = 8');
          instance._selectPageByValue(9);
          assert.ok(this.checkPages(pages(), [1, 7, 8, 9, 10, 13], '9'), 'page value = 9');
          instance._selectPageByValue(10);
          assert.ok(this.checkPages(pages(), [1, 8, 9, 10, 11, 13], '10'), 'page value = 10');
          instance._selectPageByValue(11);
          assert.ok(this.checkPages(pages(), [1, 9, 10, 11, 12, 13], '11'), 'page value = 11');
          instance._selectPageByValue(1);
          assert.ok(this.checkPages(pages(), [1, 2, 3, 4, 5, 13], '1'), 'page value = 1');
          instance._selectPageByValue(13);
          assert.ok(this.checkPages(pages(), [1, 9, 10, 11, 12, 13], '13'), 'page value = 13');
        });
        QUnit.test('Render pages without separator', function(assert) {
          var testElement = $('#container');
          testElement.dxPager({
            maxPagesCount: 7,
            pageCount: 5
          });
          var pagesElement = getPagesElement(testElement);
          assert.equal(pagesElement.length, 5, 'pages elements count');
          assert.equal(getText(pagesElement[0]), '1', 'page 1');
          assert.equal(getText(pagesElement[1]), '2', 'page 2');
          assert.equal(getText(pagesElement[2]), '3', 'page 3');
          assert.equal(getText(pagesElement[3]), '4', 'page 4');
          assert.equal(getText(pagesElement[4]), '5', 'page 5');
        });
        QUnit.test('Render pages with separator', function(assert) {
          var testElement = $('#container');
          testElement.dxPager({
            maxPagesCount: 7,
            pageCount: 8
          });
          var pagesElement = getPagesElement(testElement);
          assert.equal(pagesElement.length, 7, 'pages elements count');
          assert.equal(getText(pagesElement[0]), '1', 'page 1');
          assert.equal(getText(pagesElement[1]), '2', 'page 2');
          assert.equal(getText(pagesElement[2]), '3', 'page 3');
          assert.equal(getText(pagesElement[3]), '4', 'page 4');
          assert.equal(getText(pagesElement[4]), '5', 'page 5');
          assert.equal(getText(pagesElement[5]), '. . .', 'separator');
          assert.equal(getText(pagesElement[6]), '8', 'last page');
        });
        QUnit.test('Select page after click', function(assert) {
          var testElement = $('#container');
          var $pager = testElement.dxPager({
            maxPagesCount: 7,
            pageCount: 8
          });
          var instance = $pager.dxPager('instance');
          $(instance._pages[4]._$page).trigger('dxclick');
          var pagesElement = getPagesElement(testElement);
          assert.equal(pagesElement.length, 8, 'pages elements count');
          assert.equal(getText(pagesElement[0]), '1', 'page 1');
          assert.equal(getText(pagesElement[1]), '. . .', 'separator');
          assert.equal(getText(pagesElement[2]), '3', 'page 2');
          assert.equal(getText(pagesElement[3]), '4', 'page 3');
          assert.equal(getText(pagesElement[4]), '5', 'page 4');
          assert.equal(getText(pagesElement[5]), '6', 'page 5');
          assert.equal(getText(pagesElement[6]), '. . .', 'separator');
          assert.equal(getText(pagesElement[7]), '8', 'last page');
        });
        QUnit.test('Select page after pointer up', function(assert) {
          var testElement = $('#container');
          var $pager = testElement.dxPager({
            maxPagesCount: 7,
            pageCount: 8
          });
          var instance = $pager.dxPager('instance');
          $(instance._pages[4]._$page).trigger('dxpointerup');
          $(instance._pages[4]._$page).trigger('dxclick');
          var pagesElement = getPagesElement(testElement);
          assert.equal(pagesElement.length, 8, 'pages elements count');
          assert.equal(getText(pagesElement[0]), '1', 'page 1');
          assert.equal(getText(pagesElement[1]), '. . .', 'separator');
          assert.equal(getText(pagesElement[2]), '3', 'page 2');
          assert.equal(getText(pagesElement[3]), '4', 'page 3');
          assert.equal(getText(pagesElement[4]), '5', 'page 4');
          assert.equal(getText(pagesElement[5]), '6', 'page 4');
          assert.equal(getText(pagesElement[6]), '. . .', 'separator');
          assert.equal(getText(pagesElement[7]), '8', 'last page');
        });
        QUnit.test('PagesChooser is not visible if pages count equal one', function(assert) {
          var testElement = $('#container');
          testElement.dxPager({
            maxPagesCount: 7,
            pageCount: 1
          });
          var $pages = testElement.find('.dx-page');
          assert.equal($pages.length, 1, '$pages count');
          assert.equal($pages.css('visibility'), 'hidden');
        });
        QUnit.test('PagesChooser is visible always if pageNavigatorVisible is true', function(assert) {
          var testElement = $('#container');
          testElement.dxPager({
            maxPagesCount: 7,
            pageCount: 1,
            pagesNavigatorVisible: true
          });
          var $pages = testElement.find('.dx-page');
          assert.equal($pages.length, 1, '$pages count');
          assert.notStrictEqual($pages.css('visibility'), 'hidden');
        });
        QUnit.test('PagesChooser is not visible  if pageNavigatorVisible is false', function(assert) {
          var testElement = $('#container');
          testElement.dxPager({
            maxPagesCount: 7,
            pageCount: 1,
            pagesNavigatorVisible: false
          });
          var $pages = testElement.find('.dx-page');
          assert.equal($pages.length, 0, '$pages count');
        });
        QUnit.test('PagesChooser is not visible when pageNavigatorVisible is false', function(assert) {
          var testElement = $('#container');
          var pager = testElement.dxPager({
            maxPagesCount: 7,
            pageCount: 1,
            pagesNavigatorVisible: true
          }).dxPager('instance');
          pager.option('pagesNavigatorVisible', false);
          var $pages = testElement.find('.dx-page');
          assert.equal($pages.length, 0, '$pages count');
        });
        QUnit.test('Change pages count', function(assert) {
          var testElement = $('#container');
          var $pager = testElement.dxPager({
            maxPagesCount: 7,
            pageCount: 8
          });
          var instance = $pager.dxPager('instance');
          var pagesElement;
          $(instance._pages[4]._$page).trigger('dxclick');
          pagesElement = getPagesElement(testElement);
          assert.equal(instance.selectedPage.value(), '5', 'selected page');
          assert.equal(pagesElement.length, 8, 'pages elements count');
          assert.equal(getText(pagesElement[0]), '1', 'page 1');
          assert.equal(getText(pagesElement[1]), '. . .', 'separator');
          assert.equal(getText(pagesElement[2]), '3', 'page 2');
          assert.equal(getText(pagesElement[3]), '4', 'page 3');
          assert.equal(getText(pagesElement[4]), '5', 'page 4');
          assert.equal(getText(pagesElement[5]), '6', 'page 4');
          assert.equal(getText(pagesElement[6]), '. . .', 'separator');
          assert.equal(getText(pagesElement[7]), '8', 'last page');
          instance.option('pageCount', 9);
          pagesElement = getPagesElement(testElement);
          assert.equal(instance.selectedPage.value(), '5', 'selected page');
          assert.equal(pagesElement.length, 8, 'pages elements count');
          assert.equal(getText(pagesElement[0]), '1', 'page 1');
          assert.equal(getText(pagesElement[1]), '. . .', 'separator');
          assert.equal(getText(pagesElement[2]), '3', 'page 2');
          assert.equal(getText(pagesElement[3]), '4', 'page 3');
          assert.equal(getText(pagesElement[4]), '5', 'page 4');
          assert.equal(getText(pagesElement[5]), '6', 'page 4');
          assert.equal(getText(pagesElement[6]), '. . .', 'separator');
          assert.equal(getText(pagesElement[7]), '9', 'last page');
        });
        QUnit.test('render pager on changed event', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 0
          });
          var instance = $pager.dxPager('instance');
          assert.strictEqual($('.dx-pages').length, 0);
          instance.option('pageCount', 10);
          assert.strictEqual($('.dx-pages').length, 1);
        });
        QUnit.test('Pager is not displayed when visible is false', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            visible: false
          });
          assert.strictEqual($('.' + 'dx-pager').length, 1, 'pager is rendered');
          assert.equal($pager.css('display'), 'none', 'pager is hidden');
        });
        QUnit.test('Page sizes render', function(assert) {
          $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageIndex: 1,
            pageSizes: [5, 10, 20]
          });
          var pageSizesElements = $('.dx-page-size');
          assert.equal(pageSizesElements.length, 3, 'page size elements count');
          assert.equal(getText(pageSizesElements[0]), 5, 'page size = 5');
          assert.equal(getText(pageSizesElements[1]), 10, 'page size = 10');
          assert.equal(getText(pageSizesElements[2]), 20, 'page size = 20');
        });
        if (!isRenovation) {
          QUnit.test('Page sizes render when pageSizes is false', function(assert) {
            $('#container').dxPager({
              maxPagesCount: 8,
              pageCount: 10,
              pageIndex: 1,
              pageSizes: false
            });
            var pageSizesElements = $('.dx-page-size');
            var pageSizesContainer = $('.dx-page-sizes');
            assert.equal(pageSizesContainer.length, 0, 'page sizes container elements count');
            assert.equal(pageSizesElements.length, 0, 'page size elements count');
          });
        }
        QUnit.test('Page sizes render when showPageSizes is false', function(assert) {
          $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageIndex: 1,
            showPageSizes: false,
            pageSizes: [5, 10, 20]
          });
          var pageSizesElements = $('.dx-page-size');
          var pageSizesContainer = $('.dx-page-sizes');
          assert.equal(pageSizesContainer.length, 0, 'page sizes container elements count');
          assert.equal(pageSizesElements.length, 0, 'page size elements count');
        });
        QUnit.test('Page size selection by click', function(assert) {
          $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageIndex: 1,
            pageSizes: [5, 10, 20]
          });
          var pageSizesElements = $('.dx-page-size');
          var selectionPageSizesElements;
          var cssSelectionClassName = '.dx-page-size' + '.' + 'dx-selection';
          pageSizesElements.eq(0).trigger('dxclick');
          selectionPageSizesElements = $(cssSelectionClassName);
          assert.equal(selectionPageSizesElements.length, 1, 'page size elements count');
          assert.equal(getText(selectionPageSizesElements[0]), '5', 'page size = 5');
          pageSizesElements = $('.dx-page-size');
          pageSizesElements.eq(2).trigger('dxclick');
          selectionPageSizesElements = $(cssSelectionClassName);
          assert.equal(selectionPageSizesElements.length, 1, 'page size elements count');
          assert.equal(getText(selectionPageSizesElements[0]), '20', 'page size = 20');
          pageSizesElements = $('.dx-page-size');
          pageSizesElements.eq(1).trigger('dxclick');
          selectionPageSizesElements = $(cssSelectionClassName);
          assert.equal(selectionPageSizesElements.length, 1, 'page size elements count');
          assert.equal(getText(selectionPageSizesElements[0]), '10', 'page size = 10');
        });
        QUnit.test('Page size is changed when selected page is clicked', function(assert) {
          var pageSizeChanged;
          $('#container').dxPager({
            maxPagesCount: 8,
            pagesCount: 10,
            pageIndex: 1,
            pageSizes: [5, 10, 20],
            pageSizeChanged: function() {
              pageSizeChanged = true;
            }
          });
          var pageSizesElements = $('.dx-page-size');
          pageSizesElements.eq(1).trigger('dxclick');
          assert.ok(pageSizeChanged);
          pageSizeChanged = false;
          pageSizesElements.eq(1).trigger('dxclick');
          assert.ok(!pageSizeChanged);
        });
        QUnit.test('PageSizeChanged is occurred when page size option is changed', function(assert) {
          var pageSizeChanged;
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pagesCount: 10,
            pageIndex: 1,
            pageSizes: [5, 10, 20],
            pageSizeChanged: function() {
              pageSizeChanged = true;
            }
          });
          var pager = $pager.dxPager('instance');
          assert.ok(!pageSizeChanged);
          pager.option('pageSize', 20);
          assert.ok(pageSizeChanged);
        });
        QUnit.test('Correct selected page when page index is not contains in the pages', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 25,
            pageIndex: 1,
            pageSizes: [5, 10, 20]
          });
          var instance = $pager.dxPager('instance');
          instance.option('pageIndex', 16);
          assert.equal(instance._pages[1].value(), 15, '1 page value');
          assert.equal(instance._pages[1].index, 1, '1 page index');
          assert.equal(instance._pages[2].value(), 16, '2 page value');
          assert.equal(instance._pages[2].index, 2, '1 page index');
          assert.equal(instance._pages[3].value(), 17, '3 page value');
          assert.equal(instance._pages[3].index, 3, '1 page index');
          assert.equal(instance._pages[4].value(), 18, '4 page value');
          assert.equal(instance._pages[4].index, 4, '1 page index');
          assert.ok(instance._pages[2]._$page.hasClass('dx-page'), 'page is selected');
          instance.option('pageIndex', 22);
          assert.equal(instance._pages[1].value(), 21, '1 page value');
          assert.equal(instance._pages[1].index, 1, '1 page index');
          assert.equal(instance._pages[2].value(), 22, '2 page value');
          assert.equal(instance._pages[2].index, 2, '1 page index');
          assert.equal(instance._pages[3].value(), 23, '3 page value');
          assert.equal(instance._pages[3].index, 3, '1 page index');
          assert.equal(instance._pages[4].value(), 24, '4 page value');
          assert.equal(instance._pages[4].index, 4, '1 page index');
          assert.ok(instance._pages[3]._$page.hasClass('dx-page'), 'page is selected');
        });
        QUnit.test('Refresh pages after page size is changed_B233925', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 15,
            pageIndex: 1,
            pageSizes: [5, 10, 20]
          });
          var instance = $pager.dxPager('instance');
          instance.option('pageIndex', 13);
          instance.option('pageCount', 13);
          assert.equal(instance._pages[0].value(), 1, '1 page value');
          assert.equal(instance._pages[1].value(), 9, '2 page value');
          assert.equal(instance._pages[2].value(), 10, '3 page value');
          assert.equal(instance._pages[3].value(), 11, '4 page value');
          assert.equal(instance._pages[4].value(), 12, '5 page value');
          assert.equal(instance._pages[5].value(), 13, '6 page value');
        });
        QUnit.test('Pager has negative pages when pages count is changed', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 1,
            pageIndex: 1,
            visible: false,
            hasKnownLastPage: false
          });
          var instance = $pager.dxPager('instance');
          instance.option({
            hasKnownLastPage: true,
            pageCount: 1
          });
          instance.option({
            visible: true,
            pageCount: 25
          });
          assert.equal(instance.selectedPage.index, 0, '0 index selected page');
          assert.equal(instance._pages.length, 6, 'length 6');
          assert.equal(instance._pages[0].value(), 1, 'first page value');
          assert.equal(instance._pages[1].value(), 2, 'second page value');
        });
        QUnit.test('Pager does not display duplicated page numbers', function(assert) {
          var $pager = $('#container').dxPager({
            pageSizes: [10, 20, 50],
            pageSize: 50,
            pageCount: 2000
          });
          var instance = $pager.dxPager('instance');
          instance.option('pageIndex', 1999);
          instance.option('pageCount', 10000);
          instance.option('pageSize', 10);
          instance.option('pageCount', 2000);
          instance.option('pageSize', 50);
          var pageCount = instance._pages.length;
          if (!isRenovation) {
            assert.equal(pageCount, 5, 'length 5');
          } else {
            assert.equal(pageCount, 6, 'length 6');
          }
          assert.equal(instance.selectedPage.index, pageCount - 2, 'index selected page');
          assert.equal(instance._pages[pageCount - 2].value(), 1999, 'second last page value');
          assert.equal(instance._pages[pageCount - 1].value(), 2000, 'lastpage page value');
        });
        QUnit.test('Selected page is not reset_B237051', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 15,
            pageIndex: 1
          });
          var instance = $pager.dxPager('instance');
          instance.option('pageCount', 1);
          instance.option('pageCount', 15);
          assert.equal(instance._pages[0].value(), 1, '1 page value');
          assert.equal(instance._pages[1].value(), 2, '2 page value');
          assert.equal(instance._pages[2].value(), 3, '3 page value');
          assert.equal(instance._pages[3].value(), 4, '4 page value');
          assert.equal(instance._pages[4].value(), 5, '5 page value');
          assert.equal(instance._pages[5].value(), 15, '6 page value');
        });
        QUnit.test('Click separator page_B239176', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 7,
            pageCount: 8
          });
          var instance = $pager.dxPager('instance');
          $('.dx-separator').first().trigger('dxclick');
          assert.equal(instance.option('pageIndex'), 1);
          assert.ok(!typeUtils.isDefined(instance._testPageIndex));
        });
        QUnit.test('Click  page parent container_B239176', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 7,
            pageCount: 8
          });
          var instance = $pager.dxPager('instance');
          $('.dx-pages').first().trigger('dxclick');
          assert.equal(instance.option('pageIndex'), 1);
          assert.ok(!typeUtils.isDefined(instance._testPageIndex));
        });
        QUnit.test('Click page size parent container_B239176', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            pageSize: 10
          });
          var instance = $pager.dxPager('instance');
          $('.dx-page-sizes').first().trigger('dxclick');
          assert.equal(instance.option('pageSize'), 10);
          assert.ok(!typeUtils.isDefined(instance._testPageSizeIndex));
        });
        QUnit.test('Show navigate buttons', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true
          });
          assert.equal($pager.find('.dx-navigate-button').length, 2, 'navigate buttons count');
          assert.equal($pager.find('.dx-prev-button').length, 1, 'prev button');
          assert.equal($pager.find('.dx-next-button').length, 1, 'next button');
        });
        QUnit.test('Next page index via navigate button', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true
          });
          var instance = $pager.dxPager('instance');
          var $button = $('.dx-next-button');
          $($button).trigger('dxclick');
          $button = $('.dx-next-button');
          $($button).trigger('dxclick');
          $button = $('.dx-next-button');
          $($button).trigger('dxclick');
          assert.equal(instance.selectedPage.value(), '4', 'selected page index 4');
          instance.option('pageIndex', 10);
          $($button).trigger('dxclick');
          assert.equal(instance.selectedPage.value(), '10', 'selected page index 10');
        });
        QUnit.test('Focus selected page', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true
          });
          var $pages = $pager.find('.dx-pages .dx-page');
          for (var i = 0; i < $pages.length; ++i) {
            assert.equal($($pages[i]).attr('tabindex'), 0, 'page tabindex');
          }
        });
        QUnit.test('Back page index via navigate button', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true
          });
          var instance = $pager.dxPager('instance');
          instance.option('pageIndex', 8);
          var $prevButton = $('.dx-prev-button');
          $($prevButton).trigger('dxclick');
          $prevButton = $('.dx-prev-button');
          $($prevButton).trigger('dxclick');
          assert.equal(instance.selectedPage.value(), '6', 'selected page index 6');
          instance.option('pageIndex', 1);
          $prevButton = $('.dx-prev-button');
          $($prevButton).trigger('dxclick');
          $prevButton = $('.dx-prev-button');
          $($prevButton).trigger('dxclick');
          assert.equal(instance.selectedPage.value(), '1', 'selected page index 1');
        });
        QUnit.test('Click on navigate buttons', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true
          });
          var instance = $pager.dxPager('instance');
          var $button;
          instance.option('pageIndex', 8);
          assert.equal(instance.option('pageIndex'), 8);
          $button = $('.dx-next-button');
          $($button).trigger('dxclick');
          assert.equal(instance.option('pageIndex'), 9);
          $button = $('.dx-prev-button');
          $($button).trigger('dxclick');
          assert.equal(instance.option('pageIndex'), 8);
        });
        if (!isRenovation) {
          QUnit.test('Pointer up on navigate button', function(assert) {
            var $pager = $('#container').dxPager({
              maxPagesCount: 8,
              pageCount: 10,
              pageSizes: [5, 10, 20],
              showNavigationButtons: true
            });
            var instance = $pager.dxPager('instance');
            var $button;
            var currentDirection;
            instance.option('pageIndex', 8);
            instance._nextPage = function(direction) {
              currentDirection = direction;
            };
            $button = $('.dx-next-button');
            $($button).trigger('dxpointerup');
            assert.equal(currentDirection, 'next');
            $button = $('.dx-prev-button');
            $($button).trigger('dxpointerup');
            assert.equal(currentDirection, 'prev');
          });
          QUnit.test('Pointer up and click on navigate button', function(assert) {
            var $pager = $('#container').dxPager({
              maxPagesCount: 8,
              pageCount: 10,
              pageSizes: [5, 10, 20],
              showNavigationButtons: true
            });
            var instance = $pager.dxPager('instance');
            var nextPageCalls = [];
            instance.option('pageIndex', 8);
            instance._nextPage = function(direction) {
              nextPageCalls.push(direction);
            };
            var $button = $('.dx-next-button');
            $($button).trigger('dxpointerup');
            $($button).trigger('dxclick');
            $($button).trigger('dxclick');
            assert.deepEqual(nextPageCalls, ['next', 'next']);
          });
        }
        QUnit.test('Pointer up and click on page button', function(assert) {
          var $pager = $('#container').dxPager({pageCount: 20});
          var instance = $pager.dxPager('instance');
          $pager.find('.dx-page').eq(4).trigger('dxpointerup');
          $pager.find('.dx-page').eq(4).trigger('dxclick');
          assert.equal(instance.option('pageIndex'), 5, 'pageIndex is correct');
        });
        QUnit.test('Prev button is disabled when first page is chosen ', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true
          });
          var isPageChanged;
          var $button = $('.dx-prev-button');
          var instance = $pager.dxPager('instance');
          instance.pageIndexChanged = function() {
            isPageChanged = true;
          };
          $button.click();
          assert.ok($button.hasClass('dx-button-disable'));
          assert.ok(!isPageChanged);
        });
        QUnit.test('Next button is disabled when first page is chosen ', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true
          });
          var isPageChanged;
          var instance = $pager.dxPager('instance');
          instance.option('pageIndex', 10);
          instance.pageIndexChanged = function() {
            isPageChanged = true;
          };
          var $button = $('.dx-next-button');
          $button.click();
          assert.ok($button.hasClass('dx-button-disable'));
          assert.ok(!isPageChanged);
        });
        QUnit.test('Next button is disabled when first page is chosen (Rtl mode)', function(assert) {
          $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true,
            rtlEnabled: true
          });
          var $button = $('.dx-next-button');
          $button.click();
          assert.ok($button.hasClass('dx-button-disable'));
        });
        QUnit.test('Prev button is disabled when first page is chosen (Rtl mode)', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true,
            rtlEnabled: true
          });
          var instance = $pager.dxPager('instance');
          instance.option('pageIndex', 10);
          var $button = $('.dx-prev-button');
          $button.click();
          assert.ok($button.hasClass('dx-button-disable'));
        });
        QUnit.test('Pages chooser visibility when page size is changed', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageIndex: 1,
            pageSize: 5,
            pageSizes: [5, 10, 20]
          });
          var pager = $pager.dxPager('instance');
          var $pages = $('.dx-pages');
          assert.equal($pages[0].style.visibility, '', 'default visibility');
          pager.option('pageCount', 1);
          $pages = $('.dx-pages');
          assert.equal($pages[0].style.visibility, 'hidden', 'visibility when pages count equal one');
          pager.option('pageCount', 8);
          $pages = $('.dx-pages');
          assert.equal($pages[0].style.visibility, '', 'visibility when pages count equal 8');
        });
        QUnit.test('Pager Info', function(assert) {
          $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)'
          });
          var $info = $('.dx-info');
          assert.equal($info.length, 1, 'info');
          assert.equal($info.text(), 'Page 1 of 10 (86 items)', 'info text');
        });
        QUnit.test('Page info text is changed when totalCount is changed', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)'
          });
          var instance = $pager.dxPager('instance');
          instance.option('totalCount', 89);
          assert.equal($('.dx-info').text(), 'Page 1 of 10 (89 items)');
        });
        QUnit.test('Light mode', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of'
          });
          var $pageSizeChooser = $pager.find('.dx-page-sizes').children().first();
          var $pageIndex = $('.dx-page-index');
          var $pageInfoText = $('.dx-info-text');
          var $pagesCount = $('.dx-pages-count');
          assert.ok($pageSizeChooser.dxSelectBox('instance'), 'use selectBox for choose page sizes');
          assert.ok($pageIndex.dxNumberBox('instance'), 'use numberBox for page index');
          assert.equal($pageInfoText.text(), 'of', 'info text');
          assert.equal($pagesCount.text(), '10', 'pages count');
          assert.equal($pager.find('.dx-navigate-button').length, 2, 'navigate buttons count');
          assert.equal($pager.find('.dx-prev-button').length, 1, 'prev button');
          assert.equal($pager.find('.dx-next-button').length, 1, 'next button');
        });
        QUnit.test('Light mode without the page sizes and info', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: false,
            showPageSizes: false,
            totalCount: 86,
            pagesCountText: 'of'
          });
          var $pageSizeChooser = $pager.find('.dx-page-sizes').children().first();
          var $pageIndex = $('.dx-page-index');
          var $pageInfoText = $('.dx-info-text');
          var $pagesCount = $('.dx-pages-count');
          assert.ok(!$pageSizeChooser.dxSelectBox('instance'), 'use selectBox for choose page sizes');
          assert.ok($pageIndex.dxNumberBox('instance'), 'use numberBox for page index');
          assert.equal($pageInfoText.text(), 'of', 'info text');
          assert.equal($pagesCount.text(), '10', 'pages count');
          assert.equal($pager.find('.dx-navigate-button').length, 2, 'navigate buttons count');
          assert.equal($pager.find('.dx-prev-button').length, 1, 'prev button');
          assert.equal($pager.find('.dx-next-button').length, 1, 'next button');
        });
        QUnit.test('Light mode. Change page index after clicked on the pages count element', function(assert) {
          $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 110,
            pageSizes: [5, 10, 20],
            showPageSizes: false,
            pagesCountText: 'of'
          });
          var editor = $('.dx-page-index').dxNumberBox('instance');
          var $pagesCount = $('.dx-pages-count');
          $($pagesCount).trigger('dxclick');
          assert.equal($pagesCount.text(), '110', 'pages count');
          assert.equal(editor.option('value'), 110, 'value of editor in page index element');
        });
        QUnit.test('Light mode when re-render', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            pageSize: 10,
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of',
            showNavigationButtons: true
          });
          $pager.dxPager('instance')._render();
          var $pageSizeChooser = $pager.find('.dx-page-sizes .dx-selectbox');
          var $pageIndex = $('.dx-page-index');
          var $pagesCount = $('.dx-pages-count');
          var $pageInfoText = $('.dx-info-text');
          assert.strictEqual($pageSizeChooser.dxSelectBox('instance').option('value'), 10, 'page size');
          assert.strictEqual($pageIndex.dxNumberBox('instance').option('value'), 1, 'page index');
          assert.equal($pageInfoText.text(), 'of', 'pages info text');
          assert.equal($pagesCount.text(), '10', 'pages count');
        });
        QUnit.test('Light mode. Check page sizes', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            pageSize: 10,
            totalCount: 86,
            pagesCountText: 'of'
          });
          var $pageSizeChooser = $pager.find('.dx-page-sizes').children().first();
          var selectBox = $pageSizeChooser.dxSelectBox('instance');
          selectBox.open();
          assert.deepEqual(selectBox.option('items').map(function(x) {
            return x.value || x;
          }), [5, 10, 20], 'page sizes');
          assert.equal(selectBox.option('value'), 10, 'current page size');
          selectBox.close();
        });
        QUnit.test('Light mode. Check page sizes width', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            pageSize: 10,
            totalCount: 86,
            pagesCountText: 'of'
          });
          var pager = $pager.dxPager('instance');
          var $pageSizeChooser = $pager.find('.dx-page-sizes').children().first();
          var selectBox = $pageSizeChooser.dxSelectBox('instance');
          assert.equal(selectBox.option('width'), Number($('.dx-page-sizes').css('min-width').replace('px', '')) + 20);
          pager.option('pageSizes', [5, 10, 1010]);
          assert.equal(selectBox.option('width'), Number($('.dx-page-sizes').css('min-width').replace('px', '')) + 40);
        });
        QUnit.test('Light mode. Change page size', function(assert) {
          var testValue;
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            pageSize: 5,
            totalCount: 86,
            pagesCountText: 'of',
            pageSizeChanged: function(value) {
              testValue = value;
            }
          });
          var $pageSizeChooser = $pager.find('.dx-page-sizes').children().first();
          var selectBox = $pageSizeChooser.dxSelectBox('instance');
          selectBox.option('value', 20);
          assert.equal(testValue, 20);
        });
        QUnit.test('Light mode. Change page size via option method', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [7, 10, 13, 25],
            pageSize: 10,
            totalCount: 86,
            pagesCountText: 'of'
          });
          $pager.dxPager('instance').option('pageSize', 13);
          var $pageSizeChooser = $pager.find('.dx-page-sizes').children().first();
          var selectBox = $pageSizeChooser.dxSelectBox('instance');
          assert.equal(selectBox.option('value'), 13);
        });
        QUnit.test('Light mode. Change page sizes via option method', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [7, 10, 13, 25],
            pageSize: 10,
            totalCount: 86,
            pagesCountText: 'of'
          });
          $pager.dxPager('instance').option('pageSizes', [13, 45, 67]);
          var $pageSizeChooser = $pager.find('.dx-page-sizes').children().first();
          var selectBox = $pageSizeChooser.dxSelectBox('instance');
          selectBox.open();
          assert.deepEqual(selectBox.option('items').map(function(x) {
            return x.value || x;
          }), [13, 45, 67]);
          selectBox.close();
        });
        QUnit.test('Light mode. Check page index', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            totalCount: 86,
            pageIndex: 73,
            pagesCountText: 'of'
          });
          var $pageIndex = $pager.find('.dx-page-index');
          var numberBox = $pageIndex.dxNumberBox('instance');
          assert.equal(numberBox.option('value'), 73);
        });
        QUnit.test('Light mode. Check page index width', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            totalCount: 86,
            pageIndex: 73,
            pagesCountText: 'of'
          });
          var pager = $pager.dxPager('instance');
          var $pageIndex = $pager.find('.dx-page-index');
          var numberBox = $pageIndex.dxNumberBox('instance');
          assert.equal(numberBox.option('width'), Number($('.dx-page-index').css('min-width').replace('px', '')) + 20);
          pager.option('pageCount', 2070);
          assert.equal(numberBox.option('width'), Number($('.dx-page-index').css('min-width').replace('px', '')) + 40);
        });
        QUnit.test('Light mode. Change page index', function(assert) {
          var pageIndex;
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            pageSize: 5,
            totalCount: 86,
            pagesCountText: 'of',
            pageIndexChanged: function(value) {
              pageIndex = value;
            }
          });
          var $pageIndex = $pager.find('.dx-page-index');
          var numberBox = $pageIndex.dxNumberBox('instance');
          numberBox.option('value', 5);
          assert.equal(pageIndex, 5);
        });
        QUnit.test('Light mode. Change page index via option', function(assert) {
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            pageSize: 5,
            totalCount: 86,
            pagesCountText: 'of'
          });
          var $pageIndex = $pager.find('.dx-page-index');
          var numberBox = $pageIndex.dxNumberBox('instance');
          $pager.dxPager('instance').option('pageIndex', 79);
          assert.equal(numberBox.option('value'), 79);
        });
        QUnit.test('Light mode. Change page index via the navigation buttons', function(assert) {
          var pageIndex;
          $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            pageSize: 5,
            totalCount: 86,
            pagesCountText: 'of',
            showNavigationButtons: true,
            pageIndexChanged: function(value) {
              pageIndex = value;
            }
          });
          var $nextButton = $('.dx-next-button');
          var $prevButton = $('.dx-prev-button');
          $($nextButton).trigger('dxclick');
          assert.equal(pageIndex, 2, 'next page index');
          $($prevButton).trigger('dxclick');
          assert.equal(pageIndex, 1, 'prev page index');
        });
        QUnit.test('Light mode. Min and max for the pageIndex editor', function(assert) {
          var pageIndex;
          var $pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            pageIndex: 2,
            pageSize: 5,
            totalCount: 86,
            pagesCountText: 'of',
            pageIndexChanged: function(value) {
              pageIndex = value;
            }
          });
          var $input = $pager.find('.dx-page-index .dx-texteditor-input').first();
          $input.val(-12);
          $input.change();
          assert.equal(pageIndex, 1, '-12 value');
          $input.val(0);
          $input.change();
          assert.equal(pageIndex, 1, '0 value');
          $input.val(23);
          $input.change();
          assert.equal(pageIndex, 10, '23 value');
        });
        QUnit.test('Apply light mode when width of pager is less of min width', function(assert) {
          var $pager = $('#container').width(1000).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of',
            showNavigationButtons: true
          });
          var pager = $pager.dxPager('instance');
          assert.equal(isLightMode(pager), false, 'lightModeEnabled by default');
          assert.ok(!pager._isLightMode, 'isLightMode');
          $pager.width(100);
          pager._dimensionChanged();
          assert.equal(isLightMode(pager), true, 'lightModeEnabled is enabled');
        });
        QUnit.test('Apply light mode when width equal optimal pager\'s width', function(assert) {
          var $pager = $('#container').width(1000).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of',
            showNavigationButtons: true
          });
          var pager = $pager.dxPager('instance');
          var optimalPagerWidth = getWidth(pager._$pagesSizeChooser) + getWidth(pager._$pagesChooser) - getWidth(pager._pages[pager._pages.length - 1]._$page);
          $pager.width(optimalPagerWidth - getOuterWidth(pager._$info, true) - 1);
          pager._dimensionChanged();
          assert.equal(isLightMode(pager), true, 'lightModeEnabled is enabled');
        });
        QUnit.test('Show info after pagesizes change', function(assert) {
          var $pager = $('#container').width(1000).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 200,
            infoText: 'Page {0} of {1} ({2} items)'
          });
          var pager = $pager.dxPager('instance');
          var optimalPagerWidth = getWidth(pager._$pagesSizeChooser) + getWidth(pager._$pagesChooser) + 20;
          $pager.width(optimalPagerWidth);
          pager._dimensionChanged();
          assert.ok(pager._$info.length === 1 && pager._$info.css('display') !== 'none', 'info element is visible');
          $(pager._pages[4]._$page).trigger('dxclick');
          pager._dimensionChanged();
          assert.ok(pager._$info.length === 0 || pager._$info.css('display') === 'none', 'info element is hidden');
          $(pager._pages[0]._$page).trigger('dxclick');
          pager._dimensionChanged();
          assert.ok(pager._$info.length === 1 && pager._$info.css('display') !== 'none', 'info element is visible');
        });
        QUnit.test('Apply light mode when pager is first rendered', function(assert) {
          var $pager = $('#container').width(100).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of',
            showNavigationButtons: true
          });
          var pager = $pager.dxPager('instance');
          assert.equal(isLightMode(pager), true, 'lightModeEnabled is enabled');
        });
        QUnit.test('Pager is rendered in a normal view after light mode when pageCount is changed', function(assert) {
          var $pager = $('#container').width(460).dxPager({
            maxPagesCount: 10,
            pageCount: 5,
            pageSize: 8,
            pageSizes: [5, 8, 15, 30],
            showInfo: true,
            totalCount: 40,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of',
            showNavigationButtons: true
          });
          var pager = $pager.dxPager('instance');
          pager.option({
            pageCount: 10,
            pageIndexChanged: commonUtils.noop
          });
          pager.option({
            pageCount: 5,
            pageIndexChanged: commonUtils.noop
          });
          assert.strictEqual(isLightMode(pager), isRenovation, ("pager is " + (isRenovation ? '' : 'not') + " displayed in the light mode for pager"));
        });
        QUnit.test('Light mode is applied only one', function(assert) {
          var $pager = $('#container').width(1000).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of',
            showNavigationButtons: true
          });
          var pager = $pager.dxPager('instance');
          var pageSizeEl = $pager.find('.dx-page-sizes')[0].children[0];
          $pager.width(995);
          pager._dimensionChanged();
          assert.ok(!isLightMode(pager), 'pager is not displayed in the light mode width:995');
          assert.equal(pageSizeEl, $pager.find('.dx-page-sizes')[0].children[0], 'pages not re-render:995');
          $pager.width(800);
          pager._dimensionChanged();
          assert.ok(!isLightMode(pager), 'pager is not displayed in the light mode width:800');
          assert.equal(pageSizeEl, $pager.find('.dx-page-sizes')[0].children[0], 'pages not re-render width:880');
          $pager.width(100);
          pager._dimensionChanged();
          assert.ok(isLightMode(pager), 'pager is displayed in the light mode width:100');
          assert.notStrictEqual(pageSizeEl, $pager.find('.dx-page-sizes')[0].children[0], 'pages re-render width:100');
          var pageSizeElLight = $pager.find('.dx-page-sizes')[0].children[0];
          $pager.width(80);
          pager._dimensionChanged();
          assert.ok(isLightMode(pager), 'pager is displayed in the light mode width:80');
          assert.equal(pageSizeElLight, $pager.find('.dx-page-sizes')[0].children[0], 'pages not re-render width:80');
        });
        QUnit.test('Cancel light mode when width of pager is more of min width', function(assert) {
          var $pager = $('#container').width(100).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of',
            showNavigationButtons: true
          });
          var pager = $pager.dxPager('instance');
          assert.equal(isLightMode(pager), true, 'lightModeEnabled is enabled');
          $pager.width(1000);
          pager._dimensionChanged();
          assert.equal(isLightMode(pager), false, 'lightModeEnabled is disabled');
        });
        QUnit.test('Cancel light mode is only one', function(assert) {
          var $pager = $('#container').width(100).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of',
            showNavigationButtons: true
          });
          var pager = $pager.dxPager('instance');
          var pageSizeEl = $pager.find('.dx-page-sizes')[0].children[0];
          assert.ok(isLightMode(pager), 'pager is displayed in the light mode width:100');
          $pager.width(1000);
          pager._dimensionChanged();
          assert.ok(!isLightMode(pager), 'pager is not displayed in the light mode width:1000');
          assert.notStrictEqual(pageSizeEl, $pager.find('.dx-page-sizes')[0].children[0], 'pages not re-render:1000');
          var pageSizeLargeEl = $pager.find('.dx-page-sizes')[0].children[0];
          $pager.width(1005);
          pager._dimensionChanged();
          assert.ok(!isLightMode(pager), 'pager is not displayed in the light mode width:1005');
          assert.equal(pageSizeLargeEl, $pager.find('.dx-page-sizes')[0].children[0], 'pages not re-render:1005');
          $pager.width(1010);
          pager._dimensionChanged();
          assert.ok(!isLightMode(pager), 'pager is not displayed in the light mode width:1010');
          assert.equal(pageSizeLargeEl, $pager.find('.dx-page-sizes')[0].children[0], 'pages not re-render:1010');
          $pager.width(1200);
          pager._dimensionChanged();
          assert.ok(!isLightMode(pager), 'pager is not displayed in the light mode width:1010');
          assert.equal(pageSizeLargeEl, $pager.find('.dx-page-sizes')[0].children[0], 'pages not re-render:1010');
        });
        QUnit.test('Hide the info element when it does not fit in a container', function(assert) {
          var $pager = $('#container').width(1000).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of'
          });
          var pager = $pager.dxPager('instance');
          $pager.width(getWidth(pager._$pagesSizeChooser) + getWidth(pager._$pagesChooser) - 50);
          pager._dimensionChanged();
          assert.ok(!isLightMode(pager), 'lightModeEnabled');
          assert.ok(pager._$info.length === 0 || pager._$info.css('display') === 'none', 'info element is hidden');
        });
        QUnit.test('Show the info element when it is fit in a container', function(assert) {
          var $pager = $('#container').width(1000).dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showInfo: true,
            totalCount: 86,
            infoText: 'Page {0} of {1} ({2} items)',
            pagesCountText: 'of'
          });
          var pager = $pager.dxPager('instance');
          var infoWidth = getWidth(pager._$info);
          setWidth($pager, getWidth(pager._$pagesSizeChooser) + getWidth(pager._$pagesChooser) - 50);
          pager._dimensionChanged();
          setWidth($pager, getWidth(pager._$pagesSizeChooser) + getWidth(pager._$pagesChooser) + infoWidth + 50);
          pager._dimensionChanged();
          assert.ok(!isLightMode(pager), 'lightModeEnabled');
          assert.ok(pager._$info.length === 1 || pager._$info.css('display') !== 'none', 'info element is hidden');
        });
        QUnit.test('LightMode.Prev button is disabled when first page is chosen ', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true,
            pagesCountText: 'of',
            lightModeEnabled: true
          });
          var isPageChanged;
          var $button = $('.dx-prev-button');
          var instance = $pager.dxPager('instance');
          instance.pageIndexChanged = function() {
            isPageChanged = true;
          };
          $button.click();
          assert.ok($button.hasClass('dx-button-disable'));
          assert.ok(!isPageChanged);
        });
        QUnit.test('LightMode.Next button is disabled when first page is chosen ', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true,
            pageIndex: 10,
            pagesCountText: 'of',
            lightModeEnabled: true
          });
          var isPageChanged;
          var instance = $pager.dxPager('instance');
          instance.pageIndexChanged = function() {
            isPageChanged = true;
          };
          var $button = $('.dx-next-button');
          $button.click();
          assert.ok($button.hasClass('dx-button-disable'));
          assert.ok(!isPageChanged);
        });
        if (!isRenovation) {
          QUnit.test('Pager is not re-rendered in the Light mode when width is not changed', function(assert) {
            var pager = $('#container').width(PAGER_LIGHT_MODE_WIDTH).dxPager({
              maxPagesCount: 8,
              pageCount: 10,
              pageSizes: [5, 10, 20],
              showInfo: true,
              totalCount: 86,
              infoText: 'Page {0} of {1} ({2} items)',
              pagesCountText: 'of'
            }).dxPager('instance');
            var spy = sinon.spy(pager, '_renderContentImpl');
            pager._dimensionChanged();
            assert.equal(spy.callCount, 0, 'pager is not re-rendered');
          });
        }
        QUnit.test('Navigate buttons with rtl', function(assert) {
          var $pager = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true,
            rtlEnabled: true
          });
          var instance = $pager.dxPager('instance');
          var $button;
          instance.option('pageIndex', 8);
          assert.equal(instance.option('pageIndex'), 8);
          $button = $('.dx-next-button');
          $($button).trigger('dxclick');
          assert.equal(instance.option('pageIndex'), 7);
          $button = $('.dx-prev-button');
          $($button).trigger('dxclick');
          assert.equal(instance.option('pageIndex'), 8);
        });
        QUnit.test('dxPager render with RTL', function(assert) {
          var pagerElement = $('#container').dxPager({
            maxPagesCount: 8,
            pageCount: 10,
            pageSizes: [5, 10, 20],
            showNavigationButtons: true,
            rtlEnabled: true
          });
          var pagerInstance = pagerElement.dxPager('instance');
          var rtlTestSample = {};
          var ltrTestSample = {};
          rtlTestSample = {
            pageSizes: pagerElement.find('.dx-page-size').text(),
            pages: $(Array.prototype.slice.call(getPagesElement(pagerElement)).reverse()).text()
          };
          pagerInstance.option('rtlEnabled', false);
          ltrTestSample = {
            pageSizes: pagerElement.find('.dx-page-size').text(),
            pages: $(getPagesElement(pagerElement)).text()
          };
          assert.equal(rtlTestSample.pageSizes, ltrTestSample.pageSizes, 'check that page sizes in LTR are equal to page sizes in RTL');
          assert.equal(rtlTestSample.pages, ltrTestSample.pages, 'check that pages in LTR are equal to reversed pages in RTL');
        });
        QUnit.test('dxPager has locale appropriate aria-labels (T1102800)(T1104028)', function(assert) {
          var locale = localization.locale();
          var dictionary = {
            'en': {
              'dxPager-pageSize': 'test Items per page: {0}',
              'dxPager-pageSizesAllText': 'test All',
              'dxPager-page': 'test Page {0}',
              'dxPager-prevPage': 'test Previous Page',
              'dxPager-nextPage': 'test Next Page'
            },
            'ru': {
              'dxPager-pageSize': 'test Количество элементов на странице: {0}',
              'dxPager-pageSizesAllText': 'test Все',
              'dxPager-page': 'test Страница {0}',
              'dxPager-prevPage': 'test Предыдущая Страница',
              'dxPager-nextPage': 'test Следующая Страница'
            }
          };
          localization.loadMessages(dictionary);
          localization.locale('en');
          var pagerElement = $('#container').dxPager({
            pageSizes: ['all'],
            showNavigationButtons: true,
            showInfo: true
          });
          var pageSize = pagerElement.find('.dx-page-size');
          var buttonNext = pagerElement.find('.dx-next-button');
          var buttonPrev = pagerElement.find('.dx-prev-button');
          var page = pagerElement.find('.dx-page');
          assert.equal(pageSize.attr('aria-label'), dictionary['en']['dxPager-pageSize'].replace('{0}', dictionary['en']['dxPager-pageSizesAllText']), 'correct aria-label for page size on initial render');
          assert.equal(page.attr('aria-label'), dictionary['en']['dxPager-page'].replace('{0}', '1'), 'correct aria-label for page on initial render');
          assert.equal(buttonNext.attr('aria-label'), dictionary['en']['dxPager-nextPage'], 'correct aria-label for next page on initial render');
          assert.equal(buttonPrev.attr('aria-label'), dictionary['en']['dxPager-prevPage'], 'correct aria-label for prev page on initial render');
          localization.locale('ru');
          pagerElement.dxPager('instance').repaint();
          pageSize = pagerElement.find('.dx-page-size');
          buttonNext = pagerElement.find('.dx-next-button');
          buttonPrev = pagerElement.find('.dx-prev-button');
          page = pagerElement.find('.dx-page');
          assert.equal(pageSize.attr('aria-label'), dictionary['ru']['dxPager-pageSize'].replace('{0}', dictionary['ru']['dxPager-pageSizesAllText']), 'correct aria-label for page size on locale change');
          assert.equal(page.attr('aria-label'), dictionary['ru']['dxPager-page'].replace('{0}', '1'), 'correct aria-label for page on locale change');
          assert.equal(buttonNext.attr('aria-label'), dictionary['ru']['dxPager-nextPage'], 'correct aria-label for next page on locale change');
          assert.equal(buttonPrev.attr('aria-label'), dictionary['ru']['dxPager-prevPage'], 'correct aria-label for prev page on locale change');
          localization.locale(locale);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","jquery","core/utils/common","core/utils/type","core/utils/shadow_dom","generic_light.css!","ui/pager","localization"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("core/utils/common"), require("core/utils/type"), require("core/utils/shadow_dom"), require("generic_light.css!"), require("ui/pager"), require("localization"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pager.tests.js.map