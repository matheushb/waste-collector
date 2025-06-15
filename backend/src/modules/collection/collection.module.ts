import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { CollectionPrismaMapper } from './mapper/collection-prisma.mapper';
import { CollectionPrismaRepository } from './repository/collection-prisma.repository';
import { COLLECTION_MAPPER } from './mapper/collection.mapper';
import { COLLECTION_REPOSITORY } from './repository/collection.repository.interface';
import { WasteTypeModule } from '../waste-type/waste-type.module';

@Module({
  imports: [PrismaModule, WasteTypeModule],
  controllers: [CollectionController],
  providers: [
    {
      provide: COLLECTION_MAPPER,
      useFactory: () => {
        return new CollectionPrismaMapper();
      },
    },
    {
      provide: COLLECTION_REPOSITORY,
      useFactory: (prismaService: PrismaService, mapper: CollectionPrismaMapper) => {
        return new CollectionPrismaRepository(prismaService, mapper);
      },
      inject: [PrismaService, COLLECTION_MAPPER],
    },
    CollectionService,
  ],
  exports: [CollectionService],
})
export class CollectionModule {} 