// components/Tabs.js
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const MyTabs = () => {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        <p>Content for Home tab</p>
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <p>Content for Profile tab</p>
      </Tab>
      <Tab eventKey="contact" title="Contact">
        <p>Content for Contact tab</p>
      </Tab>
    </Tabs>
  );
};

export default MyTabs;