import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/authService';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        // Get token from URL params
        const token = searchParams.get('token');

        if (token) {
          // Store token in localStorage
          localStorage.setItem('token', token);

          // Fetch user profile using the token
          const response = await getProfile();

          if (response.success && response.data) {
            // Update AuthContext with user data
            login(response.data, token);
            
            // Show success message
            toast.success(
              (t) => (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">🎉</span>
                    <span className="font-bold text-xl">Welcome {response.data.name}!</span>
                  </div>
                  <p className="text-sm text-gray-100">
                    Successfully logged in with Google! 🌿
                  </p>
                </div>
              ),
              {
                duration: 4000,
                style: {
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                },
              }
            );

            // Redirect to home page after a brief delay
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 1500);
          } else {
            throw new Error('Failed to fetch user profile');
          }
        } else {
          // If no token, redirect to login with error
          toast.error('Authentication failed. Please try again.');
          navigate('/login?error=authentication_failed', { replace: true });
        }
      } catch (error) {
        console.error('❌ Google auth error:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/login?error=authentication_failed', { replace: true });
      }
    };

    handleGoogleAuth();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Authentication Successful!
        </h2>
        <p className="text-gray-600">
          Redirecting you to the home page...
        </p>
      </motion.div>
    </div>
  );
};

export default GoogleAuthSuccess;
