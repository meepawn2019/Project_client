import { connect } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";

const mapStateToProps = (state) => ({
  userInformation: state.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
