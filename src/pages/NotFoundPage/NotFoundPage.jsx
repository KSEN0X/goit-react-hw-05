import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <b>Sorry! Not found page!</b>
      <Link to="/">Back to home page</Link>
    </div>
  );
}
