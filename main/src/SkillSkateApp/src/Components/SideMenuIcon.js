/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { colors } from './MainStyles';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    left: 10,
  },
});

const SideMenuIcon = ({ onPress }) => (
  <View style={styles.iconContainer}>
    <Icon underlayColor="transparent" onPress={onPress} name="menu" color={colors.grayIcon} />
  </View>
);

export default SideMenuIcon;
