import { 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  deleteDoc,
  runTransaction
} from "./firebase";

// Helper to get a stable local userId to allow deleting their own comments
export function getOrCreateUserId(): string {
  let userId = localStorage.getItem("com_userId");
  if (!userId) {
    userId = "usr_" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("com_userId", userId);
  }
  return userId;
}

// 1. Poll Votes (Question of the Week)
export async function getPollVotes(pollId: string, numOptions: number): Promise<number[]> {
  try {
    const pollRef = doc(db, "polls", pollId);
    const snap = await getDoc(pollRef);
    if (snap.exists()) {
      const data = snap.data();
      const votesArray = Array(numOptions).fill(0);
      for (let i = 0; i < numOptions; i++) {
        votesArray[i] = data.votes?.[i] || 0;
      }
      return votesArray;
    } else {
      // Create empty record if it doesn't exist
      const initialVotes: Record<number, number> = {};
      for (let i = 0; i < numOptions; i++) {
        initialVotes[i] = 0;
      }
      await setDoc(pollRef, { votes: initialVotes });
      return Array(numOptions).fill(0);
    }
  } catch (err) {
    console.warn("Firestore poll votes fetch failed, falling back to localStorage:", err);
    const saved = localStorage.getItem(`com_votes_${pollId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return Array(numOptions).fill(0);
  }
}

export async function submitVote(pollId: string, optionIndex: number): Promise<void> {
  // Update local storage first so user sees count increment instantly
  const numOptions = 10;
  const localVotes = await getPollVotes(pollId, numOptions);
  localVotes[optionIndex] = (localVotes[optionIndex] || 0) + 1;
  localStorage.setItem(`com_votes_${pollId}`, JSON.stringify(localVotes));

  try {
    const pollRef = doc(db, "polls", pollId);
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(pollRef);
      if (!sfDoc.exists()) {
        const votes: Record<number, number> = {};
        votes[optionIndex] = 1;
        transaction.set(pollRef, { votes });
      } else {
        const currentVotes = sfDoc.data().votes || {};
        const newVotes = { ...currentVotes };
        newVotes[optionIndex] = (newVotes[optionIndex] || 0) + 1;
        transaction.update(pollRef, { votes: newVotes });
      }
    });
  } catch (err) {
    console.warn("Firestore vote submission failed (using local storage fallback):", err);
  }
}

export async function retractVote(pollId: string, optionIndex: number): Promise<void> {
  // Update local storage fallback
  const numOptions = 10;
  const localVotes = await getPollVotes(pollId, numOptions);
  localVotes[optionIndex] = Math.max(0, (localVotes[optionIndex] || 0) - 1);
  localStorage.setItem(`com_votes_${pollId}`, JSON.stringify(localVotes));

  try {
    const pollRef = doc(db, "polls", pollId);
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(pollRef);
      if (sfDoc.exists()) {
        const currentVotes = sfDoc.data().votes || {};
        const newVotes = { ...currentVotes };
        newVotes[optionIndex] = Math.max(0, (newVotes[optionIndex] || 0) - 1);
        transaction.update(pollRef, { votes: newVotes });
      }
    });
  } catch (err) {
    console.warn("Firestore vote retraction failed (using local storage fallback):", err);
  }
}

// 2. Page Views (Inquirers)
export async function getPageViews(): Promise<number> {
  try {
    const statsRef = doc(db, "stats", "page_views");
    const snap = await getDoc(statsRef);
    if (snap.exists()) {
      return snap.data().views || 1;
    } else {
      await setDoc(statsRef, { views: 1247 });
      return 1247;
    }
  } catch (err) {
    console.warn("Firestore page views fetch failed, falling back to localStorage:", err);
    const localViews = localStorage.getItem("com_page_views");
    return localViews ? parseInt(localViews, 10) : 1247;
  }
}

export async function incrementPageViews(): Promise<void> {
  const currentLocal = localStorage.getItem("com_page_views");
  const nextLocal = currentLocal ? parseInt(currentLocal, 10) + 1 : 1248;
  localStorage.setItem("com_page_views", nextLocal.toString());

  try {
    const statsRef = doc(db, "stats", "page_views");
    const snap = await getDoc(statsRef);
    if (!snap.exists()) {
      await setDoc(statsRef, { views: 1248 });
    } else {
      await updateDoc(statsRef, { views: increment(1) });
    }
  } catch (err) {
    console.warn("Firestore page views increment failed (using local storage fallback):", err);
  }
}

// 3. Article Likes
export async function getArticleLikes(slug: string): Promise<number> {
  try {
    const likeRef = doc(db, "article_likes", slug);
    const snap = await getDoc(likeRef);
    if (snap.exists()) {
      return snap.data().count || 0;
    } else {
      await setDoc(likeRef, { count: 0 });
      return 0;
    }
  } catch (err) {
    console.error("Error fetching article likes:", err);
    return 0;
  }
}

export async function incrementArticleLike(slug: string): Promise<number> {
  try {
    const likeRef = doc(db, "article_likes", slug);
    const snap = await getDoc(likeRef);
    if (!snap.exists()) {
      await setDoc(likeRef, { count: 1 });
      return 1;
    } else {
      await updateDoc(likeRef, { count: increment(1) });
      const updated = await getDoc(likeRef);
      return updated.data()?.count || 1;
    }
  } catch (err) {
    console.error("Error incrementing article like:", err);
    return 1;
  }
}

// 4. Comments
export interface ArticleComment {
  id: string;
  articleSlug: string;
  name: string;
  text: string;
  date: string;
  userId: string;
  timestamp: number;
}

export async function getArticleComments(slug: string): Promise<ArticleComment[]> {
  try {
    const commentsCol = collection(db, "comments");
    const snap = await getDocs(commentsCol);
    const list: ArticleComment[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.articleSlug === slug) {
        list.push({
          id: docSnap.id,
          articleSlug: data.articleSlug,
          name: data.name,
          text: data.text,
          date: data.date,
          userId: data.userId || "",
          timestamp: data.timestamp || 0
        });
      }
    });
    // sort chronologically (oldest to newest) or newest first
    return list.sort((a, b) => a.timestamp - b.timestamp);
  } catch (err) {
    console.error("Error getting comments:", err);
    return [];
  }
}

export async function addArticleComment(slug: string, name: string, text: string): Promise<ArticleComment> {
  const userId = getOrCreateUserId();
  const timestamp = Date.now();
  const dateStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const commentData = {
    articleSlug: slug,
    name: name,
    text: text,
    date: dateStr,
    userId: userId,
    timestamp: timestamp
  };

  try {
    const commentsCol = collection(db, "comments");
    const docRef = await addDoc(commentsCol, commentData);
    return {
      id: docRef.id,
      ...commentData
    };
  } catch (err) {
    console.error("Error adding comment:", err);
    // fallback local mock if firestore fails
    return {
      id: "fallback_" + timestamp,
      ...commentData
    };
  }
}

export async function deleteArticleComment(commentId: string): Promise<void> {
  try {
    const docRef = doc(db, "comments", commentId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Error deleting comment:", err);
  }
}
