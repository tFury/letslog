# LetsLog

A simple to use logger.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/338f5ab29cdf45e09d655dd2e2c0d89b)](https://app.codacy.com/app/thomas_haenig/letslog?utm_source=github.com&utm_medium=referral&utm_content=tFury/letslog&utm_campaign=badger)
[![TravisCI](https://travis-ci.org/tFury/letslog.svg?branch=master)](https://travis-ci.org/tFury/letslog)
[![npm version](https://badge.fury.io/js/letslog.svg)](https://www.npmjs.com/package/letslog)
[![Greenkeeper badge](https://badges.greenkeeper.io/tFury/letslog.svg)](https://greenkeeper.io/)

## Example 

```javascript
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
```
