import { UppercaseTextPipe } from './uppercase-text.pipe';

describe('UppercaseTextPipe', () => {
  it('create an instance', () => {
    const pipe = new UppercaseTextPipe();
    expect(pipe).toBeTruthy();
  });
});
