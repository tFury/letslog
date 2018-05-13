//#region
import * as chai from "chai";
import { Logger } from "../../src/index";
import * as chaiAsPromised from "chai-as-promised";
import { ELoglevel, ETransportType } from "../../src/utils/enums";
//#endregion

describe("checks the Logger for no input", () => {
    let logger = new Logger();

    describe("test logger.info", () => {
        it("should return \"INFO - test\"", (done) => {
            chai.expect(logger.info("test")).to.equal("INFO - test");
            done();
        });
    });
});