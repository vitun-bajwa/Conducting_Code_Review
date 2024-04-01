import { Component, OnInit } from '@angular/core';
import { commonEnum } from './core/enums/common.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  constructor() {
    document.getElementById('indexTitle')!.innerHTML = commonEnum.title
  }

  ngOnInit() { 
  } 
}
