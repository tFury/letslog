import { ETransportType, ELoglevel } from "./enums";

export interface IClientConfig {
    baseComment?: string;
    loglvl?: ELoglevel;
    transports?: ITransport[];
}

export interface IMergedConfig {
    transports?: ITransport[];
}

export interface ITransportFs extends ITransport {
    logpath?: string;
}

export interface ITransport {
    baseComment?: string;
    loglvl?: ELoglevel;
    showBaseComment?: boolean;
    showData?: boolean;
    showLoglevel?: boolean;
    type?: ETransportType;
    logpath?: string;
}

export interface ILogger {
    trace: () => void;
    debug: () => void;
    info: () => void;
    warn: () => void;
    error: () => void;
}