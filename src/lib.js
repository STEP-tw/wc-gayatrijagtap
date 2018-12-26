const { SPACE, NEW_LINE, EMPTY_STRING, TAB } = require('./constants');

const countNewLines = (text) => text.split(NEW_LINE).length - 1;

const countBytes = (text) => text.split(EMPTY_STRING).length;

const splitByWhiteSpace = (text) => text.split(NEW_LINE).join(SPACE).split(SPACE);

const countWords = (words) => words.filter(word => word != false).length;

const wc = function (file, fs) {
    let content = fs.readFileSync(file, 'utf8');
    let lineCount = countNewLines(content);
    let byteCount = countBytes(content);
    let words = splitByWhiteSpace(content);
    let wordCount = countWords(words);
    let output = ['', lineCount, wordCount, byteCount].join(TAB) + SPACE + file;
    return output;
}
module.exports = { wc };