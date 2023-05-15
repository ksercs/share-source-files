!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/map.integration.tests.js"], ["jquery","data/custom_store","data/data_source","viz/vector_map/projection","viz/vector_map/vector_map"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.vectorMap/map.integration.tests.js", ["jquery", "data/custom_store", "data/data_source", "viz/vector_map/projection", "viz/vector_map/vector_map"], function($__export) {
  "use strict";
  var $,
      CustomStore,
      DataSource,
      projection,
      simpleProjection;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      DataSource = $__m.default;
    }, function($__m) {
      projection = $__m.projection;
    }, function($__m) {}],
    execute: function() {
      simpleProjection = projection({
        aspectRatio: 4 / 3,
        to: function(coordinates) {
          return [(coordinates[0] - 200) / 200, (coordinates[1] - 150) / 150];
        },
        from: function(coordinates) {
          return [(coordinates[0] + 1) * 200, (coordinates[1] + 1) * 150];
        }
      });
      QUnit.testStart(function() {
        $('#qunit-fixture').html('<div id=\'container\'></div>');
      });
      QUnit.module('Tests without stub', {beforeEach: function() {
          this.dataSource = {
            type: 'FeatureCollection',
            features: [[[[100, 50], [200, 50], [200, 200], [100, 200]]], [[[200, 100], [400, 0], [400, 300]], [[0, 0], [0, 300], [400, 300], [400, 0]]], []].map(function(item) {
              return {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: item
                },
                properties: {}
              };
            })
          };
        }});
      QUnit.test('VectorMap should not fire onCenterChanged and onZoomFactorChanged events on widget creation', function(assert) {
        var onCenterChanged = sinon.spy();
        var onZoomFactorChanged = sinon.spy();
        $('#container').dxVectorMap({
          projection: simpleProjection,
          layers: {dataSource: this.dataSource},
          center: [10, 10],
          zoomFactor: 3.5,
          onCenterChanged: onCenterChanged,
          onZoomFactorChanged: onZoomFactorChanged
        });
        assert.strictEqual(onCenterChanged.callCount, 0);
        assert.strictEqual(onZoomFactorChanged.callCount, 0);
      });
      QUnit.test('VectorMap should fire onCenterChanged and onZoomFactorChanged events on option changing', function(assert) {
        var onCenterChanged = sinon.spy();
        var onZoomFactorChanged = sinon.spy();
        var map = $('#container').dxVectorMap({
          projection: simpleProjection,
          layers: {dataSource: this.dataSource},
          zoomFactor: 3.5,
          onCenterChanged: onCenterChanged,
          onZoomFactorChanged: onZoomFactorChanged
        }).dxVectorMap('instance');
        map.option({
          center: [10, 10],
          zoomFactor: 5
        });
        assert.strictEqual(onCenterChanged.callCount, 1);
        assert.strictEqual(onZoomFactorChanged.callCount, 1);
      });
      QUnit.module('VectorMap bounds', {beforeEach: function() {
          this.dataSource = {
            type: 'FeatureCollection',
            features: [[[[100, 50], [120, 50], [150, 20], [50, 40]]], [[[100, 10], [50, 60], [50, 30]], [[-10, 0], [0, 30], [40, 30], [40, -10]]], []].map(function(item) {
              return {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: item
                },
                properties: {}
              };
            })
          };
        }});
      QUnit.test('VectorMap should set prepared bounds from dataSource (root - FeatureCollection object)', function(assert) {
        this.dataSource['bbox'] = [0, 50, 100, 0];
        var map = $('#container').dxVectorMap({
          getBoundsFromData: true,
          layers: {dataSource: this.dataSource}
        }).dxVectorMap('instance');
        assert.deepEqual(map._projection._engine.min(), [0, 0]);
        assert.deepEqual(map._projection._engine.max(), [100, 50]);
      });
      QUnit.test('VectorMap should set prepared bounds from dataSource (collect from feature objects)', function(assert) {
        this.dataSource.features[0]['bbox'] = [-10, 50, 120, 0];
        this.dataSource.features[1]['bbox'] = [0, 60, 100, -10];
        var map = $('#container').dxVectorMap({
          getBoundsFromData: true,
          layers: {dataSource: this.dataSource}
        }).dxVectorMap('instance');
        assert.deepEqual(map._projection._engine.min(), [-10, -10]);
        assert.deepEqual(map._projection._engine.max(), [120, 60]);
      });
      QUnit.module('VectorMap custom store', {beforeEach: function() {
          var dataObject = {
            type: 'FeatureCollection',
            features: [[[[100, 50], [120, 50], [150, 20], [50, 40]]], [[[100, 10], [50, 60], [50, 30]], [[-10, 0], [0, 30], [40, 30], [40, -10]]], []].map(function(item) {
              return {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: item
                },
                properties: {}
              };
            })
          };
          this.dataSource = {store: new CustomStore({
              'loadMode': 'raw',
              'load': function() {
                var d = $.Deferred();
                d.resolve(dataObject);
                return d;
              }
            })};
        }});
      QUnit.test('Vector Map should not failed (T885056)', function(assert) {
        $('#container').dxVectorMap({layers: {dataSource: this.dataSource}});
        assert.ok(true);
      });
      QUnit.test('Updating map bbox after push new item to the CustomStore', function(assert) {
        var markerSource = new CustomStore({load: function() {
            return [{
              coordinates: [-121.2808, 38.3320],
              attributes: {text: 'Sacramento'},
              'bbox': [0, 0, -121.2808, 38.3320]
            }];
          }});
        var map = $('#container').dxVectorMap({
          getBoundsFromData: true,
          layers: [{dataSource: new DataSource({
              pushAggregationTimeout: 0,
              paginate: false,
              store: markerSource
            })}]
        }).dxVectorMap('instance');
        markerSource.push([{
          type: 'insert',
          data: {
            coordinates: [-180, 30.25],
            attributes: {text: 'Austin'},
            'bbox': [0, 0, -180, 30.25]
          }
        }]);
        assert.deepEqual(map._projection._engine.min(), [-180, 0]);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","data/custom_store","data/data_source","viz/vector_map/projection","viz/vector_map/vector_map"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("data/custom_store"), require("data/data_source"), require("viz/vector_map/projection"), require("viz/vector_map/vector_map"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=map.integration.tests.js.map