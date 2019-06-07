import EventHub from '../src';

describe('FakeTest', () => {
  it('returns true', () => {
    const hub = new EventHub();
    expect(true).toBe(true);
  });
});