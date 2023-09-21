import { Outlet } from 'react-router-dom';

import Navbar from './layouts/Navbar';

import './App.css';

const App = () => {
	return (
		<div className='App'>
			<Navbar />
			<Outlet />
		</div>
	);
};

export default App;
