import { Component, EventEmitter, OnInit, Output, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { takeWhile, debounceTime, filter } from 'rxjs/operators';


@Component({
  selector: 'app-new-card-input',
  templateUrl: './new-card-input.component.html',
  styleUrls: ['./new-card-input.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'class': 'col-4'}

})
export class NewCardInputComponent implements OnInit {

  alive: any;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCardAdd = new EventEmitter<string>();
  @ViewChild('form') public form: NgForm;

  public newCard: any = {text: ''};
  newCardForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.newCardForm = fb.group({
      'text': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });

    this.newCardForm.valueChanges.pipe(
      filter((value) => this.newCardForm.valid),
    debounceTime(500),
    takeWhile(() => this.alive)
  ).subscribe(data => {
     console.log(data);
  });
  }

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      console.log('text = ' + this.newCardForm.controls['text'].value);
      this.addCard(this.newCardForm.controls['text'].value);
    }
  }

  addCard(text) {
    this.onCardAdd.emit(text);
    this.newCardForm.controls['text'].setValue('');
  }

}
