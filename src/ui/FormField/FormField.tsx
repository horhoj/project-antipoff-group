import styles from './FormField.module.scss';

interface FormFieldProps {
  children: React.ReactNode;
  label: string;
  error?: string | boolean;
}
export function FormField({ children, error, label }: FormFieldProps) {
  return (
    <div className={styles.FormField}>
      <label className={styles.label}>{label}</label>
      <div className={styles.children}>{children}</div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
