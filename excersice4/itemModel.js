const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
});

itemSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;