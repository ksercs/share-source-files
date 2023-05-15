!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/bundles/dx.custom.js"], ["../bundles/modules/core","../integration/jquery","../integration/angular","../integration/knockout","../localization/globalize/core","../localization/globalize/message","../localization/globalize/number","../localization/globalize/date","../localization/globalize/currency","../events/click","../events/contextmenu","../events/double_click","../events/drag","../events/hold","../events/hover","../events/pointer","../events/swipe","../events/transform","../bundles/modules/data","../bundles/modules/data.odata","../bundles/modules/ui","../ui/themes","../core/templates/template_engine_registry","../ui/dialog","../ui/notify","../ui/speed_dial_action/repaint_floating_action_button","../ui/toast/hide_toasts","../ui/action_sheet","../ui/autocomplete","../ui/box","../ui/button","../ui/drop_down_button","../ui/button_group","../ui/calendar","../ui/check_box","../ui/color_box","../ui/date_box","../ui/date_range_box","../ui/drawer","../ui/defer_rendering","../ui/drop_down_box","../ui/file_uploader","../ui/form","../ui/gallery","../ui/html_editor","../ui/list","../ui/load_indicator","../ui/load_panel","../ui/lookup","../ui/map","../ui/multi_view","../ui/number_box","../ui/overlay/ui.overlay","../ui/popover","../ui/popup","../ui/progress_bar","../ui/radio_group","../ui/range_slider","../ui/resizable","../ui/responsive_box","../ui/scroll_view","../ui/select_box","../ui/slider","../ui/speed_dial_action","../ui/switch","../ui/tab_panel","../ui/tabs","../ui/tag_box","../ui/text_area","../ui/text_box","../ui/tile_view","../ui/toast","../ui/toolbar","../ui/tooltip","../ui/track_bar","../ui/draggable","../ui/sortable","../ui/validation_engine","../ui/validation_summary","../ui/validation_group","../ui/validator","../ui/html_editor/converters/markdown","../ui/accordion","../ui/context_menu","../ui/data_grid","../ui/tree_list","../ui/menu","../ui/pivot_grid","../ui/pivot_grid_field_chooser","../ui/pivot_grid/data_source","../ui/pivot_grid/xmla_store","../ui/scheduler","../ui/tree_view","../ui/filter_builder","../ui/file_manager","../ui/diagram","../ui/gantt","../bundles/modules/viz","../viz/themes","../viz/export","../viz/palette","../viz/chart","../viz/pie_chart","../viz/polar_chart","../viz/linear_gauge","../viz/circular_gauge","../viz/bar_gauge","../viz/range_selector","../viz/vector_map","../viz/vector_map/projection","../viz/sparkline","../viz/bullet","../viz/tree_map","../viz/funnel","../viz/sankey"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled/bundles/dx.custom.js', ['../bundles/modules/core', '../integration/jquery', '../integration/angular', '../integration/knockout', '../localization/globalize/core', '../localization/globalize/message', '../localization/globalize/number', '../localization/globalize/date', '../localization/globalize/currency', '../events/click', '../events/contextmenu', '../events/double_click', '../events/drag', '../events/hold', '../events/hover', '../events/pointer', '../events/swipe', '../events/transform', '../bundles/modules/data', '../bundles/modules/data.odata', '../bundles/modules/ui', '../ui/themes', '../core/templates/template_engine_registry', '../ui/dialog', '../ui/notify', '../ui/speed_dial_action/repaint_floating_action_button', '../ui/toast/hide_toasts', '../ui/action_sheet', '../ui/autocomplete', '../ui/box', '../ui/button', '../ui/drop_down_button', '../ui/button_group', '../ui/calendar', '../ui/check_box', '../ui/color_box', '../ui/date_box', '../ui/date_range_box', '../ui/drawer', '../ui/defer_rendering', '../ui/drop_down_box', '../ui/file_uploader', '../ui/form', '../ui/gallery', '../ui/html_editor', '../ui/list', '../ui/load_indicator', '../ui/load_panel', '../ui/lookup', '../ui/map', '../ui/multi_view', '../ui/number_box', '../ui/overlay/ui.overlay', '../ui/popover', '../ui/popup', '../ui/progress_bar', '../ui/radio_group', '../ui/range_slider', '../ui/resizable', '../ui/responsive_box', '../ui/scroll_view', '../ui/select_box', '../ui/slider', '../ui/speed_dial_action', '../ui/switch', '../ui/tab_panel', '../ui/tabs', '../ui/tag_box', '../ui/text_area', '../ui/text_box', '../ui/tile_view', '../ui/toast', '../ui/toolbar', '../ui/tooltip', '../ui/track_bar', '../ui/draggable', '../ui/sortable', '../ui/validation_engine', '../ui/validation_summary', '../ui/validation_group', '../ui/validator', '../ui/html_editor/converters/markdown', '../ui/accordion', '../ui/context_menu', '../ui/data_grid', '../ui/tree_list', '../ui/menu', '../ui/pivot_grid', '../ui/pivot_grid_field_chooser', '../ui/pivot_grid/data_source', '../ui/pivot_grid/xmla_store', '../ui/scheduler', '../ui/tree_view', '../ui/filter_builder', '../ui/file_manager', '../ui/diagram', '../ui/gantt', '../bundles/modules/viz', '../viz/themes', '../viz/export', '../viz/palette', '../viz/chart', '../viz/pie_chart', '../viz/polar_chart', '../viz/linear_gauge', '../viz/circular_gauge', '../viz/bar_gauge', '../viz/range_selector', '../viz/vector_map', '../viz/vector_map/projection', '../viz/sparkline', '../viz/bullet', '../viz/tree_map', '../viz/funnel', '../viz/sankey'], true, function ($__require, exports, module) {
  "use strict";

  /* Comment lines below for the widgets you don't require and run "devextreme-bundler" in this directory, then include dx.custom.js in your project */

  /* Core (dx.module-core.js) */
  /* eslint-disable import/no-commonjs */

  var global = this || self,
      GLOBAL = global;
  var DevExpress = $__require('../bundles/modules/core');

  /* Integrations (dx.module-core.js) */

  $__require('../integration/jquery');
  $__require('../integration/angular');
  $__require('../integration/knockout');
  $__require('../localization/globalize/core');
  $__require('../localization/globalize/message');
  $__require('../localization/globalize/number');
  $__require('../localization/globalize/date');
  $__require('../localization/globalize/currency');

  /* Events (dx.module-core.js) */

  $__require('../events/click');
  $__require('../events/contextmenu');
  $__require('../events/double_click');
  $__require('../events/drag');
  $__require('../events/hold');
  $__require('../events/hover');
  $__require('../events/pointer');
  $__require('../events/swipe');
  $__require('../events/transform');

  /* Data (dx.module-core.js) */

  var data = DevExpress.data = $__require('../bundles/modules/data');
  data.odata = $__require('../bundles/modules/data.odata');

  /* UI core (dx.module-core.js) */

  var ui = DevExpress.ui = $__require('../bundles/modules/ui');
  ui.themes = $__require('../ui/themes');

  // deprecated
  ui.setTemplateEngine = $__require('../core/templates/template_engine_registry').setTemplateEngine;
  ui.dialog = $__require('../ui/dialog');
  ui.notify = $__require('../ui/notify');
  ui.repaintFloatingActionButton = $__require('../ui/speed_dial_action/repaint_floating_action_button');
  ui.hideToasts = $__require('../ui/toast/hide_toasts');

  /* Base widgets (dx.module-widgets-base.js) */

  ui.dxActionSheet = $__require('../ui/action_sheet');
  ui.dxAutocomplete = $__require('../ui/autocomplete');
  ui.dxBox = $__require('../ui/box');
  ui.dxButton = $__require('../ui/button');
  ui.dxDropDownButton = $__require('../ui/drop_down_button');
  ui.dxButtonGroup = $__require('../ui/button_group');
  ui.dxCalendar = $__require('../ui/calendar');
  ui.dxCheckBox = $__require('../ui/check_box');
  ui.dxColorBox = $__require('../ui/color_box');
  ui.dxDateBox = $__require('../ui/date_box');
  ui.dxDateRangeBox = $__require('../ui/date_range_box');
  ui.dxDrawer = $__require('../ui/drawer');
  ui.dxDeferRendering = $__require('../ui/defer_rendering');
  ui.dxDropDownBox = $__require('../ui/drop_down_box');
  ui.dxFileUploader = $__require('../ui/file_uploader');
  ui.dxForm = $__require('../ui/form');
  ui.dxGallery = $__require('../ui/gallery');
  ui.dxHtmlEditor = $__require('../ui/html_editor');
  ui.dxList = $__require('../ui/list');
  ui.dxLoadIndicator = $__require('../ui/load_indicator');
  ui.dxLoadPanel = $__require('../ui/load_panel');
  ui.dxLookup = $__require('../ui/lookup');
  ui.dxMap = $__require('../ui/map');
  ui.dxMultiView = $__require('../ui/multi_view');
  ui.dxNumberBox = $__require('../ui/number_box');
  ui.dxOverlay = $__require('../ui/overlay/ui.overlay');
  ui.dxPopover = $__require('../ui/popover');
  ui.dxPopup = $__require('../ui/popup');
  ui.dxProgressBar = $__require('../ui/progress_bar');
  ui.dxRadioGroup = $__require('../ui/radio_group');
  ui.dxRangeSlider = $__require('../ui/range_slider');
  ui.dxResizable = $__require('../ui/resizable');
  ui.dxResponsiveBox = $__require('../ui/responsive_box');
  ui.dxScrollView = $__require('../ui/scroll_view');
  ui.dxSelectBox = $__require('../ui/select_box');
  ui.dxSlider = $__require('../ui/slider');
  ui.dxSpeedDialAction = $__require('../ui/speed_dial_action');
  ui.dxSwitch = $__require('../ui/switch');
  ui.dxTabPanel = $__require('../ui/tab_panel');
  ui.dxTabs = $__require('../ui/tabs');
  ui.dxTagBox = $__require('../ui/tag_box');
  ui.dxTextArea = $__require('../ui/text_area');
  ui.dxTextBox = $__require('../ui/text_box');
  ui.dxTileView = $__require('../ui/tile_view');
  ui.dxToast = $__require('../ui/toast');
  ui.dxToolbar = $__require('../ui/toolbar');
  ui.dxTooltip = $__require('../ui/tooltip');
  ui.dxTrackBar = $__require('../ui/track_bar');
  ui.dxDraggable = $__require('../ui/draggable');
  ui.dxSortable = $__require('../ui/sortable');

  /* Validation (dx.module-widgets-base.js) */

  DevExpress.validationEngine = $__require('../ui/validation_engine');
  ui.dxValidationSummary = $__require('../ui/validation_summary');
  ui.dxValidationGroup = $__require('../ui/validation_group');
  ui.dxValidator = $__require('../ui/validator');

  /* Widget parts */
  $__require('../ui/html_editor/converters/markdown');

  /* Web widgets (dx.module-widgets-web.js) */

  ui.dxAccordion = $__require('../ui/accordion');
  ui.dxContextMenu = $__require('../ui/context_menu');
  ui.dxDataGrid = $__require('../ui/data_grid');
  ui.dxTreeList = $__require('../ui/tree_list');
  ui.dxMenu = $__require('../ui/menu');
  ui.dxPivotGrid = $__require('../ui/pivot_grid');
  ui.dxPivotGridFieldChooser = $__require('../ui/pivot_grid_field_chooser');
  data.PivotGridDataSource = $__require('../ui/pivot_grid/data_source');
  data.XmlaStore = $__require('../ui/pivot_grid/xmla_store');
  ui.dxScheduler = $__require('../ui/scheduler');
  ui.dxTreeView = $__require('../ui/tree_view');
  ui.dxFilterBuilder = $__require('../ui/filter_builder');
  ui.dxFileManager = $__require('../ui/file_manager');
  ui.dxDiagram = $__require('../ui/diagram');
  ui.dxGantt = $__require('../ui/gantt');

  /* Viz core (dx.module-viz-core.js) */

  var viz = DevExpress.viz = $__require('../bundles/modules/viz');
  viz.currentTheme = $__require('../viz/themes').currentTheme;
  viz.registerTheme = $__require('../viz/themes').registerTheme;
  viz.exportFromMarkup = $__require('../viz/export').exportFromMarkup;
  viz.getMarkup = $__require('../viz/export').getMarkup;
  viz.exportWidgets = $__require('../viz/export').exportWidgets;
  viz.currentPalette = $__require('../viz/palette').currentPalette;
  viz.getPalette = $__require('../viz/palette').getPalette;
  viz.generateColors = $__require('../viz/palette').generateColors;
  viz.registerPalette = $__require('../viz/palette').registerPalette;
  viz.refreshTheme = $__require('../viz/themes').refreshTheme;

  /* Charts (dx.module-viz-charts.js) */
  viz.dxChart = $__require('../viz/chart');
  viz.dxPieChart = $__require('../viz/pie_chart');
  viz.dxPolarChart = $__require('../viz/polar_chart');

  /* Gauges (dx.module-viz-gauges.js) */
  viz.dxLinearGauge = $__require('../viz/linear_gauge');
  viz.dxCircularGauge = $__require('../viz/circular_gauge');
  viz.dxBarGauge = $__require('../viz/bar_gauge');

  /* Range selector (dx.module-viz-rangeselector.js) */
  viz.dxRangeSelector = $__require('../viz/range_selector');

  /* Vector map (dx.module-viz-vectormap.js) */
  viz.dxVectorMap = $__require('../viz/vector_map');
  viz.map = {};
  viz.map.sources = {};
  viz.map.projection = $__require('../viz/vector_map/projection').projection;

  /* Sparklines (dx.module-viz-sparklines.js) */
  viz.dxSparkline = $__require('../viz/sparkline');
  viz.dxBullet = $__require('../viz/bullet');

  /* Treemap */
  viz.dxTreeMap = $__require('../viz/tree_map');

  /* Funnel */
  viz.dxFunnel = $__require('../viz/funnel');

  /* Sankey */
  viz.dxSankey = $__require('../viz/sankey');

  /* Utilities for integration with ASP.NET */
  /* DevExpress.aspnet = require('../aspnet"); */
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../bundles/modules/core","../integration/jquery","../integration/angular","../integration/knockout","../localization/globalize/core","../localization/globalize/message","../localization/globalize/number","../localization/globalize/date","../localization/globalize/currency","../events/click","../events/contextmenu","../events/double_click","../events/drag","../events/hold","../events/hover","../events/pointer","../events/swipe","../events/transform","../bundles/modules/data","../bundles/modules/data.odata","../bundles/modules/ui","../ui/themes","../core/templates/template_engine_registry","../ui/dialog","../ui/notify","../ui/speed_dial_action/repaint_floating_action_button","../ui/toast/hide_toasts","../ui/action_sheet","../ui/autocomplete","../ui/box","../ui/button","../ui/drop_down_button","../ui/button_group","../ui/calendar","../ui/check_box","../ui/color_box","../ui/date_box","../ui/date_range_box","../ui/drawer","../ui/defer_rendering","../ui/drop_down_box","../ui/file_uploader","../ui/form","../ui/gallery","../ui/html_editor","../ui/list","../ui/load_indicator","../ui/load_panel","../ui/lookup","../ui/map","../ui/multi_view","../ui/number_box","../ui/overlay/ui.overlay","../ui/popover","../ui/popup","../ui/progress_bar","../ui/radio_group","../ui/range_slider","../ui/resizable","../ui/responsive_box","../ui/scroll_view","../ui/select_box","../ui/slider","../ui/speed_dial_action","../ui/switch","../ui/tab_panel","../ui/tabs","../ui/tag_box","../ui/text_area","../ui/text_box","../ui/tile_view","../ui/toast","../ui/toolbar","../ui/tooltip","../ui/track_bar","../ui/draggable","../ui/sortable","../ui/validation_engine","../ui/validation_summary","../ui/validation_group","../ui/validator","../ui/html_editor/converters/markdown","../ui/accordion","../ui/context_menu","../ui/data_grid","../ui/tree_list","../ui/menu","../ui/pivot_grid","../ui/pivot_grid_field_chooser","../ui/pivot_grid/data_source","../ui/pivot_grid/xmla_store","../ui/scheduler","../ui/tree_view","../ui/filter_builder","../ui/file_manager","../ui/diagram","../ui/gantt","../bundles/modules/viz","../viz/themes","../viz/export","../viz/palette","../viz/chart","../viz/pie_chart","../viz/polar_chart","../viz/linear_gauge","../viz/circular_gauge","../viz/bar_gauge","../viz/range_selector","../viz/vector_map","../viz/vector_map/projection","../viz/sparkline","../viz/bullet","../viz/tree_map","../viz/funnel","../viz/sankey"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../bundles/modules/core"), require("../integration/jquery"), require("../integration/angular"), require("../integration/knockout"), require("../localization/globalize/core"), require("../localization/globalize/message"), require("../localization/globalize/number"), require("../localization/globalize/date"), require("../localization/globalize/currency"), require("../events/click"), require("../events/contextmenu"), require("../events/double_click"), require("../events/drag"), require("../events/hold"), require("../events/hover"), require("../events/pointer"), require("../events/swipe"), require("../events/transform"), require("../bundles/modules/data"), require("../bundles/modules/data.odata"), require("../bundles/modules/ui"), require("../ui/themes"), require("../core/templates/template_engine_registry"), require("../ui/dialog"), require("../ui/notify"), require("../ui/speed_dial_action/repaint_floating_action_button"), require("../ui/toast/hide_toasts"), require("../ui/action_sheet"), require("../ui/autocomplete"), require("../ui/box"), require("../ui/button"), require("../ui/drop_down_button"), require("../ui/button_group"), require("../ui/calendar"), require("../ui/check_box"), require("../ui/color_box"), require("../ui/date_box"), require("../ui/date_range_box"), require("../ui/drawer"), require("../ui/defer_rendering"), require("../ui/drop_down_box"), require("../ui/file_uploader"), require("../ui/form"), require("../ui/gallery"), require("../ui/html_editor"), require("../ui/list"), require("../ui/load_indicator"), require("../ui/load_panel"), require("../ui/lookup"), require("../ui/map"), require("../ui/multi_view"), require("../ui/number_box"), require("../ui/overlay/ui.overlay"), require("../ui/popover"), require("../ui/popup"), require("../ui/progress_bar"), require("../ui/radio_group"), require("../ui/range_slider"), require("../ui/resizable"), require("../ui/responsive_box"), require("../ui/scroll_view"), require("../ui/select_box"), require("../ui/slider"), require("../ui/speed_dial_action"), require("../ui/switch"), require("../ui/tab_panel"), require("../ui/tabs"), require("../ui/tag_box"), require("../ui/text_area"), require("../ui/text_box"), require("../ui/tile_view"), require("../ui/toast"), require("../ui/toolbar"), require("../ui/tooltip"), require("../ui/track_bar"), require("../ui/draggable"), require("../ui/sortable"), require("../ui/validation_engine"), require("../ui/validation_summary"), require("../ui/validation_group"), require("../ui/validator"), require("../ui/html_editor/converters/markdown"), require("../ui/accordion"), require("../ui/context_menu"), require("../ui/data_grid"), require("../ui/tree_list"), require("../ui/menu"), require("../ui/pivot_grid"), require("../ui/pivot_grid_field_chooser"), require("../ui/pivot_grid/data_source"), require("../ui/pivot_grid/xmla_store"), require("../ui/scheduler"), require("../ui/tree_view"), require("../ui/filter_builder"), require("../ui/file_manager"), require("../ui/diagram"), require("../ui/gantt"), require("../bundles/modules/viz"), require("../viz/themes"), require("../viz/export"), require("../viz/palette"), require("../viz/chart"), require("../viz/pie_chart"), require("../viz/polar_chart"), require("../viz/linear_gauge"), require("../viz/circular_gauge"), require("../viz/bar_gauge"), require("../viz/range_selector"), require("../viz/vector_map"), require("../viz/vector_map/projection"), require("../viz/sparkline"), require("../viz/bullet"), require("../viz/tree_map"), require("../viz/funnel"), require("../viz/sankey"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dx.custom.js.map