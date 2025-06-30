import { Button } from '@/components/ui/button';
import __helpers from '@/helpers';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [listProductAdded, setListProductAdded] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const data = __helpers.localStorage_get('listProductAdded');
    const dataParse = JSON.parse(data || '[]');
    handleProcessProductAdded(dataParse);
    const totalPrice = handleCalculateTotalPrice(dataParse);
    if (!totalPrice || totalPrice == 0) {
      setTotalPrice(0);
      return;
    }
    setTotalPrice(totalPrice);
    setListProductAdded(dataParse);
  }, []);

  const handleCalculateTotalPrice = (array) => {
    if (!array || array.length == 0) {
      return 0;
    }
    let total = 0;

    array.map((item) => {
      total += item.price * item.quanlity;
    });

    setTotalPrice(total);

    return total;
  };

  console.log(listProductAdded);

  const handleProcessProductAdded = (listProduct) => {
    if (!listProduct || listProduct.length == 0) {
      return 0;
    }

    const listProductFinal = [];

    listProduct.map((item, index) => {
      const findProduct = listProductFinal.find(
        (product) => product.id === item.id
      );
    });

    return true;
  };

  const handleCheckout = async () => {
    const payload = {
      name: 'Thanh toán đơn hàng ABC',
      totalPrice: totalPrice
    };

    const orderResponse = await axios.post(
      'https://api.fitverse.autopass.blog/order/create-order-v2',
      payload
    );

    const aLink = orderResponse.data.data.checkoutUrl;

    if (aLink) {
      window.location.href = aLink;
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 space-y-4 bg-red-50 p-4">
        <h1 className="text-3xl font-bold">Thông tin giỏ hàng</h1>
        {listProductAdded &&
          listProductAdded.map((item) => {
            return (
              <div className="grid grid-cols-[15%,45%,30%,10%] border p-4">
                <div>
                  <img
                    className="w-20 border border-red-500"
                    src={item.image}
                  ></img>
                </div>

                <div>
                  <h1 className="font-bold">Tên {item.name}</h1>
                  <p className="text-sm text-gray-500"> {item.description}</p>
                </div>
                <div>
                  <p className="text-gray-500">
                    Giá gốc {item.originalPrice} vnd
                  </p>
                  <p className="font-bold text-red-500">
                    Giá sale: {item.price * item.quanlity} vnd
                  </p>
                  <p>Số lượng: {item.quanlity}</p>
                </div>
                <div>
                  <Button className="bg-blue-500">Xóa</Button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="col-span-4">
        <div className="border p-4 ">
          <h1 className="text-3xl font-bold">Tạm tính</h1>
          <div className="grid grid-cols-2 ">
            <h1 className="font-bold text-orange-500">
              Tổng sản phẩm:
              {listProductAdded.length || 0} sản phẩm
            </h1>
            <p className="text-right font-bold text-red-500">
              Tổng tiền: {__helpers.formatCurrency(totalPrice)} vnd
            </p>
          </div>
          <Button className="mt-4 bg-red-500" onClick={handleCheckout}>
            Thanh toán ngay
          </Button>
        </div>
      </div>
    </div>
  );
}
