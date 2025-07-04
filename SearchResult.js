import React,{useState, useEffect, useCallback} from 'react';
import {View,Text,TouchableOpacity,ImageBackground,FlatList,StyleSheet,Modal,Platform,Alert} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const url = 'https://backendpass-esvd.onrender.com';



export default function SearchResult({route,navigation}){
    const {token,searchTerm} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [currentNotes, setCurrentNotes] = useState('');
    const [filteredPass, setFilteredPass] = useState([]);

    const refreshSearchResult = useCallback(()=>{
        axios
        .get(`${url}/showall`,{headers:{Authorization:`Bearer ${token}`}})
        .then((res)=>{const filtered = res.data.filter((p)=>p.account.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredPass(filtered);})
        .catch((err)=>console.error('Cannot refresh search result',err));
    })

    useFocusEffect(refreshSearchResult);

    const deletePassword = async(id) => {
        try{
            const response = await axios.delete(`${url}/delete/${id}`, {headers:{Authorization:`Bearer ${token}`}});
            if(response.data.status === 'DELETE PASSWORD SUCCESSFULLY'){
                setFilteredPass((prev) => prev.filter((p)=>p.id !== id));
            }
        }
        catch(err){
            console.error('Cannot delete password',err);
        }
    };

    return(
        <ImageBackground style = {styles.container} source={require('./assets/background.jpg')} resizeMode="cover">

        <Modal visible={modalVisible} transparent={true} animationType='fade' onRequestClose={()=>setModalVisible(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Notes</Text>
                    <Text style={styles.modalText}>{currentNotes || 'No notes available'}</Text>
                    <TouchableOpacity onPress={()=>setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <View style={styles.titleWrapper}>
            <Text style = {styles.title}>PASSWORDS MANAGER</Text>
            </View>
            <View style = {styles.headerForm}>
                <Text style = {styles.headingForm}>Search Results</Text>
        </View>

        <View style={styles.currentContent}>
                        
            <FlatList
                data={filteredPass}
                keyExtractor={(item,index)=>item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.currentItem}>
                        <Text style={styles.passText}>
                            {`➤ Account: ${item.account} | Password: ${item.password}`}
                        </Text>
                        <View style={styles.editDeleteButtons}>
                            <TouchableOpacity style={styles.notesButton} onPress={()=>{
                                setCurrentNotes(item.notes);
                                setModalVisible(true);
                            }}>
                                <Text style={styles.notesText}>Notes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => {
                                navigation.navigate('EditPassword',{token,passwordItem:item});
                            }}
                            >
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={()=>deletePassword(item.id)}>
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
            />               
        </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{flex:1,width: '100%',height: '100%'},
    titleWrapper:{alignSelf: 'center',shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.8,shadowRadius: 30,elevation: 10, borderRadius: 25, marginTop: 10, marginBottom: 25, padding:15},
    title:{fontSize:40,fontWeight:'bold',textAlign:'center', color:'white'},
    headerForm:{flexDirection:'row', alignItems:'center', justifyContent:'center', alignSelf: 'center',shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.3,shadowRadius: 30,elevation: 10, borderRadius: 15, paddingLeft: 10, paddingRight: 10, height: 50, marginBottom: 20},
    headingForm:{fontSize:30,fontWeight:'bold',paddingTop: 10,paddingBottom:10, color:'white'},

    currentContent:{alignSelf:'center', width:'auto', shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.8,shadowRadius: 30,elevation: 10, borderRadius:5, marginLeft:'1%',backgroundColor: 'rgba(255, 255, 255, 0.7)',background:'transparent'},
    currentItem:{flexDirection: 'row', marginBottom: 2, marginTop: 2},
    editDeleteButtons:{flexDirection:'row', marginLeft:'auto'},
    editButton: { backgroundColor: 'rgba(117, 214, 49, 0.5)', padding: 5, borderRadius: 5, width: 55, marginRight: 5, alignItems:'center', justifyContent:'center'},
    editText: { color: 'green', fontWeight: 'bold', textAlign: 'center' },
    deleteButton: { backgroundColor: 'rgba(255, 0, 0, 0.2)', padding: 5, borderRadius: 5, width: 55 ,marginRight:5, alignItems:'center', justifyContent:'center'},
    deleteText: { color: 'red', fontWeight: 'bold', textAlign: 'center' },
    passText: { color: '#1d5a0e', fontSize: 15, fontWeight: 'bold', padding: 5},
    notesButton:{backgroundColor: 'rgba(247, 218, 157, 0.5)', padding: 5, borderRadius: 5, width: 55, marginRight: 5, alignItems:'center', justifyContent:'center'},
    notesText:{color: 'rgb(118, 81, 0)', fontWeight: 'bold', textAlign: 'center'},

    modalOverlay:{flex: 1,justifyContent: 'center',alignItems: 'center'},
    modalContent:{alignSelf:'center', width:'auto', shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.8,shadowRadius: 30,elevation: 10, borderRadius:5, marginLeft:'1%',backgroundColor: 'rgb(222, 251, 255)'},
    modalTitle:{fontSize:40,fontWeight:'bold',textAlign:'center', color:'#2c9bcf'},
    modalText:{color: '#1d5a0e', fontSize: 15, fontWeight: 'bold', padding: 5},
    closeButton:{height:40, backgroundColor: 'rgba(152, 238, 255, 0.8)',background:'transparent', margin: 15, width: 130, borderRadius: 5, justifyContent:'center',shadowColor: '#000',shadowOffset: { width: 0, height: 8 },shadowOpacity: 0.8,shadowRadius: 30,elevation: 10,alignSelf: 'center'},
    closeButtonText:{color:'#2c9bcf', fontWeight:'bold',textAlign:'center'}
});