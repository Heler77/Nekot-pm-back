import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth as getFirebaseAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    if (getApps().length === 0) {
      initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'nekot-pm',
      });
    }
  }

  getAuth() {
    return getFirebaseAuth();
  }
}
