import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.scss']
})

export class AddquestionComponent implements OnInit {

  addQuestionForm:any = FormGroup;
  constructor(private fb : FormBuilder,
    private http : HttpClient,
    private questionService: QuestionService) {}

  ngOnInit(): void {
    this.addQuestionForm = this.fb.group({
      question:[],
      correctAnswer:[],
      otherAnswer1: [],
      otherAnswer2: [],
      otherAnswer3: []
    })
  }

  addQuestion(){
    //console.log(this.addQuestionForm.value);
    let question = this.addQuestionForm.controls.question.value;
    let correctAnswer = this.addQuestionForm.controls.correctAnswer.value;
    let otherAnswersJSON = JSON.stringify({
      otherAnswer1 : this.addQuestionForm.controls.otherAnswer1.value,
      otherAnswer2 : this.addQuestionForm.controls.otherAnswer2.value,
      otherAnswer3 : this.addQuestionForm.controls.otherAnswer3.value
    });
    console.log(otherAnswersJSON);
    this.questionService.addQuestion(question, correctAnswer, otherAnswersJSON).subscribe(result=>{
        //console.log(result);
        if(result){
          console.log("Question added..")
        }else{
          console.log("Something went wrong.");
        }
      })
  }

}
