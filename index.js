let questionNumber = 0;
let score = 0;

//generate proper question
function generateQuestion() {
	if (questionNumber < STORE.length) {
		return `<div class="question-${questionNumber}">
		<h2>${STORE[questionNumber].question}</h2>
		<form>
		<fieldset>
		<label class="answerOption">
		<input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
		<span>${STORE[questionNumber].answers[0]}</span>
		</label><br>
		<label class="answerOption">
		<input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
		<span>${STORE[questionNumber].answers[1]}</span>
		</label><br>
		<label class="answerOption">
		<input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
		<span>${STORE[questionNumber].answers[2]}</span>
		</label><br>
		<label class="answerOption">
		<input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
		<span>${STORE[questionNumber].answers[3]}</span>
		</label><br>
		<button type="submit" class="submitButton">Submit</button>
		</fieldset>
		</form>
		</div>`;
	} else {
		renderResults();
		restartQuiz();
		$('.questionNumber').text(10)
	}
}


//increment question counter
function changeQuestionNumber() {
	questionNumber++;
	$('.questionNumber').text(questionNumber+1);
}

//increment score
function changeScore() {
	score++;
}

//start quiz
function startQuiz() {
	$('.quizStart').on('click', '.startButton', function (event) {
		$('.quizStart').remove();
		$('.credit').remove();
		$('.questionAnswerForm').css('display', 'block');
		$('.questionNumber').text(1);
	});
}

//render question in DOM
function renderQuestion() {
	$('.questionAnswerForm').html(generateQuestion());
}


//user answer question
function userSelectAnswer() {
	$('form').on('submit', function (event) {
		event.preventDefault();
		let selected = $('input:checked');
		let answer = selected.val();
		let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
		if (answer === correctAnswer) {
			selected.parent().addClass('correct');
			ifAnswerIsCorrect();
		}
		else {
			selected.parent().addClass('wrong');
			ifAnswerIsWrong();
		}
	});
}

//user answers correctly
function ifAnswerIsCorrect() {
	userAnswerFeedbackCorrect();
	updateScore();
}

//user answers wrongly
function ifAnswerIsWrong() {
	userAnswerFeedbackWrong();
}

//manipulate DOM for correct answer feedback
function userAnswerFeedbackCorrect() {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
	$('.questionAnswerForm').html(`
		<div class="correctFeedback">
			<p><b>Correct! 10 points to Gryffindor!</b></p>
			<button type="button" class="nextButton">Next</button>
		</div>`);
}

//manipulate DOM for wrong answer feedback
function userAnswerFeedbackWrong() {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
	$('.questionAnswerForm').html(`
		<div class="correctFeedback">
			<p><b>So sorry... That is incorrect. The correct answer is <span>"${correctAnswer}"</span></b></p>
			<button type="button" class="nextButton">Next</button>
		</div>`);
}


//update score counter
function updateScore() {
	changeScore();
	$('.score').text(score);
}

//end of quiz give feedback based on results
function renderResults() {
	if (score >= 7) {
		$('.questionAnswerForm').html(`
			<div class="results correctFeedback">
				<h3>Nice work!</h3>
				<p>You got ${score} / 10</p>
				<p>Congrats! You passed all of your O.W.L.s</p>
				<button class="restartButton">Restart Quiz</button>
			</div>`);
	} else if (score < 7) {
		$('.questionAnswerForm').html(`
			<div class="results correctFeedback">
				<h3>It's not great...</h3>
				<p>You got ${score} / 10</p>
				<button class="restartButton">Restart Quiz</button>
			</div>`);

	}
}

//renders next question when prompted
function renderNextQuestion() {
	$('main').on('click', '.nextButton', function (event) {
		changeQuestionNumber();
		renderQuestion();
		userSelectAnswer();
	});
}

//restarts quiz when restart button is pressed
function restartQuiz() {
	$('main').on('click', '.restartButton', function (event) {
		location.reload();
	});
}

//run all functions and event listeners to make quiz operational
function createQuiz() {
	startQuiz();
	renderQuestion();
	userSelectAnswer();
	renderNextQuestion();
}

$(createQuiz);