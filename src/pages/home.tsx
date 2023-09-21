import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import GithubLogo from '../components/GithubLogo';

const HomePage = () => {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
			}}
		>
			<Card sx={{ maxWidth: 500, height: 300 }}>
				<CardContent>
					<GithubLogo />
					<Typography variant='h5' align='center' gutterBottom>
						Welcome to Github Repository Search
					</Typography>
					<Typography variant='body1' align='center' paragraph>
						Click on the "Search" button to start searching for repositories.
					</Typography>
					<NavLink to={ROUTES.SEARCH} style={{ textDecoration: 'none' }}>
						<Button variant='contained' color='primary' fullWidth>
							Search
						</Button>
					</NavLink>
				</CardContent>
			</Card>
		</Container>
	);
};

export default HomePage;
