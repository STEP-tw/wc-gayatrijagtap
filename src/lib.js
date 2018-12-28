const { UNICODE, NEW_LINE, EMPTY_STRING } = require('./constants');

const {
    splitByWhiteSpace,
    arrayAddition,
    generateList
} = require('./util');

const { parseInput } = require('./parser');

const { getJustifiedOutput } = require('./formatter');

const { missingFileError } = require('./errorHandler');

const countNewLines = (text) => text
    .split(NEW_LINE)
    .length - 1;

const countBytes = (text) => text
    .split(EMPTY_STRING)
    .length;

const countWords = (text) => splitByWhiteSpace(text)
    .filter(word => word != false)
    .length;

const count = {
    'line': countNewLines,
    'byte': countBytes,
    'word': countWords
}

const counter = (fileContent, options) => options
    .map(option => count[option](fileContent));

const generateFileCount = function (options, fs, file) {  //generateFileCount
    if (!fs.existsSync(file)) {
        return { error: missingFileError(file) };
    }
    let fileContent = fs.readFileSync(file, UNICODE);
    let countList = counter(fileContent, options);
    return { countList, file };  //countList
}

const getFilesCount = function (files, options, fs) {  //getFilesCount
    return files.map(generateFileCount.bind(null, options, fs));
}

const formatOutput = function (files, options, fs) {  //formatOutput
    let countWithFileNames = getFilesCount(files, options, fs);
    if (files.length > 1) {
        let totalCount = getTotalCount(options.length, getValidCountLists(countWithFileNames));
        countWithFileNames.push(totalCount);
    }
    return getJustifiedOutput(countWithFileNames);  //getJustifiedOutput
}

const getValidCountLists = (countWithFileNames) => countWithFileNames  //getValidCountLists
    .filter(countWithFileName => !countWithFileName.error);

const extractCountList = (countWithFileNames) => countWithFileNames  //extractCountLists
    .map(countWithFileName => countWithFileName.countList);

const getTotalCount = function (noOfOptions, countWithFileNames) {  //countTotal
    let countList = extractCountList(countWithFileNames);
    if (countList.length < 1) {
        return getMissingFilesTotalCount(noOfOptions);
    }
    countList = arrayAddition(countList);
    return { countList, file: 'total' };
}

const getMissingFilesTotalCount = function (noOfOptions) {  //countMissingFilesTotal
    return { countList: generateList(noOfOptions, 0), file: 'total' };
}

const wc = function (userArgs, fs) {
    let { options, files, optionError } = parseInput(userArgs);
    return optionError || formatOutput(files, options, fs).join('\n')
}

module.exports = { wc };