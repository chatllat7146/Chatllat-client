import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DisputeSelect({ label = "Dispute Category", options = [], value: propValue, onChange: propOnChange, sx = {}, ...other }) {
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
        <InputLabel id="dispute-select-label">{label}</InputLabel>
        <Select
          labelId="dispute-select-label"
          id="dispute-category"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.length > 0 ? (options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
          ) : (
            [
              <MenuItem key="work" value="Work Quality">Work Quality</MenuItem>,
              <MenuItem key="deadline" value="Missed Deadline">Missed Deadline</MenuItem>,
              <MenuItem key="unclear" value="Unclear Requirements">Unclear Requirements</MenuItem>,
              <MenuItem key="non-delivery" value="Non-Delivery of Work">Non-Delivery of Work</MenuItem>,
              <MenuItem key="milestone" value="Milestone Completion">Milestone Completion</MenuItem>,
              <MenuItem key="unresponsive" value="Unresponsive Communication">Unresponsive Communication</MenuItem>,
              <MenuItem key="violation" value="Violation of Terms">Violation of Terms</MenuItem>,
              <MenuItem key="breach" value="Breach of Contract">Breach of Contract</MenuItem>,
            ]
          )}
        </Select>
      </FormControl>
    </Box>
  );
}

DisputeSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })),
  value: PropTypes.any,
  onChange: PropTypes.func,
  sx: PropTypes.object,
};

DisputeSelect.defaultProps = {
  label: "Select Option",
  options: [],
  value: undefined,
  onChange: undefined,
  sx: {},
};
