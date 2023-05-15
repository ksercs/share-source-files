!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/title.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/core/title"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.core/title.tests.js", ["jquery", "../../helpers/vizMocks.js", "viz/core/title"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      Title,
      environment;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      vizMocks = $__m.default;
    }, function($__m) {
      Title = $__m.Title;
    }],
    execute: function() {
      environment = {
        beforeEach: function() {
          this.canvas = {
            top: 10,
            bottom: 20,
            left: 0,
            right: 0,
            width: 800,
            height: 600
          };
          this.renderer = new vizMocks.Renderer();
          this.incidentOccurred = sinon.spy();
          this.title = new Title({
            renderer: this.renderer,
            cssClass: 'test',
            incidentOccurred: this.incidentOccurred
          });
          this.options = {
            text: 'test',
            placeholderSize: 5,
            subtitle: {
              text: 'subtitle',
              offset: 2
            }
          };
          this.renderer.bBoxTemplate = {
            x: 11,
            y: 12,
            height: 10,
            width: 20
          };
        },
        createTitle: function() {
          this.title.update(this.options);
          return this.title;
        },
        rendererElementsIsDispose: function(assert) {
          assert.ok(this.renderer.g.getCall(0).returnValue.linkRemove.calledOnce);
          assert.ok(this.incidentOccurred.calledOnce);
          assert.ok(this.incidentOccurred.calledWith('W2103'));
        }
      };
      QUnit.module('Clip Rect', environment);
      QUnit.test('Clip rect, placeholderSize is specify, top position', function(assert) {
        this.createTitle().draw(100).shift();
        assert.ok(this.renderer.clipRect.calledOnce);
        assert.ok(this.renderer.clipRect.returnValues[0].attr.calledOnce);
        assert.deepEqual(this.renderer.clipRect.returnValues[0].attr.firstCall.args[0], {
          x: 1,
          y: 2,
          width: 100,
          height: 27
        });
      });
      QUnit.test('Clip rect, placeholderSize is specify, shifted', function(assert) {
        this.options.placeholderSize = 10;
        this.createTitle().draw(100).shift(50, 60);
        assert.ok(this.renderer.clipRect.returnValues[0].attr.calledOnce);
        assert.equal(this.renderer.clipRect.returnValues[0].attr.firstCall.args[0].x, 1);
        assert.equal(this.renderer.clipRect.returnValues[0].attr.firstCall.args[0].y, 2);
        assert.equal(this.renderer.clipRect.returnValues[0].attr.firstCall.args[0].width, 100);
        assert.equal(this.renderer.clipRect.returnValues[0].attr.firstCall.args[0].height, 32);
      });
      QUnit.test('Clip rect, placeholderSize is not specify, shifted', function(assert) {
        this.createTitle().draw(100).shift(50, 60);
        assert.ok(this.renderer.clipRect.returnValues[0].attr.calledOnce);
        assert.equal(this.renderer.clipRect.returnValues[0].attr.firstCall.args[0].x, 1);
        assert.equal(this.renderer.clipRect.returnValues[0].attr.firstCall.args[0].y, 2);
        assert.equal(this.renderer.clipRect.returnValues[0].attr.firstCall.args[0].width, 100);
        assert.equal(this.renderer.clipRect.returnValues[0].attr.firstCall.args[0].height, 27);
      });
      QUnit.module('Alignment options parsing', environment);
      QUnit.test('Empty alignments', function(assert) {
        var options = this.createTitle().getLayoutOptions();
        assert.strictEqual(options.verticalAlignment, 'top');
        assert.strictEqual(options.horizontalAlignment, 'center');
      });
      QUnit.test('Wrong alignments', function(assert) {
        this.options.verticalAlignment = 'middle';
        this.options.horizontalAlignment = 'leftSide';
        var options = this.createTitle().getLayoutOptions();
        assert.strictEqual(options.verticalAlignment, 'top');
        assert.strictEqual(options.horizontalAlignment, 'center');
      });
      QUnit.test('TopLeft alignments', function(assert) {
        this.options.verticalAlignment = 'top';
        this.options.horizontalAlignment = 'left';
        var options = this.createTitle().getLayoutOptions();
        assert.strictEqual(options.verticalAlignment, 'top');
        assert.strictEqual(options.horizontalAlignment, 'left');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(0).args[0].align, 'left');
        assert.deepEqual(this.renderer.text.getCall(1).returnValue.attr.getCall(0).args[0].align, 'left');
      });
      QUnit.test('TopCenter alignments', function(assert) {
        this.options.verticalAlignment = 'top';
        this.options.horizontalAlignment = 'center';
        var options = this.createTitle().getLayoutOptions();
        assert.strictEqual(options.verticalAlignment, 'top');
        assert.strictEqual(options.horizontalAlignment, 'center');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(0).args[0].align, 'center');
        assert.deepEqual(this.renderer.text.getCall(1).returnValue.attr.getCall(0).args[0].align, 'center');
      });
      QUnit.test('BottomRight alignments', function(assert) {
        this.options.verticalAlignment = 'bottom';
        this.options.horizontalAlignment = 'right';
        var options = this.createTitle().getLayoutOptions();
        assert.strictEqual(options.verticalAlignment, 'bottom');
        assert.strictEqual(options.horizontalAlignment, 'right');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(0).args[0].align, 'right');
        assert.deepEqual(this.renderer.text.getCall(1).returnValue.attr.getCall(0).args[0].align, 'right');
      });
      QUnit.module('margin options parsing', environment);
      QUnit.test('default margin option', function(assert) {
        var title = this.createTitle();
        assert.deepEqual(title.DEBUG_getOptions().margin, {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        });
      });
      QUnit.test('zero margin', function(assert) {
        this.options.margin = 0;
        var title = this.createTitle();
        assert.deepEqual(title.DEBUG_getOptions().margin, {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        });
      });
      QUnit.test('margin is not zero', function(assert) {
        this.options.margin = 24;
        var title = this.createTitle();
        assert.deepEqual(title.DEBUG_getOptions().margin, {
          top: 24,
          bottom: 24,
          left: 24,
          right: 24
        });
      });
      QUnit.test('margin is object', function(assert) {
        this.options.margin = {
          top: 10,
          bottom: 20,
          left: 30,
          right: 40
        };
        var title = this.createTitle();
        assert.deepEqual(title.DEBUG_getOptions().margin, {
          top: 10,
          bottom: 20,
          left: 30,
          right: 40
        });
      });
      QUnit.test('margin is object, zero values', function(assert) {
        this.options.margin = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        };
        var title = this.createTitle();
        assert.deepEqual(title.DEBUG_getOptions().margin, {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        });
      });
      QUnit.module('Life cycle', environment);
      QUnit.test('Creation', function(assert) {
        var title = this.createTitle().draw(this.canvas.width, this.height);
        assert.ok(title);
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.attr.getCall(0).args[0], {'class': 'test'});
        assert.deepEqual(title.DEBUG_getOptions().margin, {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        });
      });
      QUnit.test('Update', function(assert) {
        var title = this.createTitle();
        title.update({
          horizontalAlignment: 'left',
          verticalAlignment: 'top',
          margin: 20,
          text: 'title',
          cssClass: 'title_class',
          subtitle: {
            text: 'subtitle',
            cssClass: 'subtitle_class'
          }
        });
        assert.ok(title);
        assert.equal(title.getLayoutOptions().horizontalAlignment, 'left');
        assert.equal(title.getLayoutOptions().verticalAlignment, 'top');
        assert.deepEqual(title.DEBUG_getOptions().margin, {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        });
        assert.equal(title.DEBUG_getOptions().subtitle.text, 'subtitle');
        assert.strictEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(4).args[0].align, 'left');
        assert.strictEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(4).args[0]['class'], 'title_class');
        assert.strictEqual(this.renderer.text.getCall(1).returnValue.attr.getCall(2).args[0].align, 'left');
        assert.strictEqual(this.renderer.text.getCall(1).returnValue.attr.getCall(2).args[0]['class'], 'subtitle_class');
      });
      QUnit.test('Update to empty text', function(assert) {
        var title = this.createTitle();
        title.update({
          horizontalAlignment: 'left',
          verticalAlignment: 'top',
          margin: 20,
          text: 'title',
          subtitle: {text: 'subtitle'}
        });
        title.update({
          horizontalAlignment: 'left',
          verticalAlignment: 'top',
          margin: 20
        });
        assert.ok(title);
        assert.equal(this.renderer.g.getCall(0).returnValue.linkRemove.callCount, 1);
      });
      QUnit.test('Update to empty subtitle text', function(assert) {
        var title = this.createTitle();
        title.update({
          horizontalAlignment: 'left',
          verticalAlignment: 'top',
          margin: 20,
          text: 'title',
          subtitle: {text: 'subtitle'}
        });
        title.update({
          text: 'test',
          subtitle: {},
          horizontalAlignment: 'left',
          verticalAlignment: 'top',
          margin: 20
        });
        assert.ok(title);
        assert.equal(this.renderer.g.getCall(0).returnValue.stub('linkRemove').callCount, 0);
        assert.equal(this.renderer.text.getCall(1).returnValue.remove.callCount, 1);
      });
      QUnit.test('Dispose', function(assert) {
        var title = this.createTitle().draw(this.canvas.width, this.height);
        title.dispose();
        assert.strictEqual(this.renderer.g.getCall(0).returnValue.linkOff.callCount, 1, 'root is unlinked');
        assert.strictEqual(this.renderer.g.getCall(0).returnValue.linkRemove.callCount, 1, 'root is removed from container');
        assert.strictEqual(this.renderer.clipRect.getCall(0).returnValue.dispose.callCount, 1, 'clip rect is disposed');
      });
      QUnit.test('shift title', function(assert) {
        this.createTitle().draw().shift(10, 20);
        assert.ok(this.renderer.g.getCall(0).returnValue.move.called);
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.move.getCall(0).args, [9, -4]);
      });
      QUnit.test('Drawing with subtitle', function(assert) {
        this.createTitle().draw();
        var titleElement = this.renderer.text.getCall(0).returnValue;
        assert.deepEqual(titleElement.attr.getCall(0).args[0].align, 'center');
        assert.deepEqual(titleElement.attr.getCall(1).args[0], {
          text: 'A',
          y: 0
        });
        assert.deepEqual(titleElement.attr.getCall(2).args[0], {text: 'test'});
        assert.deepEqual(titleElement.attr.getCall(3).args[0], {y: -12});
        var subtitleElement = this.renderer.text.getCall(1).returnValue;
        assert.deepEqual(subtitleElement.attr.getCall(0).args[0].align, 'center');
        assert.deepEqual(subtitleElement.attr.getCall(1).args[0], {
          text: 'subtitle',
          y: 0
        });
        assert.deepEqual(subtitleElement.move.lastCall.args, [0, 8]);
        assert.ok(subtitleElement.move.lastCall.calledAfter(titleElement.setMaxSize.lastCall));
      });
      QUnit.test('Second Update', function(assert) {
        this.createTitle().update({subtitle: {}});
        assert.equal(this.renderer.g.getCall(0).returnValue.linkAppend.callCount, 1);
      });
      QUnit.test('Second Draw', function(assert) {
        this.createTitle().draw().draw();
        assert.equal(this.renderer.g.getCall(0).returnValue.linkAppend.callCount, 3);
      });
      QUnit.test('Draw with size', function(assert) {
        assert.ok(this.createTitle().draw({
          width: 50,
          height: 20
        }));
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(0).args[0].align, 'center');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(1).args[0], {
          text: 'A',
          y: 0
        });
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(2).args[0], {text: this.options.text});
        assert.deepEqual(this.renderer.text.getCall(1).returnValue.attr.getCall(1).args[0], {
          text: this.options.subtitle.text,
          y: 0
        });
      });
      QUnit.module('Title and subtitle does not fit in canvas', environment);
      QUnit.test('Length of title greater than canvas width', function(assert) {
        this.renderer.bBoxTemplate = {
          height: 10,
          width: 900
        };
        this.options.text = 'test big title';
        this.options.subtitle.text = 'test subtitle';
        this.options.wordWrap = 'titleWordWrap';
        this.options.textOverflow = 'titleTextOverflow';
        this.options.subtitle.wordWrap = 'subtitleWordWrap';
        this.options.subtitle.textOverflow = 'subtitleTextOverflow';
        this.options.placeholderSize = 90;
        this.options.margin = {
          left: 10,
          right: 20
        };
        this.createTitle().draw(this.canvas.width, this.canvas.height);
        var titleSetMaxSizeArgs = this.renderer.text.getCall(0).returnValue.setMaxSize.lastCall.args;
        assert.equal(titleSetMaxSizeArgs[0], 770);
        assert.equal(titleSetMaxSizeArgs[1], 90);
        assert.deepEqual(titleSetMaxSizeArgs[2].wordWrap, 'titleWordWrap');
        assert.deepEqual(titleSetMaxSizeArgs[2].textOverflow, 'titleTextOverflow');
        var subtitleSetMaxSizeArgs = this.renderer.text.getCall(1).returnValue.setMaxSize.lastCall.args;
        assert.equal(subtitleSetMaxSizeArgs[0], 770);
        assert.equal(subtitleSetMaxSizeArgs[1], 90 - 10);
        assert.deepEqual(subtitleSetMaxSizeArgs[2].wordWrap, 'subtitleWordWrap');
        assert.deepEqual(subtitleSetMaxSizeArgs[2].textOverflow, 'subtitleTextOverflow');
      });
      QUnit.test('Length of title greater than canvas width without placeholderSize', function(assert) {
        this.renderer.bBoxTemplate = {
          height: 10,
          width: 900
        };
        this.options.text = 'test big title';
        this.options.subtitle.text = 'test subtitle';
        this.options.placeholderSize = undefined;
        this.options.margin = {
          left: 10,
          right: 20
        };
        this.createTitle().draw(this.canvas.width, this.canvas.height);
        var titleSetMaxSizeArgs = this.renderer.text.getCall(0).returnValue.setMaxSize.lastCall.args;
        assert.equal(titleSetMaxSizeArgs[1], undefined);
        var subtitleSetMaxSizeArgs = this.renderer.text.getCall(1).returnValue.setMaxSize.lastCall.args;
        assert.equal(subtitleSetMaxSizeArgs[1], undefined);
      });
      QUnit.test('Set title if text has big size', function(assert) {
        this.options.text = 'test big title';
        this.options.subtitle.text = 'test big big big big big big big big big big big big bigsubtitle';
        this.options.margin = {
          left: 10,
          right: 20
        };
        this.createTitle().draw(50, this.canvas.height);
        assert.strictEqual(this.renderer.text.getCall(0).returnValue.setTitle.called, true);
        assert.strictEqual(this.renderer.text.getCall(1).returnValue.setTitle.called, true);
      });
      QUnit.test('Do not set title if text has correct size', function(assert) {
        this.renderer.bBoxTemplate = {
          height: 10,
          width: 900
        };
        this.options.text = 'test big title';
        this.options.subtitle.text = 'test subtitle';
        this.options.margin = {
          left: 10,
          right: 20
        };
        this.createTitle().draw(1000, this.canvas.height);
        assert.strictEqual(this.renderer.text.getCall(0).returnValue.stub('setTitle').called, false);
        assert.strictEqual(this.renderer.text.getCall(1).returnValue.stub('setTitle').called, false);
      });
      QUnit.test('Dispose renderer elements. Height', function(assert) {
        var title = this.createTitle().draw(100, 3);
        this.rendererElementsIsDispose(assert);
        assert.deepEqual(title.getLayoutOptions(), {
          cutLayoutSide: 'top',
          cutSide: 'vertical',
          height: 0,
          horizontalAlignment: 'center',
          position: {
            horizontal: 'center',
            vertical: 'top'
          },
          verticalAlignment: 'top',
          width: 0,
          x: 1,
          y: 24
        }, 'layoutOptions');
      });
      QUnit.module('getLayoutOptions', $.extend({}, environment, {beforeEach: function() {
          environment.beforeEach.apply(this, arguments);
          this.options.placeholderSize = null;
        }}));
      QUnit.test('get options', function(assert) {
        assert.deepEqual(this.createTitle().draw().getLayoutOptions(), {
          verticalAlignment: 'top',
          horizontalAlignment: 'center',
          cutLayoutSide: 'top',
          cutSide: 'vertical',
          position: {
            'horizontal': 'center',
            'vertical': 'top'
          },
          height: 8,
          width: 40,
          x: 1,
          y: 24
        });
      });
      QUnit.test('Get options rect with placeholder', function(assert) {
        this.options.placeholderSize = 50;
        var box = this.createTitle().draw().getLayoutOptions();
        assert.ok(this.renderer.g.getCall(0).returnValue.getBBox.called, 'bbox from group');
        assert.equal(box.height, 50, 'height title like placeholderSize');
      });
      QUnit.test('Get options rect if nothing drawn', function(assert) {
        this.options = {
          subtitle: {},
          placeholderSize: 10
        };
        var box = this.createTitle().getLayoutOptions();
        assert.deepEqual(box, {
          cutLayoutSide: 'top',
          cutSide: 'vertical',
          height: 10,
          horizontalAlignment: 'center',
          position: {
            horizontal: 'center',
            vertical: 'top'
          },
          verticalAlignment: 'top',
          width: 0,
          x: 0,
          y: 0
        }, 'layout options should be null');
      });
      QUnit.test('shift title', function(assert) {
        var title = this.createTitle().draw();
        title.shift(10, 20);
        title.shift(15, 25);
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.move.getCall(0).args, [9, -4]);
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.move.getCall(1).args, [14, 1]);
      });
      QUnit.test('layoutOptions - without text', function(assert) {
        this.title.update({text: null});
        assert.strictEqual(this.title.layoutOptions(), null);
      });
      QUnit.test('layoutOptions', function(assert) {
        this.title.update(this.options);
        assert.deepEqual(this.title.layoutOptions(), {
          horizontalAlignment: 'center',
          verticalAlignment: 'top',
          priority: 0
        });
      });
      QUnit.test('measure', function(assert) {
        this.title.update(this.options);
        assert.deepEqual(this.title.measure([400, 300]), [40, 8]);
      });
      QUnit.test('move', function(assert) {
        var title = this.createTitle().draw();
        var spy = sinon.spy(title, 'draw');
        title.move([20, 10, 90, 80]);
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.move.getCall(0).args, [19, -14], 'position');
        assert.strictEqual(spy.callCount, 0, 'not drawn');
      });
      QUnit.test('move - not enough size in rect - move to second rect', function(assert) {
        var title = this.createTitle().draw();
        var spy = sinon.spy(title, 'draw');
        title.move([20, 10, 50, 40], [10, 10, 100, 40]);
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.move.getCall(0).args, [9, -14], 'position');
        assert.strictEqual(spy.callCount, 0, 'drawn');
      });
      QUnit.test('freeSpace', function(assert) {
        this.title.update(this.options);
        this.title.measure([400, 300]);
        this.title.freeSpace();
        this.rendererElementsIsDispose(assert);
      });
      QUnit.test('getCorrectedLayoutOptions', function(assert) {
        this.title.update(this.options);
        var correctedLayout = this.title.getCorrectedLayoutOptions();
        var layoutOptions = this.title.getLayoutOptions();
        assert.deepEqual(correctedLayout, $.extend({}, layoutOptions, {
          y: -22,
          height: 22
        }));
      });
      QUnit.module('Size changing notification', environment);
      QUnit.test('initial, no text', function(assert) {
        this.options.text = null;
        assert.strictEqual(this.title.update(this.options), false);
      });
      QUnit.test('initial, text', function(assert) {
        this.options.text = 'hello';
        assert.strictEqual(this.title.update(this.options), true);
      });
      QUnit.test('text -> no text', function(assert) {
        this.options.text = 'hello';
        this.title.update(this.options);
        this.options.text = null;
        assert.strictEqual(this.title.update(this.options), true);
      });
      QUnit.test('no text -> text', function(assert) {
        this.options.text = null;
        this.title.update(this.options);
        this.options.text = 'hello';
        assert.strictEqual(this.title.update(this.options), true);
      });
      QUnit.test('no text -> no text', function(assert) {
        this.options.text = null;
        this.title.update(this.options);
        this.options.text = '';
        assert.strictEqual(this.title.update(this.options), false);
      });
      QUnit.test('text -> text', function(assert) {
        this.options.text = 'hello';
        this.title.update(this.options);
        this.options.text = 'hello-2';
        assert.strictEqual(this.title.update(this.options), true);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/core/title"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/core/title"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=title.tests.js.map