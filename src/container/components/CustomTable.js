import { connect } from "react-redux";
import CustomTable from "../../components/CustomTable/CustomTable";

const mapStateToProps = (state) => ({
  userInformation: state.currentUser.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);
