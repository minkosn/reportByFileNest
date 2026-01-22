-- Table: file.fileDetail

-- DROP TABLE IF EXISTS file."fileDetail";

CREATE TABLE IF NOT EXISTS file."fileDetail"
(
    file_detail_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    file_detail_type bigint NOT NULL,
    file_detail_value text COLLATE pg_catalog."default" NOT NULL,
    file_detail_file_to_action bigint NOT NULL,
    CONSTRAINT "PK_file_detail_id" PRIMARY KEY (file_detail_id),
    CONSTRAINT "FK_file_detail_file_to_action" FOREIGN KEY (file_detail_file_to_action)
        REFERENCES file."fileToAction" (file_to_action_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_file_detail_type" FOREIGN KEY (file_detail_type)
        REFERENCES file."fileDetailType" (file_detail_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS file."fileDetail"
    OWNER to postgres;