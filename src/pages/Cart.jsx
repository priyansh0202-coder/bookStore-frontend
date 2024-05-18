import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, AppBar, Toolbar, IconButton, Badge, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart, removeFromCart } from '../redux/cartSlice';


const Cart = () => {

    const cartItems = useSelector(state => state.cart.cart);
    console.log(cartItems)
    const dispatch = useDispatch();

    const calculateTotalPrice = () => {
        console.log("cart", cartItems)
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

    };
    const removeItem = (index) => {
        const shallowCart = [...cartItems];
        console.log("shollow", shallowCart)
        const removeItems = shallowCart.filter((item, ind) => ind !== index)
        console.log("remove", removeItems)
        // shallowCart.splice(index, 1)
        dispatch(removeFromCart(removeItems))
        console.log("vvvv", removeFromCart)

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: "black" }}>
            <AppBar position="sticky" style={{ backgroundColor: "gray" }}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" component="div">
                            Books Store
                        </Typography>
                    </Link>
                    <IconButton component={Link} to='/cart' style={{ color: 'inherit' }}>
                        <Badge badgeContent={cartItems.length} color="error">
                            Cart
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{ maxWidth: 800, width: '100%', padding: 16, color: "white" }}>
                <h1>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <Typography variant="body1">
                        Your cart is empty
                    </Typography>
                ) : (
                    <Grid container spacing={2} justifyContent="center">
                        {cartItems.map((item, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card style={{ height: '100%', backgroundColor: "gray" }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={`/upload/${item.cover}`} alt='Book Cover' style={{ height: 150, width: '100%', objectFit: 'cover', marginBottom: 8 }} />
                                        <Typography variant='h6' component='div'>
                                            {item.title}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary' style={{ marginBottom: 8, color: "black" }}>
                                            {item.desc}
                                        </Typography>
                                        <Typography variant='body1' color='primary' style={{ color: "black" }}>
                                            Price: ${item.price.toFixed(2)}
                                        </Typography>
                                        <Button size="small" variant='contained' style={{ marginTop: 5 }} onClick={() => removeItem(index)}>Remove</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
                <Typography variant='h6' component='div' style={{ marginTop: 16 }}>
                    Total Price: ${calculateTotalPrice()}
                </Typography>
                <Button variant='contained' color='primary' style={{ marginTop: 16 }} onClick={(item) => dispatch(addtoCart({
                    cover: item.cover,
                    title: item.title,
                    desc: item.desc,
                    price: item.price,
                }))}>
                    <Link to='/checkout' style={{ textDecoration: 'none', color: 'inherit' }}>
                        Checkout
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default Cart;



