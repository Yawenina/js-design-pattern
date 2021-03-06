import test from 'ava';

import Singleton from './patterns/singleton';
import Employee from './patterns/factory';
import Iterator from './patterns/iterator';
import Sale from './patterns/decorator';
import validator from './patterns/strategy';
import { Participant, chatroom } from './patterns/mediator';
import makePubliser from './patterns/observer';

// Singleton
const jelly = new Singleton('jelly');
const nina = new Singleton('nina');

test('singleton: two objects is the same', (t) => {
  t.true(jelly === nina);
});


// Factory
const fulltime = Employee.create('fulltime');
const parttime = Employee.create('partime');
const temporary = Employee.create('temporary');
const contractor = Employee.create('contractor');
// test error
test('factory: throw error if type doesn\'t exist', (t) => {
  t.throws(() => {
    Employee.create('notype');
  });
});
// test prototype method
test('factory: fulltime', (t) => {
  t.is(fulltime.description(), 'Fulltime rates 12/hour');
  t.true(fulltime instanceof Employee);
});
test('factory: parttime', (t) => {
  t.is(parttime.description(), 'Parttime rates 11/hour');
});
test('factory: temporary', (t) => {
  t.is(temporary.description(), 'Temporary rates 10/hour');
});
test('factory: contractor', (t) => {
  t.is(contractor.description(), 'Contractor rates 15/hour');
});

// Iterator
const strIterator = new Iterator('hello');
const arrIterator = new Iterator([1, 2, 3]);
const objIterator = new Iterator({ name: 'JavaScript', birthYear: 1995 });

test('iterator: string', (t) => {
  t.is(strIterator.next(), 'h');
  t.is(strIterator.next(), 'e');
  t.is(strIterator.next(), 'l');
  t.is(strIterator.next(), 'l');
  t.is(strIterator.next(), 'o');
  t.is(strIterator.next(), undefined);
  // t.true(strIterator.done);
  strIterator.rewind();
  t.is(strIterator.current(), 'h');
});

test('iterator: arr', (t) => {
  t.is(arrIterator.next(), 1);
  t.is(arrIterator.next(), 2);
  t.is(arrIterator.next(), 3);
  t.is(arrIterator.next(), undefined);
  // t.true(arrIterator.done);
  arrIterator.rewind();
  t.is(arrIterator.current(), 1);
});

test('iterator: obj', (t) => {
  t.is(objIterator.next(), 'JavaScript');
  t.is(objIterator.next(), 1995);
  t.is(objIterator.next(), undefined);
  // t.true(objIterator.done);
  objIterator.rewind();
  t.is(objIterator.current(), 'JavaScript');
});

// Decorator
const sale = new Sale();
test('decorator: get correct price', (t) => {
  sale.decorate('fedtax');
  sale.decorate('quebec');
  sale.decorate('money');
  t.is(sale.getPrice(), '$112.88');
});

test('decorator: throw error if decorator not exist', (t) => {
  t.throws(() => {
    sale.decorate('luxury');
  });
});

test('decorator: throw error if decorator method not exist', (t) => {
  sale.decorate('duty');
  t.throws(() => {
    sale.getPrice();
  });
});

// Strategy
const foo = {
  firstName: 'foo',
  age: 22,
  username: 'Lily0901',
};

const bar = {
  firstName: 'baz',
  age: 23,
  username: 'baz_foo><',
};

const baz = {
  firstName: '',
  age: 'ten',
  username: '',
};

test('statrgy: pass validator', (t) => {
  t.true(validator.validate(foo));
});

test('strategy: fail isAlphaNum in username', (t) => {
  t.is(validator.validate(bar), 'the value can only contain characters and numbers');
});

test('startegy: fail all validations', (t) => {
  t.is(validator.validate(baz), 'the value cannot be empty\nthe value can only be a valid number\nthe value cannot be empty');
});


// Mediator
const Lily = new Participant('Lily');
const Jelly = new Participant('Jelly');
chatroom.register(Lily);
chatroom.register(Jelly);
test('mediator: Jelly recieve greet from Lily', (t) => {
  Lily.send('Hello Jelly!', Jelly);
  t.is(Jelly.messages[0], 'Lily to Jelly: Hello Jelly!');
});
test('mediator: Lily recieve greet from Jelly', (t) => {
  Jelly.send('Hello Lily!', Lily);
  t.is(Lily.messages[0], 'Jelly to Lily: Hello Lily!');
});
test('mediator: Lily recieve greet from Jelly', (t) => {
  Jelly.send('Hello Guys!');
  t.is(Lily.messages[1], 'Jelly to Lily: Hello Guys!');
});

// Observer
// TODO: implement tests

// make a paper oberserver
const paper = {
  daily() {
    this.publish('big news today');
  },
  monthly() {
    this.publish('interesting analysis', 'monthly');
  },
};
makePubliser(paper);

// make a oberserver
const Nina = {
  drinkCoffee(paper) {
    console.log(`just read ${paper}`);
  },
  sundayPreNap(monthly) {
    console.log(`About to fall asleep reading this ${monthly}`);
  },
};

paper.subscribe(Nina.drinkCoffee);
paper.subscribe(Nina.sundayPreNap, 'monthly');
