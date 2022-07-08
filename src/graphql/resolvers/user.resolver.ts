import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import UserService from '../../service/user.service';
import { CreateUserInput, LoginInput, User } from '../schemas/user.schema';
import Context from '../types/context';

@Resolver()
export default class UserResolver {
	constructor(private userService: UserService) {
		this.userService = new UserService();
	}

	@Mutation(() => User)
	createUser(@Arg('input') input: CreateUserInput) {
		return this.userService.createUser(input);
	}

	@Mutation(() => String)
	login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
		return this.userService.login(input, context);
	}

	@Query(()=> [User])
	findAll(){
		return this.userService.findAll()
	}

	@Query(()=> User)
	findByEmail(@Arg('email') email:string){
		return this.userService.findByEmail(email);
	}

	@Query(() => User, { nullable: true })
	me(@Ctx() context: Context) {
		return context.user;
	}


	
}
