import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	addProduct,
	setProductInfo,
	deleteProduct,
	deleteSelectedProducts
} from '../../redux/features/productSlice';
import styles from '../../styles/Home.module.css';

function Products() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);
	const productInfo = useSelector((state) => state.products.productInfo);

	const [selectedItems, setSelectedItems] = useState([]);

	const handleAddProduct = () => {
		console.log(productInfo);
		dispatch(addProduct(productInfo));
		dispatch(setProductInfo({ title: '', content: '', image: '' }));
	};

	const handleDeleteSelected = () => {
		dispatch(deleteSelectedProducts(selectedItems));
		setSelectedItems([]);
	};

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>Hello</h1>
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
						<h3>{product.title}</h3>
						<p>{product.content}</p>
						<p>{product.image}</p>
						<button onClick={() => dispatch(deleteProduct(product.id))}>
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
