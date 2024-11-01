import { createTheme } from '@mui/material'

import pxToRem from '../functions/pxToRem'
import breakpoints from './breakpoints'
import colors from './colors'

// const theme = createTheme()

const { common } = colors

const baseProperties = {
  fontWeightRegular: 400,
  fontWeightBold: 700,
  fontSizeXXS: pxToRem(14),
  fontSizeXS: pxToRem(20),
  fontSizeSM: pxToRem(26),
  fontSizeMD: pxToRem(32),
  fontSizeLG: pxToRem(0),
  fontSizeXL: pxToRem(0),
  fontSize2XL: pxToRem(0),
  fontSize3XL: pxToRem(0),
}

const typography = {
  fontFamily: baseProperties.fontFamily,

  // h2: {
  //   fontSize: pxToRem(2.5, 1),
  //   fontStyle: 'italic',
  //   fontWeight: baseProperties.fontWeightBold,

  //   [theme.breakpoints.up(breakpoints.values.desktop)]: {
  //     fontSize: pxToRem(4, 1),
  //   },
  // },

  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL,
    '2xl': baseProperties.fontSize2XL,
    '3xl': baseProperties.fontSize3XL,
  },
}

export default typography
