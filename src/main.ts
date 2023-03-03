import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

  const {PORT=3000, API_VERSION=`1.0.0`} = process.env;

  const config = new DocumentBuilder()
  .setTitle('Backend application Todo List')
  .setDescription(`Users`)
  .setVersion(API_VERSION)
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port =${PORT}`));
}

start();
