import React, { useState, useEffect } from 'react';
import { useDataProvider, useNotify, useRedirect, useRefresh } from 'react-admin';
import { Select, MenuItem, Button, CircularProgress } from '@mui/material';

const ProductImageUpload = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const dataProvider = useDataProvider();
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await dataProvider.getList('products', {
                    pagination: { page: 1, perPage: 100 },
                    sort: { field: 'name', order: 'ASC' },
                    filter: {},
                });
                setProducts(data);
                setLoading(false);
            } catch (error) {
                notify(`Error fetching products: ${error.message}`, { type: 'error' });
                setLoading(false);
            }
        };
        fetchProducts();
    }, [dataProvider, notify]);

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedProduct || !imageFile) {
            notify('Please select a product and an image file.', { type: 'warning' });
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            await fetch(`http://localhost:3000/products/${selectedProduct}/upload`, {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    Authorization: `${localStorage.getItem('token')}`
                }),
            });
            notify('Image uploaded successfully.', { type: 'success' });
            setSelectedProduct('');
            setImageFile(null);
            redirect('/products');
            refresh();
        } catch (error) {
            notify(`Error: ${error.message}`, { type: 'error' });
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Select
                value={selectedProduct}
                onChange={handleProductChange}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>
                    Select a product
                </MenuItem>
                {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                        {product.name}
                    </MenuItem>
                ))}
            </Select>
            <input
                accept="image/*"
                type="file"
                onChange={handleFileChange}
                style={{ marginTop: '20px', display: 'block' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                style={{ marginTop: '20px' }}
            >
                Upload Image
            </Button>
        </div>
    );
};

export default ProductImageUpload;
