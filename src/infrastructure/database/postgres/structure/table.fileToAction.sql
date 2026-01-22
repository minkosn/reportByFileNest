-- Table: file.fileToAction

-- DROP TABLE IF EXISTS file."fileToAction";

CREATE TABLE IF NOT EXISTS file."fileToAction"
(
    file_to_action_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1000000000 CACHE 1 ),
    file_to_action_date date NOT NULL,
    "file_to_action_performed_By" bigint NOT NULL,
    file_to_action_action bigint NOT NULL,
    CONSTRAINT "PK_file_to_action_id" PRIMARY KEY (file_to_action_id),
    CONSTRAINT "FK_action" FOREIGN KEY (file_to_action_action)
        REFERENCES file."fileAction" (file_action_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_file_to_action_user" FOREIGN KEY ("file_to_action_performed_By")
        REFERENCES "user".users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS file."fileToAction"
    OWNER to postgres;