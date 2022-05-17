import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getAPODRequest } from '../store/reducers/getAPOD';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
	Alert,
	Card,
	CardContent,
	CardMedia,
	CircularProgress,
	TextField,
	Typography,
} from '@mui/material';
import { Header } from '../components';
import * as styles from '../styles/pages/APODPage.module.css';

export const APODPage = () => {
	const dispatch: AppDispatch = useDispatch();
	const { apod, loading, loaded, error } = useSelector(
		(state: RootState) => state.getAPOD
	);

	const [value, setValue] = React.useState<Date | null>(new Date());

	const handleChange = (newValue: Date | null) => {
		let newValueStringified = newValue?.toString();
		if (newValueStringified !== undefined) {
			setValue(new Date(newValueStringified));
		}
	};

	useEffect(() => {
		if (value !== null) {
			const date =
				value.getFullYear() +
				'-' +
				(value.getMonth() + 1) +
				'-' +
				value.getDate();
			dispatch(getAPODRequest(date));
		}
	}, [value]);

	if (error && error.length > 0) {
		return (
			<div>
				<Header />
				<div className={styles.default.container}>
					<div className={styles.default.datePickerContainer}>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DesktopDatePicker
								label='APOD Date'
								inputFormat='YYYY-MM-DD'
								value={value}
								onChange={handleChange}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</div>
					<Alert severity='error'>{error}</Alert>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<Header />
				<div className={styles.default.container}>
					<div className={styles.default.datePickerContainer}>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DesktopDatePicker
								label='APOD Date'
								inputFormat='YYYY-MM-DD'
								value={value}
								onChange={handleChange}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</div>
					{loading ? (
						<CircularProgress />
					) : (
						<Card
							className={styles.default.apodContainer}
							sx={{ maxWidth: 1000 }}
						>
							<CardMedia component='img' image={apod.url} alt={apod.title} />
							<CardContent>
								<Typography gutterBottom variant='h5' component='div'>
									{apod.title}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{apod.description}
								</Typography>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		);
	}
};
