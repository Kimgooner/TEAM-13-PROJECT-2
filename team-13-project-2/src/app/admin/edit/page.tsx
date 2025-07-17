'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/app/lib/backend/client';
import ProductFormModal from '@/components/ProductFormModal';

export default function AdminProductPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);

    const fetchProducts = async () => {
        try {
            const res = await apiFetch('/api/v1/products');
            setProducts(res.data || []);
        } catch (err) {
            console.error('상품 목록 조회 실패:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await apiFetch(`/api/v1/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (err) {
            console.error('삭제 실패:', err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">상품 관리</h1>

            <button
                onClick={() => setEditingProduct({})}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
                상품 추가
            </button>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {products.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg shadow">
                    <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-40 object-cover mb-2 rounded"
                    />
                    <h2 className="font-bold">{product.productName}</h2>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="font-semibold mt-1">{product.price.toLocaleString()}원</p>

                    <div className="flex gap-2 mt-3">
                    <button
                        onClick={() => setEditingProduct(product)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                    >
                        수정
                    </button>
                    <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    >
                        삭제
                    </button>
                    </div>
                </div>
                ))}
            </div>

            {editingProduct && (
                <ProductFormModal
                    initialData={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={fetchProducts}
                ></ProductFormModal>
            )}
        </div>
    );
}
