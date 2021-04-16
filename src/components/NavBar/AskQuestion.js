import Modal from "@material-ui/core/Modal";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  ask: {
    position: "absolute",
    width: "90vw",
    height: "50vh",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    margin: "auto",
    justifySelf: "center",
    flexShrink: 'true',
  },
}));

export default function AskQuestionModal(props) {
  const { handleClose, modalShow } = props;
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalShow}
      backgroundColor="white"
      onClose={handleClose}
    >
      <div className={classes.ask}>
        <p>Hello my fen</p>
      </div>
    </Modal>
  );
}
