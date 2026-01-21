import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TransitionService } from './transition.service.js';
import { JwtAuthGuard } from '../guard/JwtAuth.guard.js';
import CurrentUser from '../decorators/current-user.decorator.js';
import { CreateTransitionDto } from './dto/createTransition.dto.js';

@Controller('transitions')
export class TransitionController {
  constructor(private readonly transitionService: TransitionService) {}

  @Get('/project/:projectId')
  @UseGuards(JwtAuthGuard)
  async getProjectTransitions(
    @Param('projectId') projectId: string,
    @CurrentUser() user,
  ) {
    return this.transitionService.getProjectTransitions(
      projectId,
      user.userId as string,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTransition(
    @Body() createTransitionDto: CreateTransitionDto,
    @CurrentUser() user,
  ) {
    return await this.transitionService.createTransition(
      createTransitionDto,
      user.userId as string,
    );
  }
}
