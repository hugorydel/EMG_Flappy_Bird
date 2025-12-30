import {
	AppState,
	BirdState,
	PipingsState,
	PlayerState,
	GameState,
	Piping,
	CollisionRange,
} from '../types';

/**
 * actions
 */

export const START_PLAY = (state: AppState): AppState => {
	const game: GameState = { ...state.game };
	game.status = 'playing';
	const nextState: AppState = {
		...state,
		...state.initialState,
		game,
	};
	return FLY_UP(nextState);
};

export const FLY_UP = (state: AppState): AppState => {
	if (state.bird.height >= state.game.range.max) {
		return state;
	}

	const bird: BirdState = { ...state.bird };
	bird.status = 'up';
	bird.originalHeight = bird.height;
	bird.targetHeight = bird.height + bird.flyHeight;
	bird.timestamp = Date.now();

	const { range } = state.game;
	if (bird.targetHeight > range.max) {
		bird.targetHeight = range.max;
	}

	return {
		...state,
		bird,
	};
};

export const PLAYING = (state: AppState): AppState => {
	const gameStatus = state.game.status;
	if (gameStatus === 'over') {
		return state;
	}
	let nextState = flying(state);
	nextState = sliding(nextState);
	nextState = collisionDetection(nextState);
	return nextState;
};

function dropDown(state: AppState): AppState {
	const bird: BirdState = { ...state.bird };
	bird.status = 'down';
	bird.originalHeight = bird.height;
	bird.targetHeight = state.game.range.min;
	bird.timestamp = Date.now();
	return {
		...state,
		bird,
	};
}

function flying(state: AppState): AppState {
	const bird: BirdState = { ...state.bird };
	if (bird.height === bird.targetHeight) {
		return dropDown(state);
	}

	const { timestamp, flyTime, dropTime } = bird;
	const time = Date.now() - timestamp;

	if (bird.height < bird.targetHeight) {
		let ratio = time / flyTime;
		if (ratio > 1) {
			ratio = 1;
		}
		bird.height = bird.originalHeight + (bird.targetHeight - bird.originalHeight) * ratio;
	} else {
		const shift = (time * (state.game.range.max - state.game.range.min)) / dropTime;
		bird.height = bird.originalHeight - shift;
	}

	return {
		...state,
		bird,
	};
}

function sliding(state: AppState): AppState {
	const pipings: PipingsState = { ...state.pipings };
	const now = Date.now();

	if (now - pipings.timestamp >= pipings.interval) {
		const { game } = state;
		const heightRange = game.range.max - game.range.min;
		const shift =
			pipings.range.y.min + (pipings.range.y.max - pipings.range.y.min) * Math.random();
		const piping: Piping = {
			timestamp: now,
			x: pipings.range.x.min,
			upper: heightRange - shift - pipings.range.gap,
			below: shift,
			bottom: shift,
			top: shift + pipings.range.gap,
		};
		pipings.list = pipings.list.concat(piping);
		pipings.timestamp = now;
	}

	const { bird, game } = state;
	const collisionRange = getCollisionRange(
		bird.size.width,
		game.size.width,
		pipings.size.width
	);
	const player: PlayerState = { ...state.player };

	pipings.list = pipings.list
		.map((piping: Piping): Piping => {
			const updatedPiping: Piping = { ...piping };
			if (updatedPiping.x < pipings.range.x.max) {
				let ratio = (now - updatedPiping.timestamp) / pipings.speed;
				if (ratio > 1) {
					ratio = 1;
				}
				updatedPiping.x = ratio * pipings.range.x.max;
			} else {
				updatedPiping.x = pipings.range.x.max;
			}

			if (updatedPiping.x > collisionRange.to && !updatedPiping.isPassed) {
				updatedPiping.isPassed = true;
				player.score += 1;
			}

			return updatedPiping;
		})
		.filter((piping: Piping): boolean => {
			return piping.x < pipings.range.x.max;
		});

	return {
		...state,
		pipings,
		player,
	};
}

function getCollisionRange(
	birdWidth: number,
	gameWidth: number,
	pipingWidth: number
): CollisionRange {
	const from = (gameWidth - birdWidth) / 2;
	const to = from + birdWidth / 2 + pipingWidth;
	return { from, to };
}

function collisionDetection(state: AppState): AppState {
	const { game, bird, pipings } = state;

	const collisionRange = getCollisionRange(
		bird.size.width,
		game.size.width,
		pipings.size.width
	);

	const list = pipings.list.filter((piping: Piping): boolean => {
		return piping.x > collisionRange.from && piping.x < collisionRange.to;
	});

	const birdBottom = bird.height;
	const birdTop = bird.height + bird.size.height;

	for (let i = 0, len = list.length; i < len; i += 1) {
		const piping = list[i];
		if (birdBottom < piping.bottom || birdTop > piping.top) {
			const updatedGame: GameState = {
				...game,
				status: 'over',
			};
			return {
				...state,
				game: updatedGame,
			};
		}
	}
	return state;
}
