import { useState, useEffect } from 'react';
import api from '../services/api';

export default function PersonalInfo() {
    const [list, setList] = useState([]);
    const [form, setForm] = useState({firstName: '', lastName: '', address: '', phone: ''});
    const [editingId, setEditingId] = useState(null);

    const fetchAll = async () => {
        const res = await api.get('/personal');
        setList(res.data);
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleChange = e => {
        setForm(f => ({...f, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (editingId) {
            await api.put(`/personal/${editingId}`, form);
        } else {
            await api.post('/personal', form);
        }
        setForm({firstName: '', lastName: '', address: '', phone: ''});
        setEditingId(null);
        fetchAll();
    };

    const startEdit = pi => {
        setEditingId(pi._id);
        setForm({
            firstName: pi.firstName,
            lastName: pi.lastName,
            address: pi.address,
            phone: pi.phone
        });
    };

    const handleDelete = async id => {
        await api.delete(`/personal/${id}`);
        fetchAll();
    };

    return (
        <div className='auth-page'>
            <div className='auth-container'>
                <h2>My Personal Info</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name='firstName'
                        placeholder='First Name'
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name='adddress'
                        placeholder='Address'
                        value={form.address}
                        onChange={handleChange}
                    />
                    <input
                        name='phone'
                        placeholder='Phone'
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <button type='submit'>
                        {editingId ? 'Update Info' : 'Add Info'}
                    </button>
                </form>

                <hr />

                {list.map(pi => (
                    <div key={pi._id} className='card'>
                        <strong>{pi.firstName} {pi.lastName}</strong><br />
                        {pi.address}<br />
                        {pi.phone}<br/>
                        <button onClick={() => startEdit(pi)}>Edit</button>
                        <button onClick={() => handleDelete(pi._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}