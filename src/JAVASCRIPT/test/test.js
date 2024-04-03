function decodedValue(...args) {
  let resistorColorValue = {
    Black: 0,
    Brown: 1,
    Red: 2,
    Orange: 3,
    Yellow: 4,
    Green: 5,
    Blue: 6,
    Violet: 7,
    Grey: 8,
    White: 9,
  };

  let tab = [];
  tab.push(resistorColorValue[arguments[0]]);
  tab.push(resistorColorValue[arguments[1]]);

  return tab.join("");
}

console.log("decoded value: " + decodedValue("Black", "Red", "Blue", "Gray"));
