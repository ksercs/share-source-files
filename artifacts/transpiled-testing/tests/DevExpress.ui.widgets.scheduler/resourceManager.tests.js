!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/resourceManager.tests.js"], ["jquery","ui/scheduler/resources/utils","data/data_source/data_source","data/custom_store"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/resourceManager.tests.js", ["jquery", "ui/scheduler/resources/utils", "data/data_source/data_source", "data/custom_store"], function($__export) {
  "use strict";
  var $,
      getWrappedDataSource,
      createResourcesTree,
      createResourceEditorModel,
      getPaintedResources,
      filterResources,
      getOrLoadResourceItem,
      getResourceColor,
      getResourceTreeLeaves,
      groupAppointmentsByResourcesCore,
      getResourcesDataByGroups,
      reduceResourcesTree,
      setResourceToAppointment,
      createExpressions,
      getDataAccessors,
      loadResources,
      DataSource,
      CustomStore,
      testData,
      resourceData,
      promiseData,
      resourceDataWithDataSource;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      getWrappedDataSource = $__m.getWrappedDataSource;
      createResourcesTree = $__m.createResourcesTree;
      createResourceEditorModel = $__m.createResourceEditorModel;
      getPaintedResources = $__m.getPaintedResources;
      filterResources = $__m.filterResources;
      getOrLoadResourceItem = $__m.getOrLoadResourceItem;
      getResourceColor = $__m.getResourceColor;
      getResourceTreeLeaves = $__m.getResourceTreeLeaves;
      groupAppointmentsByResourcesCore = $__m.groupAppointmentsByResourcesCore;
      getResourcesDataByGroups = $__m.getResourcesDataByGroups;
      reduceResourcesTree = $__m.reduceResourcesTree;
      setResourceToAppointment = $__m.setResourceToAppointment;
      createExpressions = $__m.createExpressions;
      getDataAccessors = $__m.getDataAccessors;
      loadResources = $__m.loadResources;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      CustomStore = $__m.default;
    }],
    execute: function() {
      testData = {
        rooms: [{
          text: 'Room1',
          id: 1,
          color: '#cb6bb2'
        }, {
          text: 'Room2',
          id: 2,
          color: '#56ca85'
        }],
        owners: [{
          text: 'Jack',
          uid: 1,
          color: '#606060'
        }, {
          text: 'Mike',
          uid: 2,
          color: '#ff0000'
        }]
      };
      resourceData = [{
        field: 'roomId',
        label: 'Room',
        allowMultiple: false,
        dataSource: testData.rooms
      }, {
        fieldExpr: 'ownerId',
        label: 'Owner',
        allowMultiple: true,
        displayExpr: 'color',
        valueExpr: 'uid',
        dataSource: testData.owners
      }];
      promiseData = {
        resources: $.Deferred(),
        load: function() {
          promiseData.resources.resolve(testData.rooms);
        }
      };
      resourceDataWithDataSource = [{
        field: 'roomId',
        label: 'Room',
        allowMultiple: false,
        dataSource: new DataSource({store: new CustomStore({load: function(options) {
              return promiseData.resources.promise();
            }})})
      }];
      QUnit.module('getWrappedDataSource', function() {
        QUnit.test('JSON declaration should be wrapped to DataSource object', function(assert) {
          var filterValue = ['id', '=', 'emp1'];
          var dataSource = getWrappedDataSource({
            filter: filterValue,
            store: new CustomStore({load: function() {}})
          });
          assert.ok(dataSource instanceof DataSource, 'getWrappedDataSource should return DataSource object if JSON is passed');
          assert.deepEqual(dataSource.filter(), filterValue, 'Filter should be passed to the created dataSource');
        });
        QUnit.test('Array data should be wrapped to DataSource object', function(assert) {
          var dataSource = getWrappedDataSource([{id: 0}, {id: 1}]);
          assert.ok(dataSource instanceof DataSource, 'getWrappedDataSource should return DataSource object if array passed');
          assert.equal(dataSource.filter(), undefined, 'Filter shouldn\'t exist in DataSource');
        });
        QUnit.test('DataSource object shouldn\'t wrapped', function(assert) {
          var originalDataSource = new DataSource({store: new CustomStore({load: function() {}})});
          var dataSource = getWrappedDataSource(originalDataSource);
          assert.equal(dataSource, originalDataSource, 'result of getWrappedDataSource should be equal originalDataSource');
          assert.equal(dataSource.filter(), undefined, 'Filter shouldn\'t exist in DataSource');
        });
      });
      QUnit.test('Resources dataSource should not be wrapped if it\'s instance of the DataSource', function(assert) {
        var done = assert.async();
        var dataSource = new DataSource({store: testData.rooms});
        var resources = [{
          field: 'roomId',
          label: 'Room',
          allowMultiple: false,
          dataSource: dataSource
        }];
        getOrLoadResourceItem(resources, new Map(), 'roomId', 1).done(function() {
          assert.equal(dataSource.items().length, testData.rooms.length, 'DS items are OK');
          done();
        });
      });
      QUnit.test('Get editors for resources', function(assert) {
        var editors = createResourceEditorModel(resourceData, []);
        assert.equal(editors[0].dataField, 'roomId');
        assert.equal(editors[0].editorType, 'dxSelectBox');
        assert.equal(editors[0].label.text, 'Room');
        assert.equal(editors[0].editorOptions.displayExpr, 'text');
        assert.equal(editors[0].editorOptions.valueExpr, 'id');
        editors[0].editorOptions.dataSource.load();
        assert.deepEqual(editors[0].editorOptions.dataSource.items(), resourceData[0].dataSource);
        assert.equal(editors[1].dataField, 'ownerId');
        assert.equal(editors[1].editorType, 'dxTagBox');
        assert.equal(editors[1].label.text, 'Owner');
        assert.equal(editors[1].editorOptions.displayExpr, 'color');
        assert.equal(editors[1].editorOptions.valueExpr, 'uid');
        editors[1].editorOptions.dataSource.load();
        assert.deepEqual(editors[1].editorOptions.dataSource.items(), resourceData[1].dataSource);
      });
      QUnit.test('Resource editor should always have label', function(assert) {
        var resources = [{
          field: 'roomId',
          allowMultiple: false,
          dataSource: testData.rooms
        }];
        var editors = createResourceEditorModel(resources, []);
        assert.equal(editors[0].label.text, 'roomId');
      });
      QUnit.test('Get resource by field name and value', function(assert) {
        var done = assert.async();
        getOrLoadResourceItem(resourceData, new Map(), 'roomId', 2).done(function(data) {
          assert.deepEqual(data, resourceData[0].dataSource[1], 'Resource was found');
          done();
        });
      });
      QUnit.test('getDataAccessors should return dataAccessors ', function(assert) {
        var resources = [{
          field: 'outer.roomId',
          label: 'Room',
          allowMultiple: false,
          dataSource: [{
            text: 'Room1',
            id: 1,
            color: '#cb6bb2'
          }]
        }];
        var item = {
          text: 'Item 1',
          startDate: new Date(),
          outer: {
            roomId: 2,
            ownerId: [1, 2]
          }
        };
        var dataFields = createExpressions(resources);
        var resourceGetter = getDataAccessors(dataFields, 'outer.roomId', 'getter');
        var resourceSetter = getDataAccessors(dataFields, 'outer.roomId', 'setter');
        assert.equal(resourceGetter(item), 2, 'getter is ok');
        resourceSetter(item, 1);
        assert.equal(resourceGetter(item), 1, 'setter & getter is ok');
      });
      QUnit.test('getDataAccessors should return dataAccessors (use fieldExpr)', function(assert) {
        var resources = [{
          fieldExpr: 'outer.roomId',
          label: 'Room',
          allowMultiple: false,
          dataSource: [{
            text: 'Room1',
            id: 1,
            color: '#cb6bb2'
          }]
        }];
        var dataFields = createExpressions(resources);
        var item = {
          text: 'Item 1',
          startDate: new Date(),
          outer: {
            roomId: 2,
            ownerId: [1, 2]
          }
        };
        var resourceGetter = getDataAccessors(dataFields, 'outer.roomId', 'getter');
        var resourceSetter = getDataAccessors(dataFields, 'outer.roomId', 'setter');
        assert.equal(resourceGetter(item), 2, 'getter is ok');
        resourceSetter(item, 1);
        assert.equal(resourceGetter(item), 1, 'setter & getter is ok');
      });
      QUnit.test('getResourceTreeLeaves should work correctly when resource.field is expr', function(assert) {
        var done = assert.async();
        var resources = [{
          fieldExpr: 'outer.roomId',
          label: 'Room',
          allowMultiple: false,
          dataSource: [{id: 1}, {id: 2}]
        }, {
          field: 'ownerId',
          allowMultiple: true,
          dataSource: [{id: 1}, {id: 2}]
        }];
        var appointment = {
          text: 'Item 1',
          startDate: new Date(),
          outer: {roomId: 2},
          ownerId: [1, 2]
        };
        loadResources(['outer.roomId', 'ownerId'], resources, new Map()).done($.proxy(function(groups) {
          var tree = createResourcesTree(groups);
          var result = getResourceTreeLeaves(function(field, action) {
            return getDataAccessors(createExpressions(resources), field, action);
          }, tree, appointment);
          assert.deepEqual(result, [2, 3], 'Leaves are OK');
          done();
        }, this));
      });
      QUnit.test('Set resources to item', function(assert) {
        var item = {
          text: 'Item 1',
          startDate: new Date()
        };
        setResourceToAppointment(resourceData, createExpressions(resourceData), item, {roomId: 1});
        setResourceToAppointment(resourceData, createExpressions(resourceData), item, {ownerId: 1});
        assert.strictEqual(item.roomId, 1, 'Single resource has scalar value');
        assert.deepEqual(item.ownerId, [1], 'Multiple resource has array value');
      });
      QUnit.test('Get resources value by fields', function(assert) {
        var done = assert.async();
        loadResources(['ownerId'], resourceData, new Map()).done(function(groups) {
          assert.deepEqual(groups, [{
            name: 'ownerId',
            items: [{
              id: 1,
              text: '#606060',
              color: '#606060'
            }, {
              id: 2,
              text: '#ff0000',
              color: '#ff0000'
            }],
            data: [{
              uid: 1,
              text: 'Jack',
              color: '#606060'
            }, {
              uid: 2,
              text: 'Mike',
              color: '#ff0000'
            }]
          }], 'Groups are OK');
          done();
        });
      });
      QUnit.test('Get resources value by fields with long resource dataSource', function(assert) {
        var done = assert.async();
        setTimeout(function() {
          promiseData.load();
        });
        loadResources(['roomId'], resourceDataWithDataSource, new Map()).done(function(groups) {
          assert.deepEqual(groups, [{
            items: [{
              id: 1,
              text: 'Room1',
              color: '#cb6bb2'
            }, {
              id: 2,
              text: 'Room2',
              color: '#56ca85'
            }],
            name: 'roomId',
            data: [{
              id: 1,
              text: 'Room1',
              color: '#cb6bb2'
            }, {
              id: 2,
              text: 'Room2',
              color: '#56ca85'
            }]
          }], 'Groups are OK');
          done();
        });
      });
      QUnit.test('Get resources data with long resource dataSource', function(assert) {
        var done = assert.async();
        setTimeout(function() {
          promiseData.load();
        });
        getOrLoadResourceItem(resourceDataWithDataSource, new Map(), 'roomId', 2).done(function(data) {
          assert.deepEqual(data, {
            id: 2,
            text: 'Room2',
            color: '#56ca85'
          }, 'Groups are OK');
          done();
        });
      });
      QUnit.test('Get color for resource', function(assert) {
        var done = assert.async();
        getResourceColor(resourceData, new Map(), 'ownerId', 2).done(function(color) {
          assert.equal(color, testData.owners[1].color, 'Color is OK');
          done();
        });
      });
      QUnit.test('Get color for resource with colorExpr', function(assert) {
        var roomData = [{
          field: 'roomId',
          label: 'Room',
          allowMultiple: false,
          colorExpr: 'color1',
          dataSource: [{
            text: 'Room1',
            id: 1,
            color1: '#cb6bb2'
          }]
        }];
        var done = assert.async();
        getResourceColor(roomData, new Map(), 'roomId', 1).done(function(color) {
          assert.equal(color, roomData[0].dataSource[0].color1, 'Color is OK');
          done();
        });
      });
      QUnit.test('Get color for resource with valueExpr', function(assert) {
        var roomData = {
          field: 'roomId',
          label: 'Room',
          allowMultiple: false,
          valueExpr: 'Id',
          dataSource: [{
            text: 'Room1',
            Id: 1,
            color: '#cb6bb2'
          }]
        };
        var done = assert.async();
        var resourceLoaderMap = new Map();
        loadResources(['roomId'], [roomData], resourceLoaderMap).done($.proxy(function(groups) {
          getResourceColor([roomData], resourceLoaderMap, 'roomId', 1).done(function(color) {
            assert.equal(color, roomData.dataSource[0].color, 'Color is OK');
            done();
          });
        }, this));
      });
      QUnit.test('Color for undefined resource should be undefined', function(assert) {
        var done = assert.async();
        getResourceColor(resourceData, new Map(), 'ownerId', 777).done(function(color) {
          assert.strictEqual(color, undefined, 'Color for undefined resource is undefined');
          done();
        });
      });
      QUnit.test('Filter resources by fields', function(assert) {
        var resources = filterResources(resourceData, ['ownerId', 'groupId']);
        assert.deepEqual(resources, [resourceData[1]], 'Resources were found');
      });
      QUnit.test('Get resource for painting', function(assert) {
        var resources = [{field: 'roomId'}, {field: 'ownerId'}];
        assert.equal(getPaintedResources(resources).field, 'ownerId', 'Resource is right');
        assert.equal(getPaintedResources(resources, []).field, 'ownerId', 'Resource is right');
      });
      QUnit.test('Get resource for painting by group', function(assert) {
        var resources = [{field: 'ownerId'}, {field: 'roomId'}, {field: 'managerId'}];
        assert.equal(getPaintedResources(resources, ['ownerId', 'roomId']).field, 'roomId', 'Resource is right');
      });
      QUnit.test('Get resource for painting by the \'useColorAsDefault\' field', function(assert) {
        var resources = [{field: 'ownerId'}, {field: 'roomId'}, {
          field: 'managerId',
          useColorAsDefault: true
        }, {
          field: 'groupId',
          useColorAsDefault: true
        }];
        assert.equal(getPaintedResources(resources).field, 'managerId', 'Resource is right');
        assert.equal(getPaintedResources(resources, ['ownerId', 'roomId']).field, 'managerId', 'Resource is right');
      });
      QUnit.test('Get appointments by certain resources', function(assert) {
        var resources = [{field: 'ownerId'}, {field: 'roomId'}];
        var appointments = [{
          startDate: new Date(2016, 1, 2),
          endDate: new Date(2016, 1, 2, 1),
          ownerId: 1,
          roomId: 1
        }, {
          startDate: new Date(2016, 1, 3),
          endDate: new Date(2016, 1, 3, 1),
          ownerId: 2,
          roomId: 1
        }, {
          startDate: new Date(2016, 1, 3),
          endDate: new Date(2016, 1, 3, 1),
          ownerId: 1,
          roomId: 1
        }, {
          startDate: new Date(2016, 1, 3, 2),
          endDate: new Date(2016, 1, 3, 3),
          ownerId: 1,
          roomId: 2
        }, {
          startDate: new Date(2016, 1, 5),
          endDate: new Date(2016, 1, 5, 1),
          ownerId: [1, 2],
          roomId: 1
        }, {
          startDate: new Date(2016, 1, 4),
          endDate: new Date(2016, 1, 4, 1),
          ownerId: 2,
          roomId: 1
        }, {
          startDate: new Date(2016, 1, 4),
          endDate: new Date(2016, 1, 4, 1),
          ownerId: [1, 2],
          roomId: [1, 2]
        }];
        var config = {
          resources: resources,
          dataAccessors: createExpressions(resources)
        };
        var result = groupAppointmentsByResourcesCore(config, appointments, [{
          name: 'ownerId',
          items: [{id: 1}, {id: 2}]
        }, {
          name: 'roomId',
          items: [{id: 1}, {id: 2}]
        }]);
        assert.deepEqual(result, {
          '0': [appointments[0], appointments[2], appointments[4], appointments[6]],
          '1': [appointments[3], appointments[6]],
          '2': [appointments[1], appointments[4], appointments[5], appointments[6]],
          '3': [appointments[6]]
        }, 'Data is correct');
      });
      QUnit.test('Reduce resource tree depend on existing appointments', function(assert) {
        var done = assert.async();
        var resources = [{
          fieldExpr: 'o',
          allowMultiple: false,
          dataSource: [{
            id: 1,
            text: 'o1'
          }, {
            id: 2,
            text: 'o2'
          }]
        }, {
          fieldExpr: 'r',
          allowMultiple: true,
          dataSource: [{
            id: 1,
            text: 'r1'
          }, {
            id: 2,
            text: 'r2'
          }, {
            id: 3,
            text: 'r3'
          }]
        }, {
          fieldExpr: 'a',
          allowMultiple: false,
          dataSource: [{
            id: 1,
            text: 'a1'
          }, {
            id: 2,
            text: 'a2'
          }]
        }];
        var appointments = [{
          o: 1,
          r: [1, 2],
          a: 1
        }, {
          o: 1,
          r: [3],
          a: 1
        }];
        loadResources(['o', 'r', 'a'], resources, new Map()).done($.proxy(function(groups) {
          var tree = createResourcesTree(groups);
          var reducedTree = reduceResourcesTree(function(field, action) {
            return getDataAccessors(createExpressions(resources), field, action);
          }, tree, appointments);
          assert.equal(reducedTree.length, 1, 'reducedTree has 1 item');
          assert.equal(reducedTree[0].name, 'o', 'reducedTree has correct name');
          assert.equal(reducedTree[0].value, 1, 'reducedTree has correct value');
          assert.equal(reducedTree[0].title, 'o1', 'reducedTree has correct title');
          assert.deepEqual(reducedTree[0].data, {
            id: 1,
            text: 'o1'
          }, 'reducedTree has correct data object');
          assert.deepEqual(reducedTree[0].children, [{
            name: 'r',
            value: 1,
            title: 'r1',
            children: [{
              name: 'a',
              value: 1,
              title: 'a1',
              children: [],
              data: {
                id: 1,
                text: 'a1'
              }
            }],
            data: {
              id: 1,
              text: 'r1'
            }
          }, {
            name: 'r',
            value: 2,
            title: 'r2',
            children: [{
              name: 'a',
              title: 'a1',
              value: 1,
              children: [],
              data: {
                id: 1,
                text: 'a1'
              }
            }],
            data: {
              id: 2,
              text: 'r2'
            }
          }, {
            name: 'r',
            value: 3,
            title: 'r3',
            children: [{
              name: 'a',
              title: 'a1',
              value: 1,
              children: [],
              data: {
                id: 1,
                text: 'a1'
              }
            }],
            data: {
              id: 3,
              text: 'r3'
            }
          }], 'reducedTree has correct children array');
          done();
        }, this));
      });
      QUnit.test('Resource data should be loaded correctly is data source is config object', function(assert) {
        var resources = [{
          field: 'ownerId',
          dataSource: {store: [{id: 1}]}
        }];
        var done = assert.async();
        getOrLoadResourceItem(resources, new Map(), 'ownerId', 1).done(function(result) {
          assert.deepEqual(result, {id: 1}, 'Resource data is right');
          done();
        });
      });
      QUnit.test('Resource data should be loaded correctly is data source is string', function(assert) {
        var json = {id: 1};
        var xhr = sinon.useFakeXMLHttpRequest();
        var requests = [];
        xhr.onCreate = function(x) {
          requests.push(x);
        };
        var resources = [{
          field: 'ownerId',
          dataSource: 'api/appointments'
        }];
        var done = assert.async();
        getOrLoadResourceItem(resources, new Map(), 'ownerId', 1).done(function(result) {
          assert.deepEqual(result, {id: 1}, 'Resource data is right');
          xhr.restore();
          done();
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify(json));
      });
      QUnit.test('Load should be called once for several resources', function(assert) {
        var count = 0;
        var deferred = $.Deferred();
        var resources = [{
          fieldExpr: 'ownerId',
          allowMultiple: true,
          dataSource: new DataSource(new CustomStore({load: function() {
              count++;
              return deferred.promise();
            }}))
        }];
        var loaderMap = new Map();
        getOrLoadResourceItem(resources, loaderMap, 'ownerId', 1).done(function(res) {
          assert.deepEqual(res, {
            text: 'o1',
            id: 1
          }, 'Resource data is right');
        });
        getOrLoadResourceItem(resources, loaderMap, 'ownerId', 2);
        getOrLoadResourceItem(resources, loaderMap, 'ownerId', 1);
        deferred.resolve([{
          text: 'o1',
          id: 1
        }, {
          text: 'o2',
          id: 2
        }]);
        assert.equal(count, 1, 'Resources are loaded only once');
      });
      QUnit.test('getResourcesData should be correct after reloading resources', function(assert) {
        var roomData = {
          field: 'roomId',
          label: 'Room',
          allowMultiple: false,
          valueExpr: 'Id',
          dataSource: [{
            text: 'Room1',
            Id: 1,
            color: '#cb6bb2'
          }]
        };
        var done = assert.async();
        loadResources(['roomId'], [roomData], new Map()).done($.proxy(function(loadedResources) {
          assert.equal(loadedResources.length, 1, 'getResourcesData works correctly');
          loadResources([], [roomData]).done($.proxy(function(loadedResources) {
            assert.deepEqual(loadedResources, [], 'getResourcesData works correctly');
            done();
          }, this));
        }, this));
      });
      [{
        name: 'Rooms single',
        loadingGroups: ['roomId'],
        groups: [{roomId: 0}],
        expected: [{
          data: [{
            Id: 0,
            color: '#cb6bb2',
            text: 'Room1'
          }],
          items: [{
            color: '#cb6bb2',
            id: 0,
            text: 'Room1'
          }],
          name: 'roomId'
        }]
      }, {
        name: 'Rooms multiple',
        loadingGroups: ['roomId'],
        groups: [{roomId: 0}, {roomId: 2}],
        expected: [{
          data: [{
            Id: 0,
            color: '#cb6bb2',
            text: 'Room1'
          }, {
            Id: 2,
            color: '#cb6bb3',
            text: 'Room2'
          }],
          items: [{
            id: 0,
            color: '#cb6bb2',
            text: 'Room1'
          }, {
            id: 2,
            color: '#cb6bb3',
            text: 'Room2'
          }],
          name: 'roomId'
        }]
      }, {
        name: 'Phones single',
        loadingGroups: ['phoneId'],
        groups: [{phoneId: 0}],
        expected: [{
          data: [{
            Id: 0,
            text: 'Phone1',
            color: '#cd6bb2'
          }],
          items: [{
            id: 0,
            text: 'Phone1',
            color: '#cd6bb2'
          }],
          name: 'phoneId'
        }]
      }, {
        name: 'Phones multiple',
        loadingGroups: ['phoneId'],
        groups: [{phoneId: 0}, {phoneId: 3}],
        expected: [{
          data: [{
            Id: 0,
            text: 'Phone1',
            color: '#cd6bb2'
          }, {
            Id: 3,
            text: 'Phone3',
            color: '#cd6bb4'
          }],
          items: [{
            id: 0,
            text: 'Phone1',
            color: '#cd6bb2'
          }, {
            id: 3,
            text: 'Phone3',
            color: '#cd6bb4'
          }],
          name: 'phoneId'
        }]
      }, {
        name: 'Rooms, Phones multiple',
        loadingGroups: ['roomId', 'phoneId'],
        groups: [{roomId: 2}, {roomId: 3}, {phoneId: 0}, {phoneId: 3}],
        expected: [{
          data: [{
            Id: 2,
            color: '#cb6bb3',
            text: 'Room2'
          }, {
            Id: 3,
            color: '#cb6bb4',
            text: 'Room3'
          }],
          items: [{
            id: 2,
            color: '#cb6bb3',
            text: 'Room2'
          }, {
            id: 3,
            color: '#cb6bb4',
            text: 'Room3'
          }],
          name: 'roomId'
        }, {
          data: [{
            Id: 0,
            text: 'Phone1',
            color: '#cd6bb2'
          }, {
            Id: 3,
            text: 'Phone3',
            color: '#cd6bb4'
          }],
          items: [{
            id: 0,
            color: '#cd6bb2',
            text: 'Phone1'
          }, {
            id: 3,
            color: '#cd6bb4',
            text: 'Phone3'
          }],
          name: 'phoneId'
        }]
      }].forEach(function($__4) {
        var $__5 = $__4,
            name = $__5.name,
            groups = $__5.groups,
            loadingGroups = $__5.loadingGroups,
            expected = $__5.expected;
        QUnit.test(("getResourcesDataByGroups if resources: '" + name + "'"), function(assert) {
          var roomData = [{
            field: 'roomId',
            label: 'Rooms',
            allowMultiple: true,
            valueExpr: 'Id',
            dataSource: [{
              Id: 0,
              text: 'Room1',
              color: '#cb6bb2'
            }, {
              Id: 2,
              text: 'Room2',
              color: '#cb6bb3'
            }, {
              Id: 3,
              text: 'Room3',
              color: '#cb6bb4'
            }]
          }, {
            field: 'phoneId',
            label: 'Phones',
            allowMultiple: true,
            valueExpr: 'Id',
            dataSource: [{
              Id: 0,
              text: 'Phone1',
              color: '#cd6bb2'
            }, {
              Id: 2,
              text: 'Phone2',
              color: '#cd6bb3'
            }, {
              Id: 3,
              text: 'Phone3',
              color: '#cd6bb4'
            }]
          }];
          var done = assert.async();
          loadResources(loadingGroups, roomData, new Map()).done($.proxy(function(loadedResources) {
            var resourcesDataByGroups = getResourcesDataByGroups(loadedResources, roomData, groups);
            assert.deepEqual(resourcesDataByGroups, expected, 'getResourcesDataByGroups works correctly');
            done();
          }, this));
        });
        QUnit.test('getResourcesDataByGroups if empty groups', function(assert) {
          var done = assert.async();
          loadResources([], [], new Map()).done($.proxy(function(loadedResources) {
            var resourcesDataByGroups = getResourcesDataByGroups(loadedResources, []);
            assert.deepEqual(resourcesDataByGroups, [], 'getResourcesDataByGroups works correctly');
            done();
          }, this));
        });
      });
      QUnit.test('resources should be validated (transformed into an empty array) after loading', function(assert) {
        var done = assert.async();
        var resources = [{
          field: 'ownerId',
          dataSource: []
        }];
        loadResources(['ownerId'], resources, new Map()).done(function(resources) {
          assert.deepEqual(resources, [], 'Correct resources');
          done();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/scheduler/resources/utils","data/data_source/data_source","data/custom_store"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/scheduler/resources/utils"), require("data/data_source/data_source"), require("data/custom_store"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=resourceManager.tests.js.map