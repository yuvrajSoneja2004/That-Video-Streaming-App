import React from "react";
import { AppBar, Tabs, Tab, styled } from "@mui/material";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "black",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  minHeight: "36px",
  padding: "6px 16px",
  fontSize: 12,
}));

const StyledTabs = styled(Tabs)({
  minHeight: "36px",
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#0f0f0f",
  marginTop: 100,
  marginBottom: 40,
});

const tabs = [
  "All",
  "Shorts",
  "Videos",
  "Unwatched",
  "Watched",
  "Recently uploaded",
  "Live",
  "Song",
];

function ResultsPageSimpleFilter() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledAppBar position="static">
      <StyledTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="navigation tabs"
      >
        {tabs.map((tab, index) => (
          <StyledTab key={index} label={tab} />
        ))}
      </StyledTabs>
    </StyledAppBar>
  );
}

export default ResultsPageSimpleFilter;
