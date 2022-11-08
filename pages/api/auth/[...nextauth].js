import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '../../../lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcrypt';
import { signInUser } from '../../../utils/signin-user';

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: 'jwt'
	},
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				const { email, password } = credentials;
				const client = await clientPromise;
				const db = client.db('test');

				const checkUser = await db.collection('users').findOne({ email });
				console.log(email);
				console.log(password);
				if (!checkUser) {
					throw new Error("You haven't registered yet");
				} else {
					console.log(checkUser);
					return signInUser({ password, checkUser });
				}
			}
		})
	],
	secret: process.env.NEXT_PUBLIC_SECRET,
	pages: {
		signIn: '/auth/signin'
	},
	database: process.env.MONGODB_URI
});
