const mongoose = require('mongoose');
const { Schema } = mongoose;

const elementDataSchema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   html: String,
   css: String,
   image: {
      data: Buffer,
      contentType: String,
   },
});

const ElementDataModel = mongoose.model('ElementData', elementDataSchema);

module.exports = ElementDataModel;
