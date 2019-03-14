// gst-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
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
  downloadURL: any;
  downloadURLF: any;
  snapshot: any;
  url: any;
  index: any;
  name: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage) {
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
    event_name: ['', Validators.required],
    event_desc: ['', Validators.required],
    event_desc_other: ['', Validators.required],
    event_gst_date: ['', Validators.required],
    event_schedule_length: ['', ''],
    event_schedule_name: ['', ''],
    event_schedule_date: ['', ''],
    schedule_program_length: ['', ''],
    schedule_program_hour: ['', ''],
    schedule_program_name: ['', ''],
  });
}
    updateEvent() {
      this.eventService.editEvent(this.event).subscribe(res => {
        console.log('update sucess');
      });
  }

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
  uploadF(event) {
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
            this.event.facilitator[this.index].image = url;
            this.downloadURLF = url;
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
