const createError = require("http-errors");
const logger = require("../../utils/logger");

const genericController = function (Model) {
  return {
    createSingleDocument: async (req, res, next) => {
      console.log(req.body);
      try {
        const doc = new Model(req.body);
        await doc.save();
        logger.info(`Model ${doc} created`);
        res.status(201).json(doc);
      } catch (error) {
        console.dir(error);
        logger.error("Error creating permission", { error: error.message });
        next(createError(400, error.message));
      }
    },

    readAllDocuments: async (req, res, next) => {
      try {
        const docs = await Model.find({});
        res.status(200).json(docs);
      } catch (error) {
        console.dir(error);
        logger.error(`Error reading all ${Model.modelName}`, {
          error: error.message,
        });
        next(createError(400, error.message));
      }
    },

    readSingleDocument: async (req, res, next) => {
      try {
        const doc = await Model.findById(req.params.id);
        if (!doc) {
          return next(createError(404, `${Model.modelName} not found`));
        }
        res.status(200).json(doc);
      } catch (error) {
        console.dir(error);
        logger.error(`Error reading ${Model.modelName}`, {
          error: error.message,
        });
        next(createError(400, error.message));
      }
    },

    updateSingleDocument: async (req, res, next) => {
      try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!doc) {
          return next(createError(404, `${Model.modelName} not found`));
        }
        res.status(200).json(doc);
      } catch (error) {
        console.dir(error);
        logger.error(`Error updating ${Model.modelName}`, {
          error: error.message,
        });
        next(createError(400, error.message));
      }
    },

    deleteSingleDocument: async (req, res, next) => {
      try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
          return next(createError(404, `${Model.modelName} not found`));
        }
        res.status(204).json(null);
      } catch (error) {
        console.dir(error);
        logger.error(`Error deleting ${Model.modelName}`, {
          error: error.message,
        });
        next(createError(400, error.message));
      }
    },
  };
};

module.exports = genericController;
