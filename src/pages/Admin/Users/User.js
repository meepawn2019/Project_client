import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomTable from "../../../components/CustomTable/CustomTable";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 260px)",
      marginLeft: 240,
    },
    width: "500px",
    bottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    marginTop: "70px",
    borderRadius: "20px",
  },
}));

function createData(name, calories, fat, carbs, protein, banned) {
  return { name, calories, fat, carbs, protein, banned };
}

const fakeData = [
  createData("Cupcake", 305, 3.7, 67, 4.3, true),
  createData("Donut", 452, 25.0, 51, 4.9, false),
  createData("Eclair", 262, 16.0, 24, 6.0, false),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, false),
  createData("Gingerbread", 356, 16.0, 49, 3.9, false),
  createData("Honeycomb", 408, 3.2, 87, 6.5, false),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, false),
  createData("Jelly Bean", 375, 0.0, 94, 0.0, false),
  createData("KitKat", 518, 26.0, 65, 7.0, false),
  createData("Lollipop", 392, 0.2, 98, 0.0, false),
  createData("Marshmallow", 318, 0, 81, 2.0, false),
  createData("Nougat", 360, 19.0, 9, 37.0, false),
  createData("Oreo", 437, 18.0, 63, 4.0, false),
];

const headCells = [
  {
    id: "name",
    field: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
    isTh: true,
  },
  {
    id: "calories",
    field: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    field: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    field: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    field: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
  {
    id: "banButton",
    numeric: false,
    disablePadding: true,
    button: true,
    label: "Ban",
  },
];

export default function User() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CustomTable columns={headCells} data={fakeData} />
    </div>
  );
}
