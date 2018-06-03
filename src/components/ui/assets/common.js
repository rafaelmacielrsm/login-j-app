export const colorPallet = {
  primary: '#283593',
  primaryLight: '#5f5fc4',
  primaryDark: '#001064',
  secundary: '#ffc400',
  secundaryLight: '#fff645',
  secundaryDark: '#c79400',
  textPrimary: '#ffffff',
  textSecundary: '#000000',
  alert: '#b00020',
  disabled: '#E1E2E1',
  success: '#009688',
  successDark: '#00675b',
};

const t = {
  breakpoint: {
    small: '320',
    medium: '768',
  }
};

export const fluidValue = ( min, max ) => (
  `calc(${min}px + (${max} - ${min}) * 
    (100vw - ${t.breakpoint.small}px) / (${t.breakpoint.medium} - 
    ${t.breakpoint.small}))`
);

export const fadeInAnimation = {
  animationName: {
    'from': { 
      opacity: 0,
    },
    'to': { 
      opacity: 1,
    },
  },
  animationDuration: '.5s',
  animationIterationCount: '1',
  animationTimingFunction: 'ease-in-out'    
};

export const defaultLink = {
  color: colorPallet.secundaryLight,
  ':visited': {
    color: colorPallet.secundaryLight,
  },
};

export const backLink = {
  color: colorPallet.primaryDark,
  ':visited': {
    color: colorPallet.primaryDark,
  },
};

export const defaultButton = {
  border: 0,
  margin: 0,
  padding: '0.25em 0.5em',
  borderRadius: '.25em',
  boxShadow: '1px 2px 4px black',
  color: colorPallet.textSecundary,
  backgroundColor: colorPallet.secundary,
  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: colorPallet.disabled,
    opacity: '.5',
    ':hover': {
      cursor: 'not-allowed',
      backgroundColor: colorPallet.disabled,  
    },
  },
  ':hover': {
    cursor: 'pointer',
    backgroundColor: colorPallet.secundaryDark,
  },
  '@media screen and (min-width: 320px)':{
    fontSize: fluidValue(16,20),
    lineHeight: fluidValue(26, 36),
  },
  '@media screen and (min-width: 768px)':{
    fontSize: 20,
    lineHeight: '36px',
  },  
};

export const primaryCard = {
  head: {
    margin: '0.5em 0',
    textAlign: 'center',
    width: '100%',
  },

  title: {
    margin: 0,
    padding: 0,
  },

  body: {
    width: '100%',
    border: '1px solid black',
    borderRadius: '8px',
    boxSizing: 'border-box',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0.5em',
    color: colorPallet.textPrimary,
    backgroundColor: colorPallet.primary,
    '@supports (grid-area: auto)': {
      '@media screen and (min-width: 769px)': {
        gridColumn: '2/6',
      }
    }
  },
};