// gst-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.scss']
})
export class GstEditComponent implements OnInit {

  event: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bs: EventService,
    private fb: FormBuilder) {
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
    updateEvent(event_name, event_desc, event_gst_number, event_gst_date) {
      this.route.params.subscribe(params => {
         this.bs.updateEvent(event_name, event_desc, event_gst_number, event_gst_date, params['id']);
         this.router.navigate(['admin']);
   });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.bs.editEvent(params['id']).subscribe(res => {
          this.event = res;
      });
    });
  }
}
