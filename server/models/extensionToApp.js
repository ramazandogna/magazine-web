const mongoose = require('mongoose');

const extensionDataSchema = new mongoose.Schema({
   clickedElement: {
      type: Object,
      required: true,
   },
   elementInfos: {
      type: Array,
      required: true,
   },
   status: {
      type: String,
      required: true,
   },
});

const ExtensionModel = mongoose.model('ExtensionData', extensionDataSchema);

module.exports = ExtensionModel;
