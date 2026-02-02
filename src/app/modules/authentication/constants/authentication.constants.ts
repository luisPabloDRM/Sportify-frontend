import { FormControl, FormGroup, Validators } from "@angular/forms";

export const LOG_IN_FORM =  new FormGroup({
    email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
    }),
});

export const REQUEST_RECOVERY_FORM = new FormGroup({
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
});

export const UPDATE_PASSWORD_FORM = new FormGroup({
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
  code: new FormControl('', {
    nonNullable:true, 
    validators: [Validators.required]
  }),
  password: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  }),
});