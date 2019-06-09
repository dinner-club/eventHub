import EventHub from '../src';

describe('FakeTest', () => {
  test('smoke test', () => {
    const hub = new EventHub();
    expect(hub).toBeInstanceOf(EventHub);
  });
});