create table properties (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text not null,
    city text,
    issold boolean default false,
    price int  not null default 1,
    bedroom int  not null default 1,
    area int,
    latitude float,
    longitude float,
    images text[] default '{}', -- array of Supabase Storage URLs
    is_featured boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone
);