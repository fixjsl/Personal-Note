
Create TABLE IF NOT EXISTS User(
    uid INT UNSIGNED NOT null auto_increment primary key,
    id varchar(50) not null unique,
    username varchar(100) not null,

    password varchar(255) not null,
    profile_img varchar(255) Default 'default.png',
    role varchar(20) default 'user',

    created_at timestamp default current_timestamp,
    isLogged Boolean not null default 0
)


