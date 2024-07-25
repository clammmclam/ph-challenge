import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PatientModal from "./PatientModal";
import InitialsAvatar from "./InitialsAvatar";
import { capitalizeFirstLetter } from "../helpers";

const tableColumns = [
  {
    name: "Patient Name",
  },
  {
    name: "Patient Status",
  },
  {
    name: "Time",
  },
  {
    name: "Action",
  },
];

const PatientRow = ({ patient, handleReview }) => {
  const fullName = `${patient.firstName} ${patient.lastName}`;
  return (
    <TableRow key={patient.id}>
      <TableCell>
        <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <InitialsAvatar userName={fullName} />
          <Typography
            sx={{
              borderBottom: "1px solid #222",
              paddingBottom: "1px",
              fontSize: "24px",
            }}
          >
            {fullName}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: 700, fontSize: "24px" }}>
        {patient.status}
      </TableCell>
      <TableCell align="center">
        <Typography sx={{ color: "#4caf50", fontSize: "24px" }}>
          {patient.timeElapsed} hours left
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          sx={{
            borderRadius: "50px",
            backgroundColor: "#000",
            width: "193px",
            height: "52px",
            textTransform: "none",
            color: "#fff",
            fontWeight: 700,
            fontSize: "20px",
            border: "1px solid #d9d9d9",
            boxShadow: "none",
          }}
          onClick={() => handleReview(patient)}
        >
          Review Case
        </Button>
      </TableCell>
    </TableRow>
  );
};

const ConditionGroup = ({
  patients,
  handleReview,
  conditionName,
  filterValue,
}) => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={4} sx={{ borderBottom: 0 }}>
          {filterValue === "byDiagnosis" && (
            <Typography
              sx={{ fontWeight: 700, fontSize: "30px", color: "#222" }}
            >
              {capitalizeFirstLetter(conditionName)}
            </Typography>
          )}
        </TableCell>
      </TableRow>

      {patients.map((patient) => (
        <PatientRow
          key={patient.id}
          patient={patient}
          handleReview={handleReview}
        />
      ))}
    </>
  );
};

const CustomTable = ({ filterValue }) => {
  const patients = useSelector((state) => state.cases.patients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleReview = (patient) => {
    setIsModalOpen(true);
    setSelectedPatient(patient);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const groupedPatients = React.useMemo(() => {
    if (filterValue === "byDiagnosis") {
      const grouped = {};
      patients.forEach((patient) => {
        if (!grouped[patient.condition]) {
          grouped[patient.condition] = [];
        }
        grouped[patient.condition].push(patient);
      });
      return grouped;
    } else {
      return { All: patients };
    }
  }, [filterValue, patients]);

  if (!patients.length) {
    return (
      <Box sx={{ mt: 1 }}>
        <Typography>No patients found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ border: "1px solid #c4c4c4", height: "63px" }}>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  key={column.name}
                  align="center"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    borderColor: "#c4c4c4",
                  }}
                >
                  <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
                    {column.name}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ mt: 4 }}>
            {Object.entries(groupedPatients).map(([condition, patients]) => (
              <ConditionGroup
                key={condition}
                patients={patients}
                handleReview={handleReview}
                conditionName={condition}
                filterValue={filterValue}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && selectedPatient && (
        <PatientModal
          isModalOpen={isModalOpen}
          handleClose={closeModal}
          patient={selectedPatient}
        />
      )}
    </Box>
  );
};

export default CustomTable;
