import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { APODPage } from './pages';

function App() {
	return (
		<Routes>
			<Route path='/' element={<APODPage />} />
		</Routes>
	);
}

export default App;
