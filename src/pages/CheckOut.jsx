import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const CheckOut = () => {
    const cartItems = useSelector(state => state.cart.cart) || [];
    console.log('Cart Items:', cartItems);

    return (
        <Grid container spacing={2} alignItems="flex-start" marginTop={2}>
            <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="City"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="State"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Zip/Postal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button variant='contained' color='primary'>Go to payment</Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6} md={3}>
                <Typography variant='h6' gutterBottom>Cart Items</Typography>
                <Grid container spacing={2}>
                    {cartItems.filter(item => item && item.title).map((item, index) => (
                        <Grid item key={index} xs={10}>
                            <Card style={{ backgroundColor: "white", marginRight: 10 }}>
                                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {item.cover && <img src={`/upload/${item.cover}`} alt='Book Cover' style={{ height: 150, width: '100%', objectFit: 'cover', marginBottom: 8 }} />}
                                    <Typography variant='h6'>
                                        {item.title}
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary' style={{ marginBottom: 8 }}>
                                        {item.desc}
                                    </Typography>
                                    {item.price !== undefined && (
                                        <Typography variant='body1' style={{ marginTop: 8 }}>
                                            Price: ${item.price.toFixed(2)}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CheckOut;
