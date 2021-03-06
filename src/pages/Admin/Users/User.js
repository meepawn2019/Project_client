import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomTable from "../../../container/components/CustomTable";
import { useQuery, gql, useMutation } from "@apollo/client";
import LoadingDialog from "../../../components/Modal/LoadingDialog";
import MainDialog from "../../../components/Modal/MainDialog";

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

const AppQuery = gql`
  query {
    user {
      _id
      userName
      email
      gender
      createAt
      birth
      banStatus
    }
  }
`;

const ADMIN_QUERY = gql`
  query {
    admin {
      _id
      userName
      email
      birth
      gender
      createAt
    }
  }
`;

const BAN_MUTATION = gql`
  mutation BanUser($email: String!) {
    banUser(email: $email) {
      userName
      banStatus
    }
  }
`;

const DELETE_ADMIN_MUTATION = gql`
  mutation DeleteRoleAdmin($email: String!) {
    deleteRoleAdmin(email: $email) {
      email
    }
  }
`;

const ADD_ADMIN_MUTATION = gql`
  mutation AddAdmin($users: [UserInput]) {
    addAdmin(users: $users) {
      _id
    }
  }
`;

const headUserCells = [
  {
    id: "_id",
    field: "_id",
    numberic: false,
    hidden: true,
    mainKey: true,
  },
  {
    id: "userName",
    field: "userName",
    numeric: false,
    disablePadding: true,
    label: "User name",
    isTh: true,
  },
  {
    id: "email",
    field: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    isTh: true,
    searchKey: true,
  },
  {
    id: "gender",
    field: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender",
    isTh: true,
  },
  {
    id: "birth",
    field: "birth",
    numeric: false,
    disablePadding: false,
    label: "Birth",
    date: true,
  },
  {
    id: "createAt",
    field: "createAt",
    numeric: false,
    disablePadding: false,
    label: "Join Date",
    date: true,
  },
  {
    id: "banStatus",
    field: "banButton",
    numeric: false,
    disablePadding: true,
    button: true,
  },
];

const headAdminCells = [
  {
    id: "_id",
    field: "_id",
    numberic: false,
    hidden: true,
    mainKey: true,
  },
  {
    id: "userName",
    field: "userName",
    numeric: false,
    disablePadding: true,
    label: "User name",
    isTh: true,
  },
  {
    id: "email",
    field: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    isTh: true,
    searchKey: true,
  },
  {
    id: "gender",
    field: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender",
    isTh: true,
  },
  {
    id: "birth",
    field: "birth",
    numeric: false,
    disablePadding: false,
    label: "Birth",
    date: true,
  },
  {
    id: "createAt",
    field: "createAt",
    numeric: false,
    disablePadding: false,
    label: "Join Date",
    date: true,
  },
  {
    id: "deleteAdmin",
    field: "deleteAdmin",
    type: "deleteButton",
    numeric: false,
    disablePadding: true,
    button: true,
    content: "X??a",
  },
];

const headReportCell = [
  {
    id: "id",
    field: "id",
    numberic: false,
    hidden: true,
    mainKey: true,
  },
  {
    id: "sender",
    field: "sender",
    numberic: false,
    label: "Ng?????i b??o c??o",
    type: "link",
    display: "userName",
    value: "id",
    linkTo: "profile",
  },
  {
    id: "reportUser",
    field: "reportUser",
    numberic: false,
    label: "Ng?????i vi ph???m",
    type: "link",
    display: "userName",
    value: "id",
    linkTo: "profile",
  },
  {
    id: "content",
    field: "content",
    numberic: false,
    label: "N???i dung vi ph???m",
  },
  {
    id: "status",
    field: "status",
    numberic: false,
    label: "Tr???ng th??i",
    type: "select",
    options: ["Hold", "Solved"],
    disableStatus: "Solved",
  },
  {
    id: "createAt",
    field: "createAt",
    numberic: false,
    label: "Ng??y b??o c??o",
  },
];

export default function User(props) {
  const { loading, error, data, refetch } = useQuery(AppQuery);
  const {
    loading: adminLoading,
    error: adminError,
    data: adminData,
    refetch: adminRefetch,
  } = useQuery(ADMIN_QUERY);
  const [report, setReport] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [err, setErr] = useState({});

  const [banUser] = useMutation(BAN_MUTATION);
  const [deleteRoleAdmin] = useMutation(DELETE_ADMIN_MUTATION);
  const [addAdmin] = useMutation(ADD_ADMIN_MUTATION);
  const classes = useStyles();

  if (loading || adminLoading) {
    return <LoadingDialog show={loading} type={"loading"} />;
  }
  if (error || adminError) {
    console.log("Error", { error });
    console.log("Error Admin", { adminError });
    // return <p>Error...</p>;
  }

  const handleBanClick = (email) => {
    banUser({ variables: { email } })
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteRoleClick = (data) => {
    const email = data.email;
    deleteRoleAdmin({ variables: { email } })
      .then((res) => {
        refetch();
        adminRefetch();
      })
      .catch((err) => {
        console.log("Error", { err });
      });
    console.log(data);
  };

  const handleAddClick = () => {
    setDialogOpen(true);
  };

  const handleAddAdmin = (value) => {
    addAdmin({ variables: { users: value } })
      .then((res) => {
        refetch();
        adminRefetch();
      })
      .catch((err) => {
        console.log("Error", { err });
      });
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className={classes.container}>
      <MainDialog
        show={dialogOpen}
        data={data && data.user ? data.user : null}
        handleAddAdmin={handleAddAdmin}
        handleClose={handleCloseDialog}
      ></MainDialog>
      <CustomTable
        columns={headUserCells}
        data={data.user}
        handleBanClick={handleBanClick}
        title="Ng?????i d??ng"
      />
      <CustomTable
        columns={headAdminCells}
        data={adminData.admin}
        title="Qu???n tr??? vi??n"
        handleDeleteClick={handleDeleteRoleClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}
