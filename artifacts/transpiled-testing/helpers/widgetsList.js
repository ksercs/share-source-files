!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/widgetsList.js"], ["ui/accordion","ui/action_sheet","ui/autocomplete","viz/bar_gauge","ui/box","viz/bullet","ui/button","ui/calendar","viz/chart","ui/check_box","viz/circular_gauge","ui/color_box","ui/context_menu","ui/data_grid","ui/date_box","ui/defer_rendering","ui/drawer","ui/drop_down_box","ui/file_manager","ui/file_uploader","ui/filter_builder","ui/form","viz/funnel","ui/gallery","ui/gantt","ui/html_editor","viz/linear_gauge","ui/list","ui/load_indicator","ui/load_panel","ui/lookup","ui/map","ui/menu","ui/multi_view","ui/number_box","viz/pie_chart","ui/pivot_grid","ui/pivot_grid_field_chooser","viz/polar_chart","ui/popover","ui/popup","ui/progress_bar","viz/range_selector","ui/range_slider","ui/radio_group","ui/resizable","ui/responsive_box","viz/sankey","ui/scheduler","ui/scroll_view","ui/select_box","ui/slider","viz/sparkline","ui/switch","ui/tab_panel","ui/tabs","ui/tag_box","ui/text_area","ui/text_box","ui/tile_view","ui/toast","ui/toolbar","ui/tooltip","ui/tree_list","viz/tree_map","ui/tree_view","ui/validation_group","ui/validation_summary","viz/vector_map","ui/drop_down_button","ui/drop_down_editor/ui.drop_down_editor.js","ui/drop_down_editor/ui.drop_down_list.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/helpers/widgetsList.js', ['ui/accordion', 'ui/action_sheet', 'ui/autocomplete', 'viz/bar_gauge', 'ui/box', 'viz/bullet', 'ui/button', 'ui/calendar', 'viz/chart', 'ui/check_box', 'viz/circular_gauge', 'ui/color_box', 'ui/context_menu', 'ui/data_grid', 'ui/date_box', 'ui/defer_rendering', 'ui/drawer', 'ui/drop_down_box', 'ui/file_manager', 'ui/file_uploader', 'ui/filter_builder', 'ui/form', 'viz/funnel', 'ui/gallery', 'ui/gantt', 'ui/html_editor', 'viz/linear_gauge', 'ui/list', 'ui/load_indicator', 'ui/load_panel', 'ui/lookup', 'ui/map', 'ui/menu', 'ui/multi_view', 'ui/number_box', 'viz/pie_chart', 'ui/pivot_grid', 'ui/pivot_grid_field_chooser', 'viz/polar_chart', 'ui/popover', 'ui/popup', 'ui/progress_bar', 'viz/range_selector', 'ui/range_slider', 'ui/radio_group', 'ui/resizable', 'ui/responsive_box', 'viz/sankey', 'ui/scheduler', 'ui/scroll_view', 'ui/select_box', 'ui/slider', 'viz/sparkline', 'ui/switch', 'ui/tab_panel', 'ui/tabs', 'ui/tag_box', 'ui/text_area', 'ui/text_box', 'ui/tile_view', 'ui/toast', 'ui/toolbar', 'ui/tooltip', 'ui/tree_list', 'viz/tree_map', 'ui/tree_view', 'ui/validation_group', 'ui/validation_summary', 'viz/vector_map', 'ui/drop_down_button', 'ui/drop_down_editor/ui.drop_down_editor.js', 'ui/drop_down_editor/ui.drop_down_list.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const widgetsList = {
        Accordion: $__require('ui/accordion'),
        ActionSheet: $__require('ui/action_sheet'),
        Autocomplete: $__require('ui/autocomplete'),
        BarGauge: $__require('viz/bar_gauge'),
        Box: $__require('ui/box'),
        Bullet: $__require('viz/bullet'),
        Button: $__require('ui/button'),
        Calendar: $__require('ui/calendar'),
        Chart: $__require('viz/chart'),
        CheckBox: $__require('ui/check_box'),
        CircularGauge: $__require('viz/circular_gauge'),
        ColorBox: $__require('ui/color_box'),
        ContextMenu: $__require('ui/context_menu'),
        DataGrid: $__require('ui/data_grid'),
        DateBox: $__require('ui/date_box'),
        DeferRendering: $__require('ui/defer_rendering'),
        Drawer: $__require('ui/drawer'),
        DropDownBox: $__require('ui/drop_down_box'),
        FileManager: $__require('ui/file_manager'),
        FileUploader: $__require('ui/file_uploader'),
        FilterBuilder: $__require('ui/filter_builder'),
        Form: $__require('ui/form'),
        Funnel: $__require('viz/funnel'),
        Gallery: $__require('ui/gallery'),
        Gantt: $__require('ui/gantt'),
        HtmlEditor: $__require('ui/html_editor'),
        LinearGauge: $__require('viz/linear_gauge'),
        List: $__require('ui/list'),
        LoadIndicator: $__require('ui/load_indicator'),
        LoadPanel: $__require('ui/load_panel'),
        Lookup: $__require('ui/lookup'),
        Map: $__require('ui/map'),
        Menu: $__require('ui/menu'),
        MultiView: $__require('ui/multi_view'),
        NumberBox: $__require('ui/number_box'),
        PieChart: $__require('viz/pie_chart'),
        PivotGrid: $__require('ui/pivot_grid'),
        PivotGridFieldChooser: $__require('ui/pivot_grid_field_chooser'),
        PolarChart: $__require('viz/polar_chart'),
        Popover: $__require('ui/popover'),
        Popup: $__require('ui/popup'),
        ProgressBar: $__require('ui/progress_bar'),
        RangeSelector: $__require('viz/range_selector'),
        RangeSlider: $__require('ui/range_slider'),
        RadioGroup: $__require('ui/radio_group'),
        Resizable: $__require('ui/resizable'),
        ResponsiveBox: $__require('ui/responsive_box'),
        Sankey: $__require('viz/sankey'),
        Scheduler: $__require('ui/scheduler'),
        ScrollView: $__require('ui/scroll_view'),
        SelectBox: $__require('ui/select_box'),
        Slider: $__require('ui/slider'),
        Sparkline: $__require('viz/sparkline'),
        Switch: $__require('ui/switch'),
        TabPanel: $__require('ui/tab_panel'),
        Tabs: $__require('ui/tabs'),
        TagBox: $__require('ui/tag_box'),
        TextArea: $__require('ui/text_area'),
        TextBox: $__require('ui/text_box'),
        TileView: $__require('ui/tile_view'),
        Toast: $__require('ui/toast'),
        Toolbar: $__require('ui/toolbar'),
        Tooltip: $__require('ui/tooltip'),
        TreeList: $__require('ui/tree_list'),
        TreeMap: $__require('viz/tree_map'),
        TreeView: $__require('ui/tree_view'),
        ValidationGroup: $__require('ui/validation_group'),
        ValidationSummary: $__require('ui/validation_summary'),
        VectorMap: $__require('viz/vector_map')
    };

    const dropDownEditorsList = {
        dxAutocomplete: $__require('ui/autocomplete'),
        dxColorBox: $__require('ui/color_box'),
        dxDateBox: $__require('ui/date_box'),
        dxDropDownBox: $__require('ui/drop_down_box'),
        dxDropDownButton: $__require('ui/drop_down_button'),
        dxSelectBox: $__require('ui/select_box'),
        dxTagBox: $__require('ui/tag_box'),
        dxDropDownEditor: $__require('ui/drop_down_editor/ui.drop_down_editor.js'),
        dxDropDownList: $__require('ui/drop_down_editor/ui.drop_down_list.js')
    };

    exports.widgetsList = widgetsList;
    exports.dropDownEditorsList = dropDownEditorsList;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/accordion","ui/action_sheet","ui/autocomplete","viz/bar_gauge","ui/box","viz/bullet","ui/button","ui/calendar","viz/chart","ui/check_box","viz/circular_gauge","ui/color_box","ui/context_menu","ui/data_grid","ui/date_box","ui/defer_rendering","ui/drawer","ui/drop_down_box","ui/file_manager","ui/file_uploader","ui/filter_builder","ui/form","viz/funnel","ui/gallery","ui/gantt","ui/html_editor","viz/linear_gauge","ui/list","ui/load_indicator","ui/load_panel","ui/lookup","ui/map","ui/menu","ui/multi_view","ui/number_box","viz/pie_chart","ui/pivot_grid","ui/pivot_grid_field_chooser","viz/polar_chart","ui/popover","ui/popup","ui/progress_bar","viz/range_selector","ui/range_slider","ui/radio_group","ui/resizable","ui/responsive_box","viz/sankey","ui/scheduler","ui/scroll_view","ui/select_box","ui/slider","viz/sparkline","ui/switch","ui/tab_panel","ui/tabs","ui/tag_box","ui/text_area","ui/text_box","ui/tile_view","ui/toast","ui/toolbar","ui/tooltip","ui/tree_list","viz/tree_map","ui/tree_view","ui/validation_group","ui/validation_summary","viz/vector_map","ui/drop_down_button","ui/drop_down_editor/ui.drop_down_editor.js","ui/drop_down_editor/ui.drop_down_list.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/accordion"), require("ui/action_sheet"), require("ui/autocomplete"), require("viz/bar_gauge"), require("ui/box"), require("viz/bullet"), require("ui/button"), require("ui/calendar"), require("viz/chart"), require("ui/check_box"), require("viz/circular_gauge"), require("ui/color_box"), require("ui/context_menu"), require("ui/data_grid"), require("ui/date_box"), require("ui/defer_rendering"), require("ui/drawer"), require("ui/drop_down_box"), require("ui/file_manager"), require("ui/file_uploader"), require("ui/filter_builder"), require("ui/form"), require("viz/funnel"), require("ui/gallery"), require("ui/gantt"), require("ui/html_editor"), require("viz/linear_gauge"), require("ui/list"), require("ui/load_indicator"), require("ui/load_panel"), require("ui/lookup"), require("ui/map"), require("ui/menu"), require("ui/multi_view"), require("ui/number_box"), require("viz/pie_chart"), require("ui/pivot_grid"), require("ui/pivot_grid_field_chooser"), require("viz/polar_chart"), require("ui/popover"), require("ui/popup"), require("ui/progress_bar"), require("viz/range_selector"), require("ui/range_slider"), require("ui/radio_group"), require("ui/resizable"), require("ui/responsive_box"), require("viz/sankey"), require("ui/scheduler"), require("ui/scroll_view"), require("ui/select_box"), require("ui/slider"), require("viz/sparkline"), require("ui/switch"), require("ui/tab_panel"), require("ui/tabs"), require("ui/tag_box"), require("ui/text_area"), require("ui/text_box"), require("ui/tile_view"), require("ui/toast"), require("ui/toolbar"), require("ui/tooltip"), require("ui/tree_list"), require("viz/tree_map"), require("ui/tree_view"), require("ui/validation_group"), require("ui/validation_summary"), require("viz/vector_map"), require("ui/drop_down_button"), require("ui/drop_down_editor/ui.drop_down_editor.js"), require("ui/drop_down_editor/ui.drop_down_list.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=widgetsList.js.map