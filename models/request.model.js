import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";
import LayerStyle from "./layerStyle.model";

const RequestSchema = new mongoose.Schema({
	requester_email_address: {
		type: String, 
		required: true
	},
	request: {
		type: String,
		required: true
	},
	request_type: {
		type: String,
		enum: ['MAP', 'LAYER'],
		required: true
	},
	request_reason: {
		type: String,
		required: true
	},
	request_approved: {
		type: Boolean,
		default: false
	}
})

RequestSchema.statics = {
	getAllApproved() {
		return this.find({request_approved: true})
		   .exec()
		   .then(layers => {
		     if (layers) {
		     	return layers;
		     }

		     const err = new APIError("An error occured when fetching data from the database");
		     return Promise.reject(err);
		   });
	},

	getAllNotApproved() {
		return this.find({request_approved: false})
		   .exec()
		   .then(layers => {
		     if (layers) {
		     	return layers;
		     }

		     const err = new APIError("An error occured when fetching data from the database");
		     return Promise.reject(err);
		   });
	}
}

export default mongoose.model("Request", RequestSchema);