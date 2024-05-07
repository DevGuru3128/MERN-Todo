import express, { Application } from 'express'
import cors from "cors";
import bodyParser from "body-parser";
// Routes
import IndexRoutes from './routes/index.routes'
import EmployeeRoutes from './routes/employee.routes'

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json({ limit: '50mb'}))
        this.app.use(express.json({limit: "10mb"}))
        this.app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/employee', EmployeeRoutes);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}