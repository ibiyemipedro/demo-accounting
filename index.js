const app = require("./src/startup/app");
const http = require("http").createServer(app);
const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`server connected at port: ${port}`));
