import Request from "../models/request.model";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";

function addRequest(req, res, next) {
  const user_request = new Request({
    requester_email_address: req.body.email,
    request: req.body.request,
    request_type: req.body.request_type,
    request_reason: req.body.request_reason
  });

  user_request
    .save()
    .then(savedRequest =>
      res.status(200).json({ message: "request successfully saved" })
    )
    .catch(error => {
      return next(
        new APIError(
          "An error occured when saving to the database",
          httpStatus.INTERNAL_SERVER_ERROR
        )
      );
    });
}

function getAllRequests(req, res, next) {
  Request
    .find()
    .then(requests => res.status(200).json(requests))
    .catch(error => {
      return next(
          new APIError(
            "An error occured when fetching from the database"
          )
        )
    });
}

function approveRequest(req, res, next) {
  console.log(req.body);

  Request
    .findOneAndUpdate({_id: req.body._id}, {$set: {request_approved: true}}, {new: true})
    .then(approvedRequest => res.status(200).json(approvedRequest))
    .catch(error => {
      return next(
          new APIError(
            "Internal Server Error"
          )
        )
    })
}

export default {
  addRequest,
  getAllRequests,
  approveRequest
};
