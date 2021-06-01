import { connect } from "react-redux";
import Admin from "../../pages/Admin/Admin";

const mapStateToProps = (state) => ({
  userInformation: state.currentUser.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
