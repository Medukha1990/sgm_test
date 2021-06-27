import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const { loading, request, error, clearError } = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {
				...form,
			});
			message(data.message);
		} catch (e) {}
	};

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form });
			auth.login(data.token, data.userId);
		} catch (e) {}
	};

	return (
		<div className='centerContent'>
			<form>
				<div className='mb-3'>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input
						className='form-control'
						type='text'
						id='email'
						name='email'
						value={form.email}
						onChange={changeHandler}
					></input>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						className='form-control'
						type='password'
						id='password'
						name='password'
						value={form.password}
						onChange={changeHandler}
					></input>
				</div>
			</form>
			<div className='buttonContent'>
				<button
					type='submit'
					className='btn btn-primary'
					disabled={loading}
					onClick={loginHandler}
				>
					Log In
				</button>
				<button
					className='btn btn-primary'
					disabled={loading}
					onClick={registerHandler}
				>
					Create New Account
				</button>
			</div>
		</div>
	);
};
