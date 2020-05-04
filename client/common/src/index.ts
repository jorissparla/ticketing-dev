interface Color {
  red: number;
  green: number;
  blue: number;
}

const color: Color = {
  red: 10,
  green: 11,
  blue: 12,
};
console.log(color);

function logger(txt: string) {
  console.log(txt);
}

export default color;
