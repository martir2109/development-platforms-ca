# development-platforms-ca

I chose option 2: A frontend application using Supabase for the backend services.

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
