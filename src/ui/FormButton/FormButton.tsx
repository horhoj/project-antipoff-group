import { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './FormButton.module.scss';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
}

export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        {...props}
        className={classNames(styles.FormButton, className)}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

FormButton.displayName = 'Button';
