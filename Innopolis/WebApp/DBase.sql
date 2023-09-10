-- Table: public.item

-- DROP TABLE IF EXISTS public.item;

CREATE TABLE IF NOT EXISTS public.item
(
    id integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    price real,
    CONSTRAINT item_pkey PRIMARY KEY (id),
    CONSTRAINT item_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item
    OWNER to postgres;
	
-- Table: public.sales

-- DROP TABLE IF EXISTS public.sales;

CREATE TABLE IF NOT EXISTS public.sales
(
    id integer NOT NULL DEFAULT nextval('id_seq'::regclass),
    item_id integer,
    store_id integer,
    sale_time timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT sales_pkey PRIMARY KEY (id),
    CONSTRAINT item FOREIGN KEY (item_id)
        REFERENCES public.item (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT store FOREIGN KEY (store_id)
        REFERENCES public.store (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sales
    OWNER to postgres;
	
-- Table: public.store

-- DROP TABLE IF EXISTS public.store;

CREATE TABLE IF NOT EXISTS public.store
(
    id integer NOT NULL,
    address character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT store_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.store
    OWNER to postgres;