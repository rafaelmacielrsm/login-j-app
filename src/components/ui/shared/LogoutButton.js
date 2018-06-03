import { defaultButton } from '../assets/common';
import t from '../../../config/locales';
import { logoutUser } from '../../../store/actions';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';

const LogoutButton = ({ onClickHandle }) => {
  return(
    <button 
      onClick={ onClickHandle }
      className={ css( styles.defaultButton )}>
      { t( 'label.button.logout' ) }
    </button>
  );  
};

const styles = StyleSheet.create({
  defaultButton,
});

const mapDispatchToProps = ( dispatch ) => ({
  onClickHandle: () => dispatch( logoutUser() )
});

export default connect(null, mapDispatchToProps)(LogoutButton);