import React from 'react';
import * as Icon from 'react-feather';

const ContactInfo = () => {
    return (
        <>
            <div className="contact-info-area ptb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="contact-info-box">
                                <div className="icon">
                                    <Icon.Mail />
                                </div>
                                <h3>Mail Here</h3>
                                <p><a href="mailto:6figure-earner@6figure-earner.com">6figure-earner@6figure-earner.com</a></p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="contact-info-box">
                                <div className="icon">
                                    <Icon.MapPin />
                                </div>
                                <h3>Visit Here</h3>
                                <p>Dubai, United Arab Emirates</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="contact-info-box">
                                <div className="icon">
                                    <Icon.Phone />
                                </div>
                                <h3>Call Here</h3>
                                <p><a href="tel:+1234567890">+971545565988</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactInfo;  