import { Component, OnInit } from '@angular/core';
import Event from '../../Event';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.scss']
})
export class GstGetComponent implements OnInit {

  events: Event[];

  constructor(private bs: EventService) { }

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
  }

}
