!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/devices.tests.js"], ["../../helpers/includeThemesLinks.js","jquery","core/dom_adapter","ui/themes","core/devices","core/utils/view_port","core/utils/resize_callbacks","core/utils/ready_callbacks","core/config","core/utils/size"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/devices.tests.js", ["../../helpers/includeThemesLinks.js", "jquery", "core/dom_adapter", "ui/themes", "core/devices", "core/utils/view_port", "core/utils/resize_callbacks", "core/utils/ready_callbacks", "core/config", "core/utils/size"], function($__export) {
  "use strict";
  var $,
      domAdapter,
      themes,
      devices,
      fromUA,
      viewPort,
      viewPortChanged,
      resizeCallbacks,
      readyCallbacks,
      config,
      implementationsMap,
      userAgents;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      domAdapter = $__m.default;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      viewPort = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      readyCallbacks = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      implementationsMap = $__m.implementationsMap;
    }],
    execute: function() {
      fromUA = $.proxy(devices._fromUA, devices);
      viewPortChanged = viewPort.changeCallback;
      userAgents = {
        iphone_12: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1',
        ipad_10: 'Mozilla/5.0 (iPad; CPU OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.0 Mobile/14G60 Safari/602.1',
        android_9: 'Mozilla/5.0 (Linux; Android 9; Mi A2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.143 Mobile Safari/537.36',
        android_tablet_7_1_1: 'Mozilla/5.0 (Linux; Android 7.1.1; SM-T555 Build/NMF26X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Safari/537.36',
        win_phone_10: 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; NOKIA; Lumia 920) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.0'
      };
      themes.setDefaultTimeout(0);
      QUnit.module('devices', {
        beforeEach: function() {
          this._savedDevice = devices.current();
        },
        afterEach: function() {
          themes.resetTheme();
          devices.current(this._savedDevice);
          return new Promise(function(resolve) {
            return themes.initialized(resolve);
          });
        }
      });
      QUnit.test('ios by userAgent', function(assert) {
        var device = fromUA(userAgents.iphone_12);
        assert.equal(device.platform, 'ios', 'platform is ios');
        assert.equal(device.version.toString(), '12,3,1', 'correct version');
        assert.equal(device.deviceType, 'phone', 'deviceType is phone');
        device = fromUA(userAgents.ipad_10);
        assert.equal(device.platform, 'ios', 'platform is ios');
        assert.equal(device.version.toString(), '10,3,3', 'correct version');
        assert.equal(device.deviceType, 'tablet', 'deviceType is tablet');
      });
      QUnit.test('android by userAgent', function(assert) {
        var device = fromUA(userAgents.android_tablet_7_1_1);
        assert.equal(device.platform, 'android', 'platform is android');
        assert.equal(device.version.toString(), '7,1,1', 'correct version');
        assert.equal(device.deviceType, 'tablet', 'deviceType is tablet');
        device = fromUA(userAgents.android_9);
        assert.equal(device.platform, 'android', 'platform is android');
        assert.equal(device.version.toString(), '9,0,0', 'correct version');
        assert.equal(device.deviceType, 'phone', 'deviceType is phone');
      });
      QUnit.test('iphone by device name', function(assert) {
        var device;
        devices.current('iPhone');
        device = devices.current();
        assert.equal(device.platform, 'ios', 'correct platform');
        assert.equal(device.deviceType, 'phone', 'correct deviceType');
        devices.current('iPhone5');
        device = devices.current();
        assert.equal(device.platform, 'ios', 'correct platform');
        assert.equal(device.deviceType, 'phone', 'correct deviceType');
        devices.current('iPhone6');
        device = devices.current();
        assert.equal(device.platform, 'ios', 'correct platform');
        assert.equal(device.deviceType, 'phone', 'correct deviceType');
        devices.current('iPhone6plus');
        device = devices.current();
        assert.equal(device.platform, 'ios', 'correct platform');
        assert.equal(device.deviceType, 'phone', 'correct deviceType');
      });
      QUnit.test('ipad by device name', function(assert) {
        devices.current('iPad');
        var device = devices.current();
        assert.equal(device.platform, 'ios', 'correct platform');
        assert.equal(device.deviceType, 'tablet', 'correct deviceType');
      });
      QUnit.test('ipad mini by device name', function(assert) {
        devices.current('iPadMini');
        var device = devices.current();
        assert.equal(device.platform, 'ios', 'correct platform');
        assert.equal(device.deviceType, 'tablet', 'correct deviceType');
      });
      QUnit.test('android phone by device name', function(assert) {
        devices.current('androidPhone');
        var device = devices.current();
        assert.equal(device.platform, 'android', 'correct platform');
        assert.equal(device.deviceType, 'phone', 'correct deviceType');
      });
      QUnit.test('android tablet by device name', function(assert) {
        devices.current('androidTablet');
        var device = devices.current();
        assert.equal(device.platform, 'android', 'correct platform');
        assert.equal(device.deviceType, 'tablet', 'correct deviceType');
      });
      QUnit.test('winphone10 by userAgent', function(assert) {
        var device = fromUA(userAgents.win_phone_10);
        assert.strictEqual(device.deviceType, 'phone', 'correct deviceType');
        assert.strictEqual(device.platform, 'generic', 'platform is generic because win is deprecated');
      });
      QUnit.test('generic phone by device name', function(assert) {
        devices.current('genericPhone');
        var device = devices.current();
        assert.equal(device.platform, 'generic', 'correct platform');
        assert.equal(device.deviceType, 'phone', 'correct deviceType');
      });
      QUnit.test('current', function(assert) {
        devices.current(fromUA(userAgents.iphone_12));
        var device = devices.current();
        assert.equal(device.platform, 'ios', 'platform is ios');
        assert.equal(device.version.toString(), '12,3,1', 'correct version');
        assert.equal(device.deviceType, 'phone', 'deviceType is phone');
      });
      QUnit.test('method current sets necessary flags', function(assert) {
        devices.current({
          platform: 'android',
          deviceType: 'tablet'
        });
        var device = devices.current();
        assert.ok(device.android, 'correct android flag');
        assert.ok(device.tablet, 'correct tablet flag');
      });
      QUnit.test('method current sets correct shortcuts if deviceType was not forced (T268185)', function(assert) {
        devices.current({
          platform: 'android',
          deviceType: 'tablet'
        });
        devices.current({platform: 'ios'});
        var device = devices.current();
        assert.ok(device.ios, 'correct ios flag');
        assert.equal(device.deviceType, 'tablet', 'correct deviceType value');
        assert.ok(device.tablet, 'correct tablet flag');
      });
      QUnit.test('method themes.ready calls a callback function after device setting and themes loading', function(assert) {
        var done = assert.async();
        themes.ready(function() {
          assert.ok(devices.current().ios, 'correct ios flag');
          assert.equal(themes.current(), 'generic.light');
          done();
        });
        devices.current({platform: 'ios'});
      });
      QUnit.test('attach css classes', function(assert) {
        var originalRealDevice = devices.real();
        try {
          var $element = $('<div>');
          devices.real({
            platform: 'ios',
            version: [7, 1]
          });
          devices.attachCssClasses($element);
          assert.ok($element.hasClass('dx-device-ios'), 'real device platform class added');
          assert.ok($element.hasClass('dx-device-ios-7'), 'real device platform with version class added');
        } finally {
          devices.real(originalRealDevice);
        }
      });
      QUnit.test('attach css classes (dx-device-mobile)', function(assert) {
        var originalCurrentDevice = devices.current();
        try {
          var $element = $('<div>');
          devices.current({
            platform: 'generic',
            deviceType: 'phone'
          });
          devices.attachCssClasses($element);
          assert.ok(!$element.hasClass('dx-device-desktop'));
          assert.ok($element.hasClass('dx-device-phone'));
          assert.ok(!$element.hasClass('dx-device-tablet'));
          assert.ok($element.hasClass('dx-device-mobile'));
          $element = $('<div>');
          devices.current({
            platform: 'generic',
            deviceType: 'tablet'
          });
          devices.attachCssClasses($element);
          assert.ok(!$element.hasClass('dx-device-desktop'));
          assert.ok(!$element.hasClass('dx-device-phone'));
          assert.ok($element.hasClass('dx-device-tablet'));
          assert.ok($element.hasClass('dx-device-mobile'));
          $element = $('<div>');
          devices.current({
            platform: 'generic',
            deviceType: 'desktop'
          });
          devices.attachCssClasses($element);
          assert.ok($element.hasClass('dx-device-desktop'));
          assert.ok(!$element.hasClass('dx-device-phone'));
          assert.ok(!$element.hasClass('dx-device-tablet'));
          assert.ok(!$element.hasClass('dx-device-mobile'));
        } finally {
          devices.current(originalCurrentDevice);
        }
      });
      QUnit.test('detach css classes', function(assert) {
        var originalRealDevice = devices.real();
        try {
          var $element = $('<div>');
          devices.real({
            platform: 'ios',
            version: [7, 1]
          });
          devices.attachCssClasses($element);
          devices.detachCssClasses($element);
          assert.equal($element.hasClass('dx-device-ios'), false, 'platform class removed');
          assert.equal($element.hasClass('dx-device-ios-7'), false, 'version class removed');
        } finally {
          devices.real(originalRealDevice);
        }
      });
      QUnit.test('detach only attached classes', function(assert) {
        var originalRealDevice = devices.real();
        try {
          var $element = $('<div>');
          devices.real({
            platform: 'ios',
            version: [7, 1]
          });
          devices.attachCssClasses($element);
          devices.real({
            platform: 'generic',
            version: []
          });
          devices.detachCssClasses($element);
          assert.equal($element.hasClass('dx-device-ios'), false, 'platform class removed');
          assert.equal($element.hasClass('dx-device-ios-7'), false, 'version class removed');
        } finally {
          devices.real(originalRealDevice);
        }
      });
      QUnit.test('move classes from previous viewport to new viewport', function(assert) {
        var originalRealDevice = devices.real();
        try {
          var $element = $('<div>');
          devices.real({
            platform: 'ios',
            version: [7, 1]
          });
          devices.attachCssClasses($element);
          var $newElement = $('<div>');
          viewPortChanged.fire($newElement, $element);
          assert.equal($element.hasClass('dx-device-ios'), false, 'platform class removed');
          assert.equal($element.hasClass('dx-device-ios-7'), false, 'version class removed');
          assert.ok($newElement.hasClass('dx-device-ios'), 'real device platform class added');
          assert.ok($newElement.hasClass('dx-device-ios-7'), 'real device platform with version class added');
        } finally {
          devices.real(originalRealDevice);
        }
      });
      QUnit.test('attach css classes RTL', function(assert) {
        var originalRTL = config().rtlEnabled;
        try {
          var $element = $('<div>');
          config({rtlEnabled: false});
          devices.attachCssClasses($element);
          assert.equal($element.hasClass('dx-rtl'), false, 'rtl class was not added');
          config({rtlEnabled: true});
          devices.attachCssClasses($element);
          assert.equal($element.hasClass('dx-rtl'), true, 'rtl class added');
        } finally {
          config({rtlEnabled: originalRTL});
        }
      });
      QUnit.test('attach css classes in simulator', function(assert) {
        var originalIsSimulator = devices.isSimulator;
        try {
          devices.isSimulator = function() {
            return true;
          };
          var $element = $('<div>');
          devices.attachCssClasses($element);
          assert.ok($element.hasClass('dx-simulator'), 'simulator class added');
        } finally {
          devices.isSimulator = originalIsSimulator;
        }
      });
      QUnit.test('classes not attached to body ', function(assert) {
        var originalCurrentDevice = devices.current();
        var $style = $('<style>').text('.dx-theme-marker {font-family: "dx.ios7.default" }');
        $style.appendTo('head');
        try {
          var $body = $('body');
          devices.current({
            platform: 'ios',
            version: [7, 1]
          });
          assert.ok(!$body.hasClass('dx-theme-ios7'), 'classes is not added on ');
        } finally {
          $style.remove();
          devices.current(originalCurrentDevice);
        }
      });
      QUnit.test('simulator forcing', function(assert) {
        devices.forceSimulator();
        assert.equal(devices.isSimulator(), true, 'simulator forced');
      });
      QUnit.test('isSimulator return true when is ripple emulator', function(assert) {
        var ripple = window.tinyHippos;
        try {
          window.tinyHippos = true;
          assert.ok(devices.isSimulator(), 'ripple emulator detected as simulator');
        } finally {
          window.tinyHippos = ripple;
        }
      });
      QUnit.test('should not call document properties before content is loaded', function(assert) {
        var Proxy = window.Proxy;
        if (!Proxy) {
          assert.expect(0);
          return;
        }
        var originalDocumentGetter = domAdapter.getDocumentElement;
        var originalReadyCallbacksAdd = readyCallbacks.add;
        try {
          var documentPropertiesCallCount = 0;
          var documentMock = new Proxy({}, {get: function() {
              documentPropertiesCallCount++;
              return;
            }});
          domAdapter.getDocumentElement = function() {
            return documentMock;
          };
          readyCallbacks.add = function() {};
          new devices.Devices();
          assert.strictEqual(documentPropertiesCallCount, 0, 'document properties call count');
        } finally {
          domAdapter.getDocumentElement = originalDocumentGetter;
          readyCallbacks.add = originalReadyCallbacksAdd;
        }
      });
      QUnit.module('orientation', {
        beforeEach: function() {
          var that = this;
          that.currentWidth = 100;
          that.currentHeight = 200;
          that.originalWidth = implementationsMap.getWidth;
          that.originalHeight = implementationsMap.getHeight;
          implementationsMap.getWidth = function() {
            return that.currentWidth;
          };
          implementationsMap.getHeight = function() {
            return that.currentHeight;
          };
        },
        afterEach: function() {
          implementationsMap.getWidth = this.originalWidth;
          implementationsMap.getHeight = this.originalHeight;
        }
      });
      QUnit.test('orientation detecting', function(assert) {
        assert.expect(3);
        var device = new devices.constructor();
        assert.equal(device.orientation(), 'portrait');
        device.on('orientationChanged', function(args) {
          assert.equal(args.orientation, 'landscape');
          assert.equal(device.orientation(), 'landscape');
        });
        this.currentHeight = 100;
        this.currentWidth = 200;
        resizeCallbacks.fire();
      });
      QUnit.test('no unnecessary orientationChanged on screen keyboard appearing', function(assert) {
        var device = new devices.constructor();
        device.on('orientationChanged', function(args) {
          assert.ok(false, 'orientationChanged should not fire');
        });
        this.currentHeight = 90;
        resizeCallbacks.fire();
        assert.equal(device.orientation(), 'portrait');
      });
      QUnit.test('force device replace only needed option', function(assert) {
        var done = assert.async();
        themes.resetTheme();
        themes.initialized(function() {
          themes.resetTheme();
          themes.initialized(function() {
            assert.equal(devices.current().deviceType, 'tablet', 'deviceType was not overridden');
            done();
          });
          devices.current({platform: 'android'});
        });
        devices.current({
          platform: 'ios',
          deviceType: 'tablet'
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/includeThemesLinks.js","jquery","core/dom_adapter","ui/themes","core/devices","core/utils/view_port","core/utils/resize_callbacks","core/utils/ready_callbacks","core/config","core/utils/size"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/includeThemesLinks.js"), require("jquery"), require("core/dom_adapter"), require("ui/themes"), require("core/devices"), require("core/utils/view_port"), require("core/utils/resize_callbacks"), require("core/utils/ready_callbacks"), require("core/config"), require("core/utils/size"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=devices.tests.js.map