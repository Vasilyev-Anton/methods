import Character from '../character';

test('should throw an error if the name is less than 2 characters', () => {
  expect(() => new Character('a', 'Swordsman')).toThrow('Некорректное имя персонажа');
});

test('should throw an error if the name is more than 10 characters', () => {
  expect(() => new Character('12345678901', 'Bowman')).toThrow('Некорректное имя персонажа');
});

test('should throw an error if the type is not one of the allowed types', () => {
  expect(() => new Character('Warrior', 'Knight')).toThrow('Некорректный тип персонажа');
});

test.each([
  ['John', 'Bowman'],
  ['John', 'Swordsman'],
  ['John', 'Magician'],
  ['John', 'Daemon'],
  ['John', 'Undead'],
  ['John', 'Zombie'],
])('should create a new character with %s valid name and %s type', (name, type) => {
  const character = new Character(name, type);
  expect(character).toBeInstanceOf(Character);
});

test('should lower the health level to 0 and check the error output of the level up method', () => {
  const character = new Character('Bow', 'Bowman');
  character.damage(60);
  expect(character.health).toBe(55);
  character.damage(240);
  expect(character.health).toBe(0);
  expect(() => character.levelUp()).toThrow('Нельзя повысить левел умершего');
});

test('should increase the level and update the attack, defence, and health values when leveling up', () => {
  const character = new Character('Mage', 'Magician');
  character.levelUp();
  expect(character.level).toEqual(2);
  expect(character.attack).toEqual(12);
  expect(character.defence).toEqual(48);
  expect(character.health).toEqual(100);
});
