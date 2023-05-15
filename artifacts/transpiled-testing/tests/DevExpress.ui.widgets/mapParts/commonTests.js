!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/mapParts/commonTests.js"], ["jquery","./utils.js","ui/map","ui/map/provider.google_static","../../../helpers/ajaxMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/mapParts/commonTests.js", ["jquery", "./utils.js", "ui/map", "ui/map/provider.google_static", "../../../helpers/ajaxMock.js"], function($__export) {
  "use strict";
  var $,
      testing,
      Map,
      GoogleStaticProvider,
      ajaxMock,
      MARKERS,
      ROUTES,
      MAP_CLASS,
      MAP_CONTAINER_CLASS,
      MAP_SHIELD_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      testing = $__m.default;
    }, function($__m) {
      Map = $__m.default;
    }, function($__m) {
      GoogleStaticProvider = $__m.default;
    }, function($__m) {
      ajaxMock = $__m.default;
    }],
    execute: function() {
      MARKERS = testing.MARKERS;
      ROUTES = testing.ROUTES;
      MAP_CLASS = 'dx-map';
      MAP_CONTAINER_CLASS = 'dx-map-container';
      MAP_SHIELD_CLASS = 'dx-map-shield';
      QUnit.module('rendering', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl?';
          GoogleStaticProvider.remapConstant(fakeURL);
          ajaxMock.setup({
            url: fakeURL,
            responseText: ''
          });
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('widget should be rendered', function(assert) {
        var $map = $('#map').dxMap({provider: 'googleStatic'});
        assert.ok($map.hasClass(MAP_CLASS), 'widget class added');
      });
      QUnit.test('widget should be rendered with correct dimensions', function(assert) {
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          width: 100,
          height: 150
        });
        assert.ok($map.hasClass(MAP_CLASS), 'widget class added');
        assert.equal($map.width(), 100, 'width set correctly');
        assert.equal($map.height(), 150, 'height set correctly');
      });
      QUnit.test('map container should be rendered', function(assert) {
        var $map = $('#map').dxMap({provider: 'googleStatic'});
        assert.ok($map.children('.' + MAP_CONTAINER_CLASS), 'map container rendered');
      });
      QUnit.module('option change', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl?';
          GoogleStaticProvider.remapConstant(fakeURL);
          ajaxMock.setup({
            url: fakeURL,
            responseText: ''
          });
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('disabled', function(assert) {
        var $map = $('#map').dxMap({provider: 'googleStatic'});
        var map = $map.dxMap('instance');
        map.option('disabled', true);
        assert.equal($map.find('.' + MAP_SHIELD_CLASS).length, 1);
        map.option('disabled', false);
        assert.equal($map.find('.' + MAP_SHIELD_CLASS).length, 0);
      });
      QUnit.module('markers', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl?';
          GoogleStaticProvider.remapConstant(fakeURL);
          ajaxMock.setup({
            url: fakeURL,
            responseText: ''
          });
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('markers option should respond on add marker as object', function(assert) {
        assert.expect(3);
        var $map = $('#map').dxMap({provider: 'googleStatic'});
        var map = $map.dxMap('instance');
        var done = assert.async();
        map.addMarker(MARKERS[0]).done(function() {
          assert.ok(true, 'action resolved');
          assert.equal(this, map, 'correct context specified');
          done();
        });
        assert.deepEqual(map.option('markers'), [MARKERS[0]], 'marker added');
      });
      QUnit.test('markers option should respond on add marker as array', function(assert) {
        var $map = $('#map').dxMap({provider: 'googleStatic'});
        var map = $map.dxMap('instance');
        map.addMarker([MARKERS[0], MARKERS[2]]);
        assert.deepEqual(map.option('markers'), [MARKERS[0], MARKERS[2]], 'markers added');
      });
      QUnit.test('markers option should respond on remove marker as object', function(assert) {
        assert.expect(3);
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          markers: [MARKERS[0]]
        });
        var map = $map.dxMap('instance');
        var done = assert.async();
        map.removeMarker(MARKERS[0]).done(function() {
          assert.ok(true, 'action resolved');
          assert.equal(this, map, 'correct context specified');
          done();
        });
        assert.deepEqual(map.option('markers'), [], 'marker removed');
      });
      QUnit.test('markers option should respond on remove marker as array', function(assert) {
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          markers: [MARKERS[0], MARKERS[2]]
        });
        var map = $map.dxMap('instance');
        map.removeMarker([MARKERS[0], MARKERS[2]]);
        assert.deepEqual(map.option('markers'), [], 'markers removed');
      });
      QUnit.test('markers option should respond on remove marker as number', function(assert) {
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          markers: [MARKERS[0], MARKERS[2]]
        });
        var map = $map.dxMap('instance');
        map.removeMarker(1);
        assert.deepEqual(map.option('markers'), [MARKERS[0]], 'marker removed');
      });
      QUnit.test('markers option should not accept null at initialization', function(assert) {
        assert.throws(function() {
          $('#map').dxMap({
            provider: 'googleStatic',
            markers: null
          });
        }, /markers/i, 'not array exception was thrown');
      });
      QUnit.test('markers option should not accept null at runtime', function(assert) {
        assert.throws(function() {
          $('#map').dxMap({provider: 'googleStatic'}).dxMap('option', 'markers', null);
        }, /markers/i, 'not array exception was thrown');
      });
      QUnit.module('saving previous markers', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl?';
          GoogleStaticProvider.remapConstant(fakeURL);
          ajaxMock.setup({
            url: fakeURL,
            responseText: ''
          });
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('pushing into markers option should render new marker', function(assert) {
        var addedMarkers = 0;
        var removedMarkers = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            onMarkerAdded: function() {
              addedMarkers++;
            },
            onMarkerRemoved: function() {
              removedMarkers++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              resolve(map);
            });
            var markers = map.option('markers');
            markers.push(MARKERS[0]);
            map.option('markers', markers);
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.equal(addedMarkers, 1 + 2, 'correct number of markers added');
              assert.equal(removedMarkers, 1, 'correct number of markers removed');
              resolve();
            });
            var markers = map.option('markers');
            markers.push(MARKERS[1]);
            map.option('markers', markers);
          });
        });
      });
      QUnit.test('adding same marker after addMarker method call should not render marker', function(assert) {
        var addedMarkers = 0;
        var removedMarkers = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            onMarkerAdded: function() {
              addedMarkers++;
            },
            onMarkerRemoved: function() {
              removedMarkers++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              resolve(map);
            });
            map.addMarker(MARKERS[0]);
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.equal(addedMarkers, 1 + 1, 'correct number of markers added');
              assert.equal(removedMarkers, 1, 'correct number of markers removed');
              resolve();
            });
            map.option('markers', [MARKERS[0]]);
          });
        });
      });
      QUnit.test('adding same marker after removeMarker should render marker', function(assert) {
        var addedMarkers = 0;
        var removedMarkers = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            markers: [MARKERS[0]],
            onMarkerAdded: function() {
              addedMarkers++;
            },
            onMarkerRemoved: function() {
              removedMarkers++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              resolve(map);
            });
            map.removeMarker(MARKERS[0]);
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.equal(addedMarkers, 1 + 1, 'correct number of markers added');
              assert.equal(removedMarkers, 1, 'correct number of markers removed');
              resolve();
            });
            map.option('markers', [MARKERS[0]]);
          });
        });
      });
      QUnit.test('changing existing marker should rerender marker', function(assert) {
        var addedMarkers = 0;
        var removedMarkers = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            markers: [MARKERS[0]],
            onMarkerAdded: function() {
              addedMarkers++;
            },
            onMarkerRemoved: function() {
              removedMarkers++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.equal(addedMarkers, 1 + 1, 'correct number of markers added');
              assert.equal(removedMarkers, 1, 'correct number of markers removed');
              resolve();
            });
            map.option('markers', [MARKERS[0]]);
          });
        });
      });
      QUnit.module('async markers rendering', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl?';
          GoogleStaticProvider.remapConstant(fakeURL);
          ajaxMock.setup({
            url: fakeURL,
            responseText: ''
          });
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('addMarker method call should not render marker twice', function(assert) {
        var addedMarkers = 0;
        var done = assert.async();
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          onMarkerAdded: function() {
            addedMarkers++;
          }
        });
        var map = $map.dxMap('instance');
        map.addMarker(MARKERS[0]).done(function() {
          assert.equal(addedMarkers, 1, 'correct number of markers added');
          done();
        });
      });
      QUnit.test('markers option change should not render incorrect markers', function(assert) {
        var addedMarkers = 0;
        var done = assert.async();
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          onMarkerAdded: function() {
            addedMarkers++;
          },
          onReady: function() {
            map.option('onReady', function() {
              assert.equal(addedMarkers, 1, 'correct number of markers added');
              $map.remove();
              done();
            });
          }
        });
        var map = $map.dxMap('instance');
        var markers = [MARKERS[0]];
        map.option('markers', markers);
        markers.push(MARKERS[1]);
        map.option('markers', markers);
        map.option('markers', markers);
        map.option('markers', markers);
        map.option('markers', markers);
        map.option('markers', markers);
        map.option('markers', markers);
        map.option('markers', markers);
      });
      QUnit.module('routes', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl?';
          GoogleStaticProvider.remapConstant(fakeURL);
          ajaxMock.setup({
            url: fakeURL,
            responseText: ''
          });
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('routes option should respond on add route as object', function(assert) {
        assert.expect(3);
        var $map = $('#map').dxMap({provider: 'googleStatic'});
        var map = $map.dxMap('instance');
        var done = assert.async();
        map.addRoute(ROUTES[0]).done(function() {
          assert.ok(true, 'action resolved');
          assert.equal(this, map, 'correct context specified');
          done();
        });
        assert.deepEqual(map.option('routes'), [ROUTES[0]], 'route added');
      });
      QUnit.test('routes option should respond on add route as array', function(assert) {
        var $map = $('#map').dxMap({provider: 'googleStatic'});
        var map = $map.dxMap('instance');
        map.addRoute([ROUTES[0], ROUTES[2]]);
        assert.deepEqual(map.option('routes'), [ROUTES[0], ROUTES[2]], 'routes added');
      });
      QUnit.test('routes option should respond on remove route as object', function(assert) {
        assert.expect(3);
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          routes: [ROUTES[0]]
        });
        var map = $map.dxMap('instance');
        var done = assert.async();
        map.removeRoute(ROUTES[0]).done(function() {
          assert.ok(true, 'action resolved');
          assert.equal(this, map, 'correct context specified');
          done();
        });
        assert.deepEqual(map.option('routes'), [], 'route removed');
      });
      QUnit.test('routes option should respond on remove route as array', function(assert) {
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          routes: [ROUTES[0], ROUTES[2]]
        });
        var map = $map.dxMap('instance');
        map.removeRoute([ROUTES[0], ROUTES[2]]);
        assert.deepEqual(map.option('routes'), [], 'routes removed');
      });
      QUnit.test('routes option should respond on remove route as number', function(assert) {
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          routes: [ROUTES[0], ROUTES[2]]
        });
        var map = $map.dxMap('instance');
        map.removeRoute(1);
        assert.deepEqual(map.option('routes'), [ROUTES[0]], 'route removed');
      });
      QUnit.test('routes option should not accept null at initialization', function(assert) {
        assert.throws(function() {
          $('#map').dxMap({
            provider: 'googleStatic',
            routes: null
          });
        }, /routes/i, 'not array exception was thrown');
      });
      QUnit.test('routes option should not accept null at runtime', function(assert) {
        assert.throws(function() {
          $('#map').dxMap({provider: 'googleStatic'}).dxMap('option', 'routes', null);
        }, /routes/i, 'not array exception was thrown');
      });
      QUnit.module('saving previous routes', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl?';
          GoogleStaticProvider.remapConstant(fakeURL);
          ajaxMock.setup({
            url: fakeURL,
            responseText: ''
          });
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('pushing into routes option should render new route', function(assert) {
        var addedRoutes = 0;
        var removedRoutes = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            onRouteAdded: function() {
              addedRoutes++;
            },
            onRouteRemoved: function() {
              removedRoutes++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              resolve(map);
            });
            var routes = map.option('routes');
            routes.push(ROUTES[0]);
            map.option('routes', routes);
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.equal(addedRoutes, 1 + 2, 'correct number of routes added');
              assert.equal(removedRoutes, 1, 'correct number of routes removed');
              resolve();
            });
            var routes = map.option('routes');
            routes.push(ROUTES[1]);
            map.option('routes', routes);
          });
        });
      });
      QUnit.test('adding same route after addRoute should not render route', function(assert) {
        var addedRoutes = 0;
        var removedRoutes = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            onRouteAdded: function() {
              addedRoutes++;
            },
            onRouteRemoved: function() {
              removedRoutes++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              resolve(map);
            });
            map.addRoute(ROUTES[0]);
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.equal(addedRoutes, 1 + 1, 'correct number of routes added');
              assert.equal(removedRoutes, 1, 'correct number of routes removed');
              resolve();
            });
            map.option('routes', [ROUTES[0]]);
          });
        });
      });
      QUnit.test('adding route after removeRoute should render route', function(assert) {
        var addedRoutes = 0;
        var removedRoutes = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            routes: [ROUTES[0]],
            onRouteAdded: function() {
              addedRoutes++;
            },
            onRouteRemoved: function() {
              removedRoutes++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              resolve(map);
            });
            map.removeRoute(ROUTES[0]);
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.equal(addedRoutes, 1 + 1, 'correct number of routes added');
              assert.equal(removedRoutes, 1, 'correct number of routes removed');
              resolve();
            });
            map.option('routes', [ROUTES[0]]);
          });
        });
      });
      QUnit.test('changing existing route should rerender marker', function(assert) {
        var addedRoutes = 0;
        var removedRoutes = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            routes: [ROUTES[0]],
            onRouteAdded: function() {
              addedRoutes++;
            },
            onRouteRemoved: function() {
              removedRoutes++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.equal(addedRoutes, 1 + 1, 'correct number of routes added');
              assert.equal(removedRoutes, 1, 'correct number of routes removed');
              resolve();
            });
            map.option('routes', [ROUTES[0]]);
          });
        });
      });
      QUnit.module('async routes rendering', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl?';
          GoogleStaticProvider.remapConstant(fakeURL);
          ajaxMock.setup({
            url: fakeURL,
            responseText: ''
          });
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('addRoute method call should not render route twice', function(assert) {
        var addedRoutes = 0;
        var done = assert.async();
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          onRouteAdded: function() {
            addedRoutes++;
          }
        });
        var map = $map.dxMap('instance');
        map.addRoute(ROUTES[0]).done(function() {
          assert.equal(addedRoutes, 1, 'correct number of markers added');
          done();
        });
      });
      QUnit.test('routes option change should not render incorrect routes', function(assert) {
        var addedRoutes = 0;
        var done = assert.async();
        var $map = $('#map').dxMap({
          provider: 'googleStatic',
          onRouteAdded: function() {
            addedRoutes++;
          },
          onReady: function() {
            map.option('onReady', function() {
              assert.equal(addedRoutes, 1, 'correct number of routes added');
              $map.remove();
              done();
            });
          }
        });
        var map = $map.dxMap('instance');
        var routes = [ROUTES[0]];
        map.option('routes', routes);
        routes.push(ROUTES[1]);
        map.option('routes', routes);
      });
      QUnit.module('Change provider', {
        beforeEach: function() {
          var fakeURL = '/fakeGoogleUrl?';
          GoogleStaticProvider.remapConstant(fakeURL);
          ajaxMock.setup({
            url: fakeURL,
            responseText: ''
          });
        },
        afterEach: function() {
          ajaxMock.clear();
        }
      });
      QUnit.test('change provider and async options', function(assert) {
        var makeConfig = function(resolve) {
          return {
            provider: 'googleStatic',
            zoom: 1000,
            markers: [{
              iconSrc: null,
              location: {
                lat: 40.755833,
                lng: -73.986389
              }
            }, {
              iconSrc: null,
              location: {
                lat: 40.7825,
                lng: -73.966111
              }
            }],
            onReady: function(e) {
              resolve(e.component);
            }
          };
        };
        return new Promise(function(resolve) {
          new Map($('#map'), makeConfig(resolve));
        }).then(function(map) {
          map._options.silent('provider', 'bing');
          return new Promise(function(resolve) {
            map.option(makeConfig(resolve));
          });
        }).then(function(map) {
          assert.ok(map._asyncActionSuppressed);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./utils.js","ui/map","ui/map/provider.google_static","../../../helpers/ajaxMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./utils.js"), require("ui/map"), require("ui/map/provider.google_static"), require("../../../helpers/ajaxMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=commonTests.js.map