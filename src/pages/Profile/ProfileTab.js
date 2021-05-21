import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { Link, useRouteMatch } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "row",
    width: "90vw",
    [theme.breakpoints.up(900)]: {
      width: 810,
    },
  },
  tab: {
    flexGrow: 2,
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProfileTab(props) {
  const classes = useStyles();
  const url = useRouteMatch().url;
  const query = props.initTab;

  let index = query ? 1 : 0;
  const [value, setValue] = React.useState(index);

  const handleChange = (event, newValue) => {
    // setTab(query ? "questions" : null);
    setValue(newValue);
  };
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs className={classes.root} value={value} onChange={handleChange}>
          <Tab
            className={classes.tab}
            label="Câu trả lời"
            {...a11yProps(0)}
            component={Link}
            to={`${url}`}
          />
          <Tab
            className={classes.tab}
            label="Câu hỏi"
            {...a11yProps(1)}
            component={Link}
            to={`${url}?tab=questions`}
          />
          <Tab
            className={classes.tab}
            label="Chủ đề"
            {...a11yProps(2)}
            // component={Link}
            // to={`${url}?tab=topics`}
          />

          <Tab
            className={classes.tab}
            label="Bạn bè"
            {...a11yProps(3)}
            // component={Link}
            // to={`${url}?tab=friends`}
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
