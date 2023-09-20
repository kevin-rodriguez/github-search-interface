import { Repository } from '../types/repository';

const RepositoryItem: React.FC<{
	repository: Repository;
	isFavorited: boolean;
	onFavoriteClick: (repository: Repository) => void;
}> = ({ repository, isFavorited, onFavoriteClick }) => {
	const handleFavoriteClick = () => {
		onFavoriteClick(repository);
	};

	return (
		<li key={repository.id}>
			{repository.name}
			<button onClick={handleFavoriteClick}>
				{!isFavorited ? 'Favorite' : 'Unfavorite'}
			</button>
		</li>
	);
};

export default RepositoryItem;
