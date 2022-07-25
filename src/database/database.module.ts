import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-postgres'>('TYPE_DB'),
        host: config.get<'string'>('HOST_DB'),
        port: config.get<'string'>('PORT_DB'),
        username: config.get<'string'>('USERNAME_DB'),
        password: config.get<'string'>('PASSWORD_DB'),
        database: config.get<'string'>('DATABASE_NAME_DB'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
