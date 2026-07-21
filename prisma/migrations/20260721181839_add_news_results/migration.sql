-- CreateTable
CREATE TABLE "NewsResult" (
    "id" TEXT NOT NULL,
    "newsPostId" TEXT NOT NULL,
    "athleteName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "NewsResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NewsResult_newsPostId_idx" ON "NewsResult"("newsPostId");

-- AddForeignKey
ALTER TABLE "NewsResult" ADD CONSTRAINT "NewsResult_newsPostId_fkey" FOREIGN KEY ("newsPostId") REFERENCES "NewsPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
