import { ClientLogger, ELoglevel, EType } from "../src/index";

let logger = new ClientLogger({
    baseComment: "serverTest",
    loglvl: ELoglevel.DEBUG,
    transports: [
        {
            showBaseComment: true,
            showData: true,
            showLoglevel: true,
            type: EType.console
        }
    ]
});

logger.trash("trash");

logger.debug("debug");

logger.info("info");

logger.warn("warn");

logger.error("error");