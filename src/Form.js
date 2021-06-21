import { useForm, Controller } from "react-hook-form";
import isEmpty from "lodash.isempty";

import { TextField, InputAdornment, Button, Box } from "@material-ui/core";

import AccountCircleTwoTone from "@material-ui/icons/AccountCircleTwoTone";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import ContactPhoneTwoToneIcon from "@material-ui/icons/ContactPhoneTwoTone";
import DateRangeTwoToneIcon from "@material-ui/icons/DateRangeTwoTone";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  title: {
    marginTop: 40
  },
  fieldWrapper: {
    marginTop: 40,
    marginBottom: 40
  }
});

export default function Form({ formData, saveToLocalStorage }) {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, dirtyFields }
  } = useForm({ defaultValues: formData });

  const classes = useStyles();

  const { id, name } = formData;

  const onSubmit = (data) => {
    saveToLocalStorage(id, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h1"
      >
        {name}
      </Typography>
      <div className={classes.fieldWrapper}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Full Name is Required" }}
          render={({ field }) => (
            <TextField
              error={!isEmpty(errors.name)}
              label="Full Name"
              variant="outlined"
              helperText={!isEmpty(errors.name) ? errors.name?.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleTwoTone />
                  </InputAdornment>
                )
              }}
              {...field}
            />
          )}
        />
      </div>
      <div className={classes.fieldWrapper}>
        <Controller
          name="street"
          control={control}
          rules={{ required: "Street Required" }}
          render={({ field }) => (
            <TextField
              error={!isEmpty(errors.street)}
              label="Street"
              variant="outlined"
              helperText={!isEmpty(errors.street) ? errors.street?.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeTwoToneIcon />
                  </InputAdornment>
                )
              }}
              {...field}
            />
          )}
        />
      </div>
      <div className={classes.fieldWrapper}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email Required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
          }}
          render={({ field }) => (
            <TextField
              error={!isEmpty(errors.email)}
              label="Email"
              variant="outlined"
              helperText={!isEmpty(errors.email) ? errors.email?.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailTwoToneIcon />
                  </InputAdornment>
                )
              }}
              {...field}
            />
          )}
        />
      </div>
      <div className={classes.fieldWrapper}>
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Phone Required" }}
          render={({ field }) => (
            <TextField
              error={!isEmpty(errors.phone)}
              label="Phone"
              variant="outlined"
              helperText={!isEmpty(errors.phone) ? errors.phone?.message : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactPhoneTwoToneIcon />
                  </InputAdornment>
                )
              }}
              {...field}
            />
          )}
        />
      </div>
      <div className={classes.fieldWrapper}>
        <Controller
          name="age"
          control={control}
          rules={{ required: "Age Required" }}
          render={({ field }) => (
            <TextField
              error={!isEmpty(errors.age)}
              label="Age"
              variant="outlined"
              helperText={!isEmpty(errors.age) ? errors.age?.message : ""}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeTwoToneIcon />
                  </InputAdornment>
                )
              }}
              {...field}
            />
          )}
        />
      </div>

      <Box display="flex" justifyContent="center">
        <Box m={1}>
          <Button
            onClick={() => reset({ ...formData })}
            disabled={!isDirty || isSubmitting}
            variant="contained"
          >
            Reset
          </Button>
        </Box>
        <Box m={1}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || isEmpty(dirtyFields)}
            value="Update"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
}
