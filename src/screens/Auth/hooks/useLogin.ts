import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';


const useLogin = (navigation: any) => {
    const { login, register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState<'register' | 'login'>('login');

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigation.navigate('Main', {screen: 'Home'});
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleRegister = async () => {
        try {
            await register(email, password);
            navigation.navigate('Main', {screen: 'Home'});
        } catch (error: any) {
            setError(error.message);
        }
    };

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'login' ? 'register' : 'login'));
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        mode,
        handleLogin,
        handleRegister,
        toggleMode,
        setError
    };
};

export default useLogin;
