System.register(["core/renderer", "core/utils/size", "viz/chart", "viz/pie_chart", "viz/polar_chart", "viz/linear_gauge", "viz/circular_gauge", "viz/bar_gauge", "viz/range_selector", "viz/vector_map", "viz/sparkline", "viz/bullet", "viz/tree_map", "/artifacts/js/vectormap-data/world.js", "/artifacts/js/vectormap-data/usa.js"], function (_export, _context) {
  "use strict";

  var $, getWidth, getHeight, setWidth, setHeight, chartTestsSignature, linearGaugeTestSignature, charts, allWidgets, environment;
  function domNodesCount(node) {
    let i;
    let count = 1;
    const children = $(node).children();
    if (children.length) {
      for (i = 0; i < children.length; i++) {
        count += domNodesCount(children[i]);
      }
    }
    return count;
  }
  return {
    setters: [function (_coreRenderer) {
      $ = _coreRenderer.default;
    }, function (_coreUtilsSize) {
      getWidth = _coreUtilsSize.getWidth;
      getHeight = _coreUtilsSize.getHeight;
      setWidth = _coreUtilsSize.setWidth;
      setHeight = _coreUtilsSize.setHeight;
    }, function (_vizChart) {}, function (_vizPie_chart) {}, function (_vizPolar_chart) {}, function (_vizLinear_gauge) {}, function (_vizCircular_gauge) {}, function (_vizBar_gauge) {}, function (_vizRange_selector) {}, function (_vizVector_map) {}, function (_vizSparkline) {}, function (_vizBullet) {}, function (_vizTree_map) {}, function (_artifactsJsVectormapDataWorldJs) {}, function (_artifactsJsVectormapDataUsaJs) {}],
    execute: function () {
      window.DevExpress = {
        viz: {
          map: {
            sources: {}
          }
        }
      };
      chartTestsSignature = {
        getInitOptions() {
          return {
            animation: {
              enabled: false
            },
            dataSource: [{
              arg: 1,
              val: 1
            }, {
              arg: 2,
              val: 2
            }],
            series: [{
              type: 'line'
            }, {
              type: 'bar'
            }, {
              type: 'area'
            }]
          };
        },
        getExpandedOptions() {
          const initOptions = this.getInitOptions();
          initOptions.dataSource.push({
            arg: initOptions.dataSource.length + 1,
            val: 10
          });
          return {
            dataSource: initOptions.dataSource
          };
        }
      };
      linearGaugeTestSignature = {
        animation: {
          enabled: false
        },
        getInitOptions() {
          return {
            scale: {
              startValue: 0,
              endValue: 5
            },
            subvalues: [4, 2],
            value: 4.3
          };
        },
        getExpandedOptions() {
          return {
            ...this.getInitOptions(),
            subvalues: [1, 2, 3]
          };
        }
      };
      charts = {
        dxChart: chartTestsSignature,
        dxPieChart: {
          getInitOptions() {
            return {
              ...allWidgets.dxChart.getInitOptions(),
              series: [{}]
            };
          },
          getExpandedOptions: chartTestsSignature.getExpandedOptions
        },
        dxPolarChart: chartTestsSignature
      };
      allWidgets = {
        ...charts,
        dxLinearGauge: linearGaugeTestSignature,
        dxCircularGauge: linearGaugeTestSignature,
        dxBarGauge: {
          getInitOptions() {
            return {
              animation: {
                enabled: false
              },
              startValue: 0,
              endValue: 100,
              values: [47, 65, 84, 71]
            };
          },
          getExpandedOptions() {
            return {
              values: this.getInitOptions().values.concat([1, 2, 3, 4])
            };
          }
        },
        dxRangeSelector: {
          getInitOptions: function () {
            return {
              behavior: {
                animationEnabled: false
              },
              scale: {
                startValue: 15000,
                endValue: 150000
              }
            };
          },
          getExpandedOptions: function () {
            const initOptions = this.getInitOptions();
            initOptions.scale.startValue = 1000;
            return initOptions;
          }
        },
        dxVectorMap: {
          getInitOptions() {
            return {
              layers: {
                dataSource: DevExpress.viz.map.sources.world
              }
            };
          },
          getExpandedOptions() {
            return {
              layers: {
                dataSource: DevExpress.viz.map.sources['usa']
              }
            };
          }
        },
        dxSparkline: {
          getInitOptions() {
            return {
              dataSource: chartTestsSignature.getInitOptions().dataSource
            };
          },
          getExpandedOptions() {
            return {
              dataSource: chartTestsSignature.getExpandedOptions().dataSource
            };
          }
        },
        dxBullet: {
          getInitOptions() {
            return {
              startScaleValue: 0,
              endScaleValue: 35,
              target: 10
            };
          },
          getExpandedOptions() {
            const initOptions = this.getInitOptions();
            initOptions.target = 7;
            return initOptions;
          }
        },
        dxTreeMap: {
          getInitOptions() {
            return {
              dataSource: [{
                value: 1,
                text: '1'
              }, {
                value: 2,
                text: '2',
                items: [{
                  value: 2,
                  text: '43'
                }]
              }]
            };
          },
          getExpandedOptions() {
            return {
              dataSource: [{
                value: 1,
                text: '22'
              }, {
                value: 1,
                text: '22'
              }]
            };
          }
        }
      };
      environment = {
        beforeEach() {
          this.$container = $('#widgetContainer');
        },
        assertNodesCount(assert, initCount) {
          assert.strictEqual(domNodesCount(this.$container[0]), initCount);
        },
        prepareDataForTest(widgetName, config) {
          const widget = this.$container[widgetName](config.getInitOptions())[widgetName]('instance');
          const initNodesCount = domNodesCount(this.$container[0]);
          return {
            widget: widget,
            initNodeCount: initNodesCount
          };
        }
      };
      QUnit.testStart(function () {
        const markup = '<div id="widgetContainer"></div>';
        $('#qunit-fixture').html(markup);
        $('#widgetContainer').css({
          width: '300px',
          height: '150px'
        });
      });
      QUnit.module('options updating', environment);
      for (const widgetName in allWidgets) {
        const config = allWidgets[widgetName];
        QUnit.test(widgetName + ' - creation & update', function (assert) {
          const data = this.prepareDataForTest(widgetName, config);
          data.widget.option(config.getExpandedOptions());
          data.widget.option(config.getInitOptions());
          this.assertNodesCount(assert, data.initNodeCount);
        });
      }
      QUnit.module('resizing', environment);
      for (const widgetName in allWidgets) {
        const config = allWidgets[widgetName];
        QUnit.test(widgetName + ' - resize', function (assert) {
          const srcWidth = getWidth(this.$container);
          const srcHeight = getHeight(this.$container);
          const data = this.prepareDataForTest(widgetName, config);
          setWidth(this.$container, 100);
          setHeight(this.$container, 100);
          data.widget.render();
          setWidth(this.$container, srcWidth);
          setHeight(this.$container, srcHeight);
          data.widget.render();
          this.assertNodesCount(assert, data.initNodeCount);
        });
      }
      QUnit.module('Refresh', environment);
      for (const widgetName in charts) {
        const config = charts[widgetName];
        QUnit.test(`${widgetName} - refresh`, function (assert) {
          const {
            widget,
            initNodeCount
          } = this.prepareDataForTest(widgetName, config);
          widget.refresh();
          this.assertNodesCount(assert, initNodeCount);
        });
      }
    }
  };
});