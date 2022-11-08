import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setProductInfo,
	deleteSelectedProductsAsync,
	getProductsAsync,
	addProductAsync,
	deleteProductAsync
} from '../../redux/features/productSlice';
import styles from '../../styles/Home.module.css';
import { useSession, getSession, signOut } from 'next-auth/react';

function Products() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);
	const productInfo = useSelector((state) => state.products.productInfo);

	const [selectedItems, setSelectedItems] = useState([]);

	const { data: session } = useSession();

	useEffect(() => {
		dispatch(getProductsAsync());
		products && console.log(products);
	}, []);

	const handleAddProduct = () => {
		console.log(productInfo);
		// dispatch(addProduct(productInfo));
		dispatch(addProductAsync(productInfo));
		dispatch(setProductInfo({ title: '', content: '', image: '' }));
	};

	const handleDeleteSelected = () => {
		dispatch(deleteSelectedProductsAsync(selectedItems));
		setSelectedItems([]);
	};

	// console.log(session);

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>Hello, {session?.user?.email}</h1>
				<button onClick={() => signOut({ callbackUrl: '/' })}>Log out</button>
				<br />
				<input
					type="text"
					value={productInfo.title}
					placeholder="Title"
					onChange={(e) =>
						dispatch(setProductInfo({ ...productInfo, title: e.target.value }))
					}
				/>
				<br />
				<input
					type="text"
					value={productInfo.content}
					placeholder="Content"
					onChange={(e) =>
						dispatch(
							setProductInfo({ ...productInfo, content: e.target.value })
						)
					}
				/>
				<br />
				<input
					type="text"
					value={productInfo.image}
					placeholder="Image"
					onChange={(e) =>
						dispatch(setProductInfo({ ...productInfo, image: e.target.value }))
					}
				/>
				<br />
				<button onClick={handleAddProduct}>Add Product</button>
				<br />
				<br />
				{selectedItems.length > 0 && (
					<button onClick={handleDeleteSelected}>Delete</button>
				)}

				<br />
				<br />
				{products.map((product, idx) => (
					<div key={idx}>
						<Link href={`/products/${product.id}`}>
							<a>
								<h3>{product.id}</h3>
								<h3>{product.title}</h3>
								<p>{product.content}</p>
								<p>{product.image}</p>
							</a>
						</Link>
						<button onClick={() => dispatch(deleteProductAsync(product.id))}>
							Delete {product.title}
						</button>
						<input
							style={{ width: 20, height: 20 }}
							type="checkbox"
							onClick={(e) => {
								e.target.checked === true
									? setSelectedItems([...selectedItems, product.id])
									: setSelectedItems(
											selectedItems.filter(
												(selectedItem) => selectedItem !== product.id
											)
									  );
							}}
						/>
						<br />
						<br />
					</div>
				))}
			</main>
		</div>
	);
}

export default Products;

export const getServerSideProps = async (context) => {
	const { req } = context;
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: { destination: '/auth/signin' }
		};
	}

	// const res = await fetch(
	// 	`https://next-auth-mongodb-usages.vercel.app/api/products/${session?.user?.email}`,
	// 	{
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		}
	// 	}
	// );
	// const allProducts = await res.json();

	return {
		props: { word: 'hello' }
	};
};
