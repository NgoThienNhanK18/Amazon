import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from '@/routes/hooks';

const categories = [
  {
    name: 'Electronics',
    image:
      'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1',
    deals: 'Up to 40% off'
  },
  {
    name: 'Fashion',
    image:
      'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1',
    deals: 'Up to 60% off'
  },
  {
    name: 'Home & Kitchen',
    image:
      'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1',
    deals: 'Up to 50% off'
  },
  {
    name: 'Books',
    image:
      'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1',
    deals: 'Up to 30% off'
  },
  {
    name: 'Sports & Outdoors',
    image:
      'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1',
    deals: 'Up to 45% off'
  },
  {
    name: 'Beauty',
    image:
      'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1',
    deals: 'Up to 35% off'
  },
  {
    name: 'Toys & Games',
    image:
      'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1',
    deals: 'Up to 55% off'
  },
  {
    name: 'Automotive',
    image:
      'https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1',
    deals: 'Up to 25% off'
  }
];

export function CategoryGrid() {
  const router = useRouter();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2
        className="mb-6 text-2xl font-bold"
        onClick={() => {
          toast({
            title: 'Thêm vào giỏ hàng',
            description: 'You clicked on Shop by Category',
            variant: 'success'
          });
        }}
      >
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <Card
            key={category.name}
            className="cursor-pointer transition-shadow hover:shadow-lg"
          >
            <CardContent className="p-4">
              <img
                src={category.image || '/placeholder.svg'}
                alt={category.name}
                className="mb-3 h-32 w-full rounded-md object-cover"
              />
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm font-medium text-green-600">
                {category.deals}
              </p>
            </CardContent>
          </Card>
        ))}

        <div className="flex w-full justify-center">
          <div
            onClick={() => {
              router.push('/products');
            }}
          >
            <Button className="bg-blue-500">View All Products</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
