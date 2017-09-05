const validator = {
  // 存储错误信息
  messages: [],
  types: {},
  config: {}
};

// 对字段配置验证规则
validator.config = {
  firstName: ['isNonEmpty'],
  age: ['isNumber'],
  username: ['isAlphaNum', 'isNonEmpty'],
};

// 设置验证规则
validator.types.isNonEmpty = {
  validate(value) {
    return value !== '';
  },
  message: 'the value cannot be empty',
};

validator.types.isNumber = {
  validate(value) {
    return !isNaN(value);
  },
  message: 'the value can only be a valid number',
};

validator.types.isAlphaNum = {
  validate(value) {
    return !/[^a-z0-9]/i.test(value);
  },
  message: 'the value can only contain characters and numbers',
};

// 对每个字段进行验证
validator.validate = function(data) {
  // 重置所有消息
  this.messages = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // 不需要验证
      if (!validator.config[key].length) {
        continue;
      }
      for(const type of validator.config[key]) {
        const checker = validator.types[type];
        if (!checker) {
          throw new Error(`No handler to validate type ${type}`);
        }
        const isValidate = checker.validate(data[key]);
        if (!isValidate) {
          this.messages.push(checker.message);
        }
      }
    }
  }

  if (this.hasErrors()) {
    return this.messages.join('\n');
  } else {
    return true;
  }
};

validator.hasErrors = function() {
  return this.messages.length !== 0;
};

export default validator;
