import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('test');
	const products = db.collection('products');

	const { body, method, query } = req;

	const deleteProduct = await products.deleteOne({
		id: query.id
	});
	res.json({ status: 200, data: deleteProduct });
}
