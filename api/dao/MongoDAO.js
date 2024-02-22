// MongoRepository.js
const DAO = require("./DAO");

module.exports = class MongoDAO extends DAO {
  constructor(model) {
    super();
    this.model = model;
  }

  async create(document) {
    return this.model.create(document);
  }

  async findAll(query = {}) {
    return this.model.find(query);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findByQueryCriteria(criteria) {
    return this.model.findOne(criteria);
  }

  async updateById(id, update, options = { new: true, runValidators: true }) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }
};
