import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import { StyleSheet, css } from 'aphrodite';

function getPosts () {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js'},
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
  ];
}

const PostLink = ({ post }) => (
  <li className={ css( styles.listItem )}>
    <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
      <a className={ css( styles.anchor )}>{post.title}</a>
    </Link>
  </li>
);

export default () => (
  <Layout>
    <h1 className={ css( styles.typography )}>My Blog</h1>
    <ul className={ css( styles.list )}  >
      { getPosts().map((post) => (
        <PostLink key={post.id} post={post}/>
      ))}
    </ul>
  </Layout>
);

const styles = StyleSheet.create({
  typography: {
    fontFamily: 'Arial'
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