import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { SummaryModule } from './summary/summary.module';
import { OpenaiModule } from './openai/openai.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    MorganModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    UsersModule,
    AuthModule,
    SummaryModule,
    OpenaiModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {}
