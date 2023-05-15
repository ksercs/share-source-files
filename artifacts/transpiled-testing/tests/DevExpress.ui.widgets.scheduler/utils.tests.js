!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/utils.tests.js"], ["ui/scheduler/utils.timeZone","ui/scheduler/timezones/utils.timezones_data","ui/scheduler/utils","ui/scheduler/appointments/dataProvider/utils"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/utils.tests.js", ["ui/scheduler/utils.timeZone", "ui/scheduler/timezones/utils.timezones_data", "ui/scheduler/utils", "ui/scheduler/appointments/dataProvider/utils"], function($__export) {
  "use strict";
  var timeZoneUtils,
      timeZoneDataUtils,
      utils,
      replaceWrongEndDate,
      test,
      module;
  return {
    setters: [function($__m) {
      timeZoneUtils = $__m.default;
    }, function($__m) {
      timeZoneDataUtils = $__m.default;
    }, function($__m) {
      utils = $__m.utils;
    }, function($__m) {
      replaceWrongEndDate = $__m.replaceWrongEndDate;
    }],
    execute: function() {
      var $__3;
      (($__3 = QUnit, test = $__3.test, module = $__3.module, $__3));
      module('Time zone data utils', {}, function() {
        test('Untils should be pre-processed and cached', function(assert) {
          var spyGetUtcOffset = sinon.spy(timeZoneDataUtils, 'getUtcOffset');
          var spyGetTimeZoneDeclarationTupleCore = sinon.spy(timeZoneDataUtils, 'getTimeZoneDeclarationTupleCore');
          var checkCache = function(timeZoneId, dateTimeStamp, expectedCacheSize) {
            timeZoneDataUtils.getTimeZoneOffsetById(timeZoneId, dateTimeStamp);
            var lastCallIndex = spyGetUtcOffset.args.length - 1;
            var offsetByIdCallArgument = spyGetUtcOffset.args[lastCallIndex][0];
            var cachedValue = timeZoneDataUtils._tzCache.tryGet(timeZoneId);
            timeZoneDataUtils.getTimeZoneDeclarationTuple(timeZoneId, dateTimeStamp);
            lastCallIndex = spyGetTimeZoneDeclarationTupleCore.args.length - 1;
            var declarationTupleCallArgument = spyGetTimeZoneDeclarationTupleCore.args[lastCallIndex][0];
            assert.equal(timeZoneDataUtils._tzCache.map.size, expectedCacheSize, 'Cache size should be correct');
            assert.equal(cachedValue, offsetByIdCallArgument, 'Function call argument of `getUtcOffset` should be cached');
            assert.equal(cachedValue, declarationTupleCallArgument, 'Function call argument of `getTimeZoneDeclarationTupleCore` should be cached');
          };
          try {
            assert.equal(timeZoneDataUtils._tzCache.map.size, 0, 'Timezone cache should be empty');
            checkCache('America/Los_Angeles', new Date(2021, 3, 3), 1);
            checkCache('America/Los_Angeles', new Date(2021, 3, 3), 1);
            checkCache('Europe/Berlin', new Date(2021, 3, 3), 2);
            checkCache('Europe/Berlin', new Date(2021, 3, 3), 2);
            checkCache('Africa/Addis_Ababa', 2021, 3);
          } catch (error) {
            spyGetUtcOffset.restore();
            spyGetTimeZoneDeclarationTupleCore.restore();
            assert.ok(false, 'test throw an error');
          }
        });
      });
      module('Time zone utils', {}, function() {
        test('hasDSTInLocalTimeZone', function(assert) {
          var hasDST = timeZoneUtils.hasDSTInLocalTimeZone();
          var nowDate = new Date(Date.now());
          var startDate = new Date();
          var endDate = new Date();
          startDate.setFullYear(nowDate.getFullYear(), 0, 1);
          endDate.setFullYear(nowDate.getFullYear(), 6, 1);
          assert.equal(hasDST, startDate.getTimezoneOffset() !== endDate.getTimezoneOffset(), 'function should return valid result');
        });
        test('isEqualLocalTimeZone', function(assert) {
          var result = timeZoneUtils.isEqualLocalTimeZone('Brazil/Acre', new Date(2021, 6, 6));
          assert.notOk(result, 'local time zone shouldn\'t equal to \'Brazil/Acre\'');
        });
        test('isEqualLocalTimeZoneByDeclaration', function(assert) {
          var result = timeZoneUtils.isEqualLocalTimeZoneByDeclaration('Brazil/Acre', new Date(2021, 6, 6));
          assert.notOk(result, 'local time zone shouldn\'t equal to \'Brazil/Acre\'');
        });
      });
      module('Date utils', function() {
        test('"replaceWrongEndDate" should process endDate correctly', function(assert) {
          [{
            data: {
              startDate: new Date(2019, 4, 3, 12),
              allDay: false
            },
            expectedEndDate: new Date(2019, 4, 3, 12, 30)
          }, {
            data: {
              startDate: new Date(2019, 4, 3, 12),
              allDay: false,
              endDate: new Date('string')
            },
            expectedEndDate: new Date(2019, 4, 3, 12, 30)
          }, {
            data: {
              startDate: new Date(2019, 4, 3, 12),
              allDay: true
            },
            expectedEndDate: new Date(2019, 4, 3, 23, 59)
          }].forEach(function(testCase) {
            var dataAccessors = utils.dataAccessors.create({
              startDate: 'startDate',
              endDate: 'endDate',
              allDay: 'allDay'
            }, undefined, true);
            replaceWrongEndDate(testCase.data, new Date(2019, 4, 3, 12), testCase.data.endDate, 30, dataAccessors);
            assert.equal(testCase.data.endDate.getHours(), testCase.expectedEndDate.getHours(), 'replaced endDate is ok');
            assert.equal(testCase.data.endDate.getMinutes(), testCase.expectedEndDate.getMinutes(), 'replaced endDate is ok');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/scheduler/utils.timeZone","ui/scheduler/timezones/utils.timezones_data","ui/scheduler/utils","ui/scheduler/appointments/dataProvider/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/scheduler/utils.timeZone"), require("ui/scheduler/timezones/utils.timezones_data"), require("ui/scheduler/utils"), require("ui/scheduler/appointments/dataProvider/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.tests.js.map