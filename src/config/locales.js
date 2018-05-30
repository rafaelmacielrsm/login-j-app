import get from 'lodash/get';

const locales = {
  'pt_BR': {
    error: {
      invalid_email: 'Não é um email válido',
      required: 'Campo obrigatório',
      network: 'Falha de Conexão, tente novamente em alguns momentos',
      short: ( minimum ) => `Tamanho mínimo: ${minimum}`,
      invalid_format: ( format ) => `Formato: ${format}`,
    },
    label: {
      name: 'Nome',
      email: 'Email',
      password: 'Senha',
      phone_number: 'Número de Telefone',
      button: {
        register: 'Registrar',
      }
    },
    page: {
      signup: {
        title: 'Registre uma Conta'
      },
    },
  }
};

export default ( entry='', lang='pt_BR') => {
  if ( entry === '' ) { throw 'Empty entry in translation'; }

  return get( locales[lang], entry, `Missing Translations for '${entry}'` );
};