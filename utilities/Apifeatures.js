const Tour = require('../models/tourModel');

class Apifeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryStr = queryString;
  }

  filter() {
    const queryobj = { ...this.queryString };
    const excluded = ['page', 'sort', 'limit', 'fields'];
    excluded.forEach((el) => delete queryobj[el]);

    //advance filter
    let queryStr = JSON.stringify(queryobj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(queryStr);
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join('');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('--createdAt');
    }
    return this;
  }

  limitingFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join('');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    const page = this.queryString * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
  }
}
module.exports = Apifeatures;
