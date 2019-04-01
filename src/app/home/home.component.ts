import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: any;
  event: any = {};
  constructor(private router: Router, private eventService: EventService) {}

  CheckDate(d: Date) {
    const Today = new Date();
    const newDate = new Date(d);

    return (Today > newDate);
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      console.log( 'le nombre d"event est ', this.events.length )
    });
  }

  onSelect(event) {
    this.router.navigate(['/home', 'home-detail']);
  }
}
