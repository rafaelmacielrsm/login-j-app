import { connect } from 'react-redux';
import UserProfile from '../ui/UserProfile';

const mapStateToProps = ( state ) => {
  return {
    isFetching: state.fetching,
    userData: state.userData,
  };
};

const Container = connect( mapStateToProps, null )( UserProfile );

export default Container;