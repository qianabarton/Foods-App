import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-card-input',
  templateUrl: './new-card-input.component.html',
  styleUrls: ['./new-card-input.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'class': 'col-4'}

})
export class NewCardInputComponent implements OnInit {

  public newCard: any = {text: ''};

  constructor() { }

  ngOnInit() {
  }

}
