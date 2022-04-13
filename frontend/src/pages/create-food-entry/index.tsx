import { useMemo } from 'react';
import { DateTimePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Alert, TextField, Box, Typography } from '@mui/material';

import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import Loader from 'shared/ui/components/loader';
import { getAxiosError } from 'shared/utils/validate';
import { useFoodEntry, useUpsertFoodEntry } from './service/food-entry.hooks';

const foodEntrySchema = Yup.object().shape({
  productName: Yup.string().required('Please enter food Name'),
  price: Yup.number().required('Please enter food price'),
  calories: Yup.number().required('Please enter food calories'),
  date: Yup.date().required('Please enter intake date'),
});

export function CreateFoodEntry() {
  let { entryId } = useParams();

  const { data: foodEntry, isLoading: isFoodEntryLoading } =
    useFoodEntry(entryId);
  const { mutate, error, isLoading, isError } = useUpsertFoodEntry(entryId);

  const initialValues = useMemo(() => {
    if (foodEntry) {
      return {
        productName: foodEntry.productName || '',
        price: foodEntry.price || 0,
        calories: foodEntry.calories || 0,
        date: new Date(foodEntry.date) || new Date(),
      };
    }
    return {
      productName: '',
      price: 0,
      calories: 0,
      date: new Date(),
    };
  }, [foodEntry]);

  const { handleChange, values, handleBlur, touched, errors, ...formik } =
    useFormik({
      initialValues,
      validationSchema: foodEntrySchema,
      onSubmit: (values) => {
        mutate(values);
      },
      enableReinitialize: true,
    });

  if (isFoodEntryLoading) {
    return <Loader />;
  }
  return (
    <>
      <Helmet>
        <title>Add Food</title>
        <meta name="description" content="Calorie Tracker Add Food Page" />
      </Helmet>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {entryId ? 'Update' : 'Create'} Food Entries
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{
            mt: 1,
            maxWidth: 'sm',
          }}
        >
          {isError && <Alert severity="error">{getAxiosError(error)}!</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="productName"
            label="Product Name"
            name="productName"
            autoComplete="productName"
            value={values.productName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.productName && Boolean(errors.productName)}
            helperText={touched.productName && errors.productName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="calories"
            label="Calories"
            name="calories"
            type="number"
            autoComplete="calories"
            value={values.calories}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.calories && Boolean(errors.calories)}
            helperText={touched.calories && errors.calories}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price ($)"
            name="price"
            type="number"
            autoComplete="price"
            value={values.price}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField
                  {...props}
                  margin="normal"
                  fullWidth
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              )}
              label="Date"
              value={values.date}
              maxDateTime={new Date()}
              onChange={(val) => {
                formik.setFieldValue('date', val);
              }}
            />
          </LocalizationProvider>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="submit"
            color="secondary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            {entryId ? 'Update' : 'Create'}
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
}
