import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.tsx';
import FavoritesPage from './pages/favorites.tsx';
import SearchPage from './pages/search.tsx';
import HomePage from './pages/home.tsx';

import store from './store/store.ts';

import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'search',
				element: <SearchPage />,
			},
			{
				path: 'favorites',
				element: <FavoritesPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
