DROP TRIGGER IF EXISTS on_deleted_link;

CREATE TRIGGER on_deleted_link AFTER UPDATE ON "Link"
BEGIN
  UPDATE "Link" SET "deleted" = true WHERE "id" = NEW."id" AND NEW."delete_falg" = 1;
END;