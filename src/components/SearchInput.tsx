import TextField from '@mui/material/TextField';

interface SearchInputProps {
	searchTerm: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
	searchTerm,
	handleInputChange,
}) => {
	return (
		<TextField
			label='Start typing to search repositories...'
			variant='outlined'
			value={searchTerm}
			onChange={handleInputChange}
			sx={{
				fontSize: 40,
			}}
			fullWidth
		/>
	);
};

export default SearchInput;
