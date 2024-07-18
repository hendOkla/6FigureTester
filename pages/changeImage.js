import React,{ useState, useEffect } from 'react';
import NavbarUser from "@/components/_App/NavbarUser";
import { getDictionary } from "getDictionary";
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from "axios";
import swal from 'sweetalert';

const changeImage = () => {
  const [file, setFile] = useState(null);
  const [translations, setTranslations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [CustomerInput,  setCustomer] = useState([]);

  const router = useRouter();
  const { locale } = router;
  const [errorConf,setErrorCont] = useState([]);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const id =localStorage.getItem('id');
    axios.post(`/api/uploadImage/${id}`,formData ,{headers: {'Content-Type': 'multipart/form-data',}}).then(res=>{
      if(res.data.status ===200){
        swal('Success',res.data.message,'success');
        router.push({pathname: '/homeUser'});
      }else{
        console.log(res.data.message);
        setErrorCont('upload file is require....');        
      }
    }) 
  };

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


      axios.get(`/api/edit-customer/${localStorage.getItem('id')}`).then(res=>{
        if(res.data.status === 200){
            setCustomer(res.data.customer);
            
        }
      }); 
  },[]);

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
                                    <h2>CHange profile image</h2>
                                    <div className="bar"></div>
                                </div>      
                                <div className="ptb-80">
                                    <div className="container">
                                        <div className="auth-form">
                                            <div className="auth-head">
                                                <Link href="/it-startup">
                                                    <img className='custom-image' src={CustomerInput.image ? `https://6figure-earner.com/LarReApi/public/${CustomerInput.image}` : '/images/logo-sidebar.png'} />

                                                    
                                                </Link>
                                            </div>
                                            <form>
                                                <div className="mb-3">
                                                    <label className="form-label"> Choose the picture</label>
                                                    <input type="file" className="form-control" onChange={handleFileChange} />
                                                    <span className='span'>{errorConf}</span>
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
                                                        <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
                              
                                                    )
                                                }
                                            </form>
                                        </div>
                                    </div>
                                </div> 

                                {/* //////////////////////////// */}
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
  );
};

export default changeImage;