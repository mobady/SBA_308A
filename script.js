// Import necessary functions from other modules
import { fetchQuizQuestions, submitScore } from './api.js';
import { shuffleArray } from './utils.js';

// Grab references to HTML elements to manipulate them later
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const fetchQuizButton = document.getElementById('fetch-quiz-btn');
const categorySelect = document.getElementById('category-select');
const difficultySelect = document.getElementById('difficulty-select');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const submitScoreButton = document.getElementById('submit-score-btn');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Event listener for fetching quiz questions when the user clicks the button
fetchQuizButton.addEventListener('click', async () => {
    // Get the selected category and Difficulty
    const selectedCategory = categorySelect.value;
    const selectedDifficulty = difficultySelect.value;
    questions = await fetchQuizQuestions(selectedCategory,selectedDifficulty); // Fetch quiz questions based on the selected category and difficulty
    if (questions.length > 0) { // Check if there are questions available
        startQuiz();// Start the quiz if questions are available
    } else {
        alert('No questions available for this category. Please choose another category.');
    }
});


// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;// Reset the question index
    score = 0; // Reset the score
    nextButton.classList.add('hidden');
    scoreContainer.classList.add('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

// Function to display the current question and answer options
function showQuestion(question) {
    questionElement.innerHTML = question.question;
    answerButtonsElement.innerHTML = '';
    // Shuffle and display the answer options
    shuffleArray(question.answers).forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
    document.getElementById('question-container').classList.remove('hidden');
}

// Function to handle the user's answer selection
function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

// Function to display the user's score after completing the quiz
function showScore() {
    document.getElementById('question-container').classList.add('hidden');
    scoreElement.innerText = `${score} / ${questions.length}`;
    scoreContainer.classList.remove('hidden');
    submitScoreButton.classList.remove('hidden');
}
// Event listener for submitting the user's score
submitScoreButton.addEventListener('click', async () => {
    await submitScore(score);
    alert('Score submitted!');
    submitScoreButton.classList.add('hidden');
});
