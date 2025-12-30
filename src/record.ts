import { AppState, RecordState, RenderFunction } from './types';

// recorder
function getInitialRecord(): RecordState {
	return {
		history: [],
		isRecording: false,
	};
}

let record: RecordState = getInitialRecord();
let render: RenderFunction = () => {};

export function getRecord(): RecordState {
	return record;
}

export function start(): void {
	record = getInitialRecord();
}

export function setRender(renderFunction: RenderFunction): void {
	render = renderFunction;
}

export function finish(): void {
	record.isRecording = true;
}

export function save(state: AppState): void {
	if (record.isRecording) {
		return;
	}
	record.history.push(state);
}

export function replay(): void {
	const { history } = record;
	let count = 0;
	const read = (): void => {
		if (count >= history.length) {
			return;
		}
		render(history[count]);
		count += 1;
		requestAnimationFrame(read);
	};
	read();
}

export function reverse(): void {
	const { history } = record;
	let count = 0;
	const read = (): void => {
		if (count >= history.length) {
			render(history[history.length - 1]);
			return;
		}
		render(history[history.length - 1 - count]);
		count += 1;
		requestAnimationFrame(read);
	};
	read();
}
