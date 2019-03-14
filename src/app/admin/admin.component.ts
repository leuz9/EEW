import { Component, OnInit } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
        import Event from '../Event';
        import { EventService } from '../event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = 'event_website';
  events: any;
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private eventService: EventService) {
    // override the route reuse strategy
    this._router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
   };

   this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this._router.navigated = false;
      }
  });
  }

  deleteEvent(event) {
    event.status = 'archived';
    this.eventService.editEvent(event).subscribe(res => {
      console.log('Deleted');
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  ngOnInit() {
    this.eventService
      .getEvents()
      .subscribe((data: Event[]) => {
        this.events = data;
    });
  }

}
