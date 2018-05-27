import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import { StyleSheet, css } from 'aphrodite';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../store';

function getPosts () {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js'},
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
  ];
}

const PostLink = ({ post }) => (
  <li className={ css( styles.listItem )}>
    <Link prefetch as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
      <a className={ css( styles.anchor )}>{post.title}</a>
    </Link>
  </li>
);

const Index = ({ loginAction, logoutAction }) => (
  <Layout>
    <h1 className={ css( styles.typography )}>My Blog</h1>
    <ul className={ css( styles.list )}  >
      { getPosts().map((post) => (
        <PostLink key={post.id} post={post}/>
      ))}
    </ul>

    <button onClick={ loginAction }>Login</button>
    <button onClick={ logoutAction }>Logout</button>
  </Layout>
);

Index.propTypes = {
  loginAction: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  typography: {
    fontFamily: 'Arial',
    fontSize: 'calc(10px * 3 + 1vw)'
  },

  list: {
    padding: 0
  },

  listItem: {
    listStyle: 'none',
    margin: '5px 0'
  },

  anchor: {
    textDecoration: 'none',
    color: 'blue',
    ':hover': {
      opacity: 0.6 
    }
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: () => {      
      dispatch(loginUser());
    },
    logoutAction: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

