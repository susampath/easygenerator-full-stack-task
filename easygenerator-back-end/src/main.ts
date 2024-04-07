import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";

async function initiation() :Promise<void> {
  const app :INestApplication = await NestFactory.create(AppModule, );
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix("/api/v1");
  app.enableCors({
    origin: configService.get("CORS_ORIGIN"),
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: "*",
  });

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  const config = new DocumentBuilder()
      .setTitle("Auth Micro Service ")
      .setDescription(`This includes the APIs documentation for end points`)
      .setVersion("1.0")
      .addBearerAuth(
          {
            description: "Access Token",
            name: "Authorization",
            bearerFormat: "Bearer",
            scheme: "Bearer",
            type: "http",
            in: "Header",
          },
          "access-token"
      )
      .build();
  const document :OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/swagger-documentation", app, document);

  await app.listen(configService.get("PORT"), "0.0.0.0");
  console.log("Micro service started at port : " + configService.get("PORT"));
}
initiation().then();
