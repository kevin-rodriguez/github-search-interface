import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Repository } from '../types/repository';
import { RootState, AppDispatch } from '../store/store';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { GithubRepositoryItem } from '../types/api';
import { fetchGithubRepositories } from '../helpers/api';
import { FETCH_DEBOUNCE_TIME } from '../constants/api';

import { Container, Typography } from '@mui/material';
import SearchInput from '../components/SearchInput';
import RepositoryList from '../components/RepositoryList';
import GithubLogo from '../components/GithubLogo';

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

	const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		const fetchTimeout = setTimeout(() => {
			if (searchTerm) {
				fetchRepositories(searchTerm);
			} else {
				setResults([]);
			}
		}, FETCH_DEBOUNCE_TIME);

		return () => clearTimeout(fetchTimeout);
	}, [searchTerm]);

	const getIsFavorited = (repository: Repository) =>
		favorites.some((favRepo) => favRepo.id === repository.id);

	const handleFavoriteClick = (repository: Repository) => {
		const isFavorited = getIsFavorited(repository);

		if (!isFavorited) {
			dispatch(addFavorite(repository));
		} else {
			dispatch(removeFavorite(repository));
		}
	};

	const closeRepositoryList = () => {
		setResults([]);
	};

	return (
		<Container maxWidth='sm'>
			<GithubLogo />
			<Typography variant='h4' align='center' gutterBottom>
				Search Repositories
			</Typography>
			<SearchInput
				handleInputChange={handleInputChange}
				searchTerm={searchTerm}
			/>
			<RepositoryList
				repositories={results}
				onFavoriteClick={handleFavoriteClick}
				isFavorited={getIsFavorited}
				onOutsideClick={closeRepositoryList}
			/>
		</Container>
	);
};

export default SearchPage;
