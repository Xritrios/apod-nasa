import { Typography } from '@mui/material';
import * as styles from '../styles/components/Header.module.css';

export const Header = () => {
	return (
		<Typography className={styles.default.container} variant='h4'>
			ASTONOMY PICTURE OF THE DAY
		</Typography>
	);
};
