!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/gallery.markup.tests.js"], ["jquery","ui/gallery","core/utils/window"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/gallery.markup.tests.js", ["jquery", "ui/gallery", "core/utils/window"], function($__export) {
  "use strict";
  var $,
      Gallery,
      windowUtils,
      GALLERY_CLASS,
      GALLERY_WRAPPER_CLASS,
      GALLERY_ITEM_CONTAINER_CLASS,
      GALLERY_ITEM_CLASS,
      prepareItemTest;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Gallery = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<style>\
            .dx-gallery, .dx-gallery-item {\
                width: 400px;\
                height: 400px;\
            }\
        </style>\
        \
        <div id="gallerySimple"></div>\
        \
        <div id="galleryWithTmpl">\
            <div data-options="dxTemplate : { name: \'item\' } " >\
                <div>0</div>\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      GALLERY_CLASS = 'dx-gallery';
      GALLERY_WRAPPER_CLASS = GALLERY_CLASS + '-wrapper';
      GALLERY_ITEM_CONTAINER_CLASS = GALLERY_CLASS + '-container';
      GALLERY_ITEM_CLASS = GALLERY_CLASS + '-item';
      prepareItemTest = function(data) {
        var gallery = new Gallery($('<div>'), {items: [data]});
        return gallery.itemElements().eq(0).find('.dx-item-content').contents();
      };
      QUnit.module('base', function() {
        QUnit.test('default classes', function(assert) {
          var $gallery = $('#gallerySimple').dxGallery({items: [0, 1, 2, 3]});
          var $galleryItems = $gallery.find('.' + GALLERY_ITEM_CLASS);
          assert.ok($gallery.hasClass(GALLERY_CLASS), 'element has a widget-specific class');
          assert.equal($gallery.find('.' + GALLERY_WRAPPER_CLASS).length, 1, 'gallery wrapper attached');
          assert.equal($gallery.find('.' + GALLERY_ITEM_CONTAINER_CLASS).length, 1, 'gallery items container attached');
          assert.ok($galleryItems.eq(0).find('img').hasClass('dx-gallery-item-image'), 'right class was passed');
        });
        QUnit.test('item template', function(assert) {
          var $gallery = $('#galleryWithTmpl').dxGallery({items: [1, 2, 3]});
          var items = $gallery.find('.' + GALLERY_ITEM_CLASS);
          if (windowUtils.hasWindow()) {
            assert.equal(items.length, 3, '3 items were rendered');
            assert.equal($gallery.text().replace(/\s+/g, ''), '000');
          } else {
            assert.equal(items.length, 1, '1 item were rendered');
            assert.equal($gallery.text().replace(/\s+/g, ''), '0');
          }
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria role', function(assert) {
          var $element = $('#gallerySimple').dxGallery();
          assert.equal($element.attr('role'), 'listbox', 'aria role is correct');
        });
        QUnit.test('aria label', function(assert) {
          var $element = $('#gallerySimple').dxGallery();
          assert.equal($element.attr('aria-label'), 'gallery', 'widget should have aria-label to have difference from text list');
        });
        QUnit.test('aria role for items', function(assert) {
          var $element = $('#gallerySimple').dxGallery({items: [1]});
          var $item = $element.find('.' + GALLERY_ITEM_CLASS);
          assert.equal($item.attr('role'), 'option', 'item\'s role is correct');
        });
      });
      QUnit.module('default template', function() {
        QUnit.test('template should be rendered correctly with image as string', function(assert) {
          var $content = prepareItemTest('test');
          var $img = $content.filter('img');
          assert.equal($img.length, 1);
          assert.equal($img.attr('src'), 'test');
        });
        QUnit.test('template should be rendered correctly with imageSrc', function(assert) {
          var $content = prepareItemTest({imageSrc: 'test.jpg'});
          var $img = $content.filter('img');
          assert.equal($img.length, 1);
          assert.equal($img.attr('src'), 'test.jpg');
        });
        QUnit.test('template should be rendered correctly with imageSrc & imageAlt', function(assert) {
          var $content = prepareItemTest({
            imageSrc: 'test.jpg',
            imageAlt: 'test'
          });
          var $img = $content.filter('img');
          assert.equal($img.length, 1);
          assert.equal($img.attr('alt'), 'test');
        });
        QUnit.test('template should be rendered correctly with html', function(assert) {
          var $content = prepareItemTest({html: '<span>test</span>'});
          var $span = $content.is('span') ? $content : $content.children();
          assert.ok($span.length);
          assert.equal($span.text(), 'test');
        });
        QUnit.test('template should be rendered correctly with text', function(assert) {
          var $content = prepareItemTest({text: 'custom'});
          assert.equal($.trim($content.text()), 'custom');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/gallery","core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/gallery"), require("core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=gallery.markup.tests.js.map