import React from 'react'
import { Button, Col, Container ,Grid, Icon, Panel, Row} from 'rsuite';
import { auth } from '../misc/firebase';
import {signInWithPopup,GoogleAuthProvider}  from "firebase/auth";
const SignIn = () => {
    const singInwithProvide= async (provider)=>{
        try{
        const result =await signInWithPopup(auth,provider);
        console.log(result);
        }
        catch(error){
            console.log(error.message);

        }
    }
    const signInwithGoogle=()=>{
        singInwithProvide(new GoogleAuthProvider());
    }

  return (
    <Container>
        <Grid className='mt-page'>
            <Row>
                <Col xs={24} md={12} mdOffset={6} className='text-center'>
                    <Panel>
                        <div>
                            <h2>Let's Chat</h2>
                            <p>A simple chatting application</p>
                            <div className="mt-3">
                                <Button block color='orange' onClick={signInwithGoogle} >
                                    <Icon icon={"google"} /> SignIn with Google
                                </Button>
                            </div>
                        </div>
                        
                    </Panel>
                </Col>
            </Row>

        </Grid>
    </Container>
  )
}

export default SignIn;
