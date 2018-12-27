const assert = require('assert');
const { wc } = require('../src/lib');

const files = {
    file: 'a\nb\nc d\ne\n\nf',
    file2: '1\n2\n3\n4\n5'
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
    it('should return byte count for a single file when -c option is specified', function () {
        let actualOutput = wc(['-c', 'file'], fs);
        let expectedOutput = '\t12 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return word count for a single file when -w option is specified', function () {
        let actualOutput = wc(['-w', 'file'], fs);
        let expectedOutput = '\t6 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return line and word count for a single file when -lw option is specified', function () {
        let actualOutput = wc(['-lw', 'file'], fs);
        let expectedOutput = '\t5\t6 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return byte and word count for a single file when -cw option is specified', function () {
        let actualOutput = wc(['-cw', 'file'], fs);
        let expectedOutput = '\t6\t12 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return line and byte count for a single file when -lc option is specified', function () {
        let actualOutput = wc(['-lc', 'file'], fs);
        let expectedOutput = '\t5\t12 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return line and byte count when the options are specified seperately for single file', function () {
        let actualOutput = wc(['-l', '-c', 'file'], fs);
        let expectedOutput = '\t5\t12 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return byte and word count when the options are specified seperately for single file', function () {
        let actualOutput = wc(['-c', '-w', 'file'], fs);
        let expectedOutput = '\t6\t12 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return byte,line and word count when the options are specified seperately for single file', function () {
        let actualOutput = wc(['-c', '-w', '-l', 'file'], fs);
        let expectedOutput = '\t5\t6\t12 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return word,byte and line count when the options are specified seperately for single file', function () {
        let actualOutput = wc(['-w', '-c', '-l', 'file'], fs);
        let expectedOutput = '\t5\t6\t12 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return byte count for multiple files', function () {
        let actualOutput = wc(['-c', 'file', 'file2'], fs);
        let expectedOutput = '\t12 file\n\t9 file2\n\t21 total';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return word and line count for multiple files when options are given seperately', function () {
        let actualOutput = wc(['-w', '-l', 'file', 'file2'], fs);
        let expectedOutput = '\t5\t6 file\n\t4\t5 file2\n\t9\t11 total';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return byte and line count for multiple files when options are given together', function () {
        let actualOutput = wc(['-cl', 'file', 'file2'], fs);
        let expectedOutput = '\t5\t12 file\n\t4\t9 file2\n\t9\t21 total';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return word count only once when option is repeatatively given for single file', function () {
        let actualOutput = wc(['-ww', 'file'], fs);
        let expectedOutput = '\t6 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return byte and line count only once when options are given repeatatively for single file', function () {
        let actualOutput = wc(['-cl', '-ll', 'file'], fs);
        let expectedOutput = '\t5\t12 file';
        assert.deepEqual(actualOutput, expectedOutput);
    });
})