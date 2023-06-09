!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/pagerView.tests.js"], ["generic_light.css!","ui/data_grid","jquery","../../helpers/dataGridMocks.js","core/element_data","events/utils/index","core/utils/shadow_dom","ui/pager"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/pagerView.tests.js", ["generic_light.css!", "ui/data_grid", "jquery", "../../helpers/dataGridMocks.js", "core/element_data", "events/utils/index", "core/utils/shadow_dom", "ui/pager"], function($__export) {
  "use strict";
  var $,
      setupDataGridModules,
      MockDataController,
      dataUtils,
      createEvent,
      addShadowDomStyles,
      Pager;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
      MockDataController = $__m.MockDataController;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {
      createEvent = $__m.createEvent;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      Pager = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<div>\n            <div class=\"dx-datagrid\">\n                <div id=\"container\"></div>\n            </div>\n        </div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Pager', {
        beforeEach: function() {
          this.options = {
            pager: {
              enabled: true,
              visible: true,
              allowedPageSizes: [2, 7, 9],
              showPageSizeSelector: true
            },
            keyboardNavigation: {enabled: true}
          };
          this.dataControllerOptions = {
            pageSize: 7,
            pageCount: 20,
            pageIndex: 1,
            totalCount: 143
          };
          this.dataController = new MockDataController(this.dataControllerOptions);
          setupDataGridModules(this, ['data', 'pager'], {
            initViews: true,
            controllers: {
              data: this.dataController,
              keyboardNavigation: {
                isKeyboardEnabled: function() {
                  return true;
                },
                executeAction: function() {}
              }
            }
          });
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        var isRenovation = !!Pager.IS_RENOVATED_WIDGET;
        QUnit.test('Not initialize pager when pager is not visible', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          this.options.pager.visible = false;
          this.dataControllerOptions.hasKnownLastPage = false;
          pagerView.render(testElement);
          var pager = pagerView.getPager();
          assert.ok(!pager);
          assert.equal(testElement.find('.dx-pager').length, 0, 'pager element');
        });
        QUnit.test('initialize pager when pager is visible', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          this.dataControllerOptions.hasKnownLastPage = false;
          pagerView.render(testElement);
          var pager = pagerView.getPager();
          assert.equal(testElement.find('.dx-pager').length, 1, 'pager element');
          assert.equal(pager.option('maxPagesCount'), 10, 'maxPagesCount');
          assert.equal(pager.option('pageIndex'), 2, 'pageIndex');
          assert.equal(pager.option('pageCount'), 20, 'pageCount');
          assert.equal(pager.option('pageSize'), 7, 'pageSize');
          assert.ok(pager.option('showPageSizes'), 'showPageSizes');
          assert.deepEqual(pager.option('pageSizes'), [2, 7, 9], 'pageSizes');
          assert.ok(!pager.option('hasKnownLastPage'), 'hasKnownLastPage');
          assert.ok(pager.option('visible'), 'visible');
        });
        QUnit.test('PagerView create dxPager via createComponent', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          var isRenderViaCreateComponent = false;
          this._createComponent = function(element, name, config) {
            if (name === Pager) {
              isRenderViaCreateComponent = true;
            }
          };
          this.options.rtlEnabled = true;
          pagerView.render(testElement);
          assert.ok(isRenderViaCreateComponent, 'dxPager was rendered via createComponent');
        });
        QUnit.test('Page index of dataController is changed from dxPager', function(assert) {
          var that = this;
          var testElement = $('#container');
          var pagerView = this.pagerView;
          pagerView.render(testElement);
          $(testElement.find('.dx-page')[5]).trigger('dxclick');
          this.clock.tick(10);
          assert.equal(that.dataControllerOptions.pageIndex, '19', 'page index');
        });
        QUnit.test('Page index is changed from dataController', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          pagerView.render(testElement);
          this.dataController.pageIndex(13);
          assert.equal(pagerView.getPager().option('pageIndex'), 14, 'page index');
        });
        QUnit.test('Page index is changed from dataController several times', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          pagerView.render(testElement);
          this.dataController.pageIndex(13);
          this.dataController.pageIndex(14);
          this.clock.tick(10);
          assert.equal(pagerView.getPager().option('pageIndex'), 15, 'page index');
        });
        QUnit.test('Page index correctly changed using string value', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          pagerView.render(testElement);
          this.dataController.pageIndex('14');
          this.clock.tick(10);
          assert.equal(pagerView.getPager().option('pageIndex'), 15, 'page index changed');
        });
        QUnit.test('Pages count is changed from dataController', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          pagerView.render(testElement, {});
          this.dataController.updatePagesCount(7);
          assert.equal(pagerView.getPager().option('pageCount'), 7, 'pageCount');
        });
        QUnit.test('Page size is changed from dataController', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          pagerView.render(testElement, {});
          this.dataController.pageSize(9);
          assert.equal(pagerView.getPager().option('pageSize'), 9, 'pageSize');
        });
        QUnit.test('HasKnownLastPage is changed from dataController', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          pagerView.render(testElement, {});
          this.dataControllerOptions.hasKnownLastPage = false;
          this.dataController.updatePagesCount(1);
          if (isRenovation) {
            assert.strictEqual(testElement.find('.dx-next-button').length, 1, 'pager has next page button');
            assert.strictEqual(testElement.find('.dx-prev-button').length, 0, 'pager doesnt have prev page button');
          } else {
            assert.ok(pagerView.getPager()._testShowMoreButton, 'showMoreButton in pager');
          }
        });
        QUnit.test('Visible is changed from dataController', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          this.dataControllerOptions.pageCount = 1;
          this.options.pager.visible = 'auto';
          pagerView.render(testElement, {});
          assert.ok(!testElement.find('.dx-pager').length, 'pager not visible');
          this.dataController.updatePagesCount(20);
          assert.notStrictEqual(testElement.find('.dx-pager').css('display'), 'none', 'pager visible');
        });
        QUnit.test('Label option works', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          this.dataControllerOptions.pageCount = 1;
          this.options.pager.label = 'my_label';
          pagerView.render(testElement, {});
          assert.strictEqual(testElement.find('.dx-pager').attr('aria-label'), 'my_label');
        });
        QUnit.test('Pager is not rendered on partial update', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          sinon.spy(pagerView, '_createComponent');
          pagerView.render(testElement);
          assert.equal(pagerView._createComponent.callCount, 1, '_createComponent call count before partial update');
          this.dataController.changed.fire({changeType: 'update'});
          assert.equal(pagerView._createComponent.callCount, 1, '_createComponent call count after partial update');
        });
        QUnit.test('pageCount, pageIndex, pageSize are updated on partial update with repaintChangesOnly', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          sinon.spy(pagerView, '_createComponent');
          pagerView.render(testElement);
          sinon.spy(pagerView.getPager(), 'option');
          assert.equal(pagerView._createComponent.callCount, 1, '_createComponent call count before partial update');
          this.dataController.changed.fire({
            changeType: 'update',
            repaintChangesOnly: true
          });
          assert.equal(pagerView._createComponent.callCount, 1, '_createComponent call count after partial update');
          assert.equal(pagerView.getPager().option.callCount, 1, 'pager option call count after partial update');
          assert.deepEqual(pagerView.getPager().option.getCall(0).args, [{
            hasKnownLastPage: true,
            totalCount: 143,
            pageCount: 20,
            pageIndex: 2,
            pageSize: 7
          }], 'pager option args');
        });
        QUnit.test('get page sizes when pageSizes option is auto and pageSize = 5', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {allowedPageSizes: 'auto'};
          this.dataControllerOptions.pageSize = 5;
          var pageSizes = pagerView.getPageSizes();
          assert.deepEqual(pageSizes, [2, 5, 10]);
        });
        QUnit.test('get page sizes when pageSizes option is auto and pageSize changed from 5 to 20', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {allowedPageSizes: 'auto'};
          this.dataControllerOptions.pageSize = 5;
          assert.deepEqual(pagerView.getPageSizes(), [2, 5, 10]);
          this.dataControllerOptions.pageSize = 20;
          var pageSizes = pagerView.getPageSizes();
          assert.deepEqual(pageSizes, [10, 20, 40]);
        });
        QUnit.test('get page sizes when pageSizes option is auto and pageSize changed from 5 to 10', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {allowedPageSizes: 'auto'};
          this.dataControllerOptions.pageSize = 5;
          assert.deepEqual(pagerView.getPageSizes(), [2, 5, 10]);
          this.dataControllerOptions.pageSize = 10;
          var pageSizes = pagerView.getPageSizes();
          assert.deepEqual(pageSizes, [2, 5, 10]);
        });
        QUnit.test('get page sizes when pageSizes option is auto and pageSize = 20', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {allowedPageSizes: 'auto'};
          this.dataControllerOptions.pageSize = 20;
          var pageSizes = pagerView.getPageSizes();
          assert.deepEqual(pageSizes, [10, 20, 40]);
        });
        QUnit.test('get page sizes when pageSizes option is array', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {allowedPageSizes: [10, 20, 50, 100]};
          this.dataControllerOptions.pageSize = 20;
          var pageSizes = pagerView.getPageSizes();
          assert.deepEqual(pageSizes, [10, 20, 50, 100]);
        });
        QUnit.test('get page sizes when pageSize is 0 (pageable is false)', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {pageSizes: true};
          this.dataControllerOptions.pageSize = 0;
          var pageSizes = pagerView.getPageSizes();
          assert.deepEqual(pageSizes, []);
        });
        QUnit.test('get page sizes when pageSizes option is false', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {pageSizes: false};
          this.dataControllerOptions.pageSize = 20;
          var pageSizes = pagerView.getPageSizes();
          assert.deepEqual(pageSizes, []);
        });
        QUnit.test('isVisible when pageCount > 1 and visible is auto', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {visible: 'auto'};
          this.dataControllerOptions.pageCount = 2;
          pagerView.render($('#container'));
          var isVisible = pagerView.isVisible();
          assert.equal(this.dataController.pageCount(), 2);
          assert.ok(isVisible);
          assert.equal(pagerView.element().dxPager('instance').option('pagesNavigatorVisible'), 'auto', 'pagesNavigatorVisible');
        });
        QUnit.test('isVisible when pageCount == 1 and visible is auto', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {visible: 'auto'};
          this.dataControllerOptions.pageCount = 1;
          var isVisible = pagerView.isVisible();
          assert.equal(this.dataController.pageCount(), 1);
          assert.ok(!isVisible);
        });
        QUnit.test('isVisible when pageCount == 1, hasKnownLastPage is false and visible is auto', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {visible: 'auto'};
          this.dataControllerOptions.pageCount = 1;
          this.dataControllerOptions.hasKnownLastPage = false;
          this.dataControllerOptions.isLoaded = true;
          var isVisible = pagerView.isVisible();
          assert.ok(!this.dataController.hasKnownLastPage());
          assert.equal(this.dataController.pageCount(), 1);
          assert.ok(isVisible);
        });
        QUnit.test('isVisible when pageCount == 1 and visible is true', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {visible: true};
          this.dataControllerOptions.pageCount = 1;
          pagerView.render($('#container'));
          var isVisible = pagerView.isVisible();
          assert.equal(this.dataController.pageCount(), 1);
          assert.ok(isVisible);
          assert.equal(pagerView.element().dxPager('instance').option('pagesNavigatorVisible'), true, 'pagesNavigatorVisible');
        });
        QUnit.test('isVisible when pageCount > 1 and visible is false', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {visible: false};
          this.dataControllerOptions.pageCount = 2;
          pagerView.render($('#container'));
          var isVisible = pagerView.isVisible();
          assert.equal(this.dataController.pageCount(), 2);
          assert.ok(!isVisible);
          assert.equal(dataUtils.data(pagerView.element().get(0), 'dxPager'), undefined, 'pager instance');
        });
        QUnit.test('isVisible when pageCount == 1 and pageSizes has more 1 items and visible is auto', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {
            visible: 'auto',
            pageSizes: [2, 5, 10]
          };
          this.dataControllerOptions.pageCount = 1;
          var isVisible = pagerView.isVisible();
          assert.equal(this.dataController.pageCount(), 1);
          assert.ok(!isVisible);
        });
        QUnit.test('isVisible when pageCount == 1 and pageSizes disabled and visible is auto', function(assert) {
          var pagerView = this.pagerView;
          this.options.pager = {
            visible: 'auto',
            pageSizes: false
          };
          this.dataControllerOptions.pageCount = 1;
          var isVisible = pagerView.isVisible();
          assert.equal(this.dataController.pageCount(), 1);
          assert.deepEqual(this.dataController.getPageSizes(), []);
          assert.ok(!isVisible);
        });
        QUnit.test('isVisible for virtual scrolling', function(assert) {
          var pagerView = this.pagerView;
          this.options.scrolling = {mode: 'virtual'};
          this.options.pager.visible = 'auto';
          assert.strictEqual(pagerView.isVisible(), false);
        });
        QUnit.test('isVisible for appendMode', function(assert) {
          var pagerView = this.pagerView;
          this.options.scrolling = {mode: 'infinite'};
          this.options.pager.visible = 'auto';
          assert.strictEqual(pagerView.isVisible(), false);
        });
        QUnit.test('isVisible is not reset when data source option is changed in data grid', function(assert) {
          var pagerView = this.pagerView;
          var isResizeCalled;
          var isInvalidateCalled;
          this.options.pager = {visible: 'auto'};
          this.dataControllerOptions.pageCount = 2;
          assert.equal(pagerView.isVisible(), true, 'isVisible');
          pagerView.component.resize = function() {
            isResizeCalled = true;
          };
          pagerView._invalidate = function() {
            isInvalidateCalled = true;
          };
          pagerView.option('dataSource', [{}]);
          assert.equal(pagerView.isVisible(), true, 'isVisible');
          assert.equal(isInvalidateCalled, undefined, 'invalidate');
          assert.equal(isResizeCalled, undefined, 'resize');
        });
        QUnit.test('Not visible pager when changing option scrolling to virtual', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          this.dataControllerOptions.hasKnownLastPage = false;
          this.options.pager.visible = 'auto';
          pagerView.render(testElement);
          assert.ok(pagerView.isVisible());
          assert.ok(pagerView.element().is(':visible'));
          this.options.scrolling = {mode: 'virtual'};
          pagerView.component.isReady = function() {
            return true;
          };
          pagerView.beginUpdate();
          pagerView.optionChanged({name: 'scrolling'});
          pagerView.endUpdate();
          assert.ok(!pagerView.isVisible(), 'pagerView is not visible');
          assert.ok(!pagerView.element().is(':visible'), 'pagerView element is not visible');
        });
        QUnit.test('Show navigation buttons', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          this.options.pager.showNavigationButtons = true;
          pagerView.render(testElement);
          assert.equal($('.dx-navigate-button').length, 2);
        });
        QUnit.test('Default show info', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          this.options.pager.showInfo = true;
          pagerView.render(testElement);
          assert.equal($('.dx-info').text(), 'Page 2 of 20 (143 items)');
        });
        QUnit.test('Custom show info', function(assert) {
          var testElement = $('#container');
          var pagerView = this.pagerView;
          this.options.pager.showInfo = true;
          this.options.pager.infoText = '{0} Страница из {1}';
          pagerView.render(testElement);
          assert.equal($('.dx-info').text(), '2 Страница из 20');
        });
        QUnit.test('Invalidate instead of render for options', function(assert) {
          var renderCounter = 0;
          this.pagerView.render($('#container'));
          this.pagerView.renderCompleted.add(function() {
            renderCounter++;
          });
          this.pagerView.component.isReady = function() {
            return true;
          };
          this.pagerView.beginUpdate();
          this.pagerView.optionChanged({name: 'pager'});
          this.pagerView.optionChanged({name: 'paging'});
          this.pagerView.optionChanged({name: 'scrolling'});
          this.pagerView.endUpdate();
          assert.equal(renderCounter, 1, 'count of rendering');
        });
        QUnit.test('Pager should be visible when set the pageSize equal to totalCount', function(assert) {
          var $testElement = $('#container');
          this.options.pager.allowedPageSizes = [2, 4, 6];
          this.dataControllerOptions = {
            pageSize: 4,
            pageCount: 2,
            pageIndex: 0,
            totalCount: 6
          };
          this.pagerView.render($testElement);
          sinon.spy(this.pagerView, '_invalidate');
          this.dataController.skipProcessingPagingChange = function() {
            return true;
          };
          this.option('paging.pageSize', 6);
          assert.ok(this.pagerView.isVisible(), 'pager visible');
          assert.strictEqual(this.pagerView._invalidate.callCount, 0, 'render not execute');
          this.pagerView._invalidate.restore();
        });
        QUnit.test('Key down Enter, Space key by page index element', function(assert) {
          var $testElement = $('#container');
          var $pageElement;
          this.options.pager.allowedPageSizes = [2, 4, 6];
          this.dataControllerOptions = {
            pageSize: 4,
            pageCount: 2,
            pageIndex: 0,
            totalCount: 6
          };
          this.pagerView.render($testElement);
          $pageElement = $(this.pagerView.element().find('.dx-pages .dx-page').eq(2)).focus();
          $pageElement.trigger(createEvent('keydown', {
            target: $pageElement.get(0),
            key: 'Enter'
          }));
          assert.equal(this.pagerView.element().find('.dx-pages .dx-page.dx-selection').text(), '3', 'Selected 2 page index');
          $pageElement = $(this.pagerView.element().find('.dx-pages .dx-page').eq(3)).focus();
          $pageElement.trigger(createEvent('keydown', {
            target: $pageElement.get(0),
            key: ' '
          }));
          assert.equal(this.pagerView.element().find('.dx-pages .dx-page.dx-selection').text(), '4', 'Selected 3 page index');
        });
        QUnit.test('Key down Enter, Space key by page size element', function(assert) {
          var $testElement = $('#container');
          this.options.pager.allowedPageSizes = [2, 4, 6];
          this.dataControllerOptions = {
            pageSize: 4,
            pageCount: 2,
            pageIndex: 0,
            totalCount: 6
          };
          this.pagerView.render($testElement);
          assert.equal(this.pagerView.element().find('.dx-page-sizes .dx-page-size.dx-selection').text(), '', 'Page size not selected');
          var $pageElement = $(this.pagerView.element().find('.dx-page-sizes .dx-page-size').eq(1)).focus();
          $pageElement.trigger(createEvent('keydown', {
            target: $pageElement.get(0),
            key: 'Enter'
          }));
          assert.equal(this.pagerView.element().find('.dx-page-sizes .dx-page-size.dx-selection').text(), '4', 'Page size 4 is selected');
        });
        QUnit.test('dxPager - infoText has rtl direction with rtlEnabled true (T753000)', function(assert) {
          var container = $('#container').addClass('dx-rtl');
          this.options.pager.showInfo = true;
          this.pagerView.render(container);
          assert.equal(this.pagerView.element().find('.dx-info').css('direction'), 'rtl', 'infoText has rtl direction');
        });
        QUnit.test('Pager container is hidden after refresh if its content is not visible', function(assert) {
          var $testElement = $('#container');
          this.dataControllerOptions = {};
          this.options.pager = {visible: 'auto'};
          this.pagerView.render($testElement);
          assert.strictEqual($('.dx-datagrid-pager').length, 1, 'pager container exists');
          assert.notOk($('.dx-datagrid-pager').hasClass('dx-hidden'), 'pager container is visible');
          this.dataController.updatePagesCount(1);
          assert.ok($('.dx-datagrid-pager').hasClass('dx-hidden'), 'pager is not visible');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","jquery","../../helpers/dataGridMocks.js","core/element_data","events/utils","core/utils/shadow_dom","ui/pager"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("jquery"), require("../../helpers/dataGridMocks.js"), require("core/element_data"), require("events/utils"), require("core/utils/shadow_dom"), require("ui/pager"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pagerView.tests.js.map