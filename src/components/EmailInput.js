import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';

const EmailInput = ({ checkEmailAvailability }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email.length >= 3) {
        checkEmailAvailability(email).then((isAvailable) => {
          setIsValid(isAvailable);
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [email, checkEmailAvailability]);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={handleEmailChange}
      />
      {!isValid && email.length >= 3 && (
        <Text style={{ color: 'red' }}>Email non disponible.</Text>
      )}
    </View>
  );
};

export default EmailInput;
