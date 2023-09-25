import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, DatePickerIOS, Alert } from 'react-native';
import * as Location from 'expo-location';

const CreateMaterialScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour obtenir la localisation en cours
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        }
      } catch (error) {
        console.error('Erreur lors de l\'obtention de la localisation :', error);
      }
    };

    getLocation(); // Appelez la fonction pour obtenir la localisation au chargement de l'écran
  }, []);

  const handleSaveMaterial = () => {
    // Vérifiez si tous les champs requis sont remplis
    if (!name || !description) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Vérifiez si la date de début est antérieure à la date de fin
    if (startDate >= endDate) {
      Alert.alert('Erreur', 'La date de début doit être antérieure à la date de fin.');
      return;
    }

    // Vous pouvez maintenant sauvegarder les données dans votre base de données.
    // Remplacez cette partie par votre propre logique de sauvegarde.

    // Réinitialisez les champs après la sauvegarde
    setName('');
    setDescription('');
    setStartDate(new Date());
    setEndDate(new Date());

    Alert.alert('Succès', 'Le matériel a été enregistré avec succès.');
  };

  return (
    <View>
      <TextInput
        placeholder="Nom du matériel"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Text>Date de début:</Text>
      <DatePickerIOS
        mode="date"
        date={startDate}
        onDateChange={(date) => setStartDate(date)}
      />
      <Text>Date de fin:</Text>
      <DatePickerIOS
        mode="date"
        date={endDate}
        onDateChange={(date) => setEndDate(date)}
      />
      {location && (
        <View>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
      <Button title="Enregistrer" onPress={handleSaveMaterial} />
    </View>
  );
};

export default CreateMaterialScreen;
