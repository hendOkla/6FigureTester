import React,  { useState ,useEffect  }  from 'react';
import NavbarUser from "@/components/_App/NavbarUser";



const About1 = () => {
    const [selectedItem, setSelectedItem] = useState(null);


    const handleMouseOver = (event) => {
        const listItems = document.querySelectorAll(".navigation li");
        listItems.forEach((item) => {
        item.classList.remove("hovered");
        });
        event.target.classList.add("hovered");
    };

    const handleToggle = () => {
        const navigation = document.querySelector(".navigation");
        const main = document.querySelector(".main");
        navigation.classList.toggle("active");
        main.classList.toggle("active");
    };

    const handleItemClick = (event) => {
        const content = event.currentTarget.querySelector('.dropdown-content');

        // Hide all dropdown contents except the one clicked
        document.querySelectorAll('.dropdown-content').forEach(content => {
        content.style.display = 'none';
        });

        if (content) {
        // Toggle display for the clicked item's dropdown content
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }

        // Update selected item
        setSelectedItem(event.currentTarget);

        
    };

    useEffect(() => {
        const items = document.querySelectorAll('.list');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                // Remove selected class from all items
                items.forEach((item) => {
                    item.classList.remove('selected');
                });

                // Add selected class to the clicked item
                item.classList.add('selected');
            });
        });

  
        
    }, []);
    return (
        <>
            <NavbarUser/>           
            <div className="main">
                <div className="cardBox">
                    <div className="container">
                    welcome

                    
                    welcome
                    </div>
                </div>
            </div>
        </>
    )
}

export default About1;