import React from 'react';
import classnames from 'classnames';
import Bird from './components/Bird';
import Piping from './components/Piping';
import Menu from './components/Menu';
import { AppState, Actions, RecordModule } from './types';

interface AppProps {
	state: AppState;
	actions: Actions;
	record: RecordModule;
}

export default function App({ state, actions, record }: AppProps): JSX.Element {
	const { bird, pipings, game, player } = state;
	const { FLY_UP, START_PLAY } = actions;
	const recordState = record.getRecord();
	const { isRecording, history } = recordState;
	const isPlaying = game.status === 'playing';
	const onFlyUp = isPlaying && !isRecording ? FLY_UP : undefined;
	const onReplay = history.length > 0 ? record.replay : undefined;
	const landClasses = classnames({
		land: true,
		sliding: isPlaying,
	});

	return (
		<div className='game'>
			<div className='scene' onMouseDown={onFlyUp} onTouchStart={onFlyUp}>
				{isPlaying && <div className='score'>{player.score}</div>}
				<Bird {...bird} isFlying={isPlaying} />
				{pipings.list.map(piping => (
					<Piping key={piping.timestamp} {...piping} />
				))}
				<div className={landClasses} />
				{game.status === 'over' && (
					<Menu
						score={player.score}
						onPlay={START_PLAY}
						onReplay={onReplay}
						onReverse={record.reverse}
					/>
				)}
			</div>
		</div>
	);
}
