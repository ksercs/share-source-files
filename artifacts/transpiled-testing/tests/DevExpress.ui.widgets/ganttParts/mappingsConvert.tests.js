!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/mappingsConvert.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/mappingsConvert.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      options,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      options = $__m.options;
    }],
    execute: function() {
      var $__3;
      (($__3 = QUnit, test = $__3.test, $__3));
      moduleConfig = {
        beforeEach: function() {
          var $__2 = this;
          this.createInstance = function(settings) {
            $__2.instance = $__2.$element.dxGantt(settings).dxGantt('instance');
          };
          this.$element = $('#gantt');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('Mappings convert', moduleConfig, function() {
        test('Task data convert', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var tasksMap = {
            dataSource: [],
            keyExpr: 'Id',
            parentIdExpr: 'ParentId',
            titleExpr: 'ItemName',
            startExpr: 'SprintStartDate',
            colorExpr: 'TaskColor',
            endExpr: 'SprintEndDate',
            progressExpr: 'TaskProgress'
          };
          this.instance.option('tasks', tasksMap);
          var start = new Date('2019-02-11T05:00:00.000Z');
          var end = new Date('2019-02-14T05:00:00.000Z');
          var data = {
            title: 'custom text',
            start: start,
            end: end,
            progress: 31,
            color: 'red'
          };
          var mappedData = this.instance._mappingHelper.convertCoreToMappedData('tasks', data);
          assert.equal(mappedData['ItemName'], 'custom text', 'title was mapped');
          assert.equal(mappedData['SprintStartDate'], start, 'start was mapped');
          assert.equal(mappedData['SprintEndDate'], end, 'end was mapped');
          assert.equal(mappedData['TaskProgress'], 31, 'progress was mapped');
          assert.equal(mappedData['TaskColor'], 'red', 'color was mapped');
          var coreData = this.instance._mappingHelper.convertMappedToCoreData('tasks', mappedData);
          assert.equal(coreData['title'], 'custom text', 'title was mapped');
          assert.equal(coreData['start'], start, 'start was mapped');
          assert.equal(coreData['end'], end, 'end was mapped');
          assert.equal(coreData['progress'], 31, 'progress was mapped');
          assert.equal(coreData['color'], 'red', 'color was mapped');
          var fields = ['title', 'start', 'end', 'progress', 'color'];
          var mappedFields = this.instance._mappingHelper.convertCoreToMappedFields('tasks', fields);
          assert.equal(mappedFields.length, fields.length, 'length ok');
          assert.ok(mappedFields.indexOf('ItemName') > -1, 'title was mapped');
          assert.ok(mappedFields.indexOf('SprintStartDate') > -1, 'start was mapped');
          assert.ok(mappedFields.indexOf('SprintEndDate') > -1, 'end was mapped');
          assert.ok(mappedFields.indexOf('TaskProgress') > -1, 'progress was mapped');
          assert.ok(mappedFields.indexOf('TaskColor') > -1, 'color was mapped');
          var coreFields = this.instance._mappingHelper.convertMappedToCoreFields('tasks', mappedFields);
          assert.equal(coreFields.length, fields.length, 'length ok');
          assert.ok(coreFields.indexOf('title') > -1, 'title in list');
          assert.ok(coreFields.indexOf('start') > -1, 'start in list');
          assert.ok(coreFields.indexOf('end') > -1, 'end in list');
          assert.ok(coreFields.indexOf('progress') > -1, 'progress in list');
          assert.ok(coreFields.indexOf('color') > -1, 'color in list');
        });
        test('Dependency data convert', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var dependencyMap = {
            dataSource: [],
            keyExpr: 'Id',
            predecessorIdExpr: 'PredecessorTask',
            successorIdExpr: 'SuccessorTask',
            typeExpr: 'DependencyType'
          };
          this.instance.option('dependencies', dependencyMap);
          var data = {
            predecessorId: 3,
            successorId: 4,
            type: 0
          };
          var mappedData = this.instance._mappingHelper.convertCoreToMappedData('dependencies', data);
          assert.equal(mappedData['PredecessorTask'], 3, 'predecessorId was mapped');
          assert.equal(mappedData['SuccessorTask'], 4, 'successorId was mapped');
          assert.equal(mappedData['DependencyType'], 0, 'type was mapped');
          var coreData = this.instance._mappingHelper.convertMappedToCoreData('dependencies', mappedData);
          assert.equal(coreData['predecessorId'], 3, 'predecessorId was mapped');
          assert.equal(coreData['successorId'], 4, 'successorId was mapped');
          assert.equal(coreData['type'], 0, 'type was mapped');
          var fields = ['predecessorId', 'successorId', 'type'];
          var mappedFields = this.instance._mappingHelper.convertCoreToMappedFields('dependencies', fields);
          assert.equal(mappedFields.length, fields.length, 'length ok');
          assert.ok(mappedFields.indexOf('PredecessorTask') > -1, 'PredecessorTask was mapped');
          assert.ok(mappedFields.indexOf('SuccessorTask') > -1, 'SuccessorTask was mapped');
          assert.ok(mappedFields.indexOf('DependencyType') > -1, 'DependencyType was mapped');
          var coreFields = this.instance._mappingHelper.convertMappedToCoreFields('dependencies', mappedFields);
          assert.equal(coreFields.length, fields.length, 'length ok');
          assert.ok(coreFields.indexOf('predecessorId') > -1, 'predecessorId in list');
          assert.ok(coreFields.indexOf('successorId') > -1, 'successorId in list');
          assert.ok(coreFields.indexOf('type') > -1, 'type in list');
        });
        test('Resource data convert', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var resourceMap = {
            dataSource: [],
            keyExpr: 'Id',
            textExpr: 'ResourceText',
            colorExpr: 'ResourceColor'
          };
          this.instance.option('resources', resourceMap);
          var data = {
            text: 'My text',
            color: 'black'
          };
          var mappedData = this.instance._mappingHelper.convertCoreToMappedData('resources', data);
          assert.equal(mappedData['ResourceText'], 'My text', 'ResourceText was mapped');
          assert.equal(mappedData['ResourceColor'], 'black', 'ResourceColor was mapped');
          var coreData = this.instance._mappingHelper.convertMappedToCoreData('resources', mappedData);
          assert.equal(coreData['text'], 'My text', 'text was mapped');
          assert.equal(coreData['color'], 'black', 'color was mapped');
          var fields = ['text', 'color'];
          var mappedFields = this.instance._mappingHelper.convertCoreToMappedFields('resources', fields);
          assert.equal(mappedFields.length, fields.length, 'length ok');
          assert.ok(mappedFields.indexOf('ResourceText') > -1, 'ResourceText was mapped');
          assert.ok(mappedFields.indexOf('ResourceColor') > -1, 'ResourceColor was mapped');
          var coreFields = this.instance._mappingHelper.convertMappedToCoreFields('resources', mappedFields);
          assert.equal(coreFields.length, fields.length, 'length ok');
          assert.ok(coreFields.indexOf('text') > -1, 'text in list');
          assert.ok(coreFields.indexOf('color') > -1, 'color in list');
        });
        test('Assignment data convert', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var assignmentMap = {
            dataSource: [],
            keyExpr: 'Id',
            taskIdExpr: 'TaskKey',
            resourceIdExpr: 'ResourceKey'
          };
          this.instance.option('resourceAssignments', assignmentMap);
          var data = {
            taskId: 1,
            resourceId: 2
          };
          var mappedData = this.instance._mappingHelper.convertCoreToMappedData('resourceAssignments', data);
          assert.equal(mappedData['TaskKey'], 1, 'TaskKey was mapped');
          assert.equal(mappedData['ResourceKey'], 2, 'ResourceKey was mapped');
          var coreData = this.instance._mappingHelper.convertMappedToCoreData('resourceAssignments', mappedData);
          assert.equal(coreData['taskId'], 1, 'taskId was mapped');
          assert.equal(coreData['resourceId'], 2, 'resourceId was mapped');
          var fields = ['taskId', 'resourceId'];
          var mappedFields = this.instance._mappingHelper.convertCoreToMappedFields('resourceAssignments', fields);
          assert.equal(mappedFields.length, fields.length, 'length ok');
          assert.ok(mappedFields.indexOf('TaskKey') > -1, 'TaskKey was mapped');
          assert.ok(mappedFields.indexOf('ResourceKey') > -1, 'ResourceKey was mapped');
          var coreFields = this.instance._mappingHelper.convertMappedToCoreFields('resourceAssignments', mappedFields);
          assert.equal(coreFields.length, fields.length, 'length ok');
          assert.ok(coreFields.indexOf('taskId') > -1, 'taskId in list');
          assert.ok(coreFields.indexOf('resourceId') > -1, 'resourceId in list');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=mappingsConvert.tests.js.map