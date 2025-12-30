import { createStore } from 'relite';
import * as actions from './actions';
import { AppState, Store } from '../types';

export default function (initialState: AppState): Store {
	return createStore(actions, initialState) as Store;
}
