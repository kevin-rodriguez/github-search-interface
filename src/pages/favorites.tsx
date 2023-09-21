import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeFavorite, rateRepository } from '../store/favoritesSlice';
import { AppDispatch, RootState } from '../store/store';
import { Repository } from '../types/repository';

import { Box, Divider, Grid, IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GithubLogo from '../components/GithubLogo';

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
		<Container maxWidth='md'>
			<GithubLogo />
			<Typography variant='h4' align='center' gutterBottom>
				Favorited Repositories
			</Typography>
			{favorites.length ? (
				<List sx={{ marginBottom: 6 }}>
					{favorites.map((repo) => (
						<React.Fragment key={repo.id}>
							<ListItem>
								<Grid container alignItems='center'>
									<Grid item xs={5}>
										<Typography variant='body1' sx={{ wordWrap: 'break-word' }}>
											{repo.name}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Box>
											{[1, 2, 3, 4, 5].map((star) => (
												<IconButton
													key={star}
													size='small'
													onClick={() => handleRateRepository(repo, star)}
												>
													{repo.rating && star <= repo.rating ? (
														<StarIcon sx={{ color: '#ffe600' }} />
													) : (
														<StarIcon />
													)}
												</IconButton>
											))}
										</Box>
									</Grid>
									<Grid item xs={1}>
										<IconButton
											onClick={() => handleRemoveFromFavorites(repo)}
											size='small'
										>
											<CancelIcon color='error' />
										</IconButton>
									</Grid>
								</Grid>
							</ListItem>
							<Divider variant='middle' light />
						</React.Fragment>
					))}
				</List>
			) : (
				<>
					<Typography variant='body1' align='center'>
						No favorite repositories yet.
					</Typography>
					<Typography variant='body1' align='center'>
						Search for one that you like and click the{' '}
						<FavoriteIcon fontSize='small' color='error' />!
					</Typography>
				</>
			)}
		</Container>
	);
};

export default FavoritesPage;
