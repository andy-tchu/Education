import {ActiveParamsUtils} from "./active-params.utils";

describe('active-params.util', () => {

  it('should change type string to type array', () => {
    const result = ActiveParamsUtils.processParams({
      categories: 'smm'
    });
    expect(result.categories).toBeInstanceOf(Array);
  });

  it('should change page string to int', () => {
    const result = ActiveParamsUtils.processParams({
      page: '2',
    });
    expect(result.page).toBe(2);
  });

  it('should change page string to array', () => {
    const result = ActiveParamsUtils.processParams({
      categories: 'smm',
      page: '2',
    });
    expect(result).toEqual({
      categories: ['smm'],
      page: 2,
    });
  });

  it('should change page string to int', () => {
    const result: any = ActiveParamsUtils.processParams({
      pages: '2',
    });
    expect(result.pages).toBeUndefined();
  });

});
