import _extends from "@babel/runtime/helpers/esm/extends";
import { getNextDefsSvgId } from '../../viz/core/utils';
var graphicObjects = {};
export var registerPattern = options => {
  var id = getNextDefsSvgId();
  graphicObjects[id] = _extends({
    type: 'pattern'
  }, options);
  return id;
};
export var registerGradient = (type, options) => {
  var id = getNextDefsSvgId();
  graphicObjects[id] = _extends({
    type
  }, options);
  return id;
};
var getGraphicObjects = () => graphicObjects;
export default {
  getGraphicObjects
};