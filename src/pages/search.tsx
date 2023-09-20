import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { Repository } from '../types/repository';
import { RootState, AppDispatch } from '../store/store';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { GithubRepositoryItem } from '../types/api';
import { fetchGithubRepositories } from '../helpers/api';

import SearchInput from '../components/SearchInput';
import RepositoryList from '../components/RepositoryList';
import { Container } from '@mui/material';

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
		<Container maxWidth='sm'>
			<h2>Search Repositories</h2>
			<SearchInput
				handleInputChange={handleInputChange}
				searchTerm={searchTerm}
			/>
			<RepositoryList
				repositories={results}
				onFavoriteClick={handleFavoriteClick}
				isFavorited={getIsFavorited}
			/>
		</Container>
	);
};

export default SearchPage;
