import { check } from 'prettier';
import React, { useCallback, useState } from 'react';
import { InputGroup, Input, Button, Icon } from 'rsuite';

const EditableInput = ({
  intialValue,
  label = null,
  emptyMsg = 'input is empty',
  placeholder = 'Write your value',
  onSave,
  ...inputProps
}) => {
  const [inputValue, setInputValue] = useState(intialValue);
  const [isEditable, setisEditable] = useState(false);
  const editClick = useCallback(() => {
    setisEditable(p => !p);
    setInputValue(intialValue);
  }, [intialValue]);

  const OnClickSave = async () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && trimmedValue !== intialValue) {
      await onSave(trimmedValue);
      setisEditable(false);
    }
  };
  const handleInputChange = (value, event) => {
    setInputValue(value);
  };
  return (
    <>
      {label}
      <InputGroup>
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
    </>
  );
};

export default EditableInput;
