import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";

// Define a custom styled Select
const StyledInputFile = styled(Select)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "#fff", // Label color
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff", // Border color
  },
  "& .MuiInputBase-root": {
    color: "#fff", // Input text color
  },
  "& .MuiSvgIcon-root": {
    color: "#fff", // Dropdown arrow color
  },
  "& .MuiInputLabel-shrink": {
    color: "#fff", // Label color when focused
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff", // Border color on hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff", // Border color when focused
  },
}));

function SelectOptions({ value, options, onChange }: any) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" style={{ color: "#fff" }}>
        Age
      </InputLabel>
      {/* Use the custom styled select component */}
      <StyledInputFile
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value} // Set the current value
        label="Age"
        onChange={onChange} // Handle changes
      >
        {options &&
          options.map((option: string, index: number) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
      </StyledInputFile>
    </FormControl>
  );
}

export default SelectOptions;
