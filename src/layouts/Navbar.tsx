import { Link, NavLink, useLocation } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import { ROUTES } from '../constants/routes';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';

const Navbar = () => {
	const isMobile = useIsMobile();
	const location = useLocation();
	const [activeTab, setActiveTab] = useState(ROUTES.SEARCH);

	useEffect(() => {
		setActiveTab(location.pathname);
	}, [location]);

	return (
		<>
			{isMobile ? (
				<BottomNavigation
					showLabels
					style={{
						position: 'fixed',
						bottom: 0,
						width: '100%',
					}}
					sx={{ zIndex: 1 }}
					value={activeTab}
				>
					<BottomNavigationAction
						label='Search'
						icon={<SearchIcon />}
						component={NavLink}
						to={ROUTES.SEARCH}
						value={ROUTES.SEARCH}
					/>
					<BottomNavigationAction
						label='Favorites'
						icon={<FavoriteIcon />}
						component={NavLink}
						to={ROUTES.FAVORITES}
						value={ROUTES.FAVORITES}
					/>
				</BottomNavigation>
			) : (
				<Drawer
					sx={{
						width: 200,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: 200,
							boxSizing: 'border-box',
						},
					}}
					variant='permanent'
					anchor='left'
				>
					<List>
						<ListItemButton
							component={Link}
							to={ROUTES.SEARCH}
							selected={location.pathname === ROUTES.SEARCH}
						>
							<ListItemText primary='Search' />
							<SearchIcon />
						</ListItemButton>
						<ListItemButton
							component={Link}
							to={ROUTES.FAVORITES}
							selected={location.pathname === ROUTES.FAVORITES}
						>
							<ListItemText primary='Favorites' />
							<FavoriteIcon />
						</ListItemButton>
					</List>
				</Drawer>
			)}
		</>
	);
};

export default Navbar;
