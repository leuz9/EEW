import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../event.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.scss']
})
export class GstGetComponent implements OnInit {

  events: any;
  event: any = {};
  refresh: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  deleteEvent(event) {
    event.status = 'archived';
    this.eventService.editEvent(event).subscribe(res => {
      console.log('archived');
    });
    this.refresh.next();
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
