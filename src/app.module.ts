import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration], isGlobal: true, envFilePath: ['.env.local', '.env'] })]
})
export class AppModule {}
