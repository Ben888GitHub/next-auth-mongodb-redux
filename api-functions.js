const getProducts = async () => {
	const res = await fetch('http://localhost:3000/api/products', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const allProducts = await res.json();
	return allProducts.data;
};

const getSingleProduct = async (payload) => {
	const res = await fetch(`http://localhost:3000/api/product/${payload}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const product = await res.json();
	return product.data;
};

const addNewProduct = async (payload) => {
	const res = await fetch('http://localhost:3000/api/products', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
	const newProduct = await res.json();
	console.log(newProduct);
	return payload;
};

const deleteSingleProduct = async (payload) => {
	console.log(payload);
	const res = await fetch(`http://localhost:3000/api/product/${payload}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const deleteProduct = await res.json();
	console.log(deleteProduct);
	return payload;
};

const deleteSelectedProducts = async (payload) => {
	console.log(payload);
	const res = await fetch(`http://localhost:3000/api/delete-products`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});
	const deleteProducts = await res.json();
	console.log(deleteProducts);
	return payload;
};

const updateSingleProduct = async (payload, product) => {
	console.log(payload);
	console.log(_id);
	const res = await fetch(`http://localhost:3000/api/product/${product._id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});
	const updateProduct = await res.json();
	console.log(updateProduct);
	return payload;
};

const registerUser = async (payload) => {
	const res = await fetch(`/api/create-user`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	const newUser = await res.json();
	console.log(newUser);
	return newUser;
};

export {
	getProducts,
	addNewProduct,
	deleteSingleProduct,
	deleteSelectedProducts,
	getSingleProduct,
	updateSingleProduct,
	registerUser
};
