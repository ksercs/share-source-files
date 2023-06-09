!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/mapParts/googleTests.js"], ["jquery","./utils.js","core/devices","ui/widget/ui.errors","ui/map/provider.dynamic.google","../../../helpers/ajaxMock.js","ui/map"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/mapParts/googleTests.js", ["jquery", "./utils.js", "core/devices", "ui/widget/ui.errors", "ui/map/provider.dynamic.google", "../../../helpers/ajaxMock.js", "ui/map"], function($__export) {
  "use strict";
  var $,
      LOCATIONS,
      MARKERS,
      ROUTES,
      devices,
      errors,
      GoogleProvider,
      ajaxMock,
      prepareTestingGoogleProvider,
      INFO_BOX_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      LOCATIONS = $__m.LOCATIONS;
      MARKERS = $__m.MARKERS;
      ROUTES = $__m.ROUTES;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      GoogleProvider = $__m.default;
    }, function($__m) {
      ajaxMock = $__m.default;
    }, function($__m) {}],
    execute: function() {
      prepareTestingGoogleProvider = function() {
        window.geocodedLocation = new google.maps.LatLng(-1.12345, -1.12345);
        window.geocodedWithErrorLocation = new google.maps.LatLng();
        google.markerRemoved = false;
        google.routeRemoved = false;
        google.assignedCenter = null;
        google.markerInstance = 0;
        google.overlayInstance = 0;
        google.routeInstance = 0;
        google.infoWindowOpened = 0;
        google.geocodeCalled = 0;
        google.boundsFittedCount = 0;
        google.assignedCenterCount = 0;
        google.statusCallback = null;
      };
      INFO_BOX_CLASS = 'gm-style-iw';
      QUnit.module('google provider', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl';
          GoogleProvider.remapConstant(fakeURL);
          GoogleProvider.prototype._geocodedLocations = {};
          ajaxMock.setup({
            url: fakeURL,
            callback: function() {
              $.getScript('../../testing/helpers/forMap/googleMock.js').done(function() {
                prepareTestingGoogleProvider();
                if (window._googleScriptReady) {
                  window._googleScriptReady();
                }
              });
            }
          });
          if (window.google) {
            prepareTestingGoogleProvider();
          }
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('map initialize with loaded map', function(assert) {
        var done = assert.async();
        $.getScript('../../testing/helpers/forMap/googleMock.js').done(function() {
          window.google.maps.customFlag = true;
          setTimeout(function() {
            $('#map').dxMap({
              provider: 'google',
              onReady: $.proxy(function(e) {
                assert.ok(window.google.maps.customFlag, 'map loaded without getting script');
                done();
              }, this)
            });
          });
        });
      });
      QUnit.test('map initialize without loaded map', function(assert) {
        var done = assert.async();
        if (window.google) {
          delete window.google.maps;
        }
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        $('<div>').appendTo($('#map')).dxMap({
          provider: 'google',
          onReady: $.proxy(function(e) {
            assert.ok(window.google.maps, 'map loaded');
            d1.resolve();
          }, this)
        });
        $('<div>').appendTo($('#map')).dxMap({
          provider: 'google',
          onReady: $.proxy(function(e) {
            assert.ok(window.google.maps, 'map loaded');
            d2.resolve();
          }, this)
        });
        $.when(d1, d2).done(function() {
          done();
        });
      });
      QUnit.test('map ready action', function(assert) {
        var done = assert.async();
        $('#map').dxMap({
          provider: 'google',
          onReady: function(e) {
            assert.ok(true, 'map ready');
            assert.equal(window.google.optionsSpecified, true, 'map options specified');
            assert.equal(window.google.mapInitialized, true, 'map initialized');
            assert.equal(window.google.idleHandlerRemoved, true, 'idle handler removed');
            assert.ok(e.originalMap instanceof google.maps.Map, 'map instance specified');
            done();
          }
        });
      });
      QUnit.test('initialize map with a default center', function(assert) {
        var done = assert.async();
        $('#map').dxMap({
          provider: 'google',
          onReady: function(e) {
            var map = e.component._provider._map;
            var centerLatLng = map.get('options').center;
            assert.deepEqual({
              lat: centerLatLng.lat(),
              lng: centerLatLng.lng()
            }, {
              lat: 0,
              lng: 0
            }, 'center option of google map');
            done();
          }
        });
      });
      QUnit.test('initialize map with a custom center', function(assert) {
        var done = assert.async();
        $('#map').dxMap({
          provider: 'google',
          center: 'Antarctica',
          onReady: function(e) {
            var map = e.component._provider._map;
            var centerLatLng = map.get('options').center;
            assert.deepEqual({
              lat: centerLatLng.lat(),
              lng: centerLatLng.lng()
            }, {
              lat: -1.12345,
              lng: -1.12345
            }, 'center option of google map');
            done();
          }
        });
      });
      QUnit.test('dimensions: width', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var assignedCenterCount;
        var $map = $('#map').dxMap({
          provider: 'google',
          width: 300,
          onReady: function() {
            assignedCenterCount = window.google.assignedCenterCount;
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.mapResized, true, 'map resized');
            assert.equal(window.google.assignedCenterCount, assignedCenterCount + 1, 'center fitted');
            done();
          });
          map.option('width', 400);
        });
      });
      QUnit.test('dimensions: height', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var assignedCenterCount;
        var $map = $('#map').dxMap({
          provider: 'google',
          height: 300,
          onReady: function() {
            assignedCenterCount = window.google.assignedCenterCount;
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.mapResized, true, 'map resized');
            assert.equal(window.google.assignedCenterCount, assignedCenterCount + 1, 'center fitted');
            done();
          });
          map.option('height', 400);
        });
      });
      QUnit.test('type', function(assert) {
        var done = assert.async();
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          type: 'hybrid',
          onReady: function() {
            assert.equal(window.google.assignedMapTypeId, google.maps.MapTypeId.HYBRID, 'type specified correctly');
            d1.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d1.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.assignedMapTypeId, google.maps.MapTypeId.ROADMAP, 'type changed');
            d2.resolve();
          });
          map.option('type', 'roadmap');
        });
        d2.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.assignedMapTypeId, google.maps.MapTypeId.SATELLITE, 'type changed');
            done();
          });
          map.option('type', 'satellite');
        });
      });
      QUnit.test('center', function(assert) {
        var done = assert.async();
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        var d3 = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          center: LOCATIONS[0],
          onReady: function() {
            assert.equal(window.google.geocodeCalled, 1, 'geocode used');
            assert.deepEqual(window.google.assignedCenter, window.geocodedLocation, 'center specified correctly');
            d1.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d1.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.geocodeCalled, 1, 'geocode not used');
            assert.deepEqual(window.google.assignedCenter, new google.maps.LatLng(LOCATIONS[1].lat, LOCATIONS[1].lng), 'center changed');
            d2.resolve();
          });
          map.option('center', LOCATIONS[1]);
        });
        d2.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.geocodeCalled, 1, 'geocode not used');
            assert.deepEqual(window.google.assignedCenter, new google.maps.LatLng(LOCATIONS[2][0], LOCATIONS[2][1]), 'center changed');
            d3.resolve();
          });
          map.option('center', LOCATIONS[2]);
        });
        d3.done(function() {
          map.option('onUpdated', function() {
            var coords = LOCATIONS[3].split(',');
            assert.equal(window.google.geocodeCalled, 1, 'geocode not used');
            assert.deepEqual(window.google.assignedCenter, new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1])), 'center changed');
            done();
          });
          map.option('center', LOCATIONS[3]);
        });
      });
      QUnit.test('center with geocode error', function(assert) {
        var done = assert.async();
        var d1 = $.Deferred();
        var errorStub = sinon.stub(errors, 'log');
        var $map = $('#map').dxMap({
          provider: 'google',
          center: '',
          onReady: function() {
            assert.equal(window.google.geocodeCalled, 1, 'geocode used');
            assert.deepEqual(window.google.assignedCenter, window.geocodedWithErrorLocation, 'center specified correctly');
            assert.deepEqual(errorStub.firstCall.args, ['W1006', 1]);
            d1.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d1.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.geocodeCalled, 2, 'geocode used');
            assert.deepEqual(window.google.assignedCenter, window.geocodedLocation, 'center changed');
            errorStub.restore();
            done();
          });
          map.option('center', LOCATIONS[0]);
        });
      });
      QUnit.test('\'center\' option is null', function(assert) {
        var done = assert.async();
        var d1 = $.Deferred();
        var map = $('#map').dxMap({
          provider: 'google',
          center: null,
          onReady: function() {
            assert.equal(window.google.geocodeCalled, 0, 'geocode not used');
            assert.deepEqual(window.google.assignedCenter, window.geocodedWithErrorLocation, 'center changed');
            d1.resolve();
          }
        }).dxMap('instance');
        d1.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.geocodeCalled, 1, 'geocode used');
            assert.deepEqual(window.google.assignedCenter, window.geocodedLocation, 'center changed');
            done();
          });
          map.option('center', LOCATIONS[0]);
        });
      });
      QUnit.test('geocode should be called once for equal locations', function(assert) {
        var done = assert.async();
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          center: LOCATIONS[0],
          onReady: function() {
            assert.equal(window.google.geocodeCalled, 1, 'geocode used');
            d1.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d1.done(function() {
          map.option('onUpdated', function() {
            d2.resolve();
          });
          map.option('center', LOCATIONS[1]);
        });
        d2.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.geocodeCalled, 1, 'geocode not used');
            done();
          });
          map.option('center', LOCATIONS[0]);
        });
      });
      QUnit.test('center changing from map', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          center: LOCATIONS[0],
          onReady: function() {
            window.google.centerValue = [5, 10];
            window.google.boundsChangedCallback();
            assert.deepEqual(map.option('center'), {
              lat: 5,
              lng: 10
            }, 'center changed correctly');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onReady', function() {
            assert.equal(window.google.boundsChangedHandlerRemoved, true, 'bounds handler removed');
            done();
          });
          map.repaint();
        });
      });
      QUnit.test('zoom', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          zoom: 4,
          onReady: function() {
            assert.equal(window.google.options.zoom, 4, 'zoom specified correctly');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.assignedZoom, 14, 'zoom changed');
            done();
          });
          map.option('zoom', 14);
        });
      });
      QUnit.test('zoom changing from map', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          zoom: 4,
          onReady: function() {
            window.google.zoomValue = 5;
            window.google.boundsChangedCallback();
            assert.equal(map.option('zoom'), 5, 'zoom changed correctly');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onReady', function() {
            assert.equal(window.google.boundsChangedHandlerRemoved, true, 'bounds handler removed');
            done();
          });
          map.repaint();
        });
      });
      QUnit.test('bounds', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          bounds: {
            northEast: LOCATIONS[0],
            southWest: LOCATIONS[1]
          },
          onReady: function() {
            assert.equal(window.google.geocodeCalled, 1, 'geocode used');
            assert.deepEqual(window.google.fittedBounds._points, [window.geocodedLocation, new google.maps.LatLng(LOCATIONS[1].lat, LOCATIONS[1].lng)], 'bounds specified correctly');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.geocodeCalled, 2, 'geocode used');
            assert.deepEqual(window.google.fittedBounds._points, [window.geocodedLocation, new google.maps.LatLng(LOCATIONS[2][0], LOCATIONS[2][1])], 'bounds changed');
            done();
          });
          map.option('bounds', {
            northEast: LOCATIONS[0] + ', USA',
            southWest: LOCATIONS[2]
          });
        });
      });
      QUnit.test('bounds option should take precedence over center if bounds set', function(assert) {
        var done = assert.async();
        $('#map').dxMap({
          provider: 'google',
          bounds: {
            northEast: LOCATIONS[0],
            southWest: LOCATIONS[1]
          },
          center: LOCATIONS[0],
          onReady: function() {
            assert.notDeepEqual(window.google.assignedCenter, window.geocodedLocation, 'center specified correctly');
            done();
          }
        });
      });
      QUnit.test('bounds option should not take precedence over center if bounds not set', function(assert) {
        var done = assert.async();
        $('#map').dxMap({
          provider: 'google',
          center: LOCATIONS[0],
          onReady: function() {
            assert.deepEqual(window.google.assignedCenter, window.geocodedLocation, 'center specified correctly');
            done();
          }
        });
      });
      QUnit.test('bounds changing from map', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          zoom: 4,
          onReady: function() {
            window.google.boundsValue = {
              getNorthEast: function() {
                return new google.maps.LatLng(10, 20);
              },
              getSouthWest: function() {
                return new google.maps.LatLng(40, 50);
              }
            };
            window.google.boundsChangedCallback();
            assert.deepEqual(map.option('bounds'), {
              northEast: {
                lat: 10,
                lng: 20
              },
              southWest: {
                lat: 40,
                lng: 50
              }
            }, 'bounds changed correctly');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onReady', function() {
            assert.equal(window.google.boundsChangedHandlerRemoved, true, 'bounds handler removed');
            done();
          });
          map.repaint();
        });
      });
      QUnit.test('controls', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          controls: true,
          onReady: function() {
            assert.equal(window.google.options.disableDefaultUI, false, 'controls specified correctly');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.assignedOptions.disableDefaultUI, true, 'controls specified correctly');
            done();
          });
          map.option('controls', false);
        });
      });
      QUnit.test('markers', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          onReady: function() {
            assert.equal(window.google.markerOptionsSpecified, true, 'marker options specified');
            assert.equal(window.google.markerOptions.mapSpecified, true, 'map specified correctly');
            assert.deepEqual(window.google.markerOptions.position, new google.maps.LatLng(MARKERS[0].location.lat, MARKERS[0].location.lng), 'location specified correctly');
            assert.equal(window.google.infoWindowOpened, 1, 'tooltip is opened');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.markerInstance, 3, 'markers changed');
            assert.equal(window.google.markerRemoved, true, 'previous marker removed');
            assert.equal(window.google.clickHandlerRemoved, true, 'previous marker handler removed');
            done();
          });
          map.option('markers', [MARKERS[1], MARKERS[2]]);
        });
      });
      QUnit.test('marker`s tooltip options', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          onReady: function() {
            assert.equal(window.google.infoWindowOptionsSpecified, true, 'tooltip options specified');
            assert.equal(window.google.infoWindowOptions.content, 'A', 'tooltip content specified');
            assert.equal(window.google.openInfoWindowOptions.mapSpecified, true, 'tooltip opened with specified map');
            assert.equal(window.google.openInfoWindowOptions.markerSpecified, true, 'tooltip opened with specified marker');
            assert.equal(window.google.infoWindowOpened, 1, 'tooltip opened');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.infoWindowOptions.content, 'B', 'tooltip content specified');
            assert.equal(window.google.infoWindowOpened, 1, 'tooltip is not opened');
            done();
          });
          map.option('markers', [MARKERS[1]]);
        });
      });
      QUnit.test('marker integration', function(assert) {
        var done = assert.async();
        var clickFired = 0;
        var marker = {
          tooltip: 'A',
          location: [40.537102, -73.990318],
          onClick: function(e) {
            assert.deepEqual(e.location, {
              lat: 40.537102,
              lng: -73.990318
            }, 'markers location set');
            clickFired++;
          }
        };
        $('#map').dxMap({
          provider: 'google',
          markers: [marker],
          onReady: function() {
            assert.equal(window.google.infoWindowOptionsSpecified, true, 'tooltip options specified');
            assert.equal(window.google.infoWindowOptions.content, 'A', 'tooltip content specified');
            window.google.clickActionCallback();
            assert.equal(clickFired, 1, 'click action fired');
            assert.equal(window.google.infoWindowOpened, 1, 'tooltip opened');
            assert.equal(window.google.openInfoWindowOptions.mapSpecified, true, 'tooltip opened with specified map');
            assert.equal(window.google.openInfoWindowOptions.markerSpecified, true, 'tooltip opened with specified marker');
            done();
          }
        });
      });
      QUnit.test('marker icon', function(assert) {
        var done = assert.async();
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        var markerUrl1 = 'http://example.com/1.png';
        var markerUrl2 = 'http://example.com/2.png';
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          markerIconSrc: markerUrl1,
          onReady: function() {
            assert.equal(window.google.markerOptions.icon, markerUrl1, 'marker options contains custom icon url');
            d1.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d1.done(function() {
          map.addMarker([$.extend({iconSrc: markerUrl2}, MARKERS[1]), MARKERS[2]]).done(function(instances) {
            assert.equal(instances[0].getIcon(), markerUrl2, 'marker instance contains custom icon url');
            assert.equal(instances[1].getIcon(), markerUrl1, 'marker instance contains custom icon url');
            d2.resolve();
          });
        });
        d2.done(function() {
          map.option('markerIconSrc', markerUrl2);
          map.addMarker(MARKERS[3]).done(function(instance) {
            assert.equal(instance.getIcon(), markerUrl2, 'marker instance contains custom icon url');
            done();
          });
        });
      });
      QUnit.test('marker html', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[5]],
          onReady: function() {
            assert.equal(window.google.markerInstance, 0, 'markers not present');
            assert.equal(window.google.overlayInstance, 1, 'overlay created');
            var overlay = $(window.google.overlayMouseTarget).children();
            assert.equal(overlay.length, 1, 'overlay created');
            assert.deepEqual(window.google.overlayProjectedLocation, new google.maps.LatLng(MARKERS[5].location.lat, MARKERS[5].location.lng), 'correct location projected');
            assert.equal(overlay.css('top'), '200px', 'overlay created');
            assert.equal(overlay.css('left'), '100px', 'overlay created');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.removeMarker(MARKERS[5]).done(function() {
            assert.equal(window.google.overlayRemoved, true, 'marker removed');
            done();
          });
        });
      });
      QUnit.test('marker html offset', function(assert) {
        var done = assert.async();
        $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[6]],
          onReady: function() {
            var overlay = $(window.google.overlayMouseTarget).children();
            assert.equal(overlay.css('top'), '215px', 'offset applied');
            assert.equal(overlay.css('left'), '125px', 'offset applied');
            done();
          }
        });
      });
      QUnit.test('marker html interaction', function(assert) {
        assert.expect(3);
        var done = assert.async();
        var d = $.Deferred();
        var marker = $.extend({onClick: function() {
            assert.ok(true, 'click handled');
          }}, MARKERS[5]);
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [marker],
          onReady: function() {
            window.google.domClickActionCallback({preventDefault: function() {
                assert.ok(true, 'default prevented');
              }});
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.removeMarker(marker).done(function() {
            assert.equal(window.google.domClickHandlerRemoved, true, 'click listener removed');
            done();
          });
        });
      });
      QUnit.test('add marker', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.addMarker(MARKERS[1]).done(function(instance) {
            assert.ok(!window.google.markerRemoved, 'previous marker does not removed');
            assert.deepEqual(window.google.markerOptions.position, new google.maps.LatLng(MARKERS[0].location.lat, MARKERS[0].location.lng), 'marker created with correct location');
            assert.ok(instance instanceof google.maps.Marker, 'marker instance returned');
            done();
          });
        });
      });
      QUnit.test('add marker should extend bounds', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          onReady: function() {
            assert.equal(window.google.LatLngBoundsPoints.length, 1, 'extended by 1 location');
            assert.deepEqual(window.google.LatLngBoundsPoints[0], new google.maps.LatLng(MARKERS[0].location.lat, MARKERS[0].location.lng), 'bound extended correctly');
            assert.deepEqual(window.google.LatLngBoundsPoints, google.fittedBounds._points, 'map fitted correctly');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.LatLngBoundsPoints.length, 2, 'extended by 2 locations after changing markers');
            done();
          });
          map.addMarker(MARKERS[1]);
        });
      });
      QUnit.test('add marker should extend visible bounds if autoAdjust = true', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          autoAdjust: true,
          onReady: function() {
            assert.equal(window.google.boundsFittedCount, 1, 'bounds fitted');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.boundsFittedCount, 2, 'bounds fitted again');
            done();
          });
          map.addMarker(MARKERS[1]);
        });
      });
      QUnit.test('add marker should not extend visible bounds if autoAdjust = false', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          autoAdjust: false,
          onReady: function() {
            assert.equal(window.google.boundsFittedCount, 0, 'bounds not fitted');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.boundsFittedCount, 0, 'bounds not fitted again');
            done();
          });
          map.addMarker(MARKERS[1]);
        });
      });
      QUnit.test('add markers', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.addMarker([MARKERS[0], MARKERS[1]]).done(function(instances) {
            assert.ok(instances[0] instanceof google.maps.Marker, 'marker instance returned');
            assert.ok(instances[1] instanceof google.maps.Marker, 'marker instance returned');
            done();
          });
        });
      });
      QUnit.test('remove marker', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.removeMarker(0).done(function() {
            assert.equal(window.google.markerRemoved, true, 'marker removed');
            assert.equal(window.google.clickHandlerRemoved, true, 'previous marker handler removed');
            done();
          });
        });
      });
      QUnit.test('markerAdded', function(assert) {
        var done = assert.async();
        var markerAddedFired = 0;
        $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          onMarkerAdded: function(args) {
            assert.equal(args.options, MARKERS[0], 'correct options passed as parameter');
            assert.ok(args.originalMarker instanceof google.maps.Marker, 'marker instance returned');
            markerAddedFired++;
          },
          onReady: function() {
            assert.equal(markerAddedFired, 1, 'markerAdded fired');
            done();
          }
        });
      });
      QUnit.test('markerRemoved', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var markerRemovedFired = 0;
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          onMarkerRemoved: function(args) {
            assert.equal(args.options, MARKERS[0], 'correct options passed as parameter');
            markerRemovedFired++;
          },
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(markerRemovedFired, 1, 'markerRemoved fired');
            done();
          });
          map.option('markers', []);
        });
      });
      QUnit.test('autoAdjust', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          autoAdjust: false,
          onReady: function() {
            assert.equal(window.google.boundsFittedCount, 0, 'bounds not fitted');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.boundsFittedCount, 1, 'bounds fitted');
            done();
          });
          map.option('autoAdjust', true);
        });
      });
      QUnit.test('autoAdjust should not change zoom if marker is fitted', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          autoAdjust: false,
          zoom: 5,
          onReady: function() {
            window.google.zoomValue = 5;
            window.google.fitBoundsCallback = function() {
              window.google.zoomValue = 10;
              window.google.maps.event.trigger(null, 'bounds_changed');
            };
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.boundsFittedCount, 1, 'bounds fitted');
            assert.equal(map.option('zoom'), 5, 'zoom not changed');
            assert.equal(window.google.assignedZoom, 5, 'zoom returned back');
            window.google.fitBoundsCallback = null;
            done();
          });
          map.option('autoAdjust', true);
        });
      });
      QUnit.test('autoAdjust should change zoom if marker is not fitted', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          autoAdjust: false,
          zoom: 10,
          onReady: function() {
            window.google.zoomValue = 10;
            window.google.fitBoundsCallback = function() {
              window.google.zoomValue = 5;
              window.google.maps.event.trigger(null, 'bounds_changed');
            };
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.boundsFittedCount, 1, 'bounds fitted');
            assert.equal(map.option('zoom'), 5, 'zoom changed');
            window.google.fitBoundsCallback = null;
            done();
          });
          map.option('autoAdjust', true);
        });
      });
      QUnit.test('autoAdjust should not prevent zoom changing', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          markers: [MARKERS[0]],
          autoAdjust: false,
          zoom: 5,
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            window.google.zoomValue = 10;
            window.google.maps.event.trigger(null, 'bounds_changed');
            assert.equal(map.option('zoom'), 10, 'zoom change prevention is removed');
            done();
          });
          map.option('autoAdjust', true);
        });
      });
      QUnit.test('routes', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var polOpts = {
          strokeWeight: ROUTES[0].weight,
          strokeOpacity: ROUTES[0].opacity,
          strokeColor: '#0000ff'
        };
        var $map = $('#map').dxMap({
          provider: 'google',
          routes: [ROUTES[0]],
          onReady: function() {
            assert.equal(window.google.directionDrawnByDirectionService, true, 'direction drawn');
            assert.equal(window.google.directionTravelMode, google.maps.TravelMode.WALKING, 'direction mode specified correctly');
            assert.equal(window.google.directionsRendererOptionsSpecified, true, 'direction renderer options specified');
            assert.equal(window.google.directionsRendererOptions.mapSpecified, true, 'map specified correctly');
            assert.equal(window.google.directionsRendererOptions.directionsSpecified, true, 'directions specified correctly');
            assert.deepEqual(window.google.directionsRendererOptions.polylineOptions, polOpts, 'line options specified correctly');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.routeInstance, 2, 'routes changed');
            done();
          });
          map.addRoute(ROUTES[1]);
        });
      });
      QUnit.test('add route', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          routes: [ROUTES[0]],
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.addRoute(ROUTES[1]).done(function(instance) {
            assert.ok(!window.google.routeRemoved, 'previous route does not removed');
            assert.ok(instance instanceof google.maps.DirectionsRenderer, 'route instance returned');
            map.removeRoute(1).done(function() {
              assert.equal(window.google.routeRemoved, true, 'route removed');
              done();
            });
          });
        });
      });
      QUnit.test('add route with incorrect response', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          routes: [ROUTES[0]],
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        var errorStub = sinon.stub(errors, 'log');
        d.done(function() {
          google.statusCallback = function() {
            return google.maps.DirectionsStatus.OVER_QUERY_LIMIT;
          };
          map.addRoute(ROUTES[1]).done(function(instance) {
            assert.ok(errorStub.withArgs('W1006').calledOnce, 'warning is fired');
            assert.ok(!window.google.routeRemoved, 'previous route does not removed');
            assert.ok(instance instanceof google.maps.DirectionsRenderer, 'route instance returned');
            errorStub.restore();
            done();
          });
        });
      });
      QUnit.test('add routes', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.addRoute([ROUTES[0], ROUTES[1]]).done(function(instances) {
            assert.ok(instances[0] instanceof google.maps.DirectionsRenderer, 'route instance returned');
            assert.ok(instances[1] instanceof google.maps.DirectionsRenderer, 'route instance returned');
            done();
          });
        });
      });
      QUnit.test('add route should extend bounds', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          routes: [ROUTES[0]],
          onReady: function() {
            assert.equal(window.google.LatLngBoundsPoints.length, 2, 'extended by 2 location');
            assert.deepEqual(window.google.LatLngBoundsPoints[0], new google.maps.LatLng(ROUTES[0].locations[0][0], ROUTES[0].locations[0][1]), 'bound extended correctly');
            assert.deepEqual(window.google.LatLngBoundsPoints[1], new google.maps.LatLng(ROUTES[0].locations[2][0], ROUTES[0].locations[2][1]), 'bound extended correctly');
            assert.deepEqual(window.google.LatLngBoundsPoints, google.fittedBounds._points, 'map fitted correctly');
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(window.google.LatLngBoundsPoints.length, 4, 'extended by 2 locations after changing markers');
            done();
          });
          map.addRoute(ROUTES[1]);
        });
      });
      QUnit.test('routeAdded', function(assert) {
        var done = assert.async();
        var routeAddedFired = 0;
        $('#map').dxMap({
          provider: 'google',
          routes: [ROUTES[0]],
          onRouteAdded: function(args) {
            assert.equal(args.options, ROUTES[0], 'correct options passed as parameter');
            assert.ok(args.originalRoute instanceof google.maps.DirectionsRenderer, 'route instance returned');
            routeAddedFired++;
          },
          onReady: function() {
            assert.equal(routeAddedFired, 1, 'routeAdded fired');
            done();
          }
        });
      });
      QUnit.test('routeRemoved', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var routeRemovedFired = 0;
        var $map = $('#map').dxMap({
          provider: 'google',
          routes: [ROUTES[0]],
          onRouteRemoved: function(args) {
            assert.equal(args.options, ROUTES[0], 'correct options passed as parameter');
            routeRemovedFired++;
          },
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onUpdated', function() {
            assert.equal(routeRemovedFired, 1, 'routeRemoved fired');
            done();
          });
          map.option('routes', []);
        });
      });
      QUnit.test('click', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var clicked = 0;
        var eventFired = 0;
        var $map = $('#map').dxMap({
          provider: 'google',
          width: 400,
          height: 500,
          onClick: function(e) {
            assert.deepEqual(e.location, {
              lat: 2,
              lng: 10
            }, 'correct location passed');
            clicked++;
          },
          onReady: function() {
            d.resolve();
          }
        });
        $map.dxMap('instance').on('click', function() {
          eventFired++;
        });
        d.done(function() {
          window.google.clickActionCallback(new google.maps.MouseEvent(new google.maps.LatLng(2, 10)));
          assert.equal(clicked, 1);
          assert.equal(eventFired, 1);
          done();
        });
      });
      QUnit.test('changing provider should reset bounds', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          bounds: {
            northEast: '1, 1',
            southWest: '-1, -1'
          },
          onReady: function() {
            d.resolve();
          }
        });
        var map = $map.dxMap('instance');
        d.done(function() {
          map.option('onReady', function() {
            assert.deepEqual(map.option('bounds'), {
              northEast: null,
              southWest: null
            }, 'bounds cleared');
            done();
          });
          map.option('provider', 'google');
        });
      });
      QUnit.test('StopPropagation is called on the pointer down event', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var isPropagationStopped;
        var $map = $('#map').dxMap({
          provider: 'google',
          width: 400,
          height: 500,
          onReady: function() {
            d.resolve();
          }
        });
        $map.on('dxpointerdown', function(e) {
          isPropagationStopped = e.isPropagationStopped();
        });
        d.done(function() {
          $map.children().trigger('dxpointerdown');
          assert.ok(isPropagationStopped);
          done();
        });
      });
      QUnit.test('Event propagation isn\'t stopped for the infoBox content', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var $map = $('#map').dxMap({
          provider: 'google',
          width: 400,
          height: 500,
          onReady: function() {
            d.resolve();
          }
        });
        d.done(function() {
          var pointerDownStub = sinon.stub();
          $map.on('dxpointerdown', pointerDownStub);
          var $mapContainer = $map.children();
          var $infoBoxContent = $('<div>');
          $('<div>').addClass(INFO_BOX_CLASS).append($infoBoxContent).appendTo($mapContainer);
          $infoBoxContent.trigger('dxpointerdown');
          $mapContainer.trigger('dxpointerdown');
          assert.ok(pointerDownStub.calledTwice, 'cancelEvent handler calls twice');
          var isContentEventStopped = pointerDownStub.getCall(0).args[0].isPropagationStopped();
          var isMapEventStopped = pointerDownStub.getCall(1).args[0].isPropagationStopped();
          assert.notOk(isContentEventStopped, 'Event dispatched on the info box content element isn\'t canceled');
          assert.ok(isMapEventStopped, 'Event dispatched on the map content element is canceled');
          done();
        });
      });
      QUnit.test('StopPropagation is not called when gestureHandling of map is cooperative', function(assert) {
        var done = assert.async();
        var d = $.Deferred();
        var real = devices.real;
        var isPropagationStopped;
        devices.real = function() {
          return {deviceType: 'tablet'};
        };
        var $map = $('#map').dxMap({
          provider: 'google',
          width: 400,
          height: 500,
          onReady: function(e) {
            e.originalMap.setOptions({gestureHandling: 'cooperative'});
            d.resolve();
          }
        });
        $map.on('dxpointerdown', function(e) {
          isPropagationStopped = e.isPropagationStopped();
        });
        d.done(function() {
          $map.children().trigger('dxpointerdown');
          assert.ok(!isPropagationStopped);
          devices.real = real;
          done();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./utils.js","core/devices","ui/widget/ui.errors","ui/map/provider.dynamic.google","../../../helpers/ajaxMock.js","ui/map"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./utils.js"), require("core/devices"), require("ui/widget/ui.errors"), require("ui/map/provider.dynamic.google"), require("../../../helpers/ajaxMock.js"), require("ui/map"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=googleTests.js.map