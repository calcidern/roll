export default (notation) => {
  if (isValidRoll(notation)) {
    const matched = notation.match(exp);
    const [phrase] = matched;
    const {count, mark, type, modifier, min, max} = matched.groups;

    return {
      phrase,
      count: parseInt(count, 10) || 1,
      mark,
      type: type === '%' ? 100 : parseInt(type, 10),
      modifier: modifier && parseInt(modifier.replace(/ /g, ''), 10),
      min,
      max
    };
  } else {
    return null;
  }
};
export const isValidRoll = (notation) => {
  return !!notation.match(exp);
};

const countExp = '(?<count>[1-9]+[0-9]*)?';
const markExp = '(?<mark>[kKDd])';
const typeExp = '(?<type>[1-9]+[0-9]*|%)';
const modifierExp = '(?<modifier>[ ]*[\\+\\-][ ]*\\d*)?';
const testExp = '([ ]*(?<min>\\d*)?\\|(?<max>\\d*)?)?';

const exp = new RegExp(countExp + markExp + typeExp + modifierExp + testExp);
