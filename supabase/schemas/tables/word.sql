CREATE TABLE public.word (
    id bigint generated by DEFAULT AS identity NOT NULL,
    created_at timestamp WITH time zone NOT NULL DEFAULT NOW (),
    word character varying NOT NULL,
    CONSTRAINT word_pkey PRIMARY KEY (id),
    CONSTRAINT word_word_key UNIQUE (word)
) TABLESPACE pg_default;

ALTER TABLE public.word enable ROW LEVEL SECURITY;

ALTER TABLE public.word owner TO postgres;