import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app.state';
import { contactReducer } from './conatct.reducer';


export const appReducers: ActionReducerMap<AppState, any> = {
  contacts: contactReducer,
};
