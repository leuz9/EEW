import { Component, OnInit, Input } from '@angular/core';
import { EVENTS } from '../services/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public events = EVENTS;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelect(event) {
    this.router.navigate(['/home', 'home-detail']);
  }
}
