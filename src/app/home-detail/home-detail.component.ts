import { Component, OnInit } from '@angular/core';
import { PARTS } from '../services/part';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent  implements OnInit {
  events: any;
  public parts = PARTS;
  public part;
  event: any = {};
  constructor(private route: ActivatedRoute, private eventService: EventService) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventService
        .getEvent(params['id'])
        .subscribe((data) => {
          console.log(data);
          this.event = data;
      });
    });
  }

}
