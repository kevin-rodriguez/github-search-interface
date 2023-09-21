import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchInputProps {
	searchTerm: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
	searchTerm,
	handleInputChange,
}) => {
	const clearInput = () => {
		handleInputChange({
			target: { value: '' },
		} as React.ChangeEvent<HTMLInputElement>);
	};

	return (
		<TextField
			label='Start typing to search repositories...'
			variant='outlined'
			value={searchTerm}
			onChange={handleInputChange}
			InputProps={{
				endAdornment: searchTerm.length > 0 && (
					<InputAdornment position='end'>
						<IconButton onClick={clearInput}>
							<ClearIcon />
						</IconButton>
					</InputAdornment>
				),
			}}
			fullWidth
		/>
	);
};

export default SearchInput;
