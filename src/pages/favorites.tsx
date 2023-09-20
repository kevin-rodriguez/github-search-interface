import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite, rateRepository } from '../store/favoritesSlice';
import { AppDispatch, RootState } from '../store/store';
import { Repository } from '../types/repository';
import { Container } from '@mui/material';

const FavoritesPage: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const favorites = useSelector(
		(state: RootState) => state.favorites.favorites
	);

	const handleRemoveFromFavorites = (repository: Repository) => {
		dispatch(removeFavorite(repository));
	};

	const handleRateRepository = (repository: Repository, rating: number) => {
		dispatch(rateRepository({ id: repository.id, rating }));
	};

	return (
		<Container maxWidth='sm'>
			<h2>Favorited Repositories</h2>
			{favorites.length ? (
				<ul>
					{favorites.map((repo) => (
						<li key={repo.id}>
							<span>{repo.name}</span>
							<div>
								<span>Rating:</span>
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										onClick={() => handleRateRepository(repo, star)}
									>
										{repo.rating && star <= repo.rating ? '★' : '☆'}
									</button>
								))}
							</div>
							<button onClick={() => handleRemoveFromFavorites(repo)}>
								Unfavorite
							</button>
						</li>
					))}
				</ul>
			) : (
				<p>
					No favorite repositories yet. Search for one that you like and click
					the heart!
				</p>
			)}
		</Container>
	);
};

export default FavoritesPage;
