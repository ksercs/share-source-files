!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/pivot_grid/xmla_store/module.js"], ["../../../../core/renderer","../../../../core/utils/window","../../../../core/class","../../../../core/utils/string","../../../../data/errors","../../../../core/utils/common","../../../../core/utils/extend","../../../../core/utils/type","../../../../core/utils/iterator","../../../../core/utils/deferred","../../../../localization/language_codes","../module_widget_utils"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/pivot_grid/xmla_store/module.js", ["../../../../core/renderer", "../../../../core/utils/window", "../../../../core/class", "../../../../core/utils/string", "../../../../data/errors", "../../../../core/utils/common", "../../../../core/utils/extend", "../../../../core/utils/type", "../../../../core/utils/iterator", "../../../../core/utils/deferred", "../../../../localization/language_codes", "../module_widget_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.XmlaStore = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _window = $__require("../../../../core/utils/window");
  var _class = _interopRequireDefault($__require("../../../../core/class"));
  var _string = $__require("../../../../core/utils/string");
  var _errors = $__require("../../../../data/errors");
  var _common = $__require("../../../../core/utils/common");
  var _extend = $__require("../../../../core/utils/extend");
  var _type = $__require("../../../../core/utils/type");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _deferred = $__require("../../../../core/utils/deferred");
  var _language_codes = $__require("../../../../localization/language_codes");
  var _module_widget_utils = _interopRequireWildcard($__require("../module_widget_utils"));
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return { default: obj };
    }var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {
      return cache.get(obj);
    }var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }newObj.default = obj;if (cache) {
      cache.set(obj, newObj);
    }return newObj;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var window = (0, _window.getWindow)();
  var XmlaStore = _class.default.inherit(function () {
    var discover = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><Discover xmlns="urn:schemas-microsoft-com:xml-analysis"><RequestType>{2}</RequestType><Restrictions><RestrictionList><CATALOG_NAME>{0}</CATALOG_NAME><CUBE_NAME>{1}</CUBE_NAME></RestrictionList></Restrictions><Properties><PropertyList><Catalog>{0}</Catalog>{3}</PropertyList></Properties></Discover></Body></Envelope>';
    var execute = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><Execute xmlns="urn:schemas-microsoft-com:xml-analysis"><Command><Statement>{0}</Statement></Command><Properties><PropertyList><Catalog>{1}</Catalog><ShowHiddenCubes>True</ShowHiddenCubes><SspropInitAppName>Microsoft SQL Server Management Studio</SspropInitAppName><Timeout>3600</Timeout>{2}</PropertyList></Properties></Execute></Body></Envelope>';
    var mdx = 'SELECT {2} FROM {0} {1} CELL PROPERTIES VALUE, FORMAT_STRING, LANGUAGE, BACK_COLOR, FORE_COLOR, FONT_FLAGS';
    var mdxFilterSelect = '(SELECT {0} FROM {1})';
    var mdxSubset = 'Subset({0}, {1}, {2})';
    var mdxOrder = 'Order({0}, {1}, {2})';
    var mdxWith = '{0} {1} as {2}';
    var mdxSlice = 'WHERE ({0})';
    var mdxNonEmpty = 'NonEmpty({0}, {1})';
    var mdxAxis = '{0} DIMENSION PROPERTIES PARENT_UNIQUE_NAME,HIERARCHY_UNIQUE_NAME, MEMBER_VALUE ON {1}';
    var mdxCrossJoin = 'CrossJoin({0})';
    var mdxSet = '{{0}}';
    var MEASURE_DEMENSION_KEY = 'DX_MEASURES';
    var MD_DIMTYPE_MEASURE = '2';
    function execXMLA(requestOptions, data) {
      // @ts-expect-error
      var deferred = new _deferred.Deferred();
      var beforeSend = requestOptions.beforeSend;
      var ajaxSettings = {
        url: requestOptions.url,
        dataType: 'text',
        data: data,
        headers: {
          'Content-Type': 'text/xml'
        },
        xhrFields: {},
        method: 'POST'
      };
      if ((0, _type.isFunction)(beforeSend)) {
        beforeSend(ajaxSettings);
      }
      _module_widget_utils.default.sendRequest(ajaxSettings).fail(function () {
        deferred.reject(arguments);
      }).done(function (text) {
        var parser = new window.DOMParser();
        var xml;
        try {
          try {
            // For IE
            xml = parser.parseFromString(text, 'text/xml');
          } catch (e) {
            xml = undefined;
          }
          if (!xml || xml.getElementsByTagName('parsererror').length || xml.childNodes.length === 0) {
            throw new _errors.errors.Error('E4023', text);
          }
        } catch (e) {
          deferred.reject({
            statusText: e.message,
            stack: e.stack,
            responseText: text
          });
        }
        deferred.resolve(xml);
      });
      return deferred;
    }
    function getLocaleIdProperty() {
      var languageId = (0, _language_codes.getLanguageId)();
      if (languageId !== undefined) {
        return (0, _string.format)('<LocaleIdentifier>{0}</LocaleIdentifier>', languageId);
      }
      return '';
    }
    function mdxDescendants(level, levelMember, nextLevel) {
      var memberExpression = levelMember || level;
      return "Descendants({".concat(memberExpression, "}, ").concat(nextLevel, ", SELF_AND_BEFORE)");
    }
    function getAllMember(dimension) {
      return "".concat(dimension.hierarchyName || dimension.dataField, ".[All]");
    }
    function getAllMembers(field) {
      var result = "".concat(field.dataField, ".allMembers");
      var searchValue = field.searchValue;
      if (searchValue) {
        searchValue = searchValue.replace(/'/g, '\'\'');
        result = "Filter(".concat(result, ", instr(").concat(field.dataField, ".currentmember.member_caption,'").concat(searchValue, "') > 0)");
      }
      return result;
    }
    function crossJoinElements(elements) {
      var elementsString = elements.join(',');
      return elements.length > 1 ? (0, _string.format)(mdxCrossJoin, elementsString) : elementsString;
    }
    function union(elements) {
      var elementsString = elements.join(',');
      return elements.length > 1 ? "Union(".concat(elementsString, ")") : elementsString;
    }
    function generateCrossJoin(path, expandLevel, expandAllCount, expandIndex, slicePath, options, axisName, take) {
      var crossJoinArgs = [];
      var dimensions = options[axisName];
      var fields = [];
      var arg;
      var prevDimension;
      var member;
      for (var i = expandIndex; i <= expandLevel; i += 1) {
        var field = dimensions[i];
        var dataField = field.dataField;
        var prevHierarchyName = dimensions[i - 1] && dimensions[i - 1].hierarchyName;
        var hierarchyName = field.hierarchyName;
        var isLastDimensionInGroup = !hierarchyName || !dimensions[i + 1] || dimensions[i + 1].hierarchyName !== hierarchyName;
        var expandAllIndex = path.length + expandAllCount + expandIndex;
        arg = null;
        fields.push(field);
        if (i < path.length) {
          if (isLastDimensionInGroup) {
            arg = "(".concat(dataField, ".").concat(preparePathValue(path[i], dataField), ")");
          }
        } else if (i <= expandAllIndex) {
          if (i === 0 && expandAllCount === 0) {
            var allMember = getAllMember(dimensions[expandIndex]);
            if (!hierarchyName) {
              arg = getAllMembers(dimensions[expandIndex]);
            } else {
              arg = "".concat(allMember, ",").concat(dimensions[expandIndex].dataField);
            }
          } else if (hierarchyName) {
            member = preparePathValue(slicePath[slicePath.length - 1]);
            if (isLastDimensionInGroup || i === expandAllIndex) {
              if (prevHierarchyName === hierarchyName) {
                if (slicePath.length) {
                  prevDimension = dimensions[slicePath.length - 1];
                }
                if (!prevDimension || prevDimension.hierarchyName !== hierarchyName) {
                  prevDimension = dimensions[i - 1];
                  member = '';
                }
                arg = mdxDescendants(prevDimension.dataField, member, dataField);
              } else {
                arg = getAllMembers(field);
              }
            }
          } else {
            arg = getAllMembers(field);
          }
        } else {
          var isFirstDimensionInGroup = !hierarchyName || prevHierarchyName !== hierarchyName;
          if (isFirstDimensionInGroup) {
            arg = "(".concat(getAllMember(field), ")");
          }
        }
        if (arg) {
          arg = (0, _string.format)(mdxSet, arg);
          if (take) {
            var sortBy = (field.hierarchyName || field.dataField) + (field.sortBy === 'displayText' ? '.MEMBER_CAPTION' : '.MEMBER_VALUE');
            arg = (0, _string.format)(mdxOrder, arg, sortBy, field.sortOrder === 'desc' ? 'DESC' : 'ASC');
          }
          crossJoinArgs.push(arg);
        }
      }
      return crossJoinElements(crossJoinArgs);
    }
    function fillCrossJoins(crossJoins, path, expandLevel, expandIndex, slicePath, options, axisName, cellsString, take, totalsOnly) {
      var expandAllCount = -1;
      var dimensions = options[axisName];
      var dimensionIndex;
      do {
        expandAllCount += 1;
        dimensionIndex = path.length + expandAllCount + expandIndex;
        var crossJoin = generateCrossJoin(path, expandLevel, expandAllCount, expandIndex, slicePath, options, axisName, take);
        if (!take && !totalsOnly) {
          crossJoin = (0, _string.format)(mdxNonEmpty, crossJoin, cellsString);
        }
        crossJoins.push(crossJoin);
      } while (dimensions[dimensionIndex] && dimensions[dimensionIndex + 1] && dimensions[dimensionIndex].expanded);
    }
    function declare(expression, withArray, name, type) {
      name = name || "[DX_Set_".concat(withArray.length, "]");
      type = type || 'set';
      withArray.push((0, _string.format)(mdxWith, type, name, expression));
      return name;
    }
    function generateAxisMdx(options, axisName, cells, withArray, parseOptions) {
      var dimensions = options[axisName];
      var crossJoins = [];
      var path = [];
      var expandedPaths = [];
      var expandIndex = 0;
      var expandLevel = 0;
      var result = [];
      var cellsString = (0, _string.format)(mdxSet, cells.join(','));
      if (dimensions && dimensions.length) {
        if (options.headerName === axisName) {
          path = options.path;
          expandIndex = path.length;
        } else if (options.headerName && options.oppositePath) {
          path = options.oppositePath;
          expandIndex = path.length;
        } else {
          expandedPaths = (axisName === 'columns' ? options.columnExpandedPaths : options.rowExpandedPaths) || expandedPaths;
        }
        expandLevel = (0, _module_widget_utils.getExpandedLevel)(options, axisName);
        fillCrossJoins(crossJoins, [], expandLevel, expandIndex, path, options, axisName, cellsString, axisName === 'rows' ? options.rowTake : options.columnTake, options.totalsOnly);
        (0, _iterator.each)(expandedPaths, function (_, expandedPath) {
          fillCrossJoins(crossJoins, expandedPath, expandLevel, expandIndex, expandedPath, options, axisName, cellsString);
        });
        for (var i = expandLevel; i >= path.length; i -= 1) {
          if (dimensions[i].hierarchyName) {
            parseOptions.visibleLevels[dimensions[i].hierarchyName] = parseOptions.visibleLevels[dimensions[i].hierarchyName] || [];
            parseOptions.visibleLevels[dimensions[i].hierarchyName].push(dimensions[i].dataField);
          }
        }
      }
      if (crossJoins.length) {
        var expression = union(crossJoins);
        if (axisName === 'rows' && options.rowTake) {
          expression = (0, _string.format)(mdxSubset, expression, options.rowSkip > 0 ? options.rowSkip + 1 : 0, options.rowSkip > 0 ? options.rowTake : options.rowTake + 1);
        }
        if (axisName === 'columns' && options.columnTake) {
          expression = (0, _string.format)(mdxSubset, expression, options.columnSkip > 0 ? options.columnSkip + 1 : 0, options.columnSkip > 0 ? options.columnTake : options.columnTake + 1);
        }
        var axisSet = "[DX_".concat(axisName, "]");
        result.push(declare(expression, withArray, axisSet));
        if (options.totalsOnly) {
          result.push(declare("COUNT(".concat(axisSet, ")"), withArray, "[DX_".concat(axisName, "_count]"), 'member'));
        }
      }
      if (axisName === 'columns' && cells.length && !options.skipValues) {
        result.push(cellsString);
      }
      return (0, _string.format)(mdxAxis, crossJoinElements(result), axisName);
    }
    function generateAxisFieldsFilter(fields) {
      var filterMembers = [];
      (0, _iterator.each)(fields, function (_, field) {
        var dataField = field.dataField;
        var filterExpression = [];
        var filterValues = field.filterValues || [];
        var filterStringExpression;
        if (field.hierarchyName && (0, _type.isNumeric)(field.groupIndex)) {
          return;
        }
        (0, _iterator.each)(filterValues, function (_, filterValue) {
          var filterMdx = "".concat(dataField, ".").concat(preparePathValue(Array.isArray(filterValue) ? filterValue[filterValue.length - 1] : filterValue, dataField));
          if (field.filterType === 'exclude') {
            filterExpression.push("".concat(filterMdx, ".parent"));
            filterMdx = "Descendants(".concat(filterMdx, ")");
          }
          filterExpression.push(filterMdx);
        });
        if (filterValues.length) {
          filterStringExpression = (0, _string.format)(mdxSet, filterExpression.join(','));
          if (field.filterType === 'exclude') {
            filterStringExpression = "Except(".concat(getAllMembers(field), ",").concat(filterStringExpression, ")");
          }
          filterMembers.push(filterStringExpression);
        }
      });
      return filterMembers.length ? crossJoinElements(filterMembers) : '';
    }
    function generateFrom(columnsFilter, rowsFilter, filter, cubeName) {
      var from = "[".concat(cubeName, "]");
      (0, _iterator.each)([columnsFilter, rowsFilter, filter], function (_, filter) {
        if (filter) {
          from = (0, _string.format)(mdxFilterSelect, "".concat(filter, "on 0"), from);
        }
      });
      return from;
    }
    function generateMdxCore(axisStrings, withArray, columns, rows, filters, slice, cubeName) {
      var options = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
      var mdxString = '';
      var withString = "".concat(withArray.length ? "with ".concat(withArray.join(' ')) : '', " ");
      if (axisStrings.length) {
        var select;
        if (options.totalsOnly) {
          var countMembers = [];
          if (rows.length) {
            countMembers.push('[DX_rows_count]');
          }
          if (columns.length) {
            countMembers.push('[DX_columns_count]');
          }
          select = "{".concat(countMembers.join(','), "} on columns");
        } else {
          select = axisStrings.join(',');
        }
        mdxString = withString + (0, _string.format)(mdx, generateFrom(generateAxisFieldsFilter(columns), generateAxisFieldsFilter(rows), generateAxisFieldsFilter(filters || []), cubeName), slice.length ? (0, _string.format)(mdxSlice, slice.join(',')) : '', select);
      }
      return mdxString;
    }
    function prepareDataFields(withArray, valueFields) {
      return (0, _iterator.map)(valueFields, function (cell) {
        if ((0, _type.isString)(cell.expression)) {
          declare(cell.expression, withArray, cell.dataField, 'member');
        }
        return cell.dataField;
      });
    }
    function addSlices(slices, options, headerName, path) {
      (0, _iterator.each)(path, function (index, value) {
        var dimension = options[headerName][index];
        if (!dimension.hierarchyName || dimension.hierarchyName !== options[headerName][index + 1].hierarchyName) {
          slices.push("".concat(dimension.dataField, ".").concat(preparePathValue(value, dimension.dataField)));
        }
      });
    }
    function generateMDX(options, cubeName, parseOptions) {
      var columns = options.columns || [];
      var rows = options.rows || [];
      var values = options.values && options.values.length ? options.values : [{
        dataField: '[Measures]'
      }];
      var slice = [];
      var withArray = [];
      var axisStrings = [];
      var dataFields = prepareDataFields(withArray, values);
      parseOptions.measureCount = options.skipValues ? 1 : values.length;
      parseOptions.visibleLevels = {};
      if (options.headerName && options.path) {
        addSlices(slice, options, options.headerName, options.path);
      }
      if (options.headerName && options.oppositePath) {
        addSlices(slice, options, options.headerName === 'rows' ? 'columns' : 'rows', options.oppositePath);
      }
      if (columns.length || dataFields.length) {
        axisStrings.push(generateAxisMdx(options, 'columns', dataFields, withArray, parseOptions));
      }
      if (rows.length) {
        axisStrings.push(generateAxisMdx(options, 'rows', dataFields, withArray, parseOptions));
      }
      return generateMdxCore(axisStrings, withArray, columns, rows, options.filters, slice, cubeName, options);
    }
    function createDrillDownAxisSlice(slice, fields, path) {
      (0, _iterator.each)(path, function (index, value) {
        var field = fields[index];
        if (field.hierarchyName && (fields[index + 1] || {}).hierarchyName === field.hierarchyName) {
          return;
        }
        slice.push("".concat(field.dataField, ".").concat(preparePathValue(value, field.dataField)));
      });
    }
    function generateDrillDownMDX(options, cubeName, params) {
      var columns = options.columns || [];
      var rows = options.rows || [];
      var values = options.values && options.values.length ? options.values : [{
        dataField: '[Measures]'
      }];
      var slice = [];
      var withArray = [];
      var axisStrings = [];
      var dataFields = prepareDataFields(withArray, values);
      var maxRowCount = params.maxRowCount;
      var customColumns = params.customColumns || [];
      var customColumnsString = customColumns.length > 0 ? " return ".concat(customColumns.join(',')) : '';
      createDrillDownAxisSlice(slice, columns, params.columnPath || []);
      createDrillDownAxisSlice(slice, rows, params.rowPath || []);
      if (columns.length || dataFields.length) {
        axisStrings.push(["".concat(dataFields[params.dataIndex] || dataFields[0], " on 0")]);
      }
      var coreMDX = generateMdxCore(axisStrings, withArray, columns, rows, options.filters, slice, cubeName);
      return coreMDX ? "drillthrough".concat(maxRowCount > 0 ? " maxrows ".concat(maxRowCount) : '').concat(coreMDX).concat(customColumnsString) : coreMDX;
    }
    function getNumber(str) {
      return parseInt(str, 10);
    }
    function parseValue(valueText) {
      // @ts-expect-error
      return (0, _type.isNumeric)(valueText) ? parseFloat(valueText) : valueText;
    }
    function getFirstChild(node, tagName) {
      return (node.getElementsByTagName(tagName) || [])[0];
    }
    function getFirstChildText(node, childTagName) {
      return getNodeText(getFirstChild(node, childTagName));
    }
    function parseAxes(xml, skipValues) {
      var axes = [];
      (0, _iterator.each)(xml.getElementsByTagName('Axis'), function (_, axisElement) {
        var name = axisElement.getAttribute('name');
        var axis = [];
        var index = 0;
        if (name.indexOf('Axis') === 0 && (0, _type.isNumeric)(getNumber(name.substr(4)))) {
          axes.push(axis);
          (0, _iterator.each)(axisElement.getElementsByTagName('Tuple'), function (_, tupleElement) {
            var tupleMembers = tupleElement.childNodes;
            var levelSum = 0;
            var members = [];
            var membersCount = skipValues ? tupleMembers.length : tupleMembers.length - 1;
            var isAxisWithMeasure = axes.length === 1;
            if (isAxisWithMeasure) {
              membersCount -= 1;
            }
            axis.push(members);
            for (var i = membersCount; i >= 0; i -= 1) {
              var tuple = tupleMembers[i];
              var level = getNumber(getFirstChildText(tuple, 'LNum'));
              members[i] = {
                caption: getFirstChildText(tuple, 'Caption'),
                value: parseValue(getFirstChildText(tuple, 'MEMBER_VALUE')),
                level: level,
                // eslint-disable-next-line no-plusplus
                index: index++,
                hasValue: !levelSum && (!!level || i === 0),
                name: getFirstChildText(tuple, 'UName'),
                hierarchyName: tupleMembers[i].getAttribute('Hierarchy'),
                parentName: getFirstChildText(tuple, 'PARENT_UNIQUE_NAME'),
                levelName: getFirstChildText(tuple, 'LName')
              };
              levelSum += level;
            }
          });
        }
      });
      while (axes.length < 2) {
        axes.push([[{
          level: 0
        }]]);
      }
      return axes;
    }
    function getNodeText(node) {
      return node && (node.textContent || node.text || node.innerHTML) || '';
    }
    function parseCells(xml, axes, measureCount) {
      var cells = [];
      var cell = [];
      var index = 0;
      var cellsOriginal = [];
      var cellElements = xml.getElementsByTagName('Cell');
      var errorDictionary = {};
      for (var i = 0; i < cellElements.length; i += 1) {
        var xmlCell = cellElements[i];
        var valueElement = xmlCell.getElementsByTagName('Value')[0];
        var errorElements = valueElement && valueElement.getElementsByTagName('Error') || [];
        var text = errorElements.length === 0 ? getNodeText(valueElement) : '#N/A';
        var value = parseFloat(text);
        var _isNumeric = text - value + 1 > 0;
        var cellOrdinal = getNumber(xmlCell.getAttribute('CellOrdinal'));
        if (errorElements.length) {
          errorDictionary[getNodeText(errorElements[0].getElementsByTagName('ErrorCode')[0])] = getNodeText(errorElements[0].getElementsByTagName('Description')[0]);
        }
        cellsOriginal[cellOrdinal] = {
          value: _isNumeric ? value : text || null
        };
      }
      (0, _iterator.each)(axes[1], function () {
        var row = [];
        cells.push(row);
        (0, _iterator.each)(axes[0], function () {
          var measureIndex = index % measureCount;
          if (measureIndex === 0) {
            cell = [];
            row.push(cell);
          }
          cell.push(cellsOriginal[index] ? cellsOriginal[index].value : null);
          index += 1;
        });
      });
      Object.keys(errorDictionary).forEach(function (key) {
        _errors.errors.log('W4002', errorDictionary[key]);
      });
      return cells;
    }
    function preparePathValue(pathValue, dataField) {
      if (pathValue) {
        pathValue = (0, _type.isString)(pathValue) && pathValue.includes('&') ? pathValue : "[".concat(pathValue, "]");
        if (dataField && pathValue.indexOf("".concat(dataField, ".")) === 0) {
          pathValue = pathValue.slice(dataField.length + 1, pathValue.length);
        }
      }
      return pathValue;
    }
    function getItem(hash, name, member, index) {
      var item = hash[name];
      if (!item) {
        item = {};
        hash[name] = item;
      }
      if (!(0, _type.isDefined)(item.value) && member) {
        item.text = member.caption;
        item.value = member.value;
        item.key = name || '';
        item.levelName = member.levelName;
        item.hierarchyName = member.hierarchyName;
        item.parentName = member.parentName;
        item.index = index;
        item.level = member.level;
      }
      return item;
    }
    function getVisibleChildren(item, visibleLevels) {
      var result = [];
      var children = item.children && (item.children.length ? item.children : Object.keys(item.children.grandTotalHash || {}).reduce(function (result, name) {
        return result.concat(item.children.grandTotalHash[name].children);
      }, []));
      var firstChild = children && children[0];
      if (firstChild && (visibleLevels[firstChild.hierarchyName] && visibleLevels[firstChild.hierarchyName].includes(firstChild.levelName) || !visibleLevels[firstChild.hierarchyName] || firstChild.level === 0)) {
        var newChildren = children.filter(function (child) {
          return child.hierarchyName === firstChild.hierarchyName;
        });
        newChildren.grandTotalHash = children.grandTotalHash;
        return newChildren;
      }
      if (firstChild) {
        for (var i = 0; i < children.length; i += 1) {
          if (children[i].hierarchyName === firstChild.hierarchyName) {
            result.push.apply(result, getVisibleChildren(children[i], visibleLevels));
          }
        }
      }
      return result;
    }
    function processMember(dataIndex, member, parentItem) {
      var children = parentItem.children = parentItem.children || [];
      var hash = children.hash = children.hash || {};
      var grandTotalHash = children.grandTotalHash = children.grandTotalHash || {};
      if (member.parentName) {
        parentItem = getItem(hash, member.parentName);
        children = parentItem.children = parentItem.children || [];
      }
      var currentItem = getItem(hash, member.name, member, dataIndex);
      if (member.hasValue && !currentItem.added) {
        currentItem.index = dataIndex;
        currentItem.added = true;
        children.push(currentItem);
      }
      if ((!parentItem.value || !parentItem.parentName) && member.parentName) {
        grandTotalHash[member.parentName] = parentItem;
      } else if (grandTotalHash[parentItem.name]) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete grandTotalHash[member.parentName];
      }
      return currentItem;
    }
    function getGrandTotalIndex(parentItem, visibleLevels) {
      var grandTotalIndex;
      if (parentItem.children.length === 1 && parentItem.children[0].parentName === '') {
        grandTotalIndex = parentItem.children[0].index;
        // TODO - refactoring
        var grandTotalHash = parentItem.children.grandTotalHash;
        parentItem.children = parentItem.children[0].children || [];
        parentItem.children.grandTotalHash = grandTotalHash;
        parentItem.children = getVisibleChildren(parentItem, visibleLevels);
      } else if (parentItem.children.length === 0) {
        grandTotalIndex = 0;
      }
      return grandTotalIndex;
    }
    function fillDataSourceAxes(dataSourceAxis, axisTuples, measureCount, visibleLevels) {
      var result = [];
      (0, _iterator.each)(axisTuples, function (tupleIndex, members) {
        var parentItem = {
          children: result
        };
        var dataIndex = (0, _type.isDefined)(measureCount) ? Math.floor(tupleIndex / measureCount) : tupleIndex;
        (0, _iterator.each)(members, function (_, member) {
          parentItem = processMember(dataIndex, member, parentItem);
        });
      });
      var parentItem = {
        children: result
      };
      parentItem.children = getVisibleChildren(parentItem, visibleLevels);
      var grandTotalIndex = getGrandTotalIndex(parentItem, visibleLevels);
      (0, _module_widget_utils.foreachTree)(parentItem.children, function (items) {
        var item = items[0];
        var children = getVisibleChildren(item, visibleLevels);
        if (children.length) {
          item.children = children;
        } else {
          delete item.children;
        }
        delete item.levelName;
        delete item.hierarchyName;
        delete item.added;
        delete item.parentName;
        delete item.level;
      }, true);
      (0, _iterator.each)(parentItem.children || [], function (_, e) {
        dataSourceAxis.push(e);
      });
      return grandTotalIndex;
    }
    function checkError(xml) {
      var faultElementNS = xml.getElementsByTagName('soap:Fault');
      var faultElement = xml.getElementsByTagName('Fault');
      var errorElement = (0, _renderer.default)([].slice.call(faultElement.length ? faultElement : faultElementNS)).find('Error');
      if (errorElement.length) {
        var description = errorElement.attr('Description');
        var error = new _errors.errors.Error('E4000', description);
        _errors.errors.log('E4000', description);
        return error;
      }
      return null;
    }
    function parseResult(xml, parseOptions) {
      var dataSource = {
        columns: [],
        rows: []
      };
      var measureCount = parseOptions.measureCount;
      var axes = parseAxes(xml, parseOptions.skipValues);
      dataSource.grandTotalColumnIndex = fillDataSourceAxes(dataSource.columns, axes[0], measureCount, parseOptions.visibleLevels);
      dataSource.grandTotalRowIndex = fillDataSourceAxes(dataSource.rows, axes[1], undefined, parseOptions.visibleLevels);
      dataSource.values = parseCells(xml, axes, measureCount);
      return dataSource;
    }
    function parseDiscoverRowSet(xml, schema, dimensions, translatedDisplayFolders) {
      var result = [];
      var isMeasure = schema === 'MEASURE';
      var displayFolderField = isMeasure ? 'MEASUREGROUP_NAME' : "".concat(schema, "_DISPLAY_FOLDER");
      (0, _iterator.each)(xml.getElementsByTagName('row'), function (_, row) {
        var hierarchyName = schema === 'LEVEL' ? getFirstChildText(row, 'HIERARCHY_UNIQUE_NAME') : undefined;
        var levelNumber = getFirstChildText(row, 'LEVEL_NUMBER');
        var displayFolder = getFirstChildText(row, displayFolderField);
        if (isMeasure) {
          displayFolder = translatedDisplayFolders[displayFolder] || displayFolder;
        }
        if ((levelNumber !== '0' || getFirstChildText(row, "".concat(schema, "_IS_VISIBLE")) !== 'true') && getFirstChildText(row, 'DIMENSION_TYPE') !== MD_DIMTYPE_MEASURE) {
          var dimension = isMeasure ? MEASURE_DEMENSION_KEY : getFirstChildText(row, 'DIMENSION_UNIQUE_NAME');
          var dataField = getFirstChildText(row, "".concat(schema, "_UNIQUE_NAME"));
          result.push({
            dimension: dimensions.names[dimension] || dimension,
            groupIndex: levelNumber ? getNumber(levelNumber) - 1 : undefined,
            dataField: dataField,
            caption: getFirstChildText(row, "".concat(schema, "_CAPTION")),
            hierarchyName: hierarchyName,
            groupName: hierarchyName,
            displayFolder: displayFolder,
            isMeasure: isMeasure,
            isDefault: !!dimensions.defaultHierarchies[dataField]
          });
        }
      });
      return result;
    }
    function parseMeasureGroupDiscoverRowSet(xml) {
      var measureGroups = {};
      (0, _iterator.each)(xml.getElementsByTagName('row'), function (_, row) {
        measureGroups[getFirstChildText(row, 'MEASUREGROUP_NAME')] = getFirstChildText(row, 'MEASUREGROUP_CAPTION');
      });
      return measureGroups;
    }
    function parseDimensionsDiscoverRowSet(xml) {
      var result = {
        names: {},
        defaultHierarchies: {}
      };
      (0, _iterator.each)((0, _renderer.default)(xml).find('row'), function () {
        var $row = (0, _renderer.default)(this);
        var type = $row.children('DIMENSION_TYPE').text();
        var dimensionName = type === MD_DIMTYPE_MEASURE ? MEASURE_DEMENSION_KEY : $row.children('DIMENSION_UNIQUE_NAME').text();
        result.names[dimensionName] = $row.children('DIMENSION_CAPTION').text();
        result.defaultHierarchies[$row.children('DEFAULT_HIERARCHY').text()] = true;
      });
      return result;
    }
    function parseStringWithUnicodeSymbols(str) {
      str = str.replace(/_x(....)_/g, function (_, group1) {
        return String.fromCharCode(parseInt(group1, 16));
      });
      var stringArray = str.match(/\[.+?\]/gi);
      if (stringArray && stringArray.length) {
        str = stringArray[stringArray.length - 1];
      }
      return str.replace(/\[/gi, '').replace(/\]/gi, '').replace(/\$/gi, '').replace(/\./gi, ' ');
    }
    function parseDrillDownRowSet(xml) {
      var rows = xml.getElementsByTagName('row');
      var result = [];
      var columnNames = {};
      for (var i = 0; i < rows.length; i += 1) {
        var children = rows[i].childNodes;
        var item = {};
        for (var j = 0; j < children.length; j += 1) {
          var tagName = children[j].tagName;
          var name = columnNames[tagName] = columnNames[tagName] || parseStringWithUnicodeSymbols(tagName);
          item[name] = getNodeText(children[j]);
        }
        result.push(item);
      }
      return result;
    }
    function sendQuery(storeOptions, mdxString) {
      mdxString = (0, _renderer.default)('<div>').text(mdxString).html();
      return execXMLA(storeOptions, (0, _string.format)(execute, mdxString, storeOptions.catalog, getLocaleIdProperty()));
    }
    function processTotalCount(data, options, totalCountXml) {
      var axes = [];
      var columnOptions = options.columns || [];
      var rowOptions = options.rows || [];
      if (columnOptions.length) {
        axes.push({});
      }
      if (rowOptions.length) {
        axes.push({});
      }
      var cells = parseCells(totalCountXml, [[{}], [{}, {}]], 1);
      if (!columnOptions.length && rowOptions.length) {
        data.rowCount = Math.max(cells[0][0][0] - 1, 0);
      }
      if (!rowOptions.length && columnOptions.length) {
        data.columnCount = Math.max(cells[0][0][0] - 1, 0);
      }
      if (rowOptions.length && columnOptions.length) {
        data.rowCount = Math.max(cells[0][0][0] - 1, 0);
        data.columnCount = Math.max(cells[1][0][0] - 1, 0);
      }
      if (data.rowCount !== undefined && options.rowTake) {
        data.rows = _toConsumableArray(Array(options.rowSkip)).concat(data.rows);
        data.rows.length = data.rowCount;
        for (var i = 0; i < data.rows.length; i += 1) {
          data.rows[i] = data.rows[i] || {};
        }
      }
      if (data.columnCount !== undefined && options.columnTake) {
        data.columns = _toConsumableArray(Array(options.columnSkip)).concat(data.columns);
        data.columns.length = data.columnCount;
        for (var _i = 0; _i < data.columns.length; _i += 1) {
          data.columns[_i] = data.columns[_i] || {};
        }
      }
    }
    return {
      ctor: function ctor(options) {
        this._options = options;
      },
      getFields: function getFields() {
        var options = this._options;
        var catalog = options.catalog;
        var cube = options.cube;
        var localeIdProperty = getLocaleIdProperty();
        var dimensionsRequest = execXMLA(options, (0, _string.format)(discover, catalog, cube, 'MDSCHEMA_DIMENSIONS', localeIdProperty));
        var measuresRequest = execXMLA(options, (0, _string.format)(discover, catalog, cube, 'MDSCHEMA_MEASURES', localeIdProperty));
        var hierarchiesRequest = execXMLA(options, (0, _string.format)(discover, catalog, cube, 'MDSCHEMA_HIERARCHIES', localeIdProperty));
        var levelsRequest = execXMLA(options, (0, _string.format)(discover, catalog, cube, 'MDSCHEMA_LEVELS', localeIdProperty));
        // @ts-expect-error
        var result = new _deferred.Deferred();
        (0, _deferred.when)(dimensionsRequest, measuresRequest, hierarchiesRequest, levelsRequest).then(function (dimensionsResponse, measuresResponse, hierarchiesResponse, levelsResponse) {
          execXMLA(options, (0, _string.format)(discover, catalog, cube, 'MDSCHEMA_MEASUREGROUPS', localeIdProperty)).done(function (measureGroupsResponse) {
            var dimensions = parseDimensionsDiscoverRowSet(dimensionsResponse);
            var hierarchies = parseDiscoverRowSet(hierarchiesResponse, 'HIERARCHY', dimensions);
            var levels = parseDiscoverRowSet(levelsResponse, 'LEVEL', dimensions);
            var measureGroups = parseMeasureGroupDiscoverRowSet(measureGroupsResponse);
            var fields = parseDiscoverRowSet(measuresResponse, 'MEASURE', dimensions, measureGroups).concat(hierarchies);
            var levelsByHierarchy = {};
            (0, _iterator.each)(levels, function (_, level) {
              levelsByHierarchy[level.hierarchyName] = levelsByHierarchy[level.hierarchyName] || [];
              levelsByHierarchy[level.hierarchyName].push(level);
            });
            (0, _iterator.each)(hierarchies, function (_, hierarchy) {
              if (levelsByHierarchy[hierarchy.dataField] && levelsByHierarchy[hierarchy.dataField].length > 1) {
                hierarchy.groupName = hierarchy.hierarchyName = hierarchy.dataField;
                fields.push.apply(fields, levelsByHierarchy[hierarchy.hierarchyName]);
              }
            });
            result.resolve(fields);
          }).fail(result.reject);
        }).fail(result.reject);
        return result;
      },
      load: function load(options) {
        // @ts-expect-error
        var result = new _deferred.Deferred();
        var storeOptions = this._options;
        var parseOptions = {
          skipValues: options.skipValues
        };
        var mdxString = generateMDX(options, storeOptions.cube, parseOptions);
        var rowCountMdx;
        if (options.rowSkip || options.rowTake || options.columnTake || options.columnSkip) {
          rowCountMdx = generateMDX((0, _extend.extend)({}, options, {
            totalsOnly: true,
            rowSkip: null,
            rowTake: null,
            columnSkip: null,
            columnTake: null
          }), storeOptions.cube, {});
        }
        var load = function load() {
          if (mdxString) {
            (0, _deferred.when)(sendQuery(storeOptions, mdxString), rowCountMdx && sendQuery(storeOptions, rowCountMdx)).done(function (executeXml, rowCountXml) {
              var error = checkError(executeXml) || rowCountXml && checkError(rowCountXml);
              if (!error) {
                var response = parseResult(executeXml, parseOptions);
                if (rowCountXml) {
                  processTotalCount(response, options, rowCountXml);
                }
                result.resolve(response);
              } else {
                result.reject(error);
              }
            }).fail(result.reject);
          } else {
            result.resolve({
              columns: [],
              rows: [],
              values: [],
              grandTotalColumnIndex: 0,
              grandTotalRowIndex: 0
            });
          }
        };
        if (options.delay) {
          setTimeout(load, options.delay);
        } else {
          load();
        }
        return result;
      },
      supportPaging: function supportPaging() {
        return true;
      },
      getDrillDownItems: function getDrillDownItems(options, params) {
        // @ts-expect-error
        var result = new _deferred.Deferred();
        var storeOptions = this._options;
        var mdxString = generateDrillDownMDX(options, storeOptions.cube, params);
        if (mdxString) {
          (0, _deferred.when)(sendQuery(storeOptions, mdxString)).done(function (executeXml) {
            var error = checkError(executeXml);
            if (!error) {
              result.resolve(parseDrillDownRowSet(executeXml));
            } else {
              result.reject(error);
            }
          }).fail(result.reject);
        } else {
          result.resolve([]);
        }
        return result;
      },
      key: _common.noop,
      filter: _common.noop
    };
  }()).include(_module_widget_utils.storeDrillDownMixin);
  // NOTE: Exports default object for mocks in QUnit only.
  exports.XmlaStore = XmlaStore;
  var _default = {
    XmlaStore: XmlaStore
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../core/utils/window","../../../../core/class","../../../../core/utils/string","../../../../data/errors","../../../../core/utils/common","../../../../core/utils/extend","../../../../core/utils/type","../../../../core/utils/iterator","../../../../core/utils/deferred","../../../../localization/language_codes","../module_widget_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../core/utils/window"), require("../../../../core/class"), require("../../../../core/utils/string"), require("../../../../data/errors"), require("../../../../core/utils/common"), require("../../../../core/utils/extend"), require("../../../../core/utils/type"), require("../../../../core/utils/iterator"), require("../../../../core/utils/deferred"), require("../../../../localization/language_codes"), require("../module_widget_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map