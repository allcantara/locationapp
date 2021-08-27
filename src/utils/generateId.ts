const generateID = () => {
  const size = 6;
  const randomized = Math.ceil(Math.random() * Math.pow(10, size));
  return `${randomized}`;
};

export default generateID;
