import $ from '../../../../core/renderer';
export default class TextEditorButton {
  constructor(name, editor, options) {
    this.instance = null;
    // @ts-expect-error ts-error
    this.$container = null;
    this.$placeMarker = null;
    this.editor = editor;
    this.name = name;
    this.options = options || {};
  }
  _addPlaceMarker($container) {
    this.$placeMarker = $('<div>').appendTo($container);
  }
  _addToContainer($element) {
    const {
      $placeMarker,
      $container
    } = this;
    if ($placeMarker) {
      $placeMarker.replaceWith($element);
    } else {
      $element.appendTo($container);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  _attachEvents(instance, $element) {
    throw 'Not implemented';
  }
  // eslint-disable-next-line class-methods-use-this
  _create() {
    throw 'Not implemented';
  }
  _isRendered() {
    return !!this.instance;
  }
  _isVisible() {
    const {
      editor,
      options
    } = this;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return options.visible || !editor.option('readOnly');
  }
  // eslint-disable-next-line class-methods-use-this
  _isDisabled() {
    throw 'Not implemented';
  }
  _shouldRender() {
    return this._isVisible() && !this._isRendered();
  }
  dispose() {
    const {
      instance,
      $placeMarker
    } = this;
    if (instance) {
      // TODO: instance.dispose()
      if (instance.dispose) {
        instance.dispose();
      } else {
        // @ts-expect-error ts-error
        instance.remove();
      }
      this.instance = null;
    }
    $placeMarker === null || $placeMarker === void 0 || $placeMarker.remove();
  }
  render() {
    let $container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$container;
    this.$container = $container;
    if (this._isVisible()) {
      const {
        instance,
        $element
      } = this._create();
      // @ts-expect-error ts-error
      this.instance = instance;
      this._attachEvents(instance, $element);
    } else {
      this._addPlaceMarker($container);
    }
  }
  update() {
    if (this._shouldRender()) {
      this.render();
    }
    return !!this.instance;
  }
}