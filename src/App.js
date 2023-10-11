import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
	const ref = React.useRef(null);
	const [answer, setAnswer] = React.useState([["", "", ""]]);
	const getMatrix = () => {
		const matrixFromEnv = process.env.REACT_APP_MATRIX;
		if (process.env.REACT_APP_MATRIX === undefined) return;
		const parsed = JSON.parse(matrixFromEnv);
		return parsed;
	};
	const convertAlphabetToIndex = (alphabet) => {
		return alphabet.toLowerCase().charCodeAt(0) - 97;
	};
	const calculateAnswer = () => {
		if (ref.current !== null && ref.current.value) {
			const value = ref.current.value;
			const firstCode = value.slice(0, 2);
			const secondCode = value.slice(2, 4);
			const thirdCode = value.slice(4, 6);
			if (
				firstCode[0] &&
				firstCode[1] &&
				secondCode[0] &&
				secondCode[1] &&
				thirdCode[0] &&
				thirdCode[1]
			) {
				const matrix = getMatrix();
				setAnswer([
					matrix[firstCode[1] - 1][convertAlphabetToIndex(firstCode[0])],
					matrix[secondCode[1] - 1][convertAlphabetToIndex(secondCode[0])],
					matrix[thirdCode[1] - 1][convertAlphabetToIndex(thirdCode[0])],
				]);
			}
		}
	};
	React.useEffect(() => {
		console.log(process.env.REACT_APP_MATRIX);
		getMatrix();
	}, []);
	return (
		<div className="App">
			<header className="App-header">
				<div>
					{answer[0]} | {answer[1]} | {answer[2]}
				</div>
				<div>--------</div>
				<input ref={ref} onChange={calculateAnswer} />
			</header>
		</div>
	);
}

export default App;
