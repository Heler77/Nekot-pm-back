import { OnModuleInit } from '@nestjs/common';
export declare class FirebaseService implements OnModuleInit {
    onModuleInit(): void;
    getAuth(): import("firebase-admin/auth").Auth;
}
