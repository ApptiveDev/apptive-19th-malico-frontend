import {ChangeEvent} from 'react';

/**
 * input에서 최대 입력가능 글자 수 제한
 * e.g. input에 onChange={e => { limitInputNumber(e, limit) } 추가
 *
 * @param {ChangeEvent<HTMLInputElement>} event
 * @param {int} limit
 */
export const limitInputNumber = (
  event: ChangeEvent<HTMLInputElement>, limit: number) => {
  const value = event.target.value;
  if (value.length > limit) {
    event.target.value = value.slice(0, limit);
  }
};

export const sanitizeString = (str: string) => {
  const map: { [key:string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return str.replace(reg, (match)=>(map[match]));
};
