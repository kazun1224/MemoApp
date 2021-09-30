import React from 'react';
import { StyleSheet, View } from 'react-native';
import { string, shape } from 'prop-types';

import  Icon  from './Icon';

export default function CircleButton(props) {
  const { style, name } = props;
  return (
    <View style={[styles.circleButton, style]}>
      <Icon name={ name } size={ 24 } color='#ffffff' />
    </View>
  );
}

CircleButton.propTypes = {
  style: shape(),
  name: string.isRequired,
}

const styles = StyleSheet.create({
  circleButton: {
    backgroundColor:'#467FD3',
    width: 64,
    height: 64,
    borderRadius: 32,
    position: 'absolute',
    right: 40,
    bottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  circleButtonLabel: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 40,
  },
});
