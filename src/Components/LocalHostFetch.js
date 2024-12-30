import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

const LocalHostFetch = () => {
  const [loading, setLoading] = useState(true);
  const [host3000, setHost3000] = useState([]);
  const [host3001, setHost3001] = useState([]);
  const [error, setError] = useState('');

  const hostData = async () => {
    try {
      setLoading(true);

      const portData1 = await fetch('http://localhost:3000/users');
      const portData2 = await fetch('http://localhost:3001/users');

      if (!portData1.ok) {
        throw new Error('Port 3000 Error');
      }
      if (!portData2.ok) {
        throw new Error('Port 3001 Error');
      }

      const resultOf3000 = await portData1.json();
      const resultOf3001 = await portData2.json();

      setHost3000(resultOf3000);
      setHost3001(resultOf3001);
    } catch (error) {
      setError(error.message);
      console.log('Error Found:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hostData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <View>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      ) : (
        <View>
          <Text style={{ fontWeight: 'bold' }}>Users from Port 3000:</Text>
          <FlatList
            data={host3000}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
          />
          <Text style={{ fontWeight: 'bold' }}>Users from Port 3001:</Text>
          <FlatList
            data={host3001}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default LocalHostFetch;
