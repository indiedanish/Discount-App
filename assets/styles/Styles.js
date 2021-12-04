
export default styles = () => StyleSheet.create({
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
