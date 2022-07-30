import { StyleSheet, Image } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-paper';
import Swiper from 'react-native-swiper';

export default function WelcomeScreen() {
  const swiper = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [pageContent, setPageContent] = useState<{image: string, title: string, content: string}[]>([
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fwelcome-cover-1.png?alt=media&token=b1ff9f6d-e664-4605-b7e5-f30079c39882',
          title: 'Encuentra la comida que más amas',
          content: 'Encuentra los mejores restaurantes de tu ciudad, reserva y paga fácilmente.',
        },
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fwelcome-cover-2.png?alt=media&token=7dab3a1c-5535-4e26-83a4-7864302dbcb7',
          title: 'Paga sin esperas',
          content: 'Siéntate. Pide lo que quieras y paga al instante. Sin esperas.',
        }
  ]);

  useEffect(() => {
    setTimeout(() => {
      //TODO: Remove this and fetch from server
      // const contentInfo = [
      //   {
      //     image: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fwelcome-cover-1.png?alt=media&token=b1ff9f6d-e664-4605-b7e5-f30079c39882',
      //     title: 'Encuentra la comida que más amas',
      //     content: 'Encuentra los mejores restaurantes de tu ciudad, reserva y paga fácilmente.',
      //   },
      //   {
      //     image: 'https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fwelcome-cover-2.png?alt=media&token=7dab3a1c-5535-4e26-83a4-7864302dbcb7',
      //     title: 'Paga sin esperas',
      //     content: 'Siéntate. Pide lo que quieras y paga al instante. Sin esperas.',
      //   }
      // ];
      // setPageContent(contentInfo);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiper}
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        onIndexChanged={(index: number) => {
          console.log("Swiper index changed: ", index);
          if (index >= 0) {
            setCurrentIndex(index);
          }
        }}
        dot={
          <View
            style={{
              backgroundColor: '#D6D6D6',
              width: 13,
              height: 13,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#C93E54',
              width: 13,
              height: 13,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7
            }}
          />
        }
      >
        {
          pageContent.map((item, index) => {
            return (
              <View key={`item-page-content-${index}`} style={styles.slide}>
                <Image
                  source={{uri: item.image}}
                  style={{ width: '50%', height: '60%', resizeMode: "stretch" }}
                ></Image>
              </View>
            );
          })
        }
      </Swiper>
      <View style={styles.bottomBoard}>
        <Text style={styles.title}>
          {pageContent[currentIndex] ? pageContent[currentIndex].title : ""}
        </Text>
        <Text style={styles.text}>
          {pageContent[currentIndex] ? pageContent[currentIndex].content : ""}
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            console.log("Next page ...");
            if (swiper.current && currentIndex < (pageContent.length - 1)) {
              swiper.current.scrollBy(1, true);
            }

            // dispatch(flagAppLoading());
            // const auth = getAuth();
            // signInWithEmailAndPassword(auth, email, password)
            //   .then((userCredential) => {
            //     // Signed in
            //     const user = userCredential.user;
            //     console.log('Sign in succeed: ', user);
            //   })
            //   .catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     console.error(`Sign in failed: ${errorCode}, ${errorMessage}`);
            //     dispatch(flagAppLoaded());
            //     Alert.alert("Sign in failed", errorMessage);
            //   });
          }}
          color={"white"}
          contentStyle={{ height: 60 }}
          labelStyle={{ fontSize: 22, color: "white" }}
          style={styles.signInButton}
          uppercase={false}
        >
          Siguiente
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C93E54',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCF9F7'
  },
  bottomBoard: {
    alignItems: 'center',
    height: '45%',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#FCF9F7'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
    color: '#4A4B4D',
    marginTop: 20,
    textAlign: 'center',
    width: '75%',
    height: '20%',
  },
  text: {
    marginTop: 50,
    color: '#7C7D7E',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
    height: '15%',
  },
  signInButton: {
    borderRadius: 50,
    width: '80%',
    marginTop: 50,
    backgroundColor: "#C93E54",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
