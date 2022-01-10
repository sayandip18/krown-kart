import { useState } from 'react';
import { useQuery } from 'react-query';
// components
import Item from './Item/Item';
import Cart from './Cart/Cart';
// Material UI
import { Drawer, LinearProgress, Grid, Badge } from '@mui/material';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// styles
import { Wrapper, StyledButton } from './App.styles';
// type
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async ():Promise<CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json();


function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);
  const getTotalItems = (items: CartItemType[]) => items.reduce((ack:number, item) => item.amount+ack, 0);
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
        <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => 
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
          )}
      </Grid>
    </Wrapper>
  );
}

export default App;
