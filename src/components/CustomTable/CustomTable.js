import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Select from "@material-ui/core/Select";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import EnhancedToolbar from "./EnhancedToolbar";
import EnhancedTableHeader from "./EnhancedTableHeader";
import { Button } from "@material-ui/core";
// import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default function CustomTable(props) {
  const { columns, data, title, handleAddClick, ...rest } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState(data);
  const [searchable, setSearchable] = useState(
    columns.find((el) => el.searchKey) ? true : false
  );

  useEffect(() => {
    const searchKey = columns.find((el) => el.searchKey)
      ? columns.find((el) => el.searchKey).id
      : null;
    if (searchKey) {
      const type = columns.find((el) => el.searchKey).type;
      const valueLink = columns.find((el) => el.searchKey).value;
      if (type === "link") {
        setSearchData(
          data.filter((element) => {
            return element[searchKey].toLowerCase().includes(searchText);
          })
        );
      } else {
        setSearchData(
          data.filter((element) => {
            return element[searchKey].toLowerCase().includes(searchText);
          })
        );
      }
    } else {
      setSearchData(data);
    }
  }, [columns, data, searchText]);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map(
        (n) => n[columns.find((el) => el.mainKey).id]
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleBanClick = (e, data) => {
    e.stopPropagation();
    rest.handleBanClick(data.email);
  };

  const handleDeleteClick = (e, data) => {
    e.stopPropagation();
    rest.handleDeleteClick(data);
  };

  const handleSelectChange = (e, data) => {
    e.stopPropagation();
    rest.handleSelectChange(e.target.value, data);
  };

  const handleSearch = (searchValue) => {
    const searchKey = columns.find((el) => el.searchKey).id;
    setSearchText(searchValue);
    setSearchData(
      data.filter((element) =>
        element[searchKey].toLowerCase().includes(searchText)
      )
    );
  };

  const LinkRender = (display, value, linkTo) => {
    return (
      <TableCell align="left" key={value}>
        <Link to={`/${linkTo}/${value}`}>{display}</Link>
      </TableCell>
    );
  };

  const SelectRender = (options, value, data, disableStatus) => {
    return (
      <TableCell align="left" key={value}>
        <Select
          native
          value={value}
          onChange={(event) => handleSelectChange(event, data)}
          onClick={(event) => {
            event.stopPropagation();
          }}
          disabled={disableStatus && value === disableStatus}
        >
          {options.map((el, index) => {
            return (
              <option key={index} value={el}>
                {el}
              </option>
            );
          })}
        </Select>
      </TableCell>
    );
  };

  const DeleteButtonRender = (label, data, value) => {
    return (
      <TableCell align="left" key={value}>
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => handleDeleteClick(event, data)}
        >
          {label}
        </Button>
      </TableCell>
    );
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, searchData.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedToolbar
          numSelected={selected.length}
          columns={columns}
          data={data}
          searchable={searchable}
          handleSearch={handleSearch}
          title={title}
          handleAddClick={handleAddClick}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={searchData.length}
              columns={columns}
            />
            <TableBody>
              {stableSort(searchData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row[columns[0]["id"]]);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(
                          event,
                          row[columns.find((el) => el.mainKey).id]
                        )
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      {columns
                        .filter((element) => {
                          if (element.hidden) {
                            return false;
                          }
                          return true;
                        })
                        .map((column, i) => {
                          let newEl;
                          if (column.date) {
                            newEl = formatDate(row[column.id]);
                          } else {
                            newEl = row[column.id];
                          }
                          if (column.type === "link") {
                            let display;
                            let value;
                            if (newEl[column.display]) {
                              display = newEl[column.display];
                            } else {
                              display = row[column.display];
                            }
                            if (newEl[column.value]) {
                              value = newEl[column.value];
                            } else {
                              value = row[column.value];
                            }
                            return LinkRender(display, value, column.linkTo);
                          }
                          if (column.type === "select") {
                            return SelectRender(
                              column.options,
                              newEl,
                              row,
                              column.disableStatus
                            );
                          }
                          if (column.type === "deleteButton") {
                            return DeleteButtonRender(
                              column.content,
                              row,
                              newEl
                            );
                          }
                          return (
                            <TableCell
                              key={`${column["id"]}_${i}`}
                              align={column.numeric ? "right" : "left"}
                              id={labelId}
                              component="th"
                            >
                              {column.field === "banButton" ? (
                                <Button
                                  color="primary"
                                  variant="contained"
                                  onClick={(event) =>
                                    handleBanClick(event, row)
                                  }
                                >
                                  {newEl ? "Unban" : "Ban"}
                                </Button>
                              ) : (
                                newEl
                              )}
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
