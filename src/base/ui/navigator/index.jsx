import { Glyph, Headline, Paragraph } from '@liquid-design/liquid-design-react'
import { navigate } from '@reach/router'
import styles from './index.module.scss'

const Navigator = ({ prevLabel, currentLabel, path }) => {
  return (
    <div className={styles.navigator}>
      <Glyph name="arrowRight" />
      <button type="button" onClick={() => navigate(path)}>
        <Paragraph type="lg">{prevLabel}</Paragraph>
      </button>

      <Glyph name="arrowRight" />
      <Headline type="H1">{currentLabel}</Headline>
    </div>
  )
}

export default Navigator
