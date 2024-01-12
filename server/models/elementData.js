const mongoose = require('mongoose');
const { Schema } = mongoose;

const elementDataSchema = new Schema(
   {
      html: String,
      css: String,
      image: {
         file: {
            type: Object,
            required: true,
         },
         base64Image: {
            type: String,
            required: true,
         },
         name: {
            type: String,
            required: true,
         },
      },
      user: {
         name: {
            type: String,
            required: true,
         },
         email: {
            type: String,
            required: true,
         },
         id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
         },
      },
   },
   { timestamps: true }
);

const ElementDataModel = mongoose.model('ElementData', elementDataSchema);

module.exports = ElementDataModel;
