import { useEffect, useState } from 'react';
import ProductFilter from './ProductFilter';
import ProductList from './ProductList';

const tempDataAPI = [
  {
    id: 1,
    name: 'Áo thun nam cao cấp',
    image:
      'http://file.hstatic.net/200000325151/article/8bpu7_mau-ao-thun-nam-dep-3_719fd81d021a4da8954ab2d73a9ecc7b.jpg',
    price: 100000,
    originalPrice: 100000,
    description: 'High-quality wireless headphones with noise cancellation',
    reviews: 128,
    discount: 40,
    category: 'QUAN'
  },
  {
    id: 2,
    name: 'Đồng hồ thông minh thể thao',
    image: 'https://cf.shopee.vn/file/69198e2db3fc1eaea4601b4d86229813',
    price: 39.99,
    originalPrice: 59.99,
    description: 'Advanced fitness tracking with heart rate monitor',
    reviews: 89,
    discount: 33,
    category: 'AO'
  },
  {
    id: 3,
    name: 'Sạc dự phòng di động',
    image:
      'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj6edl2u38iac5',
    price: 49.99,
    originalPrice: 69.99,
    description: 'Fast charging power bank with wireless capability',
    reviews: 256,
    discount: 29,
    category: 'GIAY'
  },
  {
    id: 4,
    name: 'Đèn bàn LED thông minh',
    image:
      'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj6edl2u38iac5',
    price: 59.99,
    originalPrice: 79.99,
    description: 'Adjustable LED lamp with USB charging port',
    reviews: 67,
    discount: 25,
    category: 'PHU_KIEN'
  },
  {
    id: 5,
    name: 'Quần thun nam',
    image: 'https://m.media-amazon.com/images/I/81PocXQFrlL._AC_UL320_.jpg',
    price: 69.99,
    originalPrice: 99.99,
    description: 'Waterproof portable speaker with premium sound',
    reviews: 189,
    discount: 30,
    category: 'DIEN_TU'
  }
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listProducts, setListProducts] = useState(tempDataAPI);

  useEffect(() => {
    if (selectedCategory == 'all') {
      setListProducts(tempDataAPI);
    } else {
      const result = tempDataAPI.filter(
        (item) => item.category == selectedCategory
      );
      setListProducts(result);
    }
  }, [selectedCategory]);

  return (
    <div className="grid grid-cols-[15%,85%]">
      <ProductFilter
        onSelectedCategory={(value) => {
          setSelectedCategory(value);
        }}
      />
      <ProductList data={listProducts} />
    </div>
  );
}
