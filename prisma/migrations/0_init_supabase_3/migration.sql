-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredUsers" (
    "student_name" TEXT,
    "university_sap_id" BIGINT,
    "university_course" TEXT,
    "university_course_year" TEXT,
    "university_email" TEXT,
    "mtc_id" TEXT,
    "id" SERIAL NOT NULL,
    "is_verified" BOOLEAN DEFAULT false,

    CONSTRAINT "MTC_Users_pkey" PRIMARY KEY ("id")
);

