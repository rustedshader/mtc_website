-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "mtc_id" TEXT,
    "student_name" TEXT,
    "university_email" TEXT,
    "university_sap_id" BIGINT,
    "payment_refrence_number" TEXT,

    CONSTRAINT "MTC_Payments_pkey" PRIMARY KEY ("id")
);
