const makeStartEndSetArray = (max: number, interval: number) => {
  const startEndArray = [];
  for (let i = 0; i < max; i += interval) {
    const start = i + 1;
    const end = i + interval > max ? max : i + interval;
    startEndArray.push([start, end]);
  }
  return startEndArray;
}

export default makeStartEndSetArray