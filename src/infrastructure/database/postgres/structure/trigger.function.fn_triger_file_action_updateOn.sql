-- FUNCTION: file.fn_triger_file_action_updateOn()

-- DROP FUNCTION IF EXISTS file."fn_triger_file_action_updateOn"();

CREATE OR REPLACE FUNCTION file."fn_triger_file_action_updateOn"()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN

IF TG_WHEN = 'BEFORE' AND TG_OP IN ('INSERT', 'UPDATE' ) THEN
	NEW.file_action_updateON := now();
END IF;

RETURN NEW;

END
$BODY$;

ALTER FUNCTION file."fn_triger_file_action_updateOn"()
    OWNER TO postgres;
