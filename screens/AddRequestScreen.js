import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, 
    Platform, ScrollView, StyleSheet, Animated, Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function AddRequestScreen({ navigation }) {
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [itemLocation, setItemLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [urgency, setUrgency] = useState('Medium');
    const [expiryTime, setExpiryTime] = useState('1 hour');
    const [customExpiry, setCustomExpiry] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!description || !cost || !pickupLocation || !itemLocation || !phoneNumber || !category) {
            Alert.alert('Error', 'All fields except additional notes are required');
            return;
        }

        const finalExpiryTime = expiryTime === 'custom' ? customExpiry : expiryTime;
        if (expiryTime === 'custom' && !customExpiry.trim()) {
            Alert.alert('Error', 'Please enter a custom expiry time');
            return;
        }
        const requestData = {
            description,
            cost,
            pickupLocation,
            itemLocation,
            phoneNumber,
            urgency,
            expiryTime: finalExpiryTime,
        };
        Alert.alert('Success', 'Request submitted successfully');
        setDescription('');
                setCost('');
                setPickupLocation('');
                setItemLocation('');
                setPhoneNumber('');
                setUrgency('Medium');
                setExpiryTime('1 hour');
                setCustomExpiry('');
                setImage(null);   
                setCategory('');  
                
        // try {
        //     const response = await fetch('https://your-backend-api.com/api/requests', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(requestData),
        //     });

        //     const result = await response.json();

        //     if (response.ok) {
        //         Alert.alert('Success', 'Request submitted successfully');
        //         setDescription('');
        //         setCost('');
        //         setPickupLocation('');
        //         setItemLocation('');
        //         setAdditionalNotes('');
        //         setPhoneNumber('');
        //         setUrgency('Medium');
        //         setExpiryTime('1 hour');
        //         setCustomExpiry('');
        //     } else {
        //         Alert.alert('Error', result.message || 'Something went wrong');
        //     }
        // } catch (error) {
        //     Alert.alert('Error', 'Failed to connect to the server');
        //     console.error(error);
        // }
        
    };

    return (
        <LinearGradient colors={['#0F2027', '#203A43', '#2C5364']} style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.innerContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back' size={24} color='#fff' />
                    </TouchableOpacity>
                    <Text style={styles.header}>Add Request</Text>
                    <View style={styles.formContainer}>
                        {[ 
                            { placeholder: 'Item Description', value: description, setter: setDescription, icon: 'clipboard-outline' },
                            { placeholder: 'Approximate Cost', value: cost, setter: setCost, icon: 'cash-outline', keyboardType: 'numeric' },
                            { placeholder: 'Where to Get Item (Location)', value: itemLocation, setter: setItemLocation, icon: 'location-outline' },
                            { placeholder: 'Preferred Pickup Location', value: pickupLocation, setter: setPickupLocation, icon: 'navigate-outline' },
                            { placeholder: 'Phone Number', value: phoneNumber, setter: setPhoneNumber, icon: 'call-outline', keyboardType: 'phone-pad' },
                            { placeholder: 'Category', value: category, setter: setCategory, icon: 'list-outline' }
                        ].map((input, index) => (
                            <View key={index} style={styles.inputWithIcon}>
                                <Ionicons name={input.icon} size={20} color='#fff' style={styles.icon} />
                                <TextInput 
                                    style={styles.inputText} 
                                    placeholder={input.placeholder} 
                                    placeholderTextColor='#ccc' 
                                    value={input.value} 
                                    onChangeText={input.setter} 
                                    keyboardType={input.keyboardType || 'default'}
                                />
                            </View>
                        ))}
                        <Text style={styles.label}>Urgency Level</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={urgency} onValueChange={(itemValue) => setUrgency(itemValue)} style={styles.picker}>
                                <Picker.Item label='Low' value='Low' />
                                <Picker.Item label='Medium' value='Medium' />
                                <Picker.Item label='High' value='High' />
                            </Picker>
                        </View>
                        <Text style={styles.label}>Request Expiry Time</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={expiryTime} onValueChange={(itemValue) => setExpiryTime(itemValue)} style={styles.picker}>
                                <Picker.Item label='30 minutes' value='30 minutes' />
                                <Picker.Item label='1 hour' value='1 hour' />
                                <Picker.Item label='2 hours' value='2 hours' />
                                <Picker.Item label='Custom' value='custom' />
                            </Picker>
                        </View>
                        {expiryTime === 'custom' && (
                            <TextInput style={styles.input} placeholder='Enter custom expiry time' placeholderTextColor='#ccc' value={customExpiry} onChangeText={setCustomExpiry} />
                        )}
                        <Text style={styles.label}>Upload Image</Text>
                        <TouchableOpacity style={styles.button} onPress={pickImage}>
                            <LinearGradient colors={['#ff9966', '#ff5e62']} style={styles.buttonGradient}>
                                <Text style={styles.buttonText}>Pick an Image</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <LinearGradient colors={['#16a085', '#1abc9c']} style={styles.buttonGradient}>
                                <Text style={styles.buttonText}>Submit Request</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    innerContainer: { flex: 1 },
    scrollContainer: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 40, marginTop: 30 },
    formContainer: { backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: 20, borderRadius: 15 },
    backButton: { position: 'absolute', top: 20, left: 20, zIndex: 10 },
    input: { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10, fontSize: 16, color: '#fff', marginBottom: 15 },
    inputWithIcon: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 15 },
    inputText: { flex: 1, padding: 10, fontSize: 16, color: '#fff' },
    icon: { marginRight: 10 },
    label: { color: '#fff', fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
    pickerContainer: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, marginBottom: 15 },
    picker: { color: '#fff' },
    button: { borderRadius: 10, overflow: 'hidden', marginTop: 20 },
    buttonGradient: { paddingVertical: 15, alignItems: 'center', borderRadius: 10 },
    buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
    imageUpload: { alignItems: 'center', padding: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, marginBottom: 15 },
    uploadText: { color: '#fff', marginTop: 5 },
    imagePreview: { width: '100%', height: 200, borderRadius: 10, marginTop: 10 },
});










