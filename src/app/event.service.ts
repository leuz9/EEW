import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  uri = 'http://localhost:4000/event';

  constructor(private http: HttpClient) { }

  addEvent(event_name, event_desc, event_gst_number) {
    const obj = {
      event_name: event_name,
      event_desc: event_desc,
      event_gst_number: event_gst_number
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getEvents() {
    return this
           .http
           .get(`${this.uri}`);
  }

  editEvent(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

    updateEvent(event_name, event_desc, event_gst_number, id) {

      const obj = {
        event_name: event_name,
        event_desc: event_desc,
        event_gst_number: event_gst_number
        };
      this
        .http
        .post(`${this.uri}/update/${id}`, obj)
        .subscribe(res => console.log('Done'));
    }
    deleteEvent(id) {
      return this
                .http
                .get(`${this.uri}/delete/${id}`);
    }
}
