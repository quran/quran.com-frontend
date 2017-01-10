import superagent from 'superagent';

export default (server) => {
  server.post('/support', (req, res) => {
    superagent
      .post('https://quran.zendesk.com/api/v2/tickets.json')
      .send({ ticket: req.body })
      .auth('mmahalwy@gmail.com/token', 'aGGdpbEgkcKgpGscrqq8QU6z8wsdrlrTCKWHMJoz')
      .end((err, { body }) => {
        res.send(body || err);
      });
  });
};
