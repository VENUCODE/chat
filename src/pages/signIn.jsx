import React from 'react';
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';
import { auth, database } from '../misc/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { serverTimestamp, ref, set } from 'firebase/database';

const SignIn = () => {
  const writeUserData = async (userId, name, email, imageUrl) => {
    try {
      const info = await set(ref(database, `/profiles/${userId}`), {
        username: name,
        email: email,
        profile_picture: imageUrl,
        created_at: serverTimestamp(),
      });
      console.log(info);
      Alert.info('Written', 2000);
    } catch (error) {
      Alert.warning(error.message, 2000);
    }
  };
  const singInwithProvide = async provider => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      writeUserData(
        result.user.uid,
        result.user.displayName,
        result.user.email,
        result.user.photoURL
      );
    } catch (error) {
      Alert.error(error.message);
      console.log(error.message);
    }
  };
  const signInwithGoogle = () => {
    singInwithProvide(new GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6} className="text-center">
            <Panel>
              <div>
                <h2>Let's Chat</h2>
                <p>A simple chatting application</p>
                <div className="mt-3">
                  <Button block color="orange" onClick={signInwithGoogle}>
                    <Icon icon={'google'} /> SignIn with Google
                  </Button>
                </div>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
