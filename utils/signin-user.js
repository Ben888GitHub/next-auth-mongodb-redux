import bcrypt from 'bcrypt';

const signInUser = async ({ password, checkUser }) => {
	// if user doesn't enter password
	if (!checkUser.password) {
		throw new Error('Please enter password');
	}
	const isMatch = await bcrypt.compare(password, checkUser.password);
	if (!isMatch) {
		throw new Error('Incorrect Password');
	}
	console.log(isMatch);
	console.log(checkUser);
	return checkUser;
};

export { signInUser };
