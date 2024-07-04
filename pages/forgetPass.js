import React,{ useState, useEffect } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import { useRouter } from 'next/router';
import * as Icon from 'react-feather';
import swal from 'sweetalert';
import Link from 'next/link';
import axios from 'axios';
import { getDictionary } from "getDictionary";
 
const Login = () => {
    const router = useRouter();

    const { locale } = router;
    const { pathname, query } = router;
    const [translations, setTranslations] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const[loginInput, setLogin]= useState({
        email:'',
        password:'',
        error_list:[],
    });
    const handleInput=(e)=>{
        e.persist(); 
        setLogin({...loginInput,[e.target.name]:e.target.value});        
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        setIsLoading(true);

        const data ={
            email :loginInput.email,
        }
          //CHECK IF PASSWORD EQUAL CONFIRM PASSWORD  
        axios.get(`/sanctum/csrf-cookie`).then(response=>{
            axios.post(`/api/resetPassword`,data).then(res=>{

                console.log(res.data.status);
                
                if(res.data.status===200){
                    swal("Success",res.data.message,"success");  
                    setIsLoading(false);          
                }else if(res.data.status == 401){
                    swal("Warning",res.data.message,"warning");   
                    setIsLoading(false);                    
                }else if(res.data.status===402){
                    swal("Warning",res.data.message,"warning");   
                    setIsLoading(false);
                }else{
                    setLogin({...loginInput,error_list:res.data.validation_errors});
                    setIsLoading(false);
                }
            })
        })
    }
    useEffect(()=>{
        //for translation 
        async function fetchTranslations() {
            const translations = await getDictionary(locale);
            setTranslations(translations);
        }
        fetchTranslations();
    },[]);
    return (
        <>
            <Navbar />

            <PageBanner pageTitle={translations ? (translations.form.PasswordReset) : ('')}/>

            <div className="ptb-80">
                <div className="container">
                    <div className="auth-form">
                        <div className="auth-head">
                            <Link href="/it-startup">
                                <img src="/images/logo.png" style={{width:'50%'}} />
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">{translations ? (translations.form.email) : ('')}</label>
                                <input type="email"
                                        className="form-control"
                                        name="email"
                                        onChange={handleInput}
                                />
                                <span className='span span-reg'>{loginInput.error_list.email}</span>
                            </div>
                            {isLoading ? 
                                (
                                    <div className="containerLoadin" style={{height:'30vh'}}>
                                        <div className="ring"></div>
                                        <div className="ring"></div>
                                        <div className="ring"></div>
                                        <span className="loading">Loading...</span>            
                                    </div>
                                ) : (
                                    <button type="submit" className="btn btn-primary">{translations ? (translations.form.sendEmail) : ('')}</button>                                
                                )
                            }
                        </form>
                        <div className="foot">
                            <p></p>
                            <ul>
                                <li>
                                    <a href="https://www.mail.com/" target="_blank">
                                        <Icon.Mail />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/" target="_blank">
                                        <Icon.Facebook />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.twitter.com/" target="_blank">
                                        <Icon.Twitter />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
 
            <Footer />
        </>
    )
}

export default Login;
