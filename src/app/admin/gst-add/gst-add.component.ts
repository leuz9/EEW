// gst-add.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.scss']
})
export class GstAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private bs: EventService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      event_name: ['', Validators.required ],
      event_desc: ['', Validators.required ],
      event_gst_number: ['', Validators.required ],
      event_gst_date: ['', Validators.required ]
    });
  }

  addEvent(event_name, event_desc, event_gst_number, event_gst_date) {
    this.bs.addEvent(event_name, event_desc, event_gst_number, event_gst_date);
  }

  ngOnInit() {
  }

}
