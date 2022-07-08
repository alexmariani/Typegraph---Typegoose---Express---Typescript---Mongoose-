import { getModelForClass, index, prop, queryMethod, ReturnModelType } from '@typegoose/typegoose';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import { MaxLength, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from './user.schema';

function findByName(this: ReturnModelType<typeof User, QueryHelpers>, email: User['name']) {
	return this.findOne({ name });
}

interface QueryHelpers {
	findByName: AsQueryMethod<typeof findByName>;
}

@index({ name: 1 })
@queryMethod(findByName)
@ObjectType()
export class Product {
	@Field(() => String)
	_id: string;

	@Field(() => String)
	@prop({ required: true })
	name: string;

	@Field(() => String)
	@prop({ required: true })
	price: string;

	@Field(() => String)
	@prop({ required: true })
	userId: string;
}

export const productModel = getModelForClass<typeof Product, QueryHelpers>(Product);

@InputType()
export class CreateProductInput {
	@Field(() => String)
	@MaxLength(30)
	name: string;

	@MinLength(3, { message: 'the price at least have 3 characters' })
	@MaxLength(10, { message: 'the price have maximum have 10 characters' })
	@Field(() => String)
	price: string;

	@Field(() => String, { nullable: false })
	userId: string;
}
