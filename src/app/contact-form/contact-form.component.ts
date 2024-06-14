import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Contact } from '../../models/contact.model';
import { AppState } from '../store/app.state';
import * as ContactActions from '../store/actions/contact.actions';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm!: FormGroup;
  isEditMode: boolean = false;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contact: Contact, isEditMode: boolean }
  ) { }

  ngOnInit(): void {
    let contact = {
      firstName:'',
      lastName:'',
      email:'',
      phoneNumber:''
    }
    if(this.data){
    this.isEditMode = this.data?.isEditMode;
    contact = this.data?.contact;
    }
    this.contactForm = this.fb.group({
      firstName: [contact.firstName, Validators.required],
      lastName: [contact.lastName, Validators.required],
      email: [contact.email, [Validators.required, Validators.email]],
      phoneNumber: [contact.phoneNumber, [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if(this.isEditMode){
        const editedContact: Contact = { ...this.contactForm.value, id: this.data.contact.id };
      this.store.dispatch(ContactActions.updateContact({ contact: editedContact }));
      this.dialogRef.close();
      this.contactForm.reset();
      }else{
      const newContact: Contact = this.contactForm.value;
      this.store.dispatch(ContactActions.addContact({ contact: newContact }));
      this.dialogRef.close();
      this.contactForm.reset();
      }
    }
  }
}
