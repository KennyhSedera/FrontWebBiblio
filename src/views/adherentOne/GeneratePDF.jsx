import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import { MdClose } from 'react-icons/md';
import { getImg } from '../../services/getImg';
import moment from 'moment';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
  },
  content: {
    width:'60%',
    height:200,
    border: '2px solid black',
    marginBottom: 10,
    padding:5,
  },
  img: {
    width:80,
    height:80,
    objectFit:'cover',
  },
  frontHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection:'row',
  },
  logo: {
    width:80,
    height:80,
    objectFit:'cover',
  }
});

const MyPDFDocument = ({data, adh, type}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.content}>
          <View style={styles.frontHeader}>
            <Image source='logo.png' style={styles.logo} />
            <View style={{
              display:'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{fontSize:10, fontWeight:800}}> {type} </Text>
              <Text style={{fontSize:10,}}><Text style={{fontWeight:800}}>Année: </Text> {moment(data.date_InscritAdh).format('YYYY')}</Text>
              <Text style={{fontSize:10,}}><Text style={{fontWeight:800}}>N°: </Text> {adh.id_Adh}</Text>
            </View>
            <Image source={getImg(adh.photo_Adh)} style={styles.img} />
          </View>
        </View>
        <View style={styles.content}>
        </View>
      </View>
    </Page>
  </Document>
);

const GeneratePDF = ({data, adh, type, onClose = ()=>{}}) => {
  return (
    <div style={{position:'relative',}}>
      <div style={{
        position: 'absolute',
        zIndex: 99,
        width: 35,
        height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor:'red',
        top: -17.5,
        left: -17.5,
        border:'1px sold black',
        cursor:'pointer',
      }} onClick={onClose}>
        <MdClose size={18} color='white' />
      </div>
      <PDFViewer width="900" height="550">
        <MyPDFDocument data={data} adh={adh} type={type} />
      </PDFViewer>
    </div>
  );
};

export default GeneratePDF;