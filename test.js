import test from 'ava';

import Singleton from './singleton';
import Employee, { 
  Fulltime, 
  Parttime, 
  Temporary, 
  Contractor 
} from './factory';

// singleton
const jelly = new Singleton('jelly');
const nina = new Singleton('nina');

test('singleton: two objects is the same', (t) => {
  t.true(jelly === nina);
});


// factory
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
