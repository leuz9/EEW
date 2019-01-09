import { Component, OnInit } from '@angular/core';
import { EVENTS } from '../services/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent  implements OnInit {
  public events = EVENTS;
  public event;
  constructor(private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const index = params.get('id');
      this.event = this.events[index];
      console.log(this.event);
    });
  }

}
