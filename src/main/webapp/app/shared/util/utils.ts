import moment from 'moment';
import { Storage } from 'react-jhipster';

const locale = Storage.session.get('locale', 'en');

export const isNumber = (num: string) => {
  if (num !== 'undefined' && num !== null && num !== '' && /^\d+$/.test(num)) {
    return true;
  } else {
    return false;
  }
};

export const skipAllWhiteSpace = (str: string) => {
  if (str !== 'undefined' && str !== null && str !== '') {
    return str.replace(/\s/g, '');
  } else {
    return '';
  }
};

export const skipAllSpaceWithSplit = (str: string, sub: number) => {
  if (str !== 'undefined' && str !== null && str !== '') {
    return str.replace(/\s/g, '').substring(sub);
  } else {
    return '';
  }
};

export const isDateNull = (date: Date) => {
  if (typeof date === 'undefined' || date === null) {
    return true;
  } else {
    return false;
  }
};

export const formatDate = (date: Date) => (date ? moment(date).format('YYYY-MM-DD') : '');

export const isValidDate = (date: Date) => (!isDateNull(date) ? true : false);

export const isEnglishLocale = () => locale === 'en';

export const isArabicLocale = () => locale === 'ar';

export const getObject = (obj: object) => (obj ? obj : {});

export const getArray = (obj: any) => (obj ? obj : []);

export const getElemntValue = (obj: any) => (obj ? obj : '');

export const getNumber = (obj: object) => {
  if (obj) {
    return Number.parseInt(obj.toString(), 0);
  } else {
    return null;
  }
};

export const getDate = (date: Date) => {
  if (!isDateNull(date)) {
    return date;
  } else {
    return null;
  }
};

export const getBoolean = (boolean: boolean) => (boolean ? boolean : false);

export const isValidLicenseNumber = (licenseNumber: string) => (licenseNumber.length > 0 && licenseNumber.length <= 5 ? true : false);

export const IsJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const CalculatingDiff = (date, Lday?, Ltime?) => {
  let diff = date.getTime() - new Date().getTime();

  let conDay = '';
  let conTime = '';
  let conmin = '';

  conDay = Lday && Lday !== undefined ? Lday : 'Days';
  conTime = Ltime && Ltime !== undefined ? Ltime : 'hrs';
  conmin = conmin && conmin !== undefined ? conmin : 'm';

  if (diff < 0) {
    return 0 + conDay + ' , ' + 0 + ':' + 0 + ' ' + 0;
  }

  diff = diff / 1000;
  // let seconds = Math.floor(diff % 60);
  diff = diff / 60;
  const minutes = Math.floor(diff % 60);
  diff = diff / 60;
  let hours = Math.floor(diff % 24);
  let days = Math.floor(diff / 24);
  if (days < 0) {
    days = 0;
    hours = 0;
  }

  // return (days + Lday ? Lday : ' Days' + ', ') + (hours + Ltime ? Ltime : ' hrs');
  return days + conDay + ' , ' + hours + ':' + minutes + ' ' + (hours < 1 ? conmin : conTime);
};
