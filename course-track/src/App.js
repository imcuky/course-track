// App.js
import React from "react";
import "./App.css";

import { AssignmentProvider } from "./Context";

import ConnectedApp from "./ConnectedApp";

function App() {
	return (
		<AssignmentProvider>
			<ConnectedApp></ConnectedApp>
		</AssignmentProvider>
	);
}

export default App;
