import {
    StyleSheet, 
    Dimensions
  } from 'react-native';

import { colors } from '../Utils/colors';  

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    splash: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : colors.mainblue,
      },
    

    bla: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.mainblue,
    },

    activityIndicator: {
      backgroundColor: colors.mask,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },

    formContainer: {
      height: 235,
      justifyContent: 'space-around',
      paddingHorizontal: 5,
    },

  

    buttonText:{
        fontFamily:'Fira'
    },
    button:{        
        borderRadius : 5,
        backgroundColor : colors.blue
    },

    validationText: {
      //fontFamily: 'lato',
    },
    logoimg: {
      width: width / 2,
      height: width / 2,
    },
    imageContainer: {
      alignItems: 'center',
    },
    colorfondo:{
      flex : 1,
      backgroundColor: colors.mainblue,
      
      

    },
    logo:{
      height : 100 ,
      width: 400
    },
    LogoContainer:{
      alignItems:'center',
      flexGrow: 1,
      justifyContent :'center',

        },
    passwordResetButton: {
      color: colors.white,
      marginTop: 10,
      textAlign: 'center',
      justifyContent:'center'
    },
    MainStyles:{

    },
    sub_tilelogo:{
      color:'#fff',
      marginTop: 10,
      textAlign: 'center',
      opacity:0.5
    },
    input: {
      height:40,
      backgroundColor:'rgba(255, 255, 255, 0.8)',
      marginBottom :20,
      color: colors.width,
      paddingHorizontal: 10,
      borderRadius: 8

    },
    buttonContainer:{
      backgroundColor: colors.blue,
      paddingVertical: 25,

    },
    buttonText:{
      textAlign:'center',
    color:colors.width,
    fontWeight:'700',
   },
   SwichConatainer:{
   flexDirection: 'row',
   justifyContent :'center',
   
   },
   swich:{
    paddingLeft:30,
   },
   text: {
     color:colors.white,
     opacity : 0.5
   },
   header:{
    flex :1,
    backgroundColor:colors.white
 
   },
    LoginF:{
      padding:20,
     marginBottom:30
      },
      perfback:{
        flex:1,
        backgroundColor:colors.white

      },
      componenthead:{
        flex:3,
        backgroundColor:colors.lightBlue,
        margin:10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius:15,
        borderTopRightRadius: 10,
        
        


      },
      title:{
        flex:2,
        backgroundColor:colors.mainblue,
      },
      formcontent:{
        flex:9,
        backgroundColor:colors.lightBlue,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius:15,
        borderTopRightRadius: 5,
      },
      componentFooter:{
        flex:9,
        backgroundColor:colors.lightBlue,
        margin:10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius:15
        
        
        

      }
    
    
  
    
  });

  export { styles, colors };