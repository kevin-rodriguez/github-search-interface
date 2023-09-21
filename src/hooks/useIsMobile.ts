import useMediaQuery from '@mui/material/useMediaQuery';

const MOBILE_MAX_WIDTH = 768;

const useIsMobile = (): boolean => {
	const isMobile = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH}px)`);

	return isMobile;
};

export default useIsMobile;
