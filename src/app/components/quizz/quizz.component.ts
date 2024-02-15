import { Component, OnInit } from '@angular/core';
import quizz_question from '../../../assets/data/quizz_question.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;
  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  answers: string[] = [];
  answerSelected: string = '';

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(quizz_question);
    if (quizz_question) {
      this.finished = false;
      this.title = quizz_question.title;

      this.questions = quizz_question.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

      // for (let i in this.questions) {
      //   this.answers.push(this.questions[i].answer);
      // }
    } else {
      // this.finished = true;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.answerSelected =
        quizz_question.results[
          finalAnswer as keyof typeof quizz_question.results
        ];
      this.finished = true;
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
    return result;
  }
}
