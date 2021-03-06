// gst-add.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../../event.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.scss']
})
export class GstAddComponent implements OnInit {
  angForm: FormGroup;
  ref: any;
  task: any;
  uploadProgress: any;
  downloadURL: any;
  downloadURLF: any;
  snapshot: any;
  url: any;
  index: any;
  name: any;
  viewForm: boolean;
  disabledButton: boolean;
  event = {
    image: '',
    title: '',
    titleshort: '',
    description: {
      short: '',
      short1: '',
      long: ''
    },
    lieu: '',
    date: '',
    facilitator: [
      {
        image: '',
        name: '',
        job: '',
        feel: '',
        twitter: '',
        linkedin: '',
        facebook: ''
      }
    ],
    evenbride: '',
    schedule: [
      {
        name: '',
        date: '',
        program: [
          {
            hour: '',
            text: ''
          }
        ]
      }
    ],
    partner: [
      {
        website: '',
        img: ''
      }
    ],
    gallery: [{
      image: ''
    }]
  };
  events: any;
  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private afStorage: AngularFireStorage
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      event_imgHome: ['', ''],
      event_name: ['', ''],
      event_name_short: ['', ''],
      event_gst_date: ['', ''],
      event_lieu: ['', ''],
      event_evenbride: ['', ''],
      event_desc: ['', ''],
      event_desc_other: ['', ''],
      event_desc_long: ['', ''],
      event_imgFacilitator: ['', ''],
      event_faclitator_name: ['', ''],
      event_faclitator_job: ['', ''],
      event_faclitator_feel: ['', ''],
      event_faclitator_twitter: ['', ''],
      event_faclitator_facebook: ['', ''],
      event_faclitator_linkedin: ['', ''],
      event_schedule_name: ['', ''],
      event_schedule_date: ['', ''],
      schedule_program_hour: ['', ''],
      schedule_program_name: ['', ''],
      gallery_image: ['', '']
    });
  }

  addEvent() {
    console.log(this.event);
    this.eventService.addEvent(this.event).subscribe(res => console.log(res));
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  addFacilitatorInfos(): void {
    this.event.facilitator.push({
      image: '',
      name: '',
      job: '',
      feel: '',
      twitter: '',
      linkedin: '',
      facebook: ''
    });
    // this.event.facilitator.length = this.event.facilitator.length + 1;
  }
  addScheduleInfos(): void {
    this.event.schedule.push({
      name: '',
      date: '',
      program: [
        {
          hour: '',
          text: ''
        }
      ]
    });
    /* this.event.schedule.length = this.event.schedule.length + 1; */
  }
  addActivityInfos(i): void {
    this.event.schedule[i].program.push({
      hour: '',
      text: ''
    });
    /* this.event.schedule[i].program.length = this.event.schedule[i].program.length  + 1; */
  }
  addGalleryImage(): void {
    this.event.gallery.push({
      image: ''
    });
    /* this.event.gallery[i].image.length = this.event.gallery[i].image.length  + 1; */
  }

  ngOnInit() {}

  upload(event) {
    const randomId = Math.random()
      .toString(36)
      .substring(2);
    this.ref = this.afStorage.ref(randomId);
    this.task = this.ref.put(event.target.files[0]);
    this.snapshot = this.task.snapshotChanges();
    this.snapshot
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(url => {
            this.event.image = url;
            this.downloadURL = url;
            this.name = event.target.files[0].name;
            console.log(this.downloadURL);
            console.log(this.name);
          });
        })
      )
      .subscribe(res => {
        this.task = this.ref.put(event.target.files[0]);
        this.uploadProgress = this.task.percentageChanges();
      });
  }
  uploadF(event, i) {
    const randomId = Math.random()
      .toString(36)
      .substring(2);
    this.ref = this.afStorage.ref(randomId);
    this.task = this.ref.put(event.target.files[0]);
    this.snapshot = this.task.snapshotChanges();
    this.snapshot
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(url => {
            this.event.facilitator[i].image = url;
            this.downloadURL = url;
            this.name = event.target.files[0].name;
            console.log(this.downloadURL);
            console.log(this.name);
          });
        })
      )
      .subscribe(res => {
        this.task = this.ref.put(event.target.files[0]);
        this.uploadProgress = this.task.percentageChanges();
      });
  }
  uploadG(event, i) {
    const randomId = Math.random()
      .toString(36)
      .substring(2);
    this.ref = this.afStorage.ref(randomId);
    this.task = this.ref.put(event.target.files[0]);
    this.snapshot = this.task.snapshotChanges();
    this.snapshot
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(url => {
            this.event.gallery[i].image = url;
            this.downloadURL = url;
            this.name = event.target.files[0].name;
            console.log(this.downloadURL);
            console.log(this.name);
          });
        })
      )
      .subscribe(res => {
        this.task = this.ref.put(event.target.files[0]);
        this.uploadProgress = this.task.percentageChanges();
      });
  }
}
