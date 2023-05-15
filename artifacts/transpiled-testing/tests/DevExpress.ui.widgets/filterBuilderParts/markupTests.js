!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/filterBuilderParts/markupTests.js"], ["jquery","core/devices","../../../helpers/filterBuilderTestData.js","ui/filter_builder"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/filterBuilderParts/markupTests.js", ["jquery", "core/devices", "../../../helpers/filterBuilderTestData.js", "ui/filter_builder"], function($__export) {
  "use strict";
  var $,
      devices,
      fields,
      FILTER_BUILDER_GROUP_CONTENT_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      fields = $__m.default;
    }, function($__m) {}],
    execute: function() {
      FILTER_BUILDER_GROUP_CONTENT_CLASS = 'dx-filterbuilder-group-content';
      QUnit.test('markup init', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'This test is not actual for mobile devices, dxclick add onclick=\'void(0)\' to every button in mobile');
          return;
        }
        var $etalon = $('<div id="container" class="dx-filterbuilder dx-widget">' + '<div class="dx-filterbuilder-group">' + '<div class="dx-filterbuilder-group-item">' + '<div class="dx-filterbuilder-text dx-filterbuilder-group-operation" tabindex="0">And</div>' + '<div class="dx-filterbuilder-action-icon dx-icon-plus dx-filterbuilder-action" tabindex="0"></div>' + '</div>' + '<div class="dx-filterbuilder-group-content"></div>' + '</div>' + '</div>');
        var element = $('#container').dxFilterBuilder();
        assert.equal(element.html(), $etalon.html());
      });
      QUnit.test('filterbuilder is created by different values', function(assert) {
        var instance = $('#container').dxFilterBuilder({fields: fields}).dxFilterBuilder('instance');
        try {
          instance.option('value', null);
          instance.option('value', []);
          instance.option('value', ['Or']);
          instance.option('value', ['!', [['CompanyName', '=', 'DevExpress'], ['CompanyName', '=', 'DevExpress']]]);
          instance.option('value', ['!', ['CompanyName', '=', 'DevExpress']]);
          instance.option('value', ['CompanyName', '=', 'K&S Music']);
          instance.option('value', ['CompanyName', 'K&S Music']);
          instance.option('value', [['CompanyName', '=', 'K&S Music'], ['CompanyName', '=', 'K&S Music']]);
          instance.option('value', [[['CompanyName', '=', 'K&S Music'], 'Or'], 'And']);
          assert.ok(true, 'all values were approved');
        } catch (e) {
          assert.ok(false, e);
        }
      });
      QUnit.test('filter Content init by one condition', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'This test is not actual for mobile devices, dxclick add onclick=\'void(0)\' to every button in mobile');
          return;
        }
        var $etalon = $('<div/>').html('<div class="dx-filterbuilder-group">' + '<div class="dx-filterbuilder-group-item">' + '<div class="dx-filterbuilder-action-icon dx-icon-remove dx-filterbuilder-action" tabindex="0"></div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-group-operation" tabindex="0">Or</div>' + '<div class="dx-filterbuilder-action-icon dx-icon-plus dx-filterbuilder-action" tabindex="0"></div>' + '</div>' + '<div class="dx-filterbuilder-group-content">' + '<div class="dx-filterbuilder-group">' + '<div class="dx-filterbuilder-group-item">' + '<div class="dx-filterbuilder-action-icon dx-icon-remove dx-filterbuilder-action" tabindex="0"></div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-item-field" tabindex="0">Company Name</div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-item-operation" tabindex="0">Equals</div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-item-value">' + '<div class="dx-filterbuilder-item-value-text" tabindex="0">K&amp;S Music</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>');
        var element = $('#container').dxFilterBuilder({
          fields: fields,
          value: [[['CompanyName', '=', 'K&S Music'], 'Or'], 'And']
        });
        assert.equal(element.find('.' + FILTER_BUILDER_GROUP_CONTENT_CLASS).html(), $etalon.html());
      });
      QUnit.test('filter Content init by several conditions', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'This test is not actual for mobile devices, because dxclick add onclick=\'void(0)\' to every button in mobile');
          return;
        }
        var $etalon = $('<div/>').html('<div class="dx-filterbuilder-group">' + '<div class="dx-filterbuilder-group-item">' + '<div class="dx-filterbuilder-action-icon dx-icon-remove dx-filterbuilder-action" tabindex="0"></div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-item-field" tabindex="0">Company Name</div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-item-operation" tabindex="0">Equals</div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-item-value">' + '<div class="dx-filterbuilder-item-value-text" tabindex="0">K&amp;S Music</div>' + '</div>' + '</div>' + '</div>' + '<div class="dx-filterbuilder-group">' + '<div class="dx-filterbuilder-group-item">' + '<div class="dx-filterbuilder-action-icon dx-icon-remove dx-filterbuilder-action" tabindex="0"></div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-item-field" tabindex="0">Zipcode</div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-item-operation" tabindex="0">Equals</div>' + '<div class="dx-filterbuilder-text dx-filterbuilder-item-value">' + '<div class="dx-filterbuilder-item-value-text" tabindex="0">98027</div>' + '</div>' + '</div>' + '</div>');
        var element = $('#container').dxFilterBuilder({
          fields: fields,
          value: [['CompanyName', '=', 'K&S Music'], 'or', ['Zipcode', '=', '98027']]
        });
        assert.equal(element.find('.' + FILTER_BUILDER_GROUP_CONTENT_CLASS).html(), $etalon.html());
      });
      [['and'], ['or'], ['notOr'], ['notAnd']].forEach(function(groupOperations) {
        var getOperationText = function(operation) {
          var isNot = operation.indexOf('not') !== -1;
          return isNot ? ("Not " + operation.substring(3, 4).toUpperCase() + operation.substring(4)) : ("" + operation.substring(0, 1).toUpperCase() + operation.substring(1));
        };
        [null, []].forEach(function(value) {
          QUnit.test(("filter content with custom group operations (" + groupOperations + ") and " + (!value ? value : 'empty') + " value"), function(assert) {
            if (devices.real().deviceType !== 'desktop') {
              assert.ok(true, 'This test is not actual for mobile devices, because dxclick add onclick=\'void(0)\' to every button in mobile');
              return;
            }
            var element = $('#container').dxFilterBuilder({
              fields: fields,
              value: value,
              groupOperations: groupOperations
            });
            assert.strictEqual(element.find('.dx-filterbuilder-group-operation').text(), getOperationText(groupOperations[0]));
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","../../../helpers/filterBuilderTestData.js","ui/filter_builder"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("../../../helpers/filterBuilderTestData.js"), require("ui/filter_builder"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=markupTests.js.map