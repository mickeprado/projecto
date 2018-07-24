import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  StyleSheet,
  Image,
  Easing,
  TouchableHighlight,
  Modal,
} from 'react-native';
import {  Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';


//import { API, Storage } from 'aws-amplify';



import SideMenuIcon from '../Components/SideMenuIcon';
import { styles, colors } from '../Components/MainStyles';
import Header from "../Components/pages/Header";
import Footer from "../Components/pages/Footer";




class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleRetrievePet = this.handleRetrievePet.bind(this);
    this.animate = this.animate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.animatedIcon = new Animated.Value(0);

    this.state = {
      apiResponse: null,
      loading: true,
      modalVisible: false,
    }
  }

  componentDidMount() {
    this.handleRetrievePet();
    this.animate();
  }

  animate() {
    Animated.loop(
      Animated.timing(
        this.animatedIcon,
        {
          toValue: 1,
          duration: 1300,
          easing: Easing.linear,
        }
      )
    ).start();
  }

  handleRetrievePet() {
    // API.get('Pets', '/items/pets').then(apiResponse => {
    //   return Promise.all(apiResponse.map(async (pet) => {
    //     // Make "key" work with paths like:
    //     // "private/us-east-1:7817b8c7-2a90-4735-90d4-9356d7f8f0c7/091357f0-f0bc-11e7-a6a2-937d1d45b80e.jpeg"
    //     // and
    //     // "44b223e0-9707-11e7-a7d2-cdc5b84df56b.jpeg"
    //     const [, , , key] = /(([^\/]+\/){2})?(.+)$/.exec(pet.picKey);

    //     const picUrl = pet.picKey && await Storage.get(key, { level: 'private' });

    //     return { ...pet, picUrl };
    //   }));
    // }).then(apiResponse => {
    //   this.setState({ apiResponse, loading: false });
    // }).catch(e => {
    //   this.setState({ apiResponse: e.message, loading: false });
    // });
  }

  openDrawer = () => {
    this.props.navigation.navigate('DrawerOpen');
  }

  toggleModal() {
    if (!this.state.modalVisible) {
      this.handleRetrievePet();
      this.animate();
    }

    this.setState((state) => ({ modalVisible: !state.modalVisible }));
  }
  




  render() {
 
    return (
      <View style={styles.perfback}>
       <Header />
       <Footer/>
      
      </View >
    );
  }
};





const HomeRouteStack = {
  Home: {
    screen: (props) => {
      const { screenProps, ...otherProps } = props;
      return <Home {...props.screenProps} {...otherProps} />
    },
    navigationOptions: (props) => {
      return {
        title: 'Home',
        headerLeft: <SideMenuIcon onPress={() => props.screenProps.rootNavigator.navigate('DrawerOpen')} />,
      }
    }
  },
  // ViewPet: { screen: ViewPet }
};

const HomeNav = createStackNavigator(HomeRouteStack);

export default (props) => {
  const { screenProps, rootNavigator, ...otherProps } = props;

  return <HomeNav screenProps={{ rootNavigator, ...screenProps, ...otherProps }} />
};
