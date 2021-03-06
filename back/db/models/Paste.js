const mongoose = require('mongoose');

const PasteSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Paste', PasteSchema);
