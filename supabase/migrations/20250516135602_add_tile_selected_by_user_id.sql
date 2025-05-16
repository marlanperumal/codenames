ALTER TABLE "public"."tile"
ADD COLUMN "selected_by_user_id" uuid;

ALTER TABLE "public"."tile"
ADD CONSTRAINT "tile_selected_by_user_id_fkey" FOREIGN KEY ("selected_by_user_id") REFERENCES "public"."player"("id") ON DELETE
SET NULL;