CREATE TABLE public.player (
    id uuid NOT NULL DEFAULT gen_random_uuid (),
    created_at timestamp WITH time zone NOT NULL DEFAULT NOW(),
    name character varying NOT NULL,
    current_room_id bigint NULL,
    team character varying NULL,
    is_spymaster boolean NULL DEFAULT false,
    CONSTRAINT player_pkey PRIMARY KEY (id),
    CONSTRAINT player_current_room_id_fkey FOREIGN KEY (current_room_id) REFERENCES public.room (id) ON DELETE
    SET NULL
) TABLESPACE pg_default;

ALTER TABLE public.player enable ROW LEVEL SECURITY;

ALTER TABLE public.player owner TO postgres;