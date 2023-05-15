!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.pivotGrid/fieldChooser.markup.tests.js"], ["generic_light.css!","__internal/grids/pivot_grid/field_chooser/module","jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.pivotGrid/fieldChooser.markup.tests.js", ["generic_light.css!", "__internal/grids/pivot_grid/field_chooser/module", "jquery"], function($__export) {
  "use strict";
  var $,
      createMockDataSource;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="container"></div>';
        $('#qunit-fixture').html(markup);
      });
      createMockDataSource = function(options) {
        $.each(options.fields || [], function(index, field) {
          field.index = index;
        });
        var stubDataSource = {
          getAreaFields: function(area) {
            return options[area + 'Fields'] || [];
          },
          field: sinon.stub(),
          getFieldValues: function(index) {
            return $.Deferred().resolve(options.fieldValues[index]);
          },
          fields: function() {
            return options.fields;
          },
          state: function() {
            return {fields: options.fields};
          },
          load: sinon.stub(),
          on: sinon.stub(),
          off: sinon.stub(),
          isLoading: sinon.stub().returns(false)
        };
        return stubDataSource;
      };
      QUnit.module('dxPivotGridFieldChooser markup tests', {
        beforeEach: function() {
          this.setupFieldChooser = function(dataSourceOptions, fieldChooserOptions) {
            fieldChooserOptions = fieldChooserOptions || {};
            if (dataSourceOptions) {
              this.dataSource = createMockDataSource(dataSourceOptions);
              fieldChooserOptions.dataSource = this.dataSource;
            }
            this.$element = $('#container');
            this.fieldChooser = this.$element.dxPivotGridFieldChooser(fieldChooserOptions).dxPivotGridFieldChooser('instance');
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Init markup without DataSource', function(assert) {
          this.setupFieldChooser();
          var $cols = this.$element.find('.dx-col');
          var $areas = $cols.find('.dx-area');
          var $headers = $areas.children('.dx-area-fields-header');
          assert.ok(this.fieldChooser);
          assert.ok(this.$element.hasClass('dx-pivotgridfieldchooser'), 'container has dx-pivotgridfieldchooser class');
          assert.ok(this.$element.hasClass('dx-pivotgrid-fields-container'), 'container has dx-pivotgrid-fields-container class');
          assert.equal($cols.length, 4, 'container has 2 columns');
          assert.equal($cols.find('.dx-area.dx-all-fields').length, 1, 'all fields area');
          assert.equal($cols.eq(0).find('.dx-area').length, 1, '1st col areas contains 1 area');
          assert.equal($cols.eq(1).find('.dx-area').length, 2, '2nd col contains 2 areas');
          assert.equal($headers.length, 5, 'area headers count');
          assert.equal($headers.children('.dx-area-icon').length, 5, 'areas has icons');
          assert.equal($headers.children('.dx-area-caption').length, 5, 'areas has captions');
          assert.ok($areas.find('.dx-area-fields').length > 0, 'fields content');
        });
        QUnit.test('Empty DataSource', function(assert) {
          var dataSourceOptions = {};
          this.setupFieldChooser(dataSourceOptions);
          var $cols = this.$element.find('.dx-col');
          var $areas = $cols.find('.dx-area');
          var $headers = $areas.children('.dx-area-fields-header');
          assert.ok(this.fieldChooser);
          assert.ok(this.dataSource);
          assert.ok(this.$element.hasClass('dx-pivotgridfieldchooser'), 'container has dx-pivotgridfieldchooser class');
          assert.ok(this.$element.hasClass('dx-pivotgrid-fields-container'), 'container has dx-pivotgrid-fields-container class');
          assert.equal($cols.length, 4, 'container has 4 columns');
          assert.equal($cols.find('.dx-area.dx-all-fields').length, 1, 'all fields area');
          assert.equal($cols.eq(0).find('.dx-area').length, 1, '1st col areas count');
          assert.equal($cols.eq(1).find('.dx-area').length, 2, '2nd col areas count');
          assert.equal($cols.eq(2).find('.dx-area').length, 1, '3rd col areas count');
          assert.equal($cols.eq(3).find('.dx-area').length, 1, '4rd col areas count');
          assert.equal($headers.length, 5, 'area headers count');
          assert.equal($headers.children('.dx-area-icon').length, 5, 'areas has icons');
          assert.equal($headers.children('.dx-area-caption').length, 5, 'areas has captions');
          assert.ok($areas.find('.dx-area-fields').length > 0, 'fields content');
          assert.strictEqual(this.dataSource.load.callCount, 0);
        });
        QUnit.test('Init markup with sizes', function(assert) {
          this.setupFieldChooser({}, {
            height: 450,
            width: 550
          });
          assert.ok(this.fieldChooser);
          assert.equal(this.$element.get(0).style.width, '550px', 'width');
          assert.equal(this.$element.get(0).style.height, '450px', 'height');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","__internal/grids/pivot_grid/field_chooser/module","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("__internal/grids/pivot_grid/field_chooser/module"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=fieldChooser.markup.tests.js.map