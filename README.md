# string-searcher
string-searcher is a node-cli app that when executed in a directory, produces a list 
of all files (using their absolute paths) containing a specified keyword in them. 
The files can be in the immediate directory, or sub-directories. The keyword by default 
is "TODO" and is case-sensitive.

## Installation
1. clone this repository:
```
git clone https://github.com/khairirusydi/string-searcher.git
```
2. cd into project directory:
```
cd string-searcher
```
3. Install package globally:
```
npm install -g .
```

## Usage
To run, cd into desired directory and run the following command where optionally [keyword] is 
the text string you are searching for:
```
string-searcher [keyword]
```

## Example
Given the following directory structure:
```
/path/to/your/dir
  - somedir
    - somemodule
      - somefile.js
      - someotherfile.js
  - somedir2
    - anotherdir
      - yet_another_dir
        - index.js
      - index.js
    - index.js
  - somedir3
    - another_file.js
```

Assuming you run the application `string-searcher TODO` at `/path/to/your/dir`, and 
assuming all of the files contains the text string `"TODO"`, the application should output:

```
/path/to/your/dir/somedir/somemodule/somefile.js
/path/to/your/dir/somedir/somemodule/someotherfile.js
/path/to/your/dir/somedir2/anotherdir/yet_another_dir/index.js
/path/to/your/dir/somedir2/anotherdir/index.js
/path/to/your/dir/somedir2/index.js
/path/to/your/dir/somedir3/another_file.js
```

## Tests

### Manual Test
cd into `string-searcher/test/mock` and run `string-searcher`. The following output should appear:
```
your-dir/string-searcher/test/mock/somedir2/anotherdir/yet_another_dir/index.js
your-dir/string-searcher/test/mock/somedir3/another_file.js
```

### Test using Jest
1. cd into the project directory and run `npm install` to install dependencies.
2. run `npm test` to run the Jest tests.
