import React,{useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,Alert,ImageBackground,StyleSheet,Platform} from 'react-native';
import axios from 'axios';

const url = 'https://backendpass-esvd.onrender.com';

const showAlert = (title, message) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function RegisterScreen({navigation}){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleRegister = async ()=>{
        if(!username || !password){
            console.log("Missing credentials");
            showAlert("Warning", "Please enter both username and password");
            return;
        }
        try{
            await axios.post(`${url}/register`,{username,password});
            console.log('Registered Successfully');
            navigation.navigate('Login');
        }catch(err){
            console.log('Username might be taken');
            showAlert('Warning','Username might be taken')
        }
    };

    return(
        <ImageBackground style={styles.registerContainer} source={require('./assets/background.jpg')} resizeMode='cover'>
            <View style={styles.registerBox}>
                <Text style={styles.registerHeader}>Register</Text>
                <TextInput placeholder='Username' placeholderTextColor='black' value={username} onChangeText={setUsername} style={styles.registerInput}/>
                <TextInput placeholder='Password' placeholderTextColor='black' value={password} onChangeText={setPassword} style={styles.registerInput} secureTextEntry={true}/>
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    registerContainer:{flex:1,justifyContent:'center', alignItems:'center',width: '100%',
    height: '100%'},
    registerBox:{ backgroundColor: 'rgba(255, 255, 255, 0.2)',background:'transparent', width: 310, padding: 10, borderRadius: 15, borderWidth: 1, borderColor:'white',shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.8,shadowRadius: 30,elevation: 10, alignItems:'center'},
    registerHeader:{fontSize:45, fontWeight:'bold',color:'white', textAlign:'center', marginTop: 30, marginBottom: 30},
    registerInput:{borderWidth:1, padding: 10, marginTop: 10, marginBottom:10, borderRadius:25, borderColor:'white', width:'100%',color:'black',backgroundColor:'white'},
    registerButton:{backgroundColor:'white', borderRadius: 15, padding:10, width:130, marginTop: 10, marginLeft: 20, marginBottom: 20},
    registerButtonText:{textAlign:'center', fontSize: 15, fontWeight:'bold', color:'#2c9bcf'},

});