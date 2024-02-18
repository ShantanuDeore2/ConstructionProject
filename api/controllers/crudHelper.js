const MongoRepository = require("../dao/MongoDAO"); // Adjust the path as necessary
const createError = require("http-errors");
const logger = require("../../utils/logger");

const genericController = function (repository) {
  // decide if mongo or sql
  // const repository = new MongoRepository(Model);

  return {
    createSingleDocument: async (req, res, next) => {
      try {
        console.log(repository);
        const doc = await repository.create(req.body);
        logger.info(`Model ${doc} created`);
        res.status(201).json(doc);
      } catch (error) {
        logger.error("Error creating document", { error: error.message });
        next(createError(400, error.message));
      }
    },

    readAllDocuments: async (req, res, next) => {
      try {
        console.log(repository);
        const docs = await repository.findAll();
        res.status(200).json(docs);
      } catch (error) {
        logger.error("Error reading all documents", { error: error.message });
        next(createError(400, error.message));
      }
    },

    readSingleDocument: async (req, res, next) => {
      try {
        const doc = await repository.findById(req.params.id);
        if (!doc) {
          return next(createError(404, "Document not found"));
        }
        res.status(200).json(doc);
      } catch (error) {
        logger.error("Error reading document", { error: error.message });
        next(createError(400, error.message));
      }
    },

    updateSingleDocument: async (req, res, next) => {
      try {
        const doc = await repository.updateById(req.params.id, req.body);
        if (!doc) {
          return next(createError(404, "Document not found"));
        }
        res.status(200).json(doc);
      } catch (error) {
        logger.error("Error updating document", { error: error.message });
        next(createError(400, error.message));
      }
    },

    deleteSingleDocument: async (req, res, next) => {
      try {
        await repository.deleteById(req.params.id);
        res.status(204).send();
      } catch (error) {
        logger.error("Error deleting document", { error: error.message });
        next(createError(400, error.message));
      }
    },
  };
};

module.exports = genericController;
