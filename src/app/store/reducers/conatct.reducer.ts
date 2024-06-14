import { Action, createReducer, on } from '@ngrx/store';
import * as ContactActions from '../actions/contact.actions';
import { Contact } from '../../../models/contact.model';

export interface ContactState {
  contacts: Contact[];
  error: any;
}

export const initialState: ContactState = {
  contacts: [],
  error: null
};

const _contactReducer = createReducer(
  initialState,
  on(ContactActions.loadContactsSuccess, (state, { contacts }) => ({ ...state, contacts })),
  on(ContactActions.loadContactsFailure, (state, { error }) => ({ ...state, error })),
  on(ContactActions.addContactSuccess, (state, { contact }) => ({ ...state, contacts: [...state.contacts, contact] })),
  on(ContactActions.addContactFailure, (state, { error }) => ({ ...state, error })),
  on(ContactActions.updateContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: state.contacts.map(c => (c.id === contact.id ? contact : c))
  })),
  on(ContactActions.updateContactFailure, (state, { error }) => ({ ...state, error })),
  on(ContactActions.deleteContactSuccess, (state, { id }) => ({
    ...state,
    contacts: state.contacts.filter(contact => contact.id !== id)
  })),
  on(ContactActions.deleteContactFailure, (state, { error }) => ({ ...state, error }))
);

export function contactReducer(state: ContactState | undefined, action: Action) {
  return _contactReducer(state, action);
}
