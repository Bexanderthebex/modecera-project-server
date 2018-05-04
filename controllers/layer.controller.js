import Layer from "../models/layer.model";
import layerStyle from "../models/layerStyle.model";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";
import Storage from "@google-cloud/storage";

const storage = new Storage({
  keyFilename:
    "/home/bexanderthebex/Desktop/modecera-project-server/My First Project-1bda95a6c4b5.json"
});

/* data persistence controllers */
function addLayer(req, res, next) {

  const layer = new Layer({
    bucket: "modecera-geojson-files",
    label_group: req.body.label_group,
    name: req.file.originalname,
    style: new layerStyle({})
  });

  layer
    .save()
    .then(savedLayer => next())
    .catch(error => {
      return next(
        new APIError(
          "Layer already exists",
          httpStatus.BAD_REQUEST
        )
      );
    });
}

// TODO: fix error code passing
function removeLayer(req, res, next) {
  Layer.remove({ _id: req.body })
    .then(result => res.json(result))
    .catch(error => next(error));
}

// TODO: fix error code passing
function getAllLayers(req, res, next) {
  Layer.getAll()
    .then(layers => res.status(200).json(layers))
    .catch(error => next(err));
}

function getLayerByLabelGroup(req, res) {
	Layer.find({label_group: req.body.label_group})
		.then(result => res.status(200).json(result))
		.catch(error => next(error))
}

/* google cloud platform controllers */
function uploadLayer(req, res, next) {
  if (!req.file) {
    return next(
      new APIError("File to be uploaded is required", httpStatus.BAD_REQUEST)
    );
  }
  
  const stream = storage
    .bucket("modecera-geojson-files")
    .file(req.file.originalname)
    .createWriteStream({
      public: true,
      metadata: {
        contentType: req.file.mimetype
      }
    });

  stream.on("error", err => {
    req.file.cloudStorageError = err;
    return next(err);
  });

  stream.on("finish", () => {
    return res.status(204).json({"message": "sucess", "code": 204});
  });

  stream.end(req.file.buffer);
}

function deleteLayer(req, res, next) {
  let files = req.body.map(map => {
    return { name: map["name"]};
  });


  files.forEach(filename => {
    console.log(filename.name);
    storage
      .bucket("modecera-geojson-files")
      .file(filename.name)
      .delete()
      .catch(err => {
        next(new APIError(err.message, httpStatus.NOT_FOUND));
      });
  });
  next();
}

export default {
  addLayer,
  getAllLayers,
  removeLayer,
  uploadLayer,
  deleteLayer,
  getLayerByLabelGroup
};
