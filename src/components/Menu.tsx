import React, { JSX } from 'react';

interface MenuProps {
	score: number;
	onPlay: () => void;
	onReplay?: () => void;
	onReverse?: () => void;
}

export default function Menu({
	score,
	onPlay,
	onReplay,
	onReverse,
}: MenuProps): JSX.Element {
	return (
		<div className='menu c-wrap'>
			<ul className='c-inner'>
				<li>score: {score}</li>
				<li>
					<div className='btn' onMouseDown={onPlay} onTouchStart={onPlay}>
						play
					</div>
				</li>
				{onReplay && (
					<li>
						<div className='btn' onMouseDown={onReplay} onTouchStart={onReplay}>
							replay
						</div>
					</li>
				)}
				{onReplay && (
					<li>
						<div className='btn' onMouseDown={onReverse} onTouchStart={onReverse}>
							reverse
						</div>
					</li>
				)}
			</ul>
		</div>
	);
}
