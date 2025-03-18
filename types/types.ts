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
  student_name: string;
  mtc_id: string;
  university_email: string;
  university_sap_id: string;
  university_course: string;
  university_course_year: string;
  is_verified: boolean;
  is_admin: boolean;
}

interface Post {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
}
