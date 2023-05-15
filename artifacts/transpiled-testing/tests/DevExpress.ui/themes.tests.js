!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui/themes.tests.js"], ["jquery","ui/themes","core/utils/view_port"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui/themes.tests.js", ["jquery", "ui/themes", "core/utils/view_port"], function($__export) {
  "use strict";
  var $,
      themes,
      viewPortUtils,
      viewPortChanged,
      test,
      testInActiveWindow,
      timeoutDoneWrapper,
      defaultTimeout;
  function rulesFromSheet(sheet) {
    try {
      return sheet.rules || sheet.cssRules || [];
    } catch (x) {
      return [];
    }
  }
  function loadCss(frame, cssFileName) {
    var frameWindow = frame[0].contentWindow;
    var frameDoc = frameWindow.document;
    var defaultSheetCount = frameDoc.styleSheets.length;
    var cssUrl = ROOT_URL + 'artifacts/css/' + cssFileName;
    frameDoc.write('<link rel=stylesheet href=\'' + cssUrl + '\'>');
    return function() {
      if (frameDoc.styleSheets.length <= defaultSheetCount) {
        return false;
      }
      var ourSheet = $.grep(frameDoc.styleSheets, function(i) {
        return i.href.indexOf(cssUrl) > -1;
      })[0];
      return rulesFromSheet(ourSheet).length > 0;
    };
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      viewPortUtils = $__m.default;
    }],
    execute: function() {
      var $__2;
      viewPortChanged = viewPortUtils.changeCallback;
      (($__2 = QUnit, test = $__2.test, testInActiveWindow = $__2.testInActiveWindow, $__2));
      timeoutDoneWrapper = function(done) {
        setTimeout(done, 200);
      };
      defaultTimeout = 2000;
      themes.setDefaultTimeout(defaultTimeout);
      QUnit.module('Selector check', function() {
        if (document.documentMode < 9) {
          return;
        }
        if (/(iPhone|iPad|iPod|android|Windows Phone 8)/i.test(navigator.userAgent)) {
          return;
        }
        function simplifySelector(selectorText) {
          selectorText = selectorText.replace(/\[.*?\]/gi, '');
          selectorText = selectorText.replace(/::?[\w-]+(\(.*?\))?/gi, '');
          selectorText = selectorText.replace(/(^|[^\w.#-])[a-z]+([.#][\w-]+)/gi, '$1$2');
          selectorText = selectorText.replace(/[+~>]/g, '');
          selectorText = $.trim(selectorText).replace(/\s+/g, ' ');
          return selectorText;
        }
        function isGoodSelector(selectorText) {
          var parts = selectorText.split(/(?=[#.\s])/g);
          var i;
          var part;
          function isTag(text) {
            return text === '*' || /^\w+$/.test(text);
          }
          for (i = 0; i < parts.length; i++) {
            part = $.trim(parts[i]);
            if (part === '') {
              continue;
            }
            if (isTag(part)) {
              if (i === 0) {
                return false;
              }
            } else {
              if (!/^[#.](dx|ql|dxdi)-/.test(part)) {
                return false;
              }
            }
          }
          return true;
        }
        function findBadCssSelectors(doc) {
          var badSelectors = [];
          $.each(doc.styleSheets, function() {
            var rules = rulesFromSheet(this);
            $.each(rules, function() {
              if (!this.selectorText) {
                return;
              }
              var selectors = this.selectorText.split(/\s*,\s*/g);
              $.each(selectors, function() {
                var selectorText = String(this);
                var simplifiedSelectorText = simplifySelector(selectorText);
                if (!isGoodSelector(simplifiedSelectorText)) {
                  badSelectors.push(selectorText);
                }
              });
            });
          });
          return badSelectors;
        }
        $.getJSON('/themes-test/get-css-files-list', function(knownCssFiles) {
          $.each(knownCssFiles, function(i, cssFileName) {
            test(cssFileName, function(assert) {
              var done = assert.async();
              var frame = $('<iframe/>').appendTo('body');
              window.waitFor(loadCss(frame, cssFileName)).done(function() {
                assert.deepEqual(findBadCssSelectors(frame[0].contentWindow.document), [], 'Css rule has incorrect selectors');
                frame.remove();
                done();
              });
            });
          });
        });
      });
      QUnit.module('All images are defined with data-uri and will be inlined', function() {
        $.getJSON('/themes-test/get-css-files-list', function(knownCssFiles) {
          $.each(knownCssFiles, function(i, cssFileName) {
            function hasUrlImageProperty(doc) {
              var rulesWithUrl = [];
              $.each(doc.styleSheets, function() {
                var rules = rulesFromSheet(this);
                $.each(rules, function() {
                  if (!this.cssText) {
                    return;
                  }
                  if (/url\((?!"data:image)/.test(this.cssText) && /url\((?!"?icons)/.test(this.cssText) && /url\((?!"?fonts)/.test(this.cssText) && /url\((?!"?https:\/\/fonts.googleapis.com)/.test(this.cssText)) {
                    rulesWithUrl.push(this.cssText);
                  }
                });
              });
              return rulesWithUrl;
            }
            test(cssFileName, function(assert) {
              var done = assert.async();
              var frame = $('<iframe/>').appendTo('body');
              window.waitFor(loadCss(frame, cssFileName)).done(function() {
                assert.deepEqual(hasUrlImageProperty(frame[0].contentWindow.document), [], 'Css rule has non-encoded url, change url() to data-uri() in the less file');
                frame.remove();
                done();
              });
            });
          });
        });
      });
      QUnit.module('dx-theme changing', function(hooks) {
        hooks.beforeEach(function() {
          themes.setDefaultTimeout(defaultTimeout);
          themes.resetTheme();
        });
        test('Themes functions return right value after themes switching', function(assert) {
          var done = assert.async();
          var genericThemeName = 'generic.light';
          var materialThemeName = 'material.blue.light';
          var linksContainer = $('<div>').addClass('links-container').appendTo('body');
          var testThemes = [{
            functionName: 'isGeneric',
            themeName: genericThemeName,
            anotherThemeName: materialThemeName
          }, {
            functionName: 'isMaterial',
            themeName: materialThemeName
          }];
          linksContainer.append('<link rel=\'dx-theme\' href=\'style2.css\' data-theme=\'' + materialThemeName + '\' />');
          linksContainer.append('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'' + genericThemeName + '\' />');
          themes.init({
            context: window.document,
            theme: materialThemeName
          });
          themes.initialized(function() {
            assert.ok(themes.isMaterial(), 'isMaterial is true after material theme init');
            assert.notOk(themes.isGeneric(), 'isGeneric is false after material theme init');
            themes.current(genericThemeName);
            assert.ok(themes.isGeneric(), 'isGeneric after activate generic theme');
            assert.notOk(themes.isMaterial(), 'isMaterial is false after generic theme init');
            themes.resetTheme();
            assert.notOk(themes.isGeneric(), 'isGeneric is false after reset');
            $.each(testThemes, function(_, themeData) {
              var anotherThemeName = themeData.anotherThemeName || genericThemeName;
              assert.ok(themes[themeData.functionName](themeData.themeName), themeData.functionName + ' with ' + themeData.themeName + ' argument');
              assert.notOk(themes[themeData.functionName](anotherThemeName), themeData.functionName + ' with ' + anotherThemeName + ' argument');
            });
            linksContainer.remove();
            timeoutDoneWrapper(done);
          });
        });
        test('Themes functions return right value if theme file loaded after ready event (T666366)', function(assert) {
          var done = assert.async();
          var linksContainer = $('<div>').addClass('links-container').appendTo('body');
          linksContainer.append('<link rel=\'dx-theme\' href=\'style2.css\' data-theme=\'material.blue.light\' />');
          themes.init({
            context: window.document,
            theme: 'material.blue.light'
          });
          themes.initialized(function() {
            themes.resetTheme();
            linksContainer.append('<style nonce="qunit-test">.dx-theme-marker { font-family: \'dx.generic.light\' }</style>');
            assert.equal(themes.isGeneric(), true, 'isGeneric returns \'true\' if css has been added after themes initialization');
            linksContainer.remove();
            timeoutDoneWrapper(done);
          });
        });
      });
      QUnit.module('dx-theme links', function(hooks) {
        var $frame;
        var frames = [];
        hooks.beforeEach(function() {
          themes.setDefaultTimeout(100);
          $frame = $('<iframe></iframe>').appendTo('body');
          frames.push($frame);
        });
        hooks.afterEach(function() {
          return themes.setDefaultTimeout(defaultTimeout);
        });
        hooks.after(function() {
          return frames.forEach(function(frame) {
            return frame.remove();
          });
        });
        function frameDoc() {
          return $frame[0].contentWindow.document;
        }
        function writeToFrame(markup) {
          frameDoc().write(markup);
        }
        function getFrameStyleLinks() {
          return $('link[rel=stylesheet]', frameDoc());
        }
        test('should not add additional link if no dx-theme found', function(assert) {
          var done = assert.async();
          themes.init({
            _autoInit: true,
            context: frameDoc()
          });
          var realStylesheets = getFrameStyleLinks();
          assert.equal(realStylesheets.length, 0, 'No stylesheets should be added');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('should throw if non-existing platform requested', function(assert) {
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'myPlatform.theme1\' />');
          assert.throws(function() {
            themes.init({
              theme: 'missingPlatform',
              context: frameDoc()
            });
          });
        });
        test('theme by platform only', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'myCss\' data-theme=\'myPlatform.theme1\' />');
          themes.init({
            theme: 'myPlatform',
            context: frameDoc()
          });
          var realStylesheets = getFrameStyleLinks();
          assert.equal(realStylesheets.length, 1, 'Single dx-theme should be converted to regular stylesheet');
          assert.equal(realStylesheets.attr('href'), 'myCss');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('theme by platform and color scheme', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'myPlatform.theme1\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style2.css\' data-theme=\'myPlatform.theme2\' />');
          themes.init({
            theme: 'myPlatform.theme2',
            context: frameDoc()
          });
          var realStylesheets = getFrameStyleLinks();
          assert.equal(realStylesheets.length, 1, 'Single dx-theme should be converted to regular stylesheet');
          assert.equal(realStylesheets.attr('href'), 'style2.css');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('change theme by string', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'myPlatform.theme1\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style2.css\' data-theme=\'myPlatform.theme2\' />');
          themes.init({
            theme: 'myPlatform.theme2',
            context: frameDoc()
          });
          themes.current('myPlatform.theme1');
          var realStylesheets = getFrameStyleLinks();
          assert.equal(realStylesheets.length, 1, 'Single dx-theme should be converted to regular stylesheet');
          assert.equal(realStylesheets.attr('href'), 'style1.css');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('change theme by configuration object', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'myPlatform.theme1\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style2.css\' data-theme=\'myPlatform.theme2\' />');
          themes.init({
            theme: 'myPlatform.theme1',
            context: frameDoc()
          });
          themes.current({theme: 'myPlatform.theme2'});
          var realStylesheets = getFrameStyleLinks();
          assert.equal(realStylesheets.length, 1, 'Single dx-theme should be converted to regular stylesheet');
          assert.equal(realStylesheets.attr('href'), 'style2.css');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('method themes.ready calls a callback function after themes loading', function(assert) {
          var done = assert.async();
          var url = ROOT_URL + 'testing/helpers/themeMarker.css';
          writeToFrame('<link rel=dx-theme data-theme=\'myPlatform.theme1\' href=\'style1.css\' />');
          writeToFrame('<link rel=dx-theme data-theme=\'sampleTheme.sampleColorScheme\' href=\'' + url + '\' />');
          themes.init({
            theme: 'myPlatform.theme1',
            context: frameDoc()
          });
          themes.ready(function() {
            assert.equal(themes.current(), 'sampleTheme.sampleColorScheme');
            timeoutDoneWrapper(done);
          });
          themes.current('sampleTheme.sampleColorScheme');
        });
        test('default theme is first if not specified', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'myPlatform.theme1\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style2.css\' data-theme=\'myPlatform.theme2\' />');
          themes.init({
            theme: 'myPlatform',
            context: frameDoc()
          });
          assert.equal(getFrameStyleLinks().attr('href'), 'style1.css');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('default theme defined by active attribute if not specified', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'myPlatform.theme1\' data-active=\'nonsense\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style2.css\' data-theme=\'myPlatform.theme2\' data-active=\'true\' />');
          themes.init({
            theme: 'myPlatform',
            context: frameDoc()
          });
          assert.equal(getFrameStyleLinks().attr('href'), 'style2.css');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('dx-theme should change compact theme to normal if compact has data-active=\'true\' (T449216)', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'myPlatform.theme1\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.compact.css\' data-theme=\'myPlatform.theme1.compact\' data-active=\'true\' />');
          themes.init({
            theme: 'myPlatform.theme1',
            context: frameDoc()
          });
          assert.equal(themes.current(), 'myPlatform.theme1');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('dx-theme should select active theme if theme name is incomplete (T449216)', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'myPlatform.theme1\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.compact.css\' data-theme=\'myPlatform.theme1.compact\' data-active=\'true\' />');
          themes.init({
            theme: 'myPlatform.theme1',
            context: frameDoc()
          });
          themes.current({theme: 'myPlatform'});
          assert.equal(themes.current(), 'myPlatform.theme1.compact');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('read current theme name', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'theme1\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style2.css\' data-theme=\'theme2.dark\' />');
          themes.init({
            theme: 'theme1',
            context: frameDoc()
          });
          assert.equal(themes.current(), 'theme1');
          themes.current('theme2');
          assert.equal(themes.current(), 'theme2.dark');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('loadCallback option for init', function(assert) {
          var done = assert.async();
          var url = ROOT_URL + 'testing/helpers/themeMarker.css';
          writeToFrame('<link rel=dx-theme data-theme=sampleTheme.sampleColorScheme href=\'' + url + '\' />');
          themes.init({
            context: frameDoc(),
            theme: 'sampleTheme.sampleColorScheme',
            loadCallback: function() {
              assert.expect(0);
              done();
            }
          });
        });
        test('current theme name when theme included as simple stylesheet', function(assert) {
          var done = assert.async();
          var url = ROOT_URL + 'testing/helpers/themeMarker.css';
          themes.init({
            context: frameDoc(),
            _autoInit: true
          });
          writeToFrame('<link rel=stylesheet href=\'' + url + '\' />');
          assert.expect(0);
          themes.ready(done);
          themes.waitForThemeLoad('sampleTheme.sampleColorScheme');
        });
        test('current theme name read once', function(assert) {
          var done = assert.async();
          var url = ROOT_URL + 'testing/helpers/themeMarker.css';
          writeToFrame('<link id=\'testTheme\' rel=\'dx-theme\' data-theme=\'sampleTheme.sampleColorScheme\' href=\'' + url + '\' />');
          themes.init({
            context: frameDoc(),
            theme: 'sampleTheme.sampleColorScheme',
            loadCallback: function() {
              themes.resetTheme();
              $('link', frameDoc()).remove();
              setTimeout(function() {
                var s = frameDoc().styleSheets;
                assert.equal(s.length, 0, 'style rules should be cleared');
                writeToFrame('<style nonce="qunit-test">.dx-theme-marker{ font-family: \'dx.sampleTheme.sampleColorScheme1\';}</style>');
                var assertPredicate = function() {
                  return themes.current() === 'sampleTheme.sampleColorScheme1';
                };
                setTimeout(function() {
                  assert.ok(assertPredicate(), 'theme name was read from css');
                  if (!assertPredicate()) {
                    var s$__3 = frameDoc().styleSheets;
                    assert.equal(s$__3.length, 1, 'style rule count should equal to 1');
                    $.each(s$__3, function() {
                      assert.ok(false, this.ownerNode.outerHTML);
                    });
                    var done2 = assert.async();
                    setTimeout(function() {
                      assert.ok(assertPredicate(), 'theme name was read from css');
                      done2();
                      var done3 = assert.async();
                      setTimeout(function() {
                        assert.equal(themes.current(), 'sampleTheme.sampleColorScheme1');
                        done3();
                      }, 15000);
                    }, 15000);
                  }
                  writeToFrame('<style nonce="qunit-test">.dx-theme-marker{ font-family: \'dx.sampleTheme.sampleColorScheme2\';}</style>');
                  setTimeout(function() {
                    assert.ok(assertPredicate(), 'theme name was updated only once');
                    done();
                  });
                });
              });
            }
          });
        });
        test('current theme name is null if without any links (first load)', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          themes.init({
            context: frameDoc(),
            _autoInit: true
          });
          assert.strictEqual(themes.current(), null);
          themes.ready(done);
        });
        test('move classes from previous viewport to new viewport', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'mytheme\' />');
          themes.init({
            context: frameDoc(),
            theme: 'mytheme'
          });
          var $element = $('<div>');
          themes.attachCssClasses($element);
          var $newElement = $('<div>');
          viewPortChanged.fire($newElement, $element);
          themes.initialized(function() {
            assert.equal($element.hasClass('dx-theme-mytheme'), false, 'theme class removed');
            assert.ok($newElement.hasClass('dx-theme-mytheme'), 'theme class added');
            done();
          });
        });
        test('attachCssClasses removes classes for old theme', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'oldtheme\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'newtheme\' />');
          themes.init({
            context: frameDoc(),
            theme: 'oldtheme'
          });
          var $element = $('.dx-theme-oldtheme');
          themes.current('newtheme');
          assert.equal($element.hasClass('dx-theme-oldtheme'), false, 'old theme class deleted');
          assert.equal($element.hasClass('dx-theme-oldtheme-typography'), false, 'old typography class deleted');
          themes.initialized(timeoutDoneWrapper(done));
        });
        test('dx-color-scheme class for different themes', function(assert) {
          var done = assert.async();
          themes.resetTheme();
          writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'generic.light\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style2.css\' data-theme=\'generic.light.compact\' />');
          writeToFrame('<link rel=\'dx-theme\' href=\'style3.css\' data-theme=\'material.blue.light\' />');
          writeToFrame('<body class=\'dx-viewport\'></body>');
          themes.init({
            context: frameDoc(),
            theme: 'generic.light'
          });
          viewPortUtils.value($('.dx-viewport', frameDoc()));
          themes.initialized(function() {
            assert.ok($('.dx-theme-generic', frameDoc()).hasClass('dx-color-scheme-light'), 'right dx-color-scheme class for generic');
            themes.current('generic.light.compact');
            themes.initialized(function() {
              assert.ok($('.dx-theme-generic', frameDoc()).hasClass('dx-color-scheme-light'), 'right dx-color-scheme class for generic.compact');
              themes.current('material.blue.light');
              themes.initialized(function() {
                assert.ok($('.dx-theme-material', frameDoc()).hasClass('dx-color-scheme-blue-light'), 'right dx-color-scheme class for material');
                done();
              });
            });
          });
        });
      });
      QUnit.module('misc', function() {
        var DX_HAIRLINES_CLASS = 'dx-hairlines';
        test('attachCssClasses', function(assert) {
          var attachCssClasses = themes.attachCssClasses;
          var element;
          var expectedClasses = ['dx-theme-abc', 'dx-theme-abc-typography'];
          var pixelRatio = window.devicePixelRatio;
          if (!!pixelRatio && pixelRatio >= 2) {
            expectedClasses.unshift(DX_HAIRLINES_CLASS);
          }
          element = document.createElement('DIV');
          attachCssClasses(element, 'abc');
          assert.deepEqual(element.className.split(/ /g).sort(), expectedClasses);
          element = document.createElement('DIV');
          expectedClasses.unshift('dx-color-scheme-xyz');
          attachCssClasses(element, 'abc.xyz');
          assert.deepEqual(element.className.split(/ /g).sort(), expectedClasses);
        });
        test('detachCssClasses', function(assert) {
          var element = document.createElement('DIV');
          themes.attachCssClasses(element, 'abc');
          themes.detachCssClasses(element);
          assert.equal(element.className, '', 'attached classes was removed');
        });
      });
      QUnit.module('web font checker', function() {
        test('isWebFontLoaded: font loaded', function(assert) {
          assert.notOk(themes.isWebFontLoaded('test text', 400));
          if (!document.fonts) {
            assert.expect(1);
            return;
          }
          var done = assert.async();
          var font = new FontFace('RobotoFallback', 'url(../../artifacts/css/fonts/Roboto-400.woff2)', {
            weight: 400,
            unicodeRange: 'U+26'
          });
          document.fonts.add(font);
          font.load();
          font.loaded.then(function() {
            assert.notOk(themes.isWebFontLoaded('test text', 400), 'characters in wrong unicode range (not loaded)');
            assert.ok(themes.isWebFontLoaded('&', 400), 'amp char (U+26) loaded');
            document.fonts.clear();
            done();
          });
        });
        test('isWebFontLoaded does not create additional nodes', function(assert) {
          var elementsCount = document.getElementsByTagName('*').length;
          themes.isWebFontLoaded('test text', 400);
          var afterElementsCount = document.getElementsByTagName('*').length;
          var diff = afterElementsCount - elementsCount;
          assert.equal(diff, 0, 'Element\'s count are the same after method call');
        });
        testInActiveWindow('waitWebFont: function resolve by timeout if the font is not loaded', function(assert) {
          var done = assert.async();
          themes.waitWebFont('test text', 400).then(function(success) {
            assert.ok(true, 'The font was not loaded, but waiting successfully resolved');
            done();
          });
        });
        test('waitWebFont: function resolved when the font is loaded', function(assert) {
          if (!document.fonts) {
            assert.expect(0);
            return;
          }
          var done = assert.async();
          var font = new FontFace('RobotoFallback', 'url(../../artifacts/css/fonts/Roboto-400.woff2)', {weight: 400});
          document.fonts.add(font);
          document.fonts.ready.then(function() {
            themes.waitWebFont('test text', 400).then(function(success) {
              assert.ok(true, 'The font was loaded, waiting successfully resolved');
              document.fonts.clear();
              done();
            }, function(fail) {
              assert.ok(false, 'The font was loaded, but waiting was rejected');
              document.fonts.clear();
              done();
            });
          });
        });
      });
      QUnit.module('initialized method', function(hooks) {
        var createdFrames = [];
        hooks.after(function() {
          createdFrames.forEach(function($frame) {
            return $frame.remove();
          });
        });
        function writeToFrame($frame, markup) {
          frameDoc($frame).write(markup);
        }
        function frameDoc($frame) {
          return $frame[0].contentWindow.document;
        }
        function createFrame() {
          var $frame = $('<iframe></iframe>').appendTo('body');
          createdFrames.push($frame);
          return $frame;
        }
        test('initialized fires for data-theme link (init after link addition)', function(assert) {
          var done = assert.async();
          var url = ROOT_URL + 'testing/helpers/themeMarker.css';
          var $frame = createFrame();
          writeToFrame($frame, '<link id=\'testTheme\' rel=\'dx-theme\' data-theme=\'sampleTheme.sampleColorScheme\' href=\'' + url + '\' />');
          themes.resetTheme();
          themes.init({
            _autoInit: true,
            _forceTimeout: true,
            context: frameDoc($frame)
          });
          themes.initialized(function() {
            assert.equal(themes.current(), 'sampleTheme.sampleColorScheme');
            done();
          });
        });
        test('initialized fires for ordinary link (init after style addition - should run immediately)', function(assert) {
          var done = assert.async();
          var $frame = createFrame();
          writeToFrame($frame, '<style nonce="qunit-test">.dx-theme-marker { font-family: "dx.sampleTheme2"}</style>');
          themes.resetTheme();
          themes.init({
            _autoInit: true,
            _forceTimeout: true,
            context: frameDoc($frame)
          });
          themes.initialized(function() {
            assert.equal(themes.current(), 'sampleTheme2');
            done();
          });
        });
        test('initialized fires for ordinary link (init before link addition - should wait theme loading)', function(assert) {
          var done = assert.async();
          var url = ROOT_URL + 'testing/helpers/themeMarker.css';
          var $frame = createFrame();
          themes.setDefaultTimeout(30000);
          themes.resetTheme();
          themes.initialized(function() {
            assert.equal(themes.current(), 'sampleTheme.sampleColorScheme');
            themes.setDefaultTimeout(defaultTimeout);
            done();
          });
          themes.init({
            _autoInit: true,
            _forceTimeout: true,
            context: frameDoc($frame)
          });
          writeToFrame($frame, '<link rel=stylesheet href=\'' + url + '\' />');
        });
        test('initialized fires after timeout if theme is not loaded', function(assert) {
          var done = assert.async();
          var $frame = createFrame();
          themes.resetTheme();
          themes.init({
            _autoInit: true,
            _forceTimeout: true,
            context: frameDoc($frame)
          });
          themes.initialized(function() {
            assert.equal(themes.current(), null);
            done();
          });
        });
        test('initialized fires syncroniously if timeout === 0', function(assert) {
          var $frame = createFrame();
          themes.resetTheme();
          themes.setDefaultTimeout(0);
          themes.init({
            _autoInit: true,
            _forceTimeout: true,
            context: frameDoc($frame)
          });
          themes.initialized(function() {
            assert.ok(true);
            themes.setDefaultTimeout(defaultTimeout);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/themes","core/utils/view_port"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/themes"), require("core/utils/view_port"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=themes.tests.js.map