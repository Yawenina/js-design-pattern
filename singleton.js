// TODO: 通过 ES6 Classes 实现

let Singleton;
(function(name) {
  let instance;
  Singleton = function(name) {
    if (instance) return instance;
    instance = this;
    this.name = name;
  }
}());

export default Singleton;
