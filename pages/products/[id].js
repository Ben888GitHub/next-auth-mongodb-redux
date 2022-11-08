import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getSingleProductAsync,
	setProductInfo,
	updateSingleProductsAsync
} from '../../redux/features/productSlice';

function Product({ id }) {
	const router = useRouter();
	const dispatch = useDispatch();
	const product = useSelector((state) => state.products.product);

	const productInfo = useSelector((state) => state.products.productInfo);

	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		dispatch(getSingleProductAsync(id));

		setIsDisabled(!isDisabled);
	}, []);

	const handleUpdateProduct = async () => {
		console.log(productInfo);
		await dispatch(updateSingleProductsAsync(productInfo, product));
	};

	console.log(product);

	return (
		<div style={{ margin: 20, textAlign: 'center' }}>
			<h1>Product</h1>
			<br />
			{product ? (
				<>
					<h2>{product.title}</h2>

					<h3>{product.content}</h3>

					<h3>{product.image}</h3>

					{/* <button disabled={isDisabled} onClick={handleUpdateProduct}>
						Update
					</button> */}
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default Product;

export const getServerSideProps = async (context) => {
	const id = context.query.id;

	return {
		props: { id }
	};
};
