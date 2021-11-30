import { Form } from 'react-final-form'
import { Headline } from '@liquid-design/liquid-design-react'
import { Button } from 'base/form'
import styles from './form_layout.module.scss'

const FormLayout = ({
  title,
  children,
  className,
  okTitle,
  okOnClick,
  okDisabled,
  cancelTitle,
  cancelOnClick,
  footerAction,
  isLoading,
}) => {
  return (
    <div className={styles.formLayout}>
      <Headline type="H2">{title}</Headline>
      <Form
        onSubmit={okOnClick}
        render={({ handleSubmit, pristine, invalid }) => (
          <>
            <form
              className={`${styles.body} ${title ? styles.hasTitle : ''} ${
                className || ''
              }`}
            >
              {children}
            </form>

            <div className={styles.footer}>
              <div className={styles.action}>{footerAction || ''}</div>

              <div className={styles.buttons}>
                {okTitle && (
                  <Button
                    className={styles.confirm}
                    onClick={handleSubmit}
                    disabled={
                      okDisabled !== 'undefined'
                        ? okDisabled
                        : pristine || invalid
                    }
                    color="secondary"
                    loading={isLoading}
                  >
                    {okTitle}
                  </Button>
                )}

                {cancelTitle && (
                  <Button
                    className={styles.cancel}
                    onClick={cancelOnClick}
                    appearance="secondary"
                    color="secondary"
                  >
                    {cancelTitle}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      />
    </div>
  )
}

export default FormLayout
