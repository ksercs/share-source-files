System.register(["core/utils/size", "jquery", "core/utils/data", "core/utils/type", "core/utils/deferred", "animation/fx", "ui/scheduler/ui.scheduler", "ui/scheduler/expressionUtils", "ui/scheduler/resources/utils"], function (_export, _context) {
  "use strict";

  var getOuterWidth, $, dataCoreUtils, typeUtils, Deferred, fx, ExpressionUtils, createExpressions, testStart, module, test, compileGetter, compileSetter, BASE_WIDTH, dataAccessors, createInstance, moduleOptions;
  return {
    setters: [function (_coreUtilsSize) {
      getOuterWidth = _coreUtilsSize.getOuterWidth;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_coreUtilsData) {
      dataCoreUtils = _coreUtilsData.default;
    }, function (_coreUtilsType) {
      typeUtils = _coreUtilsType.default;
    }, function (_coreUtilsDeferred) {
      Deferred = _coreUtilsDeferred.Deferred;
    }, function (_animationFx) {
      fx = _animationFx.default;
    }, function (_uiSchedulerUiScheduler) {}, function (_uiSchedulerExpressionUtils) {
      ExpressionUtils = _uiSchedulerExpressionUtils.ExpressionUtils;
    }, function (_uiSchedulerResourcesUtils) {
      createExpressions = _uiSchedulerResourcesUtils.createExpressions;
    }],
    execute: function () {
      ({
        testStart,
        module,
        test
      } = QUnit);
      compileGetter = dataCoreUtils.compileGetter;
      compileSetter = dataCoreUtils.compileSetter;
      BASE_WIDTH = 20;
      testStart(function () {
        $('#qunit-fixture').html('<div id="scheduler-appointments"></div>\
        <div id="allDayContainer"></div>\
        <div id="fixedContainer"></div>');
      });
      dataAccessors = {
        getter: {
          startDate: compileGetter('startDate'),
          endDate: compileGetter('endDate'),
          allDay: compileGetter('allDay'),
          text: compileGetter('text'),
          recurrenceRule: compileGetter('recurrenceRule')
        },
        setter: {
          startDate: compileSetter('startDate'),
          endDate: compileSetter('endDate'),
          allDay: compileSetter('allDay'),
          text: compileSetter('text'),
          recurrenceRule: compileSetter('recurrenceRule')
        }
      };
      ExpressionUtils.getField = (_, field, obj) => {
        if (typeUtils.isDefined(dataAccessors.getter[field])) {
          return dataAccessors.getter[field](obj);
        }
      };
      ExpressionUtils.setField = (_, field, obj, value) => {
        return dataAccessors.setter[field](obj, value);
      };
      createInstance = (options = {}) => {
        const createObserver = renderingStrategy => ({
          fire: (command, field, obj, value) => {
            switch (command) {
              case 'getEndDayHour':
                if (renderingStrategy === 'horizontalMonthLine') {
                  return 24;
                } else {
                  return 20;
                }
              case 'getStartDayHour':
                if (renderingStrategy === 'horizontalMonthLine') {
                  return 0;
                } else {
                  return 8;
                }
              case 'getAppointmentGeometry':
                return {
                  width: field.width || 0,
                  height: field.height || 0,
                  left: field.left || 0,
                  top: field.top || 0,
                  empty: field.empty || false
                };
              default:
                break;
            }
          }
        });
        return $('#scheduler-appointments').dxSchedulerAppointments({
          observer: createObserver(options.renderingStrategy),
          ...options,
          getResources: () => [],
          getAppointmentColor: () => new Deferred(),
          getResourceDataAccessors: () => createExpressions([])
        }).dxSchedulerAppointments('instance');
      };
      moduleOptions = {
        beforeEach: function () {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function () {
          this.clock.restore();
          fx.off = false;
        }
      };
      module('Horizontal Month Strategy', moduleOptions, () => {
        test('AllDay appointment should be displayed right when endDate > startDate and duration < 24', function (assert) {
          const items = [{
            itemData: {
              text: 'Appointment 1',
              startDate: new Date(2015, 2, 5, 10),
              endDate: new Date(2015, 2, 6, 6),
              allDay: true
            },
            settings: [{
              top: 0,
              left: 0,
              count: 1,
              index: 0,
              width: 40,
              allDay: true
            }]
          }];
          const instance = createInstance({
            items
          });
          const $appointment = instance.$element().find('.dx-scheduler-appointment');
          const allDayAppointmentWidth = BASE_WIDTH * 2;
          assert.equal(getOuterWidth($appointment.eq(0)), allDayAppointmentWidth, 'appointment has right width');
        });
        test('Appointment should not be multiweek when its width some more than maxAllowedPosition(ie & ff pixels)', function (assert) {
          const items = [{
            itemData: {
              text: 'Appointment 1',
              startDate: new Date(2015, 2, 1),
              endDate: new Date(2015, 2, 8)
            },
            settings: [{
              top: 0,
              left: 0,
              max: 135
            }]
          }];
          const instance = createInstance({
            items,
            renderingStrategy: 'horizontalMonth'
          });
          const $appointment = instance.$element().find('.dx-scheduler-appointment');
          assert.equal($appointment.length, 1, 'appointment is not multiline');
        });
        test('Collapsing appointments should have specific class', function (assert) {
          const items = [{
            itemData: {
              text: 'Appointment 1',
              startDate: new Date(2015, 1, 9, 11),
              endDate: new Date(2015, 1, 9, 12)
            },
            settings: [{
              top: 0,
              left: 0,
              empty: true
            }]
          }];
          const instance = createInstance({
            items,
            renderingStrategy: 'horizontalMonth'
          });
          const $appointment = instance.$element().find('.dx-scheduler-appointment').eq(0);
          assert.ok($appointment.hasClass('dx-scheduler-appointment-empty'), 'appointment has the class');
        });
        test('Small width appointments should have specific class', function (assert) {
          const items = [{
            itemData: {
              text: 'Appointment 1',
              startDate: new Date(2015, 1, 9, 8),
              endDate: new Date(2015, 1, 9, 12)
            },
            settings: [{
              top: 0,
              left: 0,
              height: 50,
              width: 39.5,
              empty: true
            }]
          }];
          const instance = createInstance({
            items,
            renderingStrategy: 'horizontalMonth'
          });
          const $appointment = instance.$element().find('.dx-scheduler-appointment');
          assert.ok($appointment.eq(0).hasClass('dx-scheduler-appointment-empty'), 'appointment has the class');
        });
        test('Small height appointments should have specific class', function (assert) {
          const items = [{
            itemData: {
              text: 'Appointment 1',
              startDate: new Date(2015, 1, 9, 8),
              endDate: new Date(2015, 1, 9, 12)
            },
            settings: [{
              top: 0,
              left: 0,
              height: 18.5,
              width: 10,
              empty: true
            }]
          }];
          const instance = createInstance({
            items,
            renderingStrategy: 'horizontalMonth'
          });
          const $appointment = instance.$element().find('.dx-scheduler-appointment');
          assert.ok($appointment.eq(0).hasClass('dx-scheduler-appointment-empty'), 'appointment has the class');
        });
      });
      module('Horizontal Strategy', moduleOptions, () => {
        test('All-day appointment should have a correct css class', function (assert) {
          const items = [{
            itemData: {
              text: 'Appointment 1',
              startDate: new Date(2015, 1, 9, 1),
              endDate: new Date(2015, 1, 9, 2),
              allDay: true
            },
            settings: [{
              top: 0,
              left: 0,
              count: 1,
              index: 0,
              width: 40,
              allDay: true
            }]
          }];
          const instance = createInstance({
            items,
            renderingStrategy: 'horizontal'
          });
          const $appointment = instance.$element().find('.dx-scheduler-appointment');
          assert.ok($appointment.eq(0).hasClass('dx-scheduler-all-day-appointment'), 'Appointment has a right css class');
        });
        test('Appointment should have a correct min width', function (assert) {
          const items = [{
            itemData: {
              text: 'Appointment 1',
              startDate: new Date(2015, 1, 9, 1),
              endDate: new Date(2015, 1, 9, 2),
              allDay: true
            },
            settings: [{
              width: 2
            }]
          }];
          const instance = createInstance({
            items,
            renderingStrategy: 'horizontal'
          });
          const $appointment = instance.$element().find('.dx-scheduler-appointment');
          assert.equal(getOuterWidth($appointment), 2, 'Min width is OK');
        });
      });
    }
  };
});