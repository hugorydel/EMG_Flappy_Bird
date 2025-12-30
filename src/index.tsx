import React from 'react';
import { createRoot } from 'react-dom/client';
import Fastclick from 'fastclick';
import App from './App';
import createStore from './store';
import initialState from './initialState';
import * as record from './record';
import './css/index.css';
import { AppState, SubscribeData } from './types';

const state: AppState = {
	initialState: { ...initialState },
	...initialState,
};

const store = createStore(state);

// Get root element and create React 18 root
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

function renderToDOM(state?: AppState): void {
	root.render(
		<App state={state || store.getState()} actions={store.actions} record={record} />
	);
}

record.setRender(renderToDOM);

store.subscribe((data: SubscribeData) => {
	const { actionType, currentState } = data;

	if (actionType === 'START_PLAY') {
		record.start();
		record.save(currentState.initialState!);
		playing();
		return;
	}

	if (actionType === 'PLAYING' || actionType === 'FLY_UP') {
		record.save(currentState);
		renderToDOM();
		if (currentState.game.status === 'over') {
			record.finish();
			stopPlaying();
		}
		return;
	}
});

const { PLAYING } = store.actions;
let requestID: number | null = null;

function playing(): void {
	requestID = requestAnimationFrame(playing);
	PLAYING();
}

function stopPlaying(): void {
	if (requestID !== null) {
		cancelAnimationFrame(requestID);
	}
}

renderToDOM();

if ('ontouchstart' in document) {
	Fastclick.attach(document.body);
}
