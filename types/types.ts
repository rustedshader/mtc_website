interface FrontMatterInterface {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
}

interface BlogPost {
  slug: string;
  frontMatter: FrontMatterInterface;
  mdContent: string;
}

interface VerfifiedResponse {
  verified: boolean;
}

interface userData {}

interface User {
  id: string;
  name: string | null;
  mtc_id: string | null;
  university_email: string | null;
  university_sap_id: string | null;
  university_course: string | null;
  university_course_year: string | null;
  role: "USER" | "ADMIN";
  created_at: Date;
  payments?: Payment[];
}

interface Payment {
  id: number;
  user_id: string;
  payment_refrence_number: string | null;
  payment_screenshot_url: string | null;
  payment_verified: boolean;
}

interface Post {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
}

interface PostCreated {
  data: string;
}
