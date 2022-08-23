import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, Pressable } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import { Avatar } from 'react-native-paper';

type ShareItem = {
  icon: number;
  name: string;
  pressCallback: () => void;
  key: string;
}

const shareItems: ShareItem[] = [
  {
    icon: require('../assets/images/icon-link.png'),
    name: 'Copiar enlace',
    pressCallback: () => {
      console.log('Share by copy link');
    },
    key: 'share-item-0',
  },
  {
    icon: require('../assets/images/icon-whatsapp.png'),
    name: 'WhatsApp',
    pressCallback: () => {
      console.log('Share by copy WhatsApp');
    },
    key: 'share-item-1',
  },
  {
    icon: require('../assets/images/icon-instagram.png'),
    name: 'Instagram',
    pressCallback: () => {
      console.log('Share by Instagram');
    },
    key: 'share-item-2',
  },
  {
    icon: require('../assets/images/icon-instagram.png'),
    name: 'Instagram Direct',
    pressCallback: () => {
      console.log('Share by Instagram Direct');
    },
    key: 'share-item-3',
  },
  {
    icon: require('../assets/images/icon-facebook.png'),
    name: 'Actividad de noticias',
    pressCallback: () => {
      console.log('Share by facebook');
    },
    key: 'share-item-4',
  },
  {
    icon: require('../assets/images/icon-facebook-story.png'),
    name: 'Historias',
    pressCallback: () => {
      console.log('Share by Historias');
    },
    key: 'share-item-5',
  },
  {
    icon: require('../assets/images/icon-twitter.png'),
    name: 'Twitter',
    pressCallback: () => {
      console.log('Share by Twitter');
    },
    key: 'share-item-6',
  },
  {
    icon: require('../assets/images/icon-message.png'),
    name: 'Mensajes',
    pressCallback: () => {
      console.log('Share by Messages');
    },
    key: 'share-item-7',
  },
  {
    icon: require('../assets/images/icon-more.png'),
    name: 'Más',
    pressCallback: () => {
      console.log('Share by more other options');
    },
    key: 'share-item-8',
  },
];

function RecipeShareActionSheet(props: SheetProps) {
    return (
      <ActionSheet
        id={props.sheetId}
        headerAlwaysVisible
        containerStyle={{ backgroundColor: "#070707" }}
        // indicatorStyle={{ height: 20, width: 50, borderColor: 'white', borderWidth: 2 }}
      >
        <View
          style={{
            height: "50%",
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
          }}
        >
          <FlatGrid
            itemDimension={70}
            data={shareItems}
            style={{ minHeight: 350 }}
            adjustGridToStyles={false}
            renderItem={(share_item) => (
              <Pressable onPress={share_item.item.pressCallback}>
                <View style={{ alignItems: "center" }}>
                  <Avatar.Image source={share_item.item.icon} size={50} />
                  <Text style={{ color: "white", marginTop: 5, height: 55 }}>
                    {share_item.item.name}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </ActionSheet>
    );
  }
   
  export default RecipeShareActionSheet;