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

