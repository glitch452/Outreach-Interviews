import {} from 'jasmine';
import { Translation } from '../../src/translate/google-translate';

describe('translation_tests', () => {
  it('empty_obj_test', async () => {
      const result = await Translation.translate({
        source: undefined,
        target: undefined
      });

      expect(result[0]).toBeUndefined();
  });
});

describe('translation_tests_translatePostArray_1', () => {
  it('empty_obj_test_2', async () => {
      const result = await Translation.translate({
        source: undefined,
        target: undefined
      });

      expect(result[0]).toBeUndefined();
  });
});

describe('translation_tests_translatePostArray_2', () => {
  it('translate_test', async () => {
      const result = await Translation.translate({
        source: 'Have a nice day!',
        target: 'fr'
      });

      expect(result[0]).toBeUndefined();
  });
});