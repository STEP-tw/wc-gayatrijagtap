const { SPACE, NEW_LINE, EMPTY_STRING, TAB } = require('./constants');

const countNewLines = (text) => text
    .split(NEW_LINE)
    .length - 1;

const countBytes = (text) => text
    .split(EMPTY_STRING)
    .length;

const splitByWhiteSpace = (text) => text
    .split(NEW_LINE)
    .join(SPACE)
    .split(SPACE);

const countWords = (text) => splitByWhiteSpace(text)
    .filter(word => word != false)
    .length;

const counter = function (content, options) {
    let optionCount = new Object;
    optionCount['l'] = countNewLines(content);
    optionCount['c'] = countBytes(content);
    optionCount['w'] = countWords(content);
    return options.map(option => optionCount[option]);
}

const formatOutput = function (countArray, fileName) {
    countArray.unshift(EMPTY_STRING);
    let formatedOutput = countArray.join(TAB) + SPACE + fileName;
    return formatedOutput;
}

const parseInput = function (userArgs) {
    let options = ['l', 'w', 'c'];
    let fileName = userArgs[0];
    if (fileName.startsWith('-')) {
        options = [userArgs[0].slice(1)];
        fileName = userArgs[1];
    }
    return { options, fileName };
}

const wc = function (userArgs, fs) {
    let { options, fileName } = parseInput(userArgs);
    let content = fs.readFileSync(fileName, 'utf8');
    let countArray = counter(content, options);
    let formatedOutput = formatOutput(countArray, fileName);
    return formatedOutput;
}
module.exports = { wc };