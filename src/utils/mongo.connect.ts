import { mongoose } from '@typegoose/typegoose';
import { DB_URL } from '../config/dev.config';

export async function connectToMongo() {
	try {
		await mongoose
			.connect(`${DB_URL}`)
			.then(()=>console.log("Connessione avvenuta con successo!"))
			.catch(e => console.error(e));
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}
