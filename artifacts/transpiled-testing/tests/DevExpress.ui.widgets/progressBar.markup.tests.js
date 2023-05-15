!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/progressBar.markup.tests.js"], ["jquery","ui/progress_bar","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/progressBar.markup.tests.js", ["jquery", "ui/progress_bar", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      PROGRESSBAR_CLASS,
      PROGRESSBAR_CONTAINER_CLASS,
      PROGRESSBAR_RANGE_CLASS,
      PROGRESSBAR_WRAPPER_CLASS,
      PROGRESSBAR_STATUS_CLASS,
      PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER,
      PROGRESSBAR_INDETERMINATE_SEGMENT;
  function toSelector(text) {
    return '.' + text;
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="progressbar"></div>';
        $('#qunit-fixture').html(markup);
      });
      PROGRESSBAR_CLASS = 'dx-progressbar';
      PROGRESSBAR_CONTAINER_CLASS = 'dx-progressbar-container';
      PROGRESSBAR_RANGE_CLASS = 'dx-progressbar-range';
      PROGRESSBAR_WRAPPER_CLASS = 'dx-progressbar-wrapper';
      PROGRESSBAR_STATUS_CLASS = 'dx-progressbar-status';
      PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER = 'dx-progressbar-animating-container';
      PROGRESSBAR_INDETERMINATE_SEGMENT = 'dx-progressbar-animating-segment';
      QUnit.module('ProgressBar markup', {beforeEach: function() {
          this.$element = $('#progressbar');
        }}, function() {
        QUnit.test('rendered markup', function(assert) {
          assert.expect(5);
          var $progressBar = this.$element.dxProgressBar();
          assert.ok($progressBar.hasClass(PROGRESSBAR_CLASS), 'ProgressBar initialized');
          assert.equal($progressBar.find(toSelector(PROGRESSBAR_CONTAINER_CLASS)).length, 1, 'Container has been created');
          assert.equal($progressBar.find(toSelector(PROGRESSBAR_RANGE_CLASS)).length, 1, 'Range has been created');
          assert.equal($progressBar.find(toSelector(PROGRESSBAR_WRAPPER_CLASS)).length, 1, 'Wrapper div has been created');
          assert.equal($progressBar.find(toSelector(PROGRESSBAR_STATUS_CLASS)).length, 1, 'Status div has been created');
        });
        QUnit.test('showStatus test', function(assert) {
          assert.expect(2);
          var $progressBar = this.$element.dxProgressBar({showStatus: false});
          var progressBar = $progressBar.dxProgressBar('instance');
          assert.equal($progressBar.find(toSelector(PROGRESSBAR_STATUS_CLASS)).length, 0, 'Status div hasn\'t been created');
          progressBar.option('showStatus', true);
          assert.equal($progressBar.find(toSelector(PROGRESSBAR_STATUS_CLASS)).length, 1, 'Status div has been added');
        });
        QUnit.test('value display in status', function(assert) {
          var $progressBar = this.$element.dxProgressBar({value: 10});
          var progressBar = $progressBar.dxProgressBar('instance');
          var $status = $progressBar.find(toSelector(PROGRESSBAR_STATUS_CLASS));
          assert.equal($status.text(), 'Progress: ' + progressBar.option('value') + '%', 'status text is right');
        });
        QUnit.test('custom status format', function(assert) {
          var $progressBar = this.$element.dxProgressBar({
            value: 10,
            statusFormat: function(value) {
              return 'Customised value: ' + value * 100;
            }
          });
          var progressBar = $progressBar.dxProgressBar('instance');
          var $status = $progressBar.find(toSelector(PROGRESSBAR_STATUS_CLASS));
          assert.equal($status.text(), 'Customised value: ' + progressBar.option('value'), 'status text is right');
        });
        QUnit.test('appropriate class should be added depending on the \'statusPosition\' option', function(assert) {
          var possiblePositions = ['left', 'right', 'bottom left', 'bottom right', 'bottom center', 'top left', 'top right', 'top center'];
          var $progressBar = this.$element.dxProgressBar({});
          var progressBar = $progressBar.dxProgressBar('instance');
          var $wrapper = $progressBar.find('.' + PROGRESSBAR_WRAPPER_CLASS);
          $.each(possiblePositions, function(_, position) {
            progressBar.option('statusPosition', position);
            var splitPosition = position.split(' ');
            var className = 'dx-position-' + splitPosition[0];
            if (splitPosition[1]) {
              className += '-' + splitPosition[1];
            }
            assert.ok($wrapper.hasClass(className), 'wrapper correct class for the \'' + position + '\' position');
          });
        });
        QUnit.test('render indeterminate state on init', function(assert) {
          assert.expect(2);
          var $progressBar = this.$element.dxProgressBar({value: null});
          var progressBar = $progressBar.dxProgressBar('instance');
          var renderedIndeterminateSegmentsCount = $progressBar.find(toSelector(PROGRESSBAR_INDETERMINATE_SEGMENT)).length;
          var defaultSegmentCount = progressBar.option('_animatingSegmentCount');
          assert.equal($progressBar.find(toSelector(PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER)).length, 1, 'Segment wrapper has been created');
          assert.equal(renderedIndeterminateSegmentsCount, defaultSegmentCount, 'Segments have been created');
        });
        QUnit.test('render indeterminate state with default option segments count', function(assert) {
          var $progressBar = this.$element.dxProgressBar({
            value: undefined,
            showStatus: false
          });
          var progressBar = $progressBar.dxProgressBar('instance');
          var renderedIndeterminateSegmentsCount = $progressBar.find(toSelector(PROGRESSBAR_INDETERMINATE_SEGMENT)).length;
          var defaultSegmentCount = progressBar.option('_animatingSegmentCount');
          assert.equal(renderedIndeterminateSegmentsCount, defaultSegmentCount, 'dxProgressBar have been created with correct segment count');
        });
        QUnit.test('render progressbar with max value on init', function(assert) {
          this.$element.dxProgressBar({
            value: 100,
            max: 100
          });
          assert.ok(true, 'progress bar has been rendered');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria role', function(assert) {
          var $element = $('#progressbar').dxProgressBar({});
          assert.equal($element.attr('role'), 'progressbar', 'aria role is correct');
        });
        QUnit.test('aria properties', function(assert) {
          var $element = $('#progressbar').dxProgressBar({
            min: 32,
            max: 137,
            value: 58
          });
          assert.equal($element.attr('aria-valuemin'), 32, 'min value is correct');
          assert.equal($element.attr('aria-valuemax'), 137, 'max value is correct');
          assert.equal($element.attr('aria-valuenow'), 58, 'current value is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/progress_bar","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/progress_bar"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=progressBar.markup.tests.js.map