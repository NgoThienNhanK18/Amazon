import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import __helpers from '@/helpers';
import { useDispatch } from 'react-redux';
import { setListProduct } from '@/redux/order.slice';
import { toast } from '@/components/ui/use-toast';

export default function ProductList({ data }) {
  const [listProductAdded, setListProductAdded] = useState<typeof data>([]);
  const [wishlist, setWishlist] = useState<typeof data>([]);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    toast({
      title: 'Thêm vào giỏ hàng',
      description: `${product.name} đã được thêm vào giỏ hàng.`,
      variant: 'success'
    });

    // lấy những sản phẩm trong localStorage ra
    const currentItemInLocalStorageDecode =
      __helpers.localStorage_get('listProductAdded');

    // parse lại
    const currentItemInLocalStorage = currentItemInLocalStorageDecode
      ? JSON.parse(currentItemInLocalStorageDecode)
      : [];

    const isProductInCart = currentItemInLocalStorage.find(
      (item) => item.id == product.id
    );

    if (isProductInCart == undefined) {
      const newListItemInCart = [
        ...currentItemInLocalStorage,
        {
          ...product,
          quanlity: 1
        }
      ];

      __helpers.localStorage_set(
        'listProductAdded',
        JSON.stringify(newListItemInCart)
      );

      console.log('newListItemInCart', newListItemInCart);

      dispatch(setListProduct(newListItemInCart));
    } else {
      // lọc qua mảng, tìm  phần tử trùng với id để cập nhập số lượng
      const newListItemInCart = currentItemInLocalStorage.map((item) => {
        if (item.id == product.id) {
          return {
            ...item,
            quanlity: item.quanlity + 1
          };
        }
      });

      __helpers.localStorage_set(
        'listProductAdded',
        JSON.stringify(newListItemInCart)
      );

      console.log('newListItemInCart', newListItemInCart);

      dispatch(setListProduct(newListItemInCart));
    }
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {product.discount && (
                <div className="absolute left-2 top-2 z-10 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  -{product.discount}%
                </div>
              )}

              <button
                onClick={() => handleAddToWishlist(product)}
                className="absolute right-2 top-2 z-10 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-50"
              >
                <Heart
                  className={`h-4 w-4 ${wishlist.find((item) => item.id === product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>

              <div className="relative bg-gray-50 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="space-y-3 p-4">
                <h3 className="line-clamp-2 cursor-pointer text-sm font-medium text-gray-900 hover:text-blue-600">
                  {product.name}
                </h3>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="line-clamp-2 text-xs text-gray-600">
                  {product.description}
                </p>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full rounded-md bg-yellow-400 font-medium text-black transition-colors hover:bg-yellow-500"
                  size="sm"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Thêm vào giỏ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
