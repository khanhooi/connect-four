import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-logo',
  templateUrl: './title-logo.component.html',
  styleUrls: ['./title-logo.component.css']
})
export class TitleLogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() fontsize: any = "4em";
  public text: string = "CONNECT FOUR";

}
