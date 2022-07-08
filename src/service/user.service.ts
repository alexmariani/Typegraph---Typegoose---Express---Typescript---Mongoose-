import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import { CreateUserInput, LoginInput, UserModel } from '../graphql/schemas/user.schema';
import Context from '../graphql/types/context';
import { signJwt } from '../utils/jwt';

class UserService {
	async createUser(input: CreateUserInput) {
		return await UserModel.create(input);
	}

	async findAll() {
		return await UserModel.find();
	}

	async login(input: LoginInput, context: Context) {
		const e = 'Invalid email or password';
		// Get our user by email
		const user = await UserModel.find().findByEmail(input.email).lean();

		if (!user) {
			throw new ApolloError(e);
		}

		// validate the password
		const passwordIsValid = await bcrypt.compare(input.password, user.password);

		if (!passwordIsValid) {
			throw new ApolloError(e);
		}

		// sign a jwt
		const token = signJwt(user);
		context.user = user;
		console.log(context.user);
		// set a cookie for the jwt
		context.res.cookie('accessToken', token, {
			maxAge: 3.154e10, // 1 year
			httpOnly: true,
			domain: 'localhost',
			path: '/',
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production'
		});

		// return the jwt
		return token;
	}

	async findByEmail(_email: string) {
		return await UserModel.findOne({email:_email});
	}
}

export default UserService;
