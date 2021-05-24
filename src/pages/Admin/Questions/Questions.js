import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { useQuery, gql, useMutation } from "@apollo/client";
import LoadingDialog from "../../../components/Modal/LoadingDialog";

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
    question {
      owner {
        id
        userName
      }
      id
      question
      createAt
    }
  }
`;

// const REPORT_USER_QUERY = gql`
//   query {
//     reportUser {
//       id
//       sender {
//         id
//         userName
//       }
//       reportUser {
//         id
//         userName
//       }
//       content
//       status
//       createAt
//     }
//   }
// `;

// const BAN_MUTATION = gql`
//   mutation BanUser($email: String!) {
//     banUser(email: $email) {
//       userName
//       password
//       banStatus
//     }
//   }
// `;

// const REPORT_MUTATION = gql`
//   mutation ReportUserHandleMutation($id: ID!, $status: String!) {
//     updateReportUserMutation(id: $id, status: $status) {
//       id
//       status
//     }
//   }
// `;

const headQuestionCell = [
  {
    id: "id",
    field: "id",
    numberic: false,
    hidden: true,
    mainKey: true,
  },
  {
    id: "owner",
    field: "owner",
    numberic: false,
    label: "Người hỏi",
    type: "link",
    display: "userName",
    value: "id",
    linkTo: "profile",
  },
  {
    id: "question",
    field: "question",
    numberic: false,
    label: "Câu hỏi",
    type: "link",
    display: "question",
    value: "id",
    linkTo: "question",
  },
  {
    id: "createAt",
    field: "createAt",
    numberic: false,
    label: "Ngày hỏi",
  },
];

export default function Question(props) {
  const { loading, error, data, refetch } = useQuery(AppQuery);
  const [report, setReport] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    console.log(data);
  }, [error, data]);

  if (loading) {
    return <LoadingDialog show={loading} />;
  }
  if (error) {
    // console.log(error);
    // return <p>Error...</p>;
  }
  return (
    <div className={classes.container}>
      <CustomTable
        columns={headQuestionCell}
        data={data.question}
        title="Câu hỏi"
      />
    </div>
  );
}
