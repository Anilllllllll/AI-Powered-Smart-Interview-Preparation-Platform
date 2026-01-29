const Domain = require('../models/Domain');
const Question = require('../models/Question');
const Attempt = require('../models/Attempt');
const aiService = require('../services/aiService');

exports.getDomains = async (req, res) => {
    try {
        const domains = await Domain.find();
        res.json(domains);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createDomain = async (req, res) => {
    try {
        const { name, description, imageUrl } = req.body;
        const newDomain = new Domain({ name, description, imageUrl });
        const domain = await newDomain.save();
        res.json(domain);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.startInterview = async (req, res) => {
    try {
        const { domainId, difficulty } = req.body;
        const domain = await Domain.findById(domainId);
        if (!domain) return res.status(404).json({ msg: 'Domain not found' });

        // Generate questions using AI
        const questionsText = await aiService.generateQuestions(domain.name, difficulty || 'medium');

        // Return questions to frontend (don't save yet, or save as temporary?)
        // Better: Return them, frontend sends answers one by one or all together.
        // Simplified: Return list of strings
        res.json({ questions: questionsText });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.submitAnswer = async (req, res) => {
    try {
        const { domainId, questionText, userAnswer } = req.body;

        // Evaluate answer
        const evaluation = await aiService.evaluateAnswer(questionText, userAnswer);

        // Save logic can be here or in a separate "finish interview" step
        // For now, return evaluation
        res.json({ evaluation });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.saveAttempt = async (req, res) => {
    try {
        const { domainId, questions } = req.body; // questions: [{questionText, userAnswer, evaluation}]

        let totalScore = 0;
        questions.forEach(q => totalScore += (q.evaluation.score || 0));

        const attempt = new Attempt({
            user: req.user.userId,
            domain: domainId,
            questions: questions.map(q => ({
                questionText: q.questionText,
                userAnswer: q.userAnswer,
                aiFeedback: JSON.stringify(q.evaluation),
                score: q.evaluation.score
            })),
            totalScore
        });

        await attempt.save();
        res.json(attempt);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
