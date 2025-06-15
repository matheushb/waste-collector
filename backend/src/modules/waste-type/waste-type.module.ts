import { Module } from '@nestjs/common';
import { WasteTypeController } from './waste-type.controller';
import { WasteTypeService } from './waste-type.service';
import { WasteTypePrismaRepository } from './repository/waste-type-prisma.repository';
import { WasteTypePrismaMapper } from './mapper/waste-type-prisma.mapper';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { WASTE_TYPE_MAPPER } from './mapper/waste-type.mapper';
import { WASTE_TYPE_REPOSITORY } from './repository/waste-type.repository.interface';

@Module({
  imports: [PrismaModule],
  controllers: [WasteTypeController],
  providers: [
    {
      provide: WASTE_TYPE_MAPPER,
      useFactory: () => {
        return new WasteTypePrismaMapper();
      },
    },
    {
      provide: WASTE_TYPE_REPOSITORY,
      useFactory: (prismaService: PrismaService, mapper: WasteTypePrismaMapper) => {
        return new WasteTypePrismaRepository(prismaService, mapper);
      },
      inject: [PrismaService, WASTE_TYPE_MAPPER],
    },
    WasteTypeService,
  ],
  exports: [WasteTypeService],
})
export class WasteTypeModule {} 