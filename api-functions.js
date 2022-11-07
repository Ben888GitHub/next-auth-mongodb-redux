const getProducts = async () => {
	const res = await fetch(
		'https://next-auth-mongodb-redux-usages.vercel.app/api/products',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const allProducts = await res.json();
	return allProducts.data;
};

const addNewProduct = async (payload) => {
	const res = await fetch(
		'https://next-auth-mongodb-redux-usages.vercel.app/api/products',
		{
			method: 'POST',
			body: JSON.stringify(payload)
		}
	);
	const newProduct = await res.json();
	console.log(newProduct);
	return payload;
};

const deleteSingleProduct = async (payload) => {
	console.log(payload);
	const res = await fetch(
		`https://next-auth-mongodb-redux-usages.vercel.app/api/product/${payload}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const deleteProduct = await res.json();
	console.log(deleteProduct);
	return payload;
};

export { getProducts, addNewProduct, deleteSingleProduct };
