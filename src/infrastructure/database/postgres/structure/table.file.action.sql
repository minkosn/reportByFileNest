-- Table: file.fileAction

-- DROP TABLE IF EXISTS file."fileAction";

CREATE TABLE IF NOT EXISTS file."fileAction"
(
    file_action_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    file_action_name text COLLATE pg_catalog."default" NOT NULL,
    file_action_status bigint NOT NULL,
    "file_action_updatedOn" date NOT NULL,
    file_action_updated_by bigint NOT NULL,
    CONSTRAINT "PK_file_action_id" PRIMARY KEY (file_action_id),
    CONSTRAINT "UNQ_file_action_name" UNIQUE (file_action_name),
    CONSTRAINT "FK_file_action_status" FOREIGN KEY (file_action_status)
        REFERENCES file."fileStatus" (file_status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "FK_file_action_updated_by" FOREIGN KEY (file_action_updated_by)
        REFERENCES "user".users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS file."fileAction"
    OWNER to postgres;

-- Trigger: trigger_file_action_updateon

-- DROP TRIGGER IF EXISTS trigger_file_action_updateon ON file."fileAction";

CREATE OR REPLACE TRIGGER trigger_file_action_updateon
    BEFORE INSERT OR UPDATE 
    ON file."fileAction"
    FOR EACH ROW
    EXECUTE FUNCTION file."fn_triger_file_action_updateOn"();