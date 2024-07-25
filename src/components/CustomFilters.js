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
        <Typography sx={{ ml: "25px" }}>{filter.label}</Typography>
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
          textAlign: "center",
          "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
            {
              p: "10px",
            },
          "& .css-1esuyd3-MuiTypography-root": {
            m: 0,
          },
          "& .css-3s0lx8-MuiSvgIcon-root": {
            height: 0,
            width: 0,
          },
        }}
      >
        {filters.map((filter) => renderMenuItem(filter))}
      </Select>
    </FormControl>
  );
}
