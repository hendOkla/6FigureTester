
import React,{ useState } from 'react';
import NavbarUser from "@/components/_App/NavbarUser";
import { getDictionary } from "getDictionary";
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from "axios";
import { Carousel } from 'react-bootstrap';



 
const homeUser = () => {
    const router = useRouter();
    const { locale } = router;
    const { id } = router.query;
    const [translations, setTranslations] = useState(null);
    

    React.useEffect(() => {
        //for translation 
        async function fetchTranslations() {
            const translations = await getDictionary(locale);
            setTranslations(translations);
        }        

        const authToken = window.localStorage.getItem('auth_token');
        if (authToken === null) {
            router.push({pathname: '/login'});
        }

        fetchTranslations(); 
    },[id]);


    

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
                                            <h2>Home</h2>
                                            <div className="bar"></div>
                                        </div>      
                                        <Carousel>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjnCko3aMHJBVpBz9FSrFHcvR4pw4nzjpjEYjnLtn3GYKZW-jPdIGE_Unug&s"
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjnCko3aMHJBVpBz9FSrFHcvR4pw4nzjpjEYjnLtn3GYKZW-jPdIGE_Unug&s"
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                            {/* Add more Carousel.Items for additional images */}
                                        </Carousel> 
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

export default homeUser;