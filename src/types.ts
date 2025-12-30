// Game state shape
export interface GameState {
	status: 'over' | 'playing';
	range: {
		min: number;
		max: number;
	};
	size: {
		width: number;
		height: number;
	};
}

export interface PlayerState {
	score: number;
}

export interface BirdState {
	size: {
		width: number;
		height: number;
	};
	status: 'normal' | 'up' | 'down';
	height: number;
	targetHeight: number;
	originalHeight: number;
	flyHeight: number;
	flyTime: number;
	dropTime: number;
	timestamp: number;
}

export interface Piping {
	timestamp: number;
	x: number;
	upper: number;
	below: number;
	bottom: number;
	top: number;
	isPassed?: boolean;
}

export interface PipingsState {
	timestamp: number;
	interval: number;
	speed: number;
	size: {
		width: number;
	};
	range: {
		x: {
			min: number;
			max: number;
		};
		y: {
			min: number;
			max: number;
		};
		gap: number;
	};
	list: Piping[];
}

export interface AppState {
	initialState?: AppState;
	game: GameState;
	player: PlayerState;
	bird: BirdState;
	pipings: PipingsState;
}

// Action types
export type ActionFunction = (state: AppState) => AppState;

export interface Actions {
	START_PLAY: ActionFunction;
	FLY_UP: ActionFunction;
	PLAYING: ActionFunction;
}

// Record system
export interface RecordState {
	history: AppState[];
	isRecording: boolean;
}

// Utility types
export interface CollisionRange {
	from: number;
	to: number;
}

export type RenderFunction = (state?: AppState) => void;

// Store types
export interface Store {
	getState: () => AppState;
	actions: Actions;
	subscribe: (callback: SubscribeCallback) => void;
}

export interface SubscribeData {
	actionType: string;
	currentState: AppState;
}

export type SubscribeCallback = (data: SubscribeData) => void;

// Record module interface
export interface RecordModule {
	getRecord: () => RecordState;
	start: () => void;
	setRender: (renderFunction: RenderFunction) => void;
	finish: () => void;
	save: (state: AppState) => void;
	replay: () => void;
	reverse: () => void;
}

// Add to types.ts
export interface EMGSignal {
	timestamp: number;
	amplitude: number;
	threshold: number;
}

export interface EMGConfig {
	threshold: number;
	debounceMs: number;
	samplingRate: number;
}

export type EMGHandler = (signal: EMGSignal) => void;
