CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_room_created
AFTER
INSERT ON public.room FOR EACH ROW EXECUTE FUNCTION public.handle_new_room ();

CREATE TRIGGER on_game_created
AFTER
INSERT ON public.game FOR EACH ROW EXECUTE FUNCTION public.handle_new_game ();