import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./Components/Game/Game";
// import Login from "./Components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Game />} />
					{/* <Route path='/Login' element={<Login />} /> */}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
