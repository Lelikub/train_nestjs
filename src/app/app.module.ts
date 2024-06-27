import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import configuration from '../configurations';

@Module({
  imports: [
    UserModule, 

    ConfigModule.forRoot({
      isGlobal: true, 
      load: [configuration]}),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configServise: ConfigService) => ({
        dialect: "postgres", 
        host: configServise.get('db_host'),
        port: configServise.get('db_port'),
        username: configServise.get('db_user'),
        password: configServise.get('db_password'),
        database: configServise.get('db_name'),
        synchronize: true,
        autoLoadModels: false,
        models: []
      })
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
