import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { VotingService } from './votefy.service';
import { PollDto } from './dto/poll.dto';
import { UserVoteDto } from './dto/userVote.dto';
import { adminInfoDto } from './dto/adminInfo.dto';
import { BadRequestException } from '@nestjs/common';
import { VoteType } from '@prisma/client';
@Controller('votes')
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  //#---ADMIN AUTH---#//
  @Post('/login')
  async adminLogin(
    @Body('adminID') adminID: string,
    @Body('password') password: string,
  ): Promise<boolean> {
    if (!adminID || !password) {
      throw new BadRequestException('Admin ID and password are required');
    }
    const adminDto: adminInfoDto = {
      adminID,
      password,
    };
    return this.votingService.adminLogin(adminDto);
  }
  @Post('/create-admin')
  async createAdmin(
    @Body('adminID') adminID: string,
    @Body('password') password: string,
  ): Promise<boolean> {
    if (!adminID || !password) {
      throw new BadRequestException('Admin ID and password are required');
    }
  const adminDto = {
    adminID,
    password
  };
    return this.votingService.createAdmin(adminDto);
  }
//#---ADMIN ACTIONS---#//
  @Post('/definitions')
  createDefinition(@Body() dto: PollDto): Promise<boolean> {
    return this.votingService.createVoteDefinition(dto);
  }

  @Get('/definitions')
  async getAllDefinitions(): Promise<PollDto[]> {
    const definitions = await this.votingService.getAllDefinitions();
    definitions.forEach((def) => {
      console.log(`title: ${def.title}, active: ${def.isActive}`);
    });
    return definitions.map((def) => ({ ...def, type: def.type as VoteType }));
  }
  @Delete('/definitions/:id')
  deleteDefinition(@Param('id') id: string): Promise<boolean> {
    return this.votingService.deleteVoteDefinition(id);
  }
  @Get('user/:id/:questionId')
  async getIfUserHasVoted(
    @Param('id') userId: string,
    @Param('questionId') questionId: string,
  ): Promise<boolean> {
    return await this.votingService.hasUserVotedOnQuestion(userId, questionId);
  }
  @Get('question/:id/calculate')
  async calculateVotesForQuestion(
    @Param('id') questionId: string,
  ): Promise<Record<string, number>> {
    const votes = await this.votingService.getVotesForTarget(questionId);
    const results: Record<string, number> = {};

    for (const vote of votes) {
      const option = vote.value;
      results[option] = (results[option] || 0) + 1;
    }

    return results;
  }
  @Post('/definitions/:id/activate')
  async activateVoteDefinition(@Param('id') id: string): Promise<boolean> {
    console.log('Activating vote definition with ID:', id);
    return this.votingService.defineToActive(id);
  }

  @Post('/definitions/:id/inactivate')
  async inactivateVoteDefinition(@Param('id') id: string): Promise<boolean> {
    return this.votingService.defineToInactive(id);
  }

  @Get('/definitions/:id/active')
  async isVoteActive(@Param('id') id: string): Promise<boolean> {
    return this.votingService.isActiveVote(id);
  }
@Get(':qId/voters')
async getVoters(@Param('qId') questionId: string) {
  console.log('Retrieving voters for question:', questionId);
  
  const votes = await this.votingService.getVotesByQuestionId(questionId);

  const mappedVotes = votes.map((v) => ({
    userID: v.userID,
    pollID: v.pollID,
    value: v.value,
    createdAt: v.createdAt,
  }));

  console.log(mappedVotes);
  
  return mappedVotes;
}


  //#--------------------#//

  //#---VOTER ACTIONS---#//
  @Post()
  async submitVote(@Body() dto: UserVoteDto): Promise<boolean> {
    const alreadyVoted = await this.votingService.hasUserVotedOnQuestion(
      dto.userID,
      dto.pollID,
    );
    const isActiveVote = await this.votingService.isActiveVote(
      dto.pollID
    );
    if (!isActiveVote && !alreadyVoted) {
      throw new BadRequestException('Voting is not active for this question');
    }
    const submitted = await this.votingService.submitVote(dto);
    console.log('submitted:', submitted);
    return submitted;
  }
  @Get(':userId/openVotesForUser')
  async getOpenVotesUserHasNotVotedIn(
    @Param('userId') userId: string,
  ): Promise<PollDto[]> {
    const polls =
      await this.votingService.getOpenVotesUserHasNotVotedIn(userId);

    const mappedPolls = polls.map((poll) => ({
      ...poll,
      type: poll.type as VoteType,
    }));

    return mappedPolls;
  }
  //#--------------------#//
}
