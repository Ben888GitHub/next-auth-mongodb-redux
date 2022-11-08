import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createNewUserAsync,
	setUserInfo
} from '../../redux/features/authSlice';

function SignIn() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.auth.userInfo);

	const router = useRouter();

	const handleSignUp = async () => {
		console.log(userInfo);
		const res = await dispatch(createNewUserAsync(userInfo));
		console.log(res);

		if (res.message === 'Registered successfully') {
			const login = await signIn('credentials', {
				email: userInfo.email,
				password: userInfo.password,
				redirect: false
			});
			router.push('/products');
			dispatch(setUserInfo({ email: '', password: '' }));
		} else {
			// todo, use this as the react toast to alert user
			console.log(res?.error);
		}
	};

	const handleLogIn = async (e) => {
		e.preventDefault();

		const res = await signIn('credentials', {
			id: userInfo.id,
			email: userInfo.email,
			password: userInfo.password,
			redirect: false
		});
		console.log(res);
		if (res?.error) {
			// todo, use this as the react toast to alert user
			console.log(res.error);
		} else if (res.status === 200) {
			router.push('/products');
		}
	};

	return (
		<div
			style={{
				textAlign: 'center',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<h1>Sign in</h1>
			<br />
			<input
				type="email"
				placeholder="email"
				value={userInfo.email}
				onChange={(e) =>
					dispatch(setUserInfo({ ...userInfo, email: e.target.value }))
				}
			/>
			<br />
			<br />
			<input
				type="password"
				placeholder="password"
				value={userInfo.password}
				onChange={(e) =>
					dispatch(setUserInfo({ ...userInfo, password: e.target.value }))
				}
			/>
			<br />
			<br />
			<button onClick={handleLogIn}>Sign in</button>
			<br />
			<br />
			<button onClick={handleSignUp}>Sign up</button>
		</div>
	);
}

export default SignIn;

export async function getServerSideProps(context) {
	// const csrfToken = await getCsrfToken(context);
	const { req } = context;
	const session = await getSession({ req });

	// Protected Page
	if (session) {
		return {
			redirect: { destination: '/products' }
		};
	}

	return {
		props: { title: 'hello' }
	};
}
