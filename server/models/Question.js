const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain',
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    expectedKeywords: [String] // For simple keyword matching if AI fails
});

module.exports = mongoose.model('Question', questionSchema);
