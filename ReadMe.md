# Aim of the Application

Web service to allow uploading of files (xlsx, csv, txt) and import in DB.
Generating reports by data imported.

Features:

1. Register users to manage upload, import and reportings
2. Login of already registered users
3. List of users, persons, uploaded files, imported files
4. Upload files
5. Import already uploaded files
6. Generate reports

Note: point 5 and 6 are in stage 'TO DO'

DB supported:

1. Postgres
2. Mongo DB

Implementation:

Nest JS framework
Type Script
TypeORM for Postgres

Flow of work:

1. Register user
2. Login
3. Upload file
4. Import file
5. Generate report

How to install:

npm install -g nest
git clone 'repo'
cd 'repo'
npm install
npm run start