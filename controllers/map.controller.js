import Map from "../models/map.model";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";

function addMap(req, res, next) {
  const map = new Map({
    map_name: req.body.map_name,
    access_token: req.body.access_token,
    attribution: req.body.attribution,
    link: req.body.link
  });

  map
    .save()
    .then(savedMap => res.json(savedMap))
    .catch(error => next(error));
}

function getAllMaps(req, res, next) {
  Map.getAll()
    .then(maps => {
      return res.json(maps);
    })
    .catch(error => {
      next(error);
    });
}

function deleteMaps(req, res, next) {
  let id = req.body;

  Map.remove({ _id: id })
    .then(result => res.json(result))
    .catch(error => next(error));
}

/* add edit function here */

export default {
  addMap,
  getAllMaps,
  deleteMaps
};
