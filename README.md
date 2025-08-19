# Sindesk

## Introduction 
Sindesk is a web application aimed to support to users who have technical or operational  
problems in online systems. The platform offers opening tickets functionalities, safe authentication, email-notification and a FAQ section for common problems.

## Application and architeture

The application is based on a client-server architeture and it's divided in two main modules:  
- Frontend: developed in __Next.js(React)__ , responsible for the interface and interaction with  
the user.  
- Backend: developed in __Spring Boot__, responsible by the business logic, persistence and authentication.

### Simplified Diagram

- __User → Frontend (Next.js) → API REST (Spring Boot) → Database (PostgreSQL)__

## Main Functionalities 

- __Authentication and Authorization__  
    - Login with password and email
    - Support and email verification
    - Different permissions for user and attendant
- __Ticket Management__
    - Ticket's creation linked to an user
    - Each ticket have a title, description, status and a tag
    - Real time accompaniment
- __Comunication__
    - Chat between user and attendant inside ticket.
    - Email notification for tickets updates.
- __FAQ__
    - Section with common problems solutions and articles
    - Relationed articles inside each article page

## Used Technologies

- __Frontend__: Next.js, TailwindCSS, TypeScript

- __Backend__: Java 17, Spring Boot, Spring Security

- __Database__: PostgreSQL

- __Authentication__: NextAuth.js + JWT

## Execution Requisites

- Node.js 20+

- Java 17+

- PostgreSQL 15+

## How to Execute

__Backend__

```bash
cd server
mvn spring-boot:run
```
__Frontend__
```bash
cd frontend
npm run dev
```
The application will be available in:
- http://localhost:3000 - Frontend
- http://localhost:8080 - Backend













