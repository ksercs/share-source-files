!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/forMap/bingMock.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic('testing/helpers/forMap/bingMock.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

    (function ($__global) {
        /* global jQuery */

        const Microsoft = window.Microsoft = {};

        Microsoft.Maps = {
            MapTypeId: {
                'aerial': 1,
                'auto': 2,
                'birdseye': 3,
                'collinsBart': 4,
                'mercator': 5,
                'ordnanceSurvey': 6,
                'road': 7
            },
            Directions: {
                DirectionsManager: function (map) {
                    const waypoints = [];

                    Microsoft.directionsMapSpecified = map instanceof Microsoft.Maps.Map;
                    Microsoft.directionsInstance = (Microsoft.directionsInstance || 0) + 1;

                    this.addWaypoint = function (waypoint, index) {
                        waypoints.push(waypoint);
                        Microsoft.lastDirectionPoints = [waypoints[0].getLocation(), waypoints[waypoints.length - 1].getLocation()];
                    };
                    this.calculateDirections = function () {}; // ()
                    this.clearDisplay = function () {}; // ()
                    this.dispose = function () {
                        Microsoft.directionRemoved = true;
                    };
                    this.getAllWaypoints = function () {}; // ()
                    this.getMap = function () {}; // ()
                    this.getNearbyMajorRoads = function () {}; // (location:Location, callback:function, errorCallback:function, userData:object)
                    this.getRenderOptions = function () {}; // ()
                    this.getRequestOptions = function () {}; // ()
                    this.getRouteResult = function () {}; // ()
                    this.removeWaypoint = function () {}; // (waypoint:Waypoint) or removeWaypoints(index:number)
                    this.resetDirections = function () {}; // (options:ResetDirectionsOptions)
                    this.reverseGeocode = function () {}; // (location:Location, callback:function, errorCallback:function, userData:object)
                    this.setMapView = function () {}; // ()
                    this.setRenderOptions = function (options) {
                        Microsoft.directionsOptions = Microsoft.directionsOptions || {};
                        Microsoft.directionsOptions.drivingPolylineOptions = options.drivingPolylineOptions;
                        Microsoft.directionsOptions.walkingPolylineOptions = options.walkingPolylineOptions;
                    };
                    this.setRequestOptions = function (options) {
                        Microsoft.directionsOptions = Microsoft.directionsOptions || {};
                        Microsoft.directionsOptions.routeMode = options.routeMode;
                    };
                },
                RouteMode: {
                    driving: 1,
                    walking: 2
                },
                Waypoint: function (options) {
                    this.clear = function () {}; // ()
                    this.dispose = function () {}; // ()
                    this.getAddress = function () {}; // ()
                    this.getBusinessDetails = function () {}; // ()
                    this.getDisambiguationContainer = function () {}; // ()
                    this.getDisambiguationResult = function () {}; // ()
                    this.getLocation = function () {
                        return options.location;
                    }; // ()
                    this.getPushpin = function () {}; // ()
                    this.getShortAddress = function () {}; // ()
                    this.isExactLocation = function () {}; // ()
                    this.isViapoint = function () {}; // ()
                    this.setOptions = function () {}; // (options:WaypointOptions)
                }
            },
            Events: {
                addHandler: function (_, name, callback) {
                    switch (name) {
                        case 'tiledownloadcomplete':
                            Microsoft.mapInitialized = true;
                            setTimeout(callback);
                            return 'tiledownloadcompleteHandler';
                        case 'click':
                            Microsoft.clickActionCallback = callback;
                            return 'clickHandler';
                        case 'directionsUpdated':
                            {
                                if (Microsoft.abortDirectionsUpdate) {
                                    return;
                                }

                                const lastDirectionPoints = Microsoft.lastDirectionPoints;
                                setTimeout(function () {
                                    callback({
                                        routeSummary: [{
                                            northEast: lastDirectionPoints[0],
                                            southWest: lastDirectionPoints[1]
                                        }]
                                    });
                                });
                                return 'directionsUpdatedHandler';
                            }
                        case 'directionsError':
                            if (!Microsoft.abortDirectionsUpdate) {
                                return;
                            }

                            setTimeout(function () {
                                callback({
                                    responseCode: 1, message: 'Directions error'
                                });
                            });
                            return 'directionsErrorHandler';
                        case 'viewchange':
                            Microsoft.viewChangeCallback = callback;
                            return 'viewchangeHandler';
                        case 'viewchangeend':
                            Microsoft.viewChangeEndCallback = callback;
                            return 'viewchangeendHandler';
                    }
                },
                addThrottledHandler: function () {}, // (target:object, eventName:string, handler:function, throttleInterval:number)
                hasHandler: function () {}, // (target:object, eventName:string)
                invoke: function (_, handler) {
                    switch (handler) {
                        case 'viewchange':
                            Microsoft.viewChangeCallback();
                            break;
                    }
                },
                removeHandler: function (handler) {
                    switch (handler) {
                        case 'tiledownloadcompleteHandler':
                            Microsoft['tiledownloadcompleteHandlerRemoved'] = true;
                            break;
                        case 'clickHandler':
                            Microsoft.clickHandlerRemoved = true;
                            break;
                        case 'directionsUpdatedHandler':
                        case 'directionsErrorHandler':
                            Microsoft.directionsUpdatedHandlerRemoved = true;
                            Microsoft.directionsErrorHandlerRemoved = true;
                            break;
                        case 'viewchangeHandler':
                            Microsoft['viewchangeHandlerRemoved'] = true;
                            break;
                        case 'viewchangeendHandler':
                            Microsoft['viewchangeendHandlerRemoved'] = true;
                            break;
                    }
                }
            },
            loadModule: function (module, options) {
                if (options.callback) {
                    options.callback();
                }
            },
            Map: function (node, options) {
                if (options) {
                    Microsoft.optionsSpecified = true;
                    Microsoft.options = jQuery.extend(Microsoft.options || {}, options);
                }

                this.entities = new Microsoft.Maps.EntityCollection();
                this.blur = function () {}; // ()
                this.dispose = function () {}; // ()
                this.focus = function () {}; // ()
                this.getBounds = function () {
                    if (Microsoft.boundsValue) {
                        return Microsoft.boundsValue;
                    } else {
                        return new Microsoft.Maps.LocationRect();
                    }
                };
                this.getCenter = function () {
                    if (Microsoft.centerValue) {
                        return new Microsoft.Maps.Location(Microsoft.centerValue[0], Microsoft.centerValue[1]);
                    } else {
                        return new Microsoft.Maps.Location(0, 0);
                    }
                };
                this.getCopyrights = function () {}; // (callback:function)
                this.getCredentials = function () {}; // (callback:function)
                this.getHeading = function () {}; // ()
                this.getHeight = function () {}; // ()
                this.getImageryId = function () {}; // ()
                this.getMapTypeId = function () {}; // ()
                this.getMetersPerPixel = function () {}; // ()
                this.getMode = function () {}; // ()
                this.getModeLayer = function () {}; // ()
                this.getOptions = function () {}; // ()
                this.getPageX = function () {}; // ()
                this.getPageY = function () {}; // ()
                this.getRootElement = function () {}; // ()
                this.getTargetBounds = function () {}; // ()
                this.getTargetCenter = function () {}; // ()
                this.getTargetHeading = function () {}; // ()
                this.getTargetMetersPerPixel = function () {}; // ()
                this.getTargetZoom = function () {}; // ()
                this.getUserLayer = function () {}; // ()
                this.getViewportX = function () {}; // ()
                this.getViewportY = function () {}; // ()
                this.getWidth = function () {}; // ()
                this.getZoom = function () {
                    return Microsoft.zoomValue;
                };
                this.getZoomRange = function () {}; // ()
                this.isDownloadingTiles = function () {}; // ()
                this.isMercator = function () {}; // ()
                this.isRotationEnabled = function () {}; // ()
                this.setMapType = function () {}; // (mapTypeId:string)
                this.setOptions = function (options) {
                    Microsoft.assignedOptions = jQuery.extend(Microsoft.assignedOptions || {}, options);
                };
                this.setView = function (options) {
                    if (options.animate) {
                        throw new Error('Animation turned should be turned off');
                    }
                    Microsoft.assignedOptions = jQuery.extend(Microsoft.assignedOptions || {}, options);
                    if (options.bounds) {
                        Microsoft.boundFittedCount = (Microsoft.boundFittedCount || 0) + 1;
                        if (Microsoft.fitBoundsCallback) {
                            Microsoft.fitBoundsCallback();
                        }
                    }
                };
                this.tryLocationToPixel = function () {}; // (location:Location |Location[], reference?:PixelReference)
                this.tryPixelToLocation = function (point) {
                    return new Microsoft.Maps.Location(point.x, point.y);
                };
            },
            LabelOverlay: {
                visible: 'visible',
                hidden: 'hidden'
            },
            Location: function (latitude, longitude, altitude, altitudeReference) {
                this.altitude = altitude;
                this.altitudeReference = altitudeReference;
                this.latitude = latitude || 0;
                this.longitude = longitude || 0;
            },
            LocationRect: function (location) {
                this.points = [location];
                this.clone = function () {
                    const clone = new Microsoft.Maps.LocationRect();
                    clone.points = this.points;
                    return clone;
                };

                Microsoft.locationRectInstances = Microsoft.locationRectInstances || [];
                Microsoft.locationRectInstances.push(this);
            },
            Pushpin: function (location, options) {
                Microsoft.pushpinLocation = location;
                Microsoft.pushpinInstance = (Microsoft.pushpinInstance || 0) + 1;
                Microsoft.pushpinOptions = options;

                this.getAnchor = function () {}; // ()
                this.getIcon = function () {
                    return options.icon;
                };
                this.getHeight = function () {}; // ()
                this.getLocation = function () {}; // ()
                this.getText = function () {}; // ()
                this.getTextOffset = function () {}; // ()
                this.getTypeName = function () {}; // ()
                this.getVisible = function () {}; // ()
                this.getWidth = function () {}; // ()
                this.getZIndex = function () {}; // ()
                this.setLocation = function () {}; // (location:Location)
                this.setOptions = function () {}; // (options:PushpinOptions)
                this.toString = function () {}; // ()
            },
            Color: {
                a: 0,
                fromHex: function (hex) {
                    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    this.r = parseInt(result[1], 16);
                    this.g = parseInt(result[2], 16);
                    this.b = parseInt(result[3], 16);
                }
            },
            Polyline: function (locations, options) {
                this.getLocations = function () {}; // ()
                this.getStrokeColor = function () {}; // ()
                this.getStrokeDashArray = function () {}; // ()
                this.getStrokeThickness = function () {}; // ()
                this.getVisible = function () {}; // ()
                this.setLocations = function () {}; // (locations:Location[])
                this.setOptions = function () {}; // (options:PolylineOptions)
                this.toString = function () {}; // ()
            },
            EntityCollection: function (options) {
                this.clear = function () {}; // ()
                this.get = function () {}; // (index:number)
                this.getLength = function () {}; // ()
                this.getVisible = function () {}; // ()
                this.getZIndex = function () {}; // ()
                this.indexOf = function () {}; // (entity:Entity*)
                this.insert = function () {}; // (entity:Entity*, index:number)
                this.pop = function () {}; // ()
                this.push = function (entity) {
                    if (entity instanceof Microsoft.Maps.Pushpin) {
                        Microsoft.pushpinAddedToMap = true;
                    }
                    if (entity instanceof Microsoft.Maps.Infobox) {
                        Microsoft.infoboxAddedToMap = true;
                    }
                };
                this.remove = function (entity) {
                    if (entity instanceof Microsoft.Maps.Pushpin) {
                        Microsoft.pushpinRemoved = true;
                    }
                };
                this.removeAt = function () {}; // (index:number)
                this.setOptions = function () {}; // (options:EntityCollectionOptions)
                this.toString = function () {}; // ()
            },
            Infobox: function (location, options) {
                Microsoft.infoboxLocation = location;
                Microsoft.infoboxOptions = {};
                Microsoft.infoboxOptions.description = options.description;
                Microsoft.infoboxOptions.visible = options.visible;

                this.open = function () {};
                this.close = function () {};
                this.setMap = function (map) {
                    if (!map) {
                        Microsoft.infoboxRemoved = true;
                    } else {
                        Microsoft.infoboxAddedToMap = true;
                    }
                };
                this.getContent = function () {};
                this.getPosition = function () {};
                this.setContent = function () {};
                this.setOptions = function (options) {
                    if (options.visible) {
                        Microsoft.infoboxOpened = true;
                    }
                };
                this.setPosition = function () {};
            },
            Search: {
                SearchManager: function (options) {
                    this.geocode = function (options) {
                        Microsoft.geocodeCalled = (Microsoft.geocodeCalled || 0) + 1;
                        const results = [];
                        if (options.where !== '') {
                            results.push({
                                name: options.where,
                                location: { latitude: -1.12345, longitude: -1.12345 }
                            });
                        }

                        if (options.callback) {
                            options.callback({ results: results });
                        }
                    };
                }
            },
            Point: function (x, y) {
                this.x = x;
                this.y = y;
            },
            MouseEventArgs: function (x, y) {
                this.targetType = 'map';
                this.target = new Microsoft.Maps.Map();
                this.getX = function () {
                    return x;
                };
                this.getY = function () {
                    return y;
                };
                this.location = { latitude: x, longitude: y };
            }
        };

        Microsoft.Maps.LocationRect.prototype = {
            getNorthwest: function () {
                return this.points[0] || new Microsoft.Maps.Location();
            },
            getSoutheast: function () {
                return this.points[0] || new Microsoft.Maps.Location();
            }
        };
        Microsoft.Maps.LocationRect.fromLocations = function () {
            const locationRect = new Microsoft.Maps.LocationRect();
            locationRect.points = [];
            locationRect.points.push.apply(locationRect.points, arguments);
            return locationRect;
        };
    })(this);

    return _retrieveGlobal();
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=bingMock.js.map