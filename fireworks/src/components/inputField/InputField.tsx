import React, {FC, ReactElement} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {mainColors} from '../../common/themes/colors';
import {styleShadow} from '../../common/themes/commonStyles';
import {Spacing} from '../../common/themes/spacing';

export interface InputFieldProps {
  onTextChanged: (value: string) => void;
  value: string;
}

export const InputField: FC<InputFieldProps> = ({
  onTextChanged,
  value,
}): ReactElement => {
  return (
    <View style={[styles.container, styleShadow]}>
      <TextInput
        style={styles.input}
        editable
        onChangeText={(updatedValue: string) => {
          onTextChanged(updatedValue);
        }}
        placeholder={'Enter Name'}
        keyboardType={'default'}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    borderWidth: 1,
    borderColor: mainColors.PURPLE,
    height: Spacing.s40 + Spacing.s24,
    backgroundColor: mainColors.WHITE,
  },
  input: {
    borderRadius: 5,
    height: Spacing.s40,
    paddingHorizontal: Spacing.s12,
    width: '100%',
    backgroundColor: mainColors.WHITE,
    color: mainColors.BLACK,
  },
});
