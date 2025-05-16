ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime"
ADD TABLE ONLY "public"."game";

ALTER PUBLICATION "supabase_realtime"
ADD TABLE ONLY "public"."player";

ALTER PUBLICATION "supabase_realtime"
ADD TABLE ONLY "public"."room";

ALTER PUBLICATION "supabase_realtime"
ADD TABLE ONLY "public"."tile";