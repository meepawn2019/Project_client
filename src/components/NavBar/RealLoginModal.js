import Modal from "@material-ui/core/Modal";
import LoginModal from "../../components/Modal/LoginModal";
// import RegisterModal from "../../components/Modal/RegisterModal";
import QuestionModal from "../../components/Modal/QuestionModal";
import ArticleModal from "../../components/Modal/ArticleModal";

export default function RealLoginModal({
  modalLogInShow,
  handleLogInModalClose,
}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalLogInShow}
        backgroundColor="red"
        onClose={handleLogInModalClose}
      >
        <QuestionModal />
      </Modal>
    </div>
  );
}
