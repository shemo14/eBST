import I18n from 'ex-react-native-i18n';
import ar from './ar'
import en from './en'

I18n.fallbacks = true;

I18n.translations = {
    en,
    ar
};



I18n.locale = 'ar';
export default I18n;