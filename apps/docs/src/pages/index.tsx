import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Home(): JSX.Element {
  const history = useHistory();
  
  useEffect(() => {
    // Redirect to overview page
    history.replace('/overview');
  }, [history]);
  
  return null;
}
