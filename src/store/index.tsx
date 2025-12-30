import { createStore } from 'relite';
import { START_PLAY, FLY_UP, PLAYING } from '../actions';
import { AppState, Store } from '../types';

export default function (initialState: AppState): Store {
	const actions = {
		START_PLAY,
		FLY_UP,
		PLAYING,
	};
	return createStore(actions, initialState) as Store;
}
