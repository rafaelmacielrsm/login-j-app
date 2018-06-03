import AppLayout from '../src/components/layout/AppLayout';
import SignUpForm from '../src/components/containers/SignUpForm';
import Head from 'next/head';
import { metaInfo } from '../src/config/seo';

const SignUp = () => (
  <div>
    <Head key='SEO'>
      <title>{metaInfo.signup.title}</title>
      <meta name="description" content={metaInfo.signup.description}/>
    </Head>    

    <AppLayout>
      <SignUpForm />
    </AppLayout>
  </div>
);

export default SignUp;