
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ContactService } from '../../../services/contact.service';
import * as ContactActions from '../actions/contact.actions';

@Injectable()
export class ContactEffects {
  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.loadContacts),
      mergeMap(() =>
        this.contactService.getContacts().pipe(
          map(contacts => ContactActions.loadContactsSuccess({ contacts })),
          catchError(error => of(ContactActions.loadContactsFailure({ error })))
        )
      )
    )
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.addContact),
      mergeMap(action =>
        this.contactService.addContact(action.contact).pipe(
          map(contact => ContactActions.addContactSuccess({ contact })),
          catchError(error => of(ContactActions.addContactFailure({ error })))
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.updateContact),
      mergeMap(action =>
        this.contactService.updateContact(action.contact).pipe(
          map(contact =>{ 
            return ContactActions.updateContactSuccess({ contact })
        }),
          catchError(error => of(ContactActions.updateContactFailure({ error })))
        )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.deleteContact),
      mergeMap(action =>
        this.contactService.deleteContact(action.id).pipe(
          map(() => ContactActions.deleteContactSuccess({ id: action.id })),
          catchError(error => of(ContactActions.deleteContactFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}
