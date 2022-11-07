import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('test');
	const products = db.collection('products');

	const { body, method } = req;

	if (method === 'GET') {
		const allProducts = await products.find({}).toArray();
		res.json({ status: 200, data: allProducts });
	} else if (method === 'POST') {
		let bodyObject = JSON.parse(body);
		const newProduct = await products.insertOne(bodyObject);
		res.json({ status: 200, data: newProduct });
	}
}
