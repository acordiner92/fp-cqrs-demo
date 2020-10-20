CREATE TYPE ACTIVITY_STATUS
AS ENUM ('ACTIVE', 'INACTIVE');

CREATE TABLE MERCHANT(
   id UUID PRIMARY KEY,
   status ACTIVITY_STATUS NOT NULL,
   currency TEXT NOT NULL,
   website_url TEXT NOT NULL,
   country TEXT NOT NULL,
   discount_percentage FLOAT NOT NULL, 
   is_deleted BOOLEAN NOT NULL,
   created_at TIMESTAMP NOT NULL,
   updated_at TIMESTAMP NOT NULL
);

CREATE INDEX is_deleted_index
ON MERCHANT (is_deleted);