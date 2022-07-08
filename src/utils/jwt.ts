import jwt from 'jsonwebtoken';
import { PRIVATE_KEY, PUBLIC_KEY } from '../config/dev.config';

const publicKey = Buffer.from(`${PUBLIC_KEY}`, 'base64').toString('ascii');
const privateKey = Buffer.from(`${PRIVATE_KEY}`, 'base64').toString('ascii');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
	return jwt.sign(object, privateKey, {
		...(options && options),
		algorithm: 'RS256'
	});
}

export function verifyJwt<T>(token: string): T | null {
	try {
		const decoded = jwt.verify(token, publicKey) as T;
		return decoded;
	} catch (e) {
		return null;
	}
}
