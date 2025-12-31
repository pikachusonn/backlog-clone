import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/interface/common.js';

const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export default CurrentUser;
