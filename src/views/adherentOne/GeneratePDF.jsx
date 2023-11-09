import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import { MdClose } from 'react-icons/md';

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
    width:'80%',
    height:200,
    backgroundColor:'red',
    border:'2px solid black',
  },
});

const MyPDFDocument = ({data, adh, type}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.content}></View>
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