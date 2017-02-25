class Test extends Base {

	constructor(propertyValues) {
		super(propertyValues);
		$("#content").empty();
		var questionList = new QuestionList();
		this.questionList = questionList;
		var alternativeList = new AlternativeList();
		this.alternativeList = alternativeList;

		this.currentQuestion = 0;
		this.answers = [];

		questionList.readAllQuestions(() => {
			for (var answer of this.questionList) {
				this.answers.push(-1);
				console.log(this.answers);
			}
			alternativeList.readAllAlternatives(() => {
				//console.log(alternativeList);
				this.showQuestion();
			});

		});
	}
	
	insertAnswers(callback) {
			for (let i = 0; i < this.answers.length; i++) {

				this.db.insertAnswer({
					user_userId: window.user,
					alternative_optionId: this.answers[i]
				}, callback);
			}
		}
		/*collectAnswers() {
		  for(let i = 0; i < this.answers.length; i++){

		  }
		} */


	showQuestion() {
		$('#content').empty();
		this.questionList[this.currentQuestion].display('#content');

		for (var alternative of this.alternativeList) {
			if (alternative.question_questionId === this.questionList[this.currentQuestion].questionId) {
				alternative.display('#content');
			}
		}

		var buttons = new Buttons();
		buttons.test = this;
		buttons.display('#content');
	}
	static get sqlQueries() {
		return {
			insertAnswer: `
    	INSERT user_answers_alternative SET ?
  	
      `
		}
	}
}