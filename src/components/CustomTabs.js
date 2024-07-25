import * as React from "react";
import { Grid, Tab, Tabs } from "@mui/material";

export default function CustomTabs({ tabs, tabValue, handleTabChange }) {
  return (
    <Grid container spacing={2} alignItems="center" mt={2}>
      <Grid item xs={12} md={6}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="patient status tabs"
          sx={{
            p: "0 10px",
            "& .css-1pls3aa-MuiButtonBase-root-MuiTab-root.Mui-selected": {
              color: "#4CAF50",
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              sx={{
                color: "#4CAF50",
                fontWeight: "bold",
                textTransform: "none",
              }}
              value={tab.value}
              label={tab.label}
            />
          ))}
        </Tabs>
      </Grid>
    </Grid>
  );
}
