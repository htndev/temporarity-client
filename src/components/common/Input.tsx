import { TextField, TextFieldProps } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useStyleVariables } from '../../common/utils/hooks/useStyleVariables';
import { ValidatorFn } from '../../common/utils/validators';

export const Input: FC<
  Omit<TextFieldProps, 'onChange' | 'value'> & {
    value: string;
    rules?: ValidatorFn[];
    isCorrect?: boolean;
    onChange(string: string): void;
    onValidationStateChange?: (value: boolean) => void;
  }
> = ({
  sx,
  label,
  isCorrect = false,
  rules = [],
  value,
  onChange,
  onValidationStateChange,
  ...props
}) => {
  const { spacing } = useStyleVariables();
  const [input, setInput] = useState<string>(value || '');
  const [isValid, setIsValid] = useState<boolean>(isCorrect || true);
  const [isInitialState, setIsInitialState] = useState(true);
  const [displayLabel, setDisplayLabel] = useState(label || '');

  const validate = useCallback(
    () =>
      rules.length
        ? rules.reduce(
            (isCorrect: true | string, rule) => (isCorrect === true ? rule(input) : isCorrect),
            true
          )
        : true,
    [rules, input]
  );

  const onInputChange = (string: string) => {
    if (isInitialState) {
      setIsInitialState(false);
    }
    setInput(string);
    onChange(string);
  };

  useEffect(() => {
    setIsValid(isCorrect);
  }, [isCorrect, onValidationStateChange]);

  useEffect(() => {
    if (isInitialState) {
      return;
    }
    const validateResponse = validate();

    if (typeof validateResponse === 'boolean' && validateResponse === true) {
      setDisplayLabel('');
      setIsValid(true);
      return;
    }

    setDisplayLabel(validateResponse);
    setIsValid(false);
  }, [isInitialState, input, validate]);

  useEffect(() => {
    onValidationStateChange?.(isValid);
  }, [isValid, onValidationStateChange]);

  return (
    <TextField
      value={input}
      error={isInitialState ? false : !isValid}
      helperText={displayLabel}
      onChange={(e) => onInputChange(e.target.value)}
      sx={{ marginBottom: spacing.spacing2, ...sx }}
      {...props}
    />
  );
};
