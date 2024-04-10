import React from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function Review(props) {
   

    let userSchema = object({
        name: string().required(),
        email: string().email(),
        review: string().required(),
        rating: number().required(),
    });


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            review: '',
            rating: ''
        },
        validationSchema: userSchema,
        onSubmit: values => {
            console.log(values);
        },
    });



    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="border-bottom rounded">
                            <TextField
                                type="text"
                                id="name"
                                name="name"
                                className="form-control border-0 me-4"
                                placeholder="Your Name *"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.name && touched.name ? true : false}
                                helperText={
                                    errors.name && touched.name ? errors.name : ""
                                }
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="border-bottom rounded">
                            <TextField
                                type="email"
                                id="email"
                                name="email"
                                className="form-control border-0"
                                placeholder="Yur email *"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email && touched.email ? true : false}
                                helperText={
                                    errors.email && touched.email ? errors.email : ""
                                }
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="border-bottom rounded my-4">
                            <TextField
                                type="text"
                                id="review"
                                name="review"
                                className="form-control border-0"
                                cols={30}
                                rows={8}
                                placeholder="Your Review *"
                                spellCheck="false"
                                defaultValue={""}
                                value={values.review}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.review && touched.review ? true : false}
                                helperText={
                                    errors.review && touched.review ? errors.review : ""
                                }
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-between py-3 mb-5">
                            <div className="d-flex align-items-center">
                                <p className="mb-0 me-3">Please rate:</p>
                                <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                                <Stack spacing={1}>
                                    <Rating
                                      defaultValue={0}
                                      precision={0.5}
                                      id="rating"
                                      name="rating"
                                      value={values.rating}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={
                                        errors.rating && touched.rating ? true : false
                                      }
                                      helperText={
                                        errors.rating && touched.rating
                                          ? errors.rating
                                          : ""
                                      }
                                    />
                                  </Stack>
                                </div>
                            </div>
                            <Button
                                className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                                type="submit"
                            >
                                Post Comment
                            </Button>

                            {/* <input type='submit' className="btn border border-secondary text-primary rounded-pill px-4 py-3" placeholder="Post Comment"/> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Review;