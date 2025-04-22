"use strict";

var _globals = require("@jest/globals");
var _get_updated_options = require("./get_updated_options");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(0, _globals.describe)('get_updated_options', () => {
  class DummyDataSource {
    constructor() {
      this.dummy = true;
    }
  }
  (0, _globals.it)('simple props changed', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      visible: true
    }, {
      visible: false
    })).toEqual([{
      path: 'visible',
      value: false,
      previousValue: true
    }]);
  });
  (0, _globals.it)('no props changed', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      visible: true
    }, {
      visible: true
    })).toEqual([]);
  });
  (0, _globals.it)('new props', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      visible: true
    }, {
      visible: true,
      enabled: false
    })).toEqual([{
      path: 'enabled',
      value: false,
      previousValue: undefined
    }]);
  });
  (0, _globals.it)('old and new is undefined', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      columns: undefined
    }, {
      columns: undefined
    })).toEqual([]);
  });
  (0, _globals.it)('eventcallback props changed', () => {
    const callback1 = () => {};
    const callback2 = () => {};
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      visible: true,
      onCellClick: callback1
    }, {
      visible: true,
      onCellClick: callback2
    })).toEqual([{
      path: 'onCellClick',
      value: callback2,
      previousValue: callback1
    }]);
  });
  (0, _globals.it)('nested props changed', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      editing: {
        allowAdding: true
      }
    }, {
      editing: {
        allowAdding: false
      }
    })).toEqual([{
      path: 'editing.allowAdding',
      value: false,
      previousValue: true
    }]);
  });
  (0, _globals.it)('nested props changed to empty', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      visible: true,
      editing: {
        allowAdding: true
      }
    }, {
      visible: true
    })).toEqual([{
      path: 'editing',
      value: undefined,
      previousValue: {
        allowAdding: true
      }
    }]);
  });
  (0, _globals.it)('type of value in props changed', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      visible: true,
      filterValue: []
    }, {
      visible: true,
      filterValue: '1'
    })).toEqual([{
      path: 'filterValue',
      value: '1',
      previousValue: []
    }]);
  });
  (0, _globals.it)('array item props changed', () => {
    const oldColumns = [{
      id: 'field1',
      visible: true
    }, {
      id: 'field2',
      visible: true
    }];
    const columns = [oldColumns[0], _extends({}, oldColumns[1], {
      visible: false
    })];
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      columns: oldColumns
    }, {
      columns
    })).toEqual([{
      path: 'columns[1].visible',
      value: false,
      previousValue: true
    }]);
  });
  (0, _globals.it)('array items count changed', () => {
    const oldColumns = [{
      id: 'field1',
      visible: true
    }, {
      id: 'field2',
      visible: true
    }];
    const columns = [...oldColumns, {
      id: 'field3',
      visible: true
    }];
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      columns: oldColumns
    }, {
      columns
    })).toEqual([{
      path: 'columns',
      value: columns,
      previousValue: oldColumns
    }]);
  });
  (0, _globals.it)('ignore react props', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      key: 'grid1',
      ref: {},
      children: []
    }, {
      key: 'grid2',
      ref: {},
      children: []
    })).toEqual([]);
  });
  (0, _globals.it)('not to deep equal for equal object', () => {
    const obj = {
      ref: null
    };
    const refObj = {
      ref: obj
    };
    obj.ref = refObj;
    const dataSource = [obj];
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      dataSource
    }, {
      dataSource
    })).toEqual([]);
  });
  (0, _globals.it)('use equal for compare array "dataSource"', () => {
    const oldObj = {
      dataSource: []
    };
    const obj = {
      dataSource: []
    };
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)(oldObj, obj)).toEqual([{
      path: 'dataSource',
      value: [],
      previousValue: []
    }]);
  });
  (0, _globals.it)('prevProps is undefined', () => {
    const oldObj = {
      focusedRowKey: null
    };
    const obj = {
      focusedRowKey: 0
    };
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)(oldObj, obj)).toEqual([{
      path: 'focusedRowKey',
      value: 0,
      previousValue: null
    }]);
  });
  (0, _globals.it)('deep diff if plain object', () => {
    const oldObj = {
      items: [{
        location: 'before'
      }]
    };
    const obj = {
      items: [{
        location: 'after'
      }]
    };
    const diff = (0, _get_updated_options.getUpdatedOptions)(oldObj, obj);
    (0, _globals.expect)(diff).toEqual([{
      path: 'items[0].location',
      value: 'after',
      previousValue: 'before'
    }]);
  });
  (0, _globals.it)('deep diff only for plain object', () => {
    const oldObj = {
      dataSource: new DummyDataSource()
    };
    const obj = {
      dataSource: new DummyDataSource()
    };
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)(oldObj, obj)).toEqual([{
      path: 'dataSource',
      value: obj.dataSource,
      previousValue: oldObj.dataSource
    }]);
  });
  (0, _globals.it)('using notDeepDiffArrays param', () => {
    const oldObj = {
      toolbar: {
        items: [{
          value: 1
        }]
      }
    };
    const obj = {
      toolbar: {
        items: [{
          value: 2
        }]
      }
    };
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)(oldObj, obj, ['toolbar.items'])).toEqual([{
      path: 'toolbar.items',
      value: [{
        value: 2
      }],
      previousValue: [{
        value: 1
      }]
    }]);
  });
  (0, _globals.it)('using defaultNotDeepDiffArrays', () => {
    const oldObj = {
      toolbar: {
        dataSource: [{
          value: 1
        }]
      }
    };
    const obj = {
      toolbar: {
        dataSource: [{
          value: 2
        }]
      }
    };
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)(oldObj, obj)).toEqual([{
      path: 'toolbar.dataSource',
      value: [{
        value: 2
      }],
      previousValue: [{
        value: 1
      }]
    }]);
  });
  (0, _globals.it)('integration options are ignored', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      visible: true,
      integrationOptions: true
    }, {
      visible: false,
      integrationOptions: undefined
    })).toEqual([{
      path: 'visible',
      value: false,
      previousValue: true
    }]);
  });
  (0, _globals.it)('integration options in child props are ignored', () => {
    (0, _globals.expect)((0, _get_updated_options.getUpdatedOptions)({
      visible: true,
      items: {
        integrationOptions: true,
        disabled: true
      }
    }, {
      visible: false,
      items: {
        integrationOptions: undefined,
        disabled: false
      }
    })).toEqual([{
      path: 'visible',
      value: false,
      previousValue: true
    }, {
      path: 'items.disabled',
      value: false,
      previousValue: true
    }]);
  });
});