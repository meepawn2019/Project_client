import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import { Dialog, DialogContent } from "@material-ui/core";
import "./modalBody.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function MainDialog(props) {
  const { data, show, handleClose, handleAddAdmin } = props;
  const [valueArray, setValueArray] = useState([]);
  const classes = useStyles();

  const onAddAdmin = () => {
    handleAddAdmin(valueArray);
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogContent>
        <div className={classes.root}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={data}
            getOptionLabel={(option) => option.email}
            filterSelectedOptions
            onChange={(event, value) => setValueArray(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="User email"
              />
            )}
          />
          <Button
            color="primary"
            variant="contained"
            style={{ float: "right" }}
            onClick={onAddAdmin}
          >
            Thêm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
