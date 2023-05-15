!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/qunitExtensions.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic('testing/helpers/qunitExtensions.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

    (function ($__global) {
        /* eslint-disable no-console */
        /* global jQuery */

        !function () {

            // compares two float/double numbers with some acceptable epsilon
            QUnit.assert.roughEqual = function (actual, expected, epsilon, message) {
                const delta = Math.abs(expected - actual);
                this.pushResult({
                    result: delta < epsilon,
                    actual: actual,
                    expected: expected + ' ± ' + epsilon,
                    message: message
                });
            };

            const confirmWindowActive = function () {
                let input;
                try {
                    input = document.createElement('input');
                    document.body.appendChild(input);
                    input.click();
                    input.focus();
                    return document.activeElement === input;
                } finally {
                    input.blur();
                    document.body.removeChild(input);
                }
            };

            QUnit.testInActiveWindow = function (name, callback) {
                if (confirmWindowActive()) {
                    QUnit.test.apply(this, arguments);
                } else {
                    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                    if (iOS) {
                        // do not test
                        // do not skip
                        return;
                    }

                    if (window.farmMode) {
                        QUnit.test(name, function (assert) {
                            assert.ok(false, 'This test is not able to run in non-active window');
                        });
                    } else {
                        QUnit.skip(name + ' [Inactive Window]');
                    }
                }
            };

            QUnit.isInShadowDomMode = function () {
                return QUnit.urlParams['shadowDom'] && QUnit.urlParams['nojquery'];
            };

            QUnit.skipInShadowDomMode = function (name, callback) {
                if (QUnit.isInShadowDomMode()) {
                    QUnit.skip(name + ' [Skipped in the ShadowDOM mode]');
                } else {
                    QUnit.test.apply(this, arguments);
                }
            };

            window.waitFor = function (predicate, timeout, interval) {
                timeout = timeout || 30000;
                interval = interval || 15;

                let doneCallback;
                const startTime = Date.now();

                const checkIntervalId = setInterval(function () {
                    if (predicate()) {
                        clearInterval(checkIntervalId);
                        doneCallback();
                    }

                    if (Date.now() - startTime > timeout) {
                        clearInterval(checkIntervalId);
                        if (window.console) {
                            if (typeof window.console.error === 'function') {
                                console.error('waitFor: Timeout is expired');
                            } else if (typeof window.console.log === 'function') {
                                console.log('waitFor: Timeout is expired');
                            }
                        }
                    }
                }, interval);

                return {
                    done: function (callback) {
                        doneCallback = callback;
                    }
                };
            };

            window.createTestContainer = function (parentSelector, css) {
                function dashCase(str) {
                    return str.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g, function (s, i) {
                        return (i > 0 ? '-' : '') + s.toLowerCase();
                    });
                }

                const uniqueName = dashCase(QUnit.config.current.testName);
                const container = document.createElement('div');
                container.setAttribute('id', uniqueName);

                if (css) {
                    Object.keys(css).forEach(function (prop) {
                        container.style[prop] = css[prop];
                    });
                }

                const parent = document.querySelector(parentSelector);
                if (parent) {
                    parent.appendChild(container);
                } else {
                    throw 'Parent element with "' + parentSelector + '" is not found';
                }

                return container;
            };

            window.currentTest = function () {
                return QUnit.config.current.testEnvironment;
            };

            // Use it with great caution!
            // Only when there is no better way to access `assert` object
            window.currentAssert = function () {
                return QUnit.config.current.assert;
            };

            const beforeTestDoneCallbacks = [];

            QUnit.beforeTestDone = function (callback) {
                beforeTestDoneCallbacks.push(callback);
            };

            QUnit.testStart(function () {
                const after = QUnit.config.current.after;

                QUnit.config.current.after = function () {
                    beforeTestDoneCallbacks.forEach(function (callback) {
                        callback();
                    });
                    return after.apply(this, arguments);
                };
            });
        }();

        (function setupShadowDomMode() {
            function getRoot() {
                return document.querySelector('#qunit-fixture').shadowRoot;
            }

            function get(selector) {
                return typeof selector === 'string' && selector ? getRoot().querySelectorAll(selector) : selector;
            }

            function addShadowRootTree() {
                const root = document.querySelector('#qunit-fixture');

                if (!root.shadowRoot) {
                    root.attachShadow({ mode: 'open' });
                }

                const shadowContainer = document.createElement('div');
                const style = document.createElement('style');
                style.setAttribute('nonce', 'qunit-extension');

                shadowContainer.className = 'shadow-container';

                style.innerHTML = `
            :host {
                position: static!important;
                top: 0!important;
                left: 0!important;
            }
            :scope .shadow-container {
                position: absolute;
                top: -10000px;
                left: -10000px;
                width: 1000px;
                height: 1000px;
            }

            :scope .shadow-container.qunit-fixture-visible {
                position: fixed !important;
                left: 0 !important;
                top: 0 !important;
            }
        `;

                root.shadowRoot.appendChild(style);
                root.shadowRoot.appendChild(shadowContainer);
            }

            function clearShadowRootTree() {
                const container = get(':scope div')[0];
                const style = get(':scope style')[0];

                jQuery(container).remove();
                jQuery(style).remove();
            }

            let jQueryInit;

            QUnit.testStart(function () {
                if (!QUnit.isInShadowDomMode()) {
                    return;
                }

                addShadowRootTree();

                jQueryInit = jQuery.fn.init;

                jQuery.fn.init = function (selector, context, root) {
                    const result = new jQueryInit(selector, context, root);
                    const resultElement = result.get(0);

                    if (!resultElement) {
                        return new jQueryInit(get(selector), context, root);
                    }

                    if (resultElement === getRoot().host) {
                        return new jQueryInit(get(':scope div')[0], context, root);
                    }

                    return result;
                };
            });

            QUnit.beforeTestDone(function () {
                if (!QUnit.isInShadowDomMode()) {
                    return;
                }

                jQuery.fn.init = jQueryInit != null ? jQueryInit : jQuery.fn.init;

                clearShadowRootTree();
            });

            QUnit.config.urlConfig.push({
                id: 'shadowDom',
                label: 'Shadow DOM',
                tooltip: 'Enabling this will test the target control inside the ShadowDOM.'
            });
        })();

        (function clearQUnitFixtureByJQuery() {
            const isMsEdge = 'CollectGarbage' in window && !('ActiveXObject' in window);

            QUnit.beforeTestDone(function (options) {
                if (!jQuery) {
                    return;
                }

                if (isMsEdge) {
                    jQuery('#qunit-fixture input[type=date]').attr('type', 'hidden');
                }

                jQuery('#qunit-fixture').empty();
            });
        })();

        (function checkForTimers() {

            QUnit.config.urlConfig.push({
                id: 'notimers',
                label: 'Check for timers',
                tooltip: 'Enabling this will test if any test introduces timers (setTimeout, setInterval, ....) and does not cleared them on test finalization. Stored as query-strings.'
            });

            const createMethodWrapper = function (method, callbacks) {
                const beforeCall = callbacks.beforeCall;
                const afterCall = callbacks.afterCall;

                return function () {
                    const info = {
                        method: method,
                        context: this,
                        args: Array.prototype.slice.call(arguments)
                    };

                    if (typeof beforeCall === 'function') {
                        beforeCall(info);
                    }

                    info.returnValue = method.apply(info.context, info.args);

                    if (typeof afterCall === 'function') {
                        afterCall(info);
                    }

                    return info.returnValue;
                };
            };

            const getStack = function () {
                let stack = '';
                try {
                    throw Error('');
                } catch (ex) {
                    stack = ex.stack;
                }
                return stack;
            };

            const saveTimerInfo = function (logObject, info) {
                info.stack = getStack();
                info.callback = info.callback.toString();
                logObject[info.timerId] = info;
            };

            const spyWindowMethods = function (windowObj) {
                let log;
                let logEnabled;
                let timeouts;
                let intervals;
                let animationFrames;

                windowObj = windowObj || window;

                const methodHooks = {
                    'setTimeout': {
                        'beforeCall': function (info) {
                            if (!logEnabled) {
                                return;
                            }

                            info.callback = info.args[0];
                            info.args[0] = createMethodWrapper(info.callback, {
                                afterCall: function () {
                                    if (!logEnabled) {
                                        return;
                                    }
                                    delete timeouts[info.returnValue];
                                }
                            });
                        },

                        'afterCall': function (info) {
                            if (!logEnabled) {
                                return;
                            }

                            saveTimerInfo(timeouts, {
                                timerType: 'timeouts',
                                timerId: info.returnValue,
                                callback: info.callback,
                                timeout: info.args[1]
                            });
                        }
                    },

                    'clearTimeout': {
                        'afterCall': function (info) {
                            if (!logEnabled) {
                                return;
                            }
                            delete timeouts[info.args[0]];
                        }
                    },

                    'setInterval': {
                        'afterCall': function (info) {
                            if (!logEnabled) {
                                return;
                            }
                            const timerId = info.returnValue;
                            saveTimerInfo(intervals, {
                                timerType: 'intervals',
                                timerId: timerId,
                                callback: info.args[0],
                                timeout: info.args[1]
                            });
                        }
                    },

                    'clearInterval': {
                        'afterCall': function (info) {
                            if (!logEnabled) {
                                return;
                            }
                            delete intervals[info.args[0]];
                        }
                    },

                    'requestAnimationFrame': {
                        'beforeCall': function (info) {
                            if (!logEnabled) {
                                return;
                            }

                            info.callback = info.args[0];
                            info.args[0] = createMethodWrapper(info.callback, {
                                afterCall: function () {
                                    if (!logEnabled) {
                                        return;
                                    }
                                    delete animationFrames[info.returnValue];
                                }
                            });
                        },
                        'afterCall': function (info) {
                            if (!logEnabled) {
                                return;
                            }

                            saveTimerInfo(animationFrames, {
                                timerType: 'animationFrames',
                                timerId: info.returnValue,
                                callback: info.callback
                            });
                        }
                    },

                    'cancelAnimationFrame': {
                        'afterCall': function (info) {
                            if (!logEnabled) {
                                return;
                            }

                            delete animationFrames[info.args[0]];
                        }
                    }
                };

                Object.keys(methodHooks).forEach(function (name) {
                    windowObj[name] = createMethodWrapper(windowObj[name], methodHooks[name]);
                });

                const initLog = function () {
                    log = {};
                    timeouts = log['timeouts'] = {};
                    intervals = log['intervals'] = {};
                    animationFrames = log['animationFrames'] = {};
                };

                return {
                    get: function () {
                        return log;
                    },

                    start: function () {
                        if (!log) {
                            initLog();
                        }
                        logEnabled = true;
                    },

                    stop: function () {
                        logEnabled = false;
                    },

                    clear: function () {
                        initLog();
                    }
                };
            };

            const ignoreRules = function () {
                let rules = [];

                return {
                    register: function () {
                        Array.prototype.push.apply(rules, arguments);
                    },
                    unregister: function () {
                        Array.prototype.forEach.call(arguments, function (rule) {
                            const index = rules.indexOf(rule);
                            rules.splice(index, 1);
                        });
                    },
                    clear: function () {
                        rules = [];
                    },
                    shouldIgnore: function (timerInfo) {
                        let skip = false;

                        rules.forEach(function (rule) {
                            if (rule(timerInfo)) {
                                skip = true;
                                return false;
                            }
                        });

                        return skip;
                    }
                };
            }();

            QUnit.timersDetector = {
                spyWindowMethods: spyWindowMethods,
                ignoreRules: ignoreRules
            };

            if (!QUnit.urlParams['notimers']) {
                return;
            }

            const log = spyWindowMethods();

            ignoreRules.register(function isThirdPartyLibraryTimer(timerInfo) {
                const callback = String(timerInfo.callback).replace(/\s/g, '');
                const timerType = timerInfo.timerType;

                if (timerType === 'timeouts') {
                    if (callback.indexOf('.Deferred.exceptionHook') > -1 || // NOTE: jQuery.Deferred are now asynchronous
                    callback.indexOf('e._drain()') > -1 // NOTE: SystemJS Promise polyfill
                    ) {
                            return true;
                        }

                    if (window.navigator.userAgent.indexOf('Edge/') > -1 && // NOTE: Native Promise in Edge
                    callback.indexOf('function(){[nativecode]}') > -1) {
                        return true;
                    }
                }
            });

            const logTestFailure = function (timerInfo) {
                const timeoutString = timerInfo.timeout ? '\nTimeout: ' + timerInfo.timeout : '';

                const message = ['Not cleared timer detected.\n', '\n', 'Timer type: ', timerInfo.timerType, '\n', 'Id: ', timerInfo.timerId, '\n', 'Callback:\n', timerInfo.callback, '\n', timeoutString].join('');

                QUnit.pushFailure(message, timerInfo.stack);
            };

            QUnit.testStart(function () {
                log.start();
            });

            QUnit.beforeTestDone(function () {
                log.stop();

                ['timeouts', 'intervals', 'animationFrames'].forEach(function (type) {
                    const currentInfo = log.get()[type];

                    if (Object.keys(currentInfo).length) {
                        const timerId = Object.keys(currentInfo)[0];
                        const timerInfo = currentInfo[timerId];

                        if (ignoreRules.shouldIgnore(timerInfo)) {
                            return;
                        }

                        logTestFailure(timerInfo);
                    }
                });

                log.clear();
            });
        })();

        (function checkSinonFakeTimers() {

            let dateOnTestStart;
            QUnit.testStart(function () {
                dateOnTestStart = Date;
            });

            QUnit.beforeTestDone(function () {
                if (dateOnTestStart !== Date) {
                    QUnit.pushFailure('Not restored Sinon timers detected!', this.stack);
                }
            });
        })();
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
//# sourceMappingURL=qunitExtensions.js.map