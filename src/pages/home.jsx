import React from 'react';
import { useProfile } from '../context/profile.context';
import { Col, Container, Grid, Row } from 'rsuite';

const Home = () => {
  const { profile } = useProfile();
  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6} className="text-center ">
            <div>{profile.username}</div>
            <div>{profile.email}</div>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Home;
