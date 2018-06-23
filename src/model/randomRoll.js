export default (topNumber) =>{
  const random = Math.random() * topNumber;
  return Math.ceil(random) || 1;
};