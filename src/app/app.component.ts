import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Subscriber } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  questionsForm: FormGroup;
  todayDate = '11/01/2021';

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder
  ) {
    this.questionsForm = this.formBuilder.group({
      questions: this.formBuilder.array([]),
    });
  }

  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  ngOnInit() {
    let data = this.appService.getQuestionnaire();
    this.toFormGroup(data);
  }

  toFormGroup(questions) {
    questions.item.forEach((question) => {
      console.log(question);
      this.questions.push(
        this.formBuilder.group({
          linkId: question.linkId,
          text: question.text,
          type: question.type,
          option: question.type === 'choice' ? question.option : null,
        })
      );
    });
  }
}
