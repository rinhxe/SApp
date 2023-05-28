import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableHighlight, Modal } from "react-native";
import firebase from '../config/FirebaseConfig';
import { getDatabase, off, onValue,remove, ref } from 'firebase/database';

export default function Favourite({ props }) {
  const [favProducts, setFavProducts] = useState([]);
  const [showDialog, setshowDialog] = useState(false);
  const [showDialogtc, setshowDialogtc] = useState(false);
  const auth = getAuth(firebase);
  const data = getDatabase(firebase);
  const [id,setid] = useState();

  useEffect(() => {
    upData();
  }, [])

  const upData = () => {
    const userId = auth.currentUser.uid;
    const favRef = ref(data, `Favourite/${userId}`)
    onValue(favRef, (snapshot) => {
      const favData = snapshot.val();
      if (favData) {
        const products = Object.keys(favData).map((key) => ({
          id: key,
          ...favData[key]
        }));
        setFavProducts(products);
      } else {
        setFavProducts([])
      }
    });
    return () => {
      off(favRef);
    }
  }

  const Count = () => {
    return favProducts.length
  }
  const TC = () => {
    const sortedProducts = [...favProducts];
    const n = sortedProducts.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (sortedProducts[j].price > sortedProducts[j + 1].price) {
          // Hoán đổi vị trí
          const temp = sortedProducts[j];
          sortedProducts[j] = sortedProducts[j + 1];
          sortedProducts[j + 1] = temp;
        }
      }
    }
    setshowDialog(false)
    setFavProducts(sortedProducts);
  }
  const CT = () => {
    const sortedProducts = [...favProducts];
    const n = sortedProducts.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (sortedProducts[j].price < sortedProducts[j + 1].price) {
          // Hoán đổi vị trí
          const temp = sortedProducts[j];
          sortedProducts[j] = sortedProducts[j + 1];
          sortedProducts[j + 1] = temp;
        }
      }
    }
    setshowDialog(false)
    setFavProducts(sortedProducts);
  }
  const closeModal = () => {
    setshowDialog(false);
  }

  const addCart = () => {

  }
  const Delete =  (productId) => {
    const userId = auth.currentUser.uid;

    const favRef = ref(data, `Favourite/${userId}/${productId}`);

    remove(favRef)
        .then(() => {
            console.log('Đã xóa sản phẩm thành công');
            setshowDialogtc(false)
        })
        .catch((error) => {
            console.error('Lỗi xóa sản phẩm:', error);
        });
};
 
  return (
    <View style={styles.container}>

      {/* modal sắp xếp */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDialog}
      >
        <View style={styles.modalContainer}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(0, 0, 0, 0.5)"
            onPress={closeModal}
          >
            <View />
          </TouchableHighlight>

          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>SẮP XẾP THEO</Text>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="transparent"
                style={styles.modalCloseButton}
                onPress={closeModal}
              >
                <Image style={styles.modalCloseIcon} source={require('../image/close.png')} />
              </TouchableHighlight>
            </View>

            <View style={styles.modalDivider} />

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="white"
              style={styles.modalOption}
              onPress={TC}
            >

              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../image/tc.png')} />
                <Text style={styles.modalOptionText}>Giá [Thấp - Cao]</Text>

              </View>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="white"
              style={styles.modalOption}
              onPress={CT}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../image/ct.png')} />
                <Text style={styles.modalOptionText}>Giá [Cao - Thấp]</Text>

              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      {/* modal tùy chọn */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDialogtc}
      >
        <View style={styles.modalContainer}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="rgba(0, 0, 0, 0.5)"
            onPress={() => { setshowDialogtc(false) }}
          >
            <View />
          </TouchableHighlight>

          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>TÙY CHỌN</Text>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="transparent"
                style={styles.modalCloseButton}
                onPress={() => { setshowDialogtc(false) }}
              >
                <Image style={styles.modalCloseIcon} source={require('../image/close.png')} />
              </TouchableHighlight>
            </View>

            <View style={styles.modalDivider} />

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="white"
              style={styles.modalOption}
              onPress={addCart}
            >

              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../image/addcar.png')} style={{ marginRight: 10 }} />
                <Text style={styles.modalOptionText}>Thêm vào giỏ hàng</Text>

              </View>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="white"
              style={styles.modalOption}
              onPress={()=>Delete(id)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../image/delete.png')} style={{ marginRight: 15, marginLeft: 5 }} />
                <Text style={styles.modalOptionText}>Xóa khỏi danh sách yêu thích</Text>

              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>DANH SÁCH YÊU THÍCH </Text>
      <View style={styles.titleDivider} />
      <View style={styles.infoContainer}>
        <Text>{Count()} MẶT HÀNG</Text>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="white"
          onPress={() => { setshowDialog(true) }}
        >
          <Image source={require('../image/sx.png')} />
        </TouchableHighlight>
      </View>

      <ScrollView style={styles.frame}>
        {favProducts.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <View style={styles.productBox}>
              <Image source={{ uri: product.search_image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                <Text style={styles.productPrice}>Giá: {product.price} VNĐ</Text>
                <View style={styles.addButton}>
                  <Text style={styles.addButtonLabel}>Thêm vào giỏ</Text>
                  <Image style={styles.addButtonIcon} source={require('../image/addcar.png')} />

                </View>
              </View>

              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="white"
                onPress={() => { setshowDialogtc(true),setid(product.id) }}
              >
                <Image source={require('../image/More.png')} />
              </TouchableHighlight>

              
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  modalHeaderText: {

    fontSize: 23,
    fontWeight: 'bold',
    margin: 14,
  },
  modalCloseButton: {
    marginTop: 15,
    marginLeft: 'auto',
  },
  modalCloseIcon: {
    width: 40,
    height: 40,
  },
  modalDivider: {
    width: '100%',
    borderBottomWidth: 1,
  },
  modalOption: {
    borderColor: '#5F5F5F',
    borderWidth: 1,
    width: '100%',
    padding: 20,
    paddingLeft: 23,
  },
  modalOptionText: {
    fontSize: 19,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 15,
    marginBottom: 7,
  },
  titleDivider: {
    width: '100%',
    backgroundColor: 'black',
    height: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  frame: {
    marginRight: 14,
    marginLeft: 14,
  },
  productContainer: {
    marginTop: 14,
  },
  productBox: {
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#D7D8D9',
    flexDirection: 'row',
  },
  productImage: {
    width: 90,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 14,
    width: 220,
  },
  productName: {
    fontWeight: 'bold',
  },
  productPrice: {
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 3,
  },
  addButton: {
    flexDirection: 'row',
    padding: 3,
    borderWidth: 1,
    borderColor: '#000000',
    width: 115,
    backgroundColor: 'white',
  },
  addButtonLabel: {
    fontSize: 13,
  },
  addButtonIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});
