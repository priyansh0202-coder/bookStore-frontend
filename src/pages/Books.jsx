import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, AppBar, Toolbar, IconButton, Badge, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../redux/cartSlice';
import SearchIcon from '@mui/icons-material/Search';


const Books = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cart);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await axios.get('https://book-app-backend-imwc.onrender.com');
                setBooks(response.data);
                setFilteredBooks(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllBooks();
    }, []);

    const [searchVal, setSearchVal] = useState("");

    const handleSearch = () => {
        console.log("without memo")
        if (searchVal === "") {
            setFilteredBooks(books);
        } else {
            const filterBySearch = books.filter((item) =>
                item.title.toLowerCase().includes(searchVal.toLowerCase())
            );
            setFilteredBooks(filterBySearch);
        }
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: " black" }}>
            <AppBar position="sticky" style={{ backgroundColor: "gray" }}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" component="div">
                            Books Store
                        </Typography>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", height: 35, borderRadius: 3 }}>
                        <TextField
                            type='search'
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            placeholder="Search books..."
                            variant="outlined"
                            size="small"
                            style={{ marginRight: 8 }}
                        />
                        <IconButton onClick={handleSearch} style={{ padding: 7 }}>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <IconButton component={Link} to="/cart" style={{ color: 'inherit' }}>
                        <Badge badgeContent={cartItems.length} color="error">
                            Cart
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{ flex: 1, padding: 16 }}>
                <h1 style={{ color: "white", fontStyle: "italic" }}>All Books</h1>
                <Button variant='contained' color='success' style={{ marginTop: 16, position: 'absolute', top: 85, right: 5 }} >
                    <Link to='/add' style={{ textDecoration: 'none', color: 'inherit' }}>
                        Add new book
                    </Link>
                </Button>
                <Grid container spacing={2} justifyContent="center">
                    {filteredBooks.map((book) => (
                        <Grid item key={book.id} xs={12} sm={6} md={4}>
                            <Card style={{ marginBottom: 16, backgroundColor: "white", maxWidth: 450 }}>
                                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {book.cover && (
                                        <img src={`/upload/${book.cover}`} alt='Book Cover' style={{ height: 200, objectFit: 'cover', marginBottom: 16 }} />
                                    )}
                                    <Typography variant='h5' component='div' style={{ textAlign: 'center', marginBottom: 8, fontStyle: "oblique", fontSize: "25px" }}>
                                        {book.title}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary' style={{ textAlign: 'center', marginBottom: 8, color: "black", fontStyle: "italic", fontSize: "20px" }}>
                                        {book.desc}
                                    </Typography>
                                    <Typography variant='body1' color='primary' style={{ textAlign: 'center', marginBottom: 8, color: "black" }}>
                                        Price: {book.price}
                                    </Typography>
                                    <Button variant='contained' color='primary' onClick={() => dispatch(addtoCart({
                                        cover: book.cover,
                                        title: book.title,
                                        desc: book.desc,
                                        price: book.price,
                                    }))}>
                                        Add to cart
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div >
    );
};

export default Books;


