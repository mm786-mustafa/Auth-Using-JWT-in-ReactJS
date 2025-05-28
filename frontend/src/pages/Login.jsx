import { useState } from 'react';
import api from '../services/api';

export default function Login() {
    const [form, setForm] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    
    const handle = e => {
        setError('');
        setForm(f => ({ ...f, [e.target.name]: e.target.value}));
    };

    const submit = async e => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            window.location = '/profile';
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Login</h2>
                {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
                <form onSubmit={submit}>
                    <input 
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={handle}
                        required
                    />
                    <input 
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={form.password}
                        onChange={handle}
                        required
                    />
                    <button type='submit'>Log In</button>
                </form>
            </div>
        </div>
    );
}