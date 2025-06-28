import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ label = "Agreement Created By", options = [], value: propValue, onChange: propOnChange, sx = {}, ...other }) {
  const [value, setValue] = React.useState(propValue || '');

  const handleChange = (event) => {
    setValue(event.target.value);
    if (propOnChange) {
      propOnChange(event);
    }
  };

  React.useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue);
    }
  }, [propValue]);

  return (
    <Box component="form" sx={{ 
        '& > :not(style)': { width: '100%' },
        outline: 'none',
        '&:focus-visible': { outline: 'none' },
        ...sx
      }} {...other}>
      <FormControl fullWidth>
        <InputLabel id="basic-select-label">{label}</InputLabel>
        <Select
          labelId="basic-select-label"
          id="basic-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.length > 0 ? options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )) : (
            <>
              <MenuItem value={10}>Payer</MenuItem>
              <MenuItem value={20}>Receiver</MenuItem>
            </>
          )}
        </Select> 
      </FormControl>
    </Box>
  );
}

BasicSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })),
  value: PropTypes.any,
  onChange: PropTypes.func,
  sx: PropTypes.object,
};

BasicSelect.defaultProps = {
  label: "Select Option",
  options: [],
  value: undefined,
  onChange: undefined,
  sx: {},
};
