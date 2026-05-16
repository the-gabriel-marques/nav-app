import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, FlatList, ScrollView, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('window');

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planetas = [
    {
      nome: "Mercúrio",
      dias: "88 dias terrestres",
      imagem: require('../assets/mercurio.jpg'),
      texto: "O menor planeta do Sistema Solar e o mais próximo do Sol. É um mundo rochoso e denso, com superfície coberta por crateras. Possui temperaturas extremas, variando de 450°C de dia a -180°C à noite.",
      corPrimaria: '#E5E5E5',
    },
    {
      nome: "Vênus",
      dias: "255 dias terrestres",
      imagem: require('../assets/venus.jpg'),
      texto: "O segundo planeta a partir do Sol e o mais quente do Sistema Solar, com temperaturas superficiais que superam 460°C devido a um intenso efeito estufa.",
      corPrimaria: '#FFE0B2',
    },
    {
      nome: "Terra",
      dias: "365 dias terrestres",
      imagem: require('../assets/terra.jpg'),
      texto: "O terceiro planeta a partir do Sol e o único conhecido a abrigar vida. É um planeta rochoso com 70% da superfície coberta por água, o 'Planeta Azul'.",
      corPrimaria: '#BBDEFB',
    },
    {
      nome: "Marte",
      dias: "687 dias terrestres",
      imagem: require('../assets/marte.jpg'),
      texto: "O 'Planeta Vermelho', caracterizado por uma atmosfera rarefeita, superfície seca, rochosa e fria com óxido de ferro. Possui vulcões inativos e dias similares aos da Terra.",
      corPrimaria: '#FFCDD2',
    },
    {
      nome: "Júpiter",
      dias: "4333 dias terrestres",
      imagem: require('../assets/jupiter.jpg'),
      texto: "O maior planeta do Sistema Solar, um gigante gasoso composto principalmente de hidrogênio e hélio, com massa imensa.",
      corPrimaria: '#D7CCC8',
    },
    {
      nome: "Saturno",
      dias: "10.579 dias terrestres",
      imagem: require('../assets/saturno.jpg'),
      texto: "O sexto planeta a partir do Sol e o segundo maior, famoso por seu impressionante sistema de anéis formados por gelo e rocha.",
      corPrimaria: '#FFF9C4',
    },
    {
      nome: "Urano",
      dias: "30.687 dias terrestres",
      imagem: require('../assets/urano.jpg'),
      texto: "O sétimo planeta, um 'gigante de gelo' frio, com atmosfera rica em metano, o que lhe dá uma cor azul-esverdeada.",
      corPrimaria: '#B2EBF2',
    },
    {
      nome: "Netuno",
      dias: "60.190 dias terrestres",
      imagem: require('../assets/netuno.jpg'),
      texto: "O oitavo e mais distante planeta, classificado como um gigante de gelo. Com uma cor azul intensa, é extremamente frio e ventoso.",
      corPrimaria: '#C5CAE9',
    },
  ];

  const openModal = (planet) => {
    setSelectedPlanet(planet);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedPlanet(null), 300); 
  };

  const renderPlanetItem = ({ item }) => (
    <TouchableOpacity style={styles.cardWrapper} onPress={() => openModal(item)}>
      <LinearGradient
        colors={['#FFFFFF', item.corPrimaria + '30']}
        style={styles.cardContainer}
      >
        <Image source={item.imagem} style={styles.cardIcon} />
        <View style={styles.cardTextContent}>
          <Text style={styles.cardLabel}>{item.nome}</Text>
          <Text style={styles.cardSubLabel}>{item.dias}</Text>
        </View>
        <View style={[styles.cardBorderAccent, { backgroundColor: item.corPrimaria }]} />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1A237E', '#4A148C', '#F8F9FB']} style={styles.container} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Explorador</Text>
        <Text style={styles.screenSubtitle}>do Sistema Solar</Text>
      </View>

      <FlatList
        data={planetas}
        renderItem={renderPlanetItem}
        keyExtractor={(item) => item.nome}
        numColumns={2} 
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={closeModal} />
          
          <View style={styles.modalContentSheet}>
            {selectedPlanet && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedPlanet.nome}</Text>
                  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Ionicons name="close-circle" size={32} color="#6C63FF" />
                  </TouchableOpacity>
                </View>

                <Image source={selectedPlanet.imagem} style={styles.modalImage} />
                <Text style={styles.modalDays}>{selectedPlanet.dias} para uma órbita</Text>
                
                <ScrollView style={styles.modalTextScroll} showsVerticalScrollIndicator={true}>
                  <Text style={styles.modalText}>{selectedPlanet.texto}</Text>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  headerContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  screenSubtitle: {
    fontSize: 18,
    color: '#E0E0E0',
    fontWeight: '300',
    marginTop: -5,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  cardWrapper: {
    flex: 1,
    margin: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  cardContainer: {
    flex: 1,
    aspectRatio: 1.1,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  cardIcon: {
    width: '60%', 
    height: '60%',
    resizeMode: 'contain',
    marginTop: 5,
  },
  cardTextContent: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  cardLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4A148C',
    textAlign: 'center',
  },
  cardSubLabel: {
    fontSize: 11,
    color: '#757575',
    textAlign: 'center',
    marginTop: 2,
  },
  cardBorderAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContentSheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: screenHeight * 0.8,
    padding: 25,
    paddingTop: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A237E',
  },
  closeButton: {
    padding: 5,
  },
  modalImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#F3E5F5',
  },
  modalDays: {
    fontSize: 15,
    color: '#8E24AA',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  modalTextScroll: {
    flex: 1,
    backgroundColor: '#F3E5F550',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 25,
  },
});