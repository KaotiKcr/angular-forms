import { Component, ViewChild } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';
import { SwalPartialTargets, SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages = [];
  model = new Employee('', '', false, 'payroll', 'default', new Date(), new Date('Oct 10 2018 8:00 AM'), 0);
  paymentType = 'payroll';
  hasFirstNameError = false;
  hasLastNameError = false;
  hasPrimaryLanguageError = false;
  postData = '';
  postError = '';
  minDate: Date;
  fullTime = 'Yes';
  @ViewChild('swalSuccess') private swalSuccess: SwalComponent;
  @ViewChild('swalError') private swalError: SwalComponent;

  constructor(
    private formPoster: FormPoster,
    public readonly swalTargets: SwalPartialTargets
  ) {
    this.minDate = new Date();
    this.minDate.setDate(new Date().getDate() + 7);
    this.formPoster
      .getLanguages()
      .subscribe(
        data => (this.languages = data.languages),
        err => ((this.postError = err), this.swalError.show())
      );
  }
  validatePrimaryLanguage(value) {
    if (value === 'default') {
      this.hasPrimaryLanguageError = true;
    } else {
      this.hasPrimaryLanguageError = false;
    }
  }
  validateFirstName(value) {
    if (value === '') {
      this.hasFirstNameError = true;
    } else {
      this.hasFirstNameError = false;
    }
  }
  validateLastName(value) {
    if (value === '') {
      this.hasLastNameError = true;
    } else {
      this.hasLastNameError = false;
    }
  }

  submitForm(form: NgForm) {
    // validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    this.validateFirstName(this.model.firstName);
    this.validateLastName(this.model.lastName);

    if (
      this.hasLastNameError ||
      this.hasFirstNameError ||
      this.hasLastNameError
    ) {
      return;
    }

    if (this.fullTime === 'Yes') {
      this.model.fullTime = true;
    } else {
      this.model.fullTime = false;
    }

    this.model.paymentType = this.paymentType;

    this.formPoster
      .postEmployeeForm(this.model)
      .subscribe(
        data => ((this.postData = data), this.swalSuccess.show()),
        err => ((this.postError = err), this.swalError.show())
      );
  }
}
