import * as React from "react";
import { Grid, Tab, Tabs, Typography } from "@mui/material";

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
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={
                <Typography
                  sx={{
                    color: "#4CAF50",
                    fontSize: "20px",
                    fontWeight: 800,
                    textTransform: "none",
                  }}
                >
                  {tab.label}
                </Typography>
              }
            />
          ))}
        </Tabs>
      </Grid>
    </Grid>
  );
}
