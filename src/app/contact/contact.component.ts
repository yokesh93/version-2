import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder , FormGroup , Validators, FormGroupDirective} from '@angular/forms';
import { FeedBack, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedBackForm: FormGroup;
  @ViewChild(FormGroupDirective) feedBackFormDirective;
  FeedBack: FeedBack;
  contactType = ContactType;
  formErrors = {
      'firstname': '',
      'lastname': '',
      'telnum': '',
      'email': ''
  };

  validationMessages = {
    'firstname': {
       'required': 'First Name is Required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters long.'
    },
    'lastname': {
       'required': 'Last Name is Required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. Number is Required.',
      'pattern' : 'Tel. Number must contain only numbers'
    },
    'email': {
      'required': 'Email is Required.',
      'email': 'Email not in valid format',
    }
  };

  constructor(private _formbuilder: FormBuilder) {
      this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedBackForm = this._formbuilder.group({
      firstname: ['', [Validators.required , Validators.minLength(2) , Validators.maxLength(25)]],
      lastname:  ['', [Validators.required , Validators.minLength(2) , Validators.maxLength(25)]],
      telnum:  [0, [ Validators.required , Validators.pattern ]],
      email:  ['', [ Validators.required , Validators.email ]],
      agree:  false,
      contacttype: 'None',
      message:  ''
    });
    this.feedBackForm.valueChanges.subscribe( data => this.onValueChanged(data));
    this.onValueChanged();
  }

   onValueChanged(data?: any) {
     if (!this.feedBackForm) {
        return;
     }
     const form = this.feedBackForm;

     for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control  && control.dirty && !control.valid){
            const messages = this.validationMessages[field];
            for(const key in control.errors){
                this.formErrors[field] += messages[key] + ' ';
            }
        }
     } 
  }

  onSubmit() {
      this.FeedBack = this.feedBackForm.value;
      console.log(this.FeedBack);
      this.feedBackFormDirective.resetForm({
        firstname: '',
        lastname:  '',
        telnum: 0,
        email:  '',
        agree:  false,
        contacttype: 'None',
        message:  ''
      });
  }
}
