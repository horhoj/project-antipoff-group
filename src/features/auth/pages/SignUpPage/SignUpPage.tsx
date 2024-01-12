import { useFormik } from 'formik';
import * as yup from 'yup';
import { authSlice } from '../../store/authStore';
import styles from './SignUpPage.module.scss';
import { FormField } from '~/ui/FormField';
import { FormInput } from '~/ui/FormInput';
import { FormButton } from '~/ui/FormButton';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

interface InitialValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialValues: InitialValues = {
  name: 'aaa',
  email: 'a@a',
  password: '12345678',
  passwordConfirm: '12345678',
};

const VALIDATION_IS_EMPTY_MSG = 'Не должно быть пустым';
const VALIDATION_IS_NOT_EMAIL_MSG = 'Не почта';
const VALIDATION_PASSWORD_MUST_MATCH = 'Пароль и подтверждение не совпадают';
const VALIDATION_PASSWORD_MUST_MIN =
  'Пароль должен содержать минимум 8 символов';

const validationSchema = yup.object({
  name: yup.string().required(VALIDATION_IS_EMPTY_MSG),
  email: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .email(VALIDATION_IS_NOT_EMAIL_MSG),
  password: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .min(8, VALIDATION_PASSWORD_MUST_MIN),
  passwordConfirm: yup
    .string()
    .required(VALIDATION_IS_EMPTY_MSG)
    .oneOf([yup.ref('password'), ''], VALIDATION_PASSWORD_MUST_MATCH),
});

export function SignUpPage() {
  const dispatch = useAppDispatch();
  const formik = useFormik<InitialValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        authSlice.thunks.signUpThunk({
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.passwordConfirm,
        }),
      );
    },
  });
  const isNameError =
    Boolean(formik.touched.name) && Boolean(formik.errors.name);

  const isEmailError =
    Boolean(formik.touched.email) && Boolean(formik.errors.email);

  const isPasswordError =
    Boolean(formik.touched.password) && Boolean(formik.errors.password);

  const isPasswordConfirmError =
    Boolean(formik.touched.passwordConfirm) &&
    Boolean(formik.errors.passwordConfirm);

  const signUpRequest = useAppSelector((state) => state.auth.signUpRequest);

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete={'off'}
      className={styles.SignUpPage}
    >
      <div className={styles.title}>Регистрация</div>
      <>
        {signUpRequest.error && (
          <pre className={styles.serverError}>
            {JSON.stringify(signUpRequest.error, null, 2)}
          </pre>
        )}
      </>
      <FormField label={'Имя'} error={isNameError && formik.errors.name}>
        <FormInput
          placeholder={'введите имя...'}
          isError={isNameError}
          {...formik.getFieldProps('name')}
        />
      </FormField>

      <FormField label={'Почта'} error={isEmailError && formik.errors.email}>
        <FormInput
          placeholder={'example@mail.ru...'}
          isError={isEmailError}
          {...formik.getFieldProps('email')}
        />
      </FormField>

      <FormField
        label={'Пароль'}
        error={isPasswordError && formik.errors.password}
      >
        <FormInput
          placeholder={'пароль...'}
          isError={isPasswordError}
          isPassword={true}
          {...formik.getFieldProps('password')}
        />
      </FormField>

      <FormField
        label={'Подтвердите пароль'}
        error={isPasswordConfirmError && formik.errors.passwordConfirm}
      >
        <FormInput
          placeholder={'подтверждение пароля'}
          isError={isPasswordConfirmError}
          isPassword={true}
          {...formik.getFieldProps('passwordConfirm')}
        />
      </FormField>
      <FormButton type={'submit'}>submit</FormButton>
    </form>
  );
}
