import { ELoglevel, ETransportType } from "../utils/enums";
import * as os from "os";


export class BaseTransport {
    loglvl: ELoglevel = ELoglevel.WARN;
    showDate: boolean = false;
    showBaseComment: boolean = false;
    showLoglevel: boolean = true;
    baseComment: string = `Default`;

    constructor(baseTransport?: BaseTransport) {
        if (baseTransport) {
            this.baseComment = baseTransport.baseComment;
            this.loglvl = baseTransport.loglvl;
            this.showBaseComment = baseTransport.showBaseComment;
            this.showDate = baseTransport.showDate;
            this.showLoglevel = baseTransport.showLoglevel;
        }
    }
}

export class DefaultConsolTransport extends BaseTransport {
    type: ETransportType = ETransportType.console;

    constructor(baseTransport?: BaseTransport) {
        super(baseTransport);
    }
}

export class DefaultFsTransport extends BaseTransport {
    type: ETransportType = ETransportType.filesystem;


    logpath: string = process.env.appdata?"%appdata%/tf_log":`${os.homedir()}/tf_log`;
    logFileName: string = "log";

    constructor(baseTransport?: BaseTransport) {
        super(baseTransport);
    }
}