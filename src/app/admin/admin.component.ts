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
  events: Event[];
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private bs: EventService) {
  }

  deleteEvent(id) {
    this.bs.deleteEvent(id).subscribe(res => {
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
    this.bs
      .getEvents()
      .subscribe((data: Event[]) => {
        this.events = data;
    });
  }

}
