import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../components/Sidebar';
import { RoomsProvider } from '../context/rooms.context';

const Home = () => {
  return (
    <RoomsProvider>
      <Grid
        fluid
        style={{ 'overflow-y': 'hidden', height: '100%', ' margin': '0' }}
      >
        <Row className="h-100 m-0 p-0">
          <Col sm={24} md={8} className="h-100">
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
