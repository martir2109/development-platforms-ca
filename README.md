# development-platforms-ca

I chose option 2: A frontend application using Supabase for the backend services.

# Table of contents

- [Live website](#live-website)
- [Technology Stack](#technology-stack)
- [Known issues](#known-issues)
- [Motivation](#motivation)
- [Project information](#project-information)
- [Getting started (dependencies, Supabase setup and how to run)](#getting-started)

# Live website

[News Read live website](https://development-platforms-ca.netlify.app/)

# Technology Stack

- Supabase
- Supabase JavaScript client library
- HTML5
- Tailwind CSS
- Vanilla JavaScript (ES6 Modules)
- Vite (development server)

# Known issues

- Footer links are not functional and do not navigate to separate pages.

# Motivation

## why you chose the option you did. If you chose option 1, you could explain that you enjoyed developing the server-side code, for example. If you chose option 2 you could explain you enjoyed developing a full-stack site.

I chose option 2 because I found Express.js challenging and felt overwhelmed by the amount of API endpoints (GET, POST, PUT, PATCH, DELETE), routes, and middleware. Supabase felt more suitable for me at this stage because it allowed me to focus on building a full-stack application without building my own backend from scratch. Seeing the changes immediatly in the UI, such as creating and diplaying the articles made the development process feel more motivating. Supabase also allowed me to easily see all the created users and articles. It was satisfying to see the created articles immediately appear in both the web application and Supabase.

## what you liked about the development process and what you didn't enjoy.

I enjoyed working with Supabase as I was able to more easily see the application come together. By using Supabase it reduced the amount of code and allowed me to focus more on the UI as well as moving faster.

What I didn't enjoy that much was working with changes with the articles database table. After creating the table and several articles, I wanted to replace the author's email with the author's name. This resulted in errors, as the existing articles did not contain this new field. I fixed this by deleting the existing articles to make sure all articles had the same setup.

## what you found difficult.

I struggled in the beginning with understanding the Supabase JavaScript libary, but after finishing module 3.4. Lesson - Supabase and reading through the Supabase documentation online (link: https://supabase.com/docs/reference/javascript/start), it gradually started to make more sense.

## what you think the benefits of developing a custom API are versus using a SaaS option like Supabase, or vice versa.

I think by creating a custom API it provides you with more control, opportunities and flexibility. It allows developer to cutomize logic and validation.
However, I find that the development platform Supabase is beneficial for faster development and reduced complexity. It handles authentication, database setup and Row Level Security (RLS). This allows developers to focus more on application features and UI. I find that Supabase is a good alternative for developers, like myself, who prefers a more automated and less complicated solution.

# Project information

Retrieved from assignment brief.

## Goal

Develop a functional news platform that demonstrates your understanding of modern web development practices, user authentication, and data management through either backend API development or full-stack implementation with modern tools.

## Brief

Build a news platform where users can browse and submit news articles.
Option 2: A frontend application using Supabase for the backend services

## Project Requirements

Core Functionality, application must include:

### Public Access:

- Anyone can view the list of news articles
- Articles display title, body, category, and submission date

### User Authentication:

- User registration with email and password
- User login

### Article Management:

- Only authenticated users can submit news articles
- Article details: title, body, category (submission date can be automatic)
- Articles automatically tagged with submitter (logged-in user) information

## Key Implementation Requirements:

1. Implement Supabase authentication with email confirmation
2. Create a responsive frontend with proper navigation
3. Use Supabase database for article storage
4. Implement Row Level Security (RLS) policies
5. Show/hide UI elements based on authentication state:
6. The login and register links should not be visible when the user is logged in
7. The create article link should only be visible when the user is logged in

## Required Features:

1. User registration and login forms
2. Article browsing interface
3. Article submission form (authenticated users only)
4. Proper error handling and user feedback
5. Responsive design

# Getting started

## Install dependencies

```bash
npm install
```

## Supabase setup

1. Create the table

```sql
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  category text NOT NULL,
  author_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  author_email text NOT NULL DEFAULT (auth.jwt() ->> 'email'),
  author_name text NOT NULL DEFAULT 'Anonymous',
  created_at timestamptz NOT NULL DEFAULT now()
);
```

2. Enable real-time updates for the articles table

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.articles;
```

3. Policies

- Enable Row Level Security

```sql
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
```

- Anyone can read every article

```sql
CREATE POLICY "Public can read articles" ON public.articles FOR SELECT USING (true);
```

- Users can create own articles

```sql
CREATE POLICY "Users can create own articles" ON public.articles FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
```

- Users can read their own artcles

```sql
CREATE POLICY "Users can read own articles" ON articles FOR SELECT TO authenticated USING (auth.uid() = author_id);
```

- Users can only update their own articles

```sql
CREATE POLICY "Users can update own articles" ON articles FOR UPDATE TO authenticated USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
```

- Users can only delete their own articles

```sql
CREATE POLICY "Users can delete own articles" ON articles FOR DELETE TO authenticated USING (auth.uid() = author_id);
```

## Run the project (development)

Run the development server with Vite:

```bash
npm run dev
```

## Build the project

```bash
npm run build
```

## Preview the project

```bash
npm run preview
```

## Format all files with prettier

```bash
npm run prettier
```
