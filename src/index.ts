import { Aplicacion } from './App/app';

async function main() {
    const app = new Aplicacion(5000);
    await app.Start();
}

main();