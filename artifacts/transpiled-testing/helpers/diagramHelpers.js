!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/diagramHelpers.js"], ["jquery","ui/diagram/ui.diagram.context_menu.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/helpers/diagramHelpers.js", ["jquery", "ui/diagram/ui.diagram.context_menu.js"], function($__export) {
  "use strict";
  var $,
      DiagramContextMenu,
      Consts;
  function getMainToolbarElement($diagramElement) {
    return $diagramElement.find(Consts.MAIN_TOOLBAR_SELECTOR);
  }
  function getMainToolbarInstance($diagramElement) {
    return getMainToolbarElement($diagramElement).dxToolbar('instance');
  }
  function getHistoryToolbarElement($diagramElement) {
    return $($diagramElement.find(Consts.FLOATING_TOOLBAR_SELECTOR).get(0));
  }
  function getHistoryToolbarInstance($diagramElement) {
    return getHistoryToolbarElement($diagramElement).dxToolbar('instance');
  }
  function getViewToolbarElement($diagramElement) {
    return $($diagramElement.find(Consts.FLOATING_TOOLBAR_SELECTOR).get(2));
  }
  function getViewToolbarInstance($diagramElement) {
    return getViewToolbarElement($diagramElement).dxToolbar('instance');
  }
  function getPropertiesToolbarElement($diagramElement) {
    return $($diagramElement.find(Consts.FLOATING_TOOLBAR_SELECTOR).get(1));
  }
  function getPropertiesToolbarInstance($diagramElement) {
    return getPropertiesToolbarElement($diagramElement).dxToolbar('instance');
  }
  function findMainToolbarItem($diagramElement, label) {
    return $diagramElement.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-widget').filter(function() {
      return $(this).text().toLowerCase().indexOf(label) >= 0;
    });
  }
  function findHistoryToolbarItem($diagramElement, label) {
    return getHistoryToolbarElement($diagramElement).find('.dx-widget').filter(function() {
      return $(this).text().toLowerCase().indexOf(label) >= 0;
    });
  }
  function findViewToolbarItem($diagramElement, label) {
    return getViewToolbarElement($diagramElement).find('.dx-widget').filter(function() {
      return $(this).text().toLowerCase().indexOf(label) >= 0;
    });
  }
  function findPropertiesToolbarItem($diagramElement, label) {
    return getPropertiesToolbarElement($diagramElement).find('.dx-widget').filter(function() {
      return $(this).text().toLowerCase().indexOf(label) >= 0;
    });
  }
  function findPropertiesPanelToolbarItem($diagramElement, label) {
    return $('#qunit-fixture').find(Consts.PROPERTIES_PANEL_TOOLBAR_SELECTOR).find('.dx-widget').filter(function() {
      return $(this).text().toLowerCase().indexOf(label) >= 0;
    });
  }
  function getToolbarIcon($button) {
    return $button.find('.dx-dropdowneditor-field-template-wrapper').find('.dx-diagram-i, .dx-icon');
  }
  function getContextMenuItemCheck($button) {
    return $button.find('.dx-icon-check');
  }
  function getContextMenuElement($diagramElement) {
    return $diagramElement.find(Consts.CONTEXT_MENU_SELECTOR);
  }
  function getContextMenuInstance($diagramElement) {
    return DiagramContextMenu.getInstance(getContextMenuElement($diagramElement));
  }
  function findContextMenuItem($diagramElement, label) {
    return $('body').find('.dx-diagram-contextmenu, .dx-diagram-touchbar').find(Consts.DX_MENU_ITEM_SELECTOR).filter(function() {
      return $(this).text().toLowerCase().indexOf(label) >= 0;
    });
  }
  $__export("getMainToolbarElement", getMainToolbarElement);
  $__export("getMainToolbarInstance", getMainToolbarInstance);
  $__export("getHistoryToolbarElement", getHistoryToolbarElement);
  $__export("getHistoryToolbarInstance", getHistoryToolbarInstance);
  $__export("getViewToolbarElement", getViewToolbarElement);
  $__export("getViewToolbarInstance", getViewToolbarInstance);
  $__export("getPropertiesToolbarElement", getPropertiesToolbarElement);
  $__export("getPropertiesToolbarInstance", getPropertiesToolbarInstance);
  $__export("findMainToolbarItem", findMainToolbarItem);
  $__export("findHistoryToolbarItem", findHistoryToolbarItem);
  $__export("findViewToolbarItem", findViewToolbarItem);
  $__export("findPropertiesToolbarItem", findPropertiesToolbarItem);
  $__export("findPropertiesPanelToolbarItem", findPropertiesPanelToolbarItem);
  $__export("getToolbarIcon", getToolbarIcon);
  $__export("getContextMenuItemCheck", getContextMenuItemCheck);
  $__export("getContextMenuElement", getContextMenuElement);
  $__export("getContextMenuInstance", getContextMenuInstance);
  $__export("findContextMenuItem", findContextMenuItem);
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      DiagramContextMenu = $__m.DiagramContextMenu;
    }],
    execute: function() {
      Consts = {
        SIMPLE_DIAGRAM: '{ "shapes": [{ "key":"107", "type":"Ellipsis", "text":"A new ticket", "x":1440, "y":1080, "width":1440, "height":720, "zIndex":0 }] }',
        SIMPLE_DIAGRAM_WITH_CONTAINER: '{"connectors":[],"shapes":[{"key":"1", "type":"verticalContainer", "text":"ASP.NET Team","x":1080,"y":1440,"width":2160,"height":5760,"childKeys":["5"]},{"key":"5","type":"rectangle","text":"Laurence Lebihan","x":1440,"y":2160,"width":1440,"height":1080}]}',
        MAIN_TOOLBAR_SELECTOR: '.dx-diagram-toolbar-wrapper > .dx-diagram-toolbar',
        FLOATING_TOOLBAR_SELECTOR: '.dx-diagram-floating-toolbar-container > .dx-diagram-toolbar',
        CONTEXT_MENU_SELECTOR: 'div:not(.dx-diagram-toolbar-wrapper):not(.dx-diagram-floating-toolbar-container) > .dx-has-context-menu',
        CONTEXT_TOOLBOX_SELECTOR: '.dx-diagram-context-toolbox',
        CONTEXT_TOOLBOX_CONTENT_SELECTOR: '.dx-diagram-context-toolbox-content',
        TOOLBAR_ITEM_ACTIVE_CLASS: 'dx-format-active',
        DX_MENU_ITEM_SELECTOR: '.dx-menu-item',
        PROPERTIES_PANEL_SELECTOR: '.dx-diagram-properties-panel',
        PROPERTIES_PANEL_TOOLBAR_SELECTOR: '.dx-diagram-properties-panel .dx-diagram-properties-panel-group-toolbar',
        TOOLBOX_INPUT_CONTAINER_SELECTOR: '.dx-diagram-toolbox-input-container',
        TOOLBOX_SCROLLVIEW_SELECTOR: '.dx-diagram-toolbox-panel .dx-scrollview',
        TOOLBOX_ACCORDION_SELECTOR: '.dx-diagram-toolbox-panel .dx-accordion',
        FULLSCREEN_CLASS: 'dx-diagram-fullscreen'
      };
      $__export("Consts", Consts);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/diagram/ui.diagram.context_menu.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/diagram/ui.diagram.context_menu.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=diagramHelpers.js.map