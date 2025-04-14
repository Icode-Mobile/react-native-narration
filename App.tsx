import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import AnimationWave from '@/components/AnimationWafe';

const text =
  'React Native é um framework criado pelo Facebook que permite desenvolver aplicativos móveis usando JavaScript e React. A grande vantagem do React Native é que ele possibilita escrever um único código que funciona tanto em dispositivos Android quanto iOS, reduzindo o tempo e o esforço no desenvolvimento. Com ele, é possível criar interfaces modernas e responsivas, utilizando componentes reutilizáveis e integrando com APIs nativas do sistema operacional.';

export default function App() {
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [voices, setVoices] = useState<
    Array<{ identifier: string; language: string }>
  >([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState<number>(1.0);

  const speakText = () => {
    setSpeaking(true);
    Speech.speak(text, {
      rate,
      voice: selectedVoice,
      onDone: () => setSpeaking(false),
    });
  };

  const stopSpeak = () => {
    Speech.stop();
    setSpeaking(false);
  };

  const handleGetVoices = async () => {
    const availableVoices = await Speech.getAvailableVoicesAsync();
    setVoices(availableVoices);
    if (availableVoices.length > 0) {
      setSelectedVoice(availableVoices[0].identifier);
    }
  };

  useEffect(() => {
    handleGetVoices();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 24,
          marginBottom: 16,
          fontWeight: 'bold',
        }}
      >
        Leitura Automática
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
          color: '#ddd',
          width: '90%',
        }}
      >
        {text}
      </Text>
      {speaking ? <AnimationWave /> : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: selectedVoice == 'en-US-SMTf00' ? '#5d3fbf' : '#444',
            width: 85,
            height: 35,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => setSelectedVoice('en-US-SMTf00')}
        >
          <Text
            style={{
              color: '#ddd',
              fontSize: 12,
            }}
          >
            INGLÊS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: selectedVoice == 'pt-BR-SMTf00' ? '#5d3fbf' : '#444',
            width: 85,
            height: 35,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={() => setSelectedVoice('pt-BR-SMTf00')}
        >
          <Text
            style={{
              color: '#ddd',
              fontSize: 12,
            }}
          >
            Português
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: selectedVoice == 'es-MX-SMTf00' ? '#5d3fbf' : '#444',
            width: 85,
            height: 35,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => setSelectedVoice('es-MX-SMTf00')}
        >
          <Text
            style={{
              color: '#ddd',
              fontSize: 12,
            }}
          >
            Espanhol
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
            }}
          >
            Velocidade:
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {rate.toFixed(1)} x
          </Text>
        </View>
        <Slider
          minimumValue={0.5}
          maximumValue={2.0}
          step={0.1}
          value={rate}
          onValueChange={setRate}
          style={{ width: '90%' }}
          thumbTintColor='#fff'
          maximumTrackTintColor='#999'
          minimumTrackTintColor='#fff'
        />

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#5d3fbf',
              width: 140,
              height: 50,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={speakText}
            disabled={speaking}
          >
            <Text
              style={{
                color: '#ddd',
                fontSize: 15,
              }}
            >
              Ouvir Texto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#222',
              width: 140,
              height: 50,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginLeft: 10,
            }}
            onPress={stopSpeak}
            disabled={!speaking}
          >
            <Text
              style={{
                color: '#ddd',
                fontSize: 15,
              }}
            >
              Parar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style='light' backgroundColor='#121212' />
    </View>
  );
}
