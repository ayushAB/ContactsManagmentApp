import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ContactListComponent } from './contact-list.component';
import * as ContactActions from '../store/actions/contact.actions';
import { ContactState, contactReducer } from '../store/reducers/conatct.reducer';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let store: Store<{ contacts: ContactState }>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      imports: [
        StoreModule.forRoot({ contacts: contactReducer }),
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load contacts on initialization', () => {
    spyOn(store, 'select').and.returnValue(of([{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '1234567890' }]));
    spyOn(store, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(store.select).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(ContactActions.loadContacts());
    expect(component.dataSource.data.length).toBe(1);
  });

  it('should filter contacts based on input', () => {
    component.dataSource.data = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '1234567890' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', phoneNumber: '0987654321' }
    ];
    component.applyFilter({ target: { value: 'John' } });

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].firstName).toBe('John');
  });

  it('should handle page event correctly', () => {
    component.paginator = { pageIndex: 0, pageSize: 10 } as MatPaginator;
    component.handlePageEvent({ pageIndex: 1, pageSize: 5 } as PageEvent);

    expect(component.paginator.pageIndex).toBe(1);
    expect(component.paginator.pageSize).toBe(5);
  });

  it('should open edit contact dialog', () => {
    const contact = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '1234567890' };
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

    component.editContact(contact);

    expect(dialogSpy.open).toHaveBeenCalledWith(ContactFormComponent, {
      width: '400px',
      data: { contact, isEditMode: true }
    });
  });

  it('should dispatch delete contact action', () => {
    spyOn(store, 'dispatch').and.callThrough();

    component.deleteContact(1);

    expect(store.dispatch).toHaveBeenCalledWith(ContactActions.deleteContact({ id: 1 }));
  });
});
