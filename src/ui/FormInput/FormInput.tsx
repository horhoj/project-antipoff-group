import { InputHTMLAttributes, forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from './FormInput.module.scss';
import { PasswordShowToggleIcon } from '~/assets/icons';

interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  isError: boolean;
  isPassword?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { className, isError, isPassword = false, ...props }: FormInputProps,
    ref,
  ) => {
    const [isPasswordShow, setIsPasswordShow] = useState(true);
    const handlePasswordShowToggle = () => {
      setIsPasswordShow((prev) => !prev);
    };

    return (
      <span className={styles.FormInputWrap}>
        {isPassword && (
          <span
            className={styles.passwordShowToggleIcon}
            onClick={handlePasswordShowToggle}
          >
            <PasswordShowToggleIcon isHide={!isPasswordShow} />
          </span>
        )}
        <input
          type={isPassword && isPasswordShow ? 'password' : undefined}
          {...props}
          className={classNames(
            styles.FormInput,
            className,
            isError && styles.isError,
          )}
          ref={ref}
        />
      </span>
    );
  },
);

FormInput.displayName = 'FormInput';
