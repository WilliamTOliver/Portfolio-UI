import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  items: Array<any>;
  constructor() {
    this.items = [{}];
  }

  ngOnInit() {
  }

}
