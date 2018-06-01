import React from 'react';
import t from '../../config/locales';
import { StyleSheet, css } from 'aphrodite';
import { primaryCard } from '../ui/assets/common';

class UserProfile extends React.Component {
  render() {
    const { name, id, username, email, resume } = this.props.userData;

    return (
      <article  >

        <section className={ css( styles.card )}>id: { id }</section>
          
        <section className={ css( styles.card )}>
          name: { name }
        </section>

        <section className={ css( styles.card )}>username: { username }</section>

        <section className={ css( styles.card )}>email: { email }</section>

        <section className={ css( styles.card )}>resume: { resume }</section>
      </article>
    );
  }
}

const styles = StyleSheet.create({
  card: primaryCard.body,

  headerSection: primaryCard.title,

  cartTitle: primaryCard.head,
});

export default UserProfile;