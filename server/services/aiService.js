const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.generateQuestions = async (domain, difficulty) => {
    try {
        const prompt = `Generate 5 interview questions for the domain '${domain}' with difficulty '${difficulty}'. Format as a JSON array of strings.`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        // Parse JSON safely
        try {
            return JSON.parse(content);
        } catch (e) {
            // Fallback if AI returns non-JSON
            return content.split('\n').filter(q => q.trim().length > 0);
        }
    } catch (error) {
        console.error("AI Generation Error:", error);
        return ["Describe the core concepts of this domain.", "What are the common pitfalls?", "Explain a challenging problem you solved.", "How does this technology scale?", "What are the latest trends in this field?"]; // Fallback
    }
};

exports.evaluateAnswer = async (question, answer) => {
    try {
        const prompt = `Evaluate the following interview answer.
        Question: "${question}"
        Answer: "${answer}"
        
        Provide:
        1. Score (0-10)
        2. Strengths
        3. Areas for Improvement
        
        Format as JSON: { "score": number, "strengths": "string", "improvements": "string" }`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        });

        const content = response.choices[0].message.content;
        return JSON.parse(content);
    } catch (error) {
        console.error("AI Evaluation Error:", error);
        return {
            score: 0,
            strengths: "Unable to evaluate at this time.",
            improvements: "Please try again later."
        };
    }
};
