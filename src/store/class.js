class Question {
    constructor(questionText, choices) {
      this.questionText = questionText;
      this.choices = choices;
    }
  
    displayQuestion() {
      console.log(`Q: ${this.questionText}`);
      this.choices.forEach((choice, index) => {
        console.log(`${index + 1}. ${choice}`);
      });
    }
  }
  
  class CorrectAnswer extends Question {
    constructor(questionText, choices, correctAnswer) {
      super(questionText, choices); // to get from the parent constructor
      this.correctAnswer = correctAnswer;
    }
  
    checkAnswer(answer) {
      return answer === this.correctAnswer;
    }
  }

  const myQuestion = new CorrectAnswer(
    "What is the capital of France?",
    ["Berlin", "Madrid", "Paris", "Rome"],
    "Paris"
  );
  
  // to display the question
  myQuestion.displayQuestion();
  
  // check if its correct
  console.log(myQuestion.checkAnswer("Paris")); // should display true
  console.log(myQuestion.checkAnswer("Berlin")); // should display false
  