import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import CustomDivider from "./CustomDivider";
import CustomTable from "./CustomTable";
import Grid from "@mui/material/Grid";
import CustomFilters from "./CustomFilters";
import CustomTabs from "./CustomTabs";

const defaultFilters = [
  {
    label: "No filter",
    value: "noFilter",
  },
  {
    label: "By diagnosis",
    value: "byDiagnosis",
  },
];

const tabPanelStyles = { p: 0, mb: 5 };

export default function CustomTableHeader() {
  const [filter, setFilterView] = React.useState("noFilter");
  const [tabView, setTabView] = React.useState("pending");
  const [patients, setPatients] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/patients")
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilterView(e.target.value);
  };

  const handleTabChange = (_, newValue) => {
    setTabView(newValue);
  };

  const defaultTabs = React.useMemo(
    () => [
      {
        label: `Pending (${patients.length})`,
        value: "pending",
      },
      {
        label: "Completed",
        value: "completed",
      },
    ],
    [patients.length]
  );

  return (
    <TabContext value={tabView}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          <CustomTabs
            handleTabChange={handleTabChange}
            tabs={defaultTabs}
            tabValue={tabView}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomFilters
            filters={defaultFilters}
            filterValue={filter}
            handleFilterChange={handleFilterChange}
          />
        </Grid>
      </Grid>

      <CustomDivider />

      <TabPanel value="pending" sx={tabPanelStyles}>
        <CustomTable filterValue={filter} patients={patients} />
      </TabPanel>
      <TabPanel value="completed" sx={tabPanelStyles}>
        <CustomTable filterValue={filter} patients={[]} />
      </TabPanel>
    </TabContext>
  );
}
