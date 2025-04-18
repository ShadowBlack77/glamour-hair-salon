import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { FirebaseModule } from 'nestjs-firebase';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '/assets/secrets/.env'),
      isGlobal: true
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: join(__dirname, `/assets/secrets/${process.env.FIREBASE_CONFIG_FILE}`)
    }),
    CoreModule, 
    FeatureModule
  ],
})
export class AppModule {}
