import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import en from './translations/en.json';
import ko from './translations/ko.json';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en, ko };

export default i18n;