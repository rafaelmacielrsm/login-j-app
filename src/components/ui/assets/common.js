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

export const defaultInput = {
  width: 'calc(100% - 16px)',
  borderTop: '5px solid #FFF',
  borderBottom: '5px solid #FFF',
  borderLeft: '8px solid #FFF',
  borderRight: '8px solid #FFF',
  boxShadow: '1px 2px 4px black',
  borderRadius: 4,
  padding: 0,
  fontSize: 16,
  lineHeight: '26px',
  '@media screen and (min-width: 320px)':{
    fontSize: fluidValue(16,24),
    lineHeight: fluidValue(26, 42),
  },
  '@media screen and (min-width: 768px)':{
    fontSize: 24,
    lineHeight: '42px',
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
    fontSize: fluidValue(16,24),
    lineHeight: fluidValue(26, 42),
  },
  '@media screen and (min-width: 768px)':{
    fontSize: 24,
    lineHeight: '42px',
  },  
};