import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { Link, useRouteMatch, useLocation } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SimpleTabs() {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  let query = useQuery();

  const tabList = [`questions`, `posts`, `topics`, `friends`];

  let index = tabList.findIndex((value) =>
    Boolean(value) ? value === query.get("tab") : 0
  )+1;
  const [value, setValue] = React.useState(index);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="Câu trả lời"
            {...a11yProps(0)}
            component={Link}
            to={`${url}`}
          />
          <Tab
            label="Câu hỏi"
            {...a11yProps(1)}
            component={Link}
            to={`${url}?tab=questions`}
          />

          <Tab
            label="Chủ đề"
            {...a11yProps(2)}
            component={Link}
            to={`${url}?tab=topics`}
          />
          <Tab
            label="Bạn bè"
            {...a11yProps(3)}
            component={Link}
            to={`${url}?tab=friends`}
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
