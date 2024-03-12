import { addItem, removeItem, deleteItem } from '@/store/cart-slice/cart-slice';
import { AppDispatch } from '@/store/store';
import { Plus, Minus, Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';

export type ProductType = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

const Product = ({ id, title, price, quantity, thumbnail }: ProductType) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex my-8 pb-4 border-b">
      <img
        src={thumbnail}
        className="h-24 w-24 rounded-md"
      />
      <div className="ml-4 flex flex-col justify-between">
        <span>{title}</span>
        <button className="mr-auto">
          <Trash
            onClick={() => dispatch(deleteItem(id))}
            className="hover:text-neutral-500 transition"
          />
        </button>
      </div>
      <div className="ml-auto flex flex-col justify-between w-32">
        <span>{price * quantity}₽</span>
        <div className="flex justify-between gap-x-4 bg-neutral-200 rounded-lg p-2">
          <button
            onClick={() => dispatch(removeItem(id))}
            disabled={quantity === 1}
          >
            <Minus className="hover:text-neutral-500 transition" />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => dispatch(addItem(id))}
            disabled={quantity === 10}
          >
            <Plus className="hover:text-neutral-500 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
