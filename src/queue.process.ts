import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });

import './app/config/sentry.config';
import { process } from "./app/lib/queue";

export default process;
