import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function HostScreen() {
  const [roomCode, setRoomCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const createRoom = async () => {
      console.log('Getting server-generated code...');
      setLoading(true);
      setError('');
      
      try {
        // Step 1: Get unique code from your server function
        const { data: code, error: codeError } = await supabase
          .rpc('generate_room_code'); // This matches your function name

        if (codeError) {
          console.error('Error getting code:', codeError);
          throw codeError;
        }

        console.log('Server generated code:', code);

        // Step 2: Create the room with that server-generated code
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .insert([
            {
              code: code,
              host_id: 'your-user-id',
              status: 'waiting',
              created_at: new Date().toISOString(),
            }
          ])
          .select()
          .single();

        if (roomError) {
          console.error('Error creating room:', roomError);
          throw roomError;
        }

        console.log('Room created successfully:', roomData);
        setRoomCode(code);

      } catch (error) {
        console.error('Error:', error);
        setError('Failed to create room on server');
      } finally {
        setLoading(false);
      }
    };

    createRoom();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0bdd20" />
        <Text style={styles.loadingText}>Server is generating your room code...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Created!</Text>
      
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Room Code:</Text>
        <Text style={styles.code}>{roomCode}</Text>
        <Text style={styles.instruction}>
          Code generated server-side by Supabase
        </Text>
      </View>

      <View style={styles.waitingContainer}>
        <Text style={styles.waitingText}>Waiting for players...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
  },
  codeContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  codeLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
  code: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0bdd20',
    letterSpacing: 8,
    marginBottom: 20,
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    maxWidth: 250,
  },
  waitingContainer: {
    marginTop: 40,
  },
  waitingText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});