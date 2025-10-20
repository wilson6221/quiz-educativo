const questions = [
    {
        question: "¿Cuál es la capital constitucional de Bolivia?",
        options: ["La Paz", "Sucre", "Santa Cruz", "Cochabamba"],
        correct: 1
    },
    {
        question: "¿En qué año Bolivia obtuvo su independencia?",
        options: ["1809", "1825", "1830", "1815"],
        correct: 1
    },
    {
        question: "¿Cuál es el lago navegable más alto del mundo?",
        options: ["Lago Poopó", "Lago Titicaca", "Laguna Colorada", "Lago Uru Uru"],
        correct: 1
    },
    {
        question: "¿Cuántos departamentos tiene Bolivia?",
        options: ["7", "8", "9", "10"],
        correct: 2
    },
    {
        question: "¿Qué animal es símbolo nacional de Bolivia?",
        options: ["Llama", "Cóndor", "Vicuña", "Jaguar"],
        correct: 1
    },
    {
        question: "¿Cuál es la danza tradicional más famosa de Bolivia?",
        options: ["Cueca", "Morenada", "Caporales", "Diablada"],
        correct: 3
    },
    {
        question: "¿Dónde se encuentra el Salar de Uyuni?",
        options: ["Oruro", "Potosí", "La Paz", "Tarija"],
        correct: 1
    },
    {
        question: "¿Cuál es la montaña más alta de Bolivia?",
        options: ["Illimani", "Huayna Potosí", "Sajama", "Illampu"],
        correct: 2
    },
    {
        question: "¿Qué idioma NO es oficial en Bolivia?",
        options: ["Español", "Quechua", "Aymara", "Inglés"],
        correct: 3
    },
    {
        question: "¿En qué ciudad se encuentra la Puerta del Sol?",
        options: ["La Paz", "Sucre", "Tiahuanaco", "Copacabana"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function startQuiz() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizContainer').classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('current').textContent = currentQuestion + 1;
    document.getElementById('total').textContent = questions.length;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = option;
        div.onclick = () => selectOption(index);
        optionsContainer.appendChild(div);
    });

    selectedOption = null;
    document.getElementById('checkBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('checkBtn').disabled = true;
}

function selectOption(index) {
    if (document.getElementById('checkBtn').style.display === 'none') return;
    
    selectedOption = index;
    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === index) {
            opt.classList.add('selected');
        }
    });
    document.getElementById('checkBtn').disabled = false;
}

function checkAnswer() {
    if (selectedOption === null) return;
    
    const options = document.querySelectorAll('.option');
    const correctAnswer = questions[currentQuestion].correct;
    
    if (selectedOption === correctAnswer) {
        options[selectedOption].classList.add('correct');
        score++;
    } else {
        options[selectedOption].classList.add('incorrect');
        options[correctAnswer].classList.add('correct');
    }
    
    document.getElementById('checkBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quizContainer').classList.remove('active');
    document.getElementById('result').classList.add('active');
    
    const percentage = (score / questions.length) * 100;
    document.getElementById('scoreDisplay').textContent = score + ' / ' + questions.length;
    
    let message = '';
    if (percentage === 100) {
        message = '¡Perfecto! Eres un experto en Bolivia 🌟';
    } else if (percentage >= 70) {
        message = '¡Muy bien! Conoces bastante sobre Bolivia 👏';
    } else if (percentage >= 50) {
        message = '¡Buen intento! Sigue aprendiendo sobre Bolivia 📚';
    } else {
        message = '¡Ánimo! Aprende más sobre Bolivia e inténtalo de nuevo 💪';
    }
    
    document.getElementById('message').textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    document.getElementById('result').classList.remove('active');
    document.getElementById('startScreen').style.display = 'block';
}