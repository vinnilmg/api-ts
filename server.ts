import { app } from "./routes";

const port = process.env.PORT || '3050';

app.listen(port, () => console.log('SERVIDOR EXECUTANDO NA PORTA %s', port));