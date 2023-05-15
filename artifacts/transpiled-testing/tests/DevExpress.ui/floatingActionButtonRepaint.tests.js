!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui/floatingActionButtonRepaint.tests.js"], ["jquery","core/config","ui/speed_dial_action/repaint_floating_action_button","animation/fx","ui/speed_dial_action","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui/floatingActionButtonRepaint.tests.js", ["jquery", "core/config", "ui/speed_dial_action/repaint_floating_action_button", "animation/fx", "ui/speed_dial_action", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      config,
      repaintFloatingActionButton,
      fx,
      test,
      FAB_MAIN_CLASS,
      FAB_SELECTOR,
      FAB_LABEL_SELECTOR;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      repaintFloatingActionButton = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, $__4));
      QUnit.testStart(function() {
        var markup = '<div id="fab-one"></div>\
        <div id="fab-two"></div>';
        $('#qunit-fixture').html(markup);
      });
      FAB_MAIN_CLASS = 'dx-fa-button-main';
      FAB_SELECTOR = '.dx-fa-button';
      FAB_LABEL_SELECTOR = '.dx-fa-button-label';
      QUnit.module('apply current config options', function(hooks) {
        hooks.beforeEach(function() {
          fx.off = true;
        }), hooks.afterEach(function() {
          config({floatingActionButtonConfig: {
              direction: 'top',
              position: {
                at: 'right bottom',
                my: 'right bottom',
                offset: '-16 -16'
              }
            }});
          fx.off = false;
        }), test('repaint with multiple actions', function(assert) {
          $('#fab-one').dxSpeedDialAction();
          $('#fab-two').dxSpeedDialAction();
          var $fabMainContent = $('.' + FAB_MAIN_CLASS).find('.dx-overlay-content');
          var $fabContent = $(FAB_SELECTOR).find('.dx-overlay-content');
          var fabMainDimensions = 64;
          assert.equal($fabMainContent.offset().top, $(window).height() - fabMainDimensions, 'default position top');
          assert.equal($fabMainContent.offset().left, $(window).width() - fabMainDimensions, 'default position left');
          assert.equal($fabMainContent.find('.dx-icon-add').length, 1, 'default icon');
          assert.equal($fabMainContent.find('.dx-icon-close').length, 1, 'default close icon');
          var fabItemDimensions = 30;
          $fabMainContent.trigger('dxclick');
          assert.equal($(window).height() - $fabContent.eq(1).offset().top - fabItemDimensions, 80, 'right first action position');
          assert.equal($(window).height() - $fabContent.eq(2).offset().top - fabItemDimensions, 120, 'right second action position');
          config({floatingActionButtonConfig: {
              shading: true,
              direction: 'down',
              position: 'left top',
              icon: 'edit',
              closeIcon: 'cancel'
            }});
          repaintFloatingActionButton();
          $fabMainContent = $('.' + FAB_MAIN_CLASS).find('.dx-overlay-content');
          assert.equal($fabMainContent.find('.dx-icon-edit').length, 1, 'default icon is changed');
          assert.equal($fabMainContent.find('.dx-icon-cancel').length, 1, 'default close icon is changed');
          assert.equal($fabMainContent.offset().top, 0, 'default position top is changed');
          assert.equal($fabMainContent.offset().left, 0, 'default position left is changed');
          assert.equal($fabMainContent.closest('.dx-overlay-shader').length, 0, 'there is not shading before FAB click');
          $fabMainContent.trigger('dxclick');
          $fabContent = $(FAB_SELECTOR).find('.dx-overlay-content');
          assert.equal($fabMainContent.closest('.dx-overlay-shader').length, 1, 'there is shading after FAB click');
          assert.equal($fabContent.eq(1).offset().top, 64, 'right first action position');
          assert.equal($fabContent.eq(2).offset().top, 104, 'right second action position');
        });
        test('repaint with one action', function(assert) {
          $('#fab-one').dxSpeedDialAction({
            icon: 'trash',
            label: 'Delete'
          });
          $('#fab-two').dxSpeedDialAction({visible: false});
          var $fabMainElement = $('.' + FAB_MAIN_CLASS);
          var $fabMainContent = $fabMainElement.find('.dx-overlay-content');
          var fabOffset = 16;
          assert.equal($fabMainContent.offset().top, $(window).height() - $fabMainContent.height() - fabOffset, 'default position top');
          assert.equal($fabMainContent.offset().left, Math.round($(window).width() - $fabMainContent.width() - fabOffset), 'default position left');
          assert.equal($fabMainContent.find('.dx-icon-trash').length, 1, 'icon is from SDA options');
          assert.equal($fabMainContent.find(FAB_LABEL_SELECTOR).eq(0).text(), 'Delete', 'label is from SDA options');
          config({floatingActionButtonConfig: {
              position: 'left top',
              icon: 'edit',
              closeIcon: 'cancel'
            }});
          repaintFloatingActionButton();
          assert.equal($fabMainContent.find(FAB_LABEL_SELECTOR).eq(0).text(), 'Delete', 'label is also from SDA options');
          assert.equal($fabMainContent.find('.dx-icon-trash').length, 1, 'icon is also from SDA options');
          assert.equal($fabMainContent.find('.dx-icon-cancel').length, 1, 'close icon is changed');
          assert.equal($fabMainContent.offset().top, 0, 'position top is changed');
          assert.equal($fabMainContent.offset().left, 0, 'position left is changed');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/config","ui/speed_dial_action/repaint_floating_action_button","animation/fx","ui/speed_dial_action","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/config"), require("ui/speed_dial_action/repaint_floating_action_button"), require("animation/fx"), require("ui/speed_dial_action"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=floatingActionButtonRepaint.tests.js.map