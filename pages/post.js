import Layout from '../components/MyLayout.js';
import { StyleSheet, css } from 'aphrodite';

const Content = ( { router } ) => {
  return (
    <div>
      <h1 className={ css( styles['post-title'] ) }>{ router.query.title }</h1>
      <p>This is the blog post content.</p>
    </div>
  );
};

export default ( props ) => (
  <Layout>
    <Content { ...props }/>
  </Layout>
);

const styles = StyleSheet.create({
  'post-title': {
    color: 'red'
  },
});