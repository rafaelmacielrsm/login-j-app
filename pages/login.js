import AppLayout from '../src/components/layout/AppLayout';
import LoginForm from '../src/components/containers/LoginForm';
import Head from 'next/head';
import { metaInfo } from '../src/config/seo';

const Login = () => (
  <div>
    <Head key='SEO'>
      <title>{metaInfo.login.title}</title>
      <meta name="description" content={metaInfo.login.description}/>
    </Head>
      
    <AppLayout>
      <LoginForm />
    </AppLayout>
  </div>
);

export default Login;

