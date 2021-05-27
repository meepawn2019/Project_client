import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { useQuery, gql, useMutation } from "@apollo/client";
import LoadingDialog from "../../../components/Modal/LoadingDialog";
import MainDialog from "../../../components/Modal/MainDialog";
import { coerceInputValue } from "graphql";

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
      userName
      email
      gender
      createAt
      banStatus
    }
  }
`;

const ADMIN_QUERY = gql`
  query {
    admin {
      id
      userName
      email
      gender
      createAt
    }
  }
`;

const REPORT_USER_QUERY = gql`
  query {
    reportUser {
      id
      sender {
        id
        userName
      }
      reportUser {
        id
        userName
      }
      content
      status
      createAt
    }
  }
`;

const BAN_MUTATION = gql`
  mutation BanUser($email: String!) {
    banUser(email: $email) {
      userName
      password
      banStatus
    }
  }
`;

const REPORT_MUTATION = gql`
  mutation ReportUserHandleMutation($id: ID!, $status: String!) {
    updateReportUserMutation(id: $id, status: $status) {
      id
      status
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
      id
    }
  }
`;

const headUserCells = [
  {
    id: "userName",
    field: "userName",
    numeric: false,
    disablePadding: true,
    label: "User name",
    isTh: true,
    searchKey: true,
    mainKey: true,
  },
  {
    id: "email",
    field: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    isTh: true,
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
    id: "id",
    field: "id",
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
    searchKey: true,
    mainKey: true,
  },
  {
    id: "email",
    field: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    isTh: true,
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
    content: "Xóa",
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
    label: "Người báo cáo",
    type: "link",
    display: "userName",
    value: "id",
    linkTo: "profile",
  },
  {
    id: "reportUser",
    field: "reportUser",
    numberic: false,
    label: "Người vi phạm",
    type: "link",
    display: "userName",
    value: "id",
    linkTo: "profile",
  },
  {
    id: "content",
    field: "content",
    numberic: false,
    label: "Nội dung vi phạm",
  },
  {
    id: "status",
    field: "status",
    numberic: false,
    label: "Trạng thái",
    type: "select",
    options: ["Hold", "Solved"],
    disableStatus: "Solved",
  },
  {
    id: "createAt",
    field: "createAt",
    numberic: false,
    label: "Ngày báo cáo",
  },
];

export default function User(props) {
  const { loading, error, data, refetch } = useQuery(AppQuery);
  const {
    loading: reportLoading,
    error: reportError,
    data: reportData,
  } = useQuery(REPORT_USER_QUERY);
  const {
    loading: adminLoading,
    error: admninError,
    data: adminData,
    refetch: adminRefetch,
  } = useQuery(ADMIN_QUERY);
  const [report, setReport] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!reportLoading) {
      setReport(reportData.reportUser);
    }
  }, [reportData, reportLoading]);

  const [banUser] = useMutation(BAN_MUTATION);
  const [updateReport] = useMutation(REPORT_MUTATION);
  const [deleteRoleAdmin] = useMutation(DELETE_ADMIN_MUTATION);
  const [addAdmin] = useMutation(ADD_ADMIN_MUTATION);
  const classes = useStyles();
  useEffect(() => {}, [loading, reportLoading, adminLoading]);

  if (loading || reportLoading || adminLoading) {
    return <LoadingDialog show={loading} />;
  }
  if (error) {
    // console.log(error);
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

  const handleSelectReportStatus = (selectedValue, data) => {
    console.log(data.id);
    updateReport({ variables: { id: data.id, status: selectedValue } })
      .then((res) => {
        const isSelected = (element) => element.id === data.id;
        const selectedIndex = report.findIndex(isSelected);
        let newReport = [...report];
        newReport[selectedIndex] = {
          ...newReport[selectedIndex],
          status: selectedValue,
        };
        setReport(newReport);
      })
      .catch((err) => {
        console.log(err);
      });
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
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className={classes.container}>
      <MainDialog
        show={dialogOpen}
        data={data.user}
        handleAddAdmin={handleAddAdmin}
        handleClose={handleCloseDialog}
      ></MainDialog>
      <CustomTable
        columns={headUserCells}
        data={data.user}
        handleBanClick={handleBanClick}
        title="Người dùng"
      />
      <CustomTable
        columns={headReportCell}
        data={report}
        title="Báo cáo vi phạm"
        handleSelectChange={handleSelectReportStatus}
      />
      <CustomTable
        columns={headAdminCells}
        data={adminData.admin}
        title="Quản trị viên"
        handleDeleteClick={handleDeleteRoleClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}
