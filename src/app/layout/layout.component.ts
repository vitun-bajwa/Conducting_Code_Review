import { Component } from '@angular/core';
import { CommonService } from '../core/service/common.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {

  constructor(private commonService: CommonService) {
    this.commonService.isActive();
  }
  
}
