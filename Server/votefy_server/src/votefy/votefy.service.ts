import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PollDto } from './dto/poll.dto';
import { UserVoteDto } from './dto/userVote.dto';
import { adminInfoDto } from './dto/adminInfo.dto';
import { VoteType } from '@prisma/client';
@Injectable()
export class VotingService {
  constructor(private prisma: PrismaService) {}
  async adminLogin(adminInfo: adminInfoDto): Promise<boolean> {
    const admin = await this.prisma.adminInfo.findUnique({
      where: { adminID: adminInfo.adminID },
    });

    return !!(admin && admin.password === adminInfo.password);
  }
  async createAdmin(adminInfo: adminInfoDto): Promise<boolean> {
    try {
      await this.prisma.adminInfo.create({
        data: {
          adminID: adminInfo.adminID,
          password: adminInfo.password,
          createdAt: adminInfo.createdAt ?? new Date(),
        },
      });
      return true;
    } catch (error) {
      console.error('Create admin failed:', error);
      return false;
    }
  }
  async createVoteDefinition(dto: PollDto): Promise<boolean> {
    try {
      await this.prisma.poll.create({
        data: {
          ...dto,
          options: dto.options ?? [],
        },
      });
      return true;
    } catch (error) {
      console.error('Create vote failed:', error);
      return false;
    }
  }

  async getAllDefinitions() {
    return this.prisma.poll.findMany();
  }

  async deleteVoteDefinition(id: string) {
    try {
      await this.prisma.poll.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Delete vote definition failed:', error);
      return false;
    }
  }

  async submitVote(dto: UserVoteDto): Promise<boolean> {
    try {
      await this.prisma.userVote.create({
        data: {
          pollID: dto.pollID,
          userID: dto.userID,
          value: String(dto.value),
        },
      });
      return true;
    } catch (error) {
      console.error('Failed to submit vote:', error);
      return false;
    }
  }

  async getOpenVotesUserHasNotVotedIn(userID: string) {
    if (!userID) {
      throw new Error('User ID is required');
    }
    const polls = await this.prisma.poll.findMany({
      where: {
        isActive: true,
        votes: {
          none: {
            userID: userID,
          },
        },
      },
    });
    console.log('Polls retrieved for user:', userID, polls);
    return polls;
  }
  async getVotesForTarget(pollID: string) {
    return this.prisma.userVote.findMany({
      where: {
        pollID: pollID,
      },
    });
  }
  async isActiveVote(ID: string): Promise<boolean> {
    const poll = await this.prisma.poll.findUnique({
      where: { id: ID },
    });
    console.log(
      'Checking if vote is active for ID:',
      ID,
      'Result:',
      poll?.isActive,
    );
    return !!poll?.isActive;
  }

  async defineToActive(ID: string): Promise<boolean> {
    const poll = await this.prisma.poll.update({
      where: { id: ID },
      data: { isActive: true },
    });
    console.log('Activating vote definition with ID:', ID, 'Result:', poll);
    return !!poll;
  }

  async defineToInactive(id: string): Promise<boolean> {
    const voteDefinition = await this.prisma.poll.update({
      where: { id },
      data: { isActive: false },
    });
    return !!voteDefinition;
  }

  async hasUserVotedOnQuestion(
    userId: string,
    pollID: string,
  ): Promise<boolean> {
    console.log('Checking vote for:', { userId, pollID });
    const vote = await this.prisma.userVote.findFirst({
      where: {
        userID: userId,
        pollID: pollID,
      },
    });
    return !!vote;
  }
async getVotesByQuestionId(pollID: string): Promise<UserVoteDto[]> {
  const votes = await this.prisma.userVote.findMany({
    where: { pollID },
    select: {
      userID: true,
      pollID: true,
      value: true,
      createdAt: true,
    },
  });

  return votes.map((vote) => ({
    userID: vote.userID,
    pollID: vote.pollID,
    value: vote.value,
    createdAt: new Date(vote.createdAt), // Ensure correct type if needed
  }));
}
async getPollTypeById(pollID: string): Promise<VoteType> {
    const poll = await this.prisma.poll.findUnique({
      where: { id: pollID },
      select: {
        type: true,
      },
    });

    if (!poll) {
      throw new Error(`Poll with ID ${pollID} not found`);
    }

  return poll.type as VoteType;}
}
