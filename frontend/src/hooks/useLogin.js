import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to dashboard only if login is successful
    if (isSuccess) {
      navigate('/dashboard');
    }
  }, [isSuccess, navigate]);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    });
    const json = await response.json();
    console.log("test"); //print statement for debugging

    // unsuccessful login
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    // successful login
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // update loading state and success state
      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  return { login, isLoading, error };
}