import request from 'request';

export function index(req, res) {
  request('http://api.quran.com:3000/surahs', (error, response, body) => {
    res.status(200).json(JSON.parse(body));
  });
}
