

class ClientLogger implements ILogger {

    private config: IClientConfig;

    constructor(config: IClientConfig) {
        this.config = config;
    }

    public trash() {
        //
    }

    public debug() {
        //
    }

    public info() {
        //
    }

    public warn() {
        //
    }

    public error() {
        //
    }

}

interface IClientConfig {
    loglvl?: string;
}

interface ILogger {
    trash: () => void;
    debug: () => void;
    info: () => void;
    warn: () => void;
    error: () => void;
}