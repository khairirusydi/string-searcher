const { getAllFiles, searchFileForKeyword } = require('../index');
const fs = require('fs');
const path = require('path');

describe('getAllFiles', () => {
  it('should return an array of files', () => {
    const expected = [
      __dirname + '/mock/somedir/somemodule/somefile.js',
      __dirname + '/mock/somedir/somemodule/someotherfile.js',
      __dirname + '/mock/somedir2/.DS_Store',
      __dirname + '/mock/somedir2/anotherdir/index.js',
      __dirname + '/mock/somedir2/anotherdir/yet_another_dir/index.js',
      __dirname + '/mock/somedir2/index.js',
      __dirname + '/mock/somedir3/another_file.js'
    ];
    const result = getAllFiles(path.resolve(__dirname, 'mock'));
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});

describe('searchFileForKeyword', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should expect console.log to be called if keyword is found', () => {
    const mockFileWithKeyword = '// TODO \n Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    const logSpy = jest.spyOn(console, 'log');
    jest.spyOn(fs, 'readFile').mockImplementation((path, callback) => callback(null, mockFileWithKeyword));

    searchFileForKeyword('/path', 'TODO');
    expect(logSpy).toHaveBeenCalledWith('/path');
  });

  it('should not expect console.log if no errors and keyword is not found', () => {
    const mockFileWithOutKeyword = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    const logSpy = jest.spyOn(console, 'log');
    jest.spyOn(fs, 'readFile').mockImplementation((path, callback) => callback(null, mockFileWithOutKeyword));

    searchFileForKeyword('/path', 'TODO');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should not expect console.log if no errors and keyword casing does not match', () => {
    const mockFileWithOutKeyword = '// todo \n Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    const logSpy = jest.spyOn(console, 'log');
    jest.spyOn(fs, 'readFile').mockImplementation((path, callback) => callback(null, mockFileWithOutKeyword));

    searchFileForKeyword('/path', 'TODO');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should throw error when failed to read file', () => {
    const errorMsg = new Error('read file failed');
    const logSpy = jest.spyOn(console, 'log');
    jest.spyOn(fs, 'readFile').mockImplementation((path, callback) => callback(errorMsg, null));

    expect(() => searchFileForKeyword('/path', 'TODO').toThrowError(mError));
    expect(logSpy).not.toHaveBeenCalled();
  });
});
