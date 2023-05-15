!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/diagramParts/toolbox.tests.js"], ["jquery","ui/diagram","../../../helpers/diagramHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/diagramParts/toolbox.tests.js", ["jquery", "ui/diagram", "../../../helpers/diagramHelpers.js"], function($__export) {
  "use strict";
  var $,
      test,
      Consts,
      findViewToolbarItem,
      findContextMenuItem,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      findViewToolbarItem = $__m.findViewToolbarItem;
      findContextMenuItem = $__m.findContextMenuItem;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, $__4));
      moduleConfig = {beforeEach: function() {
          this.$element = $('#diagram').dxDiagram({toolbox: {visibility: 'visible'}});
          this.instance = this.$element.dxDiagram('instance');
        }};
      QUnit.module('Toolbox', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          moduleConfig.beforeEach.apply(this, arguments);
        },
        afterEach: function() {
          this.clock.restore();
          this.clock.reset();
        }
      }, function() {
        test('should render if toolbox.visibility is "visible"', function(assert) {
          this.instance.option('toolbox.visibility', 'visible');
          var $accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR);
          assert.equal($accordion.length, 1);
          assert.equal($accordion.is(':visible'), true);
        });
        test('should not render if toolbox.visibility is "disabled"', function(assert) {
          this.instance.option('toolbox.visibility', 'disabled');
          var $accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR);
          assert.equal($accordion.length, 0);
        });
        test('should render invisible if toolbox.visibility is "collapsed"', function(assert) {
          this.instance.option('toolbox.visibility', 'collapsed');
          var $accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR);
          assert.equal($accordion.length, 0);
          var optionsButton = findViewToolbarItem(this.$element, 'settings');
          optionsButton.trigger('dxclick');
          var showToolboxButton = findContextMenuItem(this.$element, 'show toolbox');
          showToolboxButton.trigger('dxclick');
          $accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR);
          assert.equal($accordion.length, 1);
          assert.equal($accordion.is(':visible'), true);
          showToolboxButton.trigger('dxclick');
          this.clock.tick(2000);
          assert.equal($accordion.length, 1);
          assert.equal($accordion.is(':visible'), false);
        });
        test('should fill toolbox with default items', function(assert) {
          var accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR).dxAccordion('instance');
          assert.ok(accordion.option('dataSource').length > 1);
        });
        test('should fill toolbox with custom items', function(assert) {
          this.instance.option('toolbox.groups', ['general']);
          var accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR).dxAccordion('instance');
          assert.equal(accordion.option('dataSource').length, 1);
        });
        test('should expanded first group be default', function(assert) {
          var accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR).dxAccordion('instance');
          assert.equal(accordion.option('selectedItems').length, 1);
          assert.equal(accordion.option('selectedItems')[0], accordion.option('dataSource')[0]);
          this.instance.option('toolbox.groups', ['general', {
            category: 'containers',
            title: 'Containers',
            expanded: true
          }]);
          assert.equal(accordion.option('selectedItems').length, 2);
          assert.equal(accordion.option('selectedItems')[0], accordion.option('dataSource')[0]);
          assert.equal(accordion.option('selectedItems')[1], accordion.option('dataSource')[1]);
          this.instance.option('toolbox.groups', ['containers', 'orgChart']);
          assert.equal(accordion.option('selectedItems').length, 1);
          assert.equal(accordion.option('selectedItems')[0], accordion.option('dataSource')[0]);
        });
        test('should hide toolbox search input', function(assert) {
          var $input = $('#qunit-fixture').find(Consts.TOOLBOX_INPUT_CONTAINER_SELECTOR);
          assert.equal($input.length, 1);
          assert.equal($input.is(':visible'), true);
          this.instance.option('toolbox.showSearch', false);
          $input = $('#qunit-fixture').find(Consts.TOOLBOX_INPUT_CONTAINER_SELECTOR);
          assert.equal($input.length, 0);
        });
        test('should set toolbox width', function(assert) {
          var $input = $('#qunit-fixture').find(Consts.TOOLBOX_INPUT_CONTAINER_SELECTOR);
          var $accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR);
          assert.equal($input.length, 1);
          assert.notEqual($input.width(), 300);
          assert.equal($accordion.length, 1);
          assert.notEqual($accordion.width(), 300);
          this.instance.option('toolbox.width', 300);
          $input = $('#qunit-fixture').find(Consts.TOOLBOX_INPUT_CONTAINER_SELECTOR);
          $accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR);
          assert.equal($input.length, 1);
          assert.equal($input.width(), 300);
          assert.equal($accordion.length, 1);
          assert.equal($accordion.width(), 300);
        });
        test('call .update() after accordion item collapsing/expanding', function(assert) {
          var clock = sinon.useFakeTimers();
          var $scrollView = $('#qunit-fixture').find(Consts.TOOLBOX_SCROLLVIEW_SELECTOR);
          var scrollView = $scrollView.dxScrollView('instance');
          var updateSpy = sinon.spy(scrollView, 'update');
          var $accordion = $('#qunit-fixture').find(Consts.TOOLBOX_ACCORDION_SELECTOR);
          $accordion.find('.dx-accordion-item-title').first().trigger('dxclick');
          clock.tick(2000);
          assert.equal(updateSpy.callCount, 1, 'scrollView.update() called once');
          clock.restore();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/diagram","../../../helpers/diagramHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/diagram"), require("../../../helpers/diagramHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toolbox.tests.js.map