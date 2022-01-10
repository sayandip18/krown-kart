import {Button} from '@mui/material';
// Types
import { CartItemType } from '../App';
// Styles
import { Wrapper } from './CartItem.styles';

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => (
    <Wrapper>
        
    </Wrapper>
);

export default CartItem;