import {getAggregatedDate} from '../businessLogic.utils';

describe('businessLogic.utils', () => {
  describe('getAggregatedDate', () => {
    it('should return empty array, on getting undefined', () => {
      // Act
      const result = getAggregatedDate(undefined as any);// In UT I use 'any' in order to force invalid inputs

      // Assert
      expect(result.length).toBe(0);
    });
  });
});
