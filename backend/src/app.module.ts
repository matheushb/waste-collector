import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WasteTypeModule } from './modules/waste-type/waste-type.module';
import { CollectionModule } from './modules/collection/collection.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { EnvConfigModule } from './common/environment/environment/env-config/env-config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [
    EnvConfigModule,
    AuthModule,
    UserModule,
    WasteTypeModule,
    CollectionModule,
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
