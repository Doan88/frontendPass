import React,{useState} from "react";
import {View,Text,TextInput,TouchableOpacity,Alert,ImageBackground,StyleSheet,Platform} from 'react-native';
import axios from "axios";

const url = 'https://backendpass-esvd.onrender.com';

const showAlert = (title, message) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      console.log("Missing credentials");
      showAlert("Warning", "Please enter both username and password");
      return;
    }
    try {
      const response = await axios.post(`${url}/login`, { username, password });
      navigation.replace("AddPassword", { token: response.data.token });
    } catch (err) {
      console.log("Login error:", err.message || err);
      showAlert("Warning", "Login Failed - Check your username and password");
    }
  };


    return (
        <ImageBackground style={styles.loginContainer} source={require('./assets/background.jpg')} resizeMode='cover'>
            <View style={styles.loginBox}>
                <Text style={styles.loginHeader}>Login</Text>
                <TextInput placeholder="Username" placeholderTextColor='rgb(0, 0, 0)' value={username} onChangeText={setUsername} style={styles.loginInput}/>
                <TextInput placeholder="Password" placeholderTextColor='rgb(0, 0, 0)' value={password} onChangeText={setPassword} style={styles.loginInput} secureTextEntry={true}/>
                <Text style={styles.generalText}>Not a member? - Click Register</Text>
                <View style={styles.loginRegisterButton}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButton} onPress={()=>navigation.navigate('Register')}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    loginContainer:{flex:1,justifyContent:'center', alignItems:'center',width: '100%',
    height: '100%'},
    loginBox:{ backgroundColor: 'rgba(255, 255, 255, 0.2)',background:'transparent', width: 310, padding: 10, borderRadius: 15, borderWidth: 1, borderColor:'white',shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.8,shadowRadius: 30,elevation: 10},
    loginHeader:{fontSize:45, fontWeight:'bold',color:'white', textAlign:'center', marginTop: 30, marginBottom: 30},
    loginInput:{borderWidth:1, padding: 10, marginTop: 10, marginBottom:10, borderRadius:25, borderColor:'white', color:'black', backgroundColor:'white'},
    generalText:{textAlign:'center', color:'white', fontSize:15},
    loginRegisterButton:{flexDirection:'row', alignItems:'center',justifyContent:'center'},
    loginButton:{backgroundColor:'white', borderRadius: 15, padding:10, width:130,marginTop: 10, marginRight: 15, marginBottom: 20},
    registerButton:{backgroundColor:'white', borderRadius: 15, padding:10, width:130, marginTop: 10, marginLeft: 15, marginBottom: 20},
    loginButtonText:{textAlign:'center', fontSize: 15, fontWeight:'bold', color:'#2c9bcf'},
    registerButtonText:{textAlign:'center', fontSize: 15, fontWeight:'bold', color:'#2c9bcf'}
});