import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useFonts } from 'expo-font'

import { DataTable } from "react-native-paper";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  FlatList,
  KeyboardAvoidingViewBase,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function isLetter(str) {
  if (str.length === 1 && str.match(/[a-z]/i)) return false;
  else return true;
}

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false} }   />

        <Stack.Screen name="History" component={History}   options={{ title: 'History', headerStyle: {
          
               backgroundColor: "#e89302",
           }, headerTitleStyle: {
            color: 'white',
            fontFamily: 'Raleway',
         
          } }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {

  

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [error, setError] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);

  const [history, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    KaushanScript: require('./assets/fonts/KaushanScript.otf'),
    
    Raleway: require('./assets/fonts/Raleway-Regular.ttf'),
    
    
  });

  
  

  return (

    <>

    <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Result Saved in History :)</Text>
              <View style={{ paddingTop: 20 }} />
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#e89302' }]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  
                }}>
                <Text style={{color:"white"}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
    >



      <Text style={{fontSize:40,margin:30 , color:'white', fontFamily:'KaushanScript'}} >Save Discounts</Text> 

      <Text style={styles.calculatedText}>
        {" "}
        You Saved <Text style={{color:'white'}}>  Rs:{" "} 
        {buttonPressed === true
          ? parseFloat((price - discountedPrice).toFixed(4))
          : "0.00"}{" "}
          </Text>
      </Text>

      <Text style={styles.calculatedText}>
        {" "}
        Final Price <Text style={{color:'orange'}}> Rs:  {buttonPressed === true ? parseFloat(discountedPrice.toFixed(4)) : "0.00"}{" "} </Text>
      </Text>


      <TextInput 
        placeholder="Original Price " placeholderTextColor = "#c4c4c4"
        style={{
          fontFamily: 'Raleway', color:'white',padding:10, paddingLeft:20,marginTop:40, borderWidth: 2, width: 300, marginBottom: 20, borderRadius:20 , fontSize:15 , borderColor:'white'}}
        onChangeText={(value) => {
          setPrice(value);
          setError("");
          setButtonPressed(false);
          return;
        }}
      >


      </TextInput>
      <TextInput 
        placeholder="Discount %" placeholderTextColor = "#c4c4c4"
        style={{
          fontFamily: 'Raleway',color:'white',padding:10, paddingLeft:20, borderWidth: 2, width: 300, borderRadius:20,fontSize:15,borderColor:'white' }}
        onChangeText={(value) => {
          setDiscount(value);
          setButtonPressed(false);
          setError("");
          return;
        }}
      >
      
      </TextInput>

      <Text style={{ 
    fontFamily: 'Raleway', color: "#ff5e5e", textAlign: "center", marginTop:15 }}>
        {error}
      </Text>


      <TouchableOpacity
        onPress={() => {
          price > 0 && discount > 0 && isLetter(price) && isLetter(discount)
            ? setDiscountedPrice(price - price * (discount / 100))
            : setError(
                "Price and Discount should be greater then 0\n and not be Alphabet"
              );
          price > 0 && discount > 0 && isLetter(price) && isLetter(discount)
            ? setButtonPressed(true)
            : console.log("Do Nothing");
        }}
      >

        
        <Text
          style={{
            borderWidth: 2,
            marginTop: 10,
            padding: 10,
            color: "white",
            backgroundColor: "#e89302",
            borderRadius:15,
            fontSize:20,
            fontFamily: 'Raleway',
            textAlign: "center",
            
          }}
        >
          Calculate
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          price > 0 && discount > 0 && isLetter(price) && isLetter(discount)
            ? setHistory([
                ...history,
                {
                  Price: { price },
                  DiscountedPrice: { discountedPrice },
                  Discount: { discount },
                },
              ])
            : console.log("");

            setModalVisible(true);
        }}
      >
        <Text
          style={{
            borderWidth: 2,
            marginTop: 10,
            padding: 10,
            color: "#e89302",
            borderColor: "#e89302",
            borderRadius:15,
            fontSize:20,
            fontFamily: 'Raleway',
            width:115,
            textAlign: 'center'
            
          }}
        >
          {" "}
          Save
        </Text>
      </TouchableOpacity>

      <Text
        onPress={() =>
          navigation.navigate("History", {
            historyTemp: history,
            historyObj: { history, setHistory },
          })
        }
        style={{
         
          borderWidth: 2,
          marginTop: 40,
          padding: 10,
          color: "white",
          borderColor: "black",
          backgroundColor: "#e89302",
          borderRadius:15,
          fontSize:15,
          fontFamily: 'Raleway',
          width:300,
          textAlign: 'center'
        }}
      >
        History
      </Text>



      <StatusBar style="auto" />
    </KeyboardAvoidingView>

    </>
  );
}

function History({ route, navigation }) {
  const { history, setHistory } = route.params.historyObj;
  const [tempHistory, setTempHistory] = useState(route.params.historyTemp);

  
  const [modalVisible, setModalVisible] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  


  const deleteRecord = (index) => {
    setTempHistory(tempHistory.filter((item, i) => (i != index ? item : null)));
    setHistory(history.filter((item, i) => (i != index ? item : null)));
  };

  return (
<>

    <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you Sure?</Text>
            <Text style={{ color: '#E74C3C' , marginTop: 10, fontFamily:'Raleway', }}>History will be deleted!</Text>

            <View
              style={{
                flexDirection: 'row',
                paddingTop: 20,
              }}>
              <TouchableOpacity
                style={{ alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E74C3C',
                borderRadius: 5,
                padding: 1,
                
                width: 80,
                height: 40,}}
                onPress={() => {
                  deleteRecord(toDelete) ;
                  setModalVisible(!modalVisible);
                }}>
                <Text  style={{color: 'white', fontFamily:'Raleway',}}>Yes</Text>
              </TouchableOpacity>
              <View style={{ paddingLeft: 20 }} />
              <TouchableOpacity
                
                style={{ alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'green',
                
                borderRadius: 5,
                padding: 1,
                width: 80,
                
                height: 40,}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{color: 'white', fontFamily:'Raleway',}}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    <View
      style={{  alignItems: "center", justifyContent: "center" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
        style={{ height: 300, width: 412 , marginBottom:340}}
      >
        <DataTable>
          <DataTable.Header style={{ borderWidth: 0.5 }}>
            <DataTable.Cell  > <Text style={{ fontFamily:'Raleway'}}> Original</Text>  </DataTable.Cell>
            <DataTable.Cell  >  <Text style={{ fontFamily:'Raleway'}}> Discount </Text></DataTable.Cell>
            <DataTable.Cell>  <Text style={{ fontFamily:'Raleway'}}> Final Price </Text></DataTable.Cell>
          </DataTable.Header>

          <FlatList
            style={{  borderBottomLeftRadius:50, borderBottomRightRadius:50, height: 570, width: 412, backgroundColor: "white" }}
            data={tempHistory}
            renderItem={({ item, index }) => {
              if (item != undefined) {
                return (
                  <TouchableOpacity onPress={() =>{ setToDelete(index), setModalVisible(true)  } }>
                    <DataTable.Row>
                      <DataTable.Cell  style={{marginLeft:10, }} ><Text style={{ fontFamily:'Raleway'}}>Rs {item.Price.price} </Text> </DataTable.Cell>

                      <DataTable.Cell  style={{marginRight:70, }}  numeric> <Text style={{ fontFamily:'Raleway'}}> 
                        {item.Discount.discount}% </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={{marginRight:65}} numeric>  <Text style={{ fontFamily:'Raleway'}}> 
                        Rs {item.DiscountedPrice.discountedPrice} </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(index) => {
              return index;
            }}
          />

        </DataTable>
      
        
      </KeyboardAvoidingView>
      
      <Text style={{ marginBottom:20 , fontSize:12, color:'orange', borderWidth:1, borderRadius:15, padding:7, borderColor: "orange"}}>Tap to delete any record</Text>
      <TouchableOpacity
            onPress={() => {
              setHistory([]);
              setTempHistory([]);
            }}
          >

            
            
            <Text
              style={{
                borderWidth: 2,
                
                marginBottom: 20,
                padding: 10,
                color: "white",
                backgroundColor: "#e89302",
                borderColor: "#e89302",
                fontFamily: "Raleway",
               
                alignItems: "center",
                textAlign: "center",
                width:300,
                borderRadius:15
              }}
            >
              Clear
            </Text>
          </TouchableOpacity>


    
    </View>

    

    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    height: 180,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'KaushanScript',
  },
  modalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e89302',

    borderRadius: 5,
    padding: 10,
    width: 180,
    height: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  calculatedText:{
    fontFamily: 'Raleway',
    fontSize: 25,
    color:'#c4c4c4',
  }

});
