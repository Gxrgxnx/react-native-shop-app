import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CloseCircleIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from '@gluestack-ui/themed';
import { Colors } from '../constants';

interface SearchBarProps {
  focused: boolean;
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  focused,
  searchPhrase,
  setSearchPhrase,
  setIsFocused,
}) => {
  return (
    <Input
      style={{
        ...styles.input,
        borderColor: focused ? Colors.accent : Colors.lightGray,
      }}>
      <InputSlot marginLeft={8}>
        <InputIcon as={SearchIcon} />
      </InputSlot>
      <InputField
        placeholder="Search..."
        value={searchPhrase}
        onChangeText={(value) => setSearchPhrase(value)}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {searchPhrase && (
        <InputSlot marginRight={8} onPress={() => setSearchPhrase('')}>
          <InputIcon as={CloseCircleIcon} />
        </InputSlot>
      )}
    </Input>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    marginHorizontal: 14,
    marginBottom: 14,
  },
});
