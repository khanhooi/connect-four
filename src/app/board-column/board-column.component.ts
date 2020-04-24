import { Player } from './../player';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css']
})
export class BoardColumnComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {

  }

  @Input() x: number;
  @Input() column: Player[];
}
