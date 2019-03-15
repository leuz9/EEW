// gst-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../../event.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.scss']
})
export class GstEditComponent implements OnInit {
  events: any;
  event: any = {};
  angForm: FormGroup;
  ref: any;
  task: any;
  uploadProgress: any;
  uploadProgressF: any;
  downloadURL: any;
  downloadURLF: any;
  snapshot: any;
  url: any;
  index: any;
  name: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      event_imgHome: ['', ''],
      event_name_short: ['', ''],
      event_lieu: ['', ''],
      event_evenbride: ['', ''],
      event_desc_long: ['', ''],
      event_faclitator_length: ['', ''],
      event_imgFacilitator: ['', ''],
      event_faclitator_name: ['', ''],
      event_faclitator_job: ['', ''],
      event_faclitator_feel: ['', ''],
      event_faclitator_twitter: ['', ''],
      event_faclitator_facebook: ['', ''],
      event_faclitator_linkedin: ['', ''],
      event_name: ['', ''],
      event_desc: ['', ''],
      event_desc_other: ['', ''],
      event_gst_date: ['', ''],
      event_schedule_length: ['', ''],
      event_schedule_name: ['', ''],
      event_schedule_date: ['', ''],
      schedule_program_length: ['', ''],
      schedule_program_hour: ['', ''],
      schedule_program_name: ['', '']
    });
  }
  updateEvent() {
    console.log(this.event);
    this.eventService.editEvent(this.event).subscribe(res => {
      console.log('update sucess');
    });
  }

  addFacilitatorInfos(): void {
    /* this.event.facilitator.push({
      image: '',
      name: '',
      job: '',
      feel: '',
      twitter: '',
      linkedin: '',
      facebook: ''
    }); */
    this.event.facilitator.length = this.event.facilitator.length + 1;
  }
  addScheduleInfos(): void {
    /* this.event.schedule.push({
      name: '',
      date: '',
      program: [
        {
          hour: '',
          text: ''
        }
      ]
    }); */
    this.event.schedule.length = this.event.schedule.length + 1;
  }
  addActivityInfos(i): void {
    /* this.event.schedule[i].program.push({
      hour: '',
      text: ''
    }); */
    this.event.schedule[i].program.length = this.event.schedule[i].program.length  + 1;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventService.getEvent(params['id']).subscribe(data => {
        console.log(data);
        this.event = data;
      });
    });
  }

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
            this.downloadURLF[i] = url;
            this.name = event.target.files[0].name;
            console.log(this.downloadURLF);
            console.log(this.name);
          });
        })
      )
      .subscribe(res => {
        this.task = this.ref.put(event.target.files[0]);
        this.uploadProgressF = this.task.percentageChanges();
      });
  }
}
