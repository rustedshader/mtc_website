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
    // Map the published property to is_published for frontend consistency
    const all_posts: Post[] = data.map((post: any) => ({
      ...post,
      is_published: post.published,
    }));
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

export async function createPost(data: {
  title: string;
  content: string;
  description?: string | null;
  image?: string | null;
  date?: string | null;
  location?: string | null;
  type?: string | null;
}) {
  try {
    const response = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function updatePost(
  id: number,
  data: {
    title: string;
    content: string;
    description?: string | null;
    image?: string | null;
    date?: string | null;
    location?: string | null;
    type?: string | null;
  }
) {
  try {
    const response = await fetch(`/api/posts/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

interface Payment {
  id: number;
  mtc_id: string;
  student_name: string;
  university_email: string;
  university_sap_id: string;
  payment_refrence_number: string;
  payment_screenshot_url: string;
  payment_verified: boolean;
}

export async function getPaymentDetails(id: string): Promise<Payment> {
  try {
    const response = await fetch(`http://localhost:3000/api/payments/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch payment details (${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching payment details:", error);
    throw error;
  }
}

export async function verifyPayment(
  id: string
): Promise<{ message: string; data: Payment }> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/payments/verify/${id}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || `Failed to verify payment (${response.status})`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
}

export async function unpublishPost(
  id: string
): Promise<{ message: string; post: Post }> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/unpublish/${id}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || `Failed to unpublish post (${response.status})`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error unpublishing post:", error);
    throw error;
  }
}

export async function deletePost(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || `Failed to delete post (${response.status})`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

export async function publishPost(
  id: string
): Promise<{ message: string; post: Post }> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/publish/${id}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || `Failed to publish post (${response.status})`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error publishing post:", error);
    throw error;
  }
}
