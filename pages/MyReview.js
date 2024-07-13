import React, { useState } from 'react';
import NavbarUser from "@/components/_App/NavbarUser";
import { getDictionary } from "getDictionary";
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from "axios";
import swal from 'sweetalert';

const MyReview = () => {
    const router = useRouter();
    const { locale } = router;
    const { id } = router.query;
    const [translations, setTranslations] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const [myReviewInput, setMyReview] = useState({
    MyReview: '',
    error_list: [],
    });

    const handleInput = (e) => {
    e.persist();
    setMyReview({ ...myReviewInput, [e.target.name]: e.target.value });
    };

    React.useEffect(() => {
    // for translation
    async function fetchTranslations() {
        const translations = await getDictionary(locale);
        setTranslations(translations);
    }
    const authToken = window.localStorage.getItem('auth_token');
    if (authToken === null) {
        router.push({ pathname: '/login' });
    }
    fetchTranslations();
    }, [id]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = localStorage.getItem('id');
    const formData = new FormData();
    formData.append(`MyReview`, myReviewInput.MyReview);

    axios.post(`/api/MyReview/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
        if (res.data.status === 200) {
        swal('Success', res.data.reviews, 'success');
        router.push({ pathname: '/MyReview' });
        setIsLoading(false);
        setErrorList([]);
        setMyReview({ ...myReviewInput, MyReview: '' }); // Clear the textarea
        } else {
        setIsLoading(false);
        setErrorList(res.data.validation_errors);
        console.log(errorList.MyReview);
        }
    });
    };

    return (
    <>
        {translations ? (
        <>
            <NavbarUser />
            <div className="main">
            <div className="cardBox">
                <div className="container">
                <div className="hosting-features-area pt-80 pb-50 bg-f9f6f6">
                    <div className="container">
                    <div className="section-title">
                        <h2>{translations ? translations.form.MyReview : ''}</h2>
                        <div className="bar"></div>
                    </div>
                    <div className="ptb-80">
                        <div className="container">
                        <div className="auth-form">
                            <div className="auth-head">
                            <Link href="/it-startup">
                                <img src="/images/logo.png" style={{ width: '15%' }} />
                            </Link>
                            </div>
                            <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label" style={{ fontSize: "25px" }}>{translations ? translations.form.MyReview : ''}</label>
                                <textarea
                                className="form-control"
                                name="MyReview"
                                onChange={handleInput}
                                rows="10"
                                value={myReviewInput.MyReview} // Set the value of the textarea
                                ></textarea>
                                <span className='span span-reg'>{errorList.MyReview}</span>
                            </div>
                            {isLoading ?
                                (
                                <div className="containerLoadin" style={{ height: '30vh' }}>
                                    <div className="ring"></div>
                                    <div className="ring"></div>
                                    <div className="ring"></div>
                                    <span className="loading">Loading...</span>
                                </div>
                                ) : (
                                <button type="submit" className="btn btn-primary">Change</button>
                                )
                            }
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
        ) : (
        ''
        )}
    </>
    )
}

export default MyReview;