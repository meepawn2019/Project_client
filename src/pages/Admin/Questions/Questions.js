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
        _id
        userName
      }
      _id
      question
      createAt
    }
  }
`;

const REPORT_QUESTION_QUERY = gql`
  query {
    reportedQuestion {
      _id
      reporter {
        _id
        userName
      }
      reported {
        _id
        question
      }
      reportDetail
      status
      createAt
    }
  }
`;

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
    id: "_id",
    field: "_id",
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
    value: "_id",
    linkTo: "profile",
  },
  {
    id: "question",
    field: "question",
    numberic: false,
    label: "Câu hỏi",
    type: "link",
    display: "question",
    value: "_id",
    linkTo: "question",
    searchKey: true,
  },
  {
    id: "createAt",
    field: "createAt",
    numberic: false,
    label: "Ngày hỏi",
  },
];

const headReportCell = [
  {
    id: "_id",
    field: "_id",
    numberic: false,
    hidden: true,
    mainKey: true,
  },
  {
    id: "reporter",
    field: "reporter",
    numberic: false,
    label: "Người báo cáo",
    type: "link",
    display: "userName",
    value: "_id",
    linkTo: "profile",
  },
  {
    id: "reported",
    field: "reported",
    numberic: false,
    label: "Câu hỏi vi phạm",
    type: "link",
    display: "question",
    value: "_id",
    linkTo: "question",
  },
  {
    id: "reportDetail",
    field: "reportDetail",
    numberic: false,
    label: "Nội dung vi phạm",
    array: true,
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

const REPORT_MUTATION = gql`
  mutation ReportQuestionHandleMutation($id: ID!, $status: String!) {
    updateReportQuestionMutation(id: $id, status: $status) {
      _id
      status
    }
  }
`;

export default function Question(props) {
  const { loading, error, data, refetch } = useQuery(AppQuery);
  const {
    loading: reportLoading,
    error: reportError,
    data: reportData,
    refetch: refetchReport,
  } = useQuery(REPORT_QUESTION_QUERY);
  const [report, setReport] = useState([]);
  const [updateReport] = useMutation(REPORT_MUTATION);
  const classes = useStyles();

  useEffect(() => {
    if (!reportLoading) {
      setReport(reportData.reportedQuestion);
    }
  }, [reportData, reportLoading]);

  if (loading || reportLoading) {
    return <LoadingDialog show={loading} type={"loading"} />;
  }
  if (error || reportError) {
    // console.log(error);
    // return <p>Error...</p>;
  }

  const handleSelectReportStatus = (selectedValue, data) => {
    console.log(data._id);
    updateReport({ variables: { id: data._id, status: selectedValue } })
      .then((res) => {
        console.log(res);
        const isSelected = (element) => element._id === data._id;
        const selectedIndex = report.findIndex(isSelected);
        let newReport = [...report];
        newReport[selectedIndex] = {
          ...newReport[selectedIndex],
          status: selectedValue,
        };
        setReport(newReport);
      })
      .catch((err) => {
        console.log("err", { err });
      });
  };

  return (
    <div className={classes.container}>
      <CustomTable
        columns={headQuestionCell}
        data={data.question}
        title="Câu hỏi"
      />
      <CustomTable
        columns={headReportCell}
        data={report}
        title="Báo cáo vi phạm"
        handleSelectChange={handleSelectReportStatus}
      />
    </div>
  );
}
