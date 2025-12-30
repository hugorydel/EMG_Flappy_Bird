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
