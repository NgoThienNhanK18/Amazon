import BasePages from '@/components/shared/base-pages';
import { useState } from 'react';

const ListImages = [
  {
    src: 'https://m.media-amazon.com/images/I/51Zu6yF-S-L._AC_SX569_.jpg'
  },
  {
    src: 'https://m.media-amazon.com/images/I/517e+3IkHpL._AC_SY450_.jpg'
  },
  {
    src: 'https://m.media-amazon.com/images/I/51+M1ycjDoL._AC_SX569_.jpg'
  }
];

export default function ProductDetailPage() {
  const [imageSelected, setSelectedImage] = useState(ListImages[0].src);

  return (
    <BasePages
      pageHead="Chi tiết sản phẩm"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Danh sách sản phẩm', link: '/products' },
        { title: 'Chi tiết sản phẩm', link: '/producs/:id' }
      ]}
      className="px container mx-auto max-w-7xl"
    >
      <div className="mt-4 grid grid-cols-2">
        <div className=" border-r border-red-500">
          {/* <img
            src=""
            alt="Product Image"
            className="h-96 w-full object-contain"
          /> */}
          <img
            src={imageSelected}
            about="Product Image"
            className="h-96 w-full object-contain"
          />

          <div className="mt-4 flex gap-2">
            {ListImages.map((item, index) => {
              return (
                <img
                  src={item.src}
                  alt="product image thumbnail"
                  key={index}
                  className={`h-36 w-36 cursor-pointer object-contain ${imageSelected == item.src ? 'border-4 border-red-500' : ''}`}
                  onClick={() => {
                    setSelectedImage(item.src);
                  }}
                  onMouseDown={() => {
                    setSelectedImage(item.src);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="pl-4">
          <h1 className="text-3xl font-bold">Áo thun Nam</h1>
          <p className="font-semibold">Đánh giá: 5 sao</p>
          <p>Số lượng: 100 sp</p>
          <p>Giá: 100.000 vnd</p>
        </div>
      </div>
    </BasePages>
  );
}
