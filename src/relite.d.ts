declare module 'relite' {
	export function createStore<S, A>(
		actions: A,
		initialState: S
	): {
		getState: () => S;
		actions: A;
		subscribe: (
			callback: (data: { actionType: string; currentState: S }) => void
		) => void;
	};
}
