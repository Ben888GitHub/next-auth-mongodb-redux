import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('test');
	const products = db.collection('products');

	const { body, method, query } = req;

	if (method === 'GET') {
		const product = await products.findOne({ id: query.id });
		res.json({ status: 200, data: product });
	} else if (method === 'DELETE') {
		const deleteProduct = await products.deleteOne({
			id: query.id
		});
		res.json({ status: 200, data: deleteProduct });
	} else if (method === 'PUT') {
		console.log(body);
		console.log(query.id);
		// console.log(ObjectId(body._id));
		const updateProduct = await products.updateOne(
			{ _id: ObjectId(body._id) },
			{
				$set: {
					title: body.title,
					content: body.content,
					image: body.image
				}
			}
		);
		console.log(updateProduct);
		res.json({ status: 200, data: updateProduct });
	}
}
