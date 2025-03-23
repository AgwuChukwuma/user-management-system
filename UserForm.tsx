import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../store/UserSlice';
import { RootState } from '../store/store';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state: RootState) => state.users.users);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');

  useEffect(() => {
    if (id) {
      const userToEdit = users.find(user => user.id === parseInt(id));
      if (userToEdit) {
        setName(userToEdit.name);
        setEmail(userToEdit.email);
        setStreet(userToEdit.address.street);
        setCity(userToEdit.address.city);
        setZipcode(userToEdit.address.zipcode);
      }
    }
  }, [id, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = {
      id: id ? parseInt(id) : Date.now(),
      name,
      email,
      address: { street, city, zipcode },
    };

    if (id) {
      dispatch(updateUser(updatedUser)); // Update user if editing
    } else {
      dispatch(addUser(updatedUser)); // Add user if creating new
    }

    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit User' : 'Add New User'}</h2>
      <label>Name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <label>Street</label>
      <input type="text" value={street} onChange={e => setStreet(e.target.value)} required />
      <label>City</label>
      <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
      <label>Zipcode</label>
      <input type="text" value={zipcode} onChange={e => setZipcode(e.target.value)} required />
      <button type="submit">{id ? 'Update User' : 'Add User'}</button>
    </form>
  );
};

export default UserForm;
