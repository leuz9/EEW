import { Component, OnInit } from '@angular/core';
import { EVENTS } from '../services/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public events = EVENTS;
  public event;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      const index = params['index'];
      this.event = this.events[index];
      console.log(this.event);
    });
  }
}
