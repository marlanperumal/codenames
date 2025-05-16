CREATE OR REPLACE FUNCTION public.handle_new_game() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path TO '' AS $function$begin WITH random_words AS (
        SELECT row_number() over () AS row_num,
            id
        FROM word
        ORDER BY RANDOM()
    ),
    random_colors AS (
        SELECT row_number() over () AS row_num,
            color
        FROM (
                SELECT 'red' AS color
                FROM GENERATE_SERIES(1, 8)
                UNION ALL
                SELECT 'blue' AS color
                FROM GENERATE_SERIES(1, 8)
                UNION ALL
                SELECT 'neutral' AS color
                FROM GENERATE_SERIES(1, 7)
                UNION ALL
                SELECT 'death' AS color
                FROM GENERATE_SERIES(1, 1)
                UNION ALL
                SELECT CASE
                        WHEN RANDOM() < 0.5 THEN 'red'
                        ELSE 'blue'
                    END AS color
                FROM GENERATE_SERIES(1, 1)
            ) t1
        ORDER BY RANDOM()
    )
INSERT INTO public.tile (game_id, position, word_id, team)
SELECT new.id,
    row_number() over () AS position,
    w.id AS word_id,
    c.color AS team
FROM random_words w
    JOIN random_colors c USING (row_num);

UPDATE public.room
SET current_game_id = new.id
WHERE room.id = new.room_id;

RETURN new;

END $function$;

CREATE OR REPLACE FUNCTION public.handle_new_room() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path TO '' AS $function$begin
INSERT INTO public.game (room_id)
VALUES (new.id);

RETURN new;

END $function$;

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path TO '' AS $function$begin
INSERT INTO public.player (id, name)
VALUES (new.id, 'Player');

RETURN new;

END $function$;