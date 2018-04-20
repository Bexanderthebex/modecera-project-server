import Layer from "../models/layer.model";
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
    layer_type: req.body.layer_type,
    bucket: req.body.bucket,
    name: req.body.name,
    link: req.body.link
  });

  layer
    .save()
    .then(savedLayer => res.json(savedLayer))
    .catch(error => next(error));
}

function removeLayer(req, res, next) {
  Layer.remove({ _id: req.body._id })
    .then(result => res.json(result))
    .catch(error => next(error));
}

function editLayer(req, res, next) {}

function getAllLayer(req, res, next) {
  Layer.getAll()
    .then(layers => res.json(layers))
    .catch(error => next(err));
}

/* google cloud platform controllers */
function uploadLayer(req, res, next) {
  storage
    .bucket("modecera-geojson-files")
    .upload("../Aborlan.geojson")
    .then(() => {
      console.log("success");
    })
    .catch(err => {
      next(err);
    });
}

function deleteLayer(req, res, next) {}

export default { addLayer, getAllLayer, removeLayer, uploadLayer };
