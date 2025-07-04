import React, {useState } from "react";
import {View,Text,TextInput,TouchableOpacity,ImageBackground,StyleSheet} from 'react-native';
import axios from "axios";

const url = 'https://backendpass-esvd.onrender.com';


export default function EditPassword({route,navigation}){
    const {token,passwordItem,onGoBack} = route.params;
    const [inputForm,setInputForm] = useState({account:passwordItem.account,password:passwordItem.password,notes:passwordItem.notes});

    const addInput = (key,value) => {
        setInputForm(prev => ({...prev,[key]:value}));
    };

    const handleUpdate = async() =>{
        try{
            const response = await axios.put(`${url}/edit/${passwordItem.id}`,inputForm,{headers:{Authorization: `Bearer ${token}`}});
            if (response.data.status === 'UPDATE PASSWORD SUCCESSFULLY'){
                console.log('Update password successfully');
                navigation.goBack();
            }
        }catch(err){
            console.error('Cannot edit password',err);
        }
    };

    return(
        <ImageBackground style={styles.container} source={require('./assets/background.jpg')} resizeMode="cover">
            <View style={styles.titleWrapper}>
                <Text style = {styles.title}>PASSWORDS MANAGER</Text>
            </View>

            <View style={styles.subContainer}>
                <View style = {styles.headerForm}>
                    <Text style = {styles.headingForm}>Edit Passwords</Text>
                </View>

                <View style = {styles.accountInputForm}>
                    <Text style = {styles.accountInputHeading}>Account:</Text>
                    <TextInput style = {styles.accountInput} placeholder = 'Account' value = {inputForm.account} onChangeText = {text => addInput('account',text)}/>
                </View>
                <View style = {styles.passwordInputForm}>
                    <Text style = {styles.passwordInputHeading}>Password:</Text>
                    <TextInput style = {styles.passwordInput} placeholder = 'Password' value = {inputForm.password} onChangeText = {text => addInput('password',text)}  secureTextEntry={true}/>
                </View>
                <View style = {styles.notesInputForm}>
                    <TextInput style = {styles.notesInput} placeholder = 'Enter notes (optional)...' value = {inputForm.notes} onChangeText = {text => addInput('notes',text)} multiline={true}/>             
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Update Password</Text>
                    </TouchableOpacity>
                </View>
            </View>    
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{flex:1,width: '100%',height: '100%'},
    titleWrapper:{alignSelf: 'center',shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.8,shadowRadius: 30,elevation: 10, borderRadius: 25, marginTop: 10, marginBottom: 25, padding:15},
    title:{fontSize:40,fontWeight:'bold',textAlign:'center', color:'white'},

    subContainer:{borderTopWidth:4,borderBottomWidth:4, borderColor:'white', borderRadius: 15, paddingTop:10, paddingBottom:5, width: 320, alignSelf:'center', marginBottom:10},


    headerForm:{flexDirection:'row', alignItems:'center', justifyContent:'center', alignSelf: 'center',shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.3,shadowRadius: 30,elevation: 10, borderRadius: 15, paddingLeft: 10, paddingRight: 10, height: 50, marginBottom: 10},
    headingForm:{fontSize:30,fontWeight:'bold',paddingTop: 10,paddingBottom:10, color:'white'},
    accountInputForm:{flexDirection:'row', padding: 10, alignItems:'center', justifyContent:'center'},
    accountInputHeading:{fontSize:20, fontWeight:'bold', paddingRight:10, color:'white', marginLeft:12},
    passwordInputForm:{flexDirection:'row', padding: 10, alignItems:'center', justifyContent:'center'},
    passwordInputHeading:{fontSize:20, fontWeight:'bold', paddingRight:10, color:'white'},
    accountInput:{height:30,backgroundColor:'white',borderColor:'black', paddingLeft: 10,marginRight: 5, borderRadius:5},
    passwordInput:{height:30,backgroundColor:'white',borderColor:'black', paddingLeft: 10,marginRight: 5, borderRadius:5},

    notesInputForm:{alignItems:'center', justifyContent:'center',padding:10},
    notesInput:{height:200,backgroundColor:'white',borderColor:'black', padding: 10, borderRadius:5,width:270, textAlignVertical:'top'},

    buttonsRow:{flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:10},
    button:{height:40, backgroundColor: 'rgba(255, 255, 255, 0.8)',background:'transparent', margin: 5, width: 130, borderRadius: 5, justifyContent:'center',shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.8,shadowRadius: 30,elevation: 10},
    buttonText:{color:'#2c9bcf', fontWeight:'bold',textAlign:'center'},
});