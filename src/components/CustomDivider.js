import React from "react";
import PropTypes from "prop-types";
import { Divider, Box } from "@mui/material";

export default function CustomDivider({ pt, pb }) {
  return (
    <Box sx={{ width: "100%", pt, pb }}>
      <Divider sx={{ borderColor: "#D9D9D9" }} />
    </Box>
  );
}

CustomDivider.propTypes = {
  pt: PropTypes.number,
  pb: PropTypes.number,
};

CustomDivider.defaultProps = {
  pt: 0,
  pb: 0,
};
