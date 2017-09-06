// Publisher
const publisher = {
  subscribers: {
    any: [],
  },
  subscribe(fn, type = 'any') {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },
  publish(publication, type) {
    this.visitSubscribers('publish', publication, type);
  },
  unsubscribe(fn, type) {
    this.visitSubscribers('unsubscribe', fn, type);
  },
  visitSubscribers(action, arg, type = 'any') {
    if (action === 'publish') {
      for(const handler of this.subscribers[type]) {
        handler(arg);
      }
    }
    if (action === 'unsubscribe') {
      for(const [index, hander] of this.subscribers[type].entries()) {
        if (hander === arg) {
          this.subscribers[type].splice(index, 1);
          break;
        }
      }
    }
  },
};

function makePubliser(obj) {
  Object.keys(publisher).forEach((key) => {
    if (typeof publisher[key] === 'function') {
      obj[key] = publisher[key];
    }
  });
  obj.subscribers = { any: [] };
}

export default makePubliser;
