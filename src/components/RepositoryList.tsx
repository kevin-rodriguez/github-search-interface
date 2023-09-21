import React, { useRef } from 'react';
import { List, Paper } from '@mui/material';
import { Repository } from '../types/repository';
import RepositoryItem from './RepositoryItem';
import useClickOutside from '../hooks/useClickOutside';

interface RepositoryListProps {
	repositories: Repository[];
	onFavoriteClick: (repository: Repository) => void;
	isFavorited: (repository: Repository) => boolean;
	onOutsideClick: () => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
	repositories,
	onFavoriteClick,
	isFavorited,
	onOutsideClick,
}) => {
	const listRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(listRef, onOutsideClick);

	if (!repositories.length) return null;

	return (
		<Paper ref={listRef}>
			<List sx={{ overflowY: 'scroll', marginBottom: 5 }}>
				{repositories.map((repo, i) => (
					<RepositoryItem
						key={repo.id}
						repository={repo}
						onFavoriteClick={onFavoriteClick}
						isFavorited={isFavorited(repo)}
						isLastItem={i === repositories.length - 1}
					/>
				))}
			</List>
		</Paper>
	);
};

export default RepositoryList;
