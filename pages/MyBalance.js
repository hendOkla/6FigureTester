import React,{ useState , useEffect } from 'react';
import NavbarUser from "@/components/_App/NavbarUser";
import { getDictionary } from "getDictionary";
import { useRouter } from 'next/router';
import axios from "axios";
import Link from "next/link";


import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';




const courses = () => {
    const router = useRouter();
    const { locale } = router;

    const [username, setUsername] = useState('');
    const [firstFollowerList, setFirstFollowerList] = useState([]);
    const [secondFollowerLists, setSecondFollowerLists] = useState([]);
    const [totalSum, setTotalSum] = useState([]);

    const [sumTotalCommission, setSumTotalCommission] = useState(0);

    
    let firstCounter = 0;
    let secondCounter = 0;
    useEffect(() => {
        // Get username from storage
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
        }
        // Fetch data using axios
        const fetchData = async () => {
            

            try {
                const res = await axios.get(`/api/get-attendBy/${username}`);
                if (res.data.status === 200) {
                setFirstFollowerList(res.data.attendBy);

                // Iterate over each element of the matrix
                const secondFollowerPromises = res.data.attendBy.map(async (element) => {
                    // Make a query for each element
                    const queryResult = await axios.get(`/api/get-attendBy/${element.username}`);
                    console.log(queryResult.data.dd);
                    return queryResult.data.attendBy;

                    
                });

                Promise.all(secondFollowerPromises).then((results) => {
                    setSecondFollowerLists(results);
                });
                } else {
                console.log('Not welcome');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };
        if (username) {
        fetchData();
        }
    }, [username]);
    useEffect(() => {
      // Toggle dropdown
        const handleClick = (event) => {
        event.target.parentElement.querySelector('.nested').classList.toggle('active');
        event.target.classList.toggle('caret-down');
        };
        const toggler = document.getElementsByClassName('caret');
        for (let i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener('click', handleClick);
        }
        return () => {
        for (let i = 0; i < toggler.length; i++) {
            toggler[i].removeEventListener('click', handleClick);
        }
    };
    }, [firstFollowerList]);


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
    },[]);


    


    
    const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
        [`& .${treeItemClasses.content}`]: {
          padding: theme.spacing(0.5, 1),
          margin: theme.spacing(0.2, 0),
        },
        [`& .${treeItemClasses.iconContainer}`]: {
          '& .close': {
            opacity: 0.3,
          },
        },
        [`& .${treeItemClasses.groupTransition}`]: {
          marginLeft: 15,
          paddingLeft: 18,
          borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
        },
      }));
      
      function ExpandIcon(props) {
        return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
      }
      
      function CollapseIcon(props) {
        return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
      }
      
      function EndIcon(props) {
        return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
      }
      

    const [treeItems, setTreeItems] = useState([]);
    useEffect(() => {
        axios.get(`/api/countWeek/${localStorage.getItem('username')}`)
          .then(res => {
            const data = res.data.payment;
            setTreeItems(data);
        })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);


    const [fetchedData, setFetchedData] = useState({}); // Additional data per item
  
    useEffect(() => {
      // Assuming treeItems contains data with usernames
      treeItems.forEach(item => {
        const fetchData = async () => {
          const response = await axios.get(`/api/countWeek/${item.username}`);
          if (response.status === 200) {
            setFetchedData(prevData => ({
              ...prevData,
              [item.id]: response.data.payment, // Assume data is in response.data.payment
            }));
          }
        };
        fetchData();
      });
    }, [treeItems]); 
    
    useEffect(() => {
        let totalCommission = 0;
        treeItems.forEach(item => {
          if (item.created_at === item.updated_at) {
            totalCommission += item.commission;
          } else {
            totalCommission += 25;
          }
      
          if (fetchedData[item.id] && Array.isArray(fetchedData[item.id])) {
            fetchedData[item.id].forEach(payment => {
              totalCommission += payment.amount * 0.01;
            });
          }
        });
        setSumTotalCommission(totalCommission);
    }, [treeItems, fetchedData]);

    
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
                                            <h2>{translations ? (translations.form.MyBalance) : ('')}</h2>
                                            
                                            
                                        </div>
                                        <div className="row">
                                            <div className="blog-area">
                                                <div className="container">
                                                <div className="row">
                                                    <div>                                               
                                                        <SimpleTreeView
                                                        aria-label="customized"
                                                        defaultExpandedItems={['1']}
                                                        slots={{
                                                            expandIcon: ExpandIcon,
                                                            collapseIcon: CollapseIcon,
                                                            endIcon: EndIcon,
                                                        }}
                                                        sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 300 }}
                                                        >
                                                            
                                                            <Link href="#" className="btn btn-primary">
                                                            Total Commission: {sumTotalCommission}
                                                            </Link>
                                                        <CustomTreeItem key="1" itemId="1" label={username}>
                                                            {treeItems.map(item => (
                                                            <CustomTreeItem key={item.id} itemId={item.id} label={item.username}>
                                                                <div style={{color:"#FFC107"}}>
                                                                    Commission: {(item.created_at ===item.updated_at)?item.commission:25}
                                                                </div>
                                                                {fetchedData[item.id] && Array.isArray(fetchedData[item.id]) ? (
                                                                fetchedData[item.id].map(payment => (
                                                                    <CustomTreeItem
                                                                    key={payment.id}
                                                                    itemId={payment.id}
                                                                    label={payment.username}
                                                                    >
                                                                    <div style={{color:"#FFC107"}}>
                                                                        Commission: {payment.amount*0.01}
                                                                    </div>
                                                                    </CustomTreeItem>
                                                                ))
                                                                ) : ''}
                                                            </CustomTreeItem>
                                                            ))}
                                                        </CustomTreeItem>
                                                        </SimpleTreeView>
                                                    </div> 
                                                </div>
                                                <div className='row'>
                                                    <div className="cart-table table-responsive" style={{ margin: '0 auto', width: '75%' }}>
                                                        <table className="table table-bordered">
                                                            <thead style={{color:'white'}}>
                                                                <tr>
                                                                    <th className='tb-text' scope="col" style={{fontSize:"30px"}}  colSpan="3"> 
                                                                        <h2>Company Bonus</h2>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr >
                                                                    <td className="product-thumbnail tb-text">X5</td> 
                                                                    <td className='tb-text'>500$</td>  
                                                                    <td className='tb-text'>{(firstCounter>=5)?firstCounter:'0'}</td>                            
                                                                </tr>
                                                                <tr >
                                                                    <td className="product-thumbnail tb-text"> X10</td>   
                                                                    <td className='tb-text'>MACBOOK AIR</td>       
                                                                    <td className='tb-text'>{(firstCounter>=10)?firstCounter:'0'}</td>                         
                                                                </tr>
                                                                <tr >
                                                                    <td className="product-thumbnail tb-text">X20</td>     
                                                                    <td className='tb-text'>PAID TRIP + 500%</td>  
                                                                    <td className='tb-text'>{(firstCounter>=20)?firstCounter:'0'}</td>                                                          
                                                                </tr>
                                                                <tr >
                                                                    <td className="product-thumbnail tb-text">X30</td>   
                                                                    <td className='tb-text'>2500$</td>   
                                                                    <td className='tb-text'>
                                                                    {firstCounter >= 15 && (firstCounter + secondCounter) >= 30 ? (
                                                                        <React.Fragment>
                                                                        {firstCounter + secondCounter}
                                                                        <br/>Congratulations
                                                                        </React.Fragment>
                                                                    ) : (
                                                                        '0'
                                                                    )}
                                                                    </td> 

                                                                </tr>
                                                                <tr >
                                                                    <td className="product-thumbnail tb-text">X60</td>         
                                                                    <td className='tb-text'>ROLEX</td>   
                                                                    <td className='tb-text'>
                                                                        {firstCounter >= 30 && (firstCounter + secondCounter) >= 60 ? (
                                                                        <React.Fragment>
                                                                            {firstCounter + secondCounter}
                                                                            <br/>Congratulations
                                                                        </React.Fragment>
                                                                        ) : (
                                                                        '0'
                                                                        )}
                                                                    </td>                    
                                                                </tr>
                                                                <tr >
                                                                    <td className="product-thumbnail tb-text">X150</td>    
                                                                    <td className='tb-text'>CAR WORTH 15.000$</td>      
                                                                    <td className='tb-text'>
                                                                    {firstCounter >= 75 && (firstCounter + secondCounter) >= 150 ? (
                                                                        <React.Fragment>
                                                                        {firstCounter + secondCounter}
                                                                        <br/>Congratulations
                                                                        </React.Fragment>
                                                                    ) : (
                                                                        '0'
                                                                    )}
                                                                    </td>                 
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
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

export default courses;