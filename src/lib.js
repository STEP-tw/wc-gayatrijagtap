const { SPACE, NEW_LINE, EMPTY_STRING, TAB } = require('./constants');

const countNewLines = (text) => text.split(NEW_LINE).length - 1;

const countBytes = (text) => text.split(EMPTY_STRING).length;

const splitByWhiteSpace = (text) => text.split(NEW_LINE).join(SPACE).split(SPACE);

const countWords = (words) => words.filter(word => word != false).length;

const counter = function (content) {
    let lineCount = countNewLines(content);
    let byteCount = countBytes(content);
    let words = splitByWhiteSpace(content);
    let wordCount = countWords(words);
    return [lineCount, wordCount, byteCount];
}

const formatOutput = function (countArray, file) {
    countArray.unshift(EMPTY_STRING);
    let formatedOutput = countArray.join(TAB) + SPACE + file;
    return formatedOutput;
}

const wc = function (file, fs) {
    let content = fs.readFileSync(file, 'utf8');
    let countArray = counter(content);
    let formatedOutput = formatOutput(countArray, file);
    return formatedOutput;
}
module.exports = { wc };