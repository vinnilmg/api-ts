import StartUp  from "./StartUp";

const port = process.env.PORT || '3050';

StartUp.app.listen(port, () => console.log('SERVIDOR EXECUTANDO NA PORTA %s', port));