import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Interview = () => {
    const { domainId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState(null);
    const [answersHistory, setAnswersHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const startSession = async () => {
            try {
                // Mock questions if backend not fully ready or AI key missing
                // const res = await api.post('/interview/start', { domainId, difficulty: 'medium' });
                // setQuestions(res.data.questions);

                // MOCK
                setTimeout(() => {
                    setQuestions([
                        "What is the difference between var, let, and const in JavaScript?",
                        "Explain the concept of Virtual DOM in React.",
                        "How does Node.js handle asynchronous operations?"
                    ]);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        startSession();
    }, [domainId]);

    const handleSubmitAnswer = async () => {
        setLoading(true);
        try {
            // Mock AI Evaluation
            // const res = await api.post('/interview/answer', { 
            //    questionText: questions[currentQuestionIndex], 
            //    userAnswer: answer 
            // });
            // const aiEval = res.data.evaluation;

            // Mock Response
            const aiEval = {
                score: Math.floor(Math.random() * 4) + 6, // 6-10
                strengths: "Good use of technical terms. Clear explanation.",
                improvements: "Could mention hoisting or temporal dead zone for more depth."
            };

            setFeedback(aiEval);
            setAnswersHistory([...answersHistory, {
                question: questions[currentQuestionIndex],
                answer,
                feedback: aiEval
            }]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setFeedback(null);
        setAnswer('');
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Finish Interview
            alert("Interview Completed! Check functionality coming soon.");
            navigate('/dashboard');
        }
    };

    if (loading && questions.length === 0) return <div className="p-8 text-center">Preparing Interface...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500 text-sm">Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">AI Powered</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">{questions[currentQuestionIndex]}</h2>

                {!feedback ? (
                    <>
                        <textarea
                            className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                            placeholder="Type your answer here..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleSubmitAnswer}
                                disabled={!answer.trim() || loading}
                                className={`px-6 py-2 rounded-lg text-white font-medium ${!answer.trim() || loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {loading ? 'Evaluating...' : 'Submit Answer'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="font-semibold text-gray-700 mb-2">Your Answer:</h3>
                            <p className="text-gray-600 italic">"{answer}"</p>
                        </div>

                        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-4xl font-bold text-indigo-600">{feedback.score}/10</div>
                                <div>
                                    <h3 className="font-bold text-gray-800">AI Feedback</h3>
                                    <p className="text-sm text-gray-500">Analysis complete</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-green-700 text-sm">Strengths</h4>
                                    <p className="text-sm text-gray-600 mt-1">{feedback.strengths}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-amber-700 text-sm">Improvements</h4>
                                    <p className="text-sm text-gray-600 mt-1">{feedback.improvements}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                            >
                                {currentQuestionIndex + 1 === questions.length ? 'Finish Interview' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Interview;
