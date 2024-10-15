import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useCounter } from "@uidotdev/usehooks";

// Define a custom styled TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "#fff", // Label color
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff", // Border color
    },
    "&:hover fieldset": {
      borderColor: "#fff", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff", // Border color when focused
    },
  },
  "& .MuiInputBase-input": {
    color: "#fff", // Input text color
  },
  "& .MuiFormHelperText-root": {
    color: "#fff", // Helper text color
  },
}));

interface ReusableTextFieldProps {
  label: string;
  defaultValue?: string; // Optional
  helperText?: string; // Optional
  placeholder?: string; // Optional
  value?: string; // Optional
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional
}

const InputField: React.FC<ReusableTextFieldProps> = ({
  label,
  defaultValue = "",
  helperText,
  placeholder,
  value,
  onChange,
}) => {
  const MAX_WORDS = 20;
  const [count, { increment, decrement, set, reset }] = useCounter(0, {
    min: 0,
    max: MAX_WORDS,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const words = text.trim().split(/\s+/).filter(Boolean); // Split by spaces and filter out empty strings

    // Check the word count and limit it
    if (words.length <= MAX_WORDS) {
      set(words.length); // Update the word count
      onChange?.(event);
    }
  };

  // Effect to ensure value stays within limits
  useEffect(() => {
    if (value) {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > MAX_WORDS) {
        const limitedValue = words.slice(0, MAX_WORDS).join(" ");
        set(MAX_WORDS); // Reset count to MAX_WORDS if exceeded
        onChange?.({
          target: { value: limitedValue },
        } as React.ChangeEvent<HTMLInputElement>);
      } else {
        set(words.length); // Update word count if within limits
      }
    }
  }, [value, onChange, set, MAX_WORDS]);

  return (
    <>
      <StyledTextField
        label={label}
        defaultValue={defaultValue}
        helperText={helperText}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        variant="outlined" // You can change the variant as needed
        fullWidth // Optional: Makes the TextField take full width
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <span className="text-right text-sm">
        {count}/{MAX_WORDS}
      </span>
    </>
  );
};

export default InputField;
