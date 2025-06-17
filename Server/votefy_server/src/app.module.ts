import { Module } from '@nestjs/common';
import { VotingModule } from './votefy/votefy.module';

@Module({
  imports: [VotingModule],
})
export class AppModule {}
