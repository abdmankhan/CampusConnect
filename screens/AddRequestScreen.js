import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, 
    Platform, ScrollView, StyleSheet, Animated 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddRequestScreen({ navigation }) {
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [itemLocation, setItemLocation] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const scaleAnim = useState(new Animated.Value(1))[0];

    const handleSubmit = () => {
        if (!description || !cost || !pickupLocation || !itemLocation) {
            Alert.alert('Error', 'All fields except additional notes are required');
            return;
        }
        Alert.alert('Success', 'Request submitted');
        setDescription('');
        setCost('');
        setPickupLocation('');
        setItemLocation('');
        setAdditionalNotes('');
    };

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <LinearGradient colors={["#0F2027", "#203A43", "#2C5364"]} style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.innerContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.header}>Add Request</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Item Description' 
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            value={description} 
                            onChangeText={setDescription} 
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Approximate Cost' 
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            value={cost} 
                            onChangeText={setCost} 
                            keyboardType='numeric' 
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Where to Get Item (Location)' 
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            value={itemLocation} 
                            onChangeText={setItemLocation} 
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Preferred Pickup Location' 
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            value={pickupLocation} 
                            onChangeText={setPickupLocation} 
                        />
                        <TextInput 
                            style={styles.textArea} 
                            placeholder='Additional Notes (Optional)' 
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            value={additionalNotes} 
                            onChangeText={setAdditionalNotes} 
                            multiline
                        />

                        {/* Animated Button */}
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={handleSubmit}
                                onPressIn={handlePressIn}
                                onPressOut={handlePressOut}
                                activeOpacity={0.8}
                            >
                                <LinearGradient colors={['#16a085', '#1abc9c']} style={styles.buttonGradient}>
                                    <Text style={styles.buttonText}>Submit Request</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        flex: 1,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        padding: 20,
        borderRadius: 15,
        marginTop: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        padding: 14,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        fontSize: 16,
        color: '#fff',
    },
    textArea: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        padding: 14,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        fontSize: 16,
        color: '#fff',
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonGradient: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#16a085',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
