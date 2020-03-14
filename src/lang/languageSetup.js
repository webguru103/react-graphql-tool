import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import 'moment/locale/fr-ca';

const enLang = require('./en.json');
const frCaLang = require('./fr-ca.json');

const languages = {
  en: enLang,
  'fr-ca': frCaLang,
};

addLocaleData([...en, ...fr]);

export default languages;
