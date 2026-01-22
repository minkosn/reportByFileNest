-- Table: file.fileDetailType

-- DROP TABLE IF EXISTS file."fileDetailType";

CREATE TABLE IF NOT EXISTS file."fileDetailType"
(
    file_detail_type_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    file_detail_type_data text COLLATE pg_catalog."default" NOT NULL,
    file_detail_type_updated_on date NOT NULL,
    file_detail_type_performed_by bigint NOT NULL,
    CONSTRAINT "PK_ file_detail_type_id" PRIMARY KEY (file_detail_type_id),
    CONSTRAINT "UNQ_ file_detail_type_data" UNIQUE (file_detail_type_data),
    CONSTRAINT "FK_file_detail_type_user" FOREIGN KEY (file_detail_type_performed_by)
        REFERENCES "user".users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS file."fileDetailType"
    OWNER to postgres;