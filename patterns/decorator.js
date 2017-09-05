class Sale {
  constructor(price) {
    this.price = price || 100;
    this.decoratorsList = [];
  }
}

Sale.prototype.decorate = function(decorator) {
  if (!Sale.decorators[decorator]) {
    throw new Error('${decorator} does\'t exist');
  }
  this.decoratorsList.push(decorator);
};

Sale.prototype.getPrice = function() {
  let price = this.price;
  for (const decorator of this.decoratorsList) {
    const decoratorFn = Sale.decorators[decorator].getPrice;
    if (!decoratorFn || typeof decoratorFn !== 'function') {
      throw new Error(`${decorator} doesn't have getPrice menthod`);
    }
    price = decoratorFn(price);
  }
  return price;
};

Sale.decorators = {};
Sale.decorators.fedtax = {
  getPrice(price) {
    return price * (1 + 0.05);
  },
};

Sale.decorators.quebec = {
  getPrice(price) {
    return price * (1 + 0.075);
  },
};

Sale.decorators.money = {
  getPrice(price) {
    return `$${price.toFixed(2)}`;
  },
};

Sale.decorators.duty = {

};

export default Sale;
