CREATE TRIGGER on_deleted_link AFTER UPDATE ON "Link"
BEGIN
  UPDATE "Link" SET "deleted" = true WHERE "id" = NEW."id";
END;