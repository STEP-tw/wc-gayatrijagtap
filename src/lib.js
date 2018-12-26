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
        options = userArgs[0].slice(1).split(EMPTY_STRING);
        options = getOrderedOptions(options);
        fileName = userArgs[1];
    }
    return { options, fileName };
}

const getOrderedOptions = function (options) {
    let order = new Object;
    order['l'] = 1;
    order['w'] = 2;
    order['c'] = 3;
    return orderOptions(order, options);
}

const orderOptions = function (order, options) {
    optionsWithOrder = options.map(option => [order[option], option]);
    optionsWithOrder.sort();
    orderedOptions = optionsWithOrder.map(optionWithOrder => optionWithOrder[1]);
    return orderedOptions;
}

const wc = function (userArgs, fs) {
    let { options, fileName } = parseInput(userArgs);
    let content = fs.readFileSync(fileName, 'utf8');
    let countArray = counter(content, options);
    let formatedOutput = formatOutput(countArray, fileName);
    return formatedOutput;
}
module.exports = { wc };