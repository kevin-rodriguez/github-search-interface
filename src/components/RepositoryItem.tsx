import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Repository } from '../types/repository';
import { Divider, ListItemButton } from '@mui/material';

const RepositoryItem: React.FC<{
	repository: Repository;
	isFavorited: boolean;
	onFavoriteClick: (repository: Repository) => void;
}> = ({ repository, isFavorited, onFavoriteClick }) => {
	const handleFavoriteClick = () => {
		onFavoriteClick(repository);
	};

	return (
		<>
			<ListItem key={repository.id}>
				<ListItemButton>
					<ListItemText primary={repository.name} />
				</ListItemButton>
				<IconButton
					onClick={handleFavoriteClick}
					color={isFavorited ? 'error' : 'default'}
				>
					<FavoriteIcon />
				</IconButton>
			</ListItem>
			<Divider variant='middle' light /> {/* Add a thin line */}
		</>
	);
};

export default RepositoryItem;
