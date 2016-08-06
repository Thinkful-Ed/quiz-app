$(document).ready(function() {
  var questionsList = [
    {
      text: "What is Modernizr used for?",
      choices: [
        "HTML5 support detection and browser feature detection",
        "Animating elements on a page",
        "Compressing or minifying HTML",
        "Linting JavaScript"
      ],
      correctChoiceIndex: 0
    },
    {
      text: "Which of the following are best practices for organizing HTML structure?",
      choices: [
        "Load JavaScript including libraries within the head tag",
        "Load JavaScript including libraries after the closing body tag",
        "Load JavaScript including libraries within an anchor tag",
        "Load JavaScript including libraries before the closing body tag using script tag, and it must be directly within body tag"
      ],
      correctChoiceIndex: 3
    },
    {
      text: "What is the proper way to retrieve text of an element. Consider this heading: <h2 class='title'>Text</h2>",
      choices: ["Use $('h2.title').text()", "Use $('h2.title').trim()", "Use $('h2.title').attr('class')", "Use $('h2.title').addClass('red')"],
      correctChoiceIndex: 0,
    },
    {
      text: "What do you need to do support ES6 and ES7 for your project?",
      choices: ["You can't. Just use ES5", "Transpile to ES5 using Babel", "Use Webpack", "Add a conditional statement for browsers that do not support it"],
      correctChoiceIndex: 1,
    },
    {
      text: "Which of the following is the best approach for finding an element?",
      choices: ["Use the class selector: var el = $('.element');", "Use the id selector: var el = $('#element');", "Find by class: var el = $('#parent').find('.element');", "Find by class: var parent = $('#parent'); var el = parent.find('.element');"],
      correctChoiceIndex: 3,
    },
  ];


  var quiz = {
    score: 0,
    questions: [],
    currentQuestionIndex: 0,

    currentQuestion: function() {
      return this.questions[this.currentQuestionIndex]
    },

    answerFeedbackHeader: function(isCorrect) {
      return isCorrect ? "<h6 class='user-was-correct'>Correct!</h6>" :
        "<h1 class='user-was-incorrect'>Wrong!</>";
    },

    answerFeedbackText: function(isCorrect) {
      var praises = [
        "Wow. You got it right. I bet you feel really good about yourself now",
        "Correct. Which would be impressive, if it wasn't just luck"
      ];

      var encouragements = [
        "Sorry, you didn't get that right. Try to read more.",
        "Better luck next time. Sure, you can get it if you try to be mindful.",
      ];

      var choices = isCorrect ? praises : encouragements;
      return choices[Math.floor(Math.random() * choices.length)];
    },

    seeNextText: function() {
      return this.currentQuestionIndex <
      this.questions.length - 1 ? "Next" : "How did I do?";
    },

    questionCountText: function() {
      return (this.currentQuestionIndex + 1) + "/" +
        this.questions.length + ": ";
    },

    finalFeedbackText: function() {
      return "You got " + this.score + " out of " +
        this.questions.length + " questions right.";
    },

    scoreUserAnswer: function(answer) {
      var correctChoice = this.currentQuestion().choices[this.currentQuestion().correctChoiceIndex];
      if (answer === correctChoice) {
        // this increments a number
        // Check README for a quick exercise
        this.score ++;
      }
      return answer === correctChoice;
    }
  }

  // create a new instance of quiz via Object.create
  function newQuiz() {
    var quizO = Object.create(quiz);
    quizO.questions = questionsList;
    return quizO;
  }

  function makeCurrentQuestionElem(quiz) {
    var questionElem = $("#js-question-template" ).children().clone();
    var question = quiz.currentQuestion();

    questionElem.find(".js-question-count").text(quiz.questionCountText());
    questionElem.find('.js-question-text').text(question.text);

    for (var i = 0; i < question.choices.length; i++) {
      var choice = question.choices[i];
      var choiceElem = $( "#js-choice-template" ).children().clone();
      choiceElem.find("input").attr("value", choice);
      var choiceId = "js-question-" + quiz.currentQuestionIndex + "-choice-" + i;
      choiceElem.find("input").attr("id", choiceId)
      choiceElem.find("label").text(choice);
      choiceElem.find("label").attr("for", choiceId);
      questionElem.find(".js-choices").append(choiceElem);
    };

    return questionElem;
  }

  function makeAnswerFeedbackElem(isCorrect, correctAnswer, quiz) {
    var feedbackElem = $("#js-answer-feedback-template").children().clone();
    feedbackElem.find(".js-feedback-header").html(quiz.answerFeedbackHeader(isCorrect));
    feedbackElem.find(".js-feedback-text").text(quiz.answerFeedbackText(isCorrect));
    feedbackElem.find(".js-see-next").text(quiz.seeNextText());
    return feedbackElem;
  }

  function makeFinalFeedbackElem(quiz) {
    var finalFeedbackElem = $("#js-final-feedback-template").clone();
    finalFeedbackElem.find(".js-results-text").text(quiz.finalFeedbackText());
    return finalFeedbackElem;
  }

  function handleSeeNext(quiz, currentQuestionElem) {
    $("article.quiz-details").on("click", ".js-see-next", function(event) {

      if (quiz.currentQuestionIndex < quiz.questions.length - 1) {
        $("article.quiz-details").off("click", ".js-see-next");
        quiz.currentQuestionIndex ++;
        $("article.quiz-details").html(makeCurrentQuestionElem(quiz));
      }
      else {
        $("article.quiz-details").html(makeFinalFeedbackElem(quiz))
      }
    });
  }

  function handleAnswers(quiz) {
    $("article.quiz-details").on("submit", "form[name='current-question']", function(event) {
      event.preventDefault();
      var answer = $("input[name='user-answer']:checked").val();
      quiz.scoreUserAnswer(answer);
      var question = quiz.currentQuestion();
      var correctAnswer = question.choices[question.correctChoiceIndex]
      var isCorrect = answer === correctAnswer;
      handleSeeNext(quiz);
      $("article.quiz-details").html(makeAnswerFeedbackElem(isCorrect, correctAnswer, quiz));
    });
  }

  // We can only use handleAnswers and handleRestarts when the quiz object has been created.
  // The submit event listener will create the quiz object then call other listeners.
  // On browser refresh, that object isn't saved and that's fine. If you want to remember states and objects, use localStorage
  // But we don't need that now.
  function handleStartQuiz() {
    $("article.quiz-details").html($("#js-start-template").clone());
    $("form[name='quiz-start']").submit(function(event) {
      var quiz = newQuiz();
      event.preventDefault();
      $("article.quiz-details").html(makeCurrentQuestionElem(quiz));
      handleAnswers(quiz);
      handleRestarts();
    });
  }

  // The .off() method removes event handlers that were attached with .on()
  // In this case, the listeners are handleAnswers(), handleSeeNext() and even handleRestarts()
  // handleStartQuiz will be called again to create the new quiz object and call functions with listeners
  // See how we called this once on load.
  function handleRestarts() {
    $("article.quiz-details").on("click", ".js-restart-quiz", function(event){
      event.preventDefault();
      $("article.quiz-details").off();
      handleStartQuiz();
    });
  }

  handleStartQuiz();
});
