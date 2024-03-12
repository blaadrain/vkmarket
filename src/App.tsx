import Product, { ProductType } from './components/Product';
import { useDispatch, useSelector } from 'react-redux';
import {
  Status,
  fetchProducts,
  selectCart,
} from './store/cart-slice/cart-slice';
import { useEffect } from 'react';
import { AppDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector(selectCart);
  const total = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === Status.LOADING)
    return (
      <div className="h-full flex items-center justify-center">
        Загрузка корзины...
      </div>
    );
  if (status === Status.ERROR)
    return (
      <div className="h-full flex items-center justify-center">
        Не удалось загрузить содержимое корзины :(
      </div>
    );

  return (
    <div className=" max-w-[1024px] mx-auto p-12 grid grid-cols-4 gap-x-12">
      <div className="col-span-3">
        {products.length === 0 && (
          <div>В корзине пусто, перезагрузите страницу чтобы ее обновить</div>
        )}
        {products.map((product: ProductType) => (
          <Product
            key={product.id}
            {...product}
          />
        ))}
      </div>
      <div className="col-span-1 ">Итого: {total} руб.</div>
    </div>
  );
}

export default App;
