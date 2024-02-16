import { ref, orderByChild, query, equalTo, get } from 'firebase/database';

export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }

  return splitName[0][0];
}
export function transformToArrayWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}

// export const getUserUpdates = async function (userId, keyToUpdate, value, db) {
//   const updates = {};
//   updates[`/profiles/${userId}/${keyToUpdate}`] = value;
//   const messagesQuery = get(
//     query(ref(db, '/messages'), orderByChild('author/uid'), equalTo(userId))
//   );
//   const roomQuery = get(
//     query(
//       ref(db, '/rooms'),
//       orderByChild('lastMessage/author/uid'),
//       equalTo(userId)
//     )
//   );
//   const [mSnap, rSnap] = await Promise.all([messagesQuery, roomQuery]);

//   mSnap.forEach(msgSanp => {
//     updates[`/messages/${msgSanp.key}/author/${keyToUpdate}`] = value;
//   });

//   rSnap.forEach(roomSanp => {
//     updates[`/rooms/${roomSanp.key}/lastMessage/author/${keyToUpdate}`] = value;
//   });
//   return updates;
// };
export async function getUserUpdates(userId, keyToUpdate, value, db) {
  const updates = {};

  updates[`/profiles/${userId}/${keyToUpdate}`] = value;

  const getMsgs = get(
    query(ref(db, '/messages'), orderByChild('author/uid'), equalTo(userId))
  );

  const getRooms = get(
    query(
      ref(db, '/rooms'),
      orderByChild('lastMessage/author/uid'),
      equalTo(userId)
    )
  );
  // Index not defined, add ".indexOn": "author/uid", for path "/messages", to the rules

  const [mSnap, rSnap] = await Promise.all([getMsgs, getRooms]);

  mSnap.forEach(msgSnap => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });

  rSnap.forEach(roomSnap => {
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  return updates;
}
