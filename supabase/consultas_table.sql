-- Ya aplicado al proyecto de Supabase vía MCP (migración "create_consultas_table", 2026-08-31).
-- Se deja como referencia: crea la tabla que recibe los mensajes del formulario de contacto
-- (src/pages/ContactPage.jsx) y una política RLS que permite insertar públicamente
-- pero no leer/editar/borrar desde el cliente anónimo.

create table if not exists consultas (
	id bigint generated always as identity primary key,
	nombre text not null,
	email text not null,
	telefono text not null,
	descripcion text not null,
	intereses text[] default '{}',
	created_at timestamptz not null default now()
);

alter table consultas enable row level security;

-- Cualquiera puede crear una consulta (el formulario público usa la clave anon).
create policy "Cualquiera puede insertar consultas"
on consultas for insert
to anon
with check (true);

-- Solo lectura/edición/borrado para usuarios autenticados (el panel admin),
-- si más adelante se agrega un listado de consultas en /admin.
create policy "Solo admins pueden leer consultas"
on consultas for select
to authenticated
using (true);
