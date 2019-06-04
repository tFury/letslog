//#region
import * as chai from "chai";
import { Logger } from "../src/index";
import { ELoglevel, ETransportType } from "../src/utils/enums";
import { readFileSync } from "fs";
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

xdescribe("check if logger logs to fs", () => {
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

        const string = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - INFO - index.ts - test\"`;
        logger.info("test")

        it(`should return ${string}`, (done) => {

            const output = readFileSync(process.env.appdata?`${process.env.appdata}/tf_log/test.log`:"/var/log/tf_log/test.log");


            chai.expect(output)
            .to.equal(string);
            done();
        });
    });

})


describe("check if logger logs to fs", () => {
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

        const string = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - INFO - index.ts - test\"`;
        logger.info("test")

        it(`should return ${string}`, (done) => {

            const output = readFileSync(process.env.appdata?`${process.env.appdata}/tf_log/testing.log`:"/var/log/tf_log/testing.log");


            chai.expect(output)
            .to.equal(string);
            done();
        });
    });

})