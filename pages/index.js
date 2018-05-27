import Layout from '../components/MyLayout.js';
// import { StyleSheet, css } from 'aphrodite';
import React from 'react';
// import { loginUser, logoutUser } from '../store/actions';
import LoginForm from '../components/containers/LoginForm';

const Index = () => (
  <Layout>
    <LoginForm />
  </Layout>
);

// const styles = StyleSheet.create({
//   typography: {
//     fontFamily: 'Arial',
//     fontSize: 'calc(10px * 3 + 1vw)'
//   },

//   list: {
//     padding: 0
//   },

//   listItem: {
//     listStyle: 'none',
//     margin: '5px 0'
//   },

//   anchor: {
//     textDecoration: 'none',
//     color: 'blue',
//     ':hover': {
//       opacity: 0.6 
//     }
//   }
// });

// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginAction: () => {      
//       dispatch(
//         loginUser({ 
//           name: 'test',
//           email: 'example@test.com',
//           identifier: '123'
//         }));
//     },
//     logoutAction: () => {
//       dispatch(logoutUser());
//     }
//   };
// };

export default Index;

