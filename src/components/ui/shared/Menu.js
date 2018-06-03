import { StyleSheet, css } from 'aphrodite/no-important';
import { colorPallet } from '../assets/common';
import MenuIcon from '../../../../static/assets/icons/menu.svg';
import LogoutButton from './LogoutButton';
import React from 'react';

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowing: false
    };
    
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick = () => {
    this.setState(( prevState ) => ({ isShowing: !prevState.isShowing }));
  }

  render() {
    const { isShowing } = this.state;
    return (
      <nav className={ css( styles.navContainer )}>
        <div 
          onClick={ () => this.handleMenuClick() }
          className={ css( styles.mobile )} >

          <MenuIcon className={ css( styles.svgIcon )} />

          { isShowing &&   
            <div className={ css( styles.linkGroup )} >
              <LogoutButton />
            </div>
          }
        </div>

        <div className={ css( styles.largeScreen )}  >
          <LogoutButton />
        </div>
      </nav>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    zIndex: 2,
    backgroundColor: colorPallet.primaryDark,
    borderRadius: '0 0 8px 8px',
    color: colorPallet.textPrimary,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '0',
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderBottom: `1px solid ${colorPallet.textSecundary}`,
    boxShadow: '1px 2px 4px black',
  },

  mobile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '@supports (grid-area: auto)': {
      '@media screen and (min-width: 769px)': {
        display: 'none',
      }
    }
  },

  largeScreen: {
    display: 'none',
    '@supports (grid-area: auto)': {
      '@media screen and (min-width: 769px)': {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0.25em 2em',
      }
    }
  },

  active: {
    backgroundColor: colorPallet.primaryLight,
  },

  linkGroup: {
    margin: '1em 0 .5em 0',
    display: 'flex',
    flexDirection: 'column',
    top: '0',
    position: 'relative',
    overflow: 'hidden',
    transform: 'rotate3d(1, 0, 0, 0deg)',
    boxShadow: '1px 2px 4px black',
    borderRadius: '4px',
    opacity: 1,
    animationName: {
      'from': {
        transform: 'rotate3d(1, 0, 0, 90deg)',
        opacity: 0,
      },
      'to': {
        transform: 'rotate3d(1, 0, 0, 0deg)',
        opacity: 1,
      },
    },
    animationIterationCount: '1',
    animationDuration: '.5s',
    animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',  
  },

  svgIcon: {
    fill: colorPallet.textPrimary,
    height: '2em',
    padding: '.5em',
    cursor: 'pointer',
    zIndex: 2,
  },

  link: {
    textAlign: 'center',
    backgroundColor: colorPallet.secundary,
    margin: '0',
    padding: '.5em',
    boxSizing: 'border-box',
    color: colorPallet.textSecundary,
    borderBottom: `1px solid ${colorPallet.textSecundary}`,
    textDecoration: 'none',
  },
});

export default Menu;