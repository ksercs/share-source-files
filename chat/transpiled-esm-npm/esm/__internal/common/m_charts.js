import _extends from "@babel/runtime/helpers/esm/extends";
import { getNextDefsSvgId } from '../../viz/core/utils';
const graphicObjects = {};
export const registerPattern = options => {
  const id = getNextDefsSvgId();
  graphicObjects[id] = _extends({
    type: 'pattern'
  }, options);
  return id;
};
export const registerGradient = (type, options) => {
  const id = getNextDefsSvgId();
  graphicObjects[id] = _extends({
    type
  }, options);
  return id;
};
const getGraphicObjects = () => graphicObjects;
export default {
  getGraphicObjects
};