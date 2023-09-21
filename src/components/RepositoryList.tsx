import React, { useRef, useEffect } from 'react';
import { List, Paper } from '@mui/material';
import { Repository } from '../types/repository';
import RepositoryItem from './RepositoryItem';

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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (listRef.current && !listRef.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onOutsideClick]);

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
