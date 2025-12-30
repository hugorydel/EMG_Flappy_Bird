import React, { JSX } from 'react';
import { Piping as PipingType } from '../types';

type PipingProps = PipingType;

export default function Piping({ x, upper, below }: PipingProps): JSX.Element {
	const pipingStyle: React.CSSProperties = {
		transform: `translate(${-x}px, 0)`,
	};
	const upperStyle: React.CSSProperties = {
		transform: `translate(0, ${upper}px)`,
	};
	const belowStyle: React.CSSProperties = {
		transform: `translate(0, ${-below}px)`,
	};
	return (
		<div className='piping' style={pipingStyle}>
			<div className='piping-upper' style={upperStyle} />
			<div className='piping-below' style={belowStyle} />
		</div>
	);
}
