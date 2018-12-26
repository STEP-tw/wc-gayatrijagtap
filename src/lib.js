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
    let files = userArgs;
    if (userArgs[0].startsWith('-')) {
        let { extractedOptions, fileIndex } = extractOptions(userArgs);
        options = getOrderedOptions(extractedOptions);
        files = userArgs.slice(fileIndex);
    }
    return { options, files };
}

const extractOptions = function (userArgs) {
    let optionCandidates = userArgs.filter(arg => arg.startsWith('-'));
    let fileIndex = optionCandidates.length;
    optionCandidates = optionCandidates.map(option => option.slice(1));
    extractedOptions = optionCandidates.join(EMPTY_STRING).split(EMPTY_STRING);
    return { extractedOptions, fileIndex };
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

const generateSingleFileCount = function (file, options, readFileSync) {
    let fileContent = readFileSync(file, 'utf8');
    let countArray = counter(fileContent, options);
    let formatedOutput = formatOutput(countArray, file);
    return formatedOutput;
}

const wc = function (userArgs, fs) {
    let { options, files } = parseInput(userArgs);
    let formatedOutput = files.map(file => generateSingleFileCount(file, options, fs.readFileSync));
    formatedOutput = formatedOutput.join('\n');
    return formatedOutput;
}
module.exports = { wc };