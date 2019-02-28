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
  snapshot: any;
  url: any;
  name: any;
  constructor(
    private fb: FormBuilder,
    private bs: EventService,
    private afStorage: AngularFireStorage
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      event_imgHome: ['', Validators.required],
      event_name: ['', Validators.required],
      event_desc: ['', Validators.required],
      event_desc_other: ['', Validators.required],
      event_gst_number: ['', Validators.required],
      event_gst_date: ['', Validators.required]
    });
  }

  addEvent(
    event_imgHome,
    event_name,
    event_desc,
    event_desc_other,
    event_gst_number,
    event_gst_date
  ) {
    this.bs.addEvent(
      event_imgHome,
      event_name,
      event_desc,
      event_desc_other,
      event_gst_number,
      event_gst_date
    );
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
