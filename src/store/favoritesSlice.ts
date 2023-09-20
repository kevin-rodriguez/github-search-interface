import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Repository } from '../types/repository';

interface FavoritesState {
	favorites: Repository[];
}

const initialState: FavoritesState = {
	favorites: [],
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite: (state: FavoritesState, action: PayloadAction<Repository>) => {
			state.favorites.push(action.payload);
		},
		removeFavorite: (
			state: FavoritesState,
			action: PayloadAction<Repository>
		) => {
			state.favorites = state.favorites.filter(
				(item) => item.id !== action.payload.id
			);
		},
		rateRepository: (
			state: FavoritesState,
			action: PayloadAction<{ id: string; rating: number }>
		) => {
			const { id, rating } = action.payload;
			const repository = state.favorites.find((repo) => repo.id === id);
			if (repository) {
				repository.rating = rating;
			}
		},
	},
});

export const { addFavorite, removeFavorite, rateRepository } =
	favoritesSlice.actions;
export default favoritesSlice.reducer;
