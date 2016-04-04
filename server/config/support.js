import ApiClient from '../../src/helpers/ApiClient';

export default (server) => {
  server.post('/support', (req, res) => {
    const client = new ApiClient(req);
    console.log(req.body);
    client.post('https://quran.zendesk.com/api/v2/tickets.json', {
      data: JSON.stringify({
        ticket: req.body
      }),
      auth: ['mmahalwy@gmail.com/token', 'aGGdpbEgkcKgpGscrqq8QU6z8wsdrlrTCKWHMJoz']
    }).then(response => {
      res.send(response);
    }).catch(err => res.send(err));
  });
}
