import React from 'react';
import t from '../../config/locales';
import { StyleSheet, css } from 'aphrodite';
import Link from 'next/link';
import { 
  fluidValue,
  fadeInAnimation,
  colorPallet,
  defaultButton,
  primaryCard } from '../ui/assets/common';

class UserProfile extends React.Component {
  render() {
    const { name, username, email } = this.props.userData;

    return (
      <article className={ css( styles.card, styles.fadeInAnimation )}  >
        <header>
          <h1>{ t( 'page.profile.title' ) }</h1>
        </header>

        <section className={ css( styles.textSection )} >
          <p className={ css( styles.paragraph )} >
            <span>{ t( 'label.name' )}:</span> { name }
          </p>
          
          <p className={ css( styles.paragraph )} >
            <span>{ t( 'label.email' )}:</span> { email }
          </p>

          <p className={ css( styles.paragraph )} >
            <span>{ t( 'label.username' )}:</span> { username }
          </p>
        </section>
          
        <Link prefetch href='/user/edit'>
          <span className={ css( styles.defaultButton, styles.editButton )} >
            { t( 'label.button.edit' ) }
          </span>          
        </Link>
      </article>
    );
  }
}

const styles = StyleSheet.create({
  card: primaryCard.body,

  textSection: {
    textAlign: 'left',
    width: '100%',
  },

  paragraph: {
    backgroundColor: colorPallet.primaryLight,
    border: '1px solid black',
    borderRadius: '4px',
    padding: '5px 5px',
    fontSize: 16,
    lineHeight: '26px',
    '@media screen and (min-width: 320px)':{
      fontSize: fluidValue(16,20),
      lineHeight: fluidValue(26, 36),
    },
    '@media screen and (min-width: 768px)':{
      fontSize: 20,
      lineHeight: '36px',
    },
  },

  fadeInAnimation: fadeInAnimation,

  defaultButton,
  editButton: {
    alignSelf: 'flex-end',
    backgroundColor: colorPallet.secundary,
    ':hover': {
      backgroundColor: colorPallet.secundaryDark,
    },
  }
});

export default UserProfile;