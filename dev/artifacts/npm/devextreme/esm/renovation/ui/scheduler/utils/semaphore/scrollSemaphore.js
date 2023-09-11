/**
* DevExtreme (esm/renovation/ui/scheduler/utils/semaphore/scrollSemaphore.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Semaphore } from './semaphore';
export class ScrollSemaphore {
  constructor() {
    this.semaphore = new Semaphore();
    this.position = {
      left: -1,
      top: -1
    };
  }
  isFree(position) {
    if (this.isInitialPosition()) {
      this.setPosition(position);
      return this.semaphore.isFree();
    }
    return this.semaphore.isFree() && !this.comparePosition(position);
  }
  take(position) {
    this.semaphore.take();
    this.setPosition(position);
  }
  release() {
    this.semaphore.release();
  }
  setPosition(source) {
    var _source$left, _source$top;
    this.position.left = (_source$left = source.left) !== null && _source$left !== void 0 ? _source$left : -1;
    this.position.top = (_source$top = source.top) !== null && _source$top !== void 0 ? _source$top : -1;
  }
  isInitialPosition() {
    return this.position.left === -1 && this.position.top === -1;
  }
  comparePosition(target) {
    var _target$left, _target$top;
    var left = (_target$left = target.left) !== null && _target$left !== void 0 ? _target$left : -1;
    var top = (_target$top = target.top) !== null && _target$top !== void 0 ? _target$top : -1;
    return this.position.left === left && this.position.top === top;
  }
}
