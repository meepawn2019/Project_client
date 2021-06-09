import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import SearchBar from "../SearchBar/SearchBar";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  addButton: {
    margin: "20px 20px 0",
  },
}));
export default function EnhancedToolbar(props) {
  const classes = useToolbarStyles();
  const {
    numSelected,
    columns,
    data,
    handleSearch,
    title,
    searchable,
    handleAddClick,
    ...rest
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {handleAddClick && (
        <Button
          color="primary"
          variant="contained"
          onClick={handleAddClick}
          className={classes.addButton}
        >
          Add
        </Button>
      )}
      {searchable && (
        <SearchBar
          searchData={data}
          searchField={columns.find((el) => el.searchKey).id}
          handleSearch={handleSearch}
          key={title}
        />
      )}
    </Toolbar>
  );
}
