import * as React from "react";

const Timer = () => {
	const initialTimer = localStorage.getItem("timer") ?? this.props.time;
	const timeoutId = React.useRef(null);
	const [timer, setTimer] = React.useState(initialTimer);

	const countTimer = React.useCallback(() => {
		if (timer <= 0) {
			localStorage.setItem("timer", 0);
		} else {
			setTimer(timer - 1);
			localStorage.setItem("timer", timer);
		}
	}, [timer]);

	React.useEffect(() => {
		timeoutId.current = window.setTimeout(countTimer, 1000);

		return () => window.clearTimeout(timeoutId.current);
	}, [timer, countTimer]);

	return <div align="center">{timer}</div>;
};

export default Timer;

// heavily referenced this URL for the code:
// https://stackoverflow.com/questions/68134405/react-component-using-hooks-sync-state-count-down-time-with-local-storage
