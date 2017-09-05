class Employee {
  static create(type) {
    if (!Employee.registeredTypes.has(type)) {
      throw new Error(`${type} doesn't exist.`);
    }
    const Constructor = Employee.registeredTypes.get(type);
    return new Constructor();
  }

  static registerType(Type, definition) {
    Employee.registeredTypes.set(Type, definition);
  }

  description() {
    return `${this.type} rates ${this.hourly}/hour`;
  }
}
Employee.registeredTypes = new Map();

export class Fulltime extends Employee {
  constructor() {
    super();
    this.type = 'Fulltime';
    this.hourly = 12;
  }
}
class Parttime extends Employee {
  constructor() {
    super();
    this.type = 'Parttime';
    this.hourly = 11;
  }
}

class Temporary extends Employee {
  constructor() {
    super();
    this.type = 'Temporary';
    this.hourly = 10;
  }
}

class Contractor extends Employee {
  constructor() {
    super();
    this.type = 'Contractor';
    this.hourly = 15;
  }
}

Employee.registerType('fulltime', Fulltime);
Employee.registerType('partime', Parttime);
Employee.registerType('temporary', Temporary);
Employee.registerType('contractor', Contractor);

export default Employee;
