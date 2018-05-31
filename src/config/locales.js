import get from 'lodash/get';

const locales = {
  'pt_BR': {
    error: {
      invalid_email: 'Não é um email válido',
      required: 'Campo obrigatório',
      network: 'Falha na Conexão, tente novamente em alguns momentos',
      short: ( minimum ) => `Tamanho mínimo: ${minimum}`,
      invalid_format: ( format ) => `Formato: ${format}`,
    },
    label: {
      name: 'Nome',
      email: 'Email',
      password: 'Senha',
      phone_number: 'Número de Telefone',
      button: {
        register: 'Cadastrar',
        login: 'Acessar'
      }
    },
    link: {
      has_account: 'Já possui conta? ',
      login: 'Acesse aqui. ',
      no_account: 'Não possui Cadastro? ',
      signup: 'Cadastre aqui. ',
    },
    page: {
      signup: {
        title: 'Cadastre uma Conta'
      },
      login: {
        title: 'Bem Vindo',
      },
    },
  }
};

export default ( entry='', lang='pt_BR') => {
  if ( entry === '' ) { throw 'Empty entry in translation'; }

  return get( locales[lang], entry, `Missing Translations for '${entry}'` );
};