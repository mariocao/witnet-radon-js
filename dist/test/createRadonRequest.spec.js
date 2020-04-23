"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var radon_1 = require("../src/radon");
var types_1 = require("../src/types");
describe('Radon', function () {
    it('deletes operator when it doesn´t match the output type', function () {
        var mir = {
            timelock: 0,
            retrieve: [
                {
                    kind: 'HTTP-GET',
                    url: 'source_1',
                    script: [],
                },
            ],
            aggregate: {
                filters: [],
                reducer: types_1.AggregationTallyReducer.mode,
            },
            tally: {
                filters: [],
                reducer: types_1.AggregationTallyReducer.mode,
            },
        };
        var radon = new radon_1.Radon(mir);
        expect(radon.getMarkup().retrieve[0].script).toStrictEqual([]);
        radon.addOperator(2);
        expect(radon.getMarkup().retrieve[0].script[0].options[7].label).toBe('StringParseJsonMap');
        // Update operator with stringparsejsonmap option
        radon.update(7, 'StringParseJsonMap');
        // Add operator in first source
        radon.addOperator(2);
        expect(radon.getMarkup().retrieve[0].script[1].options[1].label).toBe('MapGetArray');
        radon.update(8, 'MapGetBoolean');
        radon.addOperator(2);
        radon.update(10, 'BooleanNegate');
        expect(radon.getMarkup().retrieve[0].script[2].label).toBe('negate');
        radon.update(8, 'MapValuesBytes');
        expect(radon.getMarkup().retrieve[0].script[2]).toBe(undefined);
    });
    it('addOperator', function () {
        var mir = {
            timelock: 0,
            retrieve: [
                {
                    kind: 'HTTP-GET',
                    url: 'source_1',
                    script: [],
                },
            ],
            aggregate: {
                filters: [],
                reducer: types_1.AggregationTallyReducer.mode,
            },
            tally: {
                filters: [],
                reducer: types_1.AggregationTallyReducer.mode,
            },
        };
        var radon = new radon_1.Radon(mir);
        expect(radon.getMarkup().retrieve[0].script).toStrictEqual([]);
        radon.addOperator(2);
        expect(radon.getMarkup().retrieve[0].script[0].options[7].label).toBe('StringParseJsonMap');
        // Update operator with stringparsejsonmap option
        radon.update(7, 'StringParseJsonMap');
        // Add operator in first source
        radon.addOperator(2);
        expect(radon.getMarkup().retrieve[0].script[1].options[1].label).toBe('MapGetArray');
        radon.update(8, 'MapGetArray');
        // Update the input argument with a value
        radon.update(9, 'dataseries');
        expect(radon.getMarkup().retrieve[0].script[1].selected.arguments[0].value).toBe('dataseries');
        // Push new operator
        radon.addOperator(2);
        expect(radon.getMarkup().retrieve[0].script[2].options.find(function (option) { return option.label === 'ArrayGetMap'; })).toBeTruthy();
        // select ArrayGetMap option
        radon.update(10, 'ArrayGetMap');
        expect(radon.getMarkup().retrieve[0].script[2].selected.label).toBe('getMap');
        // Write argument value
        radon.update(11, '0');
        expect(radon.getMarkup().retrieve[0].script[2].selected.arguments[0].value).toBe('0');
        // Push new operator
        radon.addOperator(2);
        expect(radon.getMarkup().retrieve[0].script[3].options.find(function (option) { return option.label === 'MapGetMap'; })).toBeTruthy();
        // Select MapGetMap option
        radon.update(12, 'MapGetMap');
        expect(radon.getMarkup().retrieve[0].script[3].selected.label).toBe('getMap');
        // Write argument value
        radon.update(13, 'temp2m');
        expect(radon.getMarkup().retrieve[0].script[3].selected.arguments[0].value).toBe('temp2m');
        // Push new operator
        radon.addOperator(2);
        expect(radon.getMarkup().retrieve[0].script[4].options.find(function (option) { return option.label === 'MapGetFloat'; })).toBeTruthy();
        // Select MapGetFloat option
        radon.update(14, 'MapGetFloat');
        expect(radon.getMarkup().retrieve[0].script[4].selected.label).toBe('getFloat');
        // Write argument value
        radon.update(15, 'max');
        expect(radon.getMarkup().retrieve[0].script[4].selected.arguments[0].value).toBe('max');
    });
});
