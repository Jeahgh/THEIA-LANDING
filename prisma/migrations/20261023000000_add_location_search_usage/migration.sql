-- Un contador diario compartido, sin búsquedas ni datos personales.
CREATE TABLE "LocationSearchUsage" (
    "day" DATE NOT NULL,
    "requests" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "LocationSearchUsage_pkey" PRIMARY KEY ("day")
);
