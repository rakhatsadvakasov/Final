const DATA = [
    {
        question: 'In which year was the Kazakh Khanate formed?',
        answers: [
            {
                id: '1',
                value: '1465',
                correct: true,
            },
            {
                id: '2',
                value: '1565',
                correct: false,
            },
            {
                id: '3',
                value: '1478',
                correct: false,
            }
        ],
    },
    {
        question: 'Which of the Kazakh khans was the first to accept allegiance to the Russian Empire?',
        answers: [
            {
                id: '1',
                value: 'Zhanibek Khan',
                correct: false,
            },
            {
                id: '2',
                value: 'Abulkhair Khan',
                correct: true,
            },
            {
                id: '3',
                value: 'Abilay Khan',
                correct: false,
            }
        ],
    },
    {
        question: 'How many kazakhs died ?',
        answers: [
            {
                id: '1',
                value: '800,000',
                correct: false,
            },
            {
                id: '2',
                value: '600,000',
                correct: true,
            },
            {
                id: '3',
                value: '1,500,000',
                correct: false,
            }
        ],
    },
    {
        question: 'Who was the founder of "Nevada-Semey" movement?',
        answers: [
            {
                id: '1',
                value: 'Olzhas Suleymnenov',
                correct: true,
            },
            {
                id: '2',
                value: 'Mukhtar Auezov',
                correct: false,
            },
            {
                id: '3',
                value: 'Yevgeny Vuchetich',
                correct: false,
            }
        ],
    },
    {
        question: 'In which year Semipalatinsk Nuclear test was closed',
        answers: [
            {
                id: '1',
                value: '1989',
                correct: false,
            },
            {
                id: '2',
                value: '1991',
                correct: true,
            },
            {
                id: '3',
                value: '1992',
                correct: false,
            }
        ],
    },
    {
        question: 'In which dates December events was held?',
        answers: [
            {
                id: '1',
                value: '11-12 december 1986',
                correct: false,
            },
            {
                id: '2',
                value: '14-15 december 1986',
                correct: false,
            },
            {
                id: '3',
                value: '16-17 december 1986',
                correct: true,
            }
        ],
    },
    {
        question: 'Who was the first man launched into space?',
        answers: [
            {
                id: '1',
                value: 'Yuri Gagarin',
                correct: true,
            },
            {
                id: '2',
                value: 'Toktar Aubakirov',
                correct: true,
            },
            {
                id: '3',
                value: 'Neil Armstrong',
                correct: false,
            }
        ],
    },
    {
        question: 'In which date Yuri Gagarin was launched into space?',
        answers: [
            {
                id: '1',
                value: '12 december 1959',
                correct: false,
            },
            {
                id: '2',
                value: '8 April 1961',
                correct: false,
            },
            {
                id: '3',
                value: '12 April 1961',
                correct: true,
            }
        ],
    },
    {
        question: 'the Chairman (Prime Minister) of Provisional National Government of Alash Orda and one of the leaders of the Alash party:',
        answers: [
            {
                id: '1',
                value: 'Alikhan Bukeikhanov',
                correct: true,
            },
            {
                id: '2',
                value: 'Ahmet Baitursynuly',
                correct: false,
            },
            {
                id: '3',
                value: 'Gabit Musirepov',
                correct: false,
            }
        ],
    },
    {
        question: 'The founders of Kazakh Khanate',
        answers: [
            {
                id: '1',
                value: 'Zhanibek Kha and Kerey Khan',
                correct: true,
            },
            {
                id: '2',
                value: 'Abulkhair Khan and Ablai Khan',
                correct: false,
            },
            {
                id: '3',
                value: 'Ahmet Baitursynuly and Alikhan Bukeikhanov',
                correct: false,
            }
        ],
    },
];

let localResults = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

let index = 0;

const renderQuestions = () => {
    renderIndicator(index + 1);
    const currentQuestion = DATA[index];
    questions.innerHTML = `
        <div class="quiz-questions-item">
            <div class="quiz-questions-item__question">${currentQuestion.question}</div>
            <ul class="quiz-questions-item__answers">
                ${renderAnswers(currentQuestion.answers)}
            </ul>
        </div>
    `;
};

const renderAnswers = (answers) => {
    return answers
        .map(answer => `
            <li>
                <label>
                    <input class="answer-input" type="radio" name="${index}" value="${answer.id}">
                    ${answer.value}
                </label>
            </li>
        `)
        .join('');
};

const renderResults = () => {
    let content = '';

    DATA.forEach((question, questionIndex) => {
        content += `
            <div class="quiz-results-item">${question.question}</div> 
            <div class="quiz-results-item__question">
                <ul class="quiz-results-item__answers">
                    ${getAnswers(questionIndex)}
                </ul>
            </div>
        `;
    });

    results.innerHTML = content;
};

const getAnswers = (questionIndex) => {
    return DATA[questionIndex].answers
        .map(answer => `<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`)
        .join('');
};

const getClassname = (answer, questionIndex) => {
    let classname = '';

    if (!answer.correct && answer.id === localResults[questionIndex]) {
        classname = 'answer--invalid';
    } else if (answer.correct) {
        classname = 'answer--valid';
    }

    return classname;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-input')) {
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
});

quiz.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-next')) {
        index++;
        if (index === DATA.length) {
            showResults();
        } else {
            renderQuestions();
        }
        btnNext.disabled = true;
    }

    if (event.target.classList.contains('btn-restart')) {
        resetQuiz();
    }
});

const showResults = () => {
    questions.classList.add('questions--hidden');
    indicator.classList.add('indicator--hidden');
    results.classList.add('results--visible');
    btnNext.classList.add('btn-next--hidden');
    btnRestart.classList.add('btn-restart--visible');
    renderResults();
};

const resetQuiz = () => {
    localResults = {};
    results.innerHTML = '';
    questions.classList.remove('questions--hidden');
    indicator.classList.remove('indicator--hidden');
    results.classList.remove('results--visible');
    btnNext.classList.remove('btn-next--hidden');
    btnRestart.classList.remove('btn-restart--visible');
    index = 0;
    renderQuestions();
};

renderQuestions();
