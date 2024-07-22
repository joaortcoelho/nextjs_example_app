import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { redirect: { destination: `/home`, permanent: false } };
};

export default function Index() {
  return null;
}
