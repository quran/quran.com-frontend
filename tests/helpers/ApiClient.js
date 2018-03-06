import ApiClient from '../../src/helpers/ApiClient';

describe('ApiClient', () => {
  it('should be a call', () => {
    const client = new ApiClient();

    expect(client).toBeInstanceOf(ApiClient);
  });

  it('should have the get method', () => {
    const client = new ApiClient();

    expect(client.get).toBeTruthy();
  });
});
