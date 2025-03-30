export async function getRegisteredUsers() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/user/get-registered-users"
    );

    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const registered_users_data: User[] = data;
    return registered_users_data;
  } catch (error) {
    console.error("Error fetching registered users:", error);
    return [];
  }
}

export async function getAllPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/posts/list_all");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const all_posts: Post[] = data;
    return all_posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPaymentPendingUsers() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/user/get-payment-pending-users"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const payment_pending_users: User[] = data;
    return payment_pending_users;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function createPost(title: string, content: string) {
  try {
    const response = await fetch("http://localhost:3000/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || `Failed to create post (${response.status})`
      );
    }

    const data: PostCreated = await response.json();
    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}
