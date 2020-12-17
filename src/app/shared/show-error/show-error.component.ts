import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 300, opacity: 0 }),
            animate('1s ease-out', 
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in', 
                    style({ height: 300, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ShowErrorComponent implements OnChanges {
  @Input() message: string;
  @Input() showErrorMessage: boolean;
  @Input() showSuccessMessage: boolean;
  constructor() { }

  ngOnChanges() {
    console.log(this.message);
  }

}
