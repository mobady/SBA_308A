// Function to fetch quiz questions based on the selected category anbd difficulty
export async function fetchQuizQuestions(category,difficulty) {
    const apiKey = 'ZOtPOwWibu5yNljbCsprqbPlqv9F8qt2FINfQWz5';  // Replace with your API key
    const url = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=5&category=${category}&difficulty=${difficulty}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (!Array.isArray(data)) {
            throw new Error("Expected an array of questions, but got something else.");
        }

        return data.map(formatQuestion);
    } catch (error) {
        console.error('Failed to fetch quiz questions:', error);
        return []; // Return an empty array or handle the error as needed
    }
}

// Function to submit the user's score to a mock API
export async function submitScore(score) {
    const url = `https://jsonplaceholder.typicode.com/posts`;  // Mock endpoint for testing
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Function to format the API response into a usable format for the quiz
function formatQuestion(questionData) {
    return {
        question: questionData.question,
        answers: [
            { text: questionData.answers.answer_a, correct: questionData.correct_answers.answer_a_correct === 'true' },
            { text: questionData.answers.answer_b, correct: questionData.correct_answers.answer_b_correct === 'true' },
            { text: questionData.answers.answer_c, correct: questionData.correct_answers.answer_c_correct === 'true' },
            { text: questionData.answers.answer_d, correct: questionData.correct_answers.answer_d_correct === 'true' }
        ].filter(answer => answer.text != null) // Filter out any null answers
    };
}
