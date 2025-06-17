import { Module } from '@nestjs/common';
import { VotingService } from './votefy.service';
import { VotingController } from './votefy.controller';
import { PrismaModule } from '../../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [VotingService],
  controllers: [VotingController],
  exports: [VotingService],
})
export class VotingModule {}
