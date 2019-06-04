# LetsLog

A simple to use logger.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/338f5ab29cdf45e09d655dd2e2c0d89b)](https://app.codacy.com/app/thomas_haenig/letslog?utm_source=github.com&utm_medium=referral&utm_content=tFury/letslog&utm_campaign=badger)
[![TravisCI](https://travis-ci.org/tFury/letslog.svg?branch=master)](https://travis-ci.org/tFury/letslog)
[![npm version](https://badge.fury.io/js/letslog.svg)](https://www.npmjs.com/package/letslog)
[![npm](https://img.shields.io/npm/dt/letslog.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/letslog)
[![Greenkeeper badge](https://badges.greenkeeper.io/tFury/letslog.svg)](https://greenkeeper.io/)

## Installation
npm i letslog

## Example 

### example for fast use
```javascript
import { Logger } from "../src/index";
const logger = new Logger();

logger.warn("first output");
```

### example with transports
```javascript
import { Logger, ELoglevel, ETransportType } from "../src/index";

const logger = new Logger({
    baseComment: "RepositoryService",
    loglvl: ELoglevel.DEBUG,
    transports: [
        {
            showBaseComment: true,
            showDate: true,
            showLoglevel: true,
            type: ETransportType.console
        }
    ]
});


logger.warn("first output");
```

### example with transports for console and fs
```javascript
import { Logger, ELoglevel, ETransportType } from "../src/index";

const logger = new Logger({
    baseComment: "RepositoryService",
    loglvl: ELoglevel.DEBUG,
    transports: [
        {
            showBaseComment: true,
            showDate: true,
            showLoglevel: true,
            type: ETransportType.console
        },
        {
            baseComment: "index.ts",
            loglvl: ELoglevel.INFO,
            logpath: "%appdata%/testfolder",
            logFileName: "testing",
            type: ETransportType.filesystem,
            showBaseComment: true,
            showDate: true,
            showLoglevel: true
        }
    ]
});


logger.info("first output");
```


## Configuration Options
on the toplevel you can set the following properties. When using top level properties you do not need to add thes Properties in the transports. When you set a Property in the transport, it will override the top level Propertie

### options for top level


| options       | Type              | Default Values    | Mandatory     |
|---------------|-------------------|-------------------|---------------|
| base Comment  | string            | none              | optional      |
| loglvl        | ELoglevel/number  | WARN              | optional      |
| transport     | ITransport[]      | none              | optional      |

### options for transports

| options           | Type                  | Default Values    | Mandatory     |
|-------------------|-----------------------|-------------------|---------------|
| baseComment       | string                | none              | optional      |
| loglvl            | ELoglevel/number      | WARN              | optional      |
| showBaseComment   | boolean               | false             | optional      |
| showDate          | boolean               | false             | optional      |
| showLoglevel      | boolean               | true              | optional      |
| type              | ETransportType/number | console           | optional      |
| logpath           | string                | none              | optional      |
| logFileName       | string                | log               | optional      |

### types for ELoglevel

| type  | value |
|-------|-------|
| TRACE | 0     |
| DEBUG | 1     |
| INFO  | 2     |
| WARN  | 3     |
| ERROR | 4     |

### types for ETransportType

| type          | value |
|---------------|-------|
| console       | 0     |
| filesystem    | 1     |