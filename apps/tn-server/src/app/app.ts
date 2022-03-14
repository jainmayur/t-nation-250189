import * as express from 'express';
import * as path from 'path';
import { environment } from '../environments/environment';
import {pino} from 'pino';
import { UserController } from './controllers/user.controller';


class App {
  public app: express.Application;
  private log: pino.Logger; // Our logger instance

  // Controllers
  private userController: UserController;

  /**
   * Initializes the app and its routes
   */
  constructor() {
    // Init express instance
    this.app = express();
    this.app.use(express.json());
    this.log = pino()

    // Set up the controllers
    this.userController = new UserController();

    // Initialize routes for this app
    this.initializeApiRoutes(); // Listen for API calls
    this.initializeUiRoutes(); // Serve angular client
  }

  /**
   * Initialize routes for the API
   */
  private initializeApiRoutes() {
    this.app.use(environment.prefix, this.userController.router);
  }

  private initializeUiRoutes() {
    // All the different URL paths that might be used to deep link into the app
    this.app.use(
      [
        `${environment.prefix}/login`,
        `${environment.prefix}/registration`,
        `${environment.prefix}/user-dashboard/*`,
        `${environment.prefix}/testMap`
      ],
      (req, res) => {
        res.sendFile(path.join(__dirname, './client/index.html'));
      }
    );

    // Serve all other static files from the angular app, like JS, CSS and images
    this.app.use(environment.prefix, express.static(path.join(__dirname, './client')));
  }

  /** Starts the web server and sets it listening on the correct port */
  public listen() {
    this.app.listen(environment.port, () => {
      this.log.info(
        'trivia-nation started on http://localhost:' +
        environment.port +
        ' in ' +
        process.env.NODE_ENV +
        ' mode.'
      );
    });
  }
}

export default App;
