import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isSpinnerShown: boolean;

   constructor(private cdRef: ChangeDetectorRef) {
    }

    @Input()
    set show(value: boolean) {
        if (!value) {
            this.isSpinnerShown = false;
            this.cdRef.markForCheck();
            return;
        }
        this.isSpinnerShown = true;
        this.cdRef.markForCheck();
    }

    ngOnInit() {
        console.log('Inside spinner');
    }

}
