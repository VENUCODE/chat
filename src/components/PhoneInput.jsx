import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Alert, Button, Input, InputGroup } from 'rsuite';
import { auth } from '../misc/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Phone = () => {
  const [number, setNumber] = useState(null);
  const [user, setuser] = useState(null);
  const [otp, setOtp] = useState('');
  const sendOtp = async () => {
    if (number.length === 12) {
      try {
        const captha = new RecaptchaVerifier(auth, 'recaptcha', {});
        console.log(number);
        const confirmation = await signInWithPhoneNumber(
          auth,
          number.substr(2, number.length),
          captha
        );
        setuser(() => confirmation);
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Alert.warning('Invalid number', 2000);
    }
  };

  const verifyOtp = async () => {
    // user.confirm();
    console.log(otp);
  };
  return (
    <div className="mt-3 ">
      <InputGroup.Addon>
        <PhoneInput
          country={'in'}
          value={number}
          onChange={function (value, data) {
            setNumber(value);
          }}
        />
        <Button block color="red" className="ml-2 " onClick={sendOtp}>
          Send OTP
        </Button>
      </InputGroup.Addon>

      <div id="recaptcha"></div>
      <InputGroup.Addon>
        <Input
          value={otp}
          onChange={(value, e) => {
            setOtp(value);
          }}
        />
        <Button block color="red" className="ml-2 " onClick={verifyOtp}>
          Send OTP
        </Button>
      </InputGroup.Addon>
    </div>
  );
};

export default Phone;
