import { Logger, ELoglevel, EType } from "../src/index";

let logger = new Logger({
    baseComment: "serverTest",
    loglvl: ELoglevel.DEBUG,
    transports: [
        {
            showBaseComment: true,
            showData: true,
            showLoglevel: true,
            type: EType.console
        }, {
            showBaseComment: true,
            showData: true,
            showLoglevel: true,
            type: EType.filesystem
        }
    ]
});

logger.trash("trash");

logger.debug("debug");

logger.info("info");

logger.warn("warn");

logger.error("error");