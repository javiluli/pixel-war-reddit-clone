// Material Dashboard 2 React Base Styles
import typography from '@@themes/theme/base/typography'
import borders from '@@themes/theme/base/borders'

// Material Dashboard 2 React Helper Functions
import pxToRem from '@@themes/theme/functions/pxToRem'

const { fontWeightBold, size } = typography
const { borderRadius } = borders

const root = {
  fontSize: size.xs,
  fontWeight: fontWeightBold,
  borderRadius: borderRadius.lg,
  padding: `${pxToRem(16)} ${pxToRem(24)}`,
  lineHeight: 1.4,
  textAlign: 'center',
  textTransform: 'none',
  userSelect: 'none',
  backgroundSize: '150% !important',
  backgroundPositionX: '25% !important',
  transition: 'all 150ms ease-in',

  '&:disabled': {
    pointerEvent: 'none',
    opacity: 0.65,
  },
}

export default root
