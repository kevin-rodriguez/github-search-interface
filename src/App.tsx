import { Outlet } from 'react-router-dom';

import Navbar from './layouts/Navbar';

import GithubLogo from './assets/icons/GithubLogo';

const App = () => {
	return (
		<div className='App'>
			<GithubLogo />
			<Outlet />
			<Navbar />
		</div>
	);
};

export default App;
