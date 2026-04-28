import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

import { env } from "../config/env.js";

let firestoreDb: Firestore | null = null;
let firebaseWarningShown = false;

function parseServiceAccountJson() {
  if (!env.firebaseServiceAccountJson) {
    return null;
  }

  try {
    return JSON.parse(env.firebaseServiceAccountJson) as Record<string, string>;
  } catch (error) {
    if (!firebaseWarningShown) {
      console.warn("FIREBASE_SERVICE_ACCOUNT_JSON could not be parsed. Falling back to mock backend.", error);
      firebaseWarningShown = true;
    }

    return null;
  }
}

function initializeFirebase() {
  if (firestoreDb) {
    return firestoreDb;
  }

  if (getApps().length > 0) {
    firestoreDb = getFirestore(getApps()[0]!);
    return firestoreDb;
  }

  const parsedServiceAccount = parseServiceAccountJson();
  const hasApplicationDefaultCredentials = Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  const hasFirebaseConfig = Boolean(parsedServiceAccount || hasApplicationDefaultCredentials || env.firebaseProjectId);

  if (!hasFirebaseConfig) {
    return null;
  }

  try {
    const app = initializeApp(
      parsedServiceAccount
        ? {
            credential: cert(parsedServiceAccount),
            projectId: env.firebaseProjectId || parsedServiceAccount.project_id,
            storageBucket: env.firebaseStorageBucket || parsedServiceAccount.storage_bucket
          }
        : {
            credential: applicationDefault(),
            projectId: env.firebaseProjectId || undefined,
            storageBucket: env.firebaseStorageBucket || undefined
          }
    );

    firestoreDb = getFirestore(app);
    return firestoreDb;
  } catch (error) {
    if (!firebaseWarningShown) {
      console.warn("Firebase could not be initialized. Falling back to mock backend.", error);
      firebaseWarningShown = true;
    }

    return null;
  }
}

export function getFirebaseDb() {
  return initializeFirebase();
}

export function isFirebaseEnabled() {
  return Boolean(getFirebaseDb());
}
