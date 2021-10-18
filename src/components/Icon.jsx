import React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font'; // .ttfファイルを使用できる機能をimport
import { oneOf } from 'prop-types'; // oneOfは決められた値を自由に割り付けることができる

import icomoon from '../../assets/fonts/icomoon.ttf';
import selection from '../../assets/fonts/selection.json';

export default function Icon(props) {
  const { name, size, color } = props;
  const [fontLoaded] = useFonts({ icomoon });
  const CustomIcon = createIconSetFromIcoMoon(selection);

  if (!fontLoaded) {
    // もしfonLoadedに何もなかったら(false)何も存在しない
    return null;
  }
  // 存在したらした(true)を返す
  return <CustomIcon name={name} size={size} color={color} />;
}

// propTypesを設定
Icon.propTypes = {
  name: oneOf(['plus', 'pen', 'check', 'x']).isRequired, // oneOfの値を決める
};

// defaultPropsを設定

// size: 24,
// color: '#000000',
