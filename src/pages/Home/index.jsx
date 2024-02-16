import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { RoomsProvider } from '../../context/rooms.context';
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom/cjs/react-router-dom.min';
import Chat from './Chat';
import { useMediaQuery } from '../../misc/customhook';
import FourOfour from './NotFound';
const Home = () => {
  const isDesktop = useMediaQuery('(min-width:999px)');
  const { isExact } = useRouteMatch();
  const canRenderSidebar = isDesktop || isExact;

  // SECTION - whether we are on exact route
  return (
    <RoomsProvider>
      <Grid
        fluid
        style={{ overflowY: 'hidden', height: '100%', ' margin': '0' }}
      >
        <Row className="h-100 m-0 p-0">
          {canRenderSidebar && (
            <Col sm={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}

          {/* //SECTION -Home page is already private */}
          <Switch>
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100 bg-blue-100">
                <Chat />
              </Col>
            </Route>
            {/* //ANCHOR - 404 route */}
            {isDesktop && (
              <Col xs={24} md={16}>
                <FourOfour />
              </Col>
            )}
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
