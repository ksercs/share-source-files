/**
* DevExtreme (esm/renovation/ui/scheduler/utils/semaphore/semaphore.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export class Semaphore {
  constructor() {
    this.counter = 0;
  }
  isFree() {
    return this.counter === 0;
  }
  take() {
    this.counter += 1;
  }
  release() {
    this.counter -= 1;
    if (this.counter < 0) {
      this.counter = 0;
    }
  }
}
