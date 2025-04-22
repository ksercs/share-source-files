/**
* DevExtreme (esm/__internal/ui/html_editor/formats/m_link.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isObject } from '../../../../core/utils/type';
import Quill from 'devextreme-quill';
// eslint-disable-next-line import/no-mutable-exports
let ExtLink = {};
if (Quill) {
  const Link = Quill.import('formats/link');
  ExtLink = class ExtLink extends Link {
    static create(data) {
      const HREF = (data === null || data === void 0 ? void 0 : data.href) ?? data;
      const node = super.create(HREF);
      if (isObject(data)) {
        // @ts-expect-error
        if (data.text) {
          // @ts-expect-error
          node.innerText = data.text;
        }
        // @ts-expect-error
        if (!data.target) {
          node.removeAttribute('target');
        }
      }
      return node;
    }
    static formats(domNode) {
      return {
        href: domNode.getAttribute('href'),
        target: domNode.getAttribute('target')
      };
    }
    formats() {
      const formats = super.formats();
      const {
        href,
        target
      } = ExtLink.formats(this.domNode);
      formats.link = href;
      formats.target = target;
      return formats;
    }
    format(name, value) {
      if (name === 'link' && isObject(value)) {
        // @ts-expect-error
        if (value.text) {
          // @ts-expect-error
          this.domNode.innerText = value.text;
        }
        // @ts-expect-error
        if (value.target) {
          this.domNode.setAttribute('target', '_blank');
        } else {
          this.domNode.removeAttribute('target');
        }
        // @ts-expect-error
        this.domNode.setAttribute('href', value.href);
      } else {
        super.format(name, value);
      }
    }
    static value(domNode) {
      return {
        href: domNode.getAttribute('href'),
        text: domNode.innerText,
        target: !!domNode.getAttribute('target')
      };
    }
  };
}
export default ExtLink;
