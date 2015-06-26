let url;
if (process.env.NODE_ENV === "production" && process.env.VERSION === "old") {
  url = 'http://45.55.158.85/';
}
else if (process.env.NODE_ENV === "production") {
  url = 'http://api:3000/';
}
else {
  url = 'http://45.55.158.85/';
}
console.log(url);

export default  {
  // url: 'http://localhost:3000/',
  // url: 'http://45.55.158.85/',
  url: url
};
