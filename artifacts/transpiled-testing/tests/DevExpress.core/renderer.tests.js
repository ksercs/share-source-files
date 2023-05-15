!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/renderer.tests.js"], ["core/utils/size","core/renderer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.core/renderer.tests.js', ['core/utils/size', 'core/renderer'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const { setHeight, setWidth, implementationsMap } = $__require('core/utils/size');
    const renderer = $__require('core/renderer');

    QUnit.module('renderer');

    QUnit.test('renderer should return correct element if window contains element with id=toArray', function (assert) {
        const element = renderer('<div>');
        element.attr('id', 'toArray');

        document.getElementById('qunit-fixture').appendChild(element[0]);

        const $window = renderer(window);
        assert.equal($window[0], window);
    });

    QUnit.module('HTML main');

    QUnit.test('base', function (assert) {
        assert.equal(renderer('<div>').html('<div></div>').html(), '<div></div>');
        assert.equal(renderer('<div>').html('<div><p>test</p></div>').html(), '<div><p>test</p></div>');
    });

    QUnit.test('Nearby tags', function (assert) {
        assert.equal(renderer('<div>').html('<div>1</div><div>2</div>').html(), '<div>1</div><div>2</div>');
    });

    QUnit.module('HTML table');

    QUnit.test('Insert tbody tag', function (assert) {
        assert.equal(renderer('<table>').html('<tbody><tr><th></th></tr></tbody>').html(), '<tbody><tr><th></th></tr></tbody>');
    });

    QUnit.test('Insert colgroup tag', function (assert) {
        assert.equal(renderer('<table>').html('<colgroup></colgroup>').html(), '<colgroup></colgroup>');
    });

    QUnit.test('Insert caption tag', function (assert) {
        assert.equal(renderer('<table>').html('<caption></caption>').html(), '<caption></caption>');
    });

    QUnit.test('Insert thead tag', function (assert) {
        assert.equal(renderer('<table>').html('<thead></thead>').html(), '<thead></thead>');
    });

    QUnit.test('Insert tfoot tag', function (assert) {
        assert.equal(renderer('<table>').html('<tfoot></tfoot>').html(), '<tfoot></tfoot>');
    });

    QUnit.test('Insert tr tag', function (assert) {
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        assert.equal(renderer(tbody).html('<tr><th></th></tr>').html(), '<tr><th></th></tr>');
    });

    QUnit.test('Insert into table tag', function (assert) {
        const table = document.createElement('table');
        const colgroup = document.createElement('colgroup');
        table.appendChild(colgroup);

        assert.equal(renderer(colgroup).html('<col>').html(), '<col>');
    });

    QUnit.test('Insert th tag', function (assert) {
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');
        table.appendChild(tbody);
        tbody.appendChild(tr);

        assert.equal(renderer(tr).html('<th></th>').html(), '<th></th>');
    });
    QUnit.test('Insert td tag', function (assert) {
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');
        table.appendChild(tbody);
        tbody.appendChild(tr);

        assert.equal(renderer(tr).html('<td></td>').html(), '<td></td>');
    });

    QUnit.test('Insert thead tag into div', function (assert) {
        assert.equal(renderer('<div>').html('<thead></thead>').html(), '<thead></thead>');
    });

    QUnit.module('CSS method');

    QUnit.test('Get value', function (assert) {
        let element = renderer('<div>');

        document.getElementById('qunit-fixture').appendChild(element[0]);

        element[0].style.width = '5px';
        element[0].style.border = '1px solid red';
        element[0].style.padding = '1px';
        element[0].style.margin = '100px';
        element[0].style.color = 'red';

        assert.equal(element.css('width'), '5px', 'Get width');
        assert.equal(element.css('color'), 'rgb(255, 0, 0)', 'Get color');
        assert.equal(element.css('position'), 'static', 'Get position');
        assert.equal(element.css('borderLeftWidth'), '1px', 'Get border');

        element = renderer('fake_element');
        assert.equal(element.css('width'), undefined, 'Return undefined if element is empty');
    });

    QUnit.test('Set value', function (assert) {
        let element = renderer('<div>');

        document.body.appendChild(element[0]);

        element.css('width', 5);
        element.css('color', 'red');

        assert.equal(window.getComputedStyle(element[0])['width'], '5px', 'Set width');
        assert.equal(window.getComputedStyle(element[0])['color'], 'rgb(255, 0, 0)', 'Set color');

        element.css('height', 'auto');
        assert.equal(element[0].style['height'], 'auto', 'Set height with string');

        element.css({
            position: 'fixed',
            zIndex: 2,
            margin: '2px'
        });

        assert.equal(window.getComputedStyle(element[0])['position'], 'fixed', 'Set position with object of css values');
        assert.equal(window.getComputedStyle(element[0])['zIndex'], '2', 'Set zIndex with object of css values');
        const margin = window.getComputedStyle(element[0])['margin'] || window.getComputedStyle(element[0])['marginBottom']; // IE sets marginTop, marginBottom ... instead of margin
        assert.equal(margin, '2px', 'Set margin with object of css values');

        element = renderer('fake_element');
        const returnValue = element.css('height', '25px');
        assert.equal(returnValue, element, 'Return element itself for empty element');
    });

    QUnit.module('addClass method');

    QUnit.test('class should be set for only an element node', function (assert) {
        const element = renderer('<div>');
        const textNodeElement = renderer(document.createTextNode('text'));
        const svgElement = renderer(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));

        element.addClass('someClass');
        textNodeElement.addClass('someClass');
        svgElement.addClass('someClass');

        assert.ok(element.hasClass('someClass'));
        assert.ok(svgElement.hasClass('someClass'));
        assert.notOk(textNodeElement.hasClass('someClass'));
    });

    QUnit.module('removeClass method');

    QUnit.test('class should not be set when class name empty', function (assert) {
        const element = renderer('<div>');
        element.addClass('someClass');

        element.removeClass(' someClass');

        assert.notOk(element.hasClass('someClass'));
    });

    QUnit.test('should get class on element', function (assert) {
        const element = renderer(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));

        assert.notOk(element.hasClass('someClass'));
    });

    QUnit.test('class should be removed from SVG', function (assert) {
        const element = renderer(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
        element.addClass('someClass');

        element.removeClass('someClass');

        assert.notOk(element.hasClass('someClass'));
    });

    QUnit.module('width and height methods');

    QUnit.test('width and height should take into consideration borders and paddings if box-sizing is border-box', function (assert) {
        const $element = renderer('<div>');
        document.getElementById('qunit-fixture').appendChild($element.get(0));

        $element.css('boxSizing', 'border-box');
        $element.css('padding', '3px 4px');
        $element.css('border', '4px solid');

        setHeight($element, 80);
        setWidth($element, 80);

        assert.equal($element.get(0).style.height, '94px');
        assert.equal($element.get(0).style.width, '96px');
    });

    QUnit.test('string value should be set correctly', function (assert) {
        const $element = renderer('<div>');
        document.getElementById('qunit-fixture').appendChild($element.get(0));

        $element.css('boxSizing', 'border-box');
        $element.css('padding', '3px 4px');
        $element.css('border', '4px solid');

        setHeight($element, '80');
        setWidth($element, '80');

        assert.equal($element.get(0).style.height, '94px');
        assert.equal($element.get(0).style.width, '96px');
    });

    QUnit.test('null and NaN values should not be set in .css()', function (assert) {
        const $element = renderer('<div>');
        const prop = 'height';
        document.getElementById('qunit-fixture').appendChild($element.get(0));

        $element.css(prop, '100px');
        assert.equal($element.get(0).style[prop], '100px');

        $element.css(prop, null);
        assert.equal($element.get(0).style[prop], '100px');

        $element.css(prop, NaN);
        assert.equal($element.get(0).style[prop], '100px');
    });

    ['Width', 'Height'].forEach(function (propName) {
        const outerPropName = 'outer' + propName;
        const innerPropName = 'inner' + propName;
        propName = propName.toLocaleLowerCase();
        const setter = function (target, $el, value) {
            return implementationsMap['set' + target[0].toUpperCase() + target.slice(1)](...[...arguments].slice(1));
        };

        QUnit.test(propName + ' shouldn\'t take into consideration borders and paddings if box-sizing isn\'t border-box', function (assert) {
            const $element = renderer('<div>');
            document.getElementById('qunit-fixture').appendChild($element.get(0));

            $element.css('padding', 3);
            $element.css('border', '4px solid');

            setter(propName, $element, 80);

            assert.equal($element.get(0).style[propName], '80px');
        });

        QUnit.test(outerPropName + ' shouldn\'t take into consideration borders and paddings if box-sizing is border-box', function (assert) {
            const $element = renderer('<div>');
            document.getElementById('qunit-fixture').appendChild($element.get(0));

            $element.css('boxSizing', 'border-box');
            $element.css('padding', 3);
            $element.css('border', '4px solid');

            setter(outerPropName, $element, 80);

            assert.equal($element.get(0).style[propName], '80px');
        });

        QUnit.test(outerPropName + ' shouldn take into consideration borders and paddings if box-sizing isn\'t border-box', function (assert) {
            const $element = renderer('<div>');
            document.getElementById('qunit-fixture').appendChild($element.get(0));

            $element.css('padding', 3);
            $element.css('border', '4px solid');

            setter(outerPropName, $element, 80);

            assert.equal($element.get(0).style[propName], '66px');
        });

        QUnit.test(innerPropName + ' shouldn\'t take into consideration borders and paddings if box-sizing is border-box', function (assert) {
            const $element = renderer('<div>');
            document.getElementById('qunit-fixture').appendChild($element.get(0));

            $element.css('boxSizing', 'border-box');
            $element.css('padding', 3);
            $element.css('border', '4px solid');

            setter(innerPropName, $element, 80);

            assert.equal($element.get(0).style[propName], '88px');
        });

        QUnit.test(innerPropName + ' shouldn take into consideration borders and paddings if box-sizing isn\'t border-box', function (assert) {
            const $element = renderer('<div>');
            document.getElementById('qunit-fixture').appendChild($element.get(0));

            $element.css('padding', 3);
            $element.css('border', '4px solid');

            setter(innerPropName, $element, 80);

            assert.equal($element.get(0).style[propName], '74px');
        });
    });

    QUnit.module('text method');

    QUnit.test('shouldn process functions', function (assert) {
        const element = renderer('<div>');

        element.text(function () {
            return 'text';
        });

        assert.equal(element[0].textContent, 'text', 'the value that the function returns');
    });

    QUnit.module('append method');

    QUnit.test('shouldn insert number value', function (assert) {
        const element = renderer('<div>');

        element.append(1);

        assert.equal(element[0].textContent, '1', 'number value');
    });

    QUnit.module('replaceWith method');

    QUnit.test('Should not remove content when replacing the same content', function (assert) {
        const $element = renderer('<div>');

        const fixture = document.getElementById('qunit-fixture');

        fixture.appendChild($element.get(0));
        assert.equal(fixture.childElementCount, 1, 'element attached to the DOM');

        const $result = $element.replaceWith($element);
        assert.equal(fixture.childElementCount, 1, 'element still exist');
        assert.equal($element.is($result), true, 'returned value the same element');
    });

    QUnit.module('attr method');
    // T1108190
    QUnit.test('Add/remove atribute', function (assert) {
        const $element = renderer('<div>');

        $element.attr('data-test', 'test');
        $element.attr('readonly', true);
        const fixture = document.getElementById('qunit-fixture');

        fixture.appendChild($element.get(0));
        assert.equal($element.get(0).getAttribute('data-test'), 'test', 'element data-test attribute');
        assert.equal(!!$element.get(0).getAttribute('readonly'), true, 'element readOnly attribute');
        $element.attr('readonly', false);
        assert.equal($element.get(0).getAttribute('readonly'), undefined, 'element readOnly attribute');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","core/renderer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("core/renderer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=renderer.tests.js.map