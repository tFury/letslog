//#region
import * as chai from "chai";
import { Logger } from "../src/index";
import { ELoglevel, ETransportType } from "../src/utils/enums";
import { readFileSync, unlinkSync } from "fs";
import * as os from "os";
//#endregion

describe("checks the Logger with no additional input while declaration", () => {
    let logger = new Logger();

    describe("logger.info(\"test\")", () => {
        it("should return \"INFO - test\"", (done) => {
            chai.expect(logger.info("test")).to.equal("INFO - test");
            done();
        });
    });
    describe("logger.debug(\"test\")", () => {
        it("should return \"DEBUG - test\"", (done) => {
            chai.expect(logger.debug("test")).to.equal("DEBUG - test");
            done();
        });
    });
    describe("logger.error(\"test\")", () => {
        it("should return \"ERROR - test\"", (done) => {
            chai.expect(logger.error("test")).to.equal("ERROR - test");
            done();
        });
    });
    describe("logger.trace(\"test\")", () => {
        it("should return \"TRACE - test\"", (done) => {
            chai.expect(logger.trace("test")).to.equal("TRACE - test");
            done();
        });
    });
    describe("logger.warn(\"test\")", () => {
        it("should return \"WARN - test\"", (done) => {
            chai.expect(logger.warn("test")).to.equal("WARN - test");
            done();
        });
    });

});

describe("checks the Logger with baseComment, loglevel, type, showBaseComment, showDate, showLoglevel", () => {
    let logger = new Logger({
        transports: [
            {
                baseComment: "index.ts",
                loglvl: ELoglevel.INFO,
                type: ETransportType.console,
                showBaseComment: true,
                showDate: true,
                showLoglevel: true
            }
        ]
    });

    describe("logger.info(\"test\")", () => {
        it(`should return \"${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - INFO - index.ts - test\"`, (done) => {
            chai.expect(logger.info("test"))
            .to.equal(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - INFO - index.ts - test`);
            done();
        });
    });

});

describe("check if logger logs to fs - 1", () => {


    let logger = new Logger({
        transports: [
            {
                baseComment: "index.ts",
                loglvl: ELoglevel.INFO,
                type: ETransportType.filesystem,
                showBaseComment: true,
                showDate: true,
                showLoglevel: true
            }
        ]
    })

    describe("logger.info(\"test\")", () => {

        const string = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - INFO - index.ts - test${os.EOL}`;
        logger.info("test")

        it(`should return ${string}`, (done) => {

            const output = readFileSync(process.env.appdata?`${process.env.appdata}\\tf_log\\log.log`:`${os.homedir()}/tf_log/log.log`, "utf8");

            unlinkSync(process.env.appdata?`${process.env.appdata}\\tf_log\\log.log`:`${os.homedir()}/tf_log/log.log`);

            chai.expect(output)
            .to.equal(string);
            done();
        });
    });

})


describe("check if logger logs to fs - 2", () => {
    let logger = new Logger({
        transports: [
            {
                baseComment: "index.ts",
                loglvl: ELoglevel.INFO,
                logpath: "%appdata%/tf_log/testfolder",
                logFileName: "testing",
                type: ETransportType.filesystem,
                showBaseComment: true,
                showDate: true,
                showLoglevel: true
            }
        ]
    })

    describe("logger.info(\"test\")", () => {

        const string = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - INFO - index.ts - test${os.EOL}`;
        logger.info("test")

        it(`should return ${string}`, (done) => {

            const output = readFileSync(process.env.appdata?`${process.env.appdata}\\tf_log\\testfolder\\testing.log`:`${os.homedir()}/tf_log/testfolder/testing.log`, "utf8");

            unlinkSync(process.env.appdata?`${process.env.appdata}\\tf_log\\testfolder\\testing.log`:`${os.homedir()}/tf_log/testfolder/testing.log`);

            chai.expect(output)
            .to.equal(string);
            done();
        });
    });

})


describe("line break test", () => {
    let logger = new Logger({
        transports: [
            {
                baseComment: "index.ts",
                loglvl: ELoglevel.INFO,
                logpath: "%appdata%/tf_log/testfolder",
                logFileName: "testLineBreak",
                type: ETransportType.filesystem,
                showBaseComment: false,
                showDate: false,
                showLoglevel: true
            }
        ]
    })

    describe("read in log after writing several logs", () => {

        const string = `INFO - line 1`;
        logger.info("line 1");
        logger.info("line 2");

        it(`should return "line 1"`, (done) => {

            const output = readFileSync(process.env.appdata?`${process.env.appdata}\\tf_log\\testfolder\\testLineBreak.log`:`${os.homedir()}/tf_log/testfolder/testLineBreak.log`, "utf8");

            const logs = output.split(os.EOL);

            unlinkSync(process.env.appdata?`${process.env.appdata}\\tf_log\\testfolder\\testLineBreak.log`:`${os.homedir()}/tf_log/testfolder/testLineBreak.log`);

            chai.expect(logs[0])
            .to.equal(string);
            done();
        });
    });

})