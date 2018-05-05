

export class ClientLogger implements ILogger {

    private config: IClientConfig;

    constructor(config?: IClientConfig) {
        this.config = this.setConfig(config);
    }

    public trash(...args : any[]): void {
        let output = this.configureOutput(args, ELoglevel.TRASH, this.config.transports[0]);
        this.writeLog(output, ELoglevel.TRASH, EConsoleType.log);
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

    private writeLog(input: string, loglevel: number, logType: number): void {

        if (loglevel >= this.config.loglvl) {
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
                returnString += `${JSON.stringify(arg)}`;
            }
            return returnString;
        } catch (error) {
            console.error("error in configure output in logger: ", error);
            return "ERROR, check config and input";
        }
    }

}

export interface IClientConfig {
    loglvl?: ELoglevel;
    baseComment?: string;
    transports?: ITransport[];
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

export enum EType {
    console
}

enum EConsoleType {
    log,
    warn,
    error
}

export enum ELoglevel {
    TRASH,
    DEBUG,
    INFO,
    WARN,
    ERROR
}