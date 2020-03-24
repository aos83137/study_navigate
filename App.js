import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Button, View, Text,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({route,navigation}){
  React.useEffect(() =>{
    if (route.params?.porst){
      
    }
  },[route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View> 
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  );
}

//navigation.push는 탐색할 때마다 스택에 추가 
//navigation.navigate는 해당이름의 경로를 찾으려 시도후 스택에 없는 경우 새 경로 푸쉬
function DetailsScreen({route, navigation}) {
  const {itemId} = route.params;
  const {otherParam} = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId : {JSON.stringify(itemId)}</Text>
      <Text>otherParam : {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
        />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}
const Stack = createStackNavigator();
//Navigator로 감싸고 Screen사용

export default class App extends Component{
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name = "Home" 
            component = {HomeScreen}
            options={{title:  "Overview" }}
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            initialParams = {{ itemId: 42 }}
          />
          <Stack.Screen
            name ="CreatePost"
            component ={CreatePostScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

