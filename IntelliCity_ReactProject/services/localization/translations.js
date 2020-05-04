import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    WELCOME: 'Welcome to Localization',
    BUTTON: 'b en',
    LoginNavBar: 'Login',
    UsernameTextInput: 'Username',
    PasswordTextInput: 'Password',
    LoginButton: 'Login',
    RegistarButton: 'Register',
    ReportsListButton: 'Reports List',
    RegistarNavBar: 'Register',
    InserirDadosText: 'Insert user data',
    NomeTextInput: 'Name',
    ReportsListNavBar: 'Reports List',
    MapaNavBar: 'Map'
  },
  pt: {
    WELCOME: 'Bem-vindo à multi-lingua',
    BUTTON: 'b pt',
    LoginNavBar: 'Iniciar Sessao',
    UsernameTextInput: 'Nome de utilizador',
    PasswordTextInput: 'Palavra passe',
    LoginButton: 'Iniciar Sessao',
    RegistarButton: 'Registar',
    ReportsListButton: 'Lista de Reports',
    RegistarNavBar: 'Registar',
    InserirDadosText: 'Inserir dados do utilizador',
    NomeTextInput: 'Nome',
    ReportsListNavBar: 'Lista de Reports',
    MapaNavBar: 'Mapa'
  }
};

export default new LocalizedStrings(translations);
