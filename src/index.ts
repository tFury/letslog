//#region IMPORTS
import {
    ELoglevel,
    ETransportType,
    EConsoleType
} from "./utils/enums";
import {
    ILogger,
    IClientConfig,
    ITransport,
    ITransportFs,
    IMergedConfig
} from "./utils/interfaces";
import {
    DefaultConsolTransport,
    DefaultFsTransport,
    BaseTransport
} from "./lib/transport";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
//#endregion

class Logger implements ILogger {

    private config: IMergedConfig;
    private stream: any;

    constructor(config?: IClientConfig) {
        this.config = this.setConfig(config);

        for (const transport of this.config.transports) {
            switch (transport.type) {
                case ETransportType.filesystem:
                    this.initializeFsLogger((transport as DefaultFsTransport));
                    break;

                case ETransportType.console:
                    // no initialising required
                    break;
            }
        }
    }

    //#region public functions
    public trace(...args: any[]): string {
        let output = this.configureOutput(args, ELoglevel.TRACE, this.config.transports[0]);
        this.writeLog(output, ELoglevel.TRACE, EConsoleType.log);
        return output;
    }

    public debug(...args: any[]): string {
        let output = this.configureOutput(args, ELoglevel.DEBUG, this.config.transports[0]);
        this.writeLog(output, ELoglevel.DEBUG, EConsoleType.log);
        return output;
    }

    public info(...args: any[]): string {
        let output = this.configureOutput(args, ELoglevel.INFO, this.config.transports[0]);
        this.writeLog(output, ELoglevel.INFO, EConsoleType.log);
        return output;
    }

    public warn(...args: any[]): string {
        let output = this.configureOutput(args, ELoglevel.WARN, this.config.transports[0]);
        this.writeLog(output, ELoglevel.WARN, EConsoleType.warn);
        return output;
    }

    public error(...args: any[]): string {
        let output = this.configureOutput(args, ELoglevel.ERROR, this.config.transports[0]);
        this.writeLog(output, ELoglevel.ERROR, EConsoleType.error);
        return output;
    }
    //#endregion

    //#region private functions
    private writeLog(input: string, loglevel: number, logType: number): void {

        for (const transport of this.config.transports) {
            if (loglevel >= transport.loglvl) {
                switch (transport.type) {
                    case ETransportType.filesystem:
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

        this.stream.write(`${input}\r\n`);
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

    private initializeFsLogger(transport: DefaultFsTransport) {


        try {

            transport.logpath = transport.logpath.replace(new RegExp("/", 'g'), "\\");

            let logPath: string = transport.logpath;
            let folders = logPath.split("\\");
            let rootPath = folders[0];

            folders.shift();
            rootPath = process.env.appdata && rootPath === "%appdata%" ? process.env.appdata : os.homedir();

            for (const folder of folders) {
                rootPath += `${path.sep}${folder}`;
                rootPath = path.normalize(rootPath);
                if (!fs.existsSync(rootPath)) {
                    fs.mkdirSync(rootPath);
                }
            }

            // rootPath = rootPath.replace("%appdata%", process.env.appdata);

            const filePath = path.normalize(`${rootPath}${path.sep}${transport.logFileName}.log`);
            
            console.log("## filePath ##", filePath);

            this.stream = fs.createWriteStream(filePath, { flags: "a" });
        } catch (error) {
            console.error("error in createWriteStream", error);
        }
    }

    private setConfig(config?: IClientConfig): IMergedConfig {

        let mergedConfig: IMergedConfig = {
            transports: []
        };

        try {

            if (typeof (config) === "undefined") {
                let defaultTransportConsol = new DefaultConsolTransport();
                mergedConfig.transports.push(defaultTransportConsol);
                return mergedConfig;
            }

            if (config.transports.length === 0) {
                let defaultTransportConsol = new DefaultConsolTransport();
                defaultTransportConsol.baseComment = config.baseComment ? config.baseComment : defaultTransportConsol.baseComment;
                defaultTransportConsol.loglvl = typeof (config.loglvl) !== "undefined" ? config.loglvl : defaultTransportConsol.loglvl;
                mergedConfig.transports.push(defaultTransportConsol);
                return mergedConfig;
            }

            for (const transport of config.transports) {
                let mergedTransport = new BaseTransport();

                let base = transport.baseComment ? transport.baseComment : (config.baseComment ? config.baseComment : null);
                let loglvl = typeof (transport.loglvl) !== "undefined" ? transport.loglvl :
                    (typeof (config.loglvl) !== "undefined" ? config.loglvl : null);

                mergedTransport.baseComment = base === null ? mergedTransport.baseComment : base;
                mergedTransport.loglvl = loglvl === null ? mergedTransport.loglvl : loglvl;
                mergedTransport.showBaseComment = transport.showBaseComment ? transport.showBaseComment : mergedTransport.showBaseComment;
                mergedTransport.showDate = transport.showDate ? transport.showDate : mergedTransport.showDate;
                mergedTransport.showLoglevel = transport.showLoglevel ? transport.showLoglevel : mergedTransport.showLoglevel;

                switch (transport.type) {
                    case ETransportType.filesystem:
                        mergedTransport = new DefaultFsTransport(mergedTransport);
                        (mergedTransport as DefaultFsTransport).logpath = (transport as DefaultFsTransport).logpath
                            ? (transport as DefaultFsTransport).logpath : (mergedTransport as DefaultFsTransport).logpath;
                        (mergedTransport as DefaultFsTransport).logFileName = (transport as DefaultFsTransport).logFileName
                            ? (transport as DefaultFsTransport).logFileName : (mergedTransport as DefaultFsTransport).logFileName;
                        break;

                    default:
                        mergedTransport = new DefaultConsolTransport(mergedTransport);
                        break;
                }

                mergedConfig.transports.push(mergedTransport);
            }

        } catch (error) {
            console.error("error in set Config of Logger: ", error);
        }

        return mergedConfig;
    }

    private configureOutput(args: any[], loglevel: number, transport: ITransport): string {
        try {
            let returnString: string = ``;
            returnString += transport.showDate ? `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - ` : ``;
            returnString += transport.showLoglevel ? `${ELoglevel[loglevel]} - ` : ``;
            returnString += transport.showBaseComment ? `${transport.baseComment.toString()} - ` : ``;

            for (const arg of args) {
                returnString += typeof (arg) === "string" ? arg : `${JSON.stringify(arg)}`;
            }
            return returnString;
        } catch (error) {
            console.error("error in configure output in logger: ", error);
            return "ERROR, check config and input";
        }
    }
    //#endregion

}

export {
    Logger,
    ELoglevel,
    ETransportType,
    EConsoleType,
    ILogger,
    IClientConfig,
    ITransport,
    ITransportFs,
    IMergedConfig,
    DefaultConsolTransport,
    DefaultFsTransport,
    BaseTransport
};
