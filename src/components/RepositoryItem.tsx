import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Repository } from '../types/repository';
import { Divider } from '@mui/material';

interface RepositoryItemProps {
	repository: Repository;
	isFavorited: boolean;
	isLastItem: boolean;
	onFavoriteClick: (repository: Repository) => void;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({
	repository,
	isFavorited,
	isLastItem,
	onFavoriteClick,
}) => {
	const handleFavoriteClick = () => {
		onFavoriteClick(repository);
	};

	return (
		<>
			<ListItem key={repository.id}>
				<ListItemText primary={repository.name} />
				<IconButton
					onClick={handleFavoriteClick}
					color={isFavorited ? 'error' : 'default'}
				>
					<FavoriteIcon />
				</IconButton>
			</ListItem>
			{!isLastItem && <Divider variant='middle' light />}
		</>
	);
};

export default RepositoryItem;
