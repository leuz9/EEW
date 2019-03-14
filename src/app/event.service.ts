import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  addEvent(event) {
    /* return this.http.post('http://localhost:3000/api/v1/event', event); */
    return this.http.post('https://edacy-api-prod.herokuapp.com/api/v1/event', event);
  }

  getEvents() {
    /* return this.http.get('http://localhost:3000/api/v1/event'); */
    return this.http.get('https://edacy-api-prod.herokuapp.com/api/v1/event');
  }
  getPublishedEvents() {
    /* return this.http.get('http://localhost:3000/api/v1/event/published'); */
    return this.http.get('https://edacy-api-prod.herokuapp.com/api/v1/event/published');
  }
  getEvent(id) {
    /* return this.http.get(`http://localhost:3000/api/v1/event/${id}`); */
    return this.http.get(`https://edacy-api-prod.herokuapp.com/api/v1/event/${id}`);
  }

  editEvent(event) {
    /* return this.http.post(`http://localhost:3000/api/v1/event/${event._id}`, event); */
    return this.http.post(`https://edacy-api-prod.herokuapp.com/api/v1/event/${event._id}`, event);
  }

}
