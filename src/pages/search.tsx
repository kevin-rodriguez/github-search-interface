import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { Repository } from '../types/repository';
import RepositoryItem from '../components/RepositoryItem';

import { RootState, AppDispatch } from '../store/store';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { GithubRepositoryItem } from '../types/api';
import { fetchGithubRepositories } from '../helpers/api';

const SearchPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState<Repository[]>([]);

	const dispatch: AppDispatch = useDispatch();
	const favorites = useSelector(
		(state: RootState) => state.favorites.favorites
	);

	const fetchRepositories = async (term: string) => {
		const repositories = await fetchGithubRepositories(term);

		setResults(
			repositories.map(
				(repo: GithubRepositoryItem): Repository => ({
					...repo,
					rating: null,
					isFavorite: false,
				})
			)
		);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm);

		const debouncedFetch = debounce(fetchRepositories, 300);
		debouncedFetch(searchTerm);
	};

	const getIsFavorited = (repository: Repository) =>
		favorites.some((favRepo) => favRepo.id === repository.id);

	const handleFavoriteClick = (repository: Repository) => {
		const isFavorited = getIsFavorited(repository);

		if (!isFavorited) {
			dispatch(addFavorite(repository));
			console.log(`Repository ${repository.name} marked as favorite.`);
		} else {
			dispatch(removeFavorite(repository));
			console.log(`Repository ${repository.name} removed from favorites.`);
		}
	};

	return (
		<div>
			<h2>Search Repositories</h2>
			<input
				type='text'
				value={searchTerm}
				onChange={handleInputChange}
				placeholder='Search repositories...'
			/>
			<ul>
				{results.map((repo) => (
					<RepositoryItem
						key={repo.id}
						repository={repo}
						onFavoriteClick={handleFavoriteClick}
						isFavorited={getIsFavorited(repo)}
					/>
				))}
			</ul>
		</div>
	);
};

export default SearchPage;
