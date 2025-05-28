import { useState } from "react";
import api from '../services/api';

export default function Signup() {
    const [form, setForm] = useState({name: '', email: '', password: ''});
    const [error, setError] = useState('');

    const handle = e => {
        setError('');
        setForm(f => ({...f, [e.target.name]: e.target.value}));
    };

    const submit = async e => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', form);
            window.location = '/login';
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Sign up</h2>
                {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
                <form onSubmit={submit}>
                    <input 
                        name='name'
                        type='name'
                        placeholder='Name'
                        value={form.name}
                        onChange={handle}
                        required
                    />
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
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    );
}