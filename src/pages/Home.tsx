import { FC } from 'react';
import { useLocation } from 'react-router-dom';

const Home: FC = () => {
  const { search } = useLocation();

  return <div>{JSON.stringify(search, null, 4)}</div>;
};

export default Home;
