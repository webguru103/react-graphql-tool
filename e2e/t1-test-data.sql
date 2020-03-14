\connect dealtapv4;

-- Append e2e test data to this document or create t2, t3, t4 files in this folder.
BEGIN;
INSERT INTO brokerage_acl (user_id, brokerage_id, role_id, resource_category, role_category, created_at)
    VALUES (1, 1, 4, 'BROKERAGE', 'ADMIN', '2018-12-11 18:44:36.382');
INSERT INTO system_acl (user_id, system_id, role_id, resource_category, role_category, created_at)
    VALUES (11, 1, 3, 'SYSTEM', 'CP_ADMIN', '2018-12-20 09:33:22.424');
-- INSERT INTO token (user_id, token_type, token, expiry, created_at)
--     VALUES (1, 'AUTH', 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00iLCJ6aXAiOiJERUYifQ.BtTMrm8j6FMrOAcVsuhMCDzHgVg95a-u8DFpvUgIjiCSO1bC3ZEJpBPJ3bcdaGi00obNX3yORJoWCFYYr3BI7AuDRwyU34B0ZXfHPPcRzZgcUhPnjoZaUeAHSozIKwfe-XKXdLu4aEQS7O785KSaWquSrWP58T4SQgyZ_p6TT_jhtvZfEBbZ4QDKMvaIJAjjWaTLlrpl1Z7U0CeZ2DjN_S9Qg6TBDd8mvZLlqj8SGwgmzSklco-LDUALZFRHo5zKO5Hup98fPtvBzS9wBk3hcuICi3-lE8D1hxLHBeVGTOjFs4kvJ9R4eWrnKv4UzyzAFPW_qgkoPKDOWivHiDn2ZQ.X3TJH3zIOCsJB9ZE.PvHR6uSe5Qm0-XvuieZYfc4qfdn9vlJDkzU7KWTa89LoVFE2g-yhDkj4plbRpKK38aLsI6BwOSuCtUQHPA1GEkqWXUB9Kw.F2a1VqVxilU1h8jRc37ePA',
--            '2025-02-26 17:40:45.668288+00', '2019-02-26 17:40:45.668288+00');
COMMIT;

-- Editor: Drag and drop tests
BEGIN;

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13911, 'Drag and drop test 1', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13911, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13911, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13912, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13911, now(), now());
UPDATE form
SET draft_version_id = 13911, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13912, published_at = now(), published_by = 1
WHERE id = 13911;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13911, 13911, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13912, 13911, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13912, 'Drag and drop test 2', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13913, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13912, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13914, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13912, now(), now());
UPDATE form
SET draft_version_id = 13913, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13914, published_at = now(), published_by = 1
WHERE id = 13912;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13913, 13913, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13914, 13913, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13913, 'Drag and drop test 3', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13915, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13913, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13916, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13913, now(), now());
UPDATE form
SET draft_version_id = 13915, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13916, published_at = now(), published_by = 1
WHERE id = 13913;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13915, 13915, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13916, 13915, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13914, 'Drag and drop test 4', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13917, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13914, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13918, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13914, now(), now());
UPDATE form
SET draft_version_id = 13917, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13918, published_at = now(), published_by = 1
WHERE id = 13914;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13917, 13917, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13918, 13917, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13915, 'Drag and drop test 5', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13919, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13915, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139110, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13915, now(), now());
UPDATE form
SET draft_version_id = 13919, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139110, published_at = now(), published_by = 1
WHERE id = 13915;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13919, 13919, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139110, 13919, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13916, 'Drag and drop test 6', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139111, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13916, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139112, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13916, now(), now());
UPDATE form
SET draft_version_id = 139111, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139112, published_at = now(), published_by = 1
WHERE id = 13916;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139111, 139111, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139112, 139111, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13917, 'Drag and drop test 7', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139113, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13917, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139114, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13917, now(), now());
UPDATE form
SET draft_version_id = 139113, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139114, published_at = now(), published_by = 1
WHERE id = 13917;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139113, 139113, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139114, 139113, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13918, 'Drag and drop test 8', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139115, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13918, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139116, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13918, now(), now());
UPDATE form
SET draft_version_id = 139115, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139116, published_at = now(), published_by = 1
WHERE id = 13918;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139115, 139115, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139116, 139115, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13919, 'Drag and drop test 9', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139117, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13919, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139118, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13919, now(), now());
UPDATE form
SET draft_version_id = 139117, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139118, published_at = now(), published_by = 1
WHERE id = 13919;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139117, 139117, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139118, 139117, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (139110, 'Drag and drop test 10', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139119, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139110, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139120, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139110, now(), now());
UPDATE form
SET draft_version_id = 139119, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139120, published_at = now(), published_by = 1
WHERE id = 139110;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139119, 139119, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139120, 139119, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());


COMMIT;

-- Editor: Click and drop tests
BEGIN;

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13901, 'Click and drop test 1', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13901, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13901, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13902, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13901, now(), now());
UPDATE form
SET draft_version_id = 13901, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13902, published_at = now(), published_by = 1
WHERE id = 13901;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13901, 13901, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13902, 13901, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13902, 'Click and drop test 2', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13903, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13902, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13904, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13902, now(), now());
UPDATE form
SET draft_version_id = 13903, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13904, published_at = now(), published_by = 1
WHERE id = 13902;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13903, 13903, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13904, 13903, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13903, 'Click and drop test 3', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13905, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13903, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13906, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13903, now(), now());
UPDATE form
SET draft_version_id = 13905, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13906, published_at = now(), published_by = 1
WHERE id = 13903;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13905, 13905, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13906, 13905, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13904, 'Click and drop test 4', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13907, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13904, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13908, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13904, now(), now());
UPDATE form
SET draft_version_id = 13907, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13908, published_at = now(), published_by = 1
WHERE id = 13904;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13907, 13907, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13908, 13907, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13905, 'Click and drop test 5', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13909, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13905, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139010, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13905, now(), now());
UPDATE form
SET draft_version_id = 13909, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139010, published_at = now(), published_by = 1
WHERE id = 13905;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13909, 13909, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139010, 13909, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13906, 'Click and drop test 6', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139011, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13906, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139012, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13906, now(), now());
UPDATE form
SET draft_version_id = 139011, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139012, published_at = now(), published_by = 1
WHERE id = 13906;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139011, 139011, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139012, 139011, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13907, 'Click and drop test 7', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139013, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13907, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139014, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13907, now(), now());
UPDATE form
SET draft_version_id = 139013, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139014, published_at = now(), published_by = 1
WHERE id = 13907;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139013, 139013, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139014, 139013, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13908, 'Click and drop test 8', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139015, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13908, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139016, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13908, now(), now());
UPDATE form
SET draft_version_id = 139015, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139016, published_at = now(), published_by = 1
WHERE id = 13908;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139015, 139015, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139016, 139015, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13909, 'Click and drop test 9', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139017, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13909, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139018, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13909, now(), now());
UPDATE form
SET draft_version_id = 139017, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139018, published_at = now(), published_by = 1
WHERE id = 13909;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139017, 139017, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139018, 139017, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (139010, 'Click and drop test 10', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139019, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139010, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139020, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139010, now(), now());
UPDATE form
SET draft_version_id = 139019, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139020, published_at = now(), published_by = 1
WHERE id = 139010;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139019, 139019, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139020, 139019, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (139011, 'Click and drop test 11', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139021, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139011, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139022, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139011, now(), now());
UPDATE form
SET draft_version_id = 139021, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139022, published_at = now(), published_by = 1
WHERE id = 139011;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139021, 139021, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139022, 139021, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (139012, 'Click and drop test 12', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139023, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139012, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139024, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139012, now(), now());
UPDATE form
SET draft_version_id = 139023, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139024, published_at = now(), published_by = 1
WHERE id = 139012;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139023, 139023, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139024, 139023, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (139013, 'Click and drop test 13', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139025, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139013, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139026, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139013, now(), now());
UPDATE form
SET draft_version_id = 139025, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139026, published_at = now(), published_by = 1
WHERE id = 139013;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139025, 139025, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139026, 139025, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (139014, 'Click and drop test 14', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139027, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139014, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139028, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139014, now(), now());
UPDATE form
SET draft_version_id = 139027, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139028, published_at = now(), published_by = 1
WHERE id = 139014;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139027, 139027, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139028, 139027, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (139015, 'Click and drop test 15', 4, 'ACTIVE', now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139029, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139015, now(), now());

INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (139030, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 139015, now(), now());
UPDATE form
SET draft_version_id = 139029, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 139030, published_at = now(), published_by = 1
WHERE id = 139015;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139029, 139029, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139030, 139029, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

COMMIT;
-- Editor: Form and Form Group tests
BEGIN;

INSERT INTO form_group (id,form_group_name, visibility, created_at, updated_at) VALUES (13931111,'1393-test-forms', 'EVERYONE', now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13930, 'form-1', 13931111, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13931, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13930, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13932, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13930, now(), now());

UPDATE form
SET draft_version_id = 13931, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13932, published_at = now(), published_by = 1
WHERE id = 13930;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13931, 13931, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13932, 13931, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13933, 13932, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13934, 13932, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

COMMIT;
-- Editor: MultiSelect Tests
BEGIN;

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (78901, 'MultiSelect test 1', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (78901, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 78901, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (78902, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 78901, now(), now());
UPDATE form
SET draft_version_id = 78901, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 78902, published_at = now(), published_by = 1
WHERE id = 78901;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (78901, 78901, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (78902, 78901, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (78903, 'MultiSelect test 2', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (78903, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 78903, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (78904, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 78903, now(), now());
UPDATE form
SET draft_version_id = 78903, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 78904, published_at = now(), published_by = 1
WHERE id = 78903;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (78903, 78903, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (78904, 78903, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (78905, 'MultiSelect test 3', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (78905, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 78905, now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (78906, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 78905, now(), now());
UPDATE form
SET draft_version_id = 78905, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 78906, published_at = now(), published_by = 1
WHERE id = 78905;
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (78905, 78905, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (78906, 78905, 'http://mocksvg.com/svg2.svg', 2, 850, 1100, now(), now());

COMMIT;

-- Editor: Copy and paste test
BEGIN;

INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13951, 'Copy paste test 1', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13951, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13951, now(), now());

UPDATE form
SET draft_version_id = 13951, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13951, published_at = now(), published_by = 1
WHERE id = 13951;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13951, 13951, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13952, 13951, 'http://mocksvg.com/svg1.svg', 2, 850, 1100, now(), now());

INSERT INTO form_data
(form_data_name, form_version_id, field_type, value, affects_signature, required) VALUES
('first_name', 13951, 1, '{"data": "field"}', true, true);

INSERT INTO public.page_field_text
(field_name, form_version_id, form_page_id, deleted, data_reference, autocomplete,
x, y, width, height, position_lock, created_at, updated_at, color, font_size, alignment,
padding, line_height) VALUES
('price_field_1', 13951, 13951, false, 1, false,
100, 100, 150, 30, false, now(), now(), '#000000', 14, 'LEFT',
5, 14);


INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13952, 'Copy paste test 2', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13952, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13952, now(), now());

UPDATE form
SET draft_version_id = 13952, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13952, published_at = now(), published_by = 1
WHERE id = 13952;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13953, 13952, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13954, 13952, 'http://mocksvg.com/svg1.svg', 2, 850, 1100, now(), now());

INSERT INTO form_data
(form_data_name, form_version_id, field_type, value, affects_signature, required) VALUES
('first_name', 13952, 1, '{"data": "field"}', true, true);

INSERT INTO public.page_field_text
(field_name, form_version_id, form_page_id, deleted, data_reference, autocomplete,
x, y, width, height, position_lock, created_at, updated_at, color, font_size, alignment,
padding, line_height) VALUES
('price_field_1', 13952, 13953, false, 1, false,
100, 100, 150, 30, false, now(), now(), '#000000', 14, 'LEFT',
5, 14);


INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13953, 'Copy paste test 3', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13953, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13953, now(), now());

UPDATE form
SET draft_version_id = 13953, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13953, published_at = now(), published_by = 1
WHERE id = 13953;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13955, 13953, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13956, 13953, 'http://mocksvg.com/svg1.svg', 2, 850, 1100, now(), now());

INSERT INTO form_data
(form_data_name, form_version_id, field_type, value, affects_signature, required) VALUES
('first_name', 13953, 1, '{"data": "field"}', true, true);

INSERT INTO public.page_field_text
(field_name, form_version_id, form_page_id, deleted, data_reference, autocomplete,
x, y, width, height, position_lock, created_at, updated_at, color, font_size, alignment,
padding, line_height) VALUES
('price_field_1', 13953, 13955, false, 1, false,
100, 100, 150, 30, false, now(), now(), '#000000', 14, 'LEFT',
5, 14);


INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13954, 'Copy paste test 4', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13954, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13954, now(), now());

UPDATE form
SET draft_version_id = 13954, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13954, published_at = now(), published_by = 1
WHERE id = 13954;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13957, 13954, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13958, 13954, 'http://mocksvg.com/svg1.svg', 2, 850, 1100, now(), now());

INSERT INTO form_data
(form_data_name, form_version_id, field_type, value, affects_signature, required) VALUES
('first_name', 13954, 1, '{"data": "field"}', true, true);

INSERT INTO public.page_field_text
(field_name, form_version_id, form_page_id, deleted, data_reference, autocomplete,
x, y, width, height, position_lock, created_at, updated_at, color, font_size, alignment,
padding, line_height) VALUES
('price_field_1', 13954, 13957, false, 1, false,
100, 100, 150, 30, false, now(), now(), '#000000', 14, 'LEFT',
5, 14);


INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13955, 'Copy paste test 5', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13955, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13955, now(), now());

UPDATE form
SET draft_version_id = 13955, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13955, published_at = now(), published_by = 1
WHERE id = 13955;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (13959, 13955, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139510, 13955, 'http://mocksvg.com/svg1.svg', 2, 850, 1100, now(), now());

INSERT INTO form_data
(form_data_name, form_version_id, field_type, value, affects_signature, required) VALUES
('first_name', 13955, 1, '{"data": "field"}', true, true);

INSERT INTO public.page_field_text
(field_name, form_version_id, form_page_id, deleted, data_reference, autocomplete,
x, y, width, height, position_lock, created_at, updated_at, color, font_size, alignment,
padding, line_height) VALUES
('price_field_1', 13955, 13959, false, 1, false,
100, 100, 150, 30, false, now(), now(), '#000000', 14, 'LEFT',
5, 14);


INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13956, 'Copy paste test 6', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13956, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13956, now(), now());

UPDATE form
SET draft_version_id = 13956, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13956, published_at = now(), published_by = 1
WHERE id = 13956;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139511, 13956, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139512, 13956, 'http://mocksvg.com/svg1.svg', 2, 850, 1100, now(), now());

INSERT INTO form_data
(form_data_name, form_version_id, field_type, value, affects_signature, required) VALUES
('first_name', 13956, 1, '{"data": "field"}', true, true);

INSERT INTO public.page_field_text
(field_name, form_version_id, form_page_id, deleted, data_reference, autocomplete,
x, y, width, height, position_lock, created_at, updated_at, color, font_size, alignment,
padding, line_height) VALUES
('price_field_1', 13956, 139511, false, 1, false,
100, 100, 150, 30, false, now(), now(), '#000000', 14, 'LEFT',
5, 14);


INSERT INTO form (id, form_name, form_group_id, form_status, created_at, updated_at) VALUES (13957, 'Copy paste test 7', 4, 'ACTIVE', now(), now());
INSERT INTO form_version (id, source_url, form_id, created_at, updated_at) VALUES (13957, 'https://storage.googleapis.com/dealtapv4-pdf/2019/March/5/30af1ec6-059b-460b-9407-a95a547e39b2/Agreement-of-Purchase-and-Sale-1.pdf', 13957, now(), now());

UPDATE form
SET draft_version_id = 13957, draft_saved_at = now(), draft_saved_by = 1,
published_version_id = 13957, published_at = now(), published_by = 1
WHERE id = 13957;

INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139513, 13957, 'http://mocksvg.com/svg1.svg', 1, 850, 1100, now(), now());
INSERT INTO public.form_page (id, form_version_id, source_url, page_number, width, height, created_at, updated_at) VALUES (139514, 13957, 'http://mocksvg.com/svg1.svg', 2, 850, 1100, now(), now());

INSERT INTO form_data
(form_data_name, form_version_id, field_type, value, affects_signature, required) VALUES
('first_name', 13957, 1, '{"data": "field"}', true, true);

INSERT INTO public.page_field_text
(field_name, form_version_id, form_page_id, deleted, data_reference, autocomplete,
x, y, width, height, position_lock, created_at, updated_at, color, font_size, alignment,
padding, line_height) VALUES
('price_field_1', 13957, 139513, false, 1, false,
100, 100, 150, 30, false, now(), now(), '#000000', 14, 'LEFT',
5, 14);

COMMIT;
