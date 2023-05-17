import {StyleSheet, Text, View} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Route, Router} from './react-router';
import {persistor, store} from './store';

import HomeStart from '@view/homeStart';
import HomeLogged from '@view/homeLogged';
import EventView from '@view/eventView';

import {useEffect} from 'react';

const Home = () => (
  <View>
    <Text>Homes</Text>
  </View>
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <View style={styles.container}>
            {/* <View style={styles.nav}>
            <Link to="/">
            <Text>Home</Text>
            </Link>
            <Link to="/about">
            <Text>About</Text>
            </Link>
          </View> */}

            <Route exact path="/" component={HomeStart} />
            <Route path="/HomeLogged" component={HomeLogged} />
            <Route path="/EventView" component={EventView} />
          </View>
        </Router>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: 0,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;
