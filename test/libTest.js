const assert = require('assert');
const { wc } = require('../src/lib');

const files = {
    file: 'a\nb\nc d\ne\n\nf'
};

const readFileSync = file => files[file];

const fs = { readFileSync };

describe('wc', function () {
    it('should return line,word and byte count and file name for single file', function () {
        let actualOutput = wc(['file'], fs);
        let expectedOutput = '\t5\t6\t12' + ' file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return line count for a single file when -l option is specified', function () {
        let actualOutput = wc(['-l', 'file'], fs);
        let expectedOutput = '\t5 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
})