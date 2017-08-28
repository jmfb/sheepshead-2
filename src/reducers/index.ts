import { combineReducers } from 'redux';
import { ICurrentUserState, currentUser } from './currentUser';

export interface IState {
	currentUser: ICurrentUserState;
}

export const rootReducer = combineReducers<IState>({
	currentUser
});
