import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as Yup from "yup"
import {Formik} from "formik"
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4,"Provide at least 4 Characters")
  .max(16,"Provide less then 17 Characters")
  .required("Length is required")
})

export default function App() {

  const [password, setPassword] = useState("")
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setupperCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatingPasswordString = (passwordLength: number) =>{
    let characterList = ""
    
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if(upperCase){
      characterList += upperCaseChars
    }
    if(lowerCase){
      characterList += lowerCaseChars
    }
    if(number){
      characterList += digitChars
    }
    if(symbols){
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setIsPassGenerated(true)
  }
  
  const createPassword = (characters: string, passwordLength:number) =>{
    let result = ""
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random()* characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }

  const resetPasswordState =()=>{
    setPassword("")
    setIsPassGenerated(false)
    setLowerCase(true)
    setupperCase(false)
    setNumber(false)
    setSymbols(false)

  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        
          <Text style={styles.headerText}>Password generator</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={values =>{
        generatingPasswordString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
       }) => (
         <>
         <View style={styles.inputWraper}>
          
          <View >
            <Text style={styles.headerText2}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && ( <Text style={styles.errorText}>{errors.passwordLength}</Text> )}
          </View>

          <TextInput
          style={styles.inputStyle}
          value={values.passwordLength}
          onChangeText={handleChange("passwordLength")}
          placeholder=""
          keyboardType='number-pad'
          />
          
         </View>
         <View style={styles.inputWraper}>
          <Text style={styles.headerText2}>
            Include Lowercase
          </Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={lowerCase}
          onPress={()=> setLowerCase(!lowerCase)}
          fillColor="#7586E2"
          />
         </View>
         <View style={styles.inputWraper}>
          <Text style={styles.headerText2}>
            Include Uppercase
          </Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={upperCase}
          onPress={()=> setupperCase(!upperCase)}
          fillColor="#A97AC2"
          />
         </View>
         <View style={styles.inputWraper}>
          <Text style={styles.headerText2}>
            Include Number
          </Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={number}
          onPress={()=> setNumber(!number)}
          fillColor="#6BD67B" 
          />
         </View>
         <View style={styles.inputWraper}>
          <Text style={styles.headerText2}>
            Include Symbols
          </Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={symbols}
          onPress={()=> setSymbols(!symbols)}
          fillColor= "#F1C64C"
          />
         </View>
         <View style={styles.formActions}>
            <TouchableOpacity 
            style={styles.button}
            disabled={!isValid}
            onPress={handleSubmit}
            >
              <Text>Generate Password</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={()=>{
              handleReset()
              resetPasswordState()
            }}
            >
              <Text>Reset</Text>
            </TouchableOpacity>
         </View>
         </>
       )}
          </Formik>
          {
            isPassGenerated && <View style={styles.resultWraper}>
              <Text style={styles.headerText2}>Result: </Text>
              <Text selectable>{password}</Text>
              </View>
          }
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer:{
    display:"flex",
    backgroundColor:"#1F294E",
    paddingVertical:10,
  },
  headerText:{
    width:"100%",
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    color:"#F8F6FF",
    paddingBottom:10,
  },
  headerText2:{
    color:"#F8F6FF",
    fontSize:16,
  },
  errorText:{
    color:"tomato",
    fontSize:12,
  },
  inputWraper:{
    display:'flex',
    flexDirection:"row",
    marginHorizontal:20,
    justifyContent:"space-between",
    alignItems:"center",
    marginVertical:5
  },
  inputStyle:{
    backgroundColor:"#4A5270",
    color:"#fff",
    padding:0,
    paddingHorizontal:5,
    width:50,
    borderRadius:4
  },
  formActions:{
    display:'flex',
    flexDirection:"row",
    marginHorizontal:20,
    justifyContent:"space-between"
  },
  button:{
    flex:1,
    alignItems:'center',
    justifyContent:"center",
    width:150,
    backgroundColor:"#fc80a5",
    margin:8,
    borderRadius:6,
    paddingVertical:10
  },
  resultWraper:{
    display:'flex',
    flexDirection:"row",
    marginHorizontal:20,
    marginVertical:5
  }

})