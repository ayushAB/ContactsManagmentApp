import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ContactsManagmentApp';
  constructor(private dialog: MatDialog) {}

  openContactForm(): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle any actions after the dialog is closed if needed
    });
  }
}
