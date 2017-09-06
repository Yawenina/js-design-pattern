# js-design-pattern

关于 JavaScript 各种设计模式的实现

## 单例模式(Singleton)
应用场景：某个类的实例只有一个；
实现：
  - 每个对象都是一个单例
  - 通过**闭包** + **立即执行函数**实现

## 工厂模式(Factory)
应用场景： 创建相似的类；
实现：
  - 提供创建相似类的公共方法，比如： factory/create
  - 通过 ES6 的 extends 实现

## 迭代器模式(Iterator)
应用场景：访问数据结构中的每个元素；
实现：
  - 提供`next()`, `done`，`rewind()`, `current()`等方法和属性
  - ES6中的数组、字符串、`Arguments`, `DOM Elements` 等已配置迭代器

## 装饰者模式(Decorator)
应用场景：运行过程中动态添加功能；
实现：
  - `decoratorsList`字段记录装饰者；
  - `decorate` 方法向 `decoratorsList`字段追加装饰者；
  - `decorators`字段记录每个追加功能的实现；
  - 调用某个方法的时候，遍历`decoratorsList`字段

## 策略模式(strategy)
应用场景：在运行时选择算法。常用于表单验证中。
实现：
  - 由`validator`来制定相应的策略；
  - 该对象包含`config`, `types`字段对算法进行配置；
  - `validate`, `hasErrors`提供对外接口

## 外观模式(facade)
应用场景：将几个常在一块使用的方法包裹在一起；
实现：
  - 比如将`e.preventDefault()`, `e.stopPropagation()`包裹在`stop()`这个方法中

## 代理模式(Proxy)
应用场景：初始化本体对象的开销非常大，操作都保存在代理对象上，直到真正需要用到本体对象的时候在初始化本体对象；
实现：
  - 创建一个代理对象，代理对本体对象的操作；
  - 常用的 `debounce`, `throttle` 就是这种类似的操作；
  - 将一段时间的 HTTP 请求合并成一个也是；
  - 缓存相应的数据；

## 中介者模式(Mediator)
应用场景：解决多个对象通信造成的紧耦合，通过 Mediator 处理转发通信，促成松耦合，提高维护性
实现：
  - 中介者提供 `register` 接口记录每个通信对象，`played`接口提供给每个对象通信时调用的接口

## 观察者模式(Observer)
应用场景：一个对象通过订阅另一个对象的事件，形成松散耦合
实现:
  - 发布者提供`subscribe`方法帮助订阅者订阅事件；
  - `subscribers` 记录每个事件的订阅者；
  - `publish` 方法发布事件；
  - `unsubscribe` 取消订阅;
  - `visitSubscribers` 查看所有订阅者