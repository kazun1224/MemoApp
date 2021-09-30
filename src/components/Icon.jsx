import React from "react";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts } from '@use-expo/font';
import { number, string, oneOf } from "prop-types"; // oneOfは決められた値を自由に割り付けることができる

import icomoon from '../../assets/fonts/icomoon.ttf';
import selection from '../../assets/fonts/selection.json';

export default function Icon(props) {
  const [fontLoaded] = useFonts({ icomoon });
  const { name, size, color} = props;
  const CustomIcon = createIconSetFromIcoMoon(selection);

  if(! fontLoaded) {
  // もしfonLoadedに何もなかったら(false)何も存在しない
  return null;
  }
  // 存在したらした(ture)を返す
  return <CustomIcon name={name} size={size} color={color} />;
}

Icon.protoTypes = {
  name: oneOf(['plus', 'pen', 'check', 'x']).isRequired, // oneOfの値を決める
  size: number,
  color: string,
}

Icon.defaultProps = {
    size: 24,
    color: '#000000',
}
