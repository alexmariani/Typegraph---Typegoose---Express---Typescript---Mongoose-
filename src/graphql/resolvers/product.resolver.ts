import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import ProductService from '../../service/product.service';
import { CreateProductInput, Product } from '../schemas/product.schema';

@Resolver()
export default class ProductResolver {
	constructor(private productService: ProductService) {
		this.productService = new ProductService();
	}

	@Mutation(() => Product)
	async createProduct(@Arg('input') input: CreateProductInput) {
		return await this.productService.saveProduct(input);
	}

	@Query(() => [Product])
	async findAllProduct() {
		return await this.productService.findAll();
	}



}
