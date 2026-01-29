const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain',
        required: true
    },
    questions: [{
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        questionText: String, // Store text in case Question is deleted/AI generated
        userAnswer: String,
        aiFeedback: String,
        score: Number
    }],
    totalScore: Number,
    completedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attempt', attemptSchema);
