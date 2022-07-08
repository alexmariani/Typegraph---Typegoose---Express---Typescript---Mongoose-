import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { HOST, PORT } from './config/dev.config';
import { resolvers } from './graphql/resolvers';
import { User } from './graphql/schemas/user.schema';
import Context from './graphql/types/context';
import authChecker from './utils/auth.checker';
import { verifyJwt } from './utils/jwt';
import { connectToMongo } from './utils/mongo.connect';

async function bootstrap() {
	// Build the schema

	const schema = await buildSchema({
		resolvers,
		authChecker
	});

	// Init express
	const app = express();

	app.use(cookieParser());

	app.get('/', (req: Request, res: Response) => {
		res.status(200).json({
			status: 200,
			message: 'Application is running',
			data: []
		});
	});
	// Create the apollo server
	const server = new ApolloServer({
		schema,
		context: (ctx: Context) => {
			const context = ctx;

			if (ctx.req.cookies.accessToken) {
				const user = verifyJwt<User>(ctx.req.cookies.accessToken);
				context.user = user;
			}
			return context;
		},
		plugins: [
			process.env.NODE_ENV === 'production'
				? ApolloServerPluginLandingPageProductionDefault()
				: ApolloServerPluginLandingPageGraphQLPlayground()
		]
	});

	await server.start();
	// apply middleware to server

	server.applyMiddleware({ app });

	// app.listen on express server
	app.listen(PORT, () => {
		console.log(`App is listening on http://${HOST}:${PORT}`);
	});
	connectToMongo();
}

bootstrap();
