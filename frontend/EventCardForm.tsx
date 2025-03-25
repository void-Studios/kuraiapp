import React, {useState,useEffect}  from 'react';
import {StyleSheet, Text, View,TextInput, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import {generateRandomFirstName, generateRandomLastName} from './utils/NameGenerator';
import { getRandomQuote,getRandomFirstName,getRandomLastName,postEventCard,getRandomTitle } from './utils/api';


const styles = StyleSheet.create({
  mainContainer:{
    // marginTop: 25,
    // marginBottom:25,
    margin:10,
    backgroundColor: 'darkturquoise',
  },
  subContainer:{
    margin:10, 
    backgroundColor: 'darksalmon',
  },
  title:{
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 40,
  },
  descriptionContainer:{
    height:100,
  }
  ,
  subContainerText:{
    fontSize: 16,
    color: 'white',
  },
  subContainerInput:{
    height: 80,
  },
  red: {
    color: 'red',
  },
  blue: {
    color: 'blue',
  },
  green: {
    color: 'green',
  },
  
  alignment: {
    alignItems: 'center',
  },
});

interface GreetingProps {
  firstName: string;
  lastName: string;
}

const Greeting:React.FC<GreetingProps>=(props) => {
  return(
      <Text style={styles.title}>Hello {props.firstName} {props.lastName}!</Text>

  );
};


const EventCardForm = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [firstName,setFirstName] = useState<string | null>(null);
  const [lastName,setLastName] = useState<string | null>(null);
  const [randomTitle,setRandomTitle] = useState<string | null>(null);

  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [emailText, setEmailText] = useState('');

  const [category,setCategory]=useState('');


  let userName ="";

  const submitEventCard = async() =>{
    console.log('Submitting event card');
    let postText = "";
    let postDescription = "";
    if (firstName && lastName){
      userName = firstName.toLowerCase() + lastName.toLowerCase() + '@kuraitachi.com';
    } else {
      userName = emailText;
    }  
    
    if (!titleText && randomTitle){
        postText=randomTitle;
    } else {
        postText = titleText;
    }
    
    if (!descriptionText && quote){
      postDescription = quote;
    }else{
      postDescription=descriptionText;
    }

    await postEventCard(postText,postDescription,1,userName);
    console.log('Event Card submitted successfully under alias '+ userName);
  };

  useEffect(()=> {
    async function fetchData() {
      try {
      const newQuote = await getRandomQuote();
      setQuote(newQuote);

      const newFirstName = await getRandomFirstName();
      setFirstName(newFirstName);

      const newLastName = await getRandomLastName();
      setLastName(newLastName);
     
      const randomTitle = await getRandomTitle();
      setRandomTitle(randomTitle);
      
    } catch (error) {
      console.error('Error during useEffect:',error);
    }
  }
    fetchData(); 
  },[]);

  return (
    <View style={[styles.mainContainer]}>
      <Greeting firstName={firstName ? firstName : ""} lastName={lastName ? lastName : ""}/>

      <View style={styles.subContainer}>
      <TextInput 
        style={styles.subContainerInput} 
        placeholder="Enter your ticket Title"
        onChangeText={newTitleText => setTitleText(newTitleText)}
        defaultValue={titleText}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput 
        style={styles.descriptionContainer} 
        placeholder="Enter your ticket description"
        onChangeText={newDescriptionText => setDescriptionText(newDescriptionText)}
        defaultValue={descriptionText}
        />
      </View>
      {/* <View style={styles.subContainer}>
        <TextInput 
        style={styles.subContainerInput} 
        placeholder='Enter your email address'
        onChangeText={newEmailText => setEmailText(newEmailText)}
        defaultValue={emailText}
        />
      </View> */}
 
      <View style={styles.subContainer}>
      <Text style={[styles.subContainerText,styles.alignment]}>Choose a category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex)=>
            setCategory(itemValue)
          }>
            <Picker.Item label="All" value="All"/>
            <Picker.Item label="Single" value="single"/>
        </Picker>
      </View> 

      {/* <View style={styles.subContainer}>
        <Text style={styles.subContainerText}>{quote ? quote : "Loading..."}</Text>      
      </View> */}

      <View style={styles.subContainer}>
        <Button
          onPress={() => submitEventCard()}
          title='Submit Event Card' 
          accessibilityLabel="Learn about this button"
        />
      </View>      
    </View>
  );
};
export default EventCardForm;