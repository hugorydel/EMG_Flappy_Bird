import React, { JSX } from 'react';
import classnames from 'classnames';
import { BirdState } from '../types';

interface BirdProps extends BirdState {
	isFlying: boolean;
}

export default function Bird(props: BirdProps): JSX.Element {
	const { status, height = 0, isFlying } = props;
	const style: React.CSSProperties = {
		transform: `translate(0, ${-height}px) rotate(${getRotate(status)}deg)`,
	};
	const classes = classnames({
		bird: true,
		flying: isFlying,
	});
	return <div className={classes} style={style} />;
}

function getRotate(status: BirdState['status']): number {
	let rotate = 0;
	if (status === 'up') {
		rotate = -40;
	} else if (status === 'down') {
		rotate = 40;
	}
	return rotate;
}
