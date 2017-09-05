class Iterator {
  constructor(items) {
    this.keys = Object.keys(items);
    this.index = 0;
    this.items = items;
    this.length = this.keys.length;
  }
  get done() {
    return this.index > this.length;
  }
}

Iterator.prototype = {
  next() {
    if (this.done) {
      return;
    }
    const element = this.items[this.keys[this.index]];
    this.index += 1;
    return element;
  },
  rewind() {
    this.index = 0;
  },
  current() {
    return this.items[this.keys[this.index]];
  },
};

export default Iterator;
