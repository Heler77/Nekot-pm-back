import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { FirebaseService } from './firebase.service';
import { UserDocument } from '../schemas/user.schema';
export declare class AuthGuard implements CanActivate {
    private firebaseService;
    private userModel;
    constructor(firebaseService: FirebaseService, userModel: Model<UserDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
