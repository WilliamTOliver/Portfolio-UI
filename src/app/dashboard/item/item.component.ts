import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  constructor() { }

  ngOnInit() {
  }

}
