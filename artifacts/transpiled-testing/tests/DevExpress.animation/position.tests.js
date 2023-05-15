!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.animation/position.tests.js"], ["jquery","animation/position","animation/translator","core/utils/browser","../../helpers/positionFixtures.js","core/devices.js","core/utils/size","core/utils/window.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.animation/position.tests.js", ["jquery", "animation/position", "animation/translator", "core/utils/browser", "../../helpers/positionFixtures.js", "core/devices.js", "core/utils/size", "core/utils/window.js"], function($__export) {
  "use strict";
  var $,
      positionUtils,
      translator,
      browser,
      fixtures,
      devices,
      implementationsMap,
      getWindow,
      setupPosition,
      calculatePosition,
      testPosition,
      testCollision;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      positionUtils = $__m.default;
    }, function($__m) {
      translator = $__m.default;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      fixtures = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      implementationsMap = $__m.implementationsMap;
    }, function($__m) {
      getWindow = $__m.getWindow;
    }],
    execute: function() {
      setupPosition = positionUtils.setup;
      calculatePosition = positionUtils.calculate;
      testPosition = function(name, fixtureName, params, expectedLeft, expectedTop, debug) {
        QUnit.test(name, function(assert) {
          if (!expectedLeft && !expectedTop) {
            assert.expect(0);
          }
          fixtures[fixtureName].create();
          try {
            if (debug)
              ;
            setupPosition.apply(this, params);
            var what = $(params[0]);
            var pos = what.position();
            expectedLeft && assert.equal(pos.left, expectedLeft);
            expectedTop && assert.equal(pos.top, expectedTop);
          } finally {
            fixtures[fixtureName].drop();
          }
        });
      };
      testCollision = function(name, fixtureName, params, expectedHorzDist, expectedVertDist, debug) {
        QUnit.test(name, function(assert) {
          fixtures[fixtureName].create();
          try {
            if (debug)
              ;
            setupPosition.apply(this, params);
            var what = $(params[0]);
            var where = $(params[1].of);
            var whatOffset = what.offset();
            var whereOffset = where.offset();
            assert.equal(whatOffset.left - whereOffset.left, expectedHorzDist, 'horizontal coordinate');
            assert.equal(whatOffset.top - whereOffset.top, expectedVertDist, 'vertical coordinate');
          } finally {
            fixtures[fixtureName].drop();
          }
        });
      };
      (function defaultModule() {
        QUnit.module('default');
        QUnit.test('act as getter', function(assert) {
          fixtures.simple.create();
          try {
            var pos = setupPosition('#where');
            assert.equal(pos.left, 200);
            assert.equal(pos.top, 200);
          } finally {
            fixtures.simple.drop();
          }
        });
        testPosition('non-exist target', 'simple', ['#what', {of: '#non-exist'}]);
        testPosition('defaults', 'simple', ['#what', {of: '#where'}], 225, 225);
        testPosition('my defaults at top', 'simple', ['#what', {
          at: 'top',
          of: '#where'
        }], 225, 175);
        testPosition('my defaults at bottom', 'simple', ['#what', {
          at: 'bottom',
          of: '#where'
        }], 225, 275);
        testPosition('my defaults at left', 'simple', ['#what', {
          at: 'left',
          of: '#where'
        }], 175, 225);
        testPosition('my defaults at right', 'simple', ['#what', {
          at: 'right',
          of: '#where'
        }], 275, 225);
        testPosition('my top at defaults', 'simple', ['#what', {
          my: 'top',
          of: '#where'
        }], 225, 250);
        testPosition('my bottom at defaults', 'simple', ['#what', {
          my: 'bottom',
          of: '#where'
        }], 225, 200);
        testPosition('my left at defaults', 'simple', ['#what', {
          my: 'left',
          of: '#where'
        }], 250, 225);
        testPosition('my right at defaults', 'simple', ['#what', {
          my: 'right',
          of: '#where'
        }], 200, 225);
        testPosition('my top-left at top-left', 'simple', ['#what', {
          my: 'TOP LEFT',
          at: 'left \t\n top',
          of: '#where'
        }], 200, 200);
        testPosition('my bottom-right at bottom-right', 'simple', ['#what', {
          my: {
            x: 'right',
            y: 'bottom'
          },
          at: {
            h: 'right',
            v: 'bottom'
          },
          of: '#where'
        }], 250, 250);
        testPosition('separate positioned containers', 'separatePositionedContainers', ['#what', {of: '#where'}], 125, -75);
        testPosition('offset, single', 'simple', ['#what', {
          of: '#where',
          offset: 5
        }], 230, 230);
        testPosition('offset, both', 'simple', ['#what', {
          of: '#where',
          offset: '5 -5'
        }], 230, 220);
        testPosition('target is window', 'simple', ['#what', {
          my: 'top left',
          at: 'top left',
          of: window
        }], 0, 0);
        testPosition('target is document', 'simple', ['#what', {
          my: 'top left',
          at: 'top left',
          of: document
        }], 0, 0);
        testPosition('If a position object is passed to DX.position, calculatePosition should not be invoked', 'simple', ['#what', {
          h: {location: 12345},
          v: {location: 123456}
        }], 12345, 123456);
      })();
      (function collisionTopLeftModule() {
        QUnit.module('collision, top-left corner');
        $.each({
          'none': {
            h: -55,
            v: -55
          },
          'none none': {
            h: -55,
            v: -55
          },
          'fit': {
            h: 0,
            v: 0
          },
          'flip': {
            h: 105,
            v: 105
          },
          'fit fit': {
            h: 0,
            v: 0
          },
          'flip flip': {
            h: 105,
            v: 105
          },
          'flip none': {
            h: 105,
            v: -55
          },
          'fit none': {
            h: 0,
            v: -55
          },
          'none fit': {
            h: -55,
            v: 0
          },
          'none flip': {
            h: -55,
            v: 105
          },
          'fit flip': {
            h: 0,
            v: 105
          },
          'flip fit': {
            h: 105,
            v: 0
          }
        }, function(methodName, expectedPosition) {
          testCollision('decollide method \'' + methodName + '\'', 'collisionTopLeft', ['#what', {
            my: 'bottom right',
            at: 'top left',
            of: '#where',
            offset: -5,
            collision: methodName
          }], expectedPosition.h, expectedPosition.v);
        });
      })();
      (function collisionTopRightModule() {
        QUnit.module('collision, top-right corner');
        $.each({
          'none': {
            h: 105,
            v: -55
          },
          'none none': {
            h: 105,
            v: -55
          },
          'fit': {
            h: 50,
            v: 0
          },
          'flip': {
            h: -55,
            v: 105
          },
          'fit fit': {
            h: 50,
            v: 0
          },
          'flip flip': {
            h: -55,
            v: 105
          },
          'flip none': {
            h: -55,
            v: -55
          },
          'fit none': {
            h: 50,
            v: -55
          },
          'none fit': {
            h: 105,
            v: 0
          },
          'none flip': {
            h: 105,
            v: 105
          },
          'fit flip': {
            h: 50,
            v: 105
          },
          'flip fit': {
            h: -55,
            v: 0
          }
        }, function(methodName, expectedPosition) {
          testCollision('decollide method \'' + methodName + '\'', 'collisionTopRight', ['#what', {
            my: 'bottom left',
            at: 'top right',
            of: '#where',
            offset: '5 -5',
            collision: methodName
          }], expectedPosition.h, expectedPosition.v);
        });
      })();
      (function collisionBottomLeftModule() {
        QUnit.module('collision, bottom-left corner');
        $.each({
          'none': {
            h: -55,
            v: 105
          },
          'none none': {
            h: -55,
            v: 105
          },
          'fit': {
            h: 0,
            v: 50
          },
          'flip': {
            h: 105,
            v: -55
          },
          'fit fit': {
            h: 0,
            v: 50
          },
          'flip flip': {
            h: 105,
            v: -55
          },
          'flip none': {
            h: 105,
            v: 105
          },
          'fit none': {
            h: 0,
            v: 105
          },
          'none fit': {
            h: -55,
            v: 50
          },
          'none flip': {
            h: -55,
            v: -55
          },
          'fit flip': {
            h: 0,
            v: -55
          },
          'flip fit': {
            h: 105,
            v: 50
          }
        }, function(methodName, expectedPosition) {
          testCollision('decollide method \'' + methodName + '\'', 'collisionBottomLeft', ['#what', {
            my: 'top right',
            at: 'bottom left',
            of: '#where',
            offset: '-5 5',
            collision: methodName
          }], expectedPosition.h, expectedPosition.v);
        });
      })();
      (function collisionBottomRightModule() {
        QUnit.module('collision, bottom-right corner');
        $.each({
          'none': {
            h: 105,
            v: 105
          },
          'none none': {
            h: 105,
            v: 105
          },
          'fit': {
            h: 50,
            v: 50
          },
          'flip': {
            h: -55,
            v: -55
          },
          'fit fit': {
            h: 50,
            v: 50
          },
          'flip flip': {
            h: -55,
            v: -55
          },
          'flip none': {
            h: -55,
            v: 105
          },
          'fit none': {
            h: 50,
            v: 105
          },
          'none fit': {
            h: 105,
            v: 50
          },
          'none flip': {
            h: 105,
            v: -55
          },
          'fit flip': {
            h: 50,
            v: -55
          },
          'flip fit': {
            h: -55,
            v: 50
          }
        }, function(methodName, expectedPosition) {
          testCollision('decollide method \'' + methodName + '\'', 'collisionBottomRight', ['#what', {
            my: 'top left',
            at: 'bottom right',
            of: '#where',
            offset: '5 5',
            collision: methodName
          }], expectedPosition.h, expectedPosition.v);
        });
      })();
      (function collisionReturnedValueModule() {
        QUnit.module('collision returned value');
        QUnit.test('returned value is correct when flip vertical', function(assert) {
          fixtures.collisionBottomRight.create();
          try {
            var result = calculatePosition('#what', {
              my: 'top right',
              at: 'bottom right',
              of: '#where',
              collision: 'flip'
            });
            assert.equal(result.h.flip, false, 'horizontal flip not occurred');
            assert.equal(result.v.flip, true, 'vertical flip occurred');
          } finally {
            fixtures.collisionBottomRight.drop();
          }
        });
        QUnit.test('position should be flipped to maximum free space', function(assert) {
          fixtures.customBoundaryWithLeftTopOffset.create();
          try {
            var $what = $('#what').height(300);
            var $where = $('#where');
            var $boundary = $('#boundary');
            var resultPosition = setupPosition($what, {
              my: 'bottom right',
              at: 'top left',
              of: $where,
              boundary: $boundary,
              collision: 'flip'
            });
            assert.equal(resultPosition.v.flip, true, 'vertical flip occurred');
          } finally {
            fixtures.customBoundaryWithLeftTopOffset.drop();
          }
        });
        QUnit.test('returned value is correct when flip horizontal', function(assert) {
          fixtures.collisionBottomRight.create();
          try {
            var result = calculatePosition('#what', {
              my: 'bottom left',
              at: 'top right',
              of: '#where',
              collision: 'flip'
            });
            assert.equal(result.h.flip, true, 'horizontal flip occurred');
            assert.equal(result.v.flip, false, 'vertical flip not occurred');
          } finally {
            fixtures.collisionBottomRight.drop();
          }
        });
        QUnit.test('returned value is correct when fit vertical', function(assert) {
          fixtures.collisionBottomRight.create();
          try {
            var result = calculatePosition('#what', {
              my: 'top right',
              at: 'bottom right',
              of: '#where',
              collision: 'fit'
            });
            assert.equal(result.h.fit, false, 'horizontal fit not occurred');
            assert.equal(result.v.fit, true, 'vertical fit occurred');
          } finally {
            fixtures.collisionBottomRight.drop();
          }
        });
        QUnit.test('returned value is correct when fit horizontal', function(assert) {
          fixtures.collisionBottomRight.create();
          try {
            var result = calculatePosition('#what', {
              my: 'bottom left',
              at: 'top right',
              of: '#where',
              collision: 'fit'
            });
            assert.equal(result.h.fit, true, 'horizontal fit occurred');
            assert.equal(result.v.fit, false, 'vertical fit not occurred');
          } finally {
            fixtures.collisionBottomRight.drop();
          }
        });
        QUnit.test('returned value is correct when expected flips did not happen because there is less space on the flip side', function(assert) {
          fixtures.collisionSmallWindow.create();
          try {
            var result = calculatePosition('#what', {
              my: 'top left',
              at: 'bottom right',
              of: '#where',
              collision: 'flip'
            });
            assert.equal(result.h.flip, false, 'horizontal flip did not occur');
            assert.equal(result.v.flip, false, 'vertical flip did not occur');
          } finally {
            fixtures.collisionSmallWindow.drop();
          }
        });
      })();
      (function collisionFlipFitModule() {
        QUnit.module('flipfit (flip without fit)');
        $.each({
          'flipfit none': {
            h: 100,
            v: -100
          },
          'none flipfit': {
            h: -100,
            v: 100
          }
        }, function(methodName, expectedPosition) {
          testCollision('decollide method \'' + methodName + '\'', 'customBoundaryWithLeftTopOffset', ['#what', {
            my: 'bottom right',
            at: 'top left',
            of: '#where',
            boundary: '#boundary',
            collision: methodName
          }], expectedPosition.h, expectedPosition.v);
        });
        QUnit.module('flipfit (fit after flip)');
        $.each({
          'flipfit none': {
            h: -50,
            v: -100
          },
          'none flipfit': {
            h: -100,
            v: -50
          }
        }, function(methodName, expectedPosition) {
          testCollision('decollide method \'' + methodName + '\'', 'customBoundary', ['#what', {
            my: 'bottom right',
            at: 'top left',
            of: '#where',
            boundary: '#boundary',
            boundaryOffset: '50 50',
            collision: methodName
          }], expectedPosition.h, expectedPosition.v);
        });
      })();
      (function boundaryOffsetModule() {
        QUnit.module('boundary offset');
        testPosition('\'boundaryOffset\' option affects on vertical position', 'simple', ['#what', {
          my: 'right center',
          at: 'top left',
          of: '#where',
          boundaryOffset: '0 180',
          collision: 'fit'
        }], 150, 180);
        testPosition('\'boundaryOffset\' option affects on horizontal position', 'simple', ['#what', {
          my: 'bottom center',
          at: 'top left',
          of: '#where',
          boundaryOffset: '180 0',
          collision: 'fit'
        }], 180, 150);
      })();
      (function customBoundaryModule() {
        QUnit.module('custom boundary');
        testPosition('custom boundary is used for collision \'fit\'', 'customBoundary', ['#what', {
          my: 'top center',
          at: 'right top',
          collision: 'fit',
          boundary: '#boundary'
        }], 210, 10);
        QUnit.test('custom boundary is used for collision \'flip\'', function(assert) {
          fixtures.customBoundary.create();
          try {
            $('#where').css({top: '45px'});
            setupPosition('#what', {
              my: 'right center',
              at: 'left top',
              collision: 'flip',
              boundary: '#boundary',
              of: '#where'
            });
            var whatOffset = $('#what').offset();
            assert.equal(whatOffset.left, 10);
            assert.equal(whatOffset.top, 105);
          } finally {
            fixtures.customBoundary.drop();
          }
        });
        testPosition('left boundary offset is applied correctly', 'customBoundary', ['#what', {
          my: 'top center',
          at: 'bottom left',
          of: '#where',
          boundary: '#boundary',
          boundaryOffset: '60 0',
          collision: 'fit'
        }], 70, 210);
        testPosition('right boundary offset is applied correctly', 'customBoundary', ['#what', {
          my: 'top center',
          at: 'bottom right',
          of: '#where',
          boundary: '#boundary',
          boundaryOffset: '60 0',
          collision: 'fit'
        }], 150, 210);
        testPosition('top boundary offset is applied correctly', 'customBoundary', ['#what', {
          my: 'right center',
          at: 'left top',
          of: '#where',
          boundary: '#boundary',
          boundaryOffset: '0 60',
          collision: 'fit'
        }], 10, 70);
        testPosition('bottom boundary offset is applied correctly', 'customBoundary', ['#what', {
          my: 'right center',
          at: 'left bottom',
          of: '#where',
          boundary: '#boundary',
          boundaryOffset: '0 60',
          collision: 'fit'
        }], 10, 150);
        QUnit.test('bounds should be calculated properly when content is scrolled', function(assert) {
          fixtures.customBoundary.create();
          var $wrapper = $('<div>').appendTo('body');
          try {
            var $boundary = $('#boundary');
            $boundary.css({
              height: '100%',
              width: '100%',
              left: 0,
              top: 0
            });
            $('#where').css({
              top: $boundary.offset().top,
              left: $boundary.offset().left
            });
            $wrapper.css({
              height: '200%',
              width: '200%',
              position: 'absolute',
              top: '0',
              left: '0'
            });
            $('#what').width($boundary.width()).height($boundary.height());
            $(window).scrollLeft(20);
            var position = calculatePosition('#what', {
              my: 'top left',
              at: 'top left',
              collision: 'fit',
              boundary: '#boundary',
              of: '#where'
            });
            assert.equal(position.h.oversize, 0, 'horizontal bounds are correct');
            $(window).scrollLeft(0);
            $(window).scrollTop(20);
            position = calculatePosition('#what', {
              my: 'top left',
              at: 'top left',
              collision: 'fit',
              boundary: '#boundary',
              of: '#where'
            });
            assert.equal(position.v.oversize, 0, 'vertical bounds are correct');
          } finally {
            fixtures.customBoundary.drop();
            $wrapper.remove();
          }
        });
        QUnit.test('bounds should be correct if boundary is equal to window', function(assert) {
          fixtures.customBoundary.create();
          try {
            var window = getWindow();
            var position = calculatePosition('#what', {
              collision: 'fit',
              boundary: window,
              of: '#where'
            });
            assert.strictEqual(position.v.oversize, 0, 'vertical bounds are correct ');
            assert.strictEqual(position.h.oversize, 0, 'horizontal bounds are correc');
          } catch (e) {
            assert.ok(false, ("error: " + e.message));
          } finally {
            fixtures.customBoundary.drop();
          }
        });
      })();
      (function preciseModule() {
        QUnit.module('precise', {
          beforeEach: function() {
            fixtures.simple.create();
          },
          afterEach: function() {
            fixtures.simple.drop();
          }
        });
        QUnit.test('coordinates should not be rounded if option precise is true in calculatePosition method', function(assert) {
          var $where = $('#where').css({
            top: 0,
            left: 0
          });
          translator.move($where, {
            top: 0.5,
            left: 0.5
          });
          var location = translator.locate($where);
          var pos = calculatePosition($('#what'), {
            precise: true,
            of: $where,
            at: 'top left',
            my: 'top left'
          });
          assert.equal(pos.h.location, location.top);
          assert.equal(pos.v.location, location.left);
        });
        QUnit.test('coordinates should be rounded if option precise is false in calculatePosition method', function(assert) {
          var $where = $('#where').css({
            top: 0,
            left: 0
          });
          translator.move($where, {
            top: 0.5,
            left: 0.5
          });
          var location = translator.locate($where);
          var pos = calculatePosition($('#what'), {
            precise: false,
            of: $where,
            at: 'top left',
            my: 'top left'
          });
          assert.equal(pos.h.location, Math.round(location.top));
          assert.equal(pos.v.location, Math.round(location.left));
        });
        QUnit.test('coordinates should be rounded by default in calculatePosition method', function(assert) {
          var $where = $('#where').css({
            top: 0,
            left: 0
          });
          translator.move($where, {
            top: 0.5,
            left: 0.5
          });
          var location = translator.locate($where);
          var pos = calculatePosition($('#what'), {
            of: $where,
            at: 'top left',
            my: 'top left'
          });
          assert.equal(pos.h.location, Math.round(location.top));
          assert.equal(pos.v.location, Math.round(location.left));
        });
        QUnit.test('coordinates should not be rounded if option precise is true in position method', function(assert) {
          var $where = $('#where').css({
            top: 0,
            left: 0
          });
          var $what = $('#what').css({
            'margin-top': 0.5,
            'margin-left': 0.5
          });
          translator.move($where, {
            top: 0.5,
            left: 0.5
          });
          var location = translator.locate($where);
          setupPosition($what, {
            precise: true,
            of: $where,
            at: 'top left',
            my: 'top left'
          });
          var pos = translator.locate($what);
          assert.equal(pos.top, location.top - $where.offset().top);
          assert.equal(pos.left, location.left - $where.offset().left);
        });
        QUnit.test('coordinates should be rounded if option precise is false in position method', function(assert) {
          var $where = $('#where').css({
            top: 0,
            left: 0
          });
          var $what = $('#what').css({
            'margin-top': 0.5,
            'margin-left': 0.5
          });
          translator.move($where, {
            top: 0.5,
            left: 0.5
          });
          var location = translator.locate($where);
          setupPosition($what, {
            precise: false,
            of: $where,
            at: 'top left',
            my: 'top left'
          });
          var pos = translator.locate($what);
          assert.equal(pos.top, Math.round(location.top - $where.offset().top));
          assert.equal(pos.left, Math.round(location.left - $where.offset().left));
        });
        QUnit.test('coordinates should be rounded by default in position method', function(assert) {
          var $where = $('#where').css({
            top: 0,
            left: 0
          });
          var $what = $('#what').css({
            'margin-top': 0.5,
            'margin-left': 0.5
          });
          translator.move($where, {
            top: 0.5,
            left: 0.5
          });
          var location = translator.locate($where);
          setupPosition($what, {
            of: $where,
            at: 'top left',
            my: 'top left'
          });
          var pos = translator.locate($what);
          assert.equal(pos.top, Math.round(location.top - $where.offset().top));
          assert.equal(pos.left, Math.round(location.left - $where.offset().left));
        });
        QUnit.test('coordinates should not be rounded if option precise is true in calculatePosition used in position method as params', function(assert) {
          var $where = $('#where').css({
            top: 0,
            left: 0
          });
          var $what = $('#what').css({
            'margin-top': 0.5,
            'margin-left': 0.5
          });
          translator.move($where, {
            top: 0.5,
            left: 0.5
          });
          var location = translator.locate($where);
          var positionResult = calculatePosition($what, {
            precise: true,
            of: $where,
            at: 'top left',
            my: 'top left'
          });
          setupPosition($what, positionResult);
          var pos = translator.locate($what);
          assert.equal(pos.top, location.top - $where.offset().top);
          assert.equal(pos.left, location.left - $where.offset().left);
        });
        QUnit.test('coordinates should be rounded if option precise is false in calculatePosition used in position method as params', function(assert) {
          var $where = $('#where').css({
            top: 0,
            left: 0
          });
          var $what = $('#what').css({
            'margin-top': 0.5,
            'margin-left': 0.5
          });
          translator.move($where, {
            top: 0.5,
            left: 0.5
          });
          var location = translator.locate($where);
          var positionResult = calculatePosition($what, {
            precise: false,
            of: $where,
            at: 'top left',
            my: 'top left'
          });
          setupPosition($what, positionResult);
          var pos = translator.locate($what);
          assert.equal(pos.top, Math.round(location.top - $where.offset().top));
          assert.equal(pos.left, Math.round(location.left - $where.offset().left));
        });
      })();
      (function oversizeModule() {
        QUnit.module('oversize');
        QUnit.test('oversize should calculated when flip or fit', function(assert) {
          fixtures.customBoundaryWithLeftTopOffset.create();
          try {
            var $what = $('#what').height(300);
            var $where = $('#where');
            var $boundary = $('#boundary');
            var resultPosition = setupPosition($what, {
              my: 'bottom right',
              at: 'top left',
              of: $where,
              boundary: $boundary,
              collision: 'fit flip'
            });
            assert.equal(resultPosition.h.oversize, 50, 'horizontal oversize calculated correctly');
            assert.equal(resultPosition.v.oversize, 150, 'vertical oversize calculated correctly');
            assert.equal(resultPosition.h.collisionSide, 'left', 'horizontal collision side is correct');
            assert.equal(resultPosition.v.collisionSide, 'top', 'vertical collision side is correct');
          } finally {
            fixtures.customBoundaryWithLeftTopOffset.drop();
          }
        });
        QUnit.test('oversize should be 0 when collision is none', function(assert) {
          fixtures.customBoundaryWithLeftTopOffset.create();
          try {
            var $what = $('#what').height(300);
            var $where = $('#where');
            var $boundary = $('#boundary');
            var resultPosition = setupPosition($what, {
              my: 'bottom right',
              at: 'top left',
              of: $where,
              boundary: $boundary,
              collision: 'none none'
            });
            assert.equal(resultPosition.h.oversize, 0, 'horizontal oversize calculated correctly');
            assert.equal(resultPosition.v.oversize, 0, 'vertical oversize calculated correctly');
          } finally {
            fixtures.customBoundaryWithLeftTopOffset.drop();
          }
        });
      })();
      (function elementOffsetModule() {
        QUnit.module('offset module', {
          beforeEach: function() {
            fixtures.simple.create();
          },
          afterEach: function() {
            fixtures.simple.drop();
          }
        });
        QUnit.test('position offset should be equal jQuery offset for DOM nodes', function(assert) {
          var $element = $('#where').css({
            top: 100,
            left: 40
          });
          assert.deepEqual(positionUtils.offset($element), $element.offset(), 'position.offset() is correct');
        });
        QUnit.test('position offset should be null for window', function(assert) {
          assert.deepEqual(positionUtils.offset($(window)), null, 'position.offset() is correct');
        });
        QUnit.test('position offset should have pageX and pageY for Events', function(assert) {
          var position = {
            pageX: 100,
            pageY: 200
          };
          var $event = new $.Event('dxpointerdown', position);
          assert.deepEqual(positionUtils.offset($event), {
            left: 100,
            top: 200
          }, 'position.offset() is correct');
        });
        QUnit.test('position should return window.innerHeight if window.outerHeight < window.innerHeight', function(assert) {
          var $what = $('#what').height(300);
          var initialInnerHeight = window.innerHeight;
          var initialOuterHeight = window.outerHeight;
          try {
            window.innerHeight = 500;
            window.outerHeight = 200;
            var resultPosition = setupPosition($what, {of: $(window)});
            assert.roughEqual(resultPosition.v.location, 100, 50, 'vertical location is correct');
          } finally {
            window.innerHeight = initialInnerHeight;
            window.outerHeight = initialOuterHeight;
          }
        });
        QUnit.test('position should return window.height() if window.outerHeight == window.innerHeight (T939748)', function(assert) {
          var isPhone = devices.real().deviceType === 'phone';
          if (isPhone || browser.safari) {
            assert.ok(true, 'actual only for desktop browsers except Safari');
            return;
          }
          var $what = $('#what').height(300);
          var initialInnerHeight = window.innerHeight;
          var initialOuterHeight = window.outerHeight;
          var heightStub = sinon.stub(implementationsMap, 'getHeight').returns(1000);
          try {
            window.innerHeight = 500;
            window.outerHeight = 500;
            var resultPosition = setupPosition($what, {of: $(window)});
            assert.roughEqual(resultPosition.v.location, 350, 50, 'vertical location is correct');
          } finally {
            window.innerHeight = initialInnerHeight;
            window.outerHeight = initialOuterHeight;
            heightStub.restore();
          }
        });
        QUnit.test('position should return window.width() if window.outerWidth == window.innerWidth (T939748)', function(assert) {
          var isPhone = devices.real().deviceType === 'phone';
          if (isPhone || browser.safari) {
            assert.ok(true, 'actual only for desktop browsers except Safari');
            return;
          }
          var $what = $('#what').width(300);
          var initialInnerWidth = window.innerWidth;
          var initialOuterWidth = window.outerWidth;
          var widthStub = sinon.stub(implementationsMap, 'getWidth').returns(1000);
          try {
            window.innerWidth = 500;
            window.outerWidth = 500;
            var resultPosition = setupPosition($what, {of: $(window)});
            assert.roughEqual(resultPosition.h.location, 350, 50, 'horizontal location is correct');
          } finally {
            window.innerWidth = initialInnerWidth;
            window.outerWidth = initialOuterWidth;
            widthStub.restore();
          }
        });
        QUnit.test('position should be correct relative to the viewport on mobile devices', function(assert) {
          if (devices.real().deviceType !== 'phone') {
            assert.ok(true, 'only for mobile devices');
            return;
          }
          var $what = $('#what').height(300).width(300);
          var initialVisualViewport = window.visualViewport;
          try {
            window.visualViewport = {
              height: 800,
              width: 800,
              offsetTop: 0,
              offsetLeft: 0
            };
            var resultPosition = setupPosition($what, {of: $(window)});
            assert.roughEqual(resultPosition.v.location, 250, 50, 'vertical location is correct');
            assert.roughEqual(resultPosition.h.location, 250, 50, 'vertical location is correct');
          } finally {
            window.visualViewport = initialVisualViewport;
          }
        });
        QUnit.test('position should be correct relative to the viewport on mobile devices when window is scrolled', function(assert) {
          if (devices.real().deviceType !== 'phone') {
            assert.ok(true, 'only for mobile devices');
            return;
          }
          var $what = $('#what').height(300).width(300);
          var initialVisualViewport = window.visualViewport;
          try {
            window.visualViewport = {
              height: 800,
              width: 800,
              offsetTop: 300,
              offsetLeft: 200
            };
            var resultPosition = setupPosition($what, {of: $(window)});
            assert.roughEqual(resultPosition.v.location, 550, 50, 'vertical location is correct');
            assert.roughEqual(resultPosition.h.location, 450, 50, 'horizontal location is correct');
          } finally {
            window.visualViewport = initialVisualViewport;
          }
        });
        QUnit.test('position should be correct relative to the viewport on mobile devices when window is scrolled and window.scrollTop is bigger than visualViewport.offsetTop (T750017)', function(assert) {
          var isPhone = devices.real().deviceType === 'phone';
          var isAndroid = devices.real().platform === 'android';
          if (!isPhone || isAndroid) {
            assert.ok(true, 'only for non-android mobiles');
            return;
          }
          var $what = $('#what').height(300).width(300);
          var initialVisualViewport = window.visualViewport;
          try {
            window.scrollBy(500, 500);
            window.visualViewport = {
              height: 800,
              width: 800,
              offsetTop: 300,
              offsetLeft: 200
            };
            var resultPosition = setupPosition($what, {of: $(window)});
            assert.roughEqual(resultPosition.v.location, 750, 50, 'vertical location is correct');
            assert.roughEqual(resultPosition.h.location, 750, 50, 'horizontal location is correct');
          } finally {
            window.visualViewport = initialVisualViewport;
            window.scroll(0, 0);
          }
        });
        QUnit.test('setup should call resetPosition with finishTransition argument', function(assert) {
          var origResetPosition = translator.resetPosition;
          translator.resetPosition = function($element, finishTransition) {
            assert.equal(finishTransition, true, 'finishTransition is true');
          };
          try {
            var $what = $('#what').width(100);
            setupPosition($what, {of: $(window)});
          } finally {
            translator.resetPosition = origResetPosition;
          }
        });
      })();
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/position","animation/translator","core/utils/browser","../../helpers/positionFixtures.js","core/devices.js","core/utils/size","core/utils/window.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/position"), require("animation/translator"), require("core/utils/browser"), require("../../helpers/positionFixtures.js"), require("core/devices.js"), require("core/utils/size"), require("core/utils/window.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=position.tests.js.map