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
    MapaNavBar: 'Map',
    About: 'About',
    Other: 'Other',
    ListaDetalhes: 'Details',
    AddNewToMap : 'Add new to map',
    logout : 'Logout'
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
    MapaNavBar: 'Mapa',
    About: 'Sobre',
    Other: 'Outro',
    ListaDetalhes: 'Detalhes',
    AddNewToMap : 'Adicionar novo ao mapa',
    logout : 'Terminar Sessão'
  }
};

export default new LocalizedStrings(translations);
