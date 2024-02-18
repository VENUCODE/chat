import React, { useCallback, useEffect, useState } from 'react';
import { InputGroup, Input, Icon, Alert } from 'rsuite';

const EditableInput = ({
  intialValue,
  editable,
  setEditable,
  label = null,
  emptyMsg = 'input is empty',
  placeholder = 'Write your value',
  onSave,
  ...inputProps
}) => {
  const [inputValue, setInputValue] = useState(intialValue);
  const [isEditable, setisEditable] = useState(editable);
  const editClick = useCallback(() => {
    setisEditable(p => !p);
    setInputValue(intialValue);
  }, [intialValue]);

  const OnClickSave = async () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && trimmedValue !== intialValue) {
      await onSave(trimmedValue);
      setisEditable(false);
    } else {
      Alert.info('No changes made');
      setEditable(false);
    }
  };
  const handleInputChange = value => {
    setInputValue(value);
  };

  return (
    <div>
      {label}
      <InputGroup className="border-none outline-none focus:outline-none focus:border-collapse">
        <Input
          disabled={!isEditable}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
        <InputGroup.Button onClick={editClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={OnClickSave}>
            <Icon icon={'check'} />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
