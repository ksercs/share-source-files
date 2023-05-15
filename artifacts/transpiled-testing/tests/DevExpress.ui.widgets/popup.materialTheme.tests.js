!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/popup.materialTheme.tests.js"], ["jquery","animation/fx","core/utils/view_port","../../helpers/executeAsyncMock.js","material_blue_light.css!","ui/popup","ui/switch","ui/scroll_view","ui/date_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/popup.materialTheme.tests.js", ["jquery", "animation/fx", "core/utils/view_port", "../../helpers/executeAsyncMock.js", "material_blue_light.css!", "ui/popup", "ui/switch", "ui/scroll_view", "ui/date_box"], function($__export) {
  "use strict";
  var $,
      fx,
      viewPort,
      executeAsyncMock;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      viewPort = $__m.value;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<style>\n            html, body {\n                height: 100%;\n                margin: 0;\n            }\n            #qunit-fixture {\n                width: 100%;\n                height: 100%;\n            }\n        </style>\n        <div id=\"popup\"></div>";
        $('#qunit-fixture').html(markup);
      });
      executeAsyncMock.setup();
      QUnit.module('popover content size', {
        beforeEach: function() {
          viewPort($('#qunit-fixture').addClass('dx-viewport'));
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('popover content has correct size switch', function(assert) {
          $('#popup').dxPopup({
            width: 1000,
            height: '100%',
            contentTemplate: function() {
              var scrollView = $('<div id="switch"></div>');
              return scrollView;
            }
          }).dxPopup('instance').show();
          var $switch = $('#switch').dxSwitch();
          $switch.dxSwitch('instance');
          assert.equal($switch.contents().eq(0).width(), 36, 'Set coorect switch width');
          assert.equal($switch.contents().eq(0).height(), 20, 'Set correct switch height');
        });
      });
      QUnit.module('popup', {
        beforeEach: function() {
          viewPort($('#qunit-fixture').addClass('dx-viewport'));
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('title should have margin-bottom = 0 (T979891)', function(assert) {
          var popup = $('#popup').dxPopup({visible: true}).dxPopup('instance');
          var $title = popup.topToolbar();
          assert.strictEqual($title.css('marginBottom'), '0px', 'margin-bottom equals 0');
        });
        ['outlined', 'underlined', 'filled'].forEach(function(stylingMode) {
          QUnit.test(("popup content should not be scrollable with datebox in stylingMode: " + stylingMode + " (T1100188)"), function(assert) {
            var popupContent = $("<div id=\"scrollView\">\n                    <div id=\"dateBox\"></div>\n                </div>'");
            popupContent.appendTo($('#popup'));
            $('#popup').dxPopup({
              height: 'auto',
              visible: true
            });
            var scrollView = $('#scrollView').dxScrollView({
              scrollByContent: true,
              showScrollbar: 'always'
            }).dxScrollView('instance');
            $('#dateBox').dxDateBox({
              label: 'Hello',
              stylingMode: stylingMode,
              displayFormat: 'dd.MM.yyyy'
            });
            scrollView.scrollTo(100);
            assert.deepEqual(scrollView.scrollOffset(), {
              top: 0,
              left: 0
            }, 'scroll position does not changed');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","core/utils/view_port","../../helpers/executeAsyncMock.js","material_blue_light.css!","ui/popup","ui/switch","ui/scroll_view","ui/date_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("core/utils/view_port"), require("../../helpers/executeAsyncMock.js"), require("material_blue_light.css!"), require("ui/popup"), require("ui/switch"), require("ui/scroll_view"), require("ui/date_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=popup.materialTheme.tests.js.map