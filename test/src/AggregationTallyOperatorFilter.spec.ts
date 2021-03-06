import { AggregationTallyOperatorFilter } from '../../src/aggregationTallyOperatorFilter'
import { Cache } from '../../src/structures'
import { AggregationTallyFilter, MirAggregationTallyFilterOperator } from '../../src/types'

describe('AggregationTallyOperatorFilter', () => {
  describe('getJs', () => {
    it('without argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = AggregationTallyFilter.mode

      const cache = new Cache()
      const operator = new AggregationTallyOperatorFilter(cache, mirOperator, 0)

      const result = operator.getJs()
      const expected = 'Witnet.Types.FILTERS.mode'

      expect(result).toStrictEqual(expected)
    })
    it('with argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = [
        AggregationTallyFilter.deviationAbsolute,
        3,
      ]

      const cache = new Cache()
      const operator = new AggregationTallyOperatorFilter(cache, mirOperator, 0)

      const result = operator.getJs()
      const expected = '[Witnet.Types.FILTERS.deviationAbsolute, 3]'

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMarkup', () => {
    it('without argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = AggregationTallyFilter.mode

      const cache = new Cache()
      const operator = new AggregationTallyOperatorFilter(cache, mirOperator, 0)

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        label: 'mode',
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'deviationAbsolute',
            markupType: 'option',
            outputType: 'filterOutput',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'deviationRelative',
            markupType: 'option',
            outputType: 'filterOutput',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'deviationStandard',
            markupType: 'option',
            outputType: 'filterOutput',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'mode',
            markupType: 'option',
            outputType: 'filterOutput',
          },
        ],
        outputType: 'filterOutput',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'mode',
          description:
            'Discard any result that is different from the mode. Long story short: remove outliers',
          markupType: 'option',
          outputType: 'filterOutput',
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('with argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = [
        AggregationTallyFilter.deviationAbsolute,
        3,
      ]

      const cache = new Cache()
      const operator = new AggregationTallyOperatorFilter(cache, mirOperator, 0)

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        label: 'deviationAbsolute',
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'deviationAbsolute',
            markupType: 'option',
            outputType: 'filterOutput',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'deviationRelative',
            markupType: 'option',
            outputType: 'filterOutput',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'deviationStandard',
            markupType: 'option',
            outputType: 'filterOutput',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'mode',
            markupType: 'option',
            outputType: 'filterOutput',
          },
        ],
        outputType: 'filterOutput',
        scriptId: 0,
        selected: {
          description:
            'Discard any result that is more than by times the absolute deviation times away from the average. Long story short: remove outliers',
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 2,
              label: 'by',
              markupType: 'input',
              value: 3,
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'deviationAbsolute',
          markupType: 'option',
          outputType: 'filterOutput',
        },
      }

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMir', () => {
    it('without argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = AggregationTallyFilter.mode

      const cache = new Cache()
      const operator = new AggregationTallyOperatorFilter(cache, mirOperator, 0)

      const result = operator.getMir()

      expect(result).toStrictEqual(mirOperator)
    })

    it('with argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = [
        AggregationTallyFilter.deviationAbsolute,
        3,
      ]

      const cache = new Cache()
      const operator = new AggregationTallyOperatorFilter(cache, mirOperator, 0)

      const result = operator.getMir()
      expect(result).toStrictEqual(mirOperator)
    })
  })

  describe('update', () => {
    it('without argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = AggregationTallyFilter.mode

      const cache = new Cache()
      const operator = new AggregationTallyOperatorFilter(cache, mirOperator, 0)

      operator.update(AggregationTallyFilter.deviationAbsolute)

      expect(operator.code).toStrictEqual(AggregationTallyFilter.deviationAbsolute)
      expect(operator.argument).toBeTruthy()
    })

    it('with argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = [
        AggregationTallyFilter.deviationAbsolute,
        3,
      ]

      const cache = new Cache()
      const operator = new AggregationTallyOperatorFilter(cache, mirOperator, 0)

      operator.update(AggregationTallyFilter.deviationStandard)

      expect(operator.code).toStrictEqual(AggregationTallyFilter.deviationStandard)
      expect(operator.argument).toBeTruthy()
    })
  })
})
