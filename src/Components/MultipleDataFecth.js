import {
  Text,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const MultiplDatafeatch = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postsResponse, setPostsResponse] = useState();
  const [usersResponse, setUsersResponse] = useState();
  const [commentsResponse, setCommentsResponse] = useState();

  const multipleData = async () => {
    const [postsResponse, usersResponse, commentsResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/comments'),
    ]);
    

    if (
      !postsResponse.ok){
        throw new Error('Network Error');
      }if(
      !usersResponse.ok){
        throw new Error('Network Error');
      }
      if(
      !commentsResponse.ok
    ) {
      throw new Error('Network Error');
    }
    const postsResponseData = await postsResponse.json();
    const usersResponseData = await usersResponse.json();
    const commentsResponseData = await commentsResponse.json();
    try {
      setPostsResponse(postsResponseData);
      setUsersResponse(usersResponseData);
      setCommentsResponse(commentsResponseData);
    } catch (error) {
        setError(error.message); 
      Alert.alert`Network Error`;
      console.log('error', error);
    } finally {
      setLoading(false);
    }
    console.log('Feaching data');
  };

  useEffect(() => {
    multipleData();
  }, []);

  return (
    
      <View>
            <>
            {
                (loading?(<ActivityIndicator size={40} />):error?(<View><Text>{error}</Text></View>):(
                    <View >
      <Text style={styles.header}>Posts</Text>
      <FlatList
        data={postsResponse}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
      <Text style={styles.header}>Users</Text>
      <FlatList
        data={usersResponse}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
      <Text style={styles.header}>Comments</Text>
      <FlatList
        data={commentsResponse}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
                ))
            }
            </>
        </View>
  )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    item: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#f9c2ff',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      color: 'red',
      fontSize: 18,
    },
  });
export default MultiplDatafeatch;
