!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/mapParts/googleStaticTests.js"], ["jquery","./utils.js","ui/map","ui/map/provider.google_static","color","../../../helpers/ajaxMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/mapParts/googleStaticTests.js", ["jquery", "./utils.js", "ui/map", "ui/map/provider.google_static", "color", "../../../helpers/ajaxMock.js"], function($__export) {
  "use strict";
  var $,
      testing,
      Map,
      GoogleStaticProvider,
      Color,
      ajaxMock,
      LOCATIONS,
      MARKERS,
      ROUTES,
      MAP_CONTAINER_CLASS,
      mapUrl,
      backgroundUrl;
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
      Color = $__m.default;
    }, function($__m) {
      ajaxMock = $__m.default;
    }],
    execute: function() {
      LOCATIONS = testing.LOCATIONS;
      MARKERS = testing.MARKERS;
      ROUTES = testing.ROUTES;
      MAP_CONTAINER_CLASS = 'dx-map-container';
      QUnit.module('googleStatic provider', {
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
      mapUrl = function(map) {
        return backgroundUrl((map.element ? map.$element() : map).find('.' + MAP_CONTAINER_CLASS));
      };
      backgroundUrl = function($element) {
        return $element.css('backgroundImage').replace(/^url|[("")]/g, '');
      };
      QUnit.test('map ready action', function(assert) {
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            onReady: function(e) {
              assert.ok(true, 'map rendered');
              resolve();
            }
          });
        });
      });
      QUnit.test('default options', function(assert) {
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf('sensor=false'), -1, 'dimensions set correctly');
              resolve();
            }
          });
        });
      });
      QUnit.test('dimensions', function(assert) {
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            width: 400,
            height: 500,
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf('size=400x500'), -1, 'dimensions set correctly');
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              map.option('onReady', function() {
                assert.notEqual(mapUrl(map).indexOf('size=300x400'), -1, 'dimensions set correctly');
                resolve();
              });
            });
            map.option({
              'width': 300,
              'height': 400
            });
          });
        });
      });
      QUnit.test('type', function(assert) {
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            type: 'hybrid',
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf('maptype=hybrid'), -1, 'type set correctly');
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf('maptype=roadmap'), -1, 'type set correctly');
              resolve(map);
            });
            map.option('type', 'roadmap');
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf('maptype=satellite'), -1, 'type set correctly');
              resolve();
            });
            map.option('type', 'satellite');
          });
        });
      });
      QUnit.test('center', function(assert) {
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            center: LOCATIONS[0],
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf('center=Brooklyn+Bridge,New+York,NY'), -1, 'center set correctly');
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf('center=40.537102,-73.990318'), -1, 'center set correctly');
              resolve(map);
            });
            map.option('center', LOCATIONS[1]);
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf('center=40.539102,-73.970318'), -1, 'center set correctly');
              resolve(map);
            });
            map.option('center', LOCATIONS[2]);
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf('center=40.557102,-72.990318'), -1, 'center set correctly');
              resolve();
            });
            map.option('center', LOCATIONS[3]);
          });
        });
      });
      QUnit.test('location parsing should be correct in case of string with one comma', function(assert) {
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            center: 'A, B',
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf('center=A,+B'), -1, 'center set correctly');
              resolve(e.component);
            }
          });
        });
      });
      QUnit.test('zoom', function(assert) {
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            zoom: 1,
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf('zoom=1'), -1, 'zoom set correctly');
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf('zoom=13'), -1, 'zoom set correctly');
              resolve();
            });
            map.option('zoom', 13);
          });
        });
      });
      QUnit.test('apiKey', function(assert) {
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            apiKey: 10153453,
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf('key=10153453'), -1, 'key set correctly');
              resolve();
            }
          });
        });
      });
      QUnit.test('markers', function(assert) {
        assert.expect(4);
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            markers: [MARKERS[0]],
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf('markers=' + MARKERS[0].location.lat + ',' + MARKERS[0].location.lng), -1, 'markers set correctly');
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf('markers=' + MARKERS[0].location.lat + ',' + MARKERS[0].location.lng + '|' + MARKERS[1].location[0] + ',' + MARKERS[1].location[1]), -1, 'markers set correctly');
              resolve(map);
            });
            map.option('markers', [MARKERS[0], MARKERS[1]]);
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.equal(mapUrl(map).indexOf('|' + MARKERS[1].location[0] + ',' + MARKERS[1].location[1]), -1, 'marker removed correctly');
            });
            map.removeMarker(MARKERS[1]).done(function() {
              resolve(map);
            });
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf('markers=' + MARKERS[0].location.lat + ',' + MARKERS[0].location.lng + '|' + MARKERS[1].location[0] + ',' + MARKERS[1].location[1]), -1, 'marker added correctly');
            });
            map.addMarker(MARKERS[1]).done(function() {
              resolve(map);
            });
          });
        });
      });
      QUnit.test('markerIcon', function(assert) {
        var markerUrl1 = 'http://example.com/1.png';
        var markerUrl2 = 'http://example.com/2.png';
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            markers: [MARKERS[0]],
            markerIconSrc: markerUrl1,
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf('markers=icon:' + markerUrl1 + '|' + MARKERS[0].location.lat + ',' + MARKERS[0].location.lng), -1, 'markers set correctly');
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf('markers=icon:' + markerUrl2 + '|' + MARKERS[0].location.lat + ',' + MARKERS[0].location.lng), -1, 'markers set correctly');
              resolve(map);
            });
            map.option('markerIconSrc', markerUrl2);
          });
        });
      });
      QUnit.test('markerAdded', function(assert) {
        var markerAddedFired = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            markers: [MARKERS[0]],
            onMarkerAdded: function(args) {
              assert.equal(args.options, MARKERS[0], 'correct options passed as parameter');
              markerAddedFired++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function() {
          assert.equal(markerAddedFired, 1, 'markerAdded fired');
        });
      });
      QUnit.test('markerRemoved', function(assert) {
        var markerRemovedFired = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            markers: [MARKERS[0]],
            onMarkerRemoved: function(args) {
              assert.equal(args.options, MARKERS[0], 'correct options passed as parameter');
              markerRemovedFired++;
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
            map.option('markers', []);
          });
        }).then(function() {
          assert.equal(markerRemovedFired, 1, 'markerRemoved fired');
        });
      });
      QUnit.test('autoAdjust', function(assert) {
        assert.expect(0);
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            autoAdjust: true,
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function(map) {
          map.option('autoAdjust', false);
        });
      });
      QUnit.test('routes', function(assert) {
        var route0 = 'path=' + 'color:' + (new Color(ROUTES[0].color).toHex() + Math.round((ROUTES[0].opacity) * 255).toString(16)).replace('#', '0x') + '|' + 'weight:' + ROUTES[0].weight + '|' + ROUTES[0].locations[0][0] + ',' + ROUTES[0].locations[0][1] + '|' + ROUTES[0].locations[1][0] + ',' + ROUTES[0].locations[1][1] + '|' + ROUTES[0].locations[2][0] + ',' + ROUTES[0].locations[2][1];
        return new Promise(function(resolve) {
          var map = new Map($('#map'), {
            provider: 'googleStatic',
            routes: [ROUTES[0]],
            onReady: function(e) {
              assert.notEqual(mapUrl(map).indexOf(route0), -1, 'routes set correctly');
              resolve(e.component);
            }
          });
        }).then(function(map) {
          return new Promise(function(resolve) {
            map.option('onReady', function() {
              assert.notEqual(mapUrl(map).indexOf(route0 + '&' + route0), -1, 'routes set correctly');
              resolve(map);
            });
            map.option('routes', [ROUTES[0], ROUTES[0]]);
          });
        });
      });
      QUnit.test('routeAdded', function(assert) {
        var routeAddedFired = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            routes: [ROUTES[0]],
            onRouteAdded: function(args) {
              assert.equal(args.options, ROUTES[0], 'correct options passed as parameter');
              routeAddedFired++;
            },
            onReady: function(e) {
              resolve(e.component);
            }
          });
        }).then(function() {
          assert.equal(routeAddedFired, 1, 'routeAdded fired');
        });
      });
      QUnit.test('routeRemoved', function(assert) {
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            routes: [ROUTES[0]],
            onRouteRemoved: function(args) {
              assert.equal(args.options, ROUTES[0], 'correct options passed as parameter');
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
            map.option('routes', []);
          });
        });
      });
      QUnit.test('click', function(assert) {
        var clicked = 0;
        var eventFired = 0;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            width: 400,
            height: 500,
            onClick: function() {
              clicked++;
            },
            onReady: function(e) {
              var $element = $(e.element);
              $element.dxMap('instance').on('click', function() {
                eventFired++;
              });
              $element.children().trigger('dxclick');
              resolve();
            }
          });
        }).then(function() {
          assert.equal(clicked, 1);
          assert.equal(eventFired, 1);
        });
      });
      QUnit.test('the pointer down event propagation should be canceled', function(assert) {
        var isPropagationStopped;
        return new Promise(function(resolve) {
          new Map($('#map'), {
            provider: 'googleStatic',
            width: 400,
            height: 500,
            onReady: function(e) {
              $(e.element).on('dxpointerdown', function(e) {
                isPropagationStopped = e.isPropagationStopped();
              });
              $(e.element).children().trigger('dxpointerdown');
              resolve();
            }
          });
        }).then(function() {
          assert.ok(!isPropagationStopped);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./utils.js","ui/map","ui/map/provider.google_static","color","../../../helpers/ajaxMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./utils.js"), require("ui/map"), require("ui/map/provider.google_static"), require("color"), require("../../../helpers/ajaxMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=googleStaticTests.js.map