import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as ContactActions from '../store/actions/contact.actions';
import { Contact } from '../../models/contact.model';
import { ContactState } from '../store/reducers/conatct.reducer';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<Contact>([]);
  totalContacts = 0;

  pageEvent:any

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Output() openContactFormEvent = new EventEmitter<any>();

  constructor(private store: Store<{ contacts: ContactState }>,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(){
    this.store.select(state => state.contacts.contacts).subscribe(contacts => {
      this.dataSource.data = contacts;
      this.totalContacts = contacts.length;
      this.dataSource.paginator = this.paginator;
    });
    this.store.dispatch(ContactActions.loadContacts());
  }
  deleteContact(id: number): void {
    this.store.dispatch(ContactActions.deleteContact({ id }));
  }

  handlePageEvent(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
  }
  openContactForm(){
    this.openContactFormEvent.emit();
  }

  applyFilter(filterValue:any): void {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editContact(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '400px',
      data: { contact, isEditMode: true } // Pass contact data and flag for edit mode
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed if needed
    });
  }
}
