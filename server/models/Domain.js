const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    imageUrl: String
});

module.exports = mongoose.model('Domain', domainSchema);
