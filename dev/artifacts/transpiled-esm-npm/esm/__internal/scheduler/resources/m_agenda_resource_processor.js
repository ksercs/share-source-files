/* eslint-disable max-classes-per-file */
import { wrapToArray } from '../../../core/utils/array';
import { Deferred, when } from '../../../core/utils/deferred';
import { getDisplayExpr, getFieldExpr, getValueExpr, getWrappedDataSource } from './m_utils';
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class PromiseItem {
  constructor(rawAppointment, promise) {
    this.rawAppointment = rawAppointment;
    this.promise = promise;
  }
}
export class AgendaResourceProcessor {
  constructor() {
    var resourceDeclarations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this._resourceDeclarations = resourceDeclarations;
    this.isLoaded = false;
    this.isLoading = false;
    this.resourceMap = new Map();
    this.appointmentPromiseQueue = [];
  }
  get resourceDeclarations() {
    return this._resourceDeclarations;
  }
  set resourceDeclarations(value) {
    this._resourceDeclarations = value;
    this.isLoaded = false;
    this.isLoading = false;
    this.resourceMap.clear();
    this.appointmentPromiseQueue = [];
  }
  _pushAllResources() {
    this.appointmentPromiseQueue.forEach(_ref => {
      var {
        promise,
        rawAppointment
      } = _ref;
      var result = [];
      this.resourceMap.forEach((resource, fieldName) => {
        var item = {
          label: resource.label,
          values: []
        };
        if (fieldName in rawAppointment) {
          wrapToArray(rawAppointment[fieldName]).forEach(value => item.values.push(resource.map.get(value)));
        }
        if (item.values.length) {
          result.push(item);
        }
      });
      promise.resolve(result);
    });
    this.appointmentPromiseQueue = [];
  }
  _onPullResource(fieldName, valueName, displayName, label, items) {
    var map = new Map();
    items.forEach(item => map.set(item[valueName], item[displayName]));
    this.resourceMap.set(fieldName, {
      label,
      map
    });
  }
  _hasResourceDeclarations(resources) {
    if (resources.length === 0) {
      this.appointmentPromiseQueue.forEach(_ref2 => {
        var {
          promise
        } = _ref2;
        return promise.resolve([]);
      });
      this.appointmentPromiseQueue = [];
      return false;
    }
    return true;
  }
  _tryPullResources(resources, resultAsync) {
    if (!this.isLoading) {
      this.isLoading = true;
      var promises = [];
      resources.forEach(resource => {
        // @ts-expect-error
        var promise = new Deferred().done(items => this._onPullResource(getFieldExpr(resource), getValueExpr(resource), getDisplayExpr(resource), resource.label, items));
        promises.push(promise);
        var dataSource = getWrappedDataSource(resource.dataSource);
        if (dataSource.isLoaded()) {
          promise.resolve(dataSource.items());
        } else {
          dataSource.load().done(list => promise.resolve(list)).fail(() => promise.reject());
        }
      });
      when.apply(null, promises).done(() => {
        this.isLoaded = true;
        this.isLoading = false;
        this._pushAllResources();
      }).fail(() => resultAsync.reject());
    }
  }
  initializeState() {
    var resourceDeclarations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.resourceDeclarations = resourceDeclarations;
  }
  createListAsync(rawAppointment) {
    // @ts-expect-error
    var resultAsync = new Deferred();
    this.appointmentPromiseQueue.push(new PromiseItem(rawAppointment, resultAsync));
    if (this._hasResourceDeclarations(this.resourceDeclarations)) {
      if (this.isLoaded) {
        this._pushAllResources();
      } else {
        this._tryPullResources(this.resourceDeclarations, resultAsync);
      }
    }
    return resultAsync.promise();
  }
}