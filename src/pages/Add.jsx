import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { TextField, Button, Card, CardContent, CardActions } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { bookSchema } from "../schemas";
import { useNavigate } from "react-router-dom";


const initialValues = {
  title: "",
  desc: "",
  price: null,
  cover: null,
};

const Add = () => {

  const [selectedFile, setSelectedFile] = useState("")
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: bookSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title)
        formData.append("desc", values.desc)
        formData.append("price", values.price)
        formData.append("cover", values.cover);

        const response = await axios.post("https://book-app-backend-imwc.onrender.com", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log("res", response)
        // console.log("form", formData)

        navigate("/", { replace: true });
      } catch (error) {
        console.log("error", error);
      } finally {
        resetForm();
      }
    },
  });

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    console.log(e.target.files[0]);
    setSelectedFile(img.name);
    setFieldValue("cover", img);
    localStorage.setItem("image", JSON.stringify(img));
  };

  console.log(selectedFile)
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 32 }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ maxWidth: 450, margin: "auto", textAlign: "center", height: "50vh" }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      variant="outlined"
                      label="Title"
                      name="title"
                      value={values.title || ''}
                      onChange={handleChange}
                      error={errors.title ? true : false}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      variant="outlined"
                      label="Description"
                      name="desc"
                      value={values.desc || ''}
                      onChange={handleChange}
                      error={errors.desc ? true : false}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      variant="outlined"
                      label="Price"
                      name="price"
                      value={values.price || ''}
                      onChange={handleChange}
                      error={errors.price ? true : false}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="file"
                      variant="outlined"
                      name="cover"
                      // value={selectedFile || ''}
                      onChange={handleFileChange}
                      inputProps={{ accept: "image/*" }}
                      error={errors.cover ? true : false}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Grid item xs={12}>
                    <Button variant="contained" type="submit" fullWidth >Submit
                    </Button>
                  </Grid>
                </CardActions>
              </form>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Add;
