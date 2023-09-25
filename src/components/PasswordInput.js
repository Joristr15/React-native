import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const PasswordInput = ({ minLength, maxLength, minDigits, minSpecialChars }) => {
  const [password, setPassword] = useState('');
  const [validations, setValidations] = useState([]);

  const validatePassword = (password) => {
    const validations = [];
    if (password.length < minLength) {
      validations.push(`Le mot de passe doit contenir au moins ${minLength} caractères.`);
    }
    if (password.length > maxLength) {
      validations.push(`Le mot de passe ne doit pas dépasser ${maxLength} caractères.`);
    }
    if (password.replace(/[^0-9]/g, "").length < minDigits) {
      validations.push(`Le mot de passe doit contenir au moins ${minDigits} chiffres.`);
    }
    if (password.replace(/[^!@#$%^&*()_+{}[\]:;<>,.?~\\-=|\\/]/g, "").length < minSpecialChars) {
      validations.push(`Le mot de passe doit contenir au moins ${minSpecialChars} caractères spéciaux.`);
    }
    return validations;
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    const validations = validatePassword(text);
    setValidations(validations);
  };

  return (
    <View>
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={handlePasswordChange}
      />
      {validations.map((validation, index) => (
        <Text key={index} style={{ color: 'red' }}>{validation}</Text>
      ))}
    </View>
  );
};

export default PasswordInput;
