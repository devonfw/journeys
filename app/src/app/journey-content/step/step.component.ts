import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input() step: any;

  constructor() { console.log("constructor")}

  ngOnInit(): void {
    console.log("moin")
    console.log(this.step.title)
  }

}
