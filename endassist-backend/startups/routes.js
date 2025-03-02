import bodyParser from "body-parser";
import cors from "cors";
import user from "../routes/userRoute.js";

export default function (app) {
  app.use(cors());
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

  app.use("/api/v1/user", user);
}
