/**
* DevExtreme (esm/__internal/viz/core/themes/generic/light/pie_chart.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { NONE, RIGHT, WHITE } from './contants';
export default {
  pie: {
    innerRadius: 0.5,
    minDiameter: 0.5,
    type: 'pie',
    dataPrepareSettings: {
      _skipArgumentSorting: true
    },
    commonSeriesSettings: {
      pie: {
        border: {
          visible: false,
          width: 2,
          color: WHITE
        },
        hoverStyle: {
          hatching: {
            direction: RIGHT,
            width: 4,
            step: 10,
            opacity: 0.75
          },
          highlight: true,
          border: {
            visible: false,
            width: 2
          }
        },
        selectionStyle: {
          hatching: {
            direction: RIGHT,
            width: 4,
            step: 10,
            opacity: 0.5
          },
          highlight: true,
          border: {
            visible: false,
            width: 2
          }
        }
      },
      doughnut: {
        border: {
          visible: false,
          width: 2,
          color: WHITE
        },
        hoverStyle: {
          hatching: {
            direction: RIGHT,
            width: 4,
            step: 10,
            opacity: 0.75
          },
          highlight: true,
          border: {
            visible: false,
            width: 2
          }
        },
        selectionStyle: {
          hatching: {
            direction: RIGHT,
            width: 4,
            step: 10,
            opacity: 0.5
          },
          highlight: true,
          border: {
            visible: false,
            width: 2
          }
        }
      },
      donut: {
        border: {
          visible: false,
          width: 2,
          color: WHITE
        },
        hoverStyle: {
          hatching: {
            direction: RIGHT,
            width: 4,
            step: 10,
            opacity: 0.75
          },
          highlight: true,
          border: {
            visible: false,
            width: 2
          }
        },
        selectionStyle: {
          hatching: {
            direction: RIGHT,
            width: 4,
            step: 10,
            opacity: 0.5
          },
          highlight: true,
          border: {
            visible: false,
            width: 2
          }
        }
      },
      label: {
        textOverflow: 'ellipsis',
        wordWrap: 'normal'
      }
    },
    legend: {
      hoverMode: 'allArgumentPoints',
      backgroundColor: NONE
    },
    adaptiveLayout: {
      keepLabels: false
    }
  }
};
