CREATE TABLE public.game (
    id bigint generated by DEFAULT AS identity NOT NULL,
    created_at timestamp WITH time zone NOT NULL DEFAULT NOW(),
    room_id bigint NULL,
    is_complete boolean NOT NULL DEFAULT false,
    code uuid NULL DEFAULT gen_random_uuid (),
    CONSTRAINT game_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

ALTER TABLE public.game
ADD CONSTRAINT game_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room(id) ON DELETE
SET NULL NOT valid;

ALTER TABLE public.room
ADD CONSTRAINT room_current_game_id_fkey FOREIGN KEY (current_game_id) REFERENCES public.game (id) ON DELETE
SET NULL;

ALTER TABLE public.game enable ROW LEVEL SECURITY;

ALTER TABLE public.game owner TO postgres;