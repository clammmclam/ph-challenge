import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";

export default function CustomFilters({
  filters,
  filterValue,
  handleFilterChange,
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const renderMenuItem = (filter) => {
    const isSelected = filter.value === filterValue;
    return (
      <MenuItem key={filter.value} value={filter.value}>
        {menuOpen && isSelected && (
          <CheckIcon sx={{ position: "absolute", height: 12, width: 12 }} />
        )}
        <Typography sx={{ ml: "25px", fontSize: "20px" }}>
          {filter.label}
        </Typography>
      </MenuItem>
    );
  };

  return (
    <FormControl fullWidth variant="outlined" sx={{ pt: 0 }}>
      <Select
        id="filter"
        value={filterValue}
        onChange={handleFilterChange}
        onOpen={handleMenuOpen}
        onClose={handleMenuClose}
        IconComponent={ExpandMoreIcon}
        MenuProps={{
          MenuListProps: {
            disablePadding: true,
          },
        }}
        sx={{
          height: "44px",
          width: "100%",
          maxWidth: "212px",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor: "#fff",
          margin: { xs: "10px", sm: 0 },
          position: { sm: "absolute" },
          right: { sm: "12px" },
          top: { sm: 0 },
          ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select p":
            {
              margin: 0,
            },
          "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
            {
              p: "10px",
            },
          "& .css-3s0lx8-MuiSvgIcon-root": {
            height: 0,
            width: 0,
          },
          "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
            color: "#000",
          },
          "& .css-42y3ld-MuiList-root-MuiMenu-list": {
            height: "101px",
            width: "202px",
          },
        }}
      >
        {filters.map((filter) => renderMenuItem(filter))}
      </Select>
    </FormControl>
  );
}
