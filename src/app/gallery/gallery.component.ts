import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  events: any;
  event: any = {};

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

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
