import { db } from "./connect.js";

// standard firestore query for deleting batches (necessary for deleteCollection())
export async function deleteQueryBatch(database, query, resolve) {
  console.log("deleteQueryBatch started");
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    await resolve();
    return;
  }

  // Delete documents in a batch
  const batch = await database.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(database, query, resolve);
  });
}

// standard firestore query for deleting collections (uses deleteQueryBatch())
export async function deleteCollection(database, collectionPath, batchSize) {
  console.log("deleteCollection started");
  const collectionRef = await database.collection(collectionPath);
  const query = await collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(database, query, resolve).catch(reject);
  });
}

export async function getDatabaseCount(collection){
  console.log("getDatabaseCount started");
  const snapshot = await db.collection(collection).count().get()
  console.log(snapshot.data().count);
  console.log("getDatabaseCount completed");
  return snapshot.data().count
}
