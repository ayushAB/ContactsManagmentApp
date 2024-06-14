import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { ContactFormComponent } from './contact-form.component';
import { AppState } from '../store/app.state';
import * as ContactActions from '../store/actions/contact.actions';
import { contactReducer } from '../store/reducers/conatct.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let store: Store<AppState>;
  let dialogRef: MatDialogRef<ContactFormComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockData = {
    contact: { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '1234567890' },
    isEditMode: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactFormComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({ contacts: contactReducer }),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with contact data when in edit mode', () => {
    expect(component.contactForm.value).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890'
    });
  });

  it('should not dispatch any action if form is invalid', () => {
    spyOn(store, 'dispatch').and.callThrough();

    component.contactForm.setValue({
      firstName: '',
      lastName: '',
      email: 'invalid email',
      phoneNumber: '123'
    });

    component.onSubmit();

    expect(store.dispatch).not.toHaveBeenCalled();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });
});
