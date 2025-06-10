import React from 'react';
import {Field} from 'react-final-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { KeyboardDatePicker, Select, TextField as MaterialTextField } from 'mui-rff';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    marginRight: '15px',
    marginTop: '15px',
    fontSize: '11;',
    color: '#eee',
    minWidth: '350px',
  },
  selectEmpty: {
    minWidth: '350px',
  },
});

const SelectAdapter = ({ input, onChange, ...others }) => (
  <Select {...input}
          {...others}
          onChange={(event) => {
            input.onChange(event);
            onChange && onChange(event);
          }}/>
);

const picker = props => {
  const {name, label, items, fkey, ftext, onCollectionChange, classes} = props;

  const options = items
    ? items.map(e => {
      return (<MenuItem key={fkey(e)} value={fkey(e)}>{ftext(e)}</MenuItem>)
    }) : [];

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={name} shrink>{label}</InputLabel>
        <br />
        <Field name={name}
               component={SelectAdapter}
                onChange={onCollectionChange}
                className={classes.selectEmpty}
        >{options}</Field>
      </FormControl>
    </div>
  );
}
export const Picker = withStyles(styles)(picker);

const textField = props => {
  const {name, label, multiline, onTextChange, classes} = props;

  return (
    <FormControl className={classes.formControl}>
      <MaterialTextField name={name}
                         label={label}
                         multiline={multiline}
                         InputLabelProps={{
                           shrink: true,
                         }}
                         className={classes.formControl} />
    </FormControl>
  );
}
export const TextField = withStyles(styles)(textField);

const copyrightField = props => {
  const {name, label, onValueChange, classes} = props;

  return (
    <FormControl className={classes.formControl}>
      <MaterialTextField name={name}
                         label={label}
                         className={classes.formControl}
                         InputProps={{
                           startAdornment: <InputAdornment position="start">©</InputAdornment>,
                         }}
                         InputLabelProps={{
                           shrink: true,
                         }}
                         type={'number'} />
    </FormControl>
  );
}
export const CopyrightField = withStyles(styles)(copyrightField);

const numberField = props => {
  const {name, label, onValueChange, classes} = props;

  return (
    <FormControl className={classes.formControl}>
      <MaterialTextField name={name}
                         label={label}
                         className={classes.formControl}
                         InputLabelProps={{
                           shrink: true,
                         }}
                         type={'number'} />
    </FormControl>
  );
}
export const NumberField = withStyles(styles)(numberField);

const dateField = props => {
  const {name, label, onValueChange, classes} = props;

  return (
    <FormControl className={classes.formControl}>
      <KeyboardDatePicker name={name}
                          label={label}
                          className={classes.formControl}
                          format="yyyy-MM-dd"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          dateFunsUtils={DateFnsUtils} />
    </FormControl>
  );
}
export const DateField = withStyles(styles)(dateField);

export const FileField = ({ name, ...props }) => (
  <Field name={name}>
    {({ input: { value, onChange, ...input } }) => {
      return (<input
        {...input}
        type="file"
        onChange={({ target }) => onChange(target.files)} // instead of the default target.value
        {...props}
      />
    )}}
  </Field>
)
