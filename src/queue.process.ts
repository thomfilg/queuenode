import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });

import { process } from "./app/lib/queue";

export default process
