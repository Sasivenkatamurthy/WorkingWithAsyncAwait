import {ActivityIndicator,StyleSheet,Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const FetchingData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [Error, setError] = useState(null);

  const feachingData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      );
      if (!response.ok) {
        throw new Error('Network Error');
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    feachingData();
  }, []);
  return (
    // <View>
    //   {loading && <ActivityIndicator size={30}

    //   />}
    //   {Error && <Text>{error}</Text>}
    //   {data ? (
    //     <View>
    //       <Text>{data.title}</Text>
    //       <Text>{data.body}</Text>
    //     </View>
    //   ) : (
    //     !loading && <Text>" Data Not Found"</Text>
    //   )}
    // </View>

    <View style={styles.container}>
    {loading ? (
      <ActivityIndicator size={30} color="#007bff" />
    ) : Error ? (
      <Text style={styles.errorText}>{Error}</Text>
    ) : data ? (
      <View style={styles.dataContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.body}>{data.body}</Text>
      </View>
    ) : (
      <Text style={styles.notFoundText}>Data Not Found</Text>
    )}
  </View>
);
};

const styles = StyleSheet.create({
container: {

  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#f8f9fa',
},
dataContainer: {
  padding: 20,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  width: '100%',
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
body: {
  fontSize: 16,
  color: '#555',
},
errorText: {
  color: 'red',
  fontSize: 16,
  textAlign: 'center',
},
notFoundText: {
  color: '#666',
  fontSize: 16,
  textAlign: 'center',
},
});

export default FetchingData;