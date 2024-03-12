import { ProductType } from '@/components/Product';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getProducts } from '@/actions/getProducts';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type InitialStateType = {
  products: ProductType[];
  status: Status;
};

const initialState: InitialStateType = {
  products: [],
  status: Status.LOADING,
};

export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async () => {
    try {
      const products = await getProducts();
      return products || [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );

      if (product && product.quantity < 10) product.quantity++;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );

      if (product && product.quantity > 1) product.quantity--;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => !(product.id === action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products = [];
        state.status = Status.LOADING;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.products = action.payload;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.products = [];
        state.status = Status.ERROR;
      });
  },
});

export const { addItem, removeItem, deleteItem } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
