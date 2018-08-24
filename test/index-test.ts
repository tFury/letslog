//#region
import * as chai from "chai";
import { Logger } from "../src/index";
import * as chaiAsPromised from "chai-as-promised";
import { ELoglevel, ETransportType } from "../src/utils/enums";
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