-- CreateTable
CREATE TABLE "Map" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url_image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tatic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mapId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Tatic_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taticId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Image_taticId_fkey" FOREIGN KEY ("taticId") REFERENCES "Tatic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
