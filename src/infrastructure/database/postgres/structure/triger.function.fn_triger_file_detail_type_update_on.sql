--trigger_file_detail_type_on_update
CREATE OR REPLACE FUNCTION file."fn_triger_file_detail_type_update_on"()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN

IF TG_WHEN = 'BEFORE' AND TG_OP IN ('INSERT', 'UPDATE' ) THEN
	NEW.file_detail_type_updated_on := now();
END IF;

RETURN NEW;

END
$BODY$;

