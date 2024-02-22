import {Component, Input, OnInit} from '@angular/core';
import {AdvantageType} from "../../types/advantage.type";

@Component({
  selector: 'advantage-component',
  templateUrl: './advantage.component.html',
  styleUrls: ['./advantage.component.scss']
})
export class AdvantageComponent implements OnInit {

  @Input() advantage: AdvantageType = {title: "", text: ""};
  @Input() index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
