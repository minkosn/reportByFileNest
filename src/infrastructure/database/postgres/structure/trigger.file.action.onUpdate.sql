CREATE TRIGGER trigger_file_action_updateOn BEFORE INSERT OR UPDATE ON file."fileAction"
FOR EACH ROW EXECUTE FUNCTION file."fn_triger_file_action_updateOn"();