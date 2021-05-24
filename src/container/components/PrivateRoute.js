import { connect } from "react-redux";
import PrivateRoute from "../../PrivateRoute";

const mapStateToProps = (state) => ({
  userInformation: state.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
