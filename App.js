import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Button, View, Text,TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({route,navigation}){
  React.useEffect(() =>{
    if (route.params?.porst){
      // 게시물 업데이트,`route.params.post`로 작업 수행
      // 예를 들어 서버에 게시물을 보냅니다.
    }
  },[route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
      <Button
        title="Go Details"
        onPress={() => (navigation.navigate('Details'))}
      />
      {/* params? -> ?이게 값이 있으면 문제없는데 없을 경우 에러 안나게 if처리 해주는 거 같다. */}
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
        //onChangeText이거 안하면 input에 글이 안써짐
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
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{ 
            headerStyle:{
              backgroundColor: '#34558b'
            },
            headerTintColor: '#fff',
            headerTitleStyle:{
              fontWeight:'bold',
            },
           }}
        >
          <Stack.Screen 
            name = "Home" 
            component = {HomeScreen}
            options={{
              title:  "My home",
            }}
            //setOptions로 업데이트 가능
            //route.params.인수로 업데이트 가능
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            options={({route}) => ({title: route.params.title})}
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

