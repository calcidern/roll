import random from './randomRoll';
import roll, {reroll} from './rollDice';
import parse from './rollNotationParser';

jest.mock('./randomRoll', () => jest.fn((type) => type));


describe('Roll Dice', () => {
  const mockRandom = 6;

  random.mockReturnValue(mockRandom);

  describe('roll', () => {


    it('should preserve all roll information', () => {
      const rollObject = parse('1k6');

      const result = roll(rollObject);

      expect(result).toMatchObject(rollObject);
    });


    it('should execute simple roll (1k6)', () => {
      const rollObject = {count: 1, type: 6};

      const result = roll(rollObject);

      expect(result.sum).toBe(mockRandom);
    });

    it('should roll only one dice', () => {
      const rollObject = {count: 1, type: 6};

      const {dices} = roll(rollObject);

      expect(dices.length).toBe(1);
      expect(dices[0].value).toBe(mockRandom);
    });

    it('should include modifier to sum', () => {
      const rollObject = {count: 1, type: 6, modifier: 5};

      const {sum} = roll(rollObject);

      expect(sum).toBe(11);
    });

    it('should sum all dice results an modifier', () => {
      const count = 3;
      const type = 6;
      const modifier = 5;
      const rollObject = {count, type, modifier};

      const expectedSum = count * type + modifier;

      const {dices, sum} = roll(rollObject);

      expect(dices.length).toBe(3);
      expect(sum).toBe(expectedSum);
    });
  });

  describe('reroll', () => {
    const count = 2;
    const type = 6;
    const modifier = 5;

    const rerolledValue = 2;
    const diceIndex = 1;

    const rolled = roll({count, type, modifier});


    beforeEach(() => {
      random.mockReturnValue(rerolledValue);
    });


    it('should have dice with new value', () => {
      const {dices} = reroll(rolled, diceIndex);
      const {value} = dices[diceIndex];
      expect(value).toBe(rerolledValue);
    });

    it('should have dice marked as rerolled', () => {
      const {dices} = reroll(rolled, diceIndex);
      const {rerolled} = dices[diceIndex];
      expect(rerolled).toBe(true);
    });

    it('should update roll sum', () => {
      const {sum} = reroll(rolled, diceIndex);
      const expectedSum = rerolledValue + type + modifier;
      expect(sum).toEqual(expectedSum);
    });

    it('should reroll only one dice', () => {
      const {dices} = reroll(rolled, diceIndex);
      const anotherIndex = 0;
      const {value, rerolled} = dices[anotherIndex];
      expect(value).toEqual(mockRandom);
      expect(rerolled).toBeFalsy();
    });


  });

});