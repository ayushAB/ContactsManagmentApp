// src/app/app.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers';
import { HttpClientModule } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { ContactEffects } from './store/effects/contact.effect';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent,ContactListComponent,ContactFormComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        AppRoutingModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([ContactEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        StoreRouterConnectingModule.forRoot()
      ],
      providers: [{ provide: MatDialog, useValue: dialogSpy },provideAnimationsAsync()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

//   it('should open the contact form dialog when openContactForm is called', () => {
//     dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

//     component.openContactForm();

//     expect(dialogSpy.open).toHaveBeenCalledWith(ContactFormComponent, {
//       width: '400px'
//     });
//   });

//   it('should log message when the dialog is closed', () => {
//     spyOn(console, 'log');
//     dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

//     component.openContactForm();

//     expect(dialogSpy.open).toHaveBeenCalled();
//     // Trigger the afterClosed observable to complete
//     dialogSpy.open.calls.mostRecent().returnValue.afterClosed().subscribe(() => {
//       expect(console.log).toHaveBeenCalledWith('The dialog was closed');
//     });
//   });
 });
