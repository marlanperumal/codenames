CREATE POLICY "Enable insert for authenticated users only" ON "public"."game" FOR
INSERT TO "authenticated" WITH CHECK (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."player" FOR
INSERT TO "authenticated" WITH CHECK (
        (
            (
                SELECT "auth"."uid"() AS "uid"
            ) = "id"
        )
    );

CREATE POLICY "Enable insert for authenticated users only" ON "public"."room" FOR
INSERT TO "authenticated" WITH CHECK (TRUE);

CREATE POLICY "Enable update for authenticated users" ON "public"."game" FOR
UPDATE TO "authenticated" USING (TRUE);

CREATE POLICY "Enable update for authenticated users" ON "public"."tile" FOR
UPDATE TO "authenticated" USING (TRUE);

CREATE POLICY "Games are viewable by everyone" ON "public"."game" FOR
SELECT USING (TRUE);

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."player" FOR
SELECT USING (TRUE);

CREATE POLICY "Rooms are viewable by everyone" ON "public"."room" FOR
SELECT USING (TRUE);

CREATE POLICY "Tiles are viewable by everyone" ON "public"."tile" FOR
SELECT USING (TRUE);

CREATE POLICY "Users can update own profile." ON "public"."player" FOR
UPDATE USING (
        (
            (
                SELECT "auth"."uid"() AS "uid"
            ) = "id"
        )
    );

CREATE POLICY "Words are viewable by everyone" ON "public"."word" FOR
SELECT USING (TRUE);