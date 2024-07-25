import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import CustomDivider from "./CustomDivider";
import CustomTable from "./CustomTable";
import Grid from "@mui/material/Grid";
import CustomFilters from "./CustomFilters";
import CustomTabs from "./CustomTabs";
import { useDispatch, useSelector } from "react-redux";
import {
  setPatients,
  setLoading,
  setError,
} from "../redux/reducers/caseReducer";
import { Typography } from "@mui/material";

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

const tabPanelStyles = { p: 0, mb: 5, mt: 1 };

export default function CustomTableHeader() {
  const [filter, setFilterView] = React.useState("noFilter");
  const [tabView, setTabView] = React.useState("pending");

  const dispatch = useDispatch();
  const patients = useSelector((state) => state.cases.patients);
  const loading = useSelector((state) => state.cases.loading);
  const error = useSelector((state) => state.cases.error);

  React.useEffect(() => {
    dispatch(setLoading(true));
    fetch("http://localhost:3001/patients")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Encountered HTTP error with status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setPatients(data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        dispatch(setError(error.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

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

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error</Typography>;
  }

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
        <CustomTable filterValue={filter} />
      </TabPanel>
      <TabPanel value="completed" sx={tabPanelStyles}>
        <Typography>No patients found</Typography>
      </TabPanel>
    </TabContext>
  );
}
