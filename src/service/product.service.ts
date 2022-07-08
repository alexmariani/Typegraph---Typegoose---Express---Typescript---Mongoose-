import { CreateProductInput, productModel } from '../graphql/schemas/product.schema';

export default class ProductService {
	async saveProduct(input: CreateProductInput) {
		return await productModel.create(input);
	}


    async findAll(){
        return await productModel.find();
    }

}
