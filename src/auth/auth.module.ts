import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseService } from './firebase.service';
import { AuthGuard } from './auth.guard';
import { ProjectAccessGuard } from './project-access.guard';
import { User, UserSchema } from '../schemas/user.schema';
import { Project, ProjectSchema } from '../schemas/project.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  providers: [FirebaseService, AuthGuard, ProjectAccessGuard],
  exports: [FirebaseService, AuthGuard, ProjectAccessGuard],
})
export class AuthModule {}
