import {getAggregatedDate} from '../businessLogic.utils';
import {transactionsMock1, transactionsMock2} from '../__mocks__/transactions.mock';

describe('businessLogic.utils', () => {
  describe('getAggregatedDate', () => {
    it('should return empty array, on getting undefined', () => {
      // Act
      const result = getAggregatedDate(undefined as any); // In UT I use 'any' in order to force invalid inputs

      // Assert
      expect(result.length).toBe(0);
    });
    it('should return array length 2, on getting valid input with transactions from 2 days', () => {
      // Act
      const result = getAggregatedDate(transactionsMock1);

      // Assert
      expect(result.length).toBe(2);
    });

    it('should return array length 4, on getting valid input with transactions from 4 days', () => {
      // Act
      const result = getAggregatedDate(transactionsMock2);

      // Assert
      expect(result.length).toBe(4);
    });
  });
});
