import { VoteType } from '@prisma/client';
export class PollDto {
  title: string;
  options?: string[];
  isActive?: boolean = true;
  type: VoteType;
}
