import { Module } from '@nestjs/common';
import { TuserController } from './tuser.controller';
import { TuserService } from './tuser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TuserRepository } from './repository/tuser.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TuserRepository]), AuthModule],
  controllers: [TuserController],
  providers: [TuserService],
})
export class TuserModule {}
