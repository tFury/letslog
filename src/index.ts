import * as fs from "fs";

export class Logger implements ILogger {

    private config: IClientConfig;

    constructor(config?: IClientConfig) {
        this.config = this.setConfig(config);
    }

    //#region public functions
    public trash(...args : any[]): void {
        let output = this.configureOutput(args, ELoglevel.TRACE, this.config.transports[0]);
        this.writeLog(output, ELoglevel.TRACE, EConsoleType.log);
    }

    public debug(...args : any[]): void {
        let output = this.configureOutput(args, ELoglevel.DEBUG, this.config.transports[0]);
        this.writeLog(output, ELoglevel.DEBUG, EConsoleType.log);
    }

    public info(...args : any[]): void {
        let output = this.configureOutput(args, ELoglevel.INFO, this.config.transports[0]);
        this.writeLog(output, ELoglevel.INFO, EConsoleType.log);
    }

    public warn(...args : any[]): void {
        let output = this.configureOutput(args, ELoglevel.WARN, this.config.transports[0]);
        this.writeLog(output, ELoglevel.WARN, EConsoleType.warn);
    }

    public error(...args : any[]): void {
        let output = this.configureOutput(args, ELoglevel.ERROR, this.config.transports[0]);
        this.writeLog(output, ELoglevel.ERROR, EConsoleType.error);
    }
    //#endregion

    //#region private functions
    private writeLog(input: string, loglevel: number, logType: number): void {

        for (const transport of this.config.transports) {

            if (loglevel >= this.config.loglvl) {
                switch (transport.type) {
                    case EType.filesystem:
                        this.writeTypeFilesystem(input, (transport as ITransportFs).logpath);
                        break;

                    default:
                        this.writeTypeConsole(input, logType);
                        break;
                }
            }
        }
    }

    private writeTypeFilesystem(input: string, path: string): void {

        if (fs.existsSync("")) {
            //
        }

        fs.writeFile(`${process.env.APPDATA}/test.log`, input, (error: any) => {
            console.log("test");
            if (error) {
                console.error(error);
            }
        });
    }

    private writeTypeConsole(input: string, logType: number): void {
        switch (logType) {
            case EConsoleType.warn:
                console.warn(input);
                break;
            case EConsoleType.error:
                console.error(input);
                break;

            default:
                console.log(input);
                break;
        }
    }

    private setConfig(config?: IClientConfig): IClientConfig {
        let defaultConfig: IClientConfig = {
            loglvl: ELoglevel.WARN,
            baseComment: "",
            transports: []
        };

        let defaultTransport: ITransport = {
            showData: true,
            showBaseComment: false,
            showLoglevel: true,
            type: EType.console
        };

        let defaultTransportFs: ITransportFs = {
            showData: true,
            showBaseComment: false,
            showLoglevel: true,
            type: EType.filesystem,
            logpath: "%appdata%/tf_log"
        };

        try {

            if (typeof(config) === "undefined") {
                defaultConfig.transports.push(defaultTransport);
                return defaultConfig;
            }

            defaultConfig.loglvl = config.loglvl? config.loglvl: defaultConfig.loglvl;
            defaultConfig.baseComment = config.baseComment? config.baseComment: defaultConfig.baseComment;

            for (const transport of config.transports) {
                let trans: ITransport = {
                    showBaseComment: transport.showBaseComment? transport.showBaseComment: defaultTransport.showBaseComment,
                    showData: transport.showData? transport.showData: defaultTransport.showData,
                    showLoglevel: transport.showLoglevel? transport.showLoglevel: defaultTransport.showLoglevel,
                    type: transport.type? transport.type: defaultTransport.type
                };

                if (trans.type === EType.filesystem) {
                    (trans as ITransportFs).logpath =
                        (transport as ITransportFs).logpath? (transport as ITransportFs).logpath: defaultTransportFs.logpath;
                }

                defaultConfig.transports.push(trans);
            }

        } catch (error) {
            console.error("error in set Config of Logger: ", error);
        }

        return defaultConfig;
    }

    private configureOutput(args: any[], loglevel:number, transport: ITransport): string {
        try {
            let returnString: string = ``;
            returnString += transport.showData? `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - `: ``;
            returnString += transport.showLoglevel? `${ELoglevel[loglevel]} - `: ``;
            returnString += transport.showBaseComment? `${this.config.baseComment.toString()} - `: ``;

            for (const arg of args) {
                returnString += typeof(arg)==="string"? arg: `${JSON.stringify(arg)}`;
            }
            return returnString;
        } catch (error) {
            console.error("error in configure output in logger: ", error);
            return "ERROR, check config and input";
        }
    }
    //#endregion

}

//#region interfaces
export interface IClientConfig {
    loglvl?: ELoglevel;
    baseComment?: string;
    transports?: ITransport[];
}

interface ITransportFs extends ITransport {
    logpath?: string;
}

interface ITransport {
    type?: EType;
    showData?: boolean;
    showLoglevel?: boolean;
    showBaseComment?: boolean;
}

interface ILogger {
    trash: () => void;
    debug: () => void;
    info: () => void;
    warn: () => void;
    error: () => void;
}
//#endregion


//#region enums
export enum EType {
    console,
    filesystem
}

export enum ELoglevel {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR
}

enum EConsoleType {
    log,
    warn,
    error
}
//#endregion
