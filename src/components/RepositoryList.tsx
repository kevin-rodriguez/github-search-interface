import { List } from '@mui/material';
import { Repository } from '../types/repository';
import RepositoryItem from './RepositoryItem';

interface RepositoryListProps {
	repositories: Repository[];
	onFavoriteClick: (repository: Repository) => void;
	isFavorited: (repository: Repository) => boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
	repositories,
	onFavoriteClick,
	isFavorited,
}) => {
	return (
		<List>
			{repositories.map((repo) => (
				<RepositoryItem
					key={repo.id}
					repository={repo}
					onFavoriteClick={onFavoriteClick}
					isFavorited={isFavorited(repo)}
				/>
			))}
		</List>
	);
};

export default RepositoryList;
