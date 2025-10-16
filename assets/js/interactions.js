// --- interactions.js ---
// Handles article reactions (like/love/care) and comments via Firebase Firestore

// Ensure Firebase is initialized
if (!window.firebase || !window.db) {
  console.error("❌ Firebase not initialized. Check firebase-init.js");
}

document.addEventListener("DOMContentLoaded", () => {
  const postId = window.location.pathname.replace(/\//g, "_");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentList = document.getElementById("comment-list");
  const reactionBtns = document.querySelectorAll(".react-btn");
  const reactionCount = document.getElementById("reaction-count");

  if (!window.db) return;

  const commentsRef = db.collection("posts").doc(postId).collection("comments");
  const reactionsRef = db.collection("posts").doc(postId);

  // --- 🧡 Handle Reactions ---
  if (reactionBtns.length > 0) {
    reactionBtns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const type = btn.dataset.type;
        const user = firebase.auth().currentUser;

        if (!user) {
          alert("Please log in to react to posts.");
          return;
        }

        const reactionDoc = reactionsRef.collection("reactions").doc(user.uid);

        try {
          const snapshot = await reactionDoc.get();
          if (snapshot.exists && snapshot.data().type === type) {
            await reactionDoc.delete();
          } else {
            await reactionDoc.set({
              type,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
        } catch (err) {
          console.error("Reaction error:", err);
        }
      });
    });

    // Real-time update of total reactions
    reactionsRef.collection("reactions").onSnapshot((snap) => {
      const total = snap.size;
      if (reactionCount) reactionCount.textContent = total; // ✅ Safe check
    });
  }

  // --- 💬 Handle Comments ---
  if (commentForm && commentInput && commentList) {
    commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const text = commentInput.value.trim();
      const user = firebase.auth().currentUser;

      if (!text) return;

      if (!user) {
        alert("Please log in to post a comment.");
        return;
      }

      try {
        await commentsRef.add({
          uid: user.uid,
          email: user.email,
          text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        commentInput.value = "";
      } catch (err) {
        console.error("Comment error:", err);
      }
    });

    commentsRef.orderBy("timestamp", "desc").onSnapshot((snap) => {
      commentList.innerHTML = "";
      snap.forEach((doc) => {
        const c = doc.data();
        const div = document.createElement("div");
        div.classList.add("comment-item");
        div.innerHTML = `
          <p><strong>${c.email || "Anonymous"}</strong></p>
          <p>${c.text}</p>
          <small>${c.timestamp ? c.timestamp.toDate().toLocaleString() : ""}</small>
          <hr>
        `;
        commentList.appendChild(div);
      });
    });
  }
});

// --- 📤 Share via native API ---
function sharePost() {
  const title = document.querySelector("h1")?.textContent || document.title;
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title,
      url,
    }).catch((err) => console.warn("Share cancelled:", err));
  } else {
    alert("Your browser doesn't support the native share feature.");
  }
}
