import Layout from '../components/MyLayout.js';
import { StyleSheet, css } from 'aphrodite';

const Content = ( props ) => {
  return (
    <div>
      <h1 className={ css( styles['post-title'] ) }>{ props.url.query.title }</h1>
      <p>This is the blog post content.</p>
    </div>
  );
};

export default (props) => (
  <Layout>
    <Content url={ props.url }/>
  </Layout>
);

const styles = StyleSheet.create({
  'post-title': {
    color: 'red'
  },
});