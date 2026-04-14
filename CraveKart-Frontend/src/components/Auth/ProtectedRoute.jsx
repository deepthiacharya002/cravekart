import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <LoginModal show={true} onClose={() => navigate('/')} />;
  }

  return children;
};

export default ProtectedRoute;