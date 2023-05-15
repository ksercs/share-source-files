!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/appointmentPopup/form.js"], ["../../../core/renderer","../../form","../../../core/utils/date_serialization","../../../localization/message","../../../core/devices","../../../data/data_source","../timezones/utils.timezones_data","../../../core/utils/extend","../../../core/utils/date","../../../renovation/ui/scheduler/utils/semaphore/semaphore","../recurrence_editor","../../text_area","../../tag_box","../../switch","../../select_box"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/appointmentPopup/form.js", ["../../../core/renderer", "../../form", "../../../core/utils/date_serialization", "../../../localization/message", "../../../core/devices", "../../../data/data_source", "../timezones/utils.timezones_data", "../../../core/utils/extend", "../../../core/utils/date", "../../../renovation/ui/scheduler/utils/semaphore/semaphore", "../recurrence_editor", "../../text_area", "../../tag_box", "../../switch", "../../select_box"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.AppointmentForm = exports.APPOINTMENT_FORM_GROUP_NAMES = void 0;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _form = _interopRequireDefault($__require("../../form"));
  var _date_serialization = _interopRequireDefault($__require("../../../core/utils/date_serialization"));
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _devices = _interopRequireDefault($__require("../../../core/devices"));
  var _data_source = _interopRequireDefault($__require("../../../data/data_source"));
  var _utils = _interopRequireDefault($__require("../timezones/utils.timezones_data"));
  var _extend = $__require("../../../core/utils/extend");
  var _date = _interopRequireDefault($__require("../../../core/utils/date"));
  var _semaphore = $__require("../../../renovation/ui/scheduler/utils/semaphore/semaphore");
  $__require("../recurrence_editor");
  $__require("../../text_area");
  $__require("../../tag_box");
  $__require("../../switch");
  $__require("../../select_box");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var SCREEN_SIZE_OF_SINGLE_COLUMN = 600;
  var APPOINTMENT_FORM_GROUP_NAMES = {
    Main: 'mainGroup',
    Recurrence: 'recurrenceGroup'
  };
  exports.APPOINTMENT_FORM_GROUP_NAMES = APPOINTMENT_FORM_GROUP_NAMES;
  var getStartDateWithStartHour = function getStartDateWithStartHour(startDate, startDayHour) {
    return new Date(new Date(startDate).setHours(startDayHour));
  };
  var validateAppointmentFormDate = function validateAppointmentFormDate(editor, value, previousValue) {
    var isCurrentDateCorrect = value === null || !!value;
    var isPreviousDateCorrect = previousValue === null || !!previousValue;
    if (!isCurrentDateCorrect && isPreviousDateCorrect) {
      editor.option('value', previousValue);
    }
  };
  var updateRecurrenceItemVisibility = function updateRecurrenceItemVisibility(recurrenceRuleExpr, value, form) {
    var _form$getEditor;
    form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'visible', value);
    !value && form.updateData(recurrenceRuleExpr, '');
    (_form$getEditor = form.getEditor(recurrenceRuleExpr)) === null || _form$getEditor === void 0 ? void 0 : _form$getEditor.changeValueByVisibility(value);
  };
  var createDateBoxEditor = function createDateBoxEditor(dataField, colSpan, firstDayOfWeek, label, onValueChanged) {
    return {
      editorType: 'dxDateBox',
      dataField: dataField,
      colSpan: colSpan,
      label: {
        text: _message.default.format(label)
      },
      validationRules: [{
        type: 'required'
      }],
      editorOptions: {
        width: '100%',
        calendarOptions: {
          firstDayOfWeek: firstDayOfWeek
        },
        onValueChanged: onValueChanged,
        useMaskBehavior: true
      }
    };
  };
  var AppointmentForm = /*#__PURE__*/function () {
    function AppointmentForm(scheduler) {
      this.scheduler = scheduler;
      this.form = null;
      this.semaphore = new _semaphore.Semaphore();
    }
    var _proto = AppointmentForm.prototype;
    _proto.create = function create(triggerResize, changeSize, formData) {
      var _this = this;
      var allowTimeZoneEditing = this.scheduler.getEditingConfig().allowTimeZoneEditing;
      var _this$scheduler$getDa = this.scheduler.getDataAccessors(),
          expr = _this$scheduler$getDa.expr;
      var recurrenceEditorVisibility = !!formData[expr.recurrenceRuleExpr]; // TODO
      var colSpan = recurrenceEditorVisibility ? 1 : 2;
      var mainItems = [].concat(_toConsumableArray(this._createMainItems(expr, triggerResize, changeSize, allowTimeZoneEditing)), _toConsumableArray(this.scheduler.createResourceEditorModel()));
      changeSize(recurrenceEditorVisibility);
      var items = [{
        itemType: 'group',
        name: APPOINTMENT_FORM_GROUP_NAMES.Main,
        colCountByScreen: {
          lg: 2,
          xs: 1
        },
        colSpan: colSpan,
        items: mainItems
      }, {
        itemType: 'group',
        name: APPOINTMENT_FORM_GROUP_NAMES.Recurrence,
        visible: recurrenceEditorVisibility,
        colSpan: colSpan,
        items: this._createRecurrenceEditor(expr)
      }];
      var element = (0, _renderer.default)('<div>');
      this.form = this.scheduler.createComponent(element, _form.default, {
        items: items,
        showValidationSummary: true,
        scrollingEnabled: true,
        colCount: 'auto',
        colCountByScreen: {
          lg: 2,
          xs: 1
        },
        formData: formData,
        showColonAfterLabel: false,
        labelLocation: 'top',
        customizeItem: function customizeItem(e) {
          if (_this.form && e.itemType === 'group') {
            var dataExprs = _this.scheduler.getDataAccessors().expr;
            var startDate = new Date(_this.formData[dataExprs.startDateExpr]);
            var endDate = new Date(_this.formData[dataExprs.endDateExpr]);
            var startTimeZoneEditor = e.items.find(function (i) {
              return i.dataField === dataExprs.startDateTimeZoneExpr;
            });
            var endTimeZoneEditor = e.items.find(function (i) {
              return i.dataField === dataExprs.endDateTimeZoneExpr;
            });
            if (startTimeZoneEditor) {
              startTimeZoneEditor.editorOptions.dataSource = _this.createTimeZoneDataSource(startDate);
            }
            if (endTimeZoneEditor) {
              endTimeZoneEditor.editorOptions.dataSource = _this.createTimeZoneDataSource(endDate);
            }
          }
        },
        screenByWidth: function screenByWidth(width) {
          return width < SCREEN_SIZE_OF_SINGLE_COLUMN || _devices.default.current().deviceType !== 'desktop' ? 'xs' : 'lg';
        }
      });
    };
    _proto.createTimeZoneDataSource = function createTimeZoneDataSource(date) {
      return new _data_source.default({
        store: _utils.default.getDisplayedTimeZones(date),
        paginate: true,
        pageSize: 10
      });
    };
    _proto._dateBoxValueChanged = function _dateBoxValueChanged(args, dateExpr, isNeedCorrect) {
      validateAppointmentFormDate(args.component, args.value, args.previousValue);
      var value = _date_serialization.default.deserializeDate(args.value);
      var previousValue = _date_serialization.default.deserializeDate(args.previousValue);
      var dateEditor = this.form.getEditor(dateExpr);
      var dateValue = _date_serialization.default.deserializeDate(dateEditor.option('value'));
      if (this.semaphore.isFree() && dateValue && value && isNeedCorrect(dateValue, value)) {
        var duration = previousValue ? dateValue.getTime() - previousValue.getTime() : 0;
        dateEditor.option('value', new Date(value.getTime() + duration));
      }
    };
    _proto._createTimezoneEditor = function _createTimezoneEditor(timeZoneExpr, secondTimeZoneExpr, visibleIndex, colSpan, isMainTimeZone) {
      var _this2 = this;
      var visible = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var noTzTitle = _message.default.format('dxScheduler-noTimezoneTitle');
      return {
        dataField: timeZoneExpr,
        editorType: 'dxSelectBox',
        visibleIndex: visibleIndex,
        colSpan: colSpan,
        label: {
          text: ' '
        },
        editorOptions: {
          displayExpr: 'title',
          valueExpr: 'id',
          placeholder: noTzTitle,
          searchEnabled: true,
          onValueChanged: function onValueChanged(args) {
            var form = _this2.form;
            var secondTimezoneEditor = form.getEditor(secondTimeZoneExpr);
            if (isMainTimeZone) {
              secondTimezoneEditor.option('value', args.value);
            }
          }
        },
        visible: visible
      };
    };
    _proto._createDateBoxItems = function _createDateBoxItems(dataExprs, allowTimeZoneEditing) {
      var _this3 = this;
      var colSpan = allowTimeZoneEditing ? 2 : 1;
      var firstDayOfWeek = this.scheduler.getFirstDayOfWeek();
      return [createDateBoxEditor(dataExprs.startDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelStartDate', function (args) {
        _this3._dateBoxValueChanged(args, dataExprs.endDateExpr, function (endValue, startValue) {
          return endValue < startValue;
        });
      }), this._createTimezoneEditor(dataExprs.startDateTimeZoneExpr, dataExprs.endDateTimeZoneExpr, 1, colSpan, true, allowTimeZoneEditing), createDateBoxEditor(dataExprs.endDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelEndDate', function (args) {
        _this3._dateBoxValueChanged(args, dataExprs.startDateExpr, function (startValue, endValue) {
          return endValue < startValue;
        });
      }), this._createTimezoneEditor(dataExprs.endDateTimeZoneExpr, dataExprs.startDateTimeZoneExpr, 3, colSpan, false, allowTimeZoneEditing)];
    };
    _proto._changeFormItemDateType = function _changeFormItemDateType(itemPath, isAllDay) {
      var itemEditorOptions = this.form.itemOption(itemPath).editorOptions;
      var type = isAllDay ? 'date' : 'datetime';
      var newEditorOption = _extends({}, itemEditorOptions, {
        type: type
      });
      this.form.itemOption(itemPath, 'editorOptions', newEditorOption);
    };
    _proto._createMainItems = function _createMainItems(dataExprs, triggerResize, changeSize, allowTimeZoneEditing) {
      var _this4 = this;
      return [{
        dataField: dataExprs.textExpr,
        editorType: 'dxTextBox',
        colSpan: 2,
        label: {
          text: _message.default.format('dxScheduler-editorLabelTitle')
        }
      }, {
        itemType: 'group',
        colSpan: 2,
        colCountByScreen: {
          lg: 2,
          xs: 1
        },
        items: this._createDateBoxItems(dataExprs, allowTimeZoneEditing)
      }, {
        itemType: 'group',
        colCountByScreen: {
          lg: 3,
          xs: 3
        },
        colSpan: 2,
        items: [{
          dataField: dataExprs.allDayExpr,
          cssClass: 'dx-appointment-form-switch',
          editorType: 'dxSwitch',
          label: {
            text: _message.default.format('dxScheduler-allDay'),
            location: 'right'
          },
          editorOptions: {
            onValueChanged: function onValueChanged(args) {
              var value = args.value;
              var startDateEditor = _this4.form.getEditor(dataExprs.startDateExpr);
              var endDateEditor = _this4.form.getEditor(dataExprs.endDateExpr);
              var startDate = _date_serialization.default.deserializeDate(startDateEditor.option('value'));
              if (_this4.semaphore.isFree() && startDate) {
                if (value) {
                  var allDayStartDate = _date.default.trimTime(startDate);
                  startDateEditor.option('value', new Date(allDayStartDate));
                  endDateEditor.option('value', new Date(allDayStartDate));
                } else {
                  var startDateWithStartHour = getStartDateWithStartHour(startDate, _this4.scheduler.getStartDayHour());
                  var endDate = _this4.scheduler.getCalculatedEndDate(startDateWithStartHour);
                  startDateEditor.option('value', startDateWithStartHour);
                  endDateEditor.option('value', endDate);
                }
              }
              var startDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.startDateExpr);
              var endDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.endDateExpr);
              _this4._changeFormItemDateType(startDateItemPath, value);
              _this4._changeFormItemDateType(endDateItemPath, value);
            }
          }
        }, {
          editorType: 'dxSwitch',
          dataField: 'repeat',
          cssClass: 'dx-appointment-form-switch',
          name: 'visibilityChanged',
          label: {
            text: _message.default.format('dxScheduler-editorLabelRecurrence'),
            location: 'right'
          },
          editorOptions: {
            onValueChanged: function onValueChanged(args) {
              var form = _this4.form;
              var colSpan = args.value ? 1 : 2;
              form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Main, 'colSpan', colSpan);
              form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'colSpan', colSpan);
              updateRecurrenceItemVisibility(dataExprs.recurrenceRuleExpr, args.value, form);
              changeSize(args.value);
              triggerResize();
            }
          }
        }]
      }, {
        itemType: 'empty',
        colSpan: 2
      }, {
        dataField: dataExprs.descriptionExpr,
        editorType: 'dxTextArea',
        colSpan: 2,
        label: {
          text: _message.default.format('dxScheduler-editorLabelDescription')
        }
      }, {
        itemType: 'empty',
        colSpan: 2
      }];
    };
    _proto._createRecurrenceEditor = function _createRecurrenceEditor(dataExprs) {
      return [{
        dataField: dataExprs.recurrenceRuleExpr,
        editorType: 'dxRecurrenceEditor',
        editorOptions: {
          firstDayOfWeek: this.scheduler.getFirstDayOfWeek()
        },
        label: {
          text: ' ',
          visible: false
        }
      }];
    };
    _proto.setEditorsType = function setEditorsType(allDay) {
      var _this$scheduler$getDa2 = this.scheduler.getDataAccessors().expr,
          startDateExpr = _this$scheduler$getDa2.startDateExpr,
          endDateExpr = _this$scheduler$getDa2.endDateExpr;
      var startDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(startDateExpr);
      var endDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(endDateExpr);
      var startDateFormItem = this.form.itemOption(startDateItemPath);
      var endDateFormItem = this.form.itemOption(endDateItemPath);
      if (startDateFormItem && endDateFormItem) {
        var startDateEditorOptions = startDateFormItem.editorOptions;
        var endDateEditorOptions = endDateFormItem.editorOptions;
        startDateEditorOptions.type = endDateEditorOptions.type = allDay ? 'date' : 'datetime';
        this.form.itemOption(startDateItemPath, 'editorOptions', startDateEditorOptions);
        this.form.itemOption(endDateItemPath, 'editorOptions', endDateEditorOptions);
      }
    };
    _proto.updateRecurrenceEditorStartDate = function updateRecurrenceEditorStartDate(date, expression) {
      var options = {
        startDate: date
      };
      this.setEditorOptions(expression, 'Recurrence', options);
    };
    _proto.setEditorOptions = function setEditorOptions(name, groupName, options) {
      var editorPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.groupName, ".").concat(name);
      var editor = this.form.itemOption(editorPath);
      editor && this.form.itemOption(editorPath, 'editorOptions', (0, _extend.extend)({}, editor.editorOptions, options));
    };
    _proto.setTimeZoneEditorDataSource = function setTimeZoneEditorDataSource(date, path) {
      var dataSource = this.createTimeZoneDataSource(date);
      this.setEditorOptions(path, 'Main', {
        dataSource: dataSource
      });
    };
    _proto.updateFormData = function updateFormData(formData) {
      this.semaphore.take();
      this.form.option('formData', formData);
      var dataExprs = this.scheduler.getDataAccessors().expr;
      var allDay = formData[dataExprs.allDayExpr];
      var startDate = new Date(formData[dataExprs.startDateExpr]);
      var endDate = new Date(formData[dataExprs.endDateExpr]);
      this.setTimeZoneEditorDataSource(startDate, dataExprs.startDateTimeZoneExpr);
      this.setTimeZoneEditorDataSource(endDate, dataExprs.endDateTimeZoneExpr);
      this.updateRecurrenceEditorStartDate(startDate, dataExprs.recurrenceRuleExpr);
      this.setEditorsType(allDay);
      this.semaphore.release();
    };
    _createClass(AppointmentForm, [{
      key: "dxForm",
      get: function get() {
        return this.form;
      }
    }, {
      key: "readOnly",
      set: function set(value) {
        this.form.option('readOnly', value);
        var recurrenceRuleExpr = this.scheduler.getDataAccessors().expr.recurrenceRuleExpr;
        var recurrenceEditor = this.form.getEditor(recurrenceRuleExpr);
        recurrenceEditor === null || recurrenceEditor === void 0 ? void 0 : recurrenceEditor.option('readOnly', value);
      }
    }, {
      key: "formData",
      get: function get() {
        return this.form.option('formData');
      },
      set: function set(value) {
        this.form.option('formData', value);
      }
    }]);
    return AppointmentForm;
  }();
  exports.AppointmentForm = AppointmentForm;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../form","../../../core/utils/date_serialization","../../../localization/message","../../../core/devices","../../../data/data_source","../timezones/utils.timezones_data","../../../core/utils/extend","../../../core/utils/date","../../../renovation/ui/scheduler/utils/semaphore/semaphore","../recurrence_editor","../../text_area","../../tag_box","../../switch","../../select_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../form"), require("../../../core/utils/date_serialization"), require("../../../localization/message"), require("../../../core/devices"), require("../../../data/data_source"), require("../timezones/utils.timezones_data"), require("../../../core/utils/extend"), require("../../../core/utils/date"), require("../../../renovation/ui/scheduler/utils/semaphore/semaphore"), require("../recurrence_editor"), require("../../text_area"), require("../../tag_box"), require("../../switch"), require("../../select_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=form.js.map