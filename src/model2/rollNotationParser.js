import {Roll} from "./Roll";

export default (notation) =>{
  if(isValidRoll(notation)) {
    const [phrase, count, mark, type, modifier] = notation.match(exp);
    return {phrase, count, mark, type, modifier};
  }else {
    return null;
  }
}
export const isValidRoll = (notation) =>{
  return !!notation.match(exp);
};

const countExp = '([1-9]+[0-9]*)?';
const markExp = '([kKDd])';
const typeExp = '([1-9]+[0-9]*|%)';
const modifierExp = '([ ]*[\\+\\-][ ]*\\d*)?';

const exp = new RegExp(countExp+markExp+typeExp+modifierExp);
