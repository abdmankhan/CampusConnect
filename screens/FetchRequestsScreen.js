import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

const FetchRequestsScreen = ({ navigation }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const toggleActions = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const requests = [
    { name: 'John Doe', item: 'Groceries', room: 'A-203', time: '5:00 PM' },
    { name: 'Jane Smith', item: 'Stationery', room: 'B-101', time: '3:30 PM' },
    { name: 'Michael Johnson', item: 'Snacks', room: 'C-302', time: '6:15 PM' },
    { name: 'Emily Davis', item: 'Books', room: 'D-404', time: '2:00 PM' },
    { name: 'Chris Lee', item: 'Medicine', room: 'E-105', time: '4:45 PM' },
    { name: 'Sophia Brown', item: 'Laundry', room: 'F-506', time: '1:20 PM' },
  ];

  return (
    <LinearGradient colors={["#29323c", "#485563"]} style={styles.container}>
      {/* Fixed Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={36} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Incoming Requests</Text>
        <LottieView
          source={{ uri: "https://assets1.lottiefiles.com/packages/lf20_t24tpvcu.json" }}
          autoPlay
          loop
          style={styles.animation}
        />

        {/* Multiple Request Cards */}
        {requests.map((request, index) => (
          <TouchableOpacity key={index} onPress={() => toggleActions(index)} activeOpacity={0.8}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Request from {request.name}</Text>
              <Text style={styles.cardDetails}>Item: {request.item}</Text>
              <Text style={styles.cardDetails}>Room: {request.room}</Text>
              <Text style={styles.cardDetails}>Time: {request.time}</Text>

              {expandedCard === index && (
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.acceptButton}>
                    <AntDesign name="checkcircle" size={24} color="white" />
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.declineButton}>
                    <AntDesign name="closecircle" size={24} color="white" />
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 50,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 100,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'Poppins_700Bold',
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  animation: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#007ACC',
    borderRadius: 25,
    padding: 25,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 15,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5f5f5',
    marginBottom: 12,
  },
  cardDetails: {
    fontSize: 18,
    color: '#dcdcdc',
    marginBottom: 6,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: '#28a745',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  declineButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
});

export default FetchRequestsScreen;
