import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Event from '../../Event';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.scss']
})
export class GstGetComponent implements OnInit {

  events: Event[];
  event: any = {};

  constructor(private route: ActivatedRoute, private bs: EventService) { }

  deleteEvent(id) {
    this.bs.deleteEvent(id).subscribe(res => {
      console.log('Deleted');
    });
  }

  ngOnInit() {
    this.bs
      .getEvents()
      .subscribe((data: Event[]) => {
        this.events = data;
    });
    this.route.params.subscribe(params => {
      this.bs.editEvent(params['id']).subscribe(res => {
        this.event = res;
    });
  });
  }

}
